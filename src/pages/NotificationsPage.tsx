import { useApp } from '@/context/AppContext';
import NotificationList from '@/components/notifications/NotificationList';

export default function NotificationsPage() {
  const { notifications } = useApp();

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-display text-2xl font-bold text-teatro-text-primary">
        Notificaciones
      </h1>

      <NotificationList notifications={notifications} />
    </div>
  );
}
