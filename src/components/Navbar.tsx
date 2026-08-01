import React from 'react';
import { Camera, Utensils, BarChart3, Database, Sparkles, FileText, Flame, ShieldAlert, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'scanner' | 'dashboard' | 'analytics' | 'database' | 'usps' | 'blueprint';
  setActiveTab: (tab: 'scanner' | 'dashboard' | 'analytics' | 'database' | 'usps' | 'blueprint') => void;
  profile: UserProfile;
  totalTodayCalories: number;
  totalTodayProtein: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  totalTodayCalories,
  totalTodayProtein
}) => {
  const caloriePercent = Math.min(100, Math.round((totalTodayCalories / profile.dailyCalorieGoal) * 100));

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-300 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
                  SwasthThali
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  FREE AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Indian Calorie & Macro AI</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'scanner'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>AI Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Daily Diary</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'database'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Food Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('usps')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'usps'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>100 USPs</span>
            </button>

            <button
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'blueprint'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blueprint</span>
            </button>
          </nav>

          {/* Today Stats Pill */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl">
              <div className="flex items-center space-x-1 text-orange-400">
                <Flame className="w-4 h-4 fill-orange-400" />
                <span className="font-bold text-sm text-white">{totalTodayCalories}</span>
                <span className="text-xs text-slate-400">/ {profile.dailyCalorieGoal} kcal</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-700" />
              <div className="text-xs text-emerald-400 font-semibold">
                {totalTodayProtein}g Protein
              </div>
            </div>

            <button
              onClick={() => setActiveTab('blueprint')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1 hover:bg-emerald-500/20 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>₹0/mo Infra</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs font-medium text-slate-300 overflow-x-auto">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex flex-col items-center py-1 px-2 ${activeTab === 'scanner' ? 'text-orange-400 font-bold' : ''}`}
          >
            <Camera className="w-4 h-4 mb-0.5" />
            <span>Scanner</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-1 px-2 ${activeTab === 'dashboard' ? 'text-orange-400 font-bold' : ''}`}
          >
            <Utensils className="w-4 h-4 mb-0.5" />
            <span>Diary</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center py-1 px-2 ${activeTab === 'analytics' ? 'text-orange-400 font-bold' : ''}`}
          >
            <BarChart3 className="w-4 h-4 mb-0.5" />
            <span>Trends</span>
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex flex-col items-center py-1 px-2 ${activeTab === 'database' ? 'text-orange-400 font-bold' : ''}`}
          >
            <Database className="w-4 h-4 mb-0.5" />
            <span>Foods</span>
          </button>
          <button
            onClick={() => setActiveTab('usps')}
            className={`flex flex-col items-center py-1 px-2 ${activeTab === 'usps' ? 'text-orange-400 font-bold' : ''}`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span>USPs</span>
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`flex flex-col items-center py-1 px-2 ${activeTab === 'blueprint' ? 'text-orange-400 font-bold' : ''}`}
          >
            <FileText className="w-4 h-4 mb-0.5" />
            <span>Blueprint</span>
          </button>
        </div>
      </div>
    </header>
  );
};
