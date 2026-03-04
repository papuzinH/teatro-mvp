import type { Lottery, Play } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface LotteryCardProps {
  lottery: Lottery;
  play: Play | undefined;
  isSignedUp: boolean;
  onSignUp: (lotteryId: string) => void;
}

export default function LotteryCard({ lottery, play, isSignedUp, onSignUp }: LotteryCardProps) {
  const drawDate = new Date(lottery.drawDate).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Card>
      <div className="flex gap-4">
        {/* Play thumbnail */}
        {play && (
          <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0">
            <img
              src={play.imageUrl}
              alt={play.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-display font-semibold text-teatro-text-primary leading-tight">
              {lottery.title}
            </h3>
            {lottery.isOpen && (
              <Badge className="bg-green-900/60 text-green-300 shrink-0">Abierto</Badge>
            )}
          </div>

          <p className="text-xs font-body text-teatro-text-muted leading-relaxed">
            {lottery.description}
          </p>

          <div className="flex items-center gap-3 text-xs font-body text-teatro-text-muted">
            <span className="flex items-center gap-1">
              {/* Calendar icon */}
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
              Sorteo: {drawDate}
            </span>
            <span className="flex items-center gap-1">
              {/* Ticket icon */}
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
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
              {lottery.ticketCount} entrada{lottery.ticketCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="mt-3">
        <Button
          size="sm"
          variant={isSignedUp ? 'secondary' : 'primary'}
          disabled={isSignedUp || !lottery.isOpen}
          onClick={() => onSignUp(lottery.id)}
          className="w-full"
        >
          {isSignedUp ? 'Inscripto' : 'Inscribirme'}
        </Button>
      </div>
    </Card>
  );
}
