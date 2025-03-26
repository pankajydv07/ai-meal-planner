const express = require('express');
const chatbotController = require('../controllers/chatbotController');

const router = express.Router();

// Get chatbot response
router.post('/message', chatbotController.getChatbotResponse);

module.exports = router;
