"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ScoreDisplay from "@/components/ScoreDisplay";
import FeedbackSection from "@/components/FeedbackSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import { EvaluationState } from "@/types";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const handleSubmit = async () => {
    setEvaluation({ isLoading: true, error: null, result: null });

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate prompt");
      }

      const result = await response.json();
      setEvaluation({ isLoading: false, error: null, result });
    } catch (error) {
      setEvaluation({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
        result: null,
      });
    }
  };

  const handleTryAgain = () => {
    setEvaluation({ isLoading: false, error: null, result: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                Improve Your Prompts with AI Feedback
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Enter a prompt below and get instant feedback on how to make it
                more effective. Perfect for beginners learning to communicate
                with AI tools like ChatGPT and Claude.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  Instant Analysis
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  Detailed Feedback
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  Beginner Friendly
                </span>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            isLoading={evaluation.isLoading}
          />

          {/* Results Section */}
          {evaluation.isLoading && <LoadingSpinner />}

          {evaluation.error && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200/50 p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-900 mb-2">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-red-700 mb-6">{evaluation.error}</p>
                </div>
                <button
                  onClick={handleTryAgain}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {evaluation.result && (
            <div className="space-y-10">
              <ScoreDisplay evaluation={evaluation.result} />
              <FeedbackSection
                evaluation={evaluation.result}
                originalPrompt={prompt}
              />

              {/* Try Another Section */}
              <div className="text-center">
                <button
                  onClick={handleTryAgain}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Evaluate Another Prompt
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200/50 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-slate-800">Refine</span>
            </div>
            <p className="text-slate-600">
              © 2024 Refine. Built to help you master the art of prompting.
            </p>
            <div className="flex justify-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-700 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
