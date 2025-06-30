import { ExampleScenario } from '@/types';

export const exampleScenarios: ExampleScenario[] = [
  {
    id: 'trip-planning',
    title: 'Trip Planning',
    category: 'Travel',
    description: 'Help planning a vacation',
    bad_prompt: 'Plan my trip to Europe'
  },
  {
    id: 'email-writing',
    title: 'Email Writing',
    category: 'Communication',
    description: 'Professional email composition',
    bad_prompt: 'Write an email to my boss'
  },
  {
    id: 'learning-assistance',
    title: 'Learning Assistance',
    category: 'Education',
    description: 'Help with studying topics',
    bad_prompt: 'Explain machine learning'
  },
  {
    id: 'decision-making',
    title: 'Decision Making',
    category: 'Analysis',
    description: 'Making important choices',
    bad_prompt: 'Should I change jobs?'
  },
  {
    id: 'event-planning',
    title: 'Event Planning',
    category: 'Organization',
    description: 'Organizing events and gatherings',
    bad_prompt: 'Plan my birthday party'
  }
];