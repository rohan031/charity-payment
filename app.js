const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

require("dotenv").config();

// middlewares for serving static files and parsing json data
app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const charity = require("./routes/charity");
// routes
app.use("/", charity);

// run express server
app.listen(PORT, (err) => {
	if (err) {
		console.log("Error starting server, ", err);
	} else {
		console.log("Server is running on PORT: ", PORT);
	}
});
