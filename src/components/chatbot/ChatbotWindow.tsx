import { useRef, useEffect } from 'react';
import { useChatbot } from '@/context/ChatbotContext';
import { ChatbotMessage } from './ChatbotMessage';
import { ChatbotOptions } from './ChatbotOptions';
import { ChatbotResults } from './ChatbotResults';

export function ChatbotWindow() {
  const {
    conversationHistory,
    isComplete,
    matchedPlays,
    selectOption,
    resetConversation,
  } = useChatbot();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversationHistory, isComplete]);

  const lastBotMessage = [...conversationHistory]
    .reverse()
    .find((m) => m.sender === 'bot');
  const showOptions =
    !isComplete && lastBotMessage?.options && lastBotMessage.options.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-teatro-bg rounded-xl border border-teatro-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-teatro-border bg-teatro-surface/50">
        <div className="w-8 h-8 rounded-full bg-teatro-gold flex items-center justify-center">
          <span className="text-teatro-bg font-display font-bold text-sm">T</span>
        </div>
        <div>
          <h3 className="font-display font-bold text-sm text-teatro-text">
            Asistente Teatro
          </h3>
          <p className="text-xs text-teatro-muted">Te ayudo a encontrar tu obra ideal</p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth"
      >
        {conversationHistory.map((message) => (
          <ChatbotMessage key={message.id} message={message} />
        ))}

        {isComplete && matchedPlays !== undefined && (
          <ChatbotResults plays={matchedPlays} onReset={resetConversation} />
        )}
      </div>

      {/* Options footer */}
      {showOptions && (
        <div className="border-t border-teatro-border px-4 py-3 bg-teatro-surface/30">
          <ChatbotOptions
            options={lastBotMessage!.options!}
            onSelect={selectOption}
          />
        </div>
      )}
    </div>
  );
}
