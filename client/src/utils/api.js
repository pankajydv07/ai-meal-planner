import axios from 'axios';



// client/src/utils/api.js
const API_URL = 'https://aimeal-adgggvd8h6hyhgbh.centralindia-01.azurewebsites.net/api'

// User API calls
export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/users/login`, loginData);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const updateUserPreferences = async (userId, preferences) => {
  const response = await axios.put(`${API_URL}/users/${userId}`, preferences);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};

// Meal plan API calls
// client/src/utils/api.js
export const generateMealPlan = async (userId, additionalInstructions = '') => {
  const response = await axios.post(`${API_URL}/meals/generate`, { 
    userId, 
    additionalInstructions 
  });
  return response.data;
};


export const getUserMealPlans = async (userId) => {
  const response = await axios.get(`${API_URL}/meals/user/${userId}`);
  return response.data;
};

export const getUserMealHistory = async (userId) => {
  const response = await axios.get(`${API_URL}/meals/history/${userId}`);
  return response.data;
};

export const deleteMealPlan = async (planId) => {
  const response = await axios.delete(`${API_URL}/meals/plan/${planId}`);
  return response.data;
};

// Update this function in your api.js file
export const getChatbotResponse = async (message, history = [], userPreferences = null) => {
  const response = await axios.post(`${API_URL}/chatbot/message`, { 
    message, 
    history,
    userPreferences 
  });
  return response.data;
};
