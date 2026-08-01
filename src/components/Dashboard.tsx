import React, { useState } from 'react';
import { Flame, Droplet, Plus, Trash2, Search, Utensils, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { MealLogEntry, UserProfile, FoodItem } from '../types';
import { INDIAN_FOOD_DATABASE, calculateAdjustedMacros } from '../data/indianFoodDatabase';

interface DashboardProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  mealLogs: MealLogEntry[];
  setMealLogs: React.Dispatch<React.SetStateAction<MealLogEntry[]>>;
  onSaveMealLog: (entry: MealLogEntry) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  setProfile,
  mealLogs,
  setMealLogs,
  onSaveMealLog
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quickGrams, setQuickGrams] = useState(150);
  const [quickOil, setQuickOil] = useState(1.0);
  const [quickGhee, setQuickGhee] = useState(0.5);

  // Totals for today
  const totalCalories = mealLogs.reduce((acc, curr) => acc + curr.totalCalories, 0);
  const totalProtein = Number(mealLogs.reduce((acc, curr) => acc + curr.totalProtein, 0).toFixed(1));
  const totalCarbs = Number(mealLogs.reduce((acc, curr) => acc + curr.totalCarbs, 0).toFixed(1));
  const totalFat = Number(mealLogs.reduce((acc, curr) => acc + curr.totalFat, 0).toFixed(1));
  const totalFiber = Number(mealLogs.reduce((acc, curr) => acc + curr.totalFiber, 0).toFixed(1));

  const caloriePercent = Math.min(100, Math.round((totalCalories / profile.dailyCalorieGoal) * 100));
  const proteinPercent = Math.min(100, Math.round((totalProtein / profile.proteinGoal) * 100));
  const carbsPercent = Math.min(100, Math.round((totalCarbs / profile.carbsGoal) * 100));
  const fatPercent = Math.min(100, Math.round((totalFat / profile.fatGoal) * 100));
  const fiberPercent = Math.min(100, Math.round((totalFiber / profile.fiberGoal) * 100));

  const addWater = (amount: number) => {
    setProfile((prev) => ({
      ...prev,
      waterDrankMl: Math.min(prev.waterGoalMl, prev.waterDrankMl + amount)
    }));
  };

  const deleteMealLog = (id: string) => {
    setMealLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuickAdd = () => {
    if (!selectedFood) return;
    const macros = calculateAdjustedMacros(selectedFood, quickGrams, quickOil, quickGhee, 'home');
    const newEntry: MealLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mealType: 'snacks',
      dishName: selectedFood.name,
      items: [
        {
          foodName: selectedFood.name,
          grams: quickGrams,
          calories: macros.calories,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          fiber: macros.fiber,
          oilTsp: quickOil,
          gheeTsp: quickGhee,
          cookingMethod: 'home'
        }
      ],
      totalCalories: macros.calories,
      totalProtein: macros.protein,
      totalCarbs: macros.carbs,
      totalFat: macros.fat,
      totalFiber: macros.fiber,
      totalOilTsp: quickOil,
      totalGheeTsp: quickGhee
    };

    onSaveMealLog(newEntry);
    setSelectedFood(null);
    setSearchQuery('');
  };

  const filteredFoods = searchQuery.trim()
    ? INDIAN_FOOD_DATABASE.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (f.hindiName && f.hindiName.includes(searchQuery)) ||
          f.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Daily Calorie & Macro Target Gauges */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-orange-400" />
              <span>Today's Nutrition Summary</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Indian macro breakdown calibrated against daily goals.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Target Goal:</span>
            <input
              type="number"
              value={profile.dailyCalorieGoal}
              onChange={(e) => setProfile({ ...profile, dailyCalorieGoal: Number(e.target.value) || 2000 })}
              className="w-20 bg-slate-800 border border-slate-700 text-white rounded px-2 py-1 text-center font-bold"
            />
            <span className="text-slate-400">kcal</span>
          </div>
        </div>

        {/* Calorie Progress Ring & Macro Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          
          {/* Main Calorie Progress Gauge */}
          <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-slate-800 border border-orange-500/30 p-5 rounded-2xl text-center flex flex-col items-center justify-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" className="text-slate-800" fill="transparent" />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={301.59}
                  strokeDashoffset={301.59 - (301.59 * caloriePercent) / 100}
                  className="text-orange-500 transition-all duration-700 ease-out"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-black text-white block">{totalCalories}</span>
                <span className="text-[10px] font-semibold text-slate-400 block">/ {profile.dailyCalorieGoal} kcal</span>
              </div>
            </div>

            <span className="text-xs font-bold text-amber-400 mt-3">
              {profile.dailyCalorieGoal - totalCalories > 0
                ? `${profile.dailyCalorieGoal - totalCalories} kcal remaining`
                : 'Calorie Goal Reached!'}
            </span>
          </div>

          {/* Macro Bars */}
          <div className="md:col-span-3 space-y-3">
            
            {/* Protein Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-400">Protein ({totalProtein}g / {profile.proteinGoal}g)</span>
                <span className="text-slate-400 text-[11px]">{proteinPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${proteinPercent}%` }} />
              </div>
            </div>

            {/* Carbs Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-amber-400">Carbohydrates ({totalCarbs}g / {profile.carbsGoal}g)</span>
                <span className="text-slate-400 text-[11px]">{carbsPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${carbsPercent}%` }} />
              </div>
            </div>

            {/* Fat Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-red-400">Fats ({totalFat}g / {profile.fatGoal}g)</span>
                <span className="text-slate-400 text-[11px]">{fatPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-red-400 h-full rounded-full transition-all duration-500" style={{ width: `${fatPercent}%` }} />
              </div>
            </div>

            {/* Fiber Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-teal-400">Dietary Fiber ({totalFiber}g / {profile.fiberGoal}g)</span>
                <span className="text-slate-400 text-[11px]">{fiberPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${fiberPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Water Tracker Strip */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Droplet className="w-5 h-5 fill-blue-400" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">Hydration & Chaas Tracker</span>
              <span className="text-xs text-slate-400">
                {profile.waterDrankMl} ml / {profile.waterGoalMl} ml ({Math.round((profile.waterDrankMl / profile.waterGoalMl) * 100)}% complete)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => addWater(250)}
              className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-500/30 transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+250 ml Glass</span>
            </button>
            <button
              onClick={() => addWater(500)}
              className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-500/30 transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+500 ml Bottle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Search & Manual Logger Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Search className="w-4 h-4 text-amber-400" />
          <span>Quick Manual Food Logger</span>
        </h3>

        <div className="relative">
          <input
            type="text"
            placeholder="Search 100+ Indian dishes (e.g. Roti, Paneer, Dal Tadka, Dosa, Poha)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
          />

          {filteredFoods.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl z-20">
              {filteredFoods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => {
                    setSelectedFood(food);
                    setQuickGrams(food.defaultServingGrams);
                    setQuickOil(food.defaultOilTsp);
                    setQuickGhee(food.defaultGheeTsp);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-700 border-b border-slate-700/60 last:border-0 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{food.name}</span>
                    <span className="text-[11px] text-slate-400">{food.category} • {food.defaultServingUnit}</span>
                  </div>
                  <span className="text-amber-400 font-bold">{food.caloriesPer100g} kcal / 100g</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Food Modifier Box */}
        {selectedFood && (
          <div className="bg-slate-800/80 border border-amber-500/30 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="font-bold text-sm text-white">{selectedFood.name}</span>
              <button
                onClick={() => setSelectedFood(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Grams:</label>
                <input
                  type="number"
                  value={quickGrams}
                  onChange={(e) => setQuickGrams(Number(e.target.value) || 100)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded p-1 text-center font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Oil (tsp):</label>
                <input
                  type="number"
                  step="0.5"
                  value={quickOil}
                  onChange={(e) => setQuickOil(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded p-1 text-center font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Ghee (tsp):</label>
                <input
                  type="number"
                  step="0.5"
                  value={quickGhee}
                  onChange={(e) => setQuickGhee(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded p-1 text-center font-bold"
                />
              </div>
            </div>

            <button
              onClick={handleQuickAdd}
              className="w-full py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              Add {selectedFood.name} to Daily Log
            </button>
          </div>
        )}
      </div>

      {/* Today's Meal Log Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
          <span>Today's Meal Diary ({mealLogs.length} Entries)</span>
          <span className="text-xs font-normal text-slate-400">Sorted by time logged</span>
        </h3>

        {mealLogs.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
            No meals logged yet today. Use the AI Photo Scanner or Quick Logger to log your meal!
          </div>
        ) : (
          <div className="space-y-3">
            {mealLogs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold capitalize px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {log.mealType}
                    </span>
                    <span className="font-bold text-sm text-white">{log.dishName}</span>
                    <span className="text-xs text-slate-400">({log.timestamp})</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-base font-black text-amber-400">{log.totalCalories} kcal</span>
                    <button
                      onClick={() => deleteMealLog(log.id)}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {log.items.map((sub, i) => (
                    <div key={i} className="bg-slate-900/50 p-2 rounded border border-slate-800 flex justify-between">
                      <span>{sub.foodName} ({sub.grams}g)</span>
                      <span className="text-amber-300 font-semibold">{sub.calories} kcal • {sub.oilTsp + sub.gheeTsp} tsp fat</span>
                    </div>
                  ))}
                </div>

                {/* Log Macro Footprint */}
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Protein: <strong className="text-emerald-400">{log.totalProtein}g</strong> | Carbs: <strong className="text-amber-400">{log.totalCarbs}g</strong> | Fat: <strong className="text-red-400">{log.totalFat}g</strong></span>
                  <span>Cooking Fat: {log.totalOilTsp} tsp oil, {log.totalGheeTsp} tsp ghee</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
