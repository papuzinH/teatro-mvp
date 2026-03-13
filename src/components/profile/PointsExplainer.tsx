import type { PointAction } from '@/types';

interface PointsExplainerProps {
  pointActions: PointAction[];
  currentPoints: number;
}

export default function PointsExplainer({ pointActions, currentPoints }: PointsExplainerProps) {
  return (
    <div className="bg-teatro-surface rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-teatro-text-primary">
          Sistema de puntos
        </h3>
        <span className="font-body text-sm text-teatro-gold font-bold">
          {currentPoints.toLocaleString('es-AR')} pts
        </span>
      </div>

      <p className="font-body text-xs text-teatro-text-muted">
        Sumá puntos con cada acción y desbloqueá niveles con beneficios exclusivos.
      </p>

      <div className="space-y-2">
        {pointActions.map((action) => (
          <div
            key={action.id}
            className="flex items-center gap-3 bg-teatro-bg/50 rounded-xl px-3 py-2.5"
          >
            <span className="text-lg shrink-0">{action.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-teatro-text-primary font-medium">
                {action.label}
              </p>
              {action.description && (
                <p className="font-body text-[11px] text-teatro-text-muted">
                  {action.description}
                </p>
              )}
            </div>
            <span className="font-body text-sm text-teatro-gold font-bold shrink-0">
              +{action.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
