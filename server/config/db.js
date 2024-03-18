/* eslint-disable no-undef */
const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/lurny";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Mongodb connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
