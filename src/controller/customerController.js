const cardModel = require("../models/cardModel");
const CustomerModel = require("../models/customerModel");
const {
  isValid,
  isVAlidRequestBody,
  phoneRegex,
  emailRegex,
  objectIdValid,
} = require("../validators/validator");
const { v4: uuidv4 } = require("uuid");

// const customerCreate = async function (req, res) {
//   try {
//     const data = req.body;
//     if (!isVAlidRequestBody(data)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "please give the input correctly" });
//     }
//     const {
//       firstName,
//       lastName,
//       mobileNumber,
//       DOB,
//       emailID,
//       address,
//       customerId,
//       status,
//     } = data;

//     const createcustomer = await customerModel.create({
//       firstName: data.firstName,
//       lastName: data.lastName,
//       mobileNumber: data.mobileNumber,
//       DOB: data.DOB,
//       emailID: data.emailID,
//       address: data.address,
//       customerId: data.customerId,
//       status: data.status,
//     });
//     return res
//       .status(201)
//       .send({
//         status: true,
//         message: "sucessful created",
//         data: createcustomer,
//       });
//   } catch (error) {
//     res.status(500).send({ status: false, error: error.message });
//   }
// };
const createCustomer = async function (req, res) {
  try {
    const data = req.body;

    if (!isVAlidRequestBody(data)) {
      return res.status(400).send({
        status: false,
        message: "Please give the Input to Create the Customer",
      });
    }

    const {
      firstName,
      lastName,
      mobileNumber,
      DOB,
      emailID,
      address,
      customerID,
      status,
    } = data;

    //validations

    if (!isValid(firstName)) {
      return res.status(400).send({
        status: false,
        message: "FirstName is mandatory and should have non empty String",
      });
    }

    if (!isValid(lastName)) {
      return res.status(400).send({
        status: false,
        message: "LastName is mandatory and should have non empty String",
      });
    }

    if (!isValid(mobileNumber)) {
      return res.status(400).send({
        status: false,
        message: "Mobile Number is mandatory and should have non empty String",
      });
    }

    if (!phoneRegex.test(mobileNumber)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide Valid Mobile Number" });
    }

    const isMobileAlreadyUsed = await CustomerModel.findOne({ mobileNumber });
    if (isMobileAlreadyUsed) {
      return res
        .status(400)
        .send({ status: false, message: "Mobile Number Already Registered" });
    }

    if (!isValid(DOB)) {
      return res.status(400).send({
        status: false,
        message: "DOB is mandatory and should have non empty String",
      });
    }

    if (!isValid(emailID)) {
      return res.status(400).send({
        status: false,
        message: "Email is mandatory and should have non empty String",
      });
    }

    if (!emailRegex.test(emailID)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide Valid Email" });
    }

    const isEmailAlreadyUsed = await CustomerModel.findOne({ emailID });
    if (isEmailAlreadyUsed) {
      return res
        .status(400)
        .send({ status: false, message: "Email Already Registered" });
    }

    if (!isValid(address)) {
      return res.status(400).send({
        status: false,
        message: "Address is mandatory and should have non empty String",
      });
    }

    if (!isValid(status)) {
      return res
        .status(400)
        .send({ status: false, message: "status is mandatory" });
    }

    let statusSelection = ["ACTIVE", "INACTIVE"];

    if (!statusSelection.includes(status)) {
      return res.status(400).send({
        status: false,
        message: `Status should be among  ${statusSelection} `,
      });
    }

    const newCustomer = await CustomerModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      DOB: data.DOB,
      emailID: data.emailID,
      address: data.address,
      customerID: uuidv4(),
      status: "ACTIVE",
    });
    return res.status(201).send({
      status: true,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, error: err.message });
  }
};

const getAllCustomers = async function (req, res) {
  try {
    // Find all customers with status ACTIVE and populate their associated cards
    const allCustomers = await CustomerModel.find({ status: "ACTIVE" });
    return res.status(200).send({
      status: true,
      msg: "getting list successfully",
      data: allCustomers,
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

const deleteCustomer = async function (req, res) {
  try {
    const data = req.params.customerID;

    if (!objectIdValid(data)) {
      return res.status(400).send({
        staus: false,
        message: "the Customer Id should be in 24 character",
      });
    }

    const deleteCustomer = await CustomerModel.findByIdAndDelete(data);
    return res
      .status(200)
      .send({ status: true, message: "customer is deleted successfully" });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

module.exports = { createCustomer, deleteCustomer, getAllCustomers };
