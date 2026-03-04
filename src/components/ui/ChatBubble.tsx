import Avatar from './Avatar';

interface ChatBubbleProps {
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isOwn?: boolean;
  className?: string;
}

export default function ChatBubble({
  senderName,
  senderAvatar,
  text,
  timestamp,
  isOwn = false,
  className = '',
}: ChatBubbleProps) {
  return (
    <div
      className={`flex gap-2 max-w-[85%] ${isOwn ? 'ml-auto flex-row-reverse' : 'mr-auto'} ${className}`}
    >
      {/* Avatar */}
      <Avatar src={senderAvatar} name={senderName} size="sm" className="shrink-0 mt-1" />

      {/* Bubble */}
      <div>
        {/* Sender name */}
        {!isOwn && (
          <p className="text-xs text-teatro-text-muted font-body mb-1">{senderName}</p>
        )}

        {/* Message body */}
        <div
          className={`px-3.5 py-2.5 rounded-2xl font-body text-sm leading-relaxed ${
            isOwn
              ? 'bg-teatro-burgundy text-teatro-text-primary rounded-br-md'
              : 'bg-teatro-surface text-teatro-text-primary rounded-bl-md'
          }`}
        >
          {text}
        </div>

        {/* Timestamp */}
        <p
          className={`text-[10px] text-teatro-text-muted mt-1 ${isOwn ? 'text-right' : 'text-left'}`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
}
