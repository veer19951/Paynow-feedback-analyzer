import React, { useState } from 'react';
import { LoadingState } from '../types';
import { Loader2 } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (text: string) => void;
  loadingState: LoadingState;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, loadingState }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    onAnalyze(text);
  };

  const isLoading = loadingState === LoadingState.LOADING;

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-1">
      <div className="p-6 pb-2">
        <label htmlFor="feedback" className="block text-sm font-semibold text-slate-700 mb-3">
          Customer Feedback
        </label>
        <textarea
          id="feedback"
          className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-600 placeholder:text-slate-400 text-base"
          placeholder="Paste customer feedback here... (e.g., 'The product quality is great, but the shipping took way too long and customer service was unresponsive.')"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="px-6 py-4 flex justify-between items-center bg-white rounded-b-2xl">
        <span className="text-xs text-slate-400 font-medium">
          {text.length} characters
        </span>
        <button
          onClick={handleSubmit}
          disabled={text.trim().length === 0 || isLoading}
          className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2
            ${text.trim().length > 0 && !isLoading
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Feedback'
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;