const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const mealRoutes = require('./routes/mealRoutes');
const userRoutes = require('./routes/userRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
// Initialize Express app
const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(cors());
app.use(express.json());


async function main() {
    await mongoose.connect(your_database_url);
}

// Connect to MongoDB
main()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/meals', mealRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start server
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});



  app.get('/', (req, res) => {
    res.send({status:'working fine',error:false})
  });



module.exports = app;
