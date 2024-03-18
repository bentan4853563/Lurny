/* eslint-disable no-undef */
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: false },
  photoURL: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

// Create the model from the schema
const User = mongoose.model("user", userSchema);

module.exports = User;
