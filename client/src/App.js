import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MealPlan from './pages/MealPlan';
import MealHistory from './pages/MealHistory';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatBot from './components/ChatBot/ChatBot';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/meal-plan" element={<MealPlan />} />
              <Route path="/meal-history" element={<MealHistory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <ChatBot /> 
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
