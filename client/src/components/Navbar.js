import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleNavbar = () => setIsOpen(!isOpen);
  
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={{ backgroundColor: '#4361ee' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-white d-flex align-items-center" to="/">
          <i className="bi bi-calendar-check me-2"></i>
          AI Meal Planner
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleNavbar}
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-1">
              <Link className={`nav-link text-white px-3 py-2 rounded ${isActive('/')}`} to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            
            {user ? (
              <>
                <li className="nav-item mx-1">
                  <Link className={`nav-link text-white px-3 py-2 rounded ${isActive('/meal-plan')}`} to="/meal-plan">
                    <i className="bi bi-calendar-week me-1"></i> Meal Plans
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link className={`nav-link text-white px-3 py-2 rounded ${isActive('/meal-history')}`} to="/meal-history">
                    <i className="bi bi-clock-history me-1"></i> History
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link className={`nav-link text-white px-3 py-2 rounded ${isActive('/profile')}`} to="/profile">
                    <i className="bi bi-person-circle me-1"></i> Profile
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <button 
                    className="btn btn-outline-light px-3 py-2 ms-2" 
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-1">
                  <Link className={`nav-link text-white px-3 py-2 rounded ${isActive('/login')}`} to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link className="btn btn-light px-3 py-2 ms-2" to="/signup">
                    <i className="bi bi-person-plus me-1"></i> Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
