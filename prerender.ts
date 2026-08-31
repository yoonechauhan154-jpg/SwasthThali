import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './src/components/Navbar';
import { Footer } from './src/components/Footer';
import { FoodDatabaseBrowser } from './src/components/FoodDatabaseBrowser';
import { BlogListPage } from './src/pages/BlogListPage';
import { BlogPostPage } from './src/pages/BlogPostPage';
import { FaqPage } from './src/pages/FaqPage';
import { AboutPage } from './src/pages/AboutPage';
import { PrivacyPolicyPage } from './src/pages/PrivacyPolicyPage';
import { TermsPage } from './src/pages/TermsPage';

const DIST = resolve(process.cwd(), 'dist');
const BASE = 'https://swasththali.netlify.app';

// Read the Vite-built index.html as template — contains correct hashed CSS/JS asset tags
const viteTemplate = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

const slugs = [
  'how-many-calories-in-1-roti-chapati-with-without-ghee',
  'dal-tadka-calories-and-protein-complete-katori-guide',
  'veg-biryani-calories-per-plate-hyderabadi-style',
  'palak-paneer-vs-paneer-butter-masala-calories-compared',
  'samosa-calories-deep-fried-vs-baked-air-fried',
  'steamed-rice-vs-brown-rice-which-is-better-for-weight-loss',
  'idli-and-dosa-calories-south-indian-breakfast-guide',
  'chole-rajma-calories-protein-complete-guide',
  'poha-calories-with-peanuts-healthy-or-not',
  'gulab-jamun-and-indian-sweets-the-real-calorie-count',
  'high-protein-vegetarian-indian-diet-plan-100g-protein-guide',
  'ghee-vs-oil-which-has-fewer-calories-for-indian-cooking',
  'sambar-calories-and-nutrition-breakdown',
  'aloo-paratha-with-butter-full-calorie-count',
  'pav-bhaji-calories-mumbai-street-food-guide',
  'chai-calories-how-much-sugar-and-milk-adds-up',
  'diabetic-friendly-low-gi-indian-foods-list',
  'air-fryer-vs-deep-fried-indian-snacks-calorie-comparison',
  'north-indian-thali-total-calorie-breakdown',
  'how-to-count-hidden-oil-and-ghee-in-indian-cooking',
];

const routes = [
  '/',
  '/blog',
  ...slugs.map(s => `/blog/${s}`),
  '/faq',
  '/about',
  '/privacy-policy',
  '/terms',
];

// The Vite-built template has: <head>...</head><body><div id="root">...</div><script type="module" src="/assets/index-[hash].js"></script></body>
// We need to:
// 1. Insert route-specific meta/schema tags just before </head>
// 2. Replace the content inside <div id="root">...</div> with rendered React HTML
const headCloseTag = '</head>';
const rootOpenTag = '<div id="root">';
const rootCloseTag = '</div>';

const defaultProfile = {
  name: 'Yoone',
  dailyCalorieGoal: 2000,
  proteinGoal: 75,
  carbsGoal: 250,
  fatGoal: 55,
  fiberGoal: 30,
  dietaryPref: 'veg' as const,
  waterGoalMl: 3000,
  waterDrankMl: 1500,
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SwasthThali',
  url: BASE,
  logo: BASE + '/favicon.ico',
  description: '100% Free AI Indian Food Calorie & Macro Counter with Precision Oil & Ghee Sliders',
  sameAs: [] as string[],
};

