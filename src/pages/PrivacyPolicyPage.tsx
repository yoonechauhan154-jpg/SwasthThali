import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Helmet>
        <title>Privacy Policy | SwasthThali</title>
        <meta
          name="description"
          content="SwasthThali Privacy Policy. Learn how we handle local data storage, AI food image scanning, Google AdSense cookies, and user data privacy."
        />
        <link rel="canonical" href="https://swasththali.netlify.app/privacy-policy" />
      </Helmet>

      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <Shield className="w-4 h-4" />
          <span>Effective Date: August 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm">
          At SwasthThali (https://swasththali.netlify.app), accessible from any modern web browser, your privacy is paramount to us.
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>1. Local Data Persistence</span>
          </h2>
          <p>
            SwasthThali operates primarily on a client-side architecture. Your daily food diary logs, target calorie goals, custom recipe entries, and profile preferences are stored directly in your web browser’s local storage (LocalStorage). We do not collect or store your daily food logs on external database servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>2. AI Image Recognition</span>
          </h2>
          <p>
            When you use the AI Scanner feature to identify dishes from a photograph, your image is transmitted ephemerally via secure Netlify serverless functions to Google Gemini API servers. The image is processed in real time strictly for dish classification and nutritional estimation. Images are not retained, archived, or sold.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>3. Cookies & Advertising (Google AdSense)</span>
          </h2>
          <p>
            SwasthThali uses Google AdSense to serve advertisements. Google, as a third-party vendor, uses cookies (such as the DART cookie) to serve ads based on your visit to this site and other sites on the Internet.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Users may opt out of personalized advertising by visiting Google Ads Settings.</li>
            <li>Third-party vendors and ad networks may also serve ads on our site in accordance with Google policies.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white">4. Contact Information</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, feel free to contact us via email at <strong>contact@swasththali.netlify.app</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
