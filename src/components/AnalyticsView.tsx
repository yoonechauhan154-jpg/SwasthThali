import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Sparkles, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { UserProfile, MealLogEntry } from '../types';

interface AnalyticsViewProps {
  profile: UserProfile;
  mealLogs: MealLogEntry[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ profile, mealLogs }) => {
  // Sample weekly historical trends data merged with today's real logs
  const todayCalories = mealLogs.reduce((acc, curr) => acc + curr.totalCalories, 0);
  const todayProtein = mealLogs.reduce((acc, curr) => acc + curr.totalProtein, 0);
  const todayCarbs = mealLogs.reduce((acc, curr) => acc + curr.totalCarbs, 0);
  const todayFat = mealLogs.reduce((acc, curr) => acc + curr.totalFat, 0);

  const weeklyData = [
    { day: 'Mon', calories: 1850, protein: 68, carbs: 240, fat: 52, goal: profile.dailyCalorieGoal },
    { day: 'Tue', calories: 1920, protein: 72, carbs: 245, fat: 58, goal: profile.dailyCalorieGoal },
    { day: 'Wed', calories: 2100, protein: 65, carbs: 280, fat: 64, goal: profile.dailyCalorieGoal },
    { day: 'Thu', calories: 1780, protein: 75, carbs: 220, fat: 48, goal: profile.dailyCalorieGoal },
    { day: 'Fri', calories: 1950, protein: 70, carbs: 250, fat: 55, goal: profile.dailyCalorieGoal },
    { day: 'Sat', calories: 2250, protein: 60, carbs: 310, fat: 72, goal: profile.dailyCalorieGoal },
    { day: 'Today', calories: todayCalories || 1940, protein: todayProtein || 69, carbs: todayCarbs || 235, fat: todayFat || 54, goal: profile.dailyCalorieGoal }
  ];

  const macroPieData = [
    { name: 'Protein', value: Math.round(todayProtein * 4 || 280), color: '#10b981' },
    { name: 'Carbs', value: Math.round(todayCarbs * 4 || 960), color: '#fbbf24' },
    { name: 'Fat', value: Math.round(todayFat * 9 || 480), color: '#f87171' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Analytics Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <span>Weekly Nutrition & Macro Reports</span>
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              7-Day Trends
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual analytics tracking daily calorie intake, protein targets, and macro distribution.
          </p>
        </div>

        <div className="flex items-center space-x-4 text-xs bg-slate-800 p-3 rounded-xl border border-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px]">Avg Weekly Calories</span>
            <span className="font-extrabold text-white text-base">1,970 kcal</span>
          </div>
          <div className="h-6 w-[1px] bg-slate-700" />
          <div>
            <span className="text-slate-400 block text-[10px]">Avg Protein Hit Rate</span>
            <span className="font-extrabold text-emerald-400 text-base">92% Target</span>
          </div>
        </div>
      </div>

      {/* Weekly Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Calorie vs Goal Area Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Weekly Calorie Intake vs Goal (kcal)</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 2500]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="calories" name="Consumed kcal" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCal)" />
                <Area type="monotone" dataKey="goal" name="Calorie Target" stroke="#64748b" strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Macro Distribution Pie */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Macro Split (% Calories)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Calorie contribution from Protein, Carbohydrates, and Fats.
            </p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 text-center text-xs pt-2 border-t border-slate-800">
            <div>
              <span className="text-emerald-400 font-bold block">Protein</span>
              <span className="text-slate-300 font-extrabold">{todayProtein || 68}g</span>
            </div>
            <div>
              <span className="text-amber-400 font-bold block">Carbs</span>
              <span className="text-slate-300 font-extrabold">{todayCarbs || 240}g</span>
            </div>
            <div>
              <span className="text-red-400 font-bold block">Fat</span>
              <span className="text-slate-300 font-extrabold">{todayFat || 52}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Nutrition Report Card */}
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Gemini AI Weekly Nutrition Insights</h3>
            <span className="text-xs text-emerald-400 font-medium">Personalized Dietitian Report</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-1">
            <span className="font-bold text-emerald-400 block flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Protein Consistency</span>
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              You hit 92% of your protein goal this week! Adding Soya Chunks or Paneer Bhurji to your lunch helped maintain lean muscle mass.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-1">
            <span className="font-bold text-amber-400 block flex items-center space-x-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Oil & Ghee Optimization</span>
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Your average cooking oil was 1.8 tsp/meal. Lowering gravy oil by 0.5 tsp will save ~180 kcal daily without losing flavor.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-1">
            <span className="font-bold text-teal-400 block flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>Fiber & Digestion</span>
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Dietary fiber averaged 28g/day thanks to Dal Tadka and Baingan Bharta. Sambar and Rasam are excellent additions for gut health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
