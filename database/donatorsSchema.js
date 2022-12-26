const mongoose = require("mongoose");

const donatorsSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	panNumber: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	district: {
		type: String,
		required: true,
	},
	pinCode: {
		type: Number,
		required: true,
	},
	orderId: {
		type: String,
		required: true,
	},
	isValid: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model("Donator", donatorsSchema);
