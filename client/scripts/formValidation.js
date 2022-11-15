const firstName = selectElement("#firstName");
const firstNameError = selectElement("#input-error-firstName");

const lastName = selectElement("#lastName");
const lastNameError = selectElement("#input-error-lastName");

const email = selectElement("#email");
const emailError = selectElement("#input-error-email");

const phoneNumber = selectElement("#phoneNumber");
const phoneNumberError = selectElement("#input-error-phoneNumber");

const inputState = selectElement("#inputState");
const inputStateError = selectElement("#input-error-inputState");

const inputDistrict = selectElement("#inputDistrict");
const inputDistrictError = selectElement("#input-error-inputDistrict");

const pincode = selectElement("#pincode");
const pincodeError = selectElement("#input-error-pincode");

const address = selectElement("#address");
const addressError = selectElement("#input-error-address");

const amount = selectElement("#amount");
const amountError = selectElement("#input-error-amount");

const panNumber = selectElement("#panNumber");
const panNumberError = selectElement("#input-error-panNumber");

const terms = selectElement("#terms");
const termsError = selectElement("#input-error-terms");

const title = selectElement("#title");

const proceed = selectElement(".proceed");

const review = selectElement(".review-details");
const donation = selectElement(".donation");
const loader = selectElement(".loader");

const inputElements = [
	firstName,
	lastName,
	email,
	phoneNumber,
	inputState,
	inputDistrict,
	pincode,
	address,
	amount,
	panNumber,
];

terms.addEventListener("change", (e) => {
	if (e.target.checked) {
		termsError.innerHTML = "";
	}
});

const emailValidation = () => {
	let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (email.value.trim().match(mailFormat)) {
		emailError.innerHTML = "";

		return true;
	} else {
		emailError.innerHTML = "This is an invalid email!";

		return false;
	}
};

const phoneNumberValidation = () => {
	let mailFormat = /^[6-9]\d{9}$/;

	if (phoneNumber.value.trim().match(mailFormat)) {
		phoneNumberError.innerHTML = "";

		return true;
	} else {
		phoneNumberError.innerHTML = "Enter a valid phone number!";

		return false;
	}
};

const pinCodeValidation = () => {
	let mailFormat = /^[1-9][0-9]{5}$/;

	if (pincode.value.trim().match(mailFormat)) {
		pincodeError.innerHTML = "";

		return true;
	} else {
		pincodeError.innerHTML = "Enter a valid PIN code!";

		return false;
	}
};

const amountValidation = () => {
	let amountFormat = /^\d+$/;

	if (amount.value.trim().match(amountFormat)) {
		amountError.innerHTML = "";

		return true;
	} else {
		amountError.innerHTML = "Donation amount should be in number";

		return false;
	}
};

const panValidation = () => {
	let panNumberFormat = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

	if (panNumber.value.trim().match(panNumberFormat)) {
		panNumberError.innerHTML = "";
		return true;
	} else {
		panNumberError.innerHTML = "Invalid PAN number!";
		return false;
	}
};

const validateUserInputs = () => {
	let bool = false;

	if (firstName.value.trim() === "" || firstName.value === null) {
		bool = true;

		firstNameError.innerHTML = "First name is required to proceed!";
	} else {
		firstNameError.innerHTML = "";
	}

	if (lastName.value.trim() === "" || lastName.value === null) {
		bool = true;

		lastNameError.innerHTML = "Last name is required to proceed!";
	} else {
		lastNameError.innerHTML = "";
	}

	if (email.value.trim() === "" || email.value === null) {
		bool = true;

		emailError.innerHTML = "Email is required to proceed!";
	} else {
		emailError.innerHTML = "";
		if (!emailValidation()) bool = true;
	}

	if (phoneNumber.value.trim() === "" || phoneNumber.value === null) {
		bool = true;

		phoneNumberError.innerHTML = "Phone number is required to proceed!";
	} else {
		phoneNumberError.innerHTML = "";
		if (!phoneNumberValidation()) bool = true;
	}

	if (inputState.value.trim() === "" || inputState.value === null) {
		bool = true;

		inputStateError.innerHTML = "Please select your state to proceed!";
	} else {
		inputStateError.innerHTML = "";
	}

	if (inputDistrict.value.trim() === "" || inputDistrict.value === null) {
		bool = true;

		inputDistrictError.innerHTML = "Please select your district to proceed!";
	} else {
		inputDistrictError.innerHTML = "";
	}

	if (pincode.value.trim() === "" || pincode.value === null) {
		bool = true;

		pincodeError.innerHTML = "PIN code is required to proceed!";
	} else {
		pincodeError.innerHTML = "";
		if (!pinCodeValidation()) bool = true;
	}

	if (address.value.trim() === "" || address.value === null) {
		bool = true;

		addressError.innerHTML = "Address is required to proceed!";
	} else {
		addressError.innerHTML = "";
	}

	if (amount.value.trim() === "" || amount.value === null) {
		bool = true;

		amountError.innerHTML = "Please enter the amount you want to donate!";
	} else {
		amountError.innerHTML = "";
		if (!amountValidation()) bool = true;
	}

	if (panNumber.value.trim() === "" || panNumber.value === null) {
		bool = true;

		panNumberError.innerHTML = "Your PAN number is required to proceed!";
	} else {
		panNumberError.innerHTML = "";
		if (!panValidation()) bool = true;
	}

	return bool;
};

