const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true,
  },
  expectationPrice: {
    type: Number,
    required: true,
  },
  productAmount: {
    type: String,
    required: true,
  },
  productAreaSize: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  viloyat: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true,
  },
  tuman: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true,
  },
  photos: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
