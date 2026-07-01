const express = require("express");
const router = express.Router();
const { chatWithAssistant } = require("../controllers/chatbotController");

router.post("/", chatWithAssistant);

module.exports = router;
