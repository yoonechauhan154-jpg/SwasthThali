import { GoogleGenAI, Type } from '@google/genai';

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
    const { imageBase64, imageMimeType, textPrompt, sampleDishId } = body;
    const ai = getGeminiClient();

    const systemPrompt = `You are a world-class Indian Nutrition Scientist, Computer Vision Expert, and Master Chef specializing in Indian cuisine.
Analyze the provided image (or dish description) of Indian food.
Identify every individual item present on the plate or thali (e.g., Dal Tadka, Paneer Butter Masala, Roti, Rice, Sambar, Idli, Gulab Jamun, Samosa, etc.).

For each detected dish item:
1. Provide dishName (English & common Indian name).
2. hindiName (in Devanagari script if applicable).
3. estimatedGrams (estimated serving weight in grams).
4. confidence (between 0.70 and 0.99).
5. matchedFoodId (one of standard keys if applicable: dal_tadka, dal_makhani, chole_masala, rajma_masala, sambar, rasam, kadhi_pakora, paneer_butter_masala, palak_paneer, kadai_paneer, paneer_bhurji, plain_curd, aloo_gobhi, bhindi_masala, mix_veg_sabzi, baingan_bharta, roti_chapati, roti_ghee, aloo_paratha, paneer_paratha, butter_naan, steamed_basmati_rice, jeera_rice, veg_biryani, poha, upma, masala_dosa, steamed_idli, medu_vada, samosa, pani_puri, pav_bhaji, chole_bhature, gulab_jamun, rasgulla, moong_dal_halwa).
6. oilTsp (estimated base oil in tsp, 0.5 to 5.0).
7. gheeTsp (estimated base ghee in tsp, 0 to 4.0).

Also provide:
- thaliName (e.g. "North Indian Deluxe Thali", "South Indian Tiffin", "Comfort Dal Roti Meal")
- overallDescription (brief description of the meal)
- reasoning (why you identified these items, visual cues)
- regionalContext (e.g. "Punjabi style heavy gravy", "Light Maharashtrian breakfast")
- healthyTips (array of 3 smart actionable tips to lower calories or boost protein)
- estimatedTotalCalories (sum of items)`;

    if (ai && (imageBase64 || textPrompt)) {
      const parts: any[] = [];
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: imageMimeType || 'image/jpeg',
            data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
          },
        });
      }
      parts.push({
        text: textPrompt || 'Identify all Indian food items on this plate, estimate portion sizes in grams, oil/ghee content in teaspoons, and suggest healthy swaps.',
      });

      const geminiRes = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: { parts },
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              thaliName: { type: Type.STRING },
              overallDescription: { type: Type.STRING },
              reasoning: { type: Type.STRING },
              regionalContext: { type: Type.STRING },
              estimatedTotalCalories: { type: Type.NUMBER },
              healthyTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dishName: { type: Type.STRING },
                    hindiName: { type: Type.STRING },
                    estimatedGrams: { type: Type.NUMBER },
                    confidence: { type: Type.NUMBER },
                    matchedFoodId: { type: Type.STRING },
                    oilTsp: { type: Type.NUMBER },
                    gheeTsp: { type: Type.NUMBER },
                    portionMultiplier: { type: Type.NUMBER },
                    cookingMethod: { type: Type.STRING },
                  },
                  required: ['dishName', 'estimatedGrams', 'confidence', 'oilTsp', 'gheeTsp'],
                },
              },
            },
            required: ['thaliName', 'items', 'healthyTips', 'reasoning'],
          },
        },
      });

      const parsedJson = JSON.parse(geminiRes.text || '{}');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, data: parsedJson }),
      };
    }

    const fallbackResults: Record<string, any> = {
      thali: {
        thaliName: 'North Indian Special Thali',
        overallDescription: 'A balanced North Indian meal featuring Dal Tadka, Paneer Butter Masala, 2 Rotis with Ghee, Steamed Rice, and Fresh Curd.',
        reasoning: 'Visual inspection shows distinct yellow lentil katori, orange paneer curry with coriander garnish, 2 wheat flatbreads with ghee sheen, white rice bowl, and small curd katori.',
        regionalContext: 'North Indian Punjabi Style Meal',
        estimatedTotalCalories: 645,
        healthyTips: [
          'Request Roti without Ghee to save 45 kcal.',
          'Swap Paneer Butter Masala for Palak Paneer to boost iron and cut 70 kcal.',
          'Enjoy Dahi first to reduce glucose spikes from rice.'
        ],
        items: [
          { dishName: 'Dal Tadka', hindiName: 'दाल तड़का', estimatedGrams: 150, confidence: 0.96, matchedFoodId: 'dal_tadka', oilTsp: 1.5, gheeTsp: 0.5, portionMultiplier: 1.0, cookingMethod: 'home' },
          { dishName: 'Paneer Butter Masala', hindiName: 'पनीर बटर मसाला', estimatedGrams: 150, confidence: 0.92, matchedFoodId: 'paneer_butter_masala', oilTsp: 1.5, gheeTsp: 2.0, portionMultiplier: 1.0, cookingMethod: 'home' },
          { dishName: 'Whole Wheat Roti with Ghee', hindiName: 'घी रोटी', estimatedGrams: 70, confidence: 0.98, matchedFoodId: 'roti_ghee', oilTsp: 0, gheeTsp: 1.0, portionMultiplier: 1.0, cookingMethod: 'home' },
          { dishName: 'Steamed White Rice', hindiName: 'चावल', estimatedGrams: 120, confidence: 0.95, matchedFoodId: 'steamed_basmati_rice', oilTsp: 0, gheeTsp: 0, portionMultiplier: 0.8, cookingMethod: 'home' },
          { dishName: 'Homemade Dahi', hindiName: 'दही', estimatedGrams: 100, confidence: 0.97, matchedFoodId: 'plain_curd', oilTsp: 0, gheeTsp: 0, portionMultiplier: 1.0, cookingMethod: 'home' }
        ]
      },
      chole_bhature: {
        thaliName: 'Punjabi Chole Bhature Feast',
        overallDescription: '2 deep-fried fluffy Bhatures served with dark tea-infused Chole curry and pickled onions.',
        reasoning: 'Golden puffed bhaturas alongside rich dark chickpea gravy with ginger juliennes.',
        regionalContext: 'Amritsari Street Style Food',
        estimatedTotalCalories: 820,
        healthyTips: [
          'Dab bhaturas with tissue to absorb 1.5 tsp surface oil (saving 65 kcal).',
          'Drink lemon water with chole to improve non-heme iron absorption.'
        ],
        items: [
          { dishName: 'Chole Masala', hindiName: 'छोले मसाला', estimatedGrams: 200, confidence: 0.96, matchedFoodId: 'chole_masala', oilTsp: 2.0, gheeTsp: 0.5, portionMultiplier: 1.0, cookingMethod: 'dhaba' },
          { dishName: 'Chole Bhature (Bhatura)', hindiName: 'भटूरा', estimatedGrams: 150, confidence: 0.95, matchedFoodId: 'chole_bhature', oilTsp: 4.5, gheeTsp: 0, portionMultiplier: 1.0, cookingMethod: 'dhaba' }
        ]
      },
      dosa: {
        thaliName: 'South Indian Masala Dosa Tiffin',
        overallDescription: 'Crispy fermented rice-lentil crepe filled with potato masala, served with coconut chutney and tangy sambar.',
        reasoning: 'Golden brown crisp crepe fold showing potato stuffing, with white coconut chutney and vegetable sambar.',
        regionalContext: 'Udupi / South Indian Tiffin',
        estimatedTotalCalories: 480,
        healthyTips: [
          'Ask for paper dosa made with minimal oil.',
          'Enjoy Sambar generously for extra vegetable fiber.'
        ],
        items: [
          { dishName: 'Masala Dosa', hindiName: 'मसाला डोसा', estimatedGrams: 180, confidence: 0.97, matchedFoodId: 'masala_dosa', oilTsp: 2.0, gheeTsp: 0, portionMultiplier: 1.0, cookingMethod: 'home' },
          { dishName: 'South Indian Sambar', hindiName: 'सांबर', estimatedGrams: 150, confidence: 0.96, matchedFoodId: 'sambar', oilTsp: 1.0, gheeTsp: 0, portionMultiplier: 1.0, cookingMethod: 'home' }
        ]
      }
    };

    const selectedPreset = sampleDishId && fallbackResults[sampleDishId] ? fallbackResults[sampleDishId] : fallbackResults.thali;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, data: selectedPreset }),
    };
  } catch (error: any) {
    console.error('Error in AI detection:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: error.message || 'AI processing failed' }),
    };
  }
};
