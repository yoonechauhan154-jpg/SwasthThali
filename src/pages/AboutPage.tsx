import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Sparkles, ShieldCheck, Flame, Dumbbell, Award, Utensils, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Helmet>
        <title>About Us | SwasthThali - Indian AI Food & Calorie Tracker</title>
        <meta
          name="description"
          content="Learn about SwasthThali's mission to simplify calorie tracking for traditional Indian diets, powered by AI vision and ICMR nutrition standards."
        />
        <link rel="canonical" href="https://swasththali.netlify.app/about" />
      </Helmet>

      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Heart className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          <span>Made for Indian Households</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Nourishing India with <br className="hidden sm:inline" />
          <span className="text-amber-400">Scientific Macro Precision</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          SwasthThali was built to bridge the gap between traditional Indian thalis, home-cooked regional recipes, and modern nutrition science.
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
            <Utensils className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">The Indian Diet Dilemma</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Most international fitness applications treat Indian dishes as generic "curries" or force users to measure raw single ingredients. But Indian cooking relies on mixed thalis, dough ball sizes, and tempering oil (tadka) that make standard tracking difficult.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our AI Vision Solution</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            SwasthThali combines multimodal Google Gemini AI with local ICMR-NIN nutrition data. Simply snap a photo of your plate, and our system deconstructs rotis, dals, sabzis, and rice portions while calculating hidden ghee and oil.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Core Pillars of SwasthThali</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center space-x-1.5">
              <Flame className="w-4 h-4" />
              <span>1. Accurate Oil & Ghee Math</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              We never ignore cooking fats. Dedicated sliders account for home, mother's love, and dhaba ghee levels.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center space-x-1.5">
              <Dumbbell className="w-4 h-4" />
              <span>2. Vegetarian Protein Focus</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              We rank plant-based protein efficiency across paneer, soya, sattu, legumes, and dairy without expensive supplements.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-blue-400 font-bold text-sm flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Privacy & Zero Paywalls</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              No account mandatory, zero data sales, and 100% free access for everyone across all devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
