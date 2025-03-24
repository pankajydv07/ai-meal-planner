import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Avatar,
  Grid,
} from '@mui/material';
import { AccessTime, Fireplace, CheckCircle, Book, PieChart } from '@mui/icons-material';

const MealCard = ({ meal }) => {
  // Helper function to determine meal type badge color
  const getMealTypeColor = (mealType) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return 'warning';
      case 'lunch':
        return 'success';
      case 'dinner':
        return 'primary';
      case 'snack':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Card Header with Meal Image */}
      <CardHeader
        title={meal.name}
        subheader={
          <Chip
            label={meal.mealType}
            color={getMealTypeColor(meal.mealType)}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        }
      />
      {meal.imageUrl && (
        <CardMedia
          component="img"
          height="160"
          image={meal.imageUrl}
          alt={meal.name}
          sx={{ objectFit: 'cover' }}
        />
      )}

      {/* Card Body */}
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Prep Time and Calories */}
        <Box display="flex" alignItems="center" mb={2}>
          <AccessTime fontSize="small" color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {meal.prepTime} min prep
          </Typography>
          <Box ml="auto">
            <Chip
              icon={<Fireplace fontSize="small" color="error" />}
              label={`${meal.calories} cal`}
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>

        {/* Ingredients Section */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Ingredients
        </Typography>
        <Box
          sx={{
            backgroundColor: 'background.default',
            borderRadius: 1,
            p: 2,
            mb: 2,
          }}
        >
          {meal.ingredients.map((ingredient, index) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
              <Typography variant="body2">{ingredient}</Typography>
            </Box>
          ))}
        </Box>

        {/* Instructions Section */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Instructions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {meal.instructions}
        </Typography>
      </CardContent>

      {/* Card Footer with Nutrition Info */}
      <CardActions
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          flexDirection: 'column', // Ensure vertical alignment
          alignItems: 'flex-start', // Align text to the left
          gap: 1, // Add spacing between elements
        }}
      >
        <Box display="flex" alignItems="center" mb={1}>
          <PieChart fontSize="small" color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
            Nutrition Facts
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={4} textAlign="center">
            <Avatar
              sx={{
                bgcolor: '#3b82f6', // Updated background color for better contrast
                color: 'white', // Ensure text is visible
                mx: 'auto',
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {meal.protein}g
              </Typography>
            </Avatar>
            <Typography variant="caption" color="text.primary">
              Protein
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <Avatar
              sx={{
                bgcolor: '#10b981', // Updated background color for better contrast
                color: 'white', // Ensure text is visible
                mx: 'auto',
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {meal.carbs}g
              </Typography>
            </Avatar>
            <Typography variant="caption" color="text.primary">
              Carbs
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <Avatar
              sx={{
                bgcolor: '#f59e0b', // Updated background color for better contrast
                color: 'white', // Ensure text is visible
                mx: 'auto',
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {meal.fat}g
              </Typography>
            </Avatar>
            <Typography variant="caption" color="text.primary">
              Fat
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default MealCard;