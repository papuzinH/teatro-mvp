import type { DayOfWeek, Zone, Genre, TargetAudience, Circuit } from './play';

export interface ChatbotOption {
  label: string;
  value: string;
  nextNodeId: string;
}

export interface ChatbotNode {
  id: string;
  type: 'question' | 'results' | 'greeting' | 'farewell';
  message: string;
  filterKey?: keyof ChatbotFilters;
  options?: ChatbotOption[];
}

export interface ChatbotFilters {
  days?: DayOfWeek[];
  priceRange?: { min: number; max: number };
  zone?: Zone[];
  genre?: Genre[];
  targetAudience?: TargetAudience;
  circuit?: Circuit;
  timePreference?: 'matinee' | 'tarde' | 'noche';
}

export interface ChatbotConversationMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: ChatbotOption[];
  timestamp: number;
}
