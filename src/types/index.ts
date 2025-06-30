export interface PromptEvaluation {
  overall_score: number;
  scores: {
    clarity: number;
    context: number;
    format: number;
    completeness: number;
  };
  what_is_missing: string[];
  improved_prompt: string;
  key_changes: string[];
}

export interface ExampleScenario {
  id: string;
  title: string;
  category: string;
  bad_prompt: string;
  description: string;
}

export interface EvaluationState {
  isLoading: boolean;
  error: string | null;
  result: PromptEvaluation | null;
}