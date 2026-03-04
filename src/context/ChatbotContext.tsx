import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  ChatbotConversationMessage,
  ChatbotFilters,
  ChatbotOption,
  ChatbotNode,
  Play,
} from '@/types';
import { walkTree, filterPlays } from '@/lib/chatbotEngine';
import { mockChatbotNodes } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

interface ChatbotState {
  conversationHistory: ChatbotConversationMessage[];
  currentNodeId: string;
  appliedFilters: ChatbotFilters;
  matchedPlays: Play[];
  isComplete: boolean;
}

interface ChatbotContextValue extends ChatbotState {
  selectOption: (option: ChatbotOption) => void;
  resetConversation: () => void;
  currentNode: ChatbotNode | undefined;
}

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

function getNode(nodeId: string): ChatbotNode | undefined {
  return mockChatbotNodes.find((n) => n.id === nodeId);
}

function buildInitialState(): ChatbotState {
  const greetingNode = getNode('greeting');
  const initialMessages: ChatbotConversationMessage[] = [];

  if (greetingNode) {
    initialMessages.push({
      id: crypto.randomUUID ? crypto.randomUUID() : `bot-${Date.now()}`,
      sender: 'bot',
      text: greetingNode.message,
      options: greetingNode.options,
      timestamp: Date.now(),
    });
  }

  return {
    conversationHistory: initialMessages,
    currentNodeId: 'greeting',
    appliedFilters: {},
    matchedPlays: [],
    isComplete: false as boolean,
  };
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const { plays } = useApp();
  const [state, setState] = useState<ChatbotState>(buildInitialState);

  const selectOption = useCallback(
    (option: ChatbotOption) => {
      setState((prev) => {
        if (prev.isComplete) return prev;

        const userMessage: ChatbotConversationMessage = {
          id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
          sender: 'user',
          text: option.label,
          timestamp: Date.now(),
        };

        const { nextNode, updatedFilters } = walkTree(
          prev.currentNodeId,
          option,
          prev.appliedFilters,
          mockChatbotNodes
        );

        const newHistory = [...prev.conversationHistory, userMessage];
        let matchedPlays = prev.matchedPlays;
        let isComplete: boolean = prev.isComplete;

        if (nextNode) {
          const botMessage: ChatbotConversationMessage = {
            id: crypto.randomUUID
              ? crypto.randomUUID()
              : `bot-${Date.now()}-${Math.random()}`,
            sender: 'bot',
            text: nextNode.message,
            options: nextNode.options,
            timestamp: Date.now(),
          };
          newHistory.push(botMessage);

          if (nextNode.type === 'results') {
            matchedPlays = filterPlays(updatedFilters, plays);
            isComplete = true;
          } else if (nextNode.type === 'farewell') {
            isComplete = true;
          }
        }

        return {
          conversationHistory: newHistory,
          currentNodeId: nextNode?.id ?? prev.currentNodeId,
          appliedFilters: updatedFilters,
          matchedPlays,
          isComplete,
        };
      });
    },
    [plays]
  );

  const resetConversation = useCallback(() => {
    setState(buildInitialState());
  }, []);

  const currentNode = getNode(state.currentNodeId);

  return (
    <ChatbotContext.Provider
      value={{
        ...state,
        selectOption,
        resetConversation,
        currentNode,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot(): ChatbotContextValue {
  const ctx = useContext(ChatbotContext);
  if (!ctx) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return ctx;
}
