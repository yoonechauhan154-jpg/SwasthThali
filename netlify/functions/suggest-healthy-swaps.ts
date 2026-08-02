import { GoogleGenAI } from '@google/genai';

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { currentMeal, goal } = body;
    const ai = getGeminiClient();

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Suggest 3 high-protein, lower-oil Indian food alternatives for this meal: "${currentMeal || 'Indian Meal'}". Goal: "${goal || 'Weight Loss & Muscle Maintenance'}". Provide brief reasoning for each swap.`,
      });
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, suggestions: response.text }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        suggestions: `1. Swap Bhatura for Missi Roti (saves 180 kcal, adds 4g protein & fiber).\n2. Swap Paneer Butter Masala for Paneer Bhurji or Tandoori Paneer (cuts cream fat by 50%).\n3. Replace White Basmati Rice with Brown Rice or Ragi Mudde for slow digestion.`,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
