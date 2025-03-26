const llamaService = require('../services/llamaService');

exports.getChatbotResponse = async (req, res) => {
  try {
    const { message, history, userPreferences } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    const response = await llamaService.generateChatbotResponse(message, history, userPreferences);
    
    res.status(200).json({ message: response });
  } catch (error) {
    console.error('Error in chatbot response:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
