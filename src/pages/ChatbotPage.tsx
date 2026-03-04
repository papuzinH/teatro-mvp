import { ChatbotProvider } from '@/context/ChatbotContext';
import { ChatbotWindow } from '@/components/chatbot/ChatbotWindow';

export default function ChatbotPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="font-display text-2xl font-bold text-teatro-text-primary">
        Recomendador
      </h1>

      <ChatbotProvider>
        <ChatbotWindow />
      </ChatbotProvider>
    </div>
  );
}
