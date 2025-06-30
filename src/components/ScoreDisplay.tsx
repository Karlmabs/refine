import { PromptEvaluation } from "@/types";

interface ScoreDisplayProps {
  evaluation: PromptEvaluation;
}

function getScoreColor(score: number): string {
  if (score <= 40)
    return "text-red-600 bg-gradient-to-br from-red-50 to-red-100 border-red-200";
  if (score <= 70)
    return "text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200";
  return "text-green-600 bg-gradient-to-br from-green-50 to-green-100 border-green-200";
}

function getScoreLabel(score: number): string {
  if (score <= 40) return "Needs Work";
  if (score <= 70) return "Getting Better";
  return "Great!";
}

function getScoreIcon(score: number): string {
  if (score <= 40)
    return "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z";
  if (score <= 70)
    return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
  return "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
}

function getCategoryColor(score: number): string {
  if (score <= 4) return "bg-gradient-to-r from-red-500 to-red-600";
  if (score <= 7) return "bg-gradient-to-r from-orange-500 to-orange-600";
  return "bg-gradient-to-r from-green-500 to-green-600";
}

export default function ScoreDisplay({ evaluation }: ScoreDisplayProps) {
  const { overall_score, scores } = evaluation;
  const overallColorClass = getScoreColor(overall_score);
  const overallLabel = getScoreLabel(overall_score);
  const overallIcon = getScoreIcon(overall_score);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
        Evaluation Results
      </h2>

      {/* Overall Score */}
      <div className="text-center mb-10">
        <div
          className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-4 ${overallColorClass} mb-6 shadow-lg relative`}
        >
          <div className="absolute -top-2 -right-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg
                className="w-5 h-5 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={overallIcon}
                />
              </svg>
            </div>
          </div>
          <span className="text-3xl font-bold">{overall_score}</span>
        </div>
        <div className="space-y-2">
          <div className="text-xl font-semibold text-slate-800">
            {overallLabel}
          </div>
          <p className="text-slate-600 max-w-md mx-auto">
            {overall_score <= 40 &&
              "Your prompt needs significant improvement to be more effective."}
            {overall_score > 40 &&
              overall_score <= 70 &&
              "Your prompt is on the right track but could use some refinement."}
            {overall_score > 70 &&
              "Excellent! Your prompt is clear, specific, and well-structured."}
          </p>
        </div>
      </div>

      {/* Category Scores */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
          Score Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(scores).map(([category, score]) => (
            <div
              key={category}
              className="bg-slate-50/50 rounded-xl p-5 border border-slate-200/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getCategoryColor(
                      score
                    )}`}
                  ></div>
                  <span className="font-semibold text-slate-800 capitalize">
                    {category}
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-700">
                  {score}/10
                </span>
              </div>

              <div className="mb-3">
                <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                  <div
                    className={`h-3 rounded-full ${getCategoryColor(
                      score
                    )} shadow-sm transition-all duration-500 ease-out`}
                    style={{ width: `${(score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                {category === "clarity" &&
                  "How specific and clear is your request?"}
                {category === "context" &&
                  "Is there enough background information?"}
                {category === "format" &&
                  "Did you specify the desired output format?"}
                {category === "completeness" &&
                  "Are all necessary details included?"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
