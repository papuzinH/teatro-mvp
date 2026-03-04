import type { UserLevelName, UserLevel } from '@/types';
import ProgressBar from '@/components/ui/ProgressBar';

interface LevelProgressProps {
  points: number;
  level: UserLevelName;
  userLevels: UserLevel[];
}

export default function LevelProgress({ points, level, userLevels }: LevelProgressProps) {
  const currentLevel = userLevels.find((l) => l.name === level) ?? userLevels[0];
  const currentIndex = userLevels.findIndex((l) => l.name === level);
  const isMaxLevel = currentIndex === userLevels.length - 1;

  const rangeMin = currentLevel.minPoints;
  const rangeMax = currentLevel.maxPoints;
  const range = rangeMax - rangeMin;
  const progressInLevel = points - rangeMin;
  const percentage = range > 0 ? Math.min(100, Math.round((progressInLevel / range) * 100)) : 100;

  const nextLevel = !isMaxLevel ? userLevels[currentIndex + 1] : null;
  const pointsToNext = nextLevel ? nextLevel.minPoints - points : 0;

  return (
    <div className="space-y-3">
      {/* Level name + icon */}
      <div className="flex items-center gap-2">
        <span className="text-2xl" role="img" aria-label={currentLevel.name}>
          {currentLevel.icon}
        </span>
        <h3 className="text-lg font-display font-semibold text-teatro-text-primary">
          {currentLevel.name}
        </h3>
      </div>

      {/* Progress bar */}
      <ProgressBar value={percentage} />

      {/* Points info */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-body text-teatro-text-muted">
          {points.toLocaleString('es-AR')} puntos
        </p>
        {nextLevel ? (
          <p className="text-sm font-body text-teatro-text-muted">
            Faltan <span className="text-teatro-gold font-medium">{pointsToNext.toLocaleString('es-AR')}</span> para {nextLevel.name}
          </p>
        ) : (
          <p className="text-sm font-body text-teatro-gold font-medium">
            Nivel maximo alcanzado
          </p>
        )}
      </div>
    </div>
  );
}
