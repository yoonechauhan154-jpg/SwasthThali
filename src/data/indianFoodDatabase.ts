import { FoodItem } from '../types';

export const INDIAN_FOOD_DATABASE: FoodItem[] = [
  // --- Dals & Curries ---
  {
    id: 'dal_tadka',
    name: 'Dal Tadka (Toor/Arhar Dal)',
    hindiName: 'दाल तड़का',
    category: 'Dal & Curry',
    region: 'North Indian',
    caloriesPer100g: 95,
    proteinPer100g: 5.2,
    carbsPer100g: 12.8,
    fatPer100g: 2.8,
    fiberPer100g: 3.1,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Katori (150g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 0.5,
    tags: ['Comfort Food', 'High Fiber', 'Vegan Option'],
    healthScore: 8,
    description: 'Tempered yellow lentil curry cooked with cumin, garlic, tomatoes, and mustard seeds.'
  },
  {
    id: 'dal_makhani',
    name: 'Dal Makhani',
    hindiName: 'दाल मखनी',
    category: 'Dal & Curry',
    region: 'North Indian',
    caloriesPer100g: 165,
    proteinPer100g: 6.8,
    carbsPer100g: 16.2,
    fatPer100g: 8.5,
    fiberPer100g: 4.5,
    defaultServingGrams: 180,
    defaultServingUnit: '1 Bowl (180g)',
    defaultOilTsp: 1.0,
    defaultGheeTsp: 2.5,
    tags: ['Rich', 'Dhaba Favorite', 'High Protein'],
    healthScore: 6,
    description: 'Slow-cooked black lentils and kidney beans simmered with fresh butter and cream.'
  },
  {
    id: 'chole_masala',
    name: 'Chole Masala (Amritsari Chickpeas)',
    hindiName: 'छोले मसाला',
    category: 'Dal & Curry',
    region: 'North Indian',
    caloriesPer100g: 140,
    proteinPer100g: 6.5,
    carbsPer100g: 19.5,
    fatPer100g: 4.2,
    fiberPer100g: 5.2,
    defaultServingGrams: 200,
    defaultServingUnit: '1 Bowl (200g)',
    defaultOilTsp: 2.0,
    defaultGheeTsp: 0.5,
    tags: ['High Protein', 'High Fiber', 'Spicy'],
    healthScore: 8,
    description: 'Hearty chickpea curry cooked with dark tea-infused spices, amchur, and pomegranates.'
  },
  {
    id: 'rajma_masala',
    name: 'Rajma Masala (Red Kidney Beans)',
    hindiName: 'राजमा मसाला',
    category: 'Dal & Curry',
    region: 'North Indian',
    caloriesPer100g: 125,
    proteinPer100g: 5.9,
    carbsPer100g: 18.1,
    fatPer100g: 3.4,
    fiberPer100g: 4.8,
    defaultServingGrams: 200,
    defaultServingUnit: '1 Bowl (200g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 0.5,
    tags: ['Punjabi Classic', 'High Fiber', 'Complex Carbs'],
    healthScore: 9,
    description: 'Kidney beans cooked in a rich onion-tomato gravy with aromatic spices.'
  },
  {
    id: 'sambar',
    name: 'South Indian Sambar',
    hindiName: 'सांबर',
    category: 'Dal & Curry',
    region: 'South Indian',
    caloriesPer100g: 68,
    proteinPer100g: 3.1,
    carbsPer100g: 10.5,
    fatPer100g: 1.6,
    fiberPer100g: 2.9,
    defaultServingGrams: 200,
    defaultServingUnit: '1 Bowl (200g)',
    defaultOilTsp: 1.0,
    defaultGheeTsp: 0,
    tags: ['Low Calorie', 'Tamarind', 'Drumstick', 'Veggie Rich'],
    healthScore: 9,
    description: 'Tangy lentil stew enriched with drumsticks, pumpkin, curry leaves, and sambar podi.'
  },
  {
    id: 'rasam',
    name: 'Spicy Tomato Rasam',
    hindiName: 'रसम',
    category: 'Dal & Curry',
    region: 'South Indian',
    caloriesPer100g: 42,
    proteinPer100g: 1.4,
    carbsPer100g: 6.2,
    fatPer100g: 1.4,
    fiberPer100g: 1.2,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Cup (150g)',
    defaultOilTsp: 0.5,
    defaultGheeTsp: 0.5,
    tags: ['Digestion Booster', 'Ultra Low Calorie', 'Hydrating'],
    healthScore: 10,
    description: 'Clear pepper-tamarind soup infused with mustard, garlic, and coriander.'
  },
  {
    id: 'kadhi_pakora',
    name: 'Punjabi Kadhi Pakora',
    hindiName: 'कढ़ी पकोड़ा',
    category: 'Dal & Curry',
    region: 'North Indian',
    caloriesPer100g: 135,
    proteinPer100g: 4.1,
    carbsPer100g: 12.6,
    fatPer100g: 7.8,
    fiberPer100g: 1.8,
    defaultServingGrams: 200,
    defaultServingUnit: '1 Bowl (200g)',
    defaultOilTsp: 2.5,
    defaultGheeTsp: 0.5,
    tags: ['Yogurt Based', 'Fried Fritters', 'Comfort Food'],
    healthScore: 6,
    description: 'Sour yogurt and besan gravy with fried onion-gram flour fritters.'
  },

  // --- Paneer & Dairy ---
  {
    id: 'paneer_butter_masala',
    name: 'Paneer Butter Masala',
    hindiName: 'पनीर बटर मसाला',
    category: 'Paneer & Dairy',
    region: 'North Indian',
    caloriesPer100g: 215,
    proteinPer100g: 7.5,
    carbsPer100g: 9.2,
    fatPer100g: 17.1,
    fiberPer100g: 1.4,
    defaultServingGrams: 200,
    defaultServingUnit: '1 Bowl (200g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 2.5,
    tags: ['Rich', 'High Fat', 'Restaurant Favorite'],
    healthScore: 5,
    description: 'Cottage cheese cubes cooked in creamy tomato, cashew, and butter gravy.'
  },
  {
    id: 'palak_paneer',
    name: 'Palak Paneer',
    hindiName: 'पालक पनीर',
    category: 'Paneer & Dairy',
    region: 'North Indian',
    caloriesPer100g: 145,
    proteinPer100g: 8.2,
    carbsPer100g: 6.1,
    fatPer100g: 10.2,
    fiberPer100g: 2.8,
    defaultServingGrams: 200,
    defaultServingUnit: '1 Bowl (200g)',
    defaultOilTsp: 1.0,
    defaultGheeTsp: 1.0,
    tags: ['Iron Rich', 'Low Carb', 'High Protein'],
    healthScore: 8,
    description: 'Paneer cubes tossed in vibrant garlic-infused spinach puree.'
  },
  {
    id: 'kadai_paneer',
    name: 'Kadai Paneer',
    hindiName: 'कड़ाई पनीर',
    category: 'Paneer & Dairy',
    region: 'North Indian',
    caloriesPer100g: 178,
    proteinPer100g: 8.8,
    carbsPer100g: 8.5,
    fatPer100g: 12.8,
    fiberPer100g: 2.1,
    defaultServingGrams: 180,
    defaultServingUnit: '1 Bowl (180g)',
    defaultOilTsp: 2.0,
    defaultGheeTsp: 0.5,
    tags: ['Bell Pepper', 'Capsicum', 'Spicy'],
    healthScore: 7,
    description: 'Paneer stir-fried with capsicum, onion, and freshly ground kadai spices.'
  },
  {
    id: 'paneer_bhurji',
    name: 'Paneer Bhurji',
    hindiName: 'पनीर भुर्जी',
    category: 'Paneer & Dairy',
    region: 'North Indian',
    caloriesPer100g: 195,
    proteinPer100g: 11.4,
    carbsPer100g: 5.2,
    fatPer100g: 14.2,
    fiberPer100g: 1.5,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Portion (150g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 0.5,
    tags: ['High Protein', 'Keto Friendly', 'Quick Meal'],
    healthScore: 8,
    description: 'Scrambled cottage cheese cooked with chopped onions, green chilies, and tomatoes.'
  },
  {
    id: 'plain_curd',
    name: 'Homemade Dahi (Curd)',
    hindiName: 'दही',
    category: 'Paneer & Dairy',
    region: 'Pan-Indian',
    caloriesPer100g: 60,
    proteinPer100g: 3.5,
    carbsPer100g: 4.7,
    fatPer100g: 3.2,
    fiberPer100g: 0,
    defaultServingGrams: 120,
    defaultServingUnit: '1 Katori (120g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 0,
    tags: ['Probiotic', 'Gut Health', 'Cooling'],
    healthScore: 10,
    description: 'Fresh homemade yogurt full of healthy lactobacillus probiotic strains.'
  },

  // --- Sabzi (Vegetables) ---
  {
    id: 'aloo_gobhi',
    name: 'Aloo Gobhi Sabzi',
    hindiName: 'आलू गोभी',
    category: 'Sabzi',
    region: 'North Indian',
    caloriesPer100g: 110,
    proteinPer100g: 2.4,
    carbsPer100g: 14.8,
    fatPer100g: 5.1,
    fiberPer100g: 3.2,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Katori (150g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 0,
    tags: ['Home Style', 'Dry Sabzi', 'Fiber'],
    healthScore: 7,
    description: 'Potato and cauliflower florets sautéed with ginger, turmeric, and coriander powder.'
  },
  {
    id: 'bhindi_masala',
    name: 'Bhindi Masala (Okra)',
    hindiName: 'भिंडी मसाला',
    category: 'Sabzi',
    region: 'Pan-Indian',
    caloriesPer100g: 95,
    proteinPer100g: 2.1,
    carbsPer100g: 10.4,
    fatPer100g: 5.5,
    fiberPer100g: 3.8,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Katori (150g)',
    defaultOilTsp: 2.0,
    defaultGheeTsp: 0,
    tags: ['Low Calorie', 'High Fiber', 'Vegan'],
    healthScore: 8,
    description: 'Crispy pan-fried ladyfingers tossed with amchur and caramelized onions.'
  },
  {
    id: 'mix_veg_sabzi',
    name: 'Mixed Veg Sabzi',
    hindiName: 'मिक्स वेज',
    category: 'Sabzi',
    region: 'Pan-Indian',
    caloriesPer100g: 105,
    proteinPer100g: 2.8,
    carbsPer100g: 13.2,
    fatPer100g: 4.8,
    fiberPer100g: 3.6,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Katori (150g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 0,
    tags: ['Micronutrient Dense', 'Vitamins', 'Fiber'],
    healthScore: 9,
    description: 'Carrots, green peas, beans, and capsicum lightly spiced with garamasala.'
  },
  {
    id: 'baingan_bharta',
    name: 'Smokey Baingan Bharta',
    hindiName: 'बैंगन भरता',
    category: 'Sabzi',
    region: 'North Indian',
    caloriesPer100g: 82,
    proteinPer100g: 1.8,
    carbsPer100g: 8.5,
    fatPer100g: 4.8,
    fiberPer100g: 3.9,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Katori (150g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 0,
    tags: ['Roasted', 'Low Calorie', 'Smokey Flavor'],
    healthScore: 9,
    description: 'Fire-roasted eggplant mashed with garlic, green chilies, onions, and mustard oil.'
  },

  // --- Breads ---
  {
    id: 'roti_chapati',
    name: 'Whole Wheat Roti / Chapati (Without Ghee)',
    hindiName: 'रोटी (बिना घी)',
    category: 'Breads',
    region: 'Pan-Indian',
    caloriesPer100g: 260,
    proteinPer100g: 9.2,
    carbsPer100g: 52.0,
    fatPer100g: 1.8,
    fiberPer100g: 8.5,
    defaultServingGrams: 35,
    defaultServingUnit: '1 Roti (35g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 0,
    tags: ['Whole Wheat', 'High Fiber', 'Staple'],
    healthScore: 10,
    description: 'Traditional flatbread roasted on tawa made from 100% whole wheat chakki atta.'
  },
  {
    id: 'roti_ghee',
    name: 'Ghee Roti (1/2 tsp Ghee)',
    hindiName: 'घी रोटी',
    category: 'Breads',
    region: 'Pan-Indian',
    caloriesPer100g: 310,
    proteinPer100g: 8.5,
    carbsPer100g: 47.0,
    fatPer100g: 8.5,
    fiberPer100g: 7.8,
    defaultServingGrams: 38,
    defaultServingUnit: '1 Ghee Roti (38g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 0.5,
    tags: ['Healthy Fat', 'Aromatic', 'Soft'],
    healthScore: 9,
    description: 'Whole wheat roti brushed with fresh cow ghee.'
  },
  {
    id: 'aloo_paratha',
    name: 'Aloo Paratha (With Butter/Oil)',
    hindiName: 'आलू पराठा',
    category: 'Breads',
    region: 'North Indian',
    caloriesPer100g: 240,
    proteinPer100g: 5.1,
    carbsPer100g: 36.5,
    fatPer100g: 8.8,
    fiberPer100g: 3.8,
    defaultServingGrams: 110,
    defaultServingUnit: '1 Paratha (110g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 1.0,
    tags: ['Breakfast Favorite', 'Stuffed Bread', 'Punjabi'],
    healthScore: 6,
    description: 'Whole wheat flatbread stuffed with spiced mashed potatoes and pan-cooked with oil.'
  },
  {
    id: 'paneer_paratha',
    name: 'Paneer Paratha',
    hindiName: 'पनीर पराठा',
    category: 'Breads',
    region: 'North Indian',
    caloriesPer100g: 265,
    proteinPer100g: 9.8,
    carbsPer100g: 31.2,
    fatPer100g: 11.5,
    fiberPer100g: 3.5,
    defaultServingGrams: 120,
    defaultServingUnit: '1 Paratha (120g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 1.0,
    tags: ['High Protein', 'Breakfast', 'Filling'],
    healthScore: 8,
    description: 'Flatbread stuffed with spiced grated paneer and herbs.'
  },
  {
    id: 'butter_naan',
    name: 'Butter Naan (Maida)',
    hindiName: 'बटर नान',
    category: 'Breads',
    region: 'North Indian',
    caloriesPer100g: 310,
    proteinPer100g: 8.0,
    carbsPer100g: 52.5,
    fatPer100g: 8.2,
    fiberPer100g: 2.1,
    defaultServingGrams: 90,
    defaultServingUnit: '1 Naan (90g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 2.0,
    tags: ['Restaurant', 'Refined Flour', 'High Calorie'],
    healthScore: 4,
    description: 'Tandoor-baked refined wheat bread slathered with melted butter.'
  },

  // --- Rice & Biryani ---
  {
    id: 'steamed_basmati_rice',
    name: 'Steamed White Basmati Rice',
    hindiName: 'चावल (प्लेन)',
    category: 'Rice & Biryani',
    region: 'Pan-Indian',
    caloriesPer100g: 130,
    proteinPer100g: 2.7,
    carbsPer100g: 28.2,
    fatPer100g: 0.3,
    fiberPer100g: 0.4,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Katori (150g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 0,
    tags: ['Fat Free', 'Gluten Free', 'Staple'],
    healthScore: 8,
    description: 'Fluffy steamed long-grain white basmati rice.'
  },
  {
    id: 'jeera_rice',
    name: 'Jeera Rice',
    hindiName: 'जीरा राइस',
    category: 'Rice & Biryani',
    region: 'Pan-Indian',
    caloriesPer100g: 155,
    proteinPer100g: 2.8,
    carbsPer100g: 27.5,
    fatPer100g: 3.8,
    fiberPer100g: 0.8,
    defaultServingGrams: 160,
    defaultServingUnit: '1 Plate (160g)',
    defaultOilTsp: 0.5,
    defaultGheeTsp: 1.0,
    tags: ['Aromatic', 'Cumin Tempered'],
    healthScore: 7,
    description: 'Basmati rice sautéed with whole cumin seeds and ghee.'
  },
  {
    id: 'veg_biryani',
    name: 'Hyderabadi Veg Dum Biryani',
    hindiName: 'वेज बिरयानी',
    category: 'Rice & Biryani',
    region: 'Hyderabadi',
    caloriesPer100g: 185,
    proteinPer100g: 4.5,
    carbsPer100g: 28.5,
    fatPer100g: 6.2,
    fiberPer100g: 2.4,
    defaultServingGrams: 250,
    defaultServingUnit: '1 Plate (250g)',
    defaultOilTsp: 2.0,
    defaultGheeTsp: 1.5,
    tags: ['Fragrant', 'Party Food', 'Spiced'],
    healthScore: 6,
    description: 'Layered basmati rice dum-cooked with mixed vegetables, fried onions, mint, and saffron.'
  },
  {
    id: 'poha',
    name: 'Indori Kanda Poha',
    hindiName: 'पोहा',
    category: 'Breakfast',
    region: 'Maharashtrian',
    caloriesPer100g: 160,
    proteinPer100g: 3.2,
    carbsPer100g: 26.5,
    fatPer100g: 4.8,
    fiberPer100g: 2.1,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Plate (150g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 0,
    tags: ['Light Breakfast', 'Peanuts', 'Iron Rich'],
    healthScore: 9,
    description: 'Flattened rice sautéed with mustard seeds, peanuts, turmeric, onions, and lemon juice.'
  },
  {
    id: 'upma',
    name: 'Semolina Upma',
    hindiName: 'उपमा',
    category: 'Breakfast',
    region: 'South Indian',
    caloriesPer100g: 145,
    proteinPer100g: 3.8,
    carbsPer100g: 24.2,
    fatPer100g: 3.9,
    fiberPer100g: 1.8,
    defaultServingGrams: 150,
    defaultServingUnit: '1 Bowl (150g)',
    defaultOilTsp: 1.0,
    defaultGheeTsp: 0.5,
    tags: ['Rava', 'Cashews', 'Curry Leaves'],
    healthScore: 8,
    description: 'Roasted suji cooked with mustard seeds, chana dal, ginger, and vegetables.'
  },

  // --- South Indian ---
  {
    id: 'masala_dosa',
    name: 'Crispy Masala Dosa',
    hindiName: 'मसाला डोसा',
    category: 'South Indian',
    region: 'South Indian',
    caloriesPer100g: 185,
    proteinPer100g: 4.2,
    carbsPer100g: 29.8,
    fatPer100g: 5.8,
    fiberPer100g: 2.5,
    defaultServingGrams: 180,
    defaultServingUnit: '1 Large Dosa (180g)',
    defaultOilTsp: 2.0,
    defaultGheeTsp: 0,
    tags: ['Fermented', 'Potato Filling', 'Crispy'],
    healthScore: 7,
    description: 'Fermented rice & urad dal crepe filled with spiced potato masala.'
  },
  {
    id: 'steamed_idli',
    name: 'Steamed Soft Idli (2 Pcs)',
    hindiName: 'इडली',
    category: 'South Indian',
    region: 'South Indian',
    caloriesPer100g: 135,
    proteinPer100g: 4.8,
    carbsPer100g: 28.0,
    fatPer100g: 0.4,
    fiberPer100g: 1.6,
    defaultServingGrams: 120,
    defaultServingUnit: '2 Pieces (120g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 0,
    tags: ['Zero Oil', 'Fermented Gut Health', 'Ultra Light'],
    healthScore: 10,
    description: 'Steamed cakes made from fermented rice and black gram batter.'
  },
  {
    id: 'medu_vada',
    name: 'Medu Vada (1 Pc)',
    hindiName: 'मेदु वड़ा',
    category: 'South Indian',
    region: 'South Indian',
    caloriesPer100g: 280,
    proteinPer100g: 7.8,
    carbsPer100g: 26.5,
    fatPer100g: 16.5,
    fiberPer100g: 3.2,
    defaultServingGrams: 60,
    defaultServingUnit: '1 Piece (60g)',
    defaultOilTsp: 3.0,
    defaultGheeTsp: 0,
    tags: ['Deep Fried', 'Urad Dal', 'Crispy'],
    healthScore: 5,
    description: 'Deep-fried savory lentil doughnut flavored with peppercorns and curry leaves.'
  },

  // --- Street Food & Snacks ---
  {
    id: 'samosa',
    name: 'Punjabi Aloo Samosa (1 Pc)',
    hindiName: 'समोसा',
    category: 'Snacks & Street',
    region: 'North Indian',
    caloriesPer100g: 290,
    proteinPer100g: 4.5,
    carbsPer100g: 32.0,
    fatPer100g: 16.2,
    fiberPer100g: 2.1,
    defaultServingGrams: 90,
    defaultServingUnit: '1 Big Samosa (90g)',
    defaultOilTsp: 3.5,
    defaultGheeTsp: 0,
    tags: ['Deep Fried', 'Tea Time', 'High Calorie'],
    healthScore: 4,
    description: 'Crispy pastry cone filled with spiced potato and green peas.'
  },
  {
    id: 'pani_puri',
    name: 'Pani Puri / Golgappa (6 Pcs)',
    hindiName: 'पानी पूरी',
    category: 'Snacks & Street',
    region: 'Pan-Indian',
    caloriesPer100g: 180,
    proteinPer100g: 3.1,
    carbsPer100g: 28.5,
    fatPer100g: 6.2,
    fiberPer100g: 2.4,
    defaultServingGrams: 140,
    defaultServingUnit: '1 Plate (6 Puris, 140g)',
    defaultOilTsp: 1.5,
    defaultGheeTsp: 0,
    tags: ['Street Food', 'Tangy Water', 'Snack'],
    healthScore: 6,
    description: 'Hollow crispy puris filled with spiced potato chana mash and mint-tamarind water.'
  },
  {
    id: 'pav_bhaji',
    name: 'Mumbai Pav Bhaji (2 Butter Pav)',
    hindiName: 'पाव भाजी',
    category: 'Snacks & Street',
    region: 'Maharashtrian',
    caloriesPer100g: 195,
    proteinPer100g: 4.8,
    carbsPer100g: 24.5,
    fatPer100g: 9.2,
    fiberPer100g: 3.2,
    defaultServingGrams: 300,
    defaultServingUnit: '1 Plate (300g)',
    defaultOilTsp: 1.0,
    defaultGheeTsp: 3.0,
    tags: ['Street Food Favorite', 'Extra Butter', 'Mashed Veggies'],
    healthScore: 5,
    description: 'Thick spicy mashed vegetable curry served with soft toasted butter pav.'
  },
  {
    id: 'chole_bhature',
    name: 'Chole Bhature (2 Bhature)',
    hindiName: 'छोले भटूरे',
    category: 'Snacks & Street',
    region: 'North Indian',
    caloriesPer100g: 275,
    proteinPer100g: 6.2,
    carbsPer100g: 33.5,
    fatPer100g: 13.5,
    fiberPer100g: 3.8,
    defaultServingGrams: 350,
    defaultServingUnit: '1 Full Plate (350g)',
    defaultOilTsp: 5.0,
    defaultGheeTsp: 0,
    tags: ['Cheat Meal', 'Deep Fried', 'Heavy'],
    healthScore: 3,
    description: 'Fluffy deep-fried sourdough breads served with spicy dark chickpea curry.'
  },

  // --- Sweets ---
  {
    id: 'gulab_jamun',
    name: 'Gulab Jamun (2 Pcs)',
    hindiName: 'गुलाब जामुन',
    category: 'Sweets & Desserts',
    region: 'Pan-Indian',
    caloriesPer100g: 325,
    proteinPer100g: 4.1,
    carbsPer100g: 54.0,
    fatPer100g: 10.5,
    fiberPer100g: 0.2,
    defaultServingGrams: 80,
    defaultServingUnit: '2 Pieces (80g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 2.0,
    tags: ['Mithai', 'Sugar Syrup', 'High Calorie'],
    healthScore: 3,
    description: 'Deep-fried milk-solid dumplings soaked in rose and cardamom sugar syrup.'
  },
  {
    id: 'rasgulla',
    name: 'Bengali Rasgulla (2 Pcs)',
    hindiName: 'रसगुल्ला',
    category: 'Sweets & Desserts',
    region: 'Bengali',
    caloriesPer100g: 185,
    proteinPer100g: 4.8,
    carbsPer100g: 38.5,
    fatPer100g: 1.5,
    fiberPer100g: 0,
    defaultServingGrams: 100,
    defaultServingUnit: '2 Pieces (100g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 0,
    tags: ['Chenna', 'Fat Free Sweet', 'Bengali Classic'],
    healthScore: 6,
    description: 'Soft spongy cottage cheese balls cooked in light sugar syrup.'
  },
  {
    id: 'moong_dal_halwa',
    name: 'Shahi Moong Dal Halwa',
    hindiName: 'मूंग दाल हलवा',
    category: 'Sweets & Desserts',
    region: 'North Indian',
    caloriesPer100g: 410,
    proteinPer100g: 7.2,
    carbsPer100g: 48.0,
    fatPer100g: 21.5,
    fiberPer100g: 2.2,
    defaultServingGrams: 100,
    defaultServingUnit: '1 Katori (100g)',
    defaultOilTsp: 0,
    defaultGheeTsp: 4.5,
    tags: ['Festival Sweet', 'Pure Ghee', 'Wedding Food'],
    healthScore: 3,
    description: 'Rich dessert made from yellow lentil paste roasted slowly in pure desi ghee.'
  }
];

/**
 * Safely looks up a food item from INDIAN_FOOD_DATABASE by ID or dish name.
 * If the ID or name is not found (ID mismatch), logs a warning and returns
 * the closest category default or general fallback item instead of returning zero macros.
 */
export function getMatchedFoodItem(matchedFoodId?: string, dishName?: string): FoodItem {
  if (matchedFoodId) {
    const exact = INDIAN_FOOD_DATABASE.find((f) => f.id === matchedFoodId);
    if (exact) return exact;
  }

  if (dishName) {
    const nameLower = dishName.toLowerCase();
    const nameMatch = INDIAN_FOOD_DATABASE.find((f) =>
      f.name.toLowerCase().includes(nameLower) ||
      nameLower.includes(f.name.toLowerCase()) ||
      (f.hindiName && (f.hindiName.includes(dishName) || dishName.includes(f.hindiName))) ||
      f.id.replace(/_/g, ' ').includes(nameLower) ||
      nameLower.replace(/\s+/g, '_').includes(f.id)
    );
    if (nameMatch) return nameMatch;

    if (nameLower.includes('roti') || nameLower.includes('naan') || nameLower.includes('paratha') || nameLower.includes('bhatura') || nameLower.includes('chapati')) {
      const breadMatch = INDIAN_FOOD_DATABASE.find((f) => f.category === 'Breads');
      if (breadMatch) return breadMatch;
    }
    if (nameLower.includes('rice') || nameLower.includes('pulao') || nameLower.includes('biryani')) {
      const riceMatch = INDIAN_FOOD_DATABASE.find((f) => f.category === 'Rice & Biryani');
      if (riceMatch) return riceMatch;
    }
    if (nameLower.includes('dosa') || nameLower.includes('idli') || nameLower.includes('vada') || nameLower.includes('sambar')) {
      const southMatch = INDIAN_FOOD_DATABASE.find((f) => f.category === 'South Indian' || f.region === 'South Indian');
      if (southMatch) return southMatch;
    }
    if (nameLower.includes('paneer') || nameLower.includes('dal') || nameLower.includes('curry') || nameLower.includes('chole') || nameLower.includes('masala')) {
      const curryMatch = INDIAN_FOOD_DATABASE.find((f) => f.category === 'Dal & Curry' || f.category === 'Sabzi');
      if (curryMatch) return curryMatch;
    }
  }

  console.warn(`[Nutrition Lookup Warning] ID or name mismatch for id="${matchedFoodId}", dishName="${dishName}". Using default Indian food fallback.`);
  return INDIAN_FOOD_DATABASE[0];
}

/**
 * Calculates adjusted macros based on portion multiplier, oil added, and ghee added.
 * Standard Oil/Ghee density:
 * 1 tsp Oil (5ml) ~ 45 kcal, 5g fat
 * 1 tsp Ghee (5ml) ~ 45 kcal, 5g fat
 */
export function calculateAdjustedMacros(
  food?: FoodItem | null,
  portionGrams: number = 100,
  addedOilTsp: number = 0,
  addedGheeTsp: number = 0,
  cookingMethod: 'home' | 'dhaba' | 'airfryer' = 'home'
) {
  const targetFood = food && food.caloriesPer100g ? food : getMatchedFoodItem(food?.id, food?.name);

  const scale = (portionGrams || 100) / 100;
  
  // Base raw macros from ingredient ratio
  let baseCalories = (targetFood.caloriesPer100g || 95) * scale;
  let baseProtein = (targetFood.proteinPer100g || 4) * scale;
  let baseCarbs = (targetFood.carbsPer100g || 12) * scale;
  let baseFat = (targetFood.fatPer100g || 3) * scale;
  let baseFiber = (targetFood.fiberPer100g || 2) * scale;

  // Additional oil / ghee extra calories (45 kcal per tsp, 5g fat)
  const extraOilFat = (addedOilTsp || 0) * 5;
  const extraGheeFat = (addedGheeTsp || 0) * 5;
  const totalExtraFat = extraOilFat + extraGheeFat;
  const extraFatCalories = totalExtraFat * 9;

  // Dhaba multiplier vs Airfryer multiplier
  let methodMultiplier = 1.0;
  if (cookingMethod === 'dhaba') {
    methodMultiplier = 1.25; // +25% oil retention / heavy gravies
  } else if (cookingMethod === 'airfryer') {
    methodMultiplier = 0.85; // -15% fat reduction
  }

  const finalFat = Math.max(0, (baseFat + totalExtraFat) * methodMultiplier);
  const finalCalories = Math.max(0, (baseCalories + extraFatCalories) * methodMultiplier);

  return {
    calories: Math.round(finalCalories),
    protein: Number((baseProtein).toFixed(1)),
    carbs: Number((baseCarbs).toFixed(1)),
    fat: Number((finalFat).toFixed(1)),
    fiber: Number((baseFiber).toFixed(1)),
    addedOilTsp,
    addedGheeTsp,
  };
}

/**
 * Returns top protein-per-calorie efficient Indian foods.
 * Skips sweet/dessert items, and excludes specified food IDs.
 */
export function getTopProteinFoods(excludeIds: string[] = [], limit: number = 4): FoodItem[] {
  return INDIAN_FOOD_DATABASE
    .filter((food) => {
      if (!food || excludeIds.includes(food.id)) return false;
      const cat = (food.category || '').toLowerCase();
      if (cat.includes('sweet') || cat.includes('dessert')) return false;
      return (food.caloriesPer100g || 0) > 0 && (food.proteinPer100g || 0) > 0;
    })
    .map((food) => ({
      food,
      ratio: (food.proteinPer100g || 0) / (food.caloriesPer100g || 1)
    }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, limit)
    .map((item) => item.food);
}

