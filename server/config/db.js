const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://yakiv390497:N4gkZwUKD2GahJVA@cluster0.mem6wir.mongodb.net/";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Mongodb connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
