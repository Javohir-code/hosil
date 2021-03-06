const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true,
  },
  msisdn: {
    type: String,
    unique: true,
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
  organizationName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
