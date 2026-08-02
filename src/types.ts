export type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export type CookingMethod = 'home' | 'dhaba' | 'airfryer';

export interface FoodItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'Dal & Curry' | 'Sabzi' | 'Paneer & Dairy' | 'Rice & Biryani' | 'Breads' | 'South Indian' | 'Snacks & Street' | 'Sweets & Desserts' | 'Breakfast';
  region: 'North Indian' | 'South Indian' | 'Maharashtrian' | 'Gujarati' | 'Bengali' | 'Hyderabadi' | 'Pan-Indian';
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g: number;
  defaultServingGrams: number;
  defaultServingUnit: string; // e.g. "1 Katori (150g)", "2 Pieces", "1 Plate (250g)"
  defaultOilTsp: number; // base oil in standard recipe
  defaultGheeTsp: number; // base ghee in standard recipe
  tags: string[];
  healthScore: number; // 1 to 10
  description: string;
}

export interface DetectedThaliItem {
  dishName: string;
  hindiName?: string;
  estimatedGrams: number;
  confidence: number;
  matchedFoodId?: string;
  oilTsp: number;
  gheeTsp: number;
  portionMultiplier: number;
  cookingMethod: CookingMethod;
}

export interface GeminiDetectionResponse {
  thaliName: string;
  overallDescription: string;
  items: DetectedThaliItem[];
  reasoning: string;
  regionalContext: string;
  healthyTips: string[];
  estimatedTotalCalories: number;
}

export interface MealLogSubItem {
  foodName: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  oilTsp: number;
  gheeTsp: number;
  cookingMethod: CookingMethod;
}

export interface MealLogEntry {
  id: string;
  timestamp: string; // ISO date or formatted
  mealType: MealType;
  dishName: string;
  items: MealLogSubItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalOilTsp: number;
  totalGheeTsp: number;
  photoUrl?: string;
}

export interface USPItem {
  id: number;
  title: string;
  category: 'Nutrition Engine' | 'AI Image Tech' | 'Indian Lifestyle' | 'Cost & Scalability' | 'Mother & Recipe Customizer' | 'Health & Medical';
  description: string;
  whyItMatters: string;
  iconName?: string;
}

export interface SEOKeywordGroup {
  category: string;
  title: string;
  keywords: string[];
  targetPage?: string;
  description: string;
}

export interface UserProfile {
  name: string;
  dailyCalorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  fiberGoal: number;
  dietaryPref: 'veg' | 'nonveg' | 'eggetarian' | 'jain';
  waterGoalMl: number;
  waterDrankMl: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  targetKeyword: string;
  category: 'Calorie Guides' | 'Protein & Macros' | 'Regional Cuisine' | 'Healthy Cooking & Oils' | 'Health & Weight Loss';
  publishDate: string;
  readTimeMinutes: number;
  content: string;
  relatedFoodIds: string[];
}

