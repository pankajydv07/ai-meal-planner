const express = require('express');
const mealController = require('../controllers/mealController');

const router = express.Router();

// Generate a new meal plan
router.post('/generate', mealController.generateMealPlan);

// Get meal plans for a user
router.get('/user/:userId', mealController.getUserMealPlans);

// Get meal history for a user
router.get('/history/:userId', mealController.getUserMealHistory);

router.delete('/plan/:id', mealController.deleteMealPlan);

module.exports = router;