const HomePage = React.createElement('div', { className: 'max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8' },
  React.createElement(Helmet, null,
    React.createElement('title', null, 'SwasthThali - Free AI Indian Food Calorie & Macro Counter'),
    React.createElement('meta', { name: 'description', content: '100% Free AI Indian Food Calorie & Macro Counter with Precision Oil & Ghee Sliders. Track Dal, Roti, Rice, Thalis, and Street Food accurately.' }),
    React.createElement('link', { rel: 'canonical', href: 'https://swasththali.netlify.app/' }),
    React.createElement('meta', { property: 'og:title', content: 'SwasthThali - Free AI Indian Food Calorie & Macro Counter' }),
    React.createElement('meta', { property: 'og:description', content: 'Track calories, protein, carbs, fat, oil, and ghee in Indian thalis, rotis, dals, and street food with zero subscription fees.' }),
    React.createElement('meta', { property: 'og:type', content: 'website' }),
    React.createElement('meta', { property: 'og:url', content: 'https://swasththali.netlify.app/' }),
    React.createElement('meta', { property: 'og:image', content: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80' }),
    React.createElement('meta', { property: 'og:site_name', content: 'SwasthThali' }),
    React.createElement('meta', { name: 'twitter:card', content: 'summary_large_image' }),
    React.createElement('meta', { name: 'twitter:title', content: 'SwasthThali - Free AI Indian Food Calorie & Macro Counter' }),
    React.createElement('meta', { name: 'twitter:description', content: 'Track calories, protein, carbs, fat, oil, and ghee in Indian thalis, rotis, dals, and street food with zero subscription fees.' }),
    React.createElement('meta', { name: 'twitter:image', content: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80' }),
  ),
  React.createElement('h1', { className: 'sr-only' }, 'Indian Food Nutrition Engine - Free AI Calorie & Macro Counter'),
  React.createElement(FoodDatabaseBrowser, { searchQuery: '' })
);

// Import blog posts data for title extraction
const { BLOG_POSTS } = await import('./src/data/blogPosts');

const routeTitles: Record<string, string> = {
  '/': 'SwasthThali - Free AI Indian Food Calorie & Macro Counter',
  '/blog': 'Indian Food Calorie & Nutrition Blog | SwasthThali',
  '/faq': 'Frequently Asked Questions (FAQ) | SwasthThali',
  '/about': 'About Us | SwasthThali - Indian AI Food & Calorie Tracker',
  '/privacy-policy': 'Privacy Policy | SwasthThali',
  '/terms': 'Terms & Conditions | SwasthThali',
};
slugs.forEach(s => {
  const post = BLOG_POSTS.find(p => p.slug === s);
  if (post) routeTitles[`/blog/${s}`] = `${post.title} | SwasthThali`;
});

const routeDescriptions: Record<string, string> = {
  '/': '100% Free AI Indian Food Calorie & Macro Counter with Precision Oil & Ghee Sliders. Track Dal, Roti, Rice, Thalis, and Street Food accurately.',
  '/blog': 'Explore comprehensive Indian food calorie guides, protein breakdown, oil & ghee math, and weight loss tips tailored for traditional Indian diets.',
  '/faq': 'Find answers to common questions about SwasthThali AI food scanner, Indian food calorie accuracy, hidden oil calculations, and vegetarian protein optimization.',
  '/about': 'Learn about SwasthThali\'s mission to simplify calorie tracking for traditional Indian diets, powered by AI vision and ICMR nutrition standards.',
  '/privacy-policy': 'SwasthThali Privacy Policy. Learn how we handle local data storage, AI food image scanning, Google AdSense cookies, and user data privacy.',
  '/terms': 'SwasthThali Terms & Conditions of Use. Medical disclaimer, acceptable usage, intellectual property, and service terms.',
};
slugs.forEach(s => {
  const post = BLOG_POSTS.find(p => p.slug === s);
  if (post) routeDescriptions[`/blog/${s}`] = post.metaDescription;
});

let success = 0;
let fail = 0;

console.log('Prerendering routes...\n');

for (const route of routes) {
  try {
    const appTree = React.createElement(MemoryRouter, { initialEntries: [route] },
      React.createElement('div', { className: 'min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950' },
        React.createElement(Navbar, {
          activeTab: 'database' as const,
          setActiveTab: () => {},
          profile: defaultProfile,
          totalTodayCalories: 0,
          totalTodayProtein: 0,
        }),
        React.createElement('main', { className: 'flex-1 w-full' },
          React.createElement(Routes, null,
            React.createElement(Route, { path: '/', element: HomePage }),
            React.createElement(Route, { path: '/blog', element: React.createElement(BlogListPage) }),
            React.createElement(Route, { path: '/blog/:slug', element: React.createElement(BlogPostPage) }),
            React.createElement(Route, { path: '/faq', element: React.createElement(FaqPage) }),
            React.createElement(Route, { path: '/about', element: React.createElement(AboutPage) }),
            React.createElement(Route, { path: '/privacy-policy', element: React.createElement(PrivacyPolicyPage) }),
            React.createElement(Route, { path: '/terms', element: React.createElement(TermsPage) }),
          )
        ),
        React.createElement(Footer, {})
      )
    );

    const helmetContext: any = {};
    const appHtml = renderToString(
      React.createElement(HelmetProvider, { context: helmetContext },
        appTree
      )
    );

    // Extract Helmet tags from rendered HTML (they appear inside <div id="root">)
    // and move them to <head> by stripping from body and injecting into template
    const titleMatch = appHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/);
    const metaMatches = [...appHtml.matchAll(/<meta\s+([^>]+)\/?>/g)].map(m => m[0]);
    const linkMatches = [...appHtml.matchAll(/<link\s+([^>]+)\/?>/g)].map(m => m[0]);
    const scriptMatches = [...appHtml.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[0]);

    // Build clean app HTML (without Helmet tags in body)
    let cleanAppHtml = appHtml;
    if (titleMatch) cleanAppHtml = cleanAppHtml.replace(titleMatch[0], '');
    metaMatches.forEach(m => { cleanAppHtml = cleanAppHtml.replace(m, ''); });
    linkMatches.forEach(m => { cleanAppHtml = cleanAppHtml.replace(m, ''); });
    scriptMatches.forEach(m => { cleanAppHtml = cleanAppHtml.replace(m, ''); });

    // Append route-specific meta/schema tags just before </head>
    const routeTitle = routeTitles[route] || 'SwasthThali';
    const routeDesc = routeDescriptions[route] || '';
    let headTags = `<title>${routeTitle}</title>`;
    headTags += `<meta name="description" content="${routeDesc}" />`;
    headTags += `<link rel="canonical" href="${BASE}${route === '/' ? '' : route}" />`;
    headTags += `<meta property="og:title" content="${routeTitle}" />`;
    headTags += `<meta property="og:description" content="${routeDesc}" />`;
    headTags += `<meta property="og:type" content="${route.startsWith('/blog/') ? 'article' : 'website'}" />`;
    headTags += `<meta property="og:url" content="${BASE}${route === '/' ? '' : route}" />`;
    headTags += `<meta property="og:image" content="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80" />`;
    headTags += `<meta property="og:site_name" content="SwasthThali" />`;
    headTags += `<meta name="twitter:card" content="summary_large_image" />`;
    headTags += `<meta name="twitter:title" content="${routeTitle}" />`;
    headTags += `<meta name="twitter:description" content="${routeDesc}" />`;
    headTags += `<meta name="twitter:image" content="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80" />`;
    scriptMatches.forEach(m => { headTags += m; });
    headTags += `<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>`;

    // Start from the Vite-built template (has correct hashed CSS/JS assets)
    let html = viteTemplate;

    // 1. Replace <title> in existing template with route-specific title
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${routeTitle}</title>`);

    // 2. Insert additional meta/schema tags just before </head>
    html = html.replace(headCloseTag, headTags + headCloseTag);

    // 3. Replace the content inside <div id="root">...</div> with rendered React HTML
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${cleanAppHtml}</div>`);

      let outputPath: string;
      if (route === '/') {
        outputPath = resolve(DIST, 'index.html');
      } else {
        outputPath = resolve(DIST, route.slice(1), 'index.html');
        mkdirSync(dirname(outputPath), { recursive: true });
      }

    writeFileSync(outputPath, html, 'utf-8');
    console.log(`  ✓ ${route}`);
    success++;
  } catch (err: any) {
    console.error(`  ✗ ${route}: ${err.message}`);
    fail++;
  }
}

console.log(`\nPrerendered ${success} pages (${fail} failures)`);
