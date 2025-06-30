export default function Header() {
  return (
    <header className="bg-white/70 backdrop-blur-md shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Refine
            </h1>
          </div>
          <p className="text-xl text-slate-600 font-medium">
            Learn to write better prompts with AI-powered feedback
          </p>
        </div>
      </div>
    </header>
  );
}