const displayDetails = (userInputs) => {
	const values = document.querySelectorAll(".review-details-wrapper__value-p");

	let i = 0;

	for (const prop in userInputs) {
		if (i < 9) {
			values[i].innerHTML = userInputs[prop];
		}
		i++;
	}

	// adding loader
	loader.style.display = "flex";
	wrapper.classList.add("loading");

	setTimeout(() => {
		donation.style.display = "none";

		// removing loader
		loader.style.display = "none";
		wrapper.classList.remove("loading");

		review.style.display = "block";
	}, 500);
};

let userInputs = {
	name: "",
	email: "",
	phoneNumber: "",
	state: "",
	district: "",
	pinCode: "",
	address: "",
	amountFormatting: "",
	panNumber: "",
	amount: "",
};

proceed.addEventListener("click", (event) => {
	event.preventDefault();

	if (!terms.checked) {
		termsError.innerHTML =
			"You need to agree to our Terms and Conditions to proceed.";
		return;
	}

	if (validateUserInputs()) {
		return;
	}

	const fullName =
		title.value + " " + firstName.value.trim() + " " + lastName.value.trim();

	userInputs = {
		name: fullName,
		email: email.value.trim(),
		phoneNumber: "+91 " + phoneNumber.value.trim(),
		state: inputState.value,
		district: inputDistrict.value,
		pinCode: pincode.value,
		address: address.value,
		amountFormatting: "₹ " + +amount.value,
		panNumber: panNumber.value.trim(),
		amount: +amount.value,
	};

	displayDetails(userInputs);
});

// inputElements.forEach((element) => {
// 	element.addEventListener("change", (e) => {
// 		validateUserInputs();
// 	});

// 	element.addEventListener("input", (e) => {
// 		validateUserInputs();
// 	});
// });

const previous = selectElement(".previous-review");
const proceedReview = selectElement(".proceed-review");

previous.addEventListener("click", () => {
	// adding loader
	loader.style.display = "flex";
	wrapper.classList.add("loading");

	setTimeout(() => {
		review.style.display = "none";

		// removing loader
		loader.style.display = "none";
		wrapper.classList.remove("loading");

		donation.style.display = "block";
	}, 500);
});

proceedReview.addEventListener("click", () => {
	// add code for donation link and saving user info to db
	// access userinfo using userInputs object at line 245
	// after proceeding from donation form all details will be there in the object

	loader.style.display = "flex";
	wrapper.classList.add("loading");

	const options = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json;charset=UTF-8",
		},
		body: JSON.stringify(userInputs),
	};

	fetch("/paynow", options)
		.then((res) => res.json())
		.then((res) => {
			const initPaytmObj = JSON.parse(res.response);
			const txntoken = initPaytmObj.body.txnToken;
			const orderId = res.orderId;

			var config = {
				root: "",
				flow: "DEFAULT",
				data: {
					orderId: orderId /* update order id */,
					token: txntoken /* update token value */,
					tokenType: "TXN_TOKEN",
					amount: userInputs.amount /* update amount */,
				},
				handler: {
					notifyMerchant: function (eventName, data) {
						console.log("notifyMerchant handler function called");
						console.log("eventName => ", eventName);
						console.log("data => ", data);
					},
				},
				redirect: false,
			};

			if (window.Paytm && window.Paytm.CheckoutJS) {
				// initialze configuration using init method
				window.Paytm.CheckoutJS.init(config)
					.then(function onSuccess() {
						// after successfully updating configuration, invoke JS Checkout
						loader.style.display = "none";
						wrapper.classList.remove("loading");
						window.Paytm.CheckoutJS.invoke();
					})
					.catch(function onError(error) {
						console.log("error => ", error);
					});
			}
		})
		.catch((err) => console.log(err));
});
