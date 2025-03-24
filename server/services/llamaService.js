const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const OPENAI_API_KEY = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwOTY4NzExNTc1NzY5MzEyMzMxNCIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTkwMDUyNzA5MCwidXVpZCI6ImEyNTIxYWNmLTcxMGItNDAxOC05MTJkLWNiNGE3NGFmNTFjMCIsIm5hbWUiOiJQQU5LQUoiLCJleHBpcmVzX2F0IjoiMjAzMC0wMy0yM1QyMDoxMTozMCswMDAwIn0.Jb3dagqFAvhFZ1klY2ShzaOPzp8xIHiHt430R92yim4'
// Initialize the OpenAI client with Nebius configuration
const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.ai/v1/',
  apiKey: OPENAI_API_KEY,
});

const generateMealPlan = async (preferences, allergies, pantryItems, calorieTarget,additionalInstructions = '') => {
  try {
    const prompt = `
      Generate a 3-day meal plan (breakfast, lunch, dinner) based on the following:
      
      Dietary preferences: ${preferences.join(', ')}
      Allergies to avoid: ${allergies.join(', ')}
      Available pantry items: ${pantryItems.join(', ')}
      Daily calorie target: ${calorieTarget || 2000} calories
      
       ${additionalInstructions ? `Additional instructions: ${additionalInstructions}` : ''}

      For each meal, provide:
      1. Meal name
      2. List of ingredients (mark which ones are from the pantry)
      3. Brief cooking instructions
      4. Approximate preparation time
      5. Nutritional information (calories, protein, carbs, fat)
      
      Format the response as structured data in JSON format with this structure:
      {
        "days": [
          {
            "day": "Day 1",
            "meals": [
              {
                "type": "Breakfast",
                "name": "Meal name",
                "ingredients": ["ingredient 1", "ingredient 2"],
                "instructions": "Cooking instructions",
                "prepTime": 15,
                "calories": 400,
                "protein": 20,
                "carbs": 30,
                "fat": 15
              },
              // lunch and dinner objects
            ]
          },
          // day 2 and day 3 objects
        ]
      }
    `;
    console.log('Prompt:', prompt);
    const response = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      max_tokens: 1500,
      temperature: 0.,
      top_p: 0.9,
      extra_body: {
        top_k: 50
      },
      messages: [
        {
          role: "system", 
          content: "You are a helpful meal planning assistant that creates personalized meal plans based on dietary preferences, allergies, and available ingredients."
        },
        {
          role: "user", 
          content: prompt
        }
      ]
    });

    // Extract the content from the response
    const rawResponse = response.choices[0].message.content;
    
    // Parse the JSON from the response
    const jsonStr = extractJsonFromText(rawResponse);
    const mealPlanData = JSON.parse(jsonStr);
    
    return mealPlanData;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Failed to generate meal plan: ' + error.message);
  }
};

// Helper function to extract JSON from LLM response
function extractJsonFromText(text) {
  // Look for JSON-like structure in the text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return jsonMatch[0];
  }
  
  // If no JSON structure found, create a simple structure from the text
  return JSON.stringify({
    days: [
      {
        day: "Day 1",
        meals: [
          { 
            type: "Breakfast", 
            name: "Default breakfast", 
            ingredients: ["Ingredients not parsed"], 
            instructions: text,
            prepTime: 30,
            calories: 300,
            protein: 15,
            carbs: 30,
            fat: 10
          }
        ]
      }
    ]
  });
}

module.exports = { generateMealPlan };
