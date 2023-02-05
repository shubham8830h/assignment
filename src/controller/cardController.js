const CardModel = require("../models/cardModel");
const CustomerModel = require("../models/customerModel");

const createCard = async (req, res) => {
  try {
    const { cardType, vision, customerID } = req.body;
   
    const customer = await CustomerModel.findOne({ customerID });

    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    const newcard = await CardModel.create({
      cardNumber: `C${(await CardModel.count()) + 1}`,
      cardType: cardType,
      customerName: `${customer.firstName} ${customer.lastName}`,
      status: "ACTIVE",
      vision: vision,
      customerID: customer._id,
    });

    // Populate the customer information in the response
    const populatedCard = await newcard.populate(
      "customerID",
      "firstName lastName mobileNumber DOB emailID address customerID status"
    );
    return res
      .status(200)
      .send({
        success: true,
        message: "New card created successfully",
        card: populatedCard,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Could not create the card" });
  }
};

const getCards = async (req, res) => {
  try {
    const getCards = await CardModel.find({}).populate("customerID");
    res
      .status(200)
      .send({
        status: true,
        message: "Get all cards successfully",
        data: getCards,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not fetch the cards" });
  }
};

module.exports = { createCard, getCards };
