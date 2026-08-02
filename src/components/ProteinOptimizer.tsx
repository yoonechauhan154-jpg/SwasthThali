import React, { useState } from 'react';
import { Dumbbell, Plus, Sparkles, CheckCircle2, Flame, X } from 'lucide-react';
import { FoodItem, MealLogEntry } from '../types';
import { getTopProteinFoods, calculateAdjustedMacros } from '../data/indianFoodDatabase';
import { MealCalculatorCard } from './MealCalculatorCard';

interface ProteinOptimizerProps {
  mealLogs: MealLogEntry[];
  proteinGoal: number;
  onSaveMealLog: (entry: MealLogEntry) => void;
}

export const ProteinOptimizer: React.FC<ProteinOptimizerProps> = ({
  mealLogs,
  proteinGoal,
  onSaveMealLog
}) => {
  const [selectedFoodForCalc, setSelectedFoodForCalc] = useState<FoodItem | null>(null);

  const totalTodayProtein = Number(
    (mealLogs || []).reduce((acc, curr) => acc + (curr?.totalProtein || 0), 0).toFixed(1)
  );

  const remainingProtein = Number(Math.max(0, proteinGoal - totalTodayProtein).toFixed(1));

  // Get top protein efficient foods from local database
  const topSuggestions = getTopProteinFoods([], 4);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 rounded-2xl p-6 border border-emerald-500/30 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-lg text-white">Vegetarian Protein Optimizer</h3>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Macro-Efficient
              </span>
            </div>
            <p className="text-xs text-slate-400">High-protein, calorie-smart Indian dishes to close your macro gap</p>
          </div>
        </div>
      </div>

      {/* Status banner */}
      {remainingProtein > 0 ? (
        <div className="bg-slate-800/80 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-emerald-300 flex items-center space-x-2">
              <span>You need <strong className="text-amber-300 text-base">{remainingProtein}g</strong> more protein today</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Logged {totalTodayProtein}g of {proteinGoal}g goal. Below are top Indian foods with maximum protein per calorie:
            </p>
          </div>
          <div className="text-right text-xs bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-700/60 text-slate-300">
            Target: <span className="font-bold text-white">{proteinGoal}g</span>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center space-x-3 text-emerald-300">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold text-sm">🎉 Daily Protein Goal Achieved!</div>
            <p className="text-xs text-emerald-200/80">
              You hit {totalTodayProtein}g out of your {proteinGoal}g target today. Great job sustaining your muscle & recovery!
            </p>
          </div>
        </div>
      )}

      {/* Suggested Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {topSuggestions.map((food) => {
          const defaultServingGrams = food.defaultServingGrams || 150;
          const macros = calculateAdjustedMacros(
            food,
            defaultServingGrams,
            food.defaultOilTsp || 0,
            food.defaultGheeTsp || 0,
            'home'
          );

          return (
            <div
              key={food.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all rounded-xl p-3.5 flex flex-col justify-between space-y-3 shadow-md group"
            >
              <div>
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {food.name}
                    </h4>
                    {food.hindiName && (
                      <p className="text-xs text-slate-400 font-medium">{food.hindiName}</p>
                    )}
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                    {defaultServingGrams}g
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>{macros.protein}g Protein</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400 font-medium">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{macros.calories} kcal</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedFoodForCalc(food)}
                className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add to Diary</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Pre-filled Meal Calculator Card modal/inline drawer */}
      {selectedFoodForCalc && (
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Fine-tune serving & oil/ghee sliders:
            </span>
            <button
              onClick={() => setSelectedFoodForCalc(null)}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 bg-slate-800 px-2 py-1 rounded"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          </div>

          <MealCalculatorCard
            thaliTitle={`Protein Boost: ${selectedFoodForCalc.name}`}
            initialItems={[
              {
                dishName: selectedFoodForCalc.name,
                hindiName: selectedFoodForCalc.hindiName,
                estimatedGrams: selectedFoodForCalc.defaultServingGrams || 150,
                matchedFoodId: selectedFoodForCalc.id,
                oilTsp: selectedFoodForCalc.defaultOilTsp || 0,
                gheeTsp: selectedFoodForCalc.defaultGheeTsp || 0,
                cookingMethod: 'home'
              }
            ]}
            onSaveToLog={(entry) => {
              onSaveMealLog(entry);
              setSelectedFoodForCalc(null);
            }}
            onResetScanner={() => setSelectedFoodForCalc(null)}
          />
        </div>
      )}
    </div>
  );
};
