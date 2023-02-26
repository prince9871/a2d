const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  issuedCount: {
    type: Number,
    default: 0,
  },
  isTorn: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: { type: Date },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Book", bookSchema);
