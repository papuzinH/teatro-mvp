export interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
}

export interface TicketPack {
  id: string;
  playId: string;
  name: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  scheduledDate: string;
  discountPercent: number;
  messages: ChatMessage[];
}

export interface Lottery {
  id: string;
  playId: string;
  title: string;
  description: string;
  drawDate: string;
  ticketCount: number;
  isOpen: boolean;
}
