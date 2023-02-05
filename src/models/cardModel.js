const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const Customer = require("./customerModel");
const cardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
      enum: ["Regular", "Special"],
    },
    customerName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    vision: {
      type: String,
      required: true,
    },
    customerID: {
      type: ObjectId,
      required: true,
      ref: "Customer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("card", cardSchema);