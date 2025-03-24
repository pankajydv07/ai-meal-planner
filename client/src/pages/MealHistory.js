import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { getUserMealHistory } from '../utils/api';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const MealHistory = () => {
  const { user, loading: contextLoading } = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!contextLoading && !user) {
      navigate('/login');
      return;
    }
    
    if (user) {
      fetchMealHistory();
    }
  }, [user, contextLoading, navigate]);
  
  const fetchMealHistory = async () => {
    setLoading(true);
    try {
      const historyData = await getUserMealHistory(user._id);
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching meal history:', error);
      setError('Failed to load meal history. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (contextLoading || !user) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ mt: 5 }}>
          Loading...
        </Typography>
      </Container>
    );
  }
  
  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Your Meal Planning History
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <CircularProgress />
        </div>
      ) : history.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 5 }}>
          No meal planning history found. Start by generating a meal plan!
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip label={item.action} color={getChipColor(item.action)} />
                  </TableCell>
                  <TableCell>{item.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

// Helper function to get chip color based on action
const getChipColor = (action) => {
  switch (action) {
    case 'created':
      return 'success';
    case 'viewed':
      return 'info';
    case 'modified':
      return 'warning';
    case 'deleted':
      return 'error';
    default:
      return 'default';
  }
};

export default MealHistory;
