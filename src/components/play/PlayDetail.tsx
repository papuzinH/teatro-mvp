import { useState } from 'react';
import type { Play } from '@/types';
import { formatPriceRange, capitalizeFirst } from '@/lib/formatters';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';

interface PlayDetailProps {
  play: Play;
}

function renderStars(rating: number): string {
  const filled = Math.round(rating);
  const empty = 5 - filled;
  return '\u2605'.repeat(filled) + '\u2606'.repeat(empty);
}

export default function PlayDetail({ play }: PlayDetailProps) {
  const { currentUser, toggleFavorite, addPoints } = useApp();
  const [showToast, setShowToast] = useState(false);

  const isFavorite = currentUser.favoritePlayIds.includes(play.id);

  const handleBuy = () => {
    addPoints(100);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative pb-8">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-teatro-gold text-teatro-bg font-body font-semibold px-6 py-3 rounded-xl shadow-lg animate-pulse">
          Compra simulada - +100 puntos
        </div>
      )}

      {/* Poster */}
      <img
        src={play.imageUrl}
        alt={play.title}
        className="w-full max-h-96 object-cover rounded-xl bg-teatro-surface"
      />

      <div className="mt-6 space-y-4">
        {/* Title */}
        <h1 className="font-display text-2xl text-teatro-text-primary">
          {play.title}
        </h1>

        {/* Theater + Zone */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-sm text-teatro-text-secondary">
            {play.theater}
          </span>
          <Badge>{play.zone}</Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-teatro-gold text-lg tracking-wide">
            {renderStars(play.rating)}
          </span>
          <span className="font-body text-sm text-teatro-text-muted">
            {play.rating.toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <p className="font-body text-xl text-teatro-gold font-bold">
          {formatPriceRange(play.price.min, play.price.max)}
        </p>

        {/* Circuit + Genre badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={play.circuit}>{capitalizeFirst(play.circuit)}</Badge>
          <Badge variant="genre">{capitalizeFirst(play.genre)}</Badge>
        </div>

        {/* Target Audience */}
        <div>
          <Tag>{capitalizeFirst(play.targetAudience)}</Tag>
        </div>

        {/* Schedule chips */}
        <div className="flex flex-wrap gap-2">
          {play.schedules.map((schedule, idx) => (
            <Tag key={idx}>
              {capitalizeFirst(schedule.day)} {schedule.time}
            </Tag>
          ))}
        </div>

        {/* Duration */}
        <p className="font-body text-sm text-teatro-text-muted">
          {play.duration} min
        </p>

        {/* Description */}
        <p className="font-body text-sm text-teatro-text-secondary leading-relaxed">
          {play.description}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => toggleFavorite(play.id)}
            className="flex items-center justify-center w-12 h-12 rounded-lg border border-teatro-surface-light bg-teatro-surface transition-colors hover:bg-teatro-surface-light"
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <span className={`text-2xl ${isFavorite ? 'text-teatro-crimson' : 'text-teatro-text-muted'}`}>
              {isFavorite ? '\u2764' : '\u2661'}
            </span>
          </button>

          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handleBuy}
          >
            Comprar entrada
          </Button>
        </div>
      </div>
    </div>
  );
}
