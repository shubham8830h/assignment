const express=require('express')
const router=express.Router()
const customerConroller=require('../controller/customerController')
const cardController=require('../controller/cardController')

router.post('/createCustomer', customerConroller.createCustomer)
router.get("/getAllCustomers", customerConroller.getAllCustomers);
router.delete("/deleteCustomer/:customerID", customerConroller.deleteCustomer);
router.get("/getCards", cardController.getCards);
router.post("/createCard", cardController.createCard);

module.exports=router
