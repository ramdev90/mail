const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
// need to add token middleware required in everywhen 


router.get("/products", shopController.getProducts);

module.exports = router;
