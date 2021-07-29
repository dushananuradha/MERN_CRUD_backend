const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

//to set express server & running port
const app = express();
const PORT = process.env.PORT || 4040;

app.use(cors());
app.use(bodyParser.json());

//mongoDB connection URL
const URL = process.env.MONGODB_URL;

//MongoDB configuration
mongoose.connect(URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB Connection Success!!");
});

app.get("/", (req, res) => {
	res.send("Root Route is on");
});

//import routes
const studentRouter = require("./routes/students");
app.use("/student", studentRouter);

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});
