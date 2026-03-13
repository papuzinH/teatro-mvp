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
  scheduledTime: string;
  discountPercent: number;
  pricePerTicket: number;
  messages: ChatMessage[];
}

export interface Lottery {
  id: string;
  playId: string;
  title: string;
  description: string;
  drawDate: string;
  drawTime: string;
  closesAt: string;
  ticketCount: number;
  maxTicketsPerPerson: number;
  isOpen: boolean;
}
