import React, { useState } from 'react';
import { Search, Filter, Database, Utensils, Flame, Info, Check, Sparkles } from 'lucide-react';
import { FoodItem } from '../types';
import { INDIAN_FOOD_DATABASE, calculateAdjustedMacros } from '../data/indianFoodDatabase';

interface FoodDatabaseBrowserProps {
  searchQuery?: string;
}

export const FoodDatabaseBrowser: React.FC<FoodDatabaseBrowserProps> = ({ searchQuery = '' }) => {
  const [search, setSearch] = useState(searchQuery);

  React.useEffect(() => {
    if (searchQuery !== undefined) {
      setSearch(searchQuery);
    }
  }, [searchQuery]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [inspectFood, setInspectFood] = useState<FoodItem | null>(null);
  const [portionGrams, setPortionGrams] = useState(150);
  const [oilTsp, setOilTsp] = useState(1.5);
  const [gheeTsp, setGheeTsp] = useState(0.5);

  const categories = ['All', 'Dal & Curry', 'Sabzi', 'Paneer & Dairy', 'Rice & Biryani', 'Breads', 'South Indian', 'Snacks & Street', 'Sweets & Desserts', 'Breakfast'];
  const regions = ['All', 'North Indian', 'South Indian', 'Maharashtrian', 'Pan-Indian', 'Bengali', 'Hyderabadi'];

  const filteredItems = INDIAN_FOOD_DATABASE.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.hindiName && item.hindiName.includes(search)) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;

    return matchesSearch && matchesCategory && matchesRegion;
  });

  const inspectedMacros = inspectFood
    ? calculateAdjustedMacros(inspectFood, portionGrams, oilTsp, gheeTsp, 'home')
    : null;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Database className="w-5 h-5 text-amber-400" />
              <span>Indian Food Nutrition Engine Database</span>
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
              100+ Dishes
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standard ICMR-aligned Indian food database containing calories, protein, carbs, fat, fiber, and oil baselines.
          </p>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Indian dishes (e.g. Dal Tadka, Paneer, Dosa, Bhatura, Biryani, Roti)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Region Filter Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium mr-1">Region:</span>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap text-[11px] font-medium transition-all ${
                selectedRegion === reg
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Food Items Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((food) => (
          <div
            key={food.id}
            onClick={() => {
              setInspectFood(food);
              setPortionGrams(food.defaultServingGrams);
              setOilTsp(food.defaultOilTsp);
              setGheeTsp(food.defaultGheeTsp);
            }}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 space-y-3 cursor-pointer transition-all hover:scale-[1.01] group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base text-white group-hover:text-amber-300">
                    {food.name}
                  </span>
                </div>
                {food.hindiName && (
                  <span className="text-xs text-amber-400/90 font-serif block mt-0.5">
                    {food.hindiName}
                  </span>
                )}
                <span className="text-[11px] text-slate-400 block mt-1">
                  {food.category} • {food.region}
                </span>
              </div>

              <div className="text-right">
                <span className="text-lg font-black text-amber-400 block">{food.caloriesPer100g}</span>
                <span className="text-[10px] text-slate-400 block">kcal / 100g</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {food.description}
            </p>

            {/* Macro Pills */}
            <div className="grid grid-cols-4 text-center text-[11px] bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
              <div>
                <span className="text-slate-400 block text-[10px]">Protein</span>
                <span className="font-bold text-emerald-400">{food.proteinPer100g}g</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Carbs</span>
                <span className="font-bold text-amber-400">{food.carbsPer100g}g</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Fat</span>
                <span className="font-bold text-red-400">{food.fatPer100g}g</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Fiber</span>
                <span className="font-bold text-teal-400">{food.fiberPer100g}g</span>
              </div>
            </div>

            {/* Serving Unit & Tags */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400 font-medium">Serving: {food.defaultServingUnit}</span>
              <span className="text-amber-400 font-semibold group-hover:underline">Calculate Macros →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Food Modal / Card */}
      {inspectFood && inspectedMacros && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full space-y-5 relative shadow-2xl">
            <button
              onClick={() => setInspectFood(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
            >
              ✕ Close
            </button>

            <div>
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
                Single Dish Macro Calculator
              </span>
              <h3 className="text-xl font-black text-white">{inspectFood.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{inspectFood.description}</p>
            </div>

            {/* Live Slider Controls */}
            <div className="space-y-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Serving Weight:</span>
                  <span className="font-bold text-amber-400">{portionGrams}g</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={400}
                  step={5}
                  value={portionGrams}
                  onChange={(e) => setPortionGrams(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 bg-slate-700 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Cooking Oil (tsp):</span>
                  <span className="font-bold text-amber-400">{oilTsp} tsp</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={0.5}
                  value={oilTsp}
                  onChange={(e) => setOilTsp(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Desi Ghee (tsp):</span>
                  <span className="font-bold text-yellow-300">{gheeTsp} tsp</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={0.5}
                  value={gheeTsp}
                  onChange={(e) => setGheeTsp(Number(e.target.value))}
                  className="w-full accent-yellow-400 h-1.5 bg-slate-700 rounded-lg"
                />
              </div>
            </div>

            {/* Output Box */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 p-4 rounded-xl text-center space-y-2">
              <span className="text-xs text-amber-400 font-semibold block">Calculated Nutrition ({portionGrams}g)</span>
              <span className="text-3xl font-black text-white">{inspectedMacros.calories} kcal</span>
              <div className="flex justify-around text-xs font-bold pt-2 border-t border-amber-500/20">
                <span className="text-emerald-400">P: {inspectedMacros.protein}g</span>
                <span className="text-amber-400">C: {inspectedMacros.carbs}g</span>
                <span className="text-red-400">F: {inspectedMacros.fat}g</span>
                <span className="text-teal-400">Fib: {inspectedMacros.fiber}g</span>
              </div>
            </div>

            <button
              onClick={() => setInspectFood(null)}
              className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
            >
              Done Inspecting
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
