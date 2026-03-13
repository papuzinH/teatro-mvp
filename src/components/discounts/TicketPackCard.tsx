import type { TicketPack, Play } from '@/types';

interface TicketPackCardProps {
  pack: TicketPack;
  play: Play | undefined;
  isJoined: boolean;
  onJoin: () => void;
  onOpenChat: (packId: string) => void;
}

export default function TicketPackCard({ pack, play, isJoined, onJoin, onOpenChat }: TicketPackCardProps) {
  const scheduledDate = new Date(pack.scheduledDate + 'T12:00:00').toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
  });

  const spotsLeft = pack.maxParticipants - pack.currentParticipants;
  const isFull = spotsLeft <= 0;

  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-teatro-gold/10 to-teatro-surface border border-teatro-gold/20">
      {/* Header */}
      <div className="bg-teatro-gold/10 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">👥</span>
          <span className="font-display text-sm font-bold text-teatro-gold uppercase tracking-wide">
            Pack Grupal
          </span>
        </div>
        <span className="text-xs font-body bg-teatro-gold/90 text-teatro-bg px-2 py-0.5 rounded-full font-bold">
          -{pack.discountPercent}%
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Pack info row */}
        <div className="flex gap-3">
          {play && (
            <div className="w-14 h-20 rounded-lg overflow-hidden shrink-0">
              <img src={play.imageUrl} alt={play.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm font-semibold text-teatro-text-primary leading-tight">
              {pack.name}
            </h3>
            {play && (
              <p className="text-xs font-body text-teatro-text-muted mt-0.5">
                {play.title} · {play.theater}
              </p>
            )}
            <p className="text-xs font-body text-teatro-text-muted mt-1 leading-relaxed line-clamp-2">
              {pack.description}
            </p>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-teatro-bg/50 rounded-xl px-2.5 py-2 text-center">
            <p className="font-body text-[10px] text-teatro-text-muted uppercase">Fecha</p>
            <p className="font-body text-xs text-teatro-text-primary font-medium">{scheduledDate}</p>
          </div>
          <div className="bg-teatro-bg/50 rounded-xl px-2.5 py-2 text-center">
            <p className="font-body text-[10px] text-teatro-text-muted uppercase">Grupo</p>
            <p className="font-body text-xs text-teatro-text-primary font-medium">
              {pack.currentParticipants}/{pack.maxParticipants}
            </p>
          </div>
          <div className="bg-teatro-bg/50 rounded-xl px-2.5 py-2 text-center">
            <p className="font-body text-[10px] text-teatro-text-muted uppercase">Lugares</p>
            <p className={`font-body text-xs font-medium ${isFull ? 'text-teatro-text-muted' : 'text-teatro-gold'}`}>
              {isFull ? 'Completo' : `${spotsLeft} libre${spotsLeft !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {/* Action */}
        {isJoined ? (
          <button
            type="button"
            onClick={() => onOpenChat(pack.id)}
            className="w-full px-4 py-3 rounded-xl bg-teatro-surface border border-teatro-surface-light text-teatro-text-primary font-body font-medium text-sm hover:bg-teatro-surface-light transition-colors"
          >
            💬 Ir al chat del grupo
          </button>
        ) : (
          <button
            type="button"
            disabled={isFull}
            onClick={onJoin}
            className={`w-full px-4 py-3 rounded-xl font-body font-bold text-sm transition-colors ${
              isFull
                ? 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-muted cursor-default'
                : 'bg-teatro-gold hover:bg-teatro-gold/90 text-teatro-bg'
            }`}
          >
            {isFull ? 'Completo' : 'Unirme al pack'}
          </button>
        )}
      </div>
    </div>
  );
}
