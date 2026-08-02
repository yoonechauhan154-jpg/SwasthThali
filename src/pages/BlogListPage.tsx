import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Search, Clock, Calendar, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export const BlogListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Calorie Guides', 'Protein & Macros', 'Regional Cuisine', 'Healthy Cooking & Oils', 'Health & Weight Loss'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.targetKeyword.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Helmet>
        <title>Indian Food Calorie & Nutrition Blog | SwasthThali</title>
        <meta
          name="description"
          content="Explore comprehensive Indian food calorie guides, protein breakdown, oil & ghee math, and weight loss tips tailored for traditional Indian diets."
        />
        <link rel="canonical" href="https://swasththali.netlify.app/blog" />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scientifically Backed ICMR & AI Nutrition Articles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            SwasthThali <span className="text-amber-400">Nutrition Blog</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            In-depth calorie guides, protein rankings, oil & ghee calculators, and weight loss strategies tailored for authentic Indian home-cooked meals.
          </p>

          {/* Search bar */}
          <div className="relative pt-2">
            <Search className="w-5 h-5 absolute left-3.5 top-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Roti, Dal Tadka, Paneer, Biryani, Poha)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-200 hover:shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-amber-400 font-semibold border border-slate-700/60">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTimeMinutes} min</span>
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                  {post.metaDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishDate}</span>
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1 transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No articles found</h3>
          <p className="text-slate-400 text-xs">Try clearing your search query or selecting another category.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
