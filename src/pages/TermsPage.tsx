import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileCheck, AlertCircle, Scale, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Helmet>
        <title>Terms & Conditions | SwasthThali</title>
        <meta
          name="description"
          content="SwasthThali Terms & Conditions of Use. Medical disclaimer, acceptable usage, intellectual property, and service terms."
        />
        <link rel="canonical" href="https://swasththali.netlify.app/terms/" />
        <meta property="og:title" content="Terms & Conditions | SwasthThali" />
        <meta property="og:description" content="SwasthThali Terms & Conditions of Use. Medical disclaimer, acceptable usage, intellectual property, and service terms." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swasththali.netlify.app/terms/" />
        <meta property="og:site_name" content="SwasthThali" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms & Conditions | SwasthThali" />
        <meta name="twitter:description" content="SwasthThali Terms & Conditions of Use. Medical disclaimer, acceptable usage, intellectual property, and service terms." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://swasththali.netlify.app/' },
            { '@type': 'ListItem', position: 2, name: 'Terms & Conditions' },
          ]
        })}</script>
      </Helmet>

      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Scale className="w-4 h-4" />
          <span>Last Updated: August 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-slate-400 text-sm">
          Please read these terms and conditions carefully before using the SwasthThali web application.
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl space-y-2">
          <h2 className="text-base font-bold text-amber-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>1. Medical Disclaimer (Not Medical Advice)</span>
          </h2>
          <p className="text-slate-300">
            SwasthThali provides nutritional estimates, calorie guides, and macro calculations for informational and educational purposes only. Content provided on SwasthThali is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified clinical dietitian before undertaking any diet or workout regimen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">2. Acceptance of Terms</h2>
          <p>
            By accessing or using SwasthThali (https://swasththali.netlify.app), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue use of the application.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">3. Accuracy of Estimates</h2>
          <p>
            While our database is benchmarked against ICMR-NIN nutritional guidelines and powered by Google Gemini AI, individual cooking variations (ghee volume, portion density, salt levels) mean that nutritional values are approximate estimations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">4. Intellectual Property</h2>
          <p>
            All original blog content, database structures, UI components, logos, and tools are the intellectual property of SwasthThali. Unmodified scraping or automated reproduction of whole articles without attribution is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">5. Governing Law</h2>
          <p>
            These terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </div>
  );
};
