import type { TicketPack, Play } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface TicketPackCardProps {
  pack: TicketPack;
  play: Play | undefined;
  isJoined: boolean;
  onJoin: (packId: string) => void;
  onOpenChat: (packId: string) => void;
}

export default function TicketPackCard({ pack, play, isJoined, onJoin, onOpenChat }: TicketPackCardProps) {
  const scheduledDate = new Date(pack.scheduledDate).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
  });

  const spotsLeft = pack.maxParticipants - pack.currentParticipants;
  const isFull = spotsLeft <= 0;

  return (
    <Card>
      <div className="space-y-3">
        {/* Header: pack name + discount badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-display font-semibold text-teatro-text-primary leading-tight">
              {pack.name}
            </h3>
            {play && (
              <p className="text-xs font-body text-teatro-text-muted mt-0.5">
                {play.title} &middot; {play.theater}
              </p>
            )}
          </div>
          <Badge className="bg-teatro-gold/90 text-teatro-bg shrink-0">
            -{pack.discountPercent}%
          </Badge>
        </div>

        {/* Description */}
        <p className="text-xs font-body text-teatro-text-muted leading-relaxed">
          {pack.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs font-body text-teatro-text-muted">
          {/* Date */}
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {scheduledDate}
          </span>

          {/* Participants */}
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {pack.currentParticipants}/{pack.maxParticipants}
          </span>

          {/* Spots left */}
          {!isFull && (
            <span className="text-teatro-gold font-medium">
              {spotsLeft} lugar{spotsLeft !== 1 ? 'es' : ''}
            </span>
          )}
          {isFull && (
            <span className="text-teatro-text-muted font-medium">Completo</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {isJoined ? (
            <Button size="sm" variant="secondary" className="flex-1" onClick={() => onOpenChat(pack.id)}>
              Ir al chat
            </Button>
          ) : (
            <Button
              size="sm"
              className="flex-1"
              disabled={isFull}
              onClick={() => onJoin(pack.id)}
            >
              Unirme al pack
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
