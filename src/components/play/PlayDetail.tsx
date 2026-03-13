import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Play } from '@/types';
import { capitalizeFirst } from '@/lib/formatters';
import { useApp } from '@/context/AppContext';
import Badge from '@/components/ui/Badge';
import Tag from '@/components/ui/Tag';
import RushTicketCard from './RushTicketCard';
import SpecialOfferBadge from './SpecialOfferBadge';

interface PlayDetailProps {
  play: Play;
}

function formatShowDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

export default function PlayDetail({ play }: PlayDetailProps) {
  const { currentUser, toggleFavorite, addPoints, lotteries } = useApp();
  const [showToast, setShowToast] = useState(false);
  const [rushUnlocked, setRushUnlocked] = useState(false);

  const isFavorite = currentUser.favoritePlayIds.includes(play.id);
  const linkedLottery = play.hasLottery && play.lotteryId
    ? lotteries.find((l) => l.id === play.lotteryId)
    : undefined;

  const handleBuy = () => {
    addPoints(100);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative pb-28">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-teatro-gold text-teatro-bg font-body font-semibold px-6 py-3 rounded-xl shadow-lg animate-pulse">
          Compra simulada — +100 puntos 🎟️
        </div>
      )}

      {/* Poster */}
      <div className="relative">
        <img
          src={play.imageUrl}
          alt={play.title}
          className="w-full max-h-96 object-cover rounded-xl bg-teatro-surface"
        />
        {/* Favorite button on poster */}
        <button
          type="button"
          onClick={() => toggleFavorite(play.id)}
          className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 transition-colors hover:bg-black/70"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span className={`text-xl ${isFavorite ? 'text-teatro-crimson' : 'text-white/80'}`}>
            {isFavorite ? '\u2764' : '\u2661'}
          </span>
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {/* Title + info */}
        <div>
          <h1 className="font-display text-2xl text-teatro-text-primary">
            {play.title}
          </h1>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <span className="font-body text-sm text-teatro-text-secondary">
              {play.duration} min
            </span>
            <span className="text-teatro-text-muted">&middot;</span>
            <span className="font-body text-sm text-teatro-text-secondary">
              {play.theater}
            </span>
            <Badge>{play.zone}</Badge>
          </div>
        </div>

        {/* Circuit + Genre badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={play.circuit}>{capitalizeFirst(play.circuit)}</Badge>
          <Badge variant="genre">{capitalizeFirst(play.genre)}</Badge>
          <Tag>{capitalizeFirst(play.targetAudience)}</Tag>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-teatro-text-secondary leading-relaxed">
          {play.description}
        </p>

        {/* Special Offer Badge */}
        {play.hasSpecialOffer && play.specialOfferLabel && (
          <SpecialOfferBadge
            label={play.specialOfferLabel}
            description={play.specialOfferDescription}
          />
        )}

        {/* Rush Ticket Card */}
        {play.hasRushTickets && play.rushPrice && (
          <RushTicketCard
            rushPrice={play.rushPrice}
            isUnlocked={rushUnlocked}
            onToggle={() => setRushUnlocked(!rushUnlocked)}
          />
        )}

        {/* Lottery link */}
        {linkedLottery && linkedLottery.isOpen && (
          <Link
            to="/discounts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teatro-surface border border-teatro-surface-light hover:border-teatro-gold/30 transition-colors"
          >
            <span className="text-lg">🎲</span>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-teatro-text-primary font-medium">
                {linkedLottery.title}
              </p>
              <p className="font-body text-xs text-teatro-text-muted">
                Sorteo el {new Date(linkedLottery.drawDate + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })} a las {linkedLottery.drawTime}hs
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teatro-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        )}

        {/* Key Details */}
        <section className="space-y-3">
          <h2 className="font-display text-lg text-teatro-text-primary font-semibold">
            Detalles
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-teatro-text-muted text-sm">📍</span>
              <div>
                <p className="font-body text-xs text-teatro-text-muted">Teatro</p>
                <p className="font-body text-sm text-teatro-text-primary">{play.theater}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teatro-text-muted text-sm">⏱️</span>
              <div>
                <p className="font-body text-xs text-teatro-text-muted">Duración</p>
                <p className="font-body text-sm text-teatro-text-primary">{play.duration} min</p>
              </div>
            </div>
            {play.theaterAddress && (
              <div className="col-span-2 flex items-center gap-2">
                <span className="text-teatro-text-muted text-sm">🗺️</span>
                <div>
                  <p className="font-body text-xs text-teatro-text-muted">Dirección</p>
                  <p className="font-body text-sm text-teatro-text-primary">{play.theaterAddress}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Shows */}
        {play.upcomingShows && play.upcomingShows.length > 0 ? (
          <section className="space-y-3">
            <h2 className="font-display text-lg text-teatro-text-primary font-semibold">
              Próximas funciones
            </h2>
            <div className="flex flex-wrap gap-2">
              {play.upcomingShows.map((show, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-teatro-surface-light bg-teatro-surface"
                >
                  <span className="font-body text-sm text-teatro-text-primary font-medium">
                    {formatShowDate(show.date)}
                  </span>
                  <span className="font-body text-sm text-teatro-gold font-semibold">
                    {show.time}hs
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="space-y-3">
            <h2 className="font-display text-lg text-teatro-text-primary font-semibold">
              Horarios
            </h2>
            <div className="flex flex-wrap gap-2">
              {play.schedules.map((schedule, idx) => (
                <Tag key={idx}>
                  {capitalizeFirst(schedule.day)} {schedule.time}
                </Tag>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Fixed bottom purchase bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-teatro-bg border-t border-teatro-surface-light px-4 py-3 md:pl-60">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <p className="font-body text-lg text-teatro-text-primary font-bold">
              Desde ${play.price.min.toLocaleString('es-AR')}
            </p>
            {play.hasSpecialOffer && play.specialOfferLabel && (
              <p className="font-body text-xs text-[#e91e63] font-semibold">
                {play.specialOfferLabel}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleBuy}
            className="bg-[#e91e63] hover:bg-[#c2185b] text-white font-body font-semibold text-sm px-6 py-3 rounded-full transition-colors"
          >
            Comprar entrada
          </button>
        </div>
      </div>
    </div>
  );
}
