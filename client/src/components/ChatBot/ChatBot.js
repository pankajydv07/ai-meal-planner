import React, { useState, useContext, useEffect } from 'react';
import ChatBotIcon from './ChatBotIcon';
import ChatBotDialog from './ChatBotDialog';
import { getChatbotResponse } from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const { user } = useContext(UserContext);

  // Load conversation history from localStorage when component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      try {
        setConversationHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error parsing chat history:', e);
      }
    }
  }, []);

  // Save conversation history to localStorage when it changes
  useEffect(() => {
    if (conversationHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
    }
  }, [conversationHistory]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (message) => {
    try {
      // Add message to conversation history
      const newHistory = [...conversationHistory, { role: 'user', content: message }];
      setConversationHistory(newHistory);
      
      // Get user preferences if available
      const userPreferences = user ? {
        dietaryPreferences: user.dietaryPreferences || [],
        allergies: user.allergies || [],
        calorieTarget: user.calorieTarget || 2000
      } : null;
      
      // Send message, history and user preferences to backend
      const response = await getChatbotResponse(message, newHistory, userPreferences);
      
      // Add response to conversation history
      setConversationHistory([...newHistory, { role: 'assistant', content: response.message }]);
      
      return response.message;
    } catch (error) {
      console.error('Error in chatbot response:', error);
      throw error;
    }
  };

  return (
    <div className="chatbot-container">
      <ChatBotIcon onClick={toggleChat} />
      <ChatBotDialog 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        sendMessage={sendMessage}
        userPreferences={user}
      />
    </div>
  );
};

export default ChatBot;
