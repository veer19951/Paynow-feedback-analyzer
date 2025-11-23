import React from 'react';
import { AnalysisResult } from '../types';
import { RefreshCcw, Smile, Meh, Frown, AlertTriangle, MessageSquareQuote } from 'lucide-react';

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const getSentimentConfig = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return { 
          bg: 'bg-emerald-100', 
          text: 'text-emerald-700', 
          icon: <Smile className="w-4 h-4" />,
          label: 'Positive'
        };
      case 'Negative':
        return { 
          bg: 'bg-rose-100', 
          text: 'text-rose-700', 
          icon: <Frown className="w-4 h-4" />,
          label: 'Negative'
        };
      default:
        return { 
          bg: 'bg-slate-100', 
          text: 'text-slate-700', 
          icon: <Meh className="w-4 h-4" />,
          label: 'Neutral'
        };
    }
  };

  const sentimentConfig = getSentimentConfig(result.sentiment);

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="p-8 border-b border-slate-50 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Analysis Results</h2>
          <p className="text-sm text-slate-500 mt-1">Insights extracted from customer feedback</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${sentimentConfig.bg} ${sentimentConfig.text} font-medium text-sm`}>
          {sentimentConfig.icon}
          <span>{sentimentConfig.label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-8 pt-6 relative">
        {/* Vertical Line Connector */}
        <div className="absolute left-[43px] top-[40px] bottom-[40px] w-0.5 bg-slate-100 rounded-full" />

        <div className="space-y-8">
          {/* Pain Point Item */}
          <div className="relative pl-10">
            <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-white z-10" />
            <div className="flex items-center gap-2 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Pain Point</span>
            </div>
            <p className="text-slate-800 font-medium">
              {result.painPoint}
            </p>
          </div>

          {/* Highlight Item */}
          <div className="relative pl-10">
            <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white z-10" />
            <div className="flex items-center gap-2 mb-1.5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Positive Highlight</span>
            </div>
            <p className="text-slate-800 font-medium italic">
              {result.highlight.includes('"') ? result.highlight : `"${result.highlight}"`}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-8 py-4 flex justify-end border-t border-slate-100">
        <button 
          onClick={onReset}
          className="text-slate-500 hover:text-slate-700 text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          Analyze Another
        </button>
      </div>
    </div>
  );
};

export default ResultCard;