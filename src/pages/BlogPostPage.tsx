import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Calendar, ArrowLeft, BookOpen, ChevronRight, Utensils, Sparkles, Tag, Dumbbell, Flame } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { INDIAN_FOOD_DATABASE } from '../data/indianFoodDatabase';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  }, [post]);

  const relatedFoods = useMemo(() => {
    if (!post || !post.relatedFoodIds) return [];
    return INDIAN_FOOD_DATABASE.filter((food) => post.relatedFoodIds.includes(food.id));
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
        <h1 className="text-2xl font-bold text-white">Article Not Found</h1>
        <p className="text-slate-400 text-sm">The requested nutrition article could not be located.</p>
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'SwasthThali Nutrition Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SwasthThali',
      logo: {
        '@type': 'ImageObject',
        url: 'https://swasththali.netlify.app/favicon.ico'
      }
    },
    datePublished: post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://swasththali.netlify.app/blog/${post.slug}`
    }
  };

  // Convert basic markdown formatting into styled JSX elements
  const renderFormattedContent = (content: string) => {
    const sections = content.split('\n\n');

    return sections.map((sec, idx) => {
      const trimmed = sec.trim();

      // H1 Header
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-6 mb-4">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }

      // H2 Header
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-amber-400 mt-8 mb-4 border-b border-slate-800 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // H3 Header
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg font-bold text-slate-100 mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Horizontal Divider
      if (trimmed === '---') {
        return <hr key={idx} className="border-slate-800 my-6" />;
      }

      // Markdown Table
      if (trimmed.includes('|')) {
        const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
        if (lines.length >= 2) {
          const headerLine = lines[0];
          const bodyLines = lines.slice(2); // Skip separator line

          const parseCells = (rowStr: string) =>
            rowStr
              .split('|')
              .map((c) => c.trim())
              .filter((c, i, arr) => i > 0 && i < arr.length - 1);

          const headers = parseCells(headerLine);

          return (
            <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-inner">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 uppercase tracking-wider text-[11px] font-bold">
                  <tr>
                    {headers.map((h, hIdx) => (
                      <th key={hIdx} className="py-3 px-4">
                        {h.replace(/\*\*/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {bodyLines.map((bRow, bIdx) => {
                    const cells = parseCells(bRow);
                    return (
                      <tr key={bIdx} className="hover:bg-slate-800/40 transition-colors">
                        {cells.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-4 font-medium">
                            {cell.includes('**') ? (
                              <strong className="text-white font-bold">{cell.replace(/\*\*/g, '')}</strong>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Bullet List
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={idx} className="space-y-2 my-4 pl-4 text-slate-300 text-sm sm:text-base list-disc list-outside marker:text-amber-400">
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^[*\-]\s+/, '');
              return (
                <li key={iIdx} className="leading-relaxed">
                  {renderTextWithFormatting(cleanItem)}
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered List
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n');
        return (
          <ol key={idx} className="space-y-2 my-4 pl-4 text-slate-300 text-sm sm:text-base list-decimal list-outside marker:text-amber-400 font-medium">
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^\d+\.\s+/, '');
              return (
                <li key={iIdx} className="leading-relaxed">
                  {renderTextWithFormatting(cleanItem)}
                </li>
              );
            })}
          </ol>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed my-4">
          {renderTextWithFormatting(trimmed)}
        </p>
      );
    });
  };

  // Helper to highlight **bold** and *italic* text inside paragraphs
  const renderTextWithFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Helmet>
        <title>{post.title} | SwasthThali</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.targetKeyword} />
        <link rel="canonical" href={`https://swasththali.netlify.app/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to="/blog" className="hover:text-amber-400 transition-colors">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200 truncate max-w-xs sm:max-w-md">{post.title}</span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
            {post.category}
          </span>
          <span className="text-slate-400 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTimeMinutes} min read</span>
          </span>
          <span className="text-slate-400 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishDate}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium italic border-l-4 border-amber-500 pl-4 py-1 bg-slate-900/60 rounded-r-lg">
          {post.metaDescription}
        </p>
      </div>

      {/* Article Content */}
      <div className="article-body font-sans text-slate-200 space-y-4">
        {renderFormattedContent(post.content)}
      </div>

      {/* Related Dishes CTA Card */}
      {relatedFoods.length > 0 && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 rounded-2xl p-6 border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <Utensils className="w-5 h-5" />
            <span>Featured Food Engine Dishes in this Guide</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedFoods.map((food) => (
              <div
                key={food.id}
                className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{food.name}</h4>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                    <span className="text-amber-400 font-semibold flex items-center space-x-1">
                      <Flame className="w-3 h-3" />
                      <span>{food.caloriesPer100g} kcal/100g</span>
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                      <Dumbbell className="w-3 h-3" />
                      <span>{food.proteinPer100g}g protein</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate('/');
                  }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shrink-0 cursor-pointer"
                >
                  Calculate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Related Nutrition Articles</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.slug}
                to={`/blog/${rPost.slug}`}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-4 rounded-xl space-y-2 transition-all block group"
              >
                <span className="text-[10px] uppercase font-bold text-amber-400 block">{rPost.category}</span>
                <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {rPost.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{rPost.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to Blog button */}
      <div className="pt-4">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Nutrition Articles</span>
        </Link>
      </div>
    </div>
  );
};
