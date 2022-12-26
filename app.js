const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

require("dotenv").config();

// middlewares for serving static files and parsing json data
app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const charity = require("./routes/charity");
// routes
app.use("/", charity);

// run express server
//Connect to the database before listening
connectDB().then(() => {
	app.listen(PORT, (error) => {
		if (error) {
			console.log("Error starting server, ", error);
		} else {
			console.log("Server is listening on Port: ", PORT);
		}
	});
});
