export type UserLevelName = 'Espectador' | 'Entusiasta' | 'Critico' | 'Director' | 'Leyenda';

export interface UserLevel {
  name: UserLevelName;
  minPoints: number;
  maxPoints: number;
  icon: string;
}

export interface Subscription {
  isActive: boolean;
  plan: 'mensual' | 'anual' | null;
  expiresAt: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  points: number;
  level: UserLevelName;
  subscription: Subscription;
  favoritePlayIds: string[];
  seenPlayIds: string[];
  onboardingCompleted: boolean;
  quizAnswers: string[];
  quizFavoritePlayIds: string[];
  joinedPackIds: string[];
  lotterySignups: string[];
  bio?: string;
  age?: number;
  neighborhood?: string;
  favoriteGenres?: string[];
  theaterFrequency?: string;
  companions?: string;
  instagram?: string;
}

export interface PointAction {
  id: string;
  action: string;
  label: string;
  points: number;
  description: string;
  icon: string;
}
