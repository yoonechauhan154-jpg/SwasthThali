import React, { useState } from 'react';
import { Sparkles, Search, Filter, HelpCircle, CheckCircle2, Award, Zap } from 'lucide-react';
import { USP_LIST } from '../data/uspsAndBlueprint';

export const UspShowcase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Nutrition Engine',
    'AI Image Tech',
    'Indian Lifestyle',
    'Health & Medical',
    'Cost & Scalability',
    'Mother & Recipe Customizer'
  ];

  const filteredUSPs = USP_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.whyItMatters.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100 Unique Value Propositions (USPs)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Designed Specifically for Indian Cooking & Diets
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Standard Western fitness apps fail in India because they miss ghee, oil variations, Thali item deconstruction, and mother-style cooking. Here is why our 100 unique innovations make SwasthThali unbeatable.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search USPs (e.g. Oil Slider, Ghee, Thali, Mother Recipe, Jain, Fasting)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* USPs Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing {filteredUSPs.length} of 100 Unique USPs</span>
        <span className="text-amber-400 font-semibold">100% Free Production Blueprint</span>
      </div>

      {/* USPs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUSPs.map((usp) => (
          <div
            key={usp.id}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-xl p-5 space-y-3 transition-all hover:scale-[1.005]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 font-black text-xs flex items-center justify-center border border-amber-500/30">
                  {usp.id}
                </span>
                <h3 className="font-bold text-base text-white">{usp.title}</h3>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                {usp.category}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {usp.description}
            </p>

            {/* Why it Matters Section */}
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 text-xs space-y-1">
              <span className="font-bold text-amber-400 flex items-center space-x-1 text-[11px]">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Why Every Indian Calorie App Needs This:</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {usp.whyItMatters}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
