import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { deleteMealPlan } from '../utils/api';
import { generateMealPlan, getUserMealPlans } from '../utils/api';
import MealCard from '../components/MealCard';
import './MealPlan.css'; // You'll need to create this CSS file

const MealPlan = () => {
  const { user, loading: contextLoading } = useContext(UserContext);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [activePlan, setActivePlan] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!contextLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchMealPlans();
    }
  }, [user, contextLoading, navigate]);

  const fetchMealPlans = async () => {
    setLoading(true);
    try {
      const plans = await getUserMealPlans(user._id);
      setMealPlans(plans);
      if (plans.length > 0) {
        setActivePlan(plans[0]._id);
      }
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      setError('Failed to load meal plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMealPlan = async () => {
    setGenerating(true);
    setError('');
    try {
      await generateMealPlan(user._id, additionalInstructions);
      // Reset instructions after generating
      setAdditionalInstructions('');
      setShowInstructions(false);
      await fetchMealPlans();
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setError('Failed to generate meal plan. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (contextLoading || !user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const getActivePlan = () => {
    return mealPlans.find((plan) => plan._id === activePlan);
  };

  const groupMealsByDay = (meals) => {
    const groupedMeals = [];
    for (let i = 0; i < meals.length; i += 3) {
      groupedMeals.push(meals.slice(i, i + 3));
    }
    return groupedMeals;
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this meal plan?')) {
      try {
        await deleteMealPlan(planId);
        // Remove the deleted plan from state
        setMealPlans(mealPlans.filter(plan => plan._id !== planId));
        // If the active plan was deleted, set a new active plan
        if (activePlan === planId && mealPlans.length > 1) {
          const remainingPlans = mealPlans.filter(plan => plan._id !== planId);
          setActivePlan(remainingPlans[0]._id);
        }
      } catch (error) {
        console.error('Error deleting meal plan:', error);
        setError('Failed to delete meal plan. Please try again.');
      }
    }
  };

  return (
    <div className="meal-plan-container">
      <div className="meal-plan-header">
        <h1 className="page-title">Your Meal Plans</h1>
        <div className="header-buttons">
          <button
            className="instruction-toggle-button"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            {showInstructions ? 'Hide Options' : 'Add Custom Instructions'}
          </button>
          <button
            className={`generate-button ${generating ? 'generating' : ''}`}
            onClick={handleGenerateMealPlan}
            disabled={generating}
          >
            {generating ? (
              <div className="generating-text">
                <span>Generating</span>
                <span className="dots">...</span>
              </div>
            ) : (
              'Generate New Plan'
            )}
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="instructions-container">
          <textarea
            className="instructions-input"
            placeholder="Add specific instructions for your meal plan (e.g., 'Include more Mediterranean dishes', 'Focus on high-protein meals', etc.)"
            value={additionalInstructions}
            onChange={(e) => setAdditionalInstructions(e.target.value)}
            rows="2"
          ></textarea>
          <small className="instructions-hint">These instructions will be included when generating your meal plan.</small>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : mealPlans.length === 0 ? (
        <div className="empty-state">
          <p className="empty-primary-text">You don't have any meal plans yet.</p>
          <p className="empty-secondary-text">
            Click the button above to generate your first meal plan!
          </p>
        </div>
      ) : (
        <div className="meal-plans-content">
          {/* Plan selector tabs */}
          <div className="plan-tabs">
            {mealPlans.map((plan, index) => (
              <button
                key={plan._id}
                className={`plan-tab ${activePlan === plan._id ? 'active' : ''}`}
                onClick={() => setActivePlan(plan._id)}
              >
                Plan #{index + 1}
              </button>
            ))}
          </div>

          {/* Active plan view */}
          {getActivePlan() && (
            <div className="active-plan">
              <div className="plan-header">
                <div className="plan-header-content">
                  <h2 className="plan-title">
                    Meal Plan for {new Date(getActivePlan().generatedFor).toLocaleDateString()}
                  </h2>

                  <div className="plan-actions">
                    <button
                      className="delete-button"
                      onClick={() => handleDeletePlan(getActivePlan()._id)}
                    >
                      Delete Plan
                    </button>
                  </div>


                  <div className="plan-info">
                    {getActivePlan().totalCalories && (
                      <span className="calorie-badge">
                        {getActivePlan().totalCalories} calories total
                      </span>
                    )}
                    {getActivePlan().additionalInstructions && (
                      <div className="custom-instructions">
                        <span className="instructions-label">Custom Instructions:</span>
                        {getActivePlan().additionalInstructions}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              

              {/* Group meals by day */}
              <div className="meal-days">
                {groupMealsByDay(getActivePlan().meals).map((dayMeals, dayIndex) => (
                  <div key={dayIndex} className="meal-day">
                    <h3 className="day-title">Day {dayIndex + 1}</h3>

                    <div className="meal-cards-container">
                      {dayMeals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="meal-card-wrapper">
                          <MealCard meal={meal} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MealPlan;
