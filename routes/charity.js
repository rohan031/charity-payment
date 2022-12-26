const express = require("express");
const route = express.Router();

const {
	home,
	mission,
	contact,
	gallery,
	donation,
	paynow,
	status,
	deleteInvalid,
} = require("../controllers/charity");

route.get("/", home);

route.get("/mission", mission);

route.get("/contact", contact);

route.get("/gallery", gallery);

route.get("/donation", donation);

route.post("/paynow", paynow);

route.post("/status", status);

route.get("/deleteInvalid", deleteInvalid);

module.exports = route;
