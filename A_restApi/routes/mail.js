const express = require("express");
const router = express.Router();

const mailController = require("../controllers/mail");


router.post('/send-email', mailController.sendMail);

router.get('/get-email', mailController.getEmail);

module.exports = router;
