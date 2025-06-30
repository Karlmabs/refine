import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const EVALUATION_PROMPT = `You are a prompt evaluation expert. Your job is to analyze user prompts and provide detailed feedback to help beginners improve their prompting skills.

Evaluate the given prompt on these 4 categories (score 1-10 each):
- Clarity: How specific and clear is the request?
- Context: Is there enough background information?
- Format: Is the desired output format clearly specified?
- Completeness: Are all necessary details included?

Provide your response in this exact JSON format:
{
  "overall_score": <calculated average * 10, rounded to nearest integer>,
  "scores": {
    "clarity": <1-10>,
    "context": <1-10>, 
    "format": <1-10>,
    "completeness": <1-10>
  },
  "what_is_missing": [
    "<specific improvement needed>",
    "<another specific improvement>"
  ],
  "improved_prompt": "<rewritten version of the prompt that addresses the issues>",
  "key_changes": [
    "<explanation of what was changed and why>",
    "<another explanation>"
  ]
}

Be specific and actionable in your feedback. Focus on helping beginners understand what makes a good prompt.`;

// Initialize Anthropic client
const anthropic = process.env.ANTHROPIC_API_KEY 
  ? new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if Claude API is configured
    if (!anthropic) {
      console.log('Claude API not configured, using mock data');
      // Return mock response when API key is not available
      const mockEvaluation = {
        overall_score: 35,
        scores: {
          clarity: 4,
          context: 2,
          format: 3,
          completeness: 4
        },
        what_is_missing: [
          "Specific details about your preferences and requirements",
          "Clear context about the purpose or goal",
          "Desired format for the response",
          "Timeline or constraints that should be considered"
        ],
        improved_prompt: `I'm planning a 7-day trip to Europe in September 2024 for my first time visiting. I'm interested in history, art, and local cuisine, with a budget of $3000 excluding flights. I prefer a mix of major cities and smaller towns, and I'd like to visit 2-3 countries maximum to avoid rushing.

Please provide:
1. A suggested itinerary with specific cities and number of days in each
2. Must-see historical sites and art museums
3. Local food experiences I shouldn't miss  
4. Budget breakdown for accommodation, food, and activities
5. Travel tips for first-time visitors to Europe

Please format your response with clear headings for each section.`,
        key_changes: [
          "Added specific timeframe (7 days in September 2024) and budget constraints ($3000)",
          "Included personal interests (history, art, cuisine) to enable personalized recommendations",
          "Specified travel style preferences (mix of cities and towns, 2-3 countries max)",
          "Requested specific deliverables with numbered list for clarity",
          "Added desired response format with clear headings for better organization"
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json(mockEvaluation);
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0.3,
      messages: [
        {
          role: 'user',
          content: `${EVALUATION_PROMPT}\n\nPrompt to evaluate: "${prompt}"`
        }
      ]
    });

    // Parse the response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    try {
      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      const evaluation = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!evaluation.overall_score || !evaluation.scores || !evaluation.what_is_missing || 
          !evaluation.improved_prompt || !evaluation.key_changes) {
        throw new Error('Invalid response structure');
      }

      return NextResponse.json(evaluation);
      
    } catch (parseError) {
      console.error('Failed to parse Claude response:', parseError);
      console.error('Raw response:', responseText);
      
      return NextResponse.json(
        { error: 'Failed to parse evaluation response' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Evaluation error:', error);
    
    // Handle rate limiting
    if (error instanceof Error && error.message.includes('rate_limit')) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a moment.' },
        { status: 429 }
      );
    }
    
    // Handle API errors
    if (error instanceof Error && error.message.includes('api_key')) {
      return NextResponse.json(
        { error: 'API configuration error. Please check your setup.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to evaluate prompt. Please try again.' },
      { status: 500 }
    );
  }
}