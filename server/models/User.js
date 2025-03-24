const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dietaryPreferences: {
    type: [String],
    default: []
  },
  allergies: {
    type: [String],
    default: []
  },
  pantryItems: {
    type: [String],
    default: []
  },
  calorieTarget: {
    type: Number,
    default: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
