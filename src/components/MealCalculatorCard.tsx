import React, { useState } from 'react';
import { Flame, Droplet, Heart, ShieldCheck, Sparkles, PlusCircle, CheckCircle, Info, RefreshCw } from 'lucide-react';
import { FoodItem, MealType, CookingMethod, MealLogEntry, MealLogSubItem } from '../types';
import { INDIAN_FOOD_DATABASE, calculateAdjustedMacros, getMatchedFoodItem } from '../data/indianFoodDatabase';

interface MealCalculatorCardProps {
  initialItems?: Array<{
    dishName: string;
    hindiName?: string;
    estimatedGrams: number;
    matchedFoodId?: string;
    oilTsp: number;
    gheeTsp: number;
    cookingMethod?: CookingMethod;
  }>;
  thaliTitle?: string;
  onSaveToLog: (entry: MealLogEntry) => void;
  onResetScanner?: () => void;
}

export const MealCalculatorCard: React.FC<MealCalculatorCardProps> = ({
  initialItems = [
    { dishName: 'Dal Tadka', hindiName: 'दाल तड़का', estimatedGrams: 150, matchedFoodId: 'dal_tadka', oilTsp: 1.5, gheeTsp: 0.5, cookingMethod: 'home' },
    { dishName: 'Paneer Butter Masala', hindiName: 'पनीर बटर मसाला', estimatedGrams: 150, matchedFoodId: 'paneer_butter_masala', oilTsp: 1.5, gheeTsp: 2.0, cookingMethod: 'home' },
    { dishName: 'Ghee Roti', hindiName: 'घी रोटी', estimatedGrams: 70, matchedFoodId: 'roti_ghee', oilTsp: 0, gheeTsp: 1.0, cookingMethod: 'home' },
    { dishName: 'Steamed Rice', hindiName: 'चावल', estimatedGrams: 120, matchedFoodId: 'steamed_basmati_rice', oilTsp: 0, gheeTsp: 0, cookingMethod: 'home' }
  ],
  thaliTitle = 'Deconstructed Thali Analyzer',
  onSaveToLog,
  onResetScanner
}) => {
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [items, setItems] = useState(
    (initialItems || []).map((item, idx) => ({
      id: `item-${idx}-${Date.now()}`,
      foodName: item?.dishName || 'Food Item',
      hindiName: item?.hindiName,
      matchedFood: getMatchedFoodItem(item?.matchedFoodId, item?.dishName),
      grams: item?.estimatedGrams || 150,
      oilTsp: item?.oilTsp ?? 1.0,
      gheeTsp: item?.gheeTsp ?? 0.5,
      cookingMethod: (item?.cookingMethod || 'home') as CookingMethod,
      isMothersLove: false
    }))
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const updateItemGrams = (id: string, grams: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, grams } : it)));
  };

  const updateItemOil = (id: string, oilTsp: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, oilTsp } : it)));
  };

  const updateItemGhee = (id: string, gheeTsp: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, gheeTsp } : it)));
  };

  const updateItemMethod = (id: string, cookingMethod: CookingMethod) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, cookingMethod } : it)));
  };

  const toggleMothersLove = (id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const nextLove = !it.isMothersLove;
          return {
            ...it,
            isMothersLove: nextLove,
            gheeTsp: nextLove ? Number(((it.gheeTsp || 0) + 0.5).toFixed(1)) : Math.max(0, Number(((it.gheeTsp || 0) - 0.5).toFixed(1)))
          };
        }
        return it;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Calculate live overall totals across all items
  const calculatedItems = (items || []).map((it) => {
    const macros = calculateAdjustedMacros(
      it.matchedFood,
      it.grams,
      it.oilTsp,
      it.gheeTsp,
      it.cookingMethod
    ) || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, addedOilTsp: 0, addedGheeTsp: 0 };
    return {
      ...it,
      macros
    };
  });

  const totalCalories = calculatedItems.reduce((acc, curr) => acc + (curr.macros?.calories || 0), 0);
  const totalProtein = Number(calculatedItems.reduce((acc, curr) => acc + (curr.macros?.protein || 0), 0).toFixed(1));
  const totalCarbs = Number(calculatedItems.reduce((acc, curr) => acc + (curr.macros?.carbs || 0), 0).toFixed(1));
  const totalFat = Number(calculatedItems.reduce((acc, curr) => acc + (curr.macros?.fat || 0), 0).toFixed(1));
  const totalFiber = Number(calculatedItems.reduce((acc, curr) => acc + (curr.macros?.fiber || 0), 0).toFixed(1));
  const totalOilTsp = Number(calculatedItems.reduce((acc, curr) => acc + (curr.oilTsp || 0), 0).toFixed(1));
  const totalGheeTsp = Number(calculatedItems.reduce((acc, curr) => acc + (curr.gheeTsp || 0), 0).toFixed(1));

  const handleSave = () => {
    const subItems: MealLogSubItem[] = calculatedItems.map((c) => ({
      foodName: c.foodName || 'Food Item',
      grams: c.grams || 100,
      calories: c.macros?.calories || 0,
      protein: c.macros?.protein || 0,
      carbs: c.macros?.carbs || 0,
      fat: c.macros?.fat || 0,
      fiber: c.macros?.fiber || 0,
      oilTsp: c.oilTsp || 0,
      gheeTsp: c.gheeTsp || 0,
      cookingMethod: c.cookingMethod || 'home'
    }));

    const entry: MealLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mealType,
      dishName: thaliTitle || 'Deconstructed Thali',
      items: subItems,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      totalFiber,
      totalOilTsp,
      totalGheeTsp
    };

    onSaveToLog(entry);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-white shadow-xl space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              {thaliTitle}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/30">
              Live Recalculator
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Adjust portion sizes, cooking oil, ghee, and recipe styles for exact Indian macro math.
          </p>
        </div>

        {/* Meal Type Switcher */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
          {(['breakfast', 'lunch', 'snacks', 'dinner'] as MealType[]).map((type) => (
            <button
              key={type}
              onClick={() => setMealType(type)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                mealType === type
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Macro Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 p-3 rounded-xl text-center">
          <div className="flex items-center justify-center space-x-1 text-orange-400 mb-1">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-medium text-slate-300">Total Calories</span>
          </div>
          <span className="text-2xl font-black text-white">{totalCalories}</span>
          <span className="text-[10px] block text-orange-300 font-semibold mt-0.5">kcal</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-xl text-center">
          <span className="text-xs text-emerald-400 font-semibold block mb-1">Protein</span>
          <span className="text-xl font-extrabold text-white">{totalProtein}g</span>
          <span className="text-[10px] block text-slate-400 mt-0.5">{Math.round((totalProtein * 4 / totalCalories) * 100 || 0)}% of cals</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-xl text-center">
          <span className="text-xs text-amber-400 font-semibold block mb-1">Carbs</span>
          <span className="text-xl font-extrabold text-white">{totalCarbs}g</span>
          <span className="text-[10px] block text-slate-400 mt-0.5">{Math.round((totalCarbs * 4 / totalCalories) * 100 || 0)}% of cals</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-xl text-center">
          <span className="text-xs text-red-400 font-semibold block mb-1">Fat (Oil+Ghee)</span>
          <span className="text-xl font-extrabold text-white">{totalFat}g</span>
          <span className="text-[10px] block text-red-300 font-semibold mt-0.5">
            {totalOilTsp} tsp oil • {totalGheeTsp} tsp ghee
          </span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-xl text-center col-span-2 sm:col-span-1">
          <span className="text-xs text-teal-400 font-semibold block mb-1">Fiber</span>
          <span className="text-xl font-extrabold text-white">{totalFiber}g</span>
          <span className="text-[10px] block text-teal-300 font-medium mt-0.5">Gut Healthy</span>
        </div>
      </div>

      {/* Item-by-Item Breakdown Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>Plate Item Breakdown ({items.length} Items)</span>
          {onResetScanner && (
            <button
              onClick={onResetScanner}
              className="text-xs text-amber-400 hover:underline flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-scan Photo</span>
            </button>
          )}
        </h3>

        {items.map((item) => {
          const m = item.macros;
          return (
            <div
              key={item.id}
              className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 space-y-4 hover:border-slate-600 transition-colors"
            >
              {/* Item Top Row */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-base text-white">{item.foodName}</span>
                    {item.hindiName && (
                      <span className="text-xs text-amber-400 font-serif bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                        {item.hindiName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.matchedFood?.category || 'General'} • {item.matchedFood?.region || 'Indian'}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-lg font-black text-amber-400">{m?.calories ?? 0}</span>
                    <span className="text-xs text-slate-400 ml-1">kcal</span>
                    <div className="text-[10px] text-slate-300">
                      P: {m?.protein ?? 0}g | C: {m?.carbs ?? 0}g | F: {m?.fat ?? 0}g
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-500 hover:text-red-400 text-xs px-2 py-1 rounded bg-slate-900 border border-slate-700"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                
                {/* Portion Size Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-300 font-medium">Portion Weight:</span>
                    <span className="font-bold text-amber-400">{item.grams}g</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={500}
                    step={5}
                    value={item.grams}
                    onChange={(e) => updateItemGrams(item.id, Number(e.target.value))}
                    className="w-full accent-orange-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Small (50g)</span>
                    <span>1 Katori (150g)</span>
                    <span>Big (300g)</span>
                  </div>
                </div>

                {/* Oil Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-300 font-medium flex items-center space-x-1">
                      <Droplet className="w-3.5 h-3.5 text-amber-500" />
                      <span>Oil added:</span>
                    </span>
                    <span className="font-bold text-amber-400">
                      {item.oilTsp} tsp <span className="text-[10px] text-slate-400">({item.oilTsp * 45} kcal)</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={item.oilTsp}
                    onChange={(e) => updateItemOil(item.id, Number(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>0 tsp (Diet)</span>
                    <span>1.5 tsp (Home)</span>
                    <span>4 tsp (Dhaba)</span>
                  </div>
                </div>

                {/* Ghee Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-300 font-medium flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Desi Ghee:</span>
                    </span>
                    <span className="font-bold text-yellow-300">
                      {item.gheeTsp} tsp <span className="text-[10px] text-slate-400">({item.gheeTsp * 45} kcal)</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={4}
                    step={0.5}
                    value={item.gheeTsp}
                    onChange={(e) => updateItemGhee(item.id, Number(e.target.value))}
                    className="w-full accent-yellow-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>0 tsp</span>
                    <span>0.5 tsp (Tawa)</span>
                    <span>3 tsp (Shahi)</span>
                  </div>
                </div>
              </div>

              {/* Cooking Method & Mother's Mode toggles */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400 text-[11px] font-medium">Cooking Style:</span>
                  {(['home', 'dhaba', 'airfryer'] as CookingMethod[]).map((method) => (
                    <button
                      key={method}
                      onClick={() => updateItemMethod(item.id, method)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize transition-all ${
                        item.cookingMethod === method
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {method === 'home' ? '🏡 Home' : method === 'dhaba' ? '🍛 Dhaba (+25% Fat)' : '💨 Air-Fryer (-15% Fat)'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => toggleMothersLove(item.id)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                    item.isMothersLove
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${item.isMothersLove ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span>Mother's Recipe (+0.5 tsp Ghee)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Action Banner */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Calculations verified using authentic Indian Council of Medical Research (ICMR) food composition tables.</span>
        </div>

        <button
          onClick={handleSave}
          disabled={savedSuccess}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {savedSuccess ? (
            <>
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Saved to Daily Log!</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              <span>Save Meal to Daily Diary ({totalCalories} kcal)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
