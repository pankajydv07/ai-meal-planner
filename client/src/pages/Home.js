import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="display-4 fw-bold text-primary mb-3">AI Meal Planner</h1>
          <p className="lead fs-4 mb-4">
            Your personal AI assistant for meal planning based on your preferences and pantry items.
          </p>
          
          {user ? (
            <Link to="/meal-plan" className="btn btn-primary btn-lg px-4 py-2 shadow-sm">
              <i className="bi bi-magic me-2"></i>Generate Meal Plan
            </Link>
          ) : (
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
              <Link to="/login" className="btn btn-primary btn-lg px-4 py-2 shadow-sm">
                <i className="bi bi-box-arrow-in-right me-2"></i>Get Started
              </Link>
              <Link to="/signup" className="btn btn-outline-primary btn-lg px-4 py-2">
                <i className="bi bi-person-plus me-2"></i>Sign Up
              </Link>
            </div>
          )}
        </div>
        <div className="col-lg-6 d-none d-lg-block">
          <img 
            src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e" 
            alt="Healthy meal preparation" 
            className="img-fluid rounded-3 shadow-lg"
            style={{ objectFit: 'cover', height: '400px', width: '100%' }}
          />
        </div>
      </div>
      
      <div className="row mt-5 pt-3">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold">Why Choose Our AI Meal Planner?</h2>
          <div className="border-bottom border-primary mx-auto my-3" style={{ width: '50px', borderWidth: '3px' }}></div>
        </div>
      </div>
      
      <div className="row g-4 mt-2">
        <div
          className="card h-100 border-0 shadow-sm"
          style={{
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div className="card-body text-center p-4">
            <div
              className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center"
              style={{ width: '60px', height: '60px' }}
            >
              <i className="bi bi-calendar-check fs-4"></i>
            </div>
            <h5 className="card-title fw-bold">Personalized Meal Plans</h5>
            <p className="card-text">Get meal plans tailored to your dietary preferences and restrictions.</p>
          </div>
        </div>
        <div
          className="card h-100 border-0 shadow-sm"
          style={{
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div className="card-body text-center p-4">
            <div
              className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center"
              style={{ width: '60px', height: '60px' }}
            >
              <i className="bi bi-basket fs-4"></i>
            </div>
            <h5 className="card-title fw-bold">Use What You Have</h5>
            <p className="card-text">Create recipes based on ingredients already in your pantry.</p>
          </div>
        </div>
        <div
          className="card h-100 border-0 shadow-sm"
          style={{
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div className="card-body text-center p-4">
            <div
              className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center"
              style={{ width: '60px', height: '60px' }}
            >
              <i className="bi bi-piggy-bank fs-4"></i>
            </div>
            <h5 className="card-title fw-bold">Save Time & Money</h5>
            <p className="card-text">Reduce food waste and simplify your grocery shopping.</p>
          </div>
        </div>
      </div>
      
      <div className="row mt-5 pt-5">
        <div className="col-12 text-center">
          <div className="p-4 bg-light rounded-3 shadow-sm">
            <h3 className="fw-bold mb-3">Ready to transform your meal planning?</h3>
            <p className="lead mb-4">Join thousands of users who have simplified their cooking routine.</p>
            {user ? (
              <Link to="/meal-plan" className="btn btn-primary btn-lg px-4">Start Planning</Link>
            ) : (
              <Link to="/signup" className="btn btn-primary btn-lg px-4">Create Free Account</Link>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
