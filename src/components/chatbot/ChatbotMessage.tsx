import { ChatbotConversationMessage } from '@/types';

interface ChatbotMessageProps {
  message: ChatbotConversationMessage;
}

function BotAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-teatro-gold flex items-center justify-center shrink-0">
      <span className="text-teatro-bg font-display font-bold text-sm">T</span>
    </div>
  );
}

export function ChatbotMessage({ message }: ChatbotMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && <BotAvatar />}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? 'bg-teatro-surface text-teatro-text rounded-tl-sm'
            : 'bg-teatro-burgundy text-white rounded-tr-sm'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
