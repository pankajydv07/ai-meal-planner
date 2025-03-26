# 🍽️ AI Meal Planner

AI Meal Planner is a MERN stack application that generates personalized meal plans based on user preferences, dietary restrictions, and available pantry items using AI technology.

## 📋 Features

- 🧠 AI-powered meal plan generation using meta-llama/Meta-Llama-3.1-70B-Instruct by Nebius AI Studio
- 👤 User account creation and authentication
- 🤖 ai-powered chat assistant – provides dietary advice and personalized meal suggestions.
- 🥗 Personalized meal recommendations based on dietary preferences
- 🧪 Allergy and dietary restriction filtering
- 🥫 Pantry-based recipe suggestions to reduce food waste
- 📝 Custom instructions for meal plan generation
- 📊 Nutritional information for each meal
- 📜 Meal planning history tracking

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: Nebius AI Studio (Meta-Llama-3.1-8B-Instruct)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Nebius AI Studio API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-meal-planner.git
   cd ai-meal-planner
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NEBIUS_API_KEY=your_nebius_api_key
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Start the development servers**
   
   Backend:
   ```bash
   cd ../server
   node server.js
   ```
   
   Frontend:
   ```bash
   cd ../client
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
ai-meal-planner/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # UI components
│       ├── contexts/       # React contexts
│       ├── pages/          # Page components
│       └── utils/          # Utility functions
│
└── server/                 # Node.js backend
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    └── services/           # Business logic
```

## 🧩 API Endpoints

### User Endpoints
- `POST /api/users/login` - User login
- `POST /api/users` - Create new user
- `PUT /api/users/:userId` - Update user preferences
- `GET /api/users/:userId` - Get user details

### Meal Plan Endpoints
- `POST /api/meals/generate` - Generate new meal plan
- `GET /api/meals/user/:userId` - Get user's meal plans
- `GET /api/meals/history/:userId` - Get meal planning history
- `DELETE /api/meals/plan/:id` - Delete a meal plan

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Nebius AI Studio](https://nebius.ai/studio) for providing the AI model
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Bootstrap](https://getbootstrap.com/) for UI components
- [React](https://reactjs.org/) for the frontend framework

---

