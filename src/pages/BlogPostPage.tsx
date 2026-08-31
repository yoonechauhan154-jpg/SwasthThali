import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Calendar, ArrowLeft, BookOpen, ChevronRight, Utensils, Sparkles, Tag, Dumbbell, Flame, User, ExternalLink } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { INDIAN_FOOD_DATABASE } from '../data/indianFoodDatabase';

const FAQ_DATA: Record<string, { question: string; answer: string }[]> = {
  'Calorie Guides': [
    { question: 'How accurate are the calorie counts for Indian dishes?', answer: 'All calorie data on SwasthThali is benchmarked against ICMR-NIN (Indian Council of Medical Research - National Institute of Nutrition) guidelines. Individual values may vary by 10-15% depending on specific ingredients, cooking methods, and portion sizes used in your household.' },
    { question: 'Can I track these dishes in the SwasthThali app?', answer: 'Yes. Search any dish name in the SwasthThali Food Engine, adjust portion sizes with the built-in gram sliders, and customize oil and ghee teaspoons to match your exact recipe for accurate macro tracking.' },
    { question: 'How do I account for homemade vs restaurant versions?', answer: 'Restaurant and dhaba versions typically use 1.5x to 2x more cooking oil and ghee than home-cooked meals. Use the SwasthThali cooking mode toggle (Home vs Dhaba) to automatically adjust fat content and calorie estimates.' },
  ],
  'Protein & Macros': [
    { question: 'How much protein should an Indian vegetarian eat daily?', answer: 'According to ICMR-NIN 2020 guidelines, the Recommended Dietary Allowance (RDA) for protein is 0.8g per kg of body weight for healthy adults. For a 60kg person, that is approximately 48g per day. Active individuals and those focused on muscle building may benefit from 1.2-1.6g/kg.' },
    { question: 'What are the best vegetarian protein sources in Indian cuisine?', answer: 'Top Indian vegetarian protein sources include soya chunks (52g/100g dry), low-fat paneer (18-20g/100g), roasted sattu (20g/100g), sprouted moong (12g/100g cooked), and Greek yogurt/hung curd (10g/100g). Combining legumes with grains creates complete protein profiles.' },
    { question: 'Can I reach 100g protein on a vegetarian Indian diet?', answer: 'Yes. A strategic meal plan combining paneer, soya chunks, dahi, sattu, dal, and sprouts can achieve 100g of protein within 1,600-1,900 calories. The SwasthThali Protein Optimizer tool helps identify the most protein-efficient foods for your specific daily gap.' },
  ],
  'Regional Cuisine': [
    { question: 'How do regional Indian cuisines differ in calorie density?', answer: 'North Indian cuisine tends to be higher in calories due to generous use of ghee, butter, and cream-based gravies. South Indian cuisine uses more rice and coconut-based preparations. Maharashtrian and Gujarati cuisines balance sweetness with oil content. Each region has both calorie-dense and light options.' },
    { question: 'Are South Indian tiffin items healthy for weight loss?', answer: 'Steamed idlis are excellent for weight loss as they require zero cooking oil and the fermentation process improves nutrient bioavailability. Dosa and vada are higher in calories due to oil used during cooking. Pairing with sambar (a fiber-rich lentil stew) makes South Indian meals nutritionally balanced.' },
    { question: 'How can I reduce calories in traditional thali meals?', answer: 'Key strategies include: skipping either roti or rice (saves 150-230 kcal), requesting dry rotis without ghee (saves ~90 kcal), loading up on vegetable sabzi, using low-fat dahi, and saving sweets for special occasions. A balanced thali can range from 600 to 1,200 kcal depending on these choices.' },
  ],
  'Healthy Cooking & Oils': [
    { question: 'How much oil and ghee is recommended daily for Indian cooking?', answer: 'The ICMR recommends limiting total fat intake to 20-30% of daily calories. For a 2,000 kcal diet, that means 44-67g of total fat per day, which translates to roughly 3-5 teaspoons of cooking oil/ghee for the entire day including what is used in tadka, roasting, and direct application.' },
    { question: 'Does air frying really save significant calories?', answer: 'Yes. Air frying reduces added oil by 70-80%, saving approximately 100-160 calories per serving compared to deep frying. For example, an air-fried samosa has 155 kcal versus 262 kcal for a deep-fried version, a 40% calorie reduction with comparable taste and texture.' },
    { question: 'Is ghee healthier than vegetable oil for Indian cooking?', answer: 'Both ghee and oil contain 45 calories per teaspoon. Ghee has a higher smoke point (250°C) making it stable for deep frying, and contains butyric acid beneficial for gut health. Mustard oil is rich in Omega-3 fatty acids. The healthiest approach is using a mix of cooking fats in moderation.' },
  ],
  'Health & Weight Loss': [
    { question: 'Which Indian foods have the lowest glycemic index?', answer: 'Low GI Indian foods include chana dal (GI 8-28), rajma (GI 29), sprouted moong (GI 25), paneer (GI <30), millets like ragi and bajra (GI 40-55), and most non-starchy vegetables. These foods cause slower, more gradual blood sugar rises compared to white rice (GI 70) or refined maida (GI 72).' },
    { question: 'How can I manage diabetes with traditional Indian food?', answer: 'Replace white rice with brown rice or millets, swap maida roti for missi roti (besan + wheat), pair all carbohydrates with protein and healthy fats, eat vegetables first, and choose whole fruits over juices. Consistent portion control and meal timing are equally important for blood sugar management.' },
    { question: 'What is the best strategy for vegetarian weight loss on an Indian diet?', answer: 'Focus on protein-rich foods (paneer, soya, dal, sprouts) to maintain muscle mass, use the oil and ghee sliders to track hidden fats, fill half your plate with vegetables, control roti/rice portions, and avoid liquid calories like sweet chai and fruit juices. Aim for a 300-500 kcal daily deficit for sustainable fat loss.' },
  ],
};

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

  const faqs = useMemo(() => {
    if (!post) return [];
    return FAQ_DATA[post.category] || FAQ_DATA['Calorie Guides'];
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

  // JSON-LD Article Schema (BlogPosting)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'SwasthThali Nutrition Team',
      url: 'https://swasththali.netlify.app/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SwasthThali',
      url: 'https://swasththali.netlify.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://swasththali.netlify.app/favicon.ico'
      }
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://swasththali.netlify.app/blog/${post.slug}`
    },
    keywords: post.targetKeyword,
    articleSection: post.category,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://swasththali.netlify.app/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://swasththali.netlify.app/blog' },
      { '@type': 'ListItem', position: 3, name: post.title },
    ]
  };

  // FAQPage Schema for this post
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  // Convert basic markdown formatting into styled JSX elements
  const renderFormattedContent = (content: string) => {
    const sections = content.split('\n\n');

    return sections.map((sec, idx) => {
      const trimmed = sec.trim();

      // H1 Header
      if (trimmed.startsWith('# ')) {
        return null; // Skip H1 from content, rendered in header
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
          const bodyLines = lines.slice(2);

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

  // Extract first 2 sentences for key takeaway
  const firstParagraph = post.content.split('\n\n').find(s => s.trim() && !s.trim().startsWith('#') && !s.trim().startsWith('---'));
  const keyTakeaway = firstParagraph
    ? firstParagraph.replace(/^#+\s*/, '').replace(/\*\*/g, '').split('. ').slice(0, 2).join('. ') + '.'
    : post.metaDescription;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Helmet>
        <title>{post.title} | SwasthThali</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.targetKeyword} />
        <link rel="canonical" href={`https://swasththali.netlify.app/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | SwasthThali`} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://swasththali.netlify.app/blog/${post.slug}`} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:site_name" content="SwasthThali" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:modified_time" content={post.publishDate} />
        <meta property="article:section" content={post.category} />
        <meta property="article:author" content="SwasthThali Nutrition Team" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | SwasthThali`} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-400" aria-label="Breadcrumb">
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
            <span>Published {post.publishDate}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Author Byline + Published/Updated dates */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>Written by <strong className="text-slate-200">SwasthThali Nutrition Team</strong></span>
          </span>
          <span>·</span>
          <span>Published {post.publishDate}</span>
          <span>·</span>
          <span>Updated {post.publishDate}</span>
        </div>

        {/* Key Takeaway / Direct Answer */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-sm text-slate-300 leading-relaxed">
          <strong className="text-amber-400">Key Takeaway:</strong> {keyTakeaway}
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium italic border-l-4 border-amber-500 pl-4 py-1 bg-slate-900/60 rounded-r-lg">
          {post.metaDescription}
        </p>

        <p className="text-xs text-slate-500 italic">
          For anyone tracking Indian home-cooked meals for weight loss, muscle gain, or diabetes management.
        </p>
      </div>

      {/* Article Content */}
      <div className="article-body font-sans text-slate-200 space-y-4">
        {renderFormattedContent(post.content)}
      </div>

      {/* External Source Links */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <ExternalLink className="w-4 h-4 text-amber-400" />
          <span>References &amp; Sources</span>
        </h3>
        <ul className="space-y-2 text-xs text-slate-400">
          <li className="flex items-start space-x-2">
            <span className="text-amber-400 mt-0.5">·</span>
            <a href="https://www.icmr.res.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors underline underline-offset-2">
              ICMR-NIN Dietary Guidelines for Indians 2020
            </a>
            <span className="text-slate-600">(Indian Council of Medical Research)</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-400 mt-0.5">·</span>
            <a href="https://www.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors underline underline-offset-2">
              FSSAI Nutritional Guidelines for Indian Foods
            </a>
            <span className="text-slate-600">(Food Safety and Standards Authority of India)</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-400 mt-0.5">·</span>
            <a href="https://www.nin.res.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors underline underline-offset-2">
              National Institute of Nutrition - Indian Food Composition Tables
            </a>
            <span className="text-slate-600">(NIN, Hyderabad)</span>
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group">
                <summary className="p-4 cursor-pointer font-bold text-sm text-white hover:text-amber-400 transition-colors list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-amber-400 text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Related Dishes CTA Card */}
      {relatedFoods.length > 0 && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 rounded-2xl p-6 border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <Utensils className="w-5 h-5" />
            <span>Calculate These Dishes in the Food Engine</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedFoods.map((food) => (
              <Link
                key={food.id}
                to="/"
                className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-colors"
              >
                <div>
                  <h3 className="font-bold text-sm text-white">{food.name}</h3>
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
                <span className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shrink-0">
                  Calculate
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Related Nutrition Articles</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.slug}
                to={`/blog/${rPost.slug}`}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-4 rounded-xl space-y-2 transition-all block group"
              >
                <span className="text-[10px] uppercase font-bold text-amber-400 block">{rPost.category}</span>
                <h3 className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {rPost.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">{rPost.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* About SwasthThali Trust Blurb */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center space-y-2">
        <p className="text-xs text-slate-400">
          <strong className="text-slate-200">About SwasthThali:</strong> SwasthThali is a free, open-source AI-powered Indian food calorie and macro counter built for Indian households. All nutrition data is benchmarked against ICMR-NIN guidelines.
        </p>
        <Link to="/about" className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors">
          Learn more about our mission →
        </Link>
      </div>

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
