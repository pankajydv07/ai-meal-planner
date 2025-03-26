import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';

const ChatBotDialog = ({ isOpen, onClose, sendMessage, userPreferences }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      text: "Hey there! I'm Chef Byte, your energetic meal planning assistant! 🥗 What dietary questions can I help you with today?", 
      sender: 'bot' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Add suggestions based on user context if available
  const getSuggestions = () => {
    const defaultSuggestions = [
      "Healthy breakfast ideas",
      "Low-carb dinner recipes",
      "Foods high in protein",
      "Quick meal prep tips"
    ];
    
    // Add personalized suggestions if user preferences exist
    if (userPreferences?.dietaryPreferences?.length > 0) {
      return [
        `${userPreferences.dietaryPreferences[0]} recipe ideas`,
        ...defaultSuggestions
      ];
    }
    
    return defaultSuggestions;
  };

  const handleSend = async (messageText) => {
    const textToSend = messageText || input.trim();
    if (textToSend === '') return;
    
    // Hide suggestions after first message
    setShowSuggestions(false);
    
    // Add user message
    const userMessage = { text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Get response from AI
      const response = await sendMessage(textToSend);
      
      // Add bot message
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { 
        text: "Oops! My recipe brain had a little hiccup. Let's try again!", 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className={`chatbot-dialog ${isMinimized ? 'minimized' : ''}`}>
    <div className="chatbot-header">
      <h3>Chef Byte</h3>
      <div className="header-controls">
        <button 
          className="minimize-button" 
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? '↗' : '↘'}
        </button>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
    {!isMinimized && (
        <>

      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === 'bot' && (
              <div className="bot-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                  <path d="M9.5 9h.01" />
                  <path d="M14.5 9h.01" />
                  <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
                </svg>
              </div>
            )}
            <div className="message-bubble">
              {message.sender === 'bot' ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot">
            <div className="bot-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                <path d="M9.5 9h.01" />
                <path d="M14.5 9h.01" />
                <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
              </svg>
            </div>
            <div className="message-bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Only show suggestion buttons if showSuggestions is true */}
      {showSuggestions && (
        <div className="suggestion-buttons">
          {getSuggestions().map((suggestion, index) => (
            <button 
              key={index} 
              className="suggestion-button"
              onClick={() => handleSend(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about diets, recipes, or nutrition..."
        />
        <button onClick={() => handleSend()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      </>
      )}
    </div>

  );
};

export default ChatBotDialog;
