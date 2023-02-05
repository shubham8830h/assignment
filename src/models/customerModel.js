const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  DOB: {
    type: String,
    required: true,
    trim: true,
  },
  emailID: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  customerID: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    default: "ACTIVE",
    enum: ["ACTIVE", "INACTIVE"],
    trim: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
