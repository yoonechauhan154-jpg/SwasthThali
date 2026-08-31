import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpCircle, ChevronDown, Sparkles, ShieldCheck, Heart, Utensils } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is SwasthThali completely free to use?',
      answer:
        'Yes! SwasthThali is 100% free with no paywalls, hidden premium subscriptions, or feature locks. All food engines, AI meal scanners, and vegetarian protein tools are accessible to everyone.'
    },
    {
      question: 'How accurate is the AI Food & Thali Scanner?',
      answer:
        'Our scanner leverages Google Gemini 3.6 Flash multimodal AI fine-tuned specifically for Indian dishes (thalis, rotis, dals, biryani, dosas, snacks). It analyzes dish visual composition, estimates gram weight, and correlates findings with our local ICMR-aligned database for high precision.'
    },
    {
      question: 'How are hidden cooking oil and ghee calculated?',
      answer:
        'Unlike standard Western calorie apps that ignore cooking media, SwasthThali includes dedicated oil and ghee sliders for every dish. We calculate 1 tsp of oil/ghee as 45 kcal (5g fat) and provide home vs dhaba cooking mode presets.'
    },
    {
      question: 'Does SwasthThali support regional Indian cuisines?',
      answer:
        'Yes! Our database covers North Indian, South Indian (Idli, Dosa, Sambar, Uttapam), Western Indian (Poha, Pav Bhaji, Dhokla, Thepla), East Indian (Machher Jhol, Rosogolla), and Central Indian regional dishes.'
    },
    {
      question: 'How does SwasthThali compare to Western calorie tracking apps?',
      answer:
        'Western apps often struggle with composite Indian meals like Thalis, estimating plain ingredients individually or missing oil temperings. SwasthThali deconstructs mixed plates and accounts for mother-style ghee application and oil tadka.'
    },
    {
      question: 'Can I customize my daily calorie, protein, and water targets?',
      answer:
        'Absolutely. You can edit your target daily calories, protein, carbs, fat, fiber, and water intake directly in your Profile on the Dashboard. All settings persist locally in your browser.'
    },
    {
      question: 'Is my uploaded food photo or personal data private?',
      answer:
        'Yes. Food photos are processed ephemerally in real-time by the Gemini API solely for dish recognition. We do not require accounts, store passwords, or sell personal user data to third parties.'
    },
    {
      question: 'Does SwasthThali support Jain, Vegetarian, and Fasting diets?',
      answer:
        'Yes. You can select Jain or Pure Veg dietary preferences in your Profile. Our database clearly tags Jain-compatible dishes (no onion, garlic, or root veggies) and fasting (Navratri/Vrat) foods like Sabudana Khichdi and Makhana.'
    },
    {
      question: 'How does the Vegetarian Protein Optimizer work?',
      answer:
        'Our Protein Optimizer automatically compares your logged protein against your daily goal. It then ranks top Indian vegetarian foods (Paneer, Soya, Sprouts, Sattu, Dal) by protein-per-calorie efficiency to help close your macro gap.'
    },
    {
      question: 'Is SwasthThali available on mobile devices?',
      answer:
        'Yes, SwasthThali is built with a mobile-first responsive layout that works seamlessly across smartphones, tablets, and desktop browsers without requiring app store downloads.'
    },
    {
      question: 'What is the ICMR-NIN nutrition database standard?',
      answer:
        'Our database values are benchmarked against official guidelines from the Indian Council of Medical Research (ICMR) and the National Institute of Nutrition (NIN) Hyderabad, tailored for Indian raw ingredient densities.'
    },
    {
      question: 'How can I contact the developer or submit feedback?',
      answer:
        'We welcome user feedback, dish request suggestions, and bug reports! You can reach out directly via email at contact@swasththali.netlify.app.'
    }
  ];

  // FAQPage JSON-LD Schema
  const faqSchema = {
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
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Helmet>
        <title>Frequently Asked Questions (FAQ) | SwasthThali</title>
        <meta
          name="description"
          content="Find answers to common questions about SwasthThali AI food scanner, Indian food calorie accuracy, hidden oil calculations, and vegetarian protein optimization."
        />
        <link rel="canonical" href="https://swasththali.netlify.app/faq" />
        <meta property="og:title" content="Frequently Asked Questions (FAQ) | SwasthThali" />
        <meta property="og:description" content="Find answers to common questions about SwasthThali AI food scanner, Indian food calorie accuracy, hidden oil calculations, and vegetarian protein optimization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swasththali.netlify.app/faq" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:site_name" content="SwasthThali" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Frequently Asked Questions (FAQ) | SwasthThali" />
        <meta name="twitter:description" content="Find answers to common questions about SwasthThali AI food scanner, Indian food calorie accuracy, hidden oil calculations, and vegetarian protein optimization." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://swasththali.netlify.app/' },
            { '@type': 'ListItem', position: 2, name: 'FAQ' },
          ]
        })}</script>
      </Helmet>

      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <HelpCircle className="w-4 h-4" />
          <span>SwasthThali Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Everything you need to know about tracking Indian calories, oil & ghee math, AI detection accuracy, and privacy.
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <span className="font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
