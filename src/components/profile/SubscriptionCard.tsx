import type { Subscription } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export default function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const { isActive, plan, expiresAt } = subscription;

  const formattedExpiry = expiresAt
    ? new Date(expiresAt).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const planLabel = plan === 'mensual' ? 'Mensual' : plan === 'anual' ? 'Anual' : null;

  return (
    <Card className={isActive ? 'border-teatro-gold/50' : ''}>
      <div className="flex items-start justify-between gap-4">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${
            isActive ? 'bg-teatro-gold/20' : 'bg-teatro-surface-light'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${isActive ? 'text-teatro-gold' : 'text-teatro-text-muted'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-display font-semibold text-teatro-text-primary">
            {isActive ? 'Suscripcion activa' : 'Sin suscripcion'}
          </h3>

          {isActive && planLabel ? (
            <div className="mt-1 space-y-0.5">
              <p className="text-sm font-body text-teatro-gold font-medium">
                Plan {planLabel}
              </p>
              {formattedExpiry && (
                <p className="text-xs font-body text-teatro-text-muted">
                  Vence el {formattedExpiry}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm font-body text-teatro-text-muted mt-1">
              Suscribite para acceder a descuentos exclusivos y beneficios.
            </p>
          )}
        </div>
      </div>

      {/* CTA for inactive subscription */}
      {!isActive && (
        <div className="mt-4">
          <Button
            size="sm"
            onClick={() => alert('Proximamente: pantalla de suscripcion')}
          >
            Suscribite
          </Button>
        </div>
      )}
    </Card>
  );
}
