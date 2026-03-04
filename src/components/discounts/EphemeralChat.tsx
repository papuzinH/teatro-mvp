import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, TicketPack } from '@/types';
import ChatBubble from '@/components/ui/ChatBubble';
import Button from '@/components/ui/Button';

interface EphemeralChatProps {
  pack: TicketPack;
  currentUserName: string;
  currentUserAvatar: string;
}

export default function EphemeralChat({ pack, currentUserName, currentUserAvatar }: EphemeralChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(pack.messages);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;

    const newMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      senderName: currentUserName,
      senderAvatar: currentUserAvatar,
      text,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="flex flex-col h-[500px] bg-teatro-bg rounded-xl border border-teatro-surface-light overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-teatro-surface-light bg-teatro-surface">
        <h3 className="text-sm font-display font-semibold text-teatro-text-primary">
          {pack.name}
        </h3>
        <p className="text-xs font-body text-teatro-text-muted">
          {pack.currentParticipants} participantes
        </p>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            senderName={msg.senderName}
            senderAvatar={msg.senderAvatar}
            text={msg.text}
            timestamp={formatTimestamp(msg.timestamp)}
            isOwn={msg.isCurrentUser}
          />
        ))}

        {messages.length === 0 && (
          <p className="text-center text-sm font-body text-teatro-text-muted py-8">
            Se el primero en enviar un mensaje.
          </p>
        )}
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-t border-teatro-surface-light bg-teatro-surface">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribi un mensaje..."
            className="flex-1 bg-teatro-bg border border-teatro-surface-light rounded-lg px-3 py-2 text-sm font-body text-teatro-text-primary placeholder:text-teatro-text-muted focus:outline-none focus:border-teatro-gold/50 transition-colors"
          />
          <Button size="sm" onClick={handleSend} disabled={!inputValue.trim()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
