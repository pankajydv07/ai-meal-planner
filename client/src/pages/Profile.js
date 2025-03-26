import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { updateUserPreferences, getUserById } from '../utils/api';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Grid,
  Paper
} from '@mui/material';

const Profile = () => {
  const { user, updateUser, loading: contextLoading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    dietaryPreferences: '',
    allergies: '',
    pantryItems: '',
    calorieTarget: 2000
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!contextLoading && !user) {
      navigate('/login');
      return;
    }
    
    if (user) {
      const fetchUserData = async () => {
        try {
          const userData = await getUserById(user._id);
          setFormData({
            dietaryPreferences: userData.dietaryPreferences.join(', '),
            allergies: userData.allergies.join(', '),
            pantryItems: userData.pantryItems.join(', '),
            calorieTarget: userData.calorieTarget || 2000
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      
      fetchUserData();
    }
  }, [user, contextLoading, navigate]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const preferences = {
        dietaryPreferences: formData.dietaryPreferences.split(',').map(item => item.trim()).filter(Boolean),
        allergies: formData.allergies.split(',').map(item => item.trim()).filter(Boolean),
        pantryItems: formData.pantryItems.split(',').map(item => item.trim()).filter(Boolean),
        calorieTarget: parseInt(formData.calorieTarget) || 2000
      };
      
      const updatedUser = await updateUserPreferences(user._id, preferences);
      updateUser(updatedUser);
      setMessage('Profile updated successfully!');
      navigate('/meal-plan');
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (contextLoading || !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Profile
        </Typography>
        
        {message && (
          <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ marginBottom: 2 }}>
            {message}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={user.name}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          
          <TextField
            label="Email"
            value={user.email}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          
          <TextField
            label="Dietary Preferences (comma-separated)"
            name="dietaryPreferences"
            value={formData.dietaryPreferences}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="vegetarian, low-carb, etc."
          />
          
          <TextField
            label="Allergies (comma-separated)"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="nuts, dairy, etc."
          />
          
          <TextField
            label="Pantry Items (comma-separated)"
            name="pantryItems"
            value={formData.pantryItems}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="rice, beans, chicken, etc."
            multiline
            rows={3}
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
          
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;

