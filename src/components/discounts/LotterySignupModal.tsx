import { useState } from 'react';
import type { Lottery, Play } from '@/types';
import Modal from '@/components/ui/Modal';

interface LotterySignupModalProps {
  lottery: Lottery;
  play?: Play;
  onConfirm: (lotteryId: string, ticketCount: number) => void;
  onClose: () => void;
}

export default function LotterySignupModal({ lottery, play, onConfirm, onClose }: LotterySignupModalProps) {
  const max = lottery.maxTicketsPerPerson ?? 2;
  const [ticketCount, setTicketCount] = useState(1);

  return (
    <Modal isOpen onClose={onClose}>
      <div className="space-y-5">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-3xl">🎲</span>
          <h2 className="font-display text-xl text-teatro-text-primary font-bold">
            Inscribirme al sorteo
          </h2>
          <p className="font-body text-sm text-teatro-text-muted">
            {lottery.title}
          </p>
        </div>

        {/* Play info */}
        {play && (
          <div className="flex items-center gap-3 bg-teatro-surface rounded-xl p-3">
            <img
              src={play.imageUrl}
              alt={play.title}
              className="w-12 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-body text-sm text-teatro-text-primary font-medium">{play.title}</p>
              <p className="font-body text-xs text-teatro-text-muted">{play.theater}</p>
            </div>
          </div>
        )}

        {/* Ticket count selector */}
        <div className="space-y-2">
          <p className="font-body text-sm text-teatro-text-primary font-medium">
            ¿Cuántas entradas querés? (máx. {max})
          </p>
          <div className="flex items-center gap-3">
            {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setTicketCount(n)}
                className={`w-12 h-12 rounded-xl text-lg font-bold font-body transition-colors ${
                  ticketCount === n
                    ? 'bg-teatro-gold text-teatro-bg'
                    : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-primary hover:border-teatro-gold/40'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-teatro-surface rounded-xl p-3 space-y-1">
          <p className="font-body text-xs text-teatro-text-muted">
            📅 Sorteo: {new Date(lottery.drawDate + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })}
            {lottery.drawTime && ` a las ${lottery.drawTime}hs`}
          </p>
          {lottery.closesAt && (
            <p className="font-body text-xs text-teatro-text-muted">
              ⏰ Inscripción cierra: {new Date(lottery.closesAt + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })}
            </p>
          )}
          <p className="font-body text-xs text-teatro-text-muted">
            🎟️ {lottery.ticketCount} entrada{lottery.ticketCount !== 1 ? 's' : ''} en juego
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-teatro-surface-light text-teatro-text-secondary font-body font-medium text-sm hover:bg-teatro-surface transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(lottery.id, ticketCount)}
            className="flex-1 px-4 py-3 rounded-xl bg-teatro-gold text-teatro-bg font-body font-bold text-sm hover:bg-teatro-gold/90 transition-colors"
          >
            Confirmar ({ticketCount} {ticketCount === 1 ? 'entrada' : 'entradas'})
          </button>
        </div>
      </div>
    </Modal>
  );
}
