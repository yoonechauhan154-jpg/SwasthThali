import React from 'react';
import { Utensils, Award, Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectDish?: (dishName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectDish }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white block">SwasthThali</span>
              <span className="text-[11px] text-slate-500">FREE AI Indian Food Calorie & Macro Counter</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center space-x-1">
              <Award className="w-3.5 h-3.5" />
              <span>₹0 - ₹500/mo Infrastructure Cost</span>
            </span>
          </div>
        </div>

        {/* SEO Links & Keywords Strip */}
        <div className="space-y-2">
          <span className="font-bold text-slate-300 block text-[11px] uppercase tracking-wider">
            Popular Indian Calorie Searches & Dishes
          </span>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {[
              'Roti',
              'Dal Tadka',
              'Paneer Butter Masala',
              'Chole Bhature',
              'Sambar',
              'Poha',
              'Dosa',
              'Biryani',
              'Idli',
              'Gulab Jamun'
            ].map((kw, i) => (
              <button
                key={i}
                onClick={() => onSelectDish?.(kw)}
                className="hover:text-amber-400 cursor-pointer bg-slate-900 hover:bg-slate-800 transition-colors px-2.5 py-1 rounded border border-slate-800 text-left"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-4 border-t border-slate-900">
          <p>© 2026 SwasthThali. Open-Source Free MVP Blueprint powered by Gemini 3.6 Flash & ICMR Nutrition Engine.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0 text-slate-400">
            <span>Crafted for Indian Diets with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
