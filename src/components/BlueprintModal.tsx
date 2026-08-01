import React, { useState } from 'react';
import { FileText, Database, Server, Code, Shield, Cpu, Zap, Copy, Check, Sparkles, Layers } from 'lucide-react';
import { SYSTEM_BLUEPRINT_DOC } from '../data/uspsAndBlueprint';
import { SEO_KEYWORD_GROUPS } from '../data/seoKeywords';

export const BlueprintModal: React.FC = () => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'api' | 'seo' | 'free_opt'>('overview');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Production Architecture Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Full-Stack Free MVP Production Blueprint
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Detailed technical blueprint including SQL Schema, Express REST API Spec, Gemini 3.6 Flash Integration Flow, SEO strategy, and ₹0/month Free Tier Cost Optimization.
          </p>
        </div>
      </div>

      {/* Blueprint Navigation Tabs */}
      <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'overview' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Executive Summary & Tech Stack
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'schema' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          SQL Database Schema
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'api' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          REST API Spec
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'seo' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          500+ SEO Keywords Strategy
        </button>
        <button
          onClick={() => setActiveTab('free_opt')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'free_opt' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Free Limit Optimization (₹0/mo)
        </button>
      </div>

      {/* Tab 1: Executive Summary & Tech Stack */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Executive Summary & Architecture Vision</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SYSTEM_BLUEPRINT_DOC.executiveSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <span className="font-bold text-amber-400 block">Frontend Stack</span>
                <p className="text-slate-300 font-mono text-[11px]">{SYSTEM_BLUEPRINT_DOC.techStack.frontend}</p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <span className="font-bold text-emerald-400 block">Backend & AI Layer</span>
                <p className="text-slate-300 font-mono text-[11px]">{SYSTEM_BLUEPRINT_DOC.techStack.backend} • {SYSTEM_BLUEPRINT_DOC.techStack.aiModel}</p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <span className="font-bold text-blue-400 block">Database & Storage</span>
                <p className="text-slate-300 font-mono text-[11px]">{SYSTEM_BLUEPRINT_DOC.techStack.database}</p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <span className="font-bold text-purple-400 block">Hosting & Infrastructure</span>
                <p className="text-slate-300 font-mono text-[11px]">{SYSTEM_BLUEPRINT_DOC.techStack.hosting}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SQL Database Schema */}
      {activeTab === 'schema' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">PostgreSQL / Supabase Database Schema</h3>
            </div>

            <button
              onClick={() => copyToClipboard(SYSTEM_BLUEPRINT_DOC.sqlSchema)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center space-x-1.5 hover:bg-emerald-500/30 transition-colors"
            >
              {copiedSql ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied SQL!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy SQL DDL</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed">
            {SYSTEM_BLUEPRINT_DOC.sqlSchema}
          </pre>
        </div>
      )}

      {/* Tab 3: REST API Spec */}
      {activeTab === 'api' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Server className="w-5 h-5 text-amber-400" />
            <span>Express REST API Architecture Endpoints</span>
          </h3>

          <div className="space-y-3">
            {SYSTEM_BLUEPRINT_DOC.apiEndpoints.map((ep, idx) => (
              <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-black ${
                    ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-sm font-bold text-white">{ep.path}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{ep.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: SEO Strategy */}
      {activeTab === 'seo' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Programmatic SEO & 500+ Keywords Strategy</span>
            </h3>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
              High organic search intent
            </span>
          </div>

          <div className="space-y-4">
            {SEO_KEYWORD_GROUPS.map((group, idx) => (
              <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-white">{group.title}</h4>
                  <span className="text-xs text-slate-400 font-mono">{group.targetPage}</span>
                </div>
                <p className="text-xs text-slate-300">{group.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {group.keywords.map((kw, i) => (
                    <span key={i} className="bg-slate-900 text-slate-300 text-[11px] px-2 py-1 rounded border border-slate-700">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Free Limit Optimization */}
      {activeTab === 'free_opt' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>₹0 / Month Free Tier Optimization Rules</span>
          </h3>

          <div className="space-y-3">
            {SYSTEM_BLUEPRINT_DOC.freeTierOptimization.map((rule, idx) => (
              <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs text-slate-200 font-medium leading-relaxed">
                {rule}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
