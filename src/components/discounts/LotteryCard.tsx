import type { Lottery, Play } from '@/types';
import CountdownTimer from './CountdownTimer';

interface LotteryCardProps {
  lottery: Lottery;
  play: Play | undefined;
  isSignedUp: boolean;
  onSignUp: () => void;
}

export default function LotteryCard({ lottery, play, isSignedUp, onSignUp }: LotteryCardProps) {
  const drawDate = new Date(lottery.drawDate + 'T12:00:00').toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-teatro-surface border border-purple-500/20">
      {/* Header */}
      <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎲</span>
          <span className="font-display text-sm font-bold text-purple-300 uppercase tracking-wide">
            Sorteo
          </span>
        </div>
        {lottery.isOpen && (
          <span className="text-xs font-body bg-green-900/60 text-green-300 px-2 py-0.5 rounded-full">
            Abierto
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* Play info row */}
        <div className="flex gap-3">
          {play && (
            <div className="w-14 h-20 rounded-lg overflow-hidden shrink-0">
              <img src={play.imageUrl} alt={play.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm font-semibold text-teatro-text-primary leading-tight">
              {lottery.title}
            </h3>
            <p className="text-xs font-body text-teatro-text-muted mt-1 leading-relaxed line-clamp-2">
              {lottery.description}
            </p>
          </div>
        </div>

        {/* Countdown + details */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-teatro-bg/50 rounded-xl p-2.5 space-y-1">
            <p className="font-body text-[10px] text-teatro-text-muted uppercase tracking-wider">Sorteo en</p>
            <CountdownTimer targetDate={lottery.drawDate} targetTime={lottery.drawTime} />
          </div>
          <div className="bg-teatro-bg/50 rounded-xl p-2.5 space-y-1">
            <p className="font-body text-[10px] text-teatro-text-muted uppercase tracking-wider">Detalles</p>
            <p className="font-body text-xs text-teatro-text-primary">
              📅 {drawDate}{lottery.drawTime && ` · ${lottery.drawTime}hs`}
            </p>
            <p className="font-body text-xs text-teatro-text-primary">
              🎟️ {lottery.ticketCount} entrada{lottery.ticketCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Action */}
        <button
          type="button"
          disabled={isSignedUp || !lottery.isOpen}
          onClick={onSignUp}
          className={`w-full px-4 py-3 rounded-xl font-body font-bold text-sm transition-colors ${
            isSignedUp
              ? 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-muted cursor-default'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isSignedUp ? '✓ Inscripto' : 'Inscribirme al sorteo'}
        </button>
      </div>
    </div>
  );
}
