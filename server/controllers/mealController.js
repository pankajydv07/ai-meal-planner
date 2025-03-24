const MealPlan = require('../models/MealPlan');
const MealHistory = require('../models/MealHistory');
const User = require('../models/User');
const llamaService = require('../services/llamaService');

// Generate a new meal plan
// server/controllers/mealController.js
exports.generateMealPlan = async (req, res) => {
  try {
    const { userId, additionalInstructions = '' } = req.body;
    
    // Get user preferences and pantry items
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate meal plan using Llama
    const mealPlanData = await llamaService.generateMealPlan(
      user.dietaryPreferences,
      user.allergies,
      user.pantryItems,
      user.calorieTarget,
      additionalInstructions
    );
    
    // Calculate total calories
    let totalCalories = 0;
    const formattedMeals = formatMealsFromLlamaResponse(mealPlanData);
    formattedMeals.forEach(meal => {
      totalCalories += meal.calories || 0;
    });
    
    // Save meal plan to database
    const mealPlan = new MealPlan({
      user: userId,
      meals: formattedMeals,
      preferences: user.dietaryPreferences,
      pantryItems: user.pantryItems,
      totalCalories,
      additionalInstructions
    });
    
    await mealPlan.save();
    
    // Record this action in meal history
    const history = new MealHistory({
      user: userId,
      mealPlan: mealPlan._id,
      action: 'created',
      details: `Generated new meal plan with ${formattedMeals.length} meals${additionalInstructions ? ' and custom instructions' : ''}`
    });
    
    await history.save();
    
    res.status(201).json(mealPlan);
  } catch (error) {
    console.error('Error in generateMealPlan:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get meal plans for a user
exports.getUserMealPlans = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const mealPlans = await MealPlan.find({ user: userId })
      .sort({ generatedFor: -1 })
      .limit(5);
    
    // Record this action in meal history
    const history = new MealHistory({
      user: userId,
      action: 'viewed',
      details: 'Viewed meal plan history'
    });
    
    await history.save();
    
    res.status(200).json(mealPlans);
  } catch (error) {
    console.error('Error in getUserMealPlans:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get meal history for a user
exports.getUserMealHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const history = await MealHistory.find({ user: userId })
      .sort({ date: -1 })
      .limit(20)
      .populate('mealPlan', 'generatedFor totalCalories');
    
    res.status(200).json(history);
  } catch (error) {
    console.error('Error in getUserMealHistory:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper function to format meals from Llama response
function formatMealsFromLlamaResponse(llamaResponse) {
  try {
    const formattedMeals = [];
    
    // Process each day in the meal plan
    llamaResponse.days.forEach(day => {
      day.meals.forEach(meal => {
        formattedMeals.push({
          name: meal.name,
          ingredients: meal.ingredients,
          instructions: meal.instructions,
          prepTime: meal.prepTime || 30,
          mealType: meal.type.toLowerCase(),
          calories: meal.calories || 0,
          protein: meal.protein || 0,
          carbs: meal.carbs || 0,
          fat: meal.fat || 0
        });
      });
    });
    
    return formattedMeals;
  } catch (error) {
    console.error('Error formatting meals:', error);
    return [];
  }
}

exports.deleteMealPlan = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the meal plan
    const deletedPlan = await MealPlan.findByIdAndDelete(id);
    
    if (!deletedPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    
    // Record this action in meal history
    const history = new MealHistory({
      user: deletedPlan.user,
      action: 'deleted',
      details: `Deleted meal plan from ${new Date(deletedPlan.generatedFor).toLocaleDateString()}`
    });
    
    await history.save();
    
    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};