const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  prepTime: Number,
  mealType: String, // breakfast, lunch, dinner, snack
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number
});

const MealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  meals: [MealSchema],
  generatedFor: {
    type: Date,
    default: Date.now
  },
  preferences: [String],
  pantryItems: [String],
  totalCalories: Number,
  additionalInstructions: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);
