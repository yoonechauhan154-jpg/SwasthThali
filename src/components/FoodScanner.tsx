import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, RefreshCw, AlertCircle, CheckCircle2, Lightbulb, ChefHat, HelpCircle } from 'lucide-react';
import { GeminiDetectionResponse, MealLogEntry } from '../types';
import { MealCalculatorCard } from './MealCalculatorCard';

interface FoodScannerProps {
  onSaveMealLog: (entry: MealLogEntry) => void;
}

export const FoodScanner: React.FC<FoodScannerProps> = ({ onSaveMealLog }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<GeminiDetectionResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample presets for quick testing
  const samplePresets = [
    {
      id: 'thali',
      name: 'North Indian Thali',
      img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
      tag: 'Dal, Paneer, Roti, Rice, Curd'
    },
    {
      id: 'chole_bhature',
      name: 'Chole Bhature',
      img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
      tag: 'Amritsari Bhatura & Chole'
    },
    {
      id: 'dosa',
      name: 'Masala Dosa',
      img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
      tag: 'Dosa, Sambar, Chutney'
    }
  ];

  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawBase64 = event.target?.result as string;
        const compressed = await compressImage(rawBase64);
        setSelectedImage(compressed);
        analyzePhoto(compressed, null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = async (base64Img: string | null, sampleId: string | null) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/detect-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Img,
          sampleDishId: sampleId
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setAnalysisResult(resData.data);
      } else {
        setErrorMsg('AI detection unavailable, please search manually via the Food Engine tab.');
      }
    } catch (err: any) {
      setErrorMsg('AI detection unavailable, please search manually via the Food Engine tab.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleClick = (sample: typeof samplePresets[0]) => {
    setSelectedImage(sample.img);
    analyzePhoto(null, sample.id);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by Gemini 3.6 Flash AI Vision</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Indian Food Photo AI Calorie Counter
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Snap a photo of your Thali, Curry, Roti, or Street Food. Gemini 3.6 Flash deconstructs every dish into individual items, while our Indian Nutrition Engine calculates calories, protein, carbs, fat, oil, and ghee.
          </p>
        </div>
      </div>

      {/* Upload Zone & Presets */}
      {!analysisResult && !isAnalyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Photo Dropzone */}
          <div className="lg:col-span-2 bg-slate-900 border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Upload or Snap Indian Food Photo
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              Supports full Thali plates, Single Bowls, Street Snacks, Sweets, and Homemade meals.
            </p>

            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-500/20 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Choose Image File</span>
            </button>
          </div>

          {/* Quick Sample Presets */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Try Demo Dishes</h3>
            </div>
            <p className="text-xs text-slate-400">
              Don't have a photo ready? Test Gemini AI detection with instant sample Indian meals:
            </p>

            <div className="space-y-3">
              {samplePresets.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleClick(sample)}
                  className="w-full flex items-center space-x-3 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-amber-500/40 group"
                >
                  <img
                    src={sample.img}
                    alt={sample.name}
                    className="w-14 h-14 rounded-lg object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-bold text-sm text-white block group-hover:text-amber-300">
                      {sample.name}
                    </span>
                    <span className="text-[11px] text-slate-400">{sample.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analyzing Loading Pulse State */}
      {isAnalyzing && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Analyzing Indian Food with Gemini 3.6 Flash AI...</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Deconstructing Thali items, identifying curry gravies, estimating bowl volumes, and mapping to Indian food database...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl flex items-center space-x-3 text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span>{errorMsg}</span>
          <button
            onClick={() => setErrorMsg(null)}
            className="ml-auto text-xs underline font-semibold text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* Detection Results & Interactive Recalculator */}
      {analysisResult && (
        <div className="space-y-6">
          
          {/* Gemini AI Summary Box */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                  Gemini 3.6 Flash Detection Output
                </span>
                <h2 className="text-xl font-black text-white mt-0.5">{analysisResult.thaliName}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                  {analysisResult.regionalContext}
                </span>
                <button
                  onClick={() => setAnalysisResult(null)}
                  className="text-xs text-slate-400 hover:text-white underline flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan Another</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {analysisResult.overallDescription}
            </p>

            {/* AI Reasoning & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                <span className="font-bold text-amber-400 block mb-1 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Computer Vision Reasoning</span>
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{analysisResult.reasoning}</p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                <span className="font-bold text-emerald-400 block mb-1 flex items-center space-x-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Smart Healthy Swaps</span>
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                  {analysisResult.healthyTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Sliders & Recalculation Engine */}
          <MealCalculatorCard
            initialItems={analysisResult.items}
            thaliTitle={analysisResult.thaliName}
            onSaveToLog={onSaveMealLog}
            onResetScanner={() => setAnalysisResult(null)}
          />
        </div>
      )}
    </div>
  );
};
