export type NotificationType = 'descuento' | 'ultimo_momento' | 'recordatorio' | 'sistema';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  playId?: string;
  createdAt: string;
  isRead: boolean;
  expiresAt?: string;
}
