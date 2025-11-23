import React from 'react';
import { BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-1.5 rounded-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">SentimentAI</span>
      </div>
      <div className="text-sm text-slate-500 font-medium">
        Powered by Gemini 2.5
      </div>
    </header>
  );
};

export default Header;