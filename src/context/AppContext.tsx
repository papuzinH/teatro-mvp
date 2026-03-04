import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Play, User, NewsArticle, Notification, Lottery, TicketPack, Banner, Collection, UserLevel } from '../types';
import {
  mockPlays,
  mockCurrentUser,
  mockNews,
  mockNotifications,
  mockLotteries,
  mockTicketPacks,
  mockBanners,
  mockCollections,
  mockUserLevels,
} from '../data/mockData';

interface AppState {
  currentUser: User;
  plays: Play[];
  collections: Collection[];
  banners: Banner[];
  news: NewsArticle[];
  notifications: Notification[];
  lotteries: Lottery[];
  ticketPacks: TicketPack[];
  userLevels: UserLevel[];
}

type AppAction =
  | { type: 'TOGGLE_FAVORITE'; playId: string }
  | { type: 'MARK_NOTIFICATION_READ'; notificationId: string }
  | { type: 'SIGNUP_LOTTERY'; lotteryId: string }
  | { type: 'JOIN_PACK'; packId: string }
  | { type: 'COMPLETE_ONBOARDING'; selectedPlayIds: string[] }
  | { type: 'ADD_POINTS'; amount: number }
  | { type: 'HYDRATE_USER'; user: Partial<User> };

interface AppContextValue extends AppState {
  dispatch: React.Dispatch<AppAction>;
  toggleFavorite: (playId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  signUpForLottery: (lotteryId: string) => void;
  joinPack: (packId: string) => void;
  completeOnboarding: (selectedPlayIds: string[]) => void;
  addPoints: (amount: number) => void;
}

function calculateLevel(points: number, levels: UserLevel[]): User['level'] {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].minPoints) {
      return levels[i].name;
    }
  }
  return levels[0].name;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const isFav = state.currentUser.favoritePlayIds.includes(action.playId);
      const favoritePlayIds = isFav
        ? state.currentUser.favoritePlayIds.filter((id) => id !== action.playId)
        : [...state.currentUser.favoritePlayIds, action.playId];
      return {
        ...state,
        currentUser: { ...state.currentUser, favoritePlayIds },
      };
    }
    case 'MARK_NOTIFICATION_READ': {
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.notificationId ? { ...n, isRead: true } : n
        ),
      };
    }
    case 'SIGNUP_LOTTERY': {
      if (state.currentUser.lotterySignups.includes(action.lotteryId)) return state;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          lotterySignups: [...state.currentUser.lotterySignups, action.lotteryId],
        },
      };
    }
    case 'JOIN_PACK': {
      if (state.currentUser.joinedPackIds.includes(action.packId)) return state;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          joinedPackIds: [...state.currentUser.joinedPackIds, action.packId],
        },
        ticketPacks: state.ticketPacks.map((p) =>
          p.id === action.packId
            ? { ...p, currentParticipants: p.currentParticipants + 1 }
            : p
        ),
      };
    }
    case 'COMPLETE_ONBOARDING': {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          onboardingCompleted: true,
          quizAnswers: action.selectedPlayIds,
          seenPlayIds: [
            ...new Set([...state.currentUser.seenPlayIds, ...action.selectedPlayIds]),
          ],
        },
      };
    }
    case 'ADD_POINTS': {
      const newPoints = state.currentUser.points + action.amount;
      const newLevel = calculateLevel(newPoints, state.userLevels);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          points: newPoints,
          level: newLevel,
        },
      };
    }
    case 'HYDRATE_USER': {
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.user },
      };
    }
    default:
      return state;
  }
}

const STORAGE_KEY = 'teatro-user-state';

function loadUserOverrides(): Partial<User> | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Partial<User>;
  } catch {
    // ignore
  }
  return null;
}

function saveUserOverrides(user: User) {
  try {
    const toSave: Partial<User> = {
      points: user.points,
      level: user.level,
      favoritePlayIds: user.favoritePlayIds,
      seenPlayIds: user.seenPlayIds,
      onboardingCompleted: user.onboardingCompleted,
      quizAnswers: user.quizAnswers,
      joinedPackIds: user.joinedPackIds,
      lotterySignups: user.lotterySignups,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // ignore
  }
}

const initialState: AppState = {
  currentUser: mockCurrentUser,
  plays: mockPlays,
  collections: mockCollections,
  banners: mockBanners,
  news: mockNews,
  notifications: mockNotifications,
  lotteries: mockLotteries,
  ticketPacks: mockTicketPacks,
  userLevels: mockUserLevels,
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const overrides = loadUserOverrides();
  const hydratedState: AppState = overrides
    ? { ...initialState, currentUser: { ...initialState.currentUser, ...overrides } }
    : initialState;

  const [state, dispatch] = useReducer(appReducer, hydratedState);

  useEffect(() => {
    saveUserOverrides(state.currentUser);
  }, [state.currentUser]);

  const value: AppContextValue = {
    ...state,
    dispatch,
    toggleFavorite: (playId) => dispatch({ type: 'TOGGLE_FAVORITE', playId }),
    markNotificationRead: (notificationId) =>
      dispatch({ type: 'MARK_NOTIFICATION_READ', notificationId }),
    signUpForLottery: (lotteryId) => dispatch({ type: 'SIGNUP_LOTTERY', lotteryId }),
    joinPack: (packId) => dispatch({ type: 'JOIN_PACK', packId }),
    completeOnboarding: (selectedPlayIds) =>
      dispatch({ type: 'COMPLETE_ONBOARDING', selectedPlayIds }),
    addPoints: (amount) => dispatch({ type: 'ADD_POINTS', amount }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
