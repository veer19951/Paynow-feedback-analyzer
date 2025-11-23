import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';
import { AnalysisResult, LoadingState } from './types';
import { analyzeFeedback } from './services/geminiService';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (text: string) => {
    setLoadingState(LoadingState.LOADING);
    try {
      const data = await analyzeFeedback(text);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
      // In a real app, you would show an error toast here
      alert("Failed to analyze feedback. Please try again.");
    }
  };

  const handleReset = () => {
    setResult(null);
    setLoadingState(LoadingState.IDLE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-grow flex flex-col items-center pt-20 px-4 pb-12">
        <div className="w-full max-w-3xl space-y-10">
          
          {/* Hero Text */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-tight">
              Turn Customer Feedback into<br />
              <span className="text-indigo-600">Actionable Insights</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Paste your reviews, emails, or survey responses below. Our AI will identify the sentiment, pinpoint the main problem, and highlight what's working.
            </p>
          </div>

          {/* Main Card Area */}
          <div className="w-full max-w-2xl mx-auto transition-all duration-500 ease-in-out">
            {result ? (
              <ResultCard result={result} onReset={handleReset} />
            ) : (
              <InputSection onAnalyze={handleAnalyze} loadingState={loadingState} />
            )}
          </div>

        </div>
      </main>

      <footer className="py-8 text-center text-sm text-slate-400">
        © 2025 SentimentAI. Built with Gemini 2.5 Flash.
      </footer>
    </div>
  );
};

export default App;