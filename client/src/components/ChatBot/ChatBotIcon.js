import React from 'react';
import './ChatBot.css';

const ChatBotIcon = ({ onClick }) => {
  return (
    <div className="chatbot-icon" onClick={onClick}>
      <div className="chatbot-icon-inner">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-tabler-message-chatbot">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
          <path d="M9.5 9h.01" />
          <path d="M14.5 9h.01" />
          <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
        </svg>
      </div>
      <div className="pulse"></div>
    </div>
  );
};

export default ChatBotIcon;
