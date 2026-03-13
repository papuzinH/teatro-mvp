import { useState } from 'react';
import type { TicketPack, Play } from '@/types';
import Modal from '@/components/ui/Modal';

interface PackJoinFlowProps {
  pack: TicketPack;
  play?: Play;
  onConfirm: (packId: string) => void;
  onClose: () => void;
}

type Step = 'commitment' | 'tickets' | 'confirm' | 'welcome';

export default function PackJoinFlow({ pack, play, onConfirm, onClose }: PackJoinFlowProps) {
  const [step, setStep] = useState<Step>('commitment');
  const [ticketCount, setTicketCount] = useState(1);

  const spotsLeft = pack.maxParticipants - pack.currentParticipants;
  const pricePerTicket = pack.pricePerTicket ?? 0;

  if (step === 'welcome') {
    return (
      <Modal isOpen onClose={onClose}>
        <div className="text-center space-y-4 py-4">
          <span className="text-5xl">🎉</span>
          <h2 className="font-display text-xl text-teatro-text-primary font-bold">
            ¡Bienvenido al pack!
          </h2>
          <p className="font-body text-sm text-teatro-text-muted">
            Ya sos parte de <span className="text-teatro-gold font-semibold">{pack.name}</span>.
            Vas a poder chatear con el grupo para coordinar.
          </p>
          <p className="font-body text-xs text-teatro-text-muted">
            +20 puntos por unirte 🏆
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-3 rounded-xl bg-teatro-gold text-teatro-bg font-body font-bold text-sm hover:bg-teatro-gold/90 transition-colors"
          >
            Ir al chat del grupo
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen onClose={onClose}>
      <div className="space-y-5">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          {(['commitment', 'tickets', 'confirm'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body ${
                step === s ? 'bg-teatro-gold text-teatro-bg' :
                (['commitment', 'tickets', 'confirm'] as Step[]).indexOf(step) > i
                  ? 'bg-teatro-gold/20 text-teatro-gold'
                  : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-muted'
              }`}>
                {i + 1}
              </div>
              {i < 2 && <div className="w-6 h-px bg-teatro-surface-light" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        {step === 'commitment' && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="font-display text-lg text-teatro-text-primary font-bold">
                Compromiso grupal
              </h2>
              <p className="font-body text-sm text-teatro-text-muted">
                Los packs funcionan mejor cuando todos se comprometen a asistir.
              </p>
            </div>

            {play && (
              <div className="flex items-center gap-3 bg-teatro-surface rounded-xl p-3">
                <img src={play.imageUrl} alt={play.title} className="w-12 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-body text-sm text-teatro-text-primary font-medium">{play.title}</p>
                  <p className="font-body text-xs text-teatro-text-muted">{play.theater}</p>
                </div>
              </div>
            )}

            <div className="bg-teatro-surface rounded-xl p-3 space-y-2">
              <p className="font-body text-xs text-teatro-text-muted flex items-center gap-2">
                <span>👥</span> {spotsLeft} lugar{spotsLeft !== 1 ? 'es' : ''} restante{spotsLeft !== 1 ? 's' : ''}
              </p>
              <p className="font-body text-xs text-teatro-text-muted flex items-center gap-2">
                <span>🎫</span> -{pack.discountPercent}% de descuento grupal
              </p>
              {pack.scheduledTime && (
                <p className="font-body text-xs text-teatro-text-muted flex items-center gap-2">
                  <span>🕐</span> Función: {pack.scheduledTime}hs
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep('tickets')}
              className="w-full px-4 py-3 rounded-xl bg-teatro-gold text-teatro-bg font-body font-bold text-sm hover:bg-teatro-gold/90 transition-colors"
            >
              Me comprometo a asistir
            </button>
          </div>
        )}

        {step === 'tickets' && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="font-display text-lg text-teatro-text-primary font-bold">
                ¿Cuántas entradas?
              </h2>
              <p className="font-body text-sm text-teatro-text-muted">
                Podés llevar hasta {Math.min(spotsLeft, 3)} persona{Math.min(spotsLeft, 3) !== 1 ? 's' : ''}.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              {Array.from({ length: Math.min(spotsLeft, 3) }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setTicketCount(n)}
                  className={`w-14 h-14 rounded-xl text-lg font-bold font-body transition-colors ${
                    ticketCount === n
                      ? 'bg-teatro-gold text-teatro-bg'
                      : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-primary hover:border-teatro-gold/40'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {pricePerTicket > 0 && (
              <p className="text-center font-body text-sm text-teatro-text-muted">
                ${(pricePerTicket * ticketCount).toLocaleString('es-AR')} total ({ticketCount} &times; ${pricePerTicket.toLocaleString('es-AR')})
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('commitment')}
                className="flex-1 px-4 py-3 rounded-xl border border-teatro-surface-light text-teatro-text-secondary font-body text-sm hover:bg-teatro-surface transition-colors"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => setStep('confirm')}
                className="flex-1 px-4 py-3 rounded-xl bg-teatro-gold text-teatro-bg font-body font-bold text-sm hover:bg-teatro-gold/90 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="font-display text-lg text-teatro-text-primary font-bold">
                Confirmá tu lugar
              </h2>
            </div>

            <div className="bg-teatro-surface rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-teatro-text-muted">Pack</span>
                <span className="font-body text-sm text-teatro-text-primary font-medium">{pack.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-teatro-text-muted">Entradas</span>
                <span className="font-body text-sm text-teatro-text-primary font-medium">{ticketCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-teatro-text-muted">Descuento</span>
                <span className="font-body text-sm text-teatro-gold font-bold">-{pack.discountPercent}%</span>
              </div>
              {pricePerTicket > 0 && (
                <div className="flex items-center justify-between border-t border-teatro-surface-light pt-2 mt-2">
                  <span className="font-body text-sm text-teatro-text-muted">Total</span>
                  <span className="font-body text-lg text-teatro-text-primary font-bold">${(pricePerTicket * ticketCount).toLocaleString('es-AR')}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('tickets')}
                className="flex-1 px-4 py-3 rounded-xl border border-teatro-surface-light text-teatro-text-secondary font-body text-sm hover:bg-teatro-surface transition-colors"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm(pack.id);
                  setStep('welcome');
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-teatro-gold text-teatro-bg font-body font-bold text-sm hover:bg-teatro-gold/90 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
