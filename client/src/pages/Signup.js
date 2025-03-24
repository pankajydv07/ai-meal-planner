import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dietaryPreferences: '',
    allergies: '',
    pantryItems: '',
    calorieTarget: 2000,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = {
        ...formData,
        dietaryPreferences: formData.dietaryPreferences.split(',').map((item) => item.trim()).filter(Boolean),
        allergies: formData.allergies.split(',').map((item) => item.trim()).filter(Boolean),
        pantryItems: formData.pantryItems.split(',').map((item) => item.trim()).filter(Boolean),
        calorieTarget: parseInt(formData.calorieTarget) || 2000,
      };

      await signup(userData);
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Dietary Preferences (comma-separated)"
            name="dietaryPreferences"
            value={formData.dietaryPreferences}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Allergies (comma-separated)"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Pantry Items (comma-separated)"
            name="pantryItems"
            value={formData.pantryItems}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Daily Calorie Target"
            name="calorieTarget"
            type="number"
            value={formData.calorieTarget}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ min: 1000, max: 5000 }}
          />

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
          </Box>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
