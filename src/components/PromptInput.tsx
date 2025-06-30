"use client";

import { useState } from "react";
import { exampleScenarios } from "@/lib/examples";
import { ExampleScenario } from "@/types";

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function PromptInput({
  prompt,
  setPrompt,
  onSubmit,
  isLoading,
}: PromptInputProps) {
  const [showExamples, setShowExamples] = useState(false);

  const handleExampleClick = (scenario: ExampleScenario) => {
    setPrompt(scenario.bad_prompt);
    setShowExamples(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="prompt"
            className="block text-lg font-semibold text-slate-800 mb-3"
          >
            Enter your prompt for evaluation
          </label>
          <div className="relative">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full min-h-[140px] p-5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-700 placeholder-slate-400 transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Type your prompt here... For example: 'Write me a blog post about AI'"
              disabled={isLoading}
            />
            {prompt && (
              <div className="absolute top-3 right-3">
                <div className="bg-slate-100 rounded-full px-2 py-1">
                  <span className="text-xs text-slate-600 font-medium">
                    {prompt.length}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-slate-500 font-medium">
              {prompt.length} characters
            </span>
            <button
              type="button"
              onClick={() => setShowExamples(!showExamples)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium underline decoration-2 underline-offset-2 transition-colors"
            >
              {showExamples ? "Hide examples" : "Try an example"}
            </button>
          </div>
        </div>

        {showExamples && (
          <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50/50 backdrop-blur-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-4">
              Choose an example scenario:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {exampleScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleExampleClick(scenario)}
                  className="text-left p-4 bg-white border-2 border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <div className="font-semibold text-sm text-slate-900 mb-1">
                    {scenario.title}
                  </div>
                  <div className="text-xs text-slate-600">
                    {scenario.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
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
                Evaluating...
              </>
            ) : (
              <>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Evaluate My Prompt
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
