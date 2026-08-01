import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FoodScanner } from './components/FoodScanner';
import { Dashboard } from './components/Dashboard';
import { AnalyticsView } from './components/AnalyticsView';
import { FoodDatabaseBrowser } from './components/FoodDatabaseBrowser';
import { UspShowcase } from './components/UspShowcase';
import { BlueprintModal } from './components/BlueprintModal';
import { Footer } from './components/Footer';
import { UserProfile, MealLogEntry } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'dashboard' | 'analytics' | 'database' | 'usps' | 'blueprint'>('scanner');

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Yoone',
    dailyCalorieGoal: 2000,
    proteinGoal: 75,
    carbsGoal: 250,
    fatGoal: 55,
    fiberGoal: 30,
    dietaryPref: 'veg',
    waterGoalMl: 3000,
    waterDrankMl: 1500
  });

  // Sample initial logs for today
  const [mealLogs, setMealLogs] = useState<MealLogEntry[]>([
    {
      id: 'log-1',
      timestamp: '08:30 AM',
      mealType: 'breakfast',
      dishName: 'Indori Kanda Poha & Tea',
      items: [
        {
          foodName: 'Indori Kanda Poha',
          grams: 150,
          calories: 240,
          protein: 4.8,
          carbs: 39.7,
          fat: 7.2,
          fiber: 3.1,
          oilTsp: 1.5,
          gheeTsp: 0,
          cookingMethod: 'home'
        }
      ],
      totalCalories: 240,
      totalProtein: 4.8,
      totalCarbs: 39.7,
      totalFat: 7.2,
      totalFiber: 3.1,
      totalOilTsp: 1.5,
      totalGheeTsp: 0
    },
    {
      id: 'log-2',
      timestamp: '01:15 PM',
      mealType: 'lunch',
      dishName: 'Home Style Dal Roti Meal',
      items: [
        {
          foodName: 'Dal Tadka',
          grams: 150,
          calories: 142,
          protein: 7.8,
          carbs: 19.2,
          fat: 4.2,
          fiber: 4.6,
          oilTsp: 1.0,
          gheeTsp: 0.5,
          cookingMethod: 'home'
        },
        {
          foodName: 'Ghee Roti (2 Pcs)',
          grams: 76,
          calories: 235,
          protein: 6.4,
          carbs: 35.7,
          fat: 6.4,
          fiber: 5.9,
          oilTsp: 0,
          gheeTsp: 1.0,
          cookingMethod: 'home'
        },
        {
          foodName: 'Homemade Dahi',
          grams: 100,
          calories: 60,
          protein: 3.5,
          carbs: 4.7,
          fat: 3.2,
          fiber: 0,
          oilTsp: 0,
          gheeTsp: 0,
          cookingMethod: 'home'
        }
      ],
      totalCalories: 437,
      totalProtein: 17.7,
      totalCarbs: 59.6,
      totalFat: 13.8,
      totalFiber: 10.5,
      totalOilTsp: 1.0,
      totalGheeTsp: 1.5
    }
  ]);

  const handleSaveMealLog = (entry: MealLogEntry) => {
    setMealLogs((prev) => [entry, ...prev]);
  };

  const totalTodayCalories = mealLogs.reduce((acc, curr) => acc + curr.totalCalories, 0);
  const totalTodayProtein = Math.round(mealLogs.reduce((acc, curr) => acc + curr.totalProtein, 0));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        totalTodayCalories={totalTodayCalories}
        totalTodayProtein={totalTodayProtein}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'scanner' && <FoodScanner onSaveMealLog={handleSaveMealLog} />}

        {activeTab === 'dashboard' && (
          <Dashboard
            profile={profile}
            setProfile={setProfile}
            mealLogs={mealLogs}
            setMealLogs={setMealLogs}
            onSaveMealLog={handleSaveMealLog}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsView profile={profile} mealLogs={mealLogs} />}

        {activeTab === 'database' && <FoodDatabaseBrowser />}

        {activeTab === 'usps' && <UspShowcase />}

        {activeTab === 'blueprint' && <BlueprintModal />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
