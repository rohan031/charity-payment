const path = require("path");
const PaytmChecksum = require("paytmchecksum");
const crypto = require("crypto");
const https = require("https");

// donators Schema
const Donator = require("../database/donatorsSchema");

const md5 = (text) => {
	return crypto.createHash("md5").update(text, "utf-8").digest("hex");
};

const home = (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../client/index.html"));
};

const mission = (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../client/mission.html"));
};

const contact = (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../client/contact.html"));
};

const gallery = (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../client/gallery.html"));
};

const donation = (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../client/donation.html"));
};

const paynow = async (req, res) => {
	const {
		name,
		email,
		phoneNumber,
		state,
		district,
		pinCode,
		address,
		amount,
		panNumber,
	} = req.body;

	if (
		!name ||
		!email ||
		!phoneNumber ||
		!state ||
		!district ||
		!pinCode ||
		!address ||
		!amount ||
		!panNumber
	) {
		return res.status(400).json({
			success: false,
			msg: "One of the input field is empty. All input fields are required!",
		});
	}

	var paytmParams = {};

	const orderId = md5(`${panNumber + Date.now()}`);

	const donatorDetails = {
		name,
		email,
		phoneNumber,
		state,
		district,
		pinCode,
		address,
		amount,
		panNumber,
		orderId,
		isValid: false,
	};

	const newDonator = new Donator(donatorDetails);

	await newDonator.save((err, result) => {
		if (err) {
			console.log(err);
		}
	});

	paytmParams.body = {
		requestType: "Payment",
		mid: process.env.MERCHANT_ID,
		websiteName: process.env.WEBSITE,
		orderId: orderId,
		callbackUrl: `${process.env.DOMAIN}/status`,
		txnAmount: {
			value: amount,
			currency: "INR",
		},
		userInfo: {
			custId: panNumber,
		},
	};

	PaytmChecksum.generateSignature(
		JSON.stringify(paytmParams.body),
		process.env.MERCHANT_KEY
	).then(function (checksum) {
		paytmParams.head = {
			signature: checksum,
		};

		var post_data = JSON.stringify(paytmParams);

		var options = {
			hostname: process.env.HOSTNAME,

			port: 443,
			path: `/theia/api/v1/initiateTransaction?mid=${process.env.MERCHANT_ID}&orderId=${orderId}`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Content-Length": post_data.length,
			},
		};

		var response = "";
		var post_req = https.request(options, function (post_res) {
			post_res.on("data", function (chunk) {
				response += chunk;
			});

			post_res.on("end", function () {
				return res.json({
					response,
					orderId: paytmParams.body.orderId,
				});
			});
		});

		post_req.write(post_data);
		post_req.end();
	});
};

const status = async (req, res) => {
	const { STATUS: status, ORDERID: orderId } = req.body;

	const donator = await Donator.findOne({ orderId });

	if (status === "TXN_SUCCESS") {
		if (donator) {
			donator.isValid = true;
			await donator.save();
		}

		return res.sendFile(path.resolve(__dirname + "/../client/success.html"));
	}

	if (donator) {
		await Donator.deleteOne({ _id: donator._id });
	}

	res.sendFile(path.resolve(__dirname + "/../client/failure.html"));
};

const deleteInvalid = async (req, res) => {
	await Donator.deleteMany({ isValid: false });

	return res.status(200).json({
		success: true,
		json: "Successfully removed invalid entries",
	});
};

module.exports = {
	home,
	mission,
	contact,
	gallery,
	donation,
	paynow,
	status,
	deleteInvalid,
};
