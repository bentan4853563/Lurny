/* eslint-disable no-undef */
const mongoose = require("mongoose");

const LurnySchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // Typically model names are capitalized
  //   required: true, // Assuming every Lurny entry must be associated with a user
  // },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Removed the parentheses to use the function itself as the default value generator
  },
  title: {
    type: String,
    trim: true, // Trims whitespace from the beginning and end
    required: true, // Assuming title is required
  },
  summary: [
    {
      type: String,
    },
  ],
  quiz: [
    {
      type: Object,
    },
  ],
  collections: [{ type: String }],
  image: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  shared: {
    type: Boolean,
    default: false,
  },
});

LurnySchema.index({ "$**": "text" });

module.exports = mongoose.model("lurny", LurnySchema);
