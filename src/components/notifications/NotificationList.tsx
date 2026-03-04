import { Notification } from '@/types';
import { useApp } from '@/context/AppContext';
import { NotificationItem } from './NotificationItem';
import EmptyState from '@/components/ui/EmptyState';

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: NotificationListProps) {
  const { markNotificationRead } = useApp();

  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sorted.length === 0) {
    return (
      <EmptyState
        icon="🔔"
        title="No tenes notificaciones"
        message="Cuando haya novedades, descuentos o recordatorios, van a aparecer aca."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkRead={markNotificationRead}
        />
      ))}
    </div>
  );
}
