const mongoose = require('mongoose');

const MealHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealPlan'
  },
  date: {
    type: Date,
    default: Date.now
  },
  action: {
    type: String,
    enum: ['created', 'viewed', 'modified', 'deleted'],
    required: true
  },
  details: {
    type: String
  }
});

module.exports = mongoose.model('MealHistory', MealHistorySchema);
