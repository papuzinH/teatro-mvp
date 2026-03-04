import { Link } from 'react-router-dom';
import { Notification, NotificationType } from '@/types';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import { formatRelativeTime, formatDate } from '@/lib/formatters';

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

function TypeIcon({ type }: { type: NotificationType }) {
  const iconClass = 'w-5 h-5 shrink-0';

  switch (type) {
    case 'descuento':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      );
    case 'ultimo_momento':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'recordatorio':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'sistema':
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
  }
}

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const isUnread = !notification.isRead;

  const handleClick = () => {
    if (isUnread) {
      onMarkRead(notification.id);
    }
  };

  const content = (
    <Card
      className={`cursor-pointer transition-colors duration-200 ${
        isUnread
          ? 'border-l-4 border-l-teatro-gold bg-teatro-surface/80 hover:bg-teatro-surface'
          : 'opacity-70 hover:opacity-90'
      }`}
      onClick={handleClick}
    >
      <div className="flex gap-3 p-4">
        <div className={`mt-0.5 ${isUnread ? 'text-teatro-gold' : 'text-teatro-muted'}`}>
          <TypeIcon type={notification.type} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm ${isUnread ? 'font-bold text-teatro-text' : 'font-medium text-teatro-muted'}`}>
            {notification.title}
          </h4>
          <p className={`text-sm mt-1 ${isUnread ? 'text-teatro-secondary' : 'text-teatro-muted'}`}>
            {notification.message}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs text-teatro-muted">
              {formatRelativeTime(notification.createdAt)}
            </span>
            {notification.expiresAt && (
              <Tag>
                Vence: {formatDate(notification.expiresAt)}
              </Tag>
            )}
          </div>
        </div>
        {isUnread && (
          <div className="w-2 h-2 rounded-full bg-teatro-gold mt-2 shrink-0" />
        )}
      </div>
    </Card>
  );

  if (notification.playId) {
    return (
      <Link to={`/play/${notification.playId}`} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}
