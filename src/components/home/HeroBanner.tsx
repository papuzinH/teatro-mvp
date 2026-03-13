import { Link } from 'react-router-dom';
import type { Banner, Play } from '@/types';
import { formatPriceRange } from '@/lib/formatters';

interface HeroBannerProps {
  banner: Banner;
  play?: Play;
}

export default function HeroBanner({ banner, play }: HeroBannerProps) {
  const linkTo = banner.linkTo ?? '#';

  return (
    <Link to={linkTo} className="block">
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-xl">
        <img
          src={play?.imageUrl ?? banner.imageUrl}
          alt={play?.title ?? banner.altText}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          {play ? (
            <>
              <p className="font-body text-xs text-teatro-gold font-semibold uppercase tracking-wider">
                Destacada
              </p>
              <h2 className="font-display text-xl text-white drop-shadow-md leading-tight">
                {play.title}
              </h2>
              <p className="font-body text-sm text-white/80">
                {play.theater} &middot; {play.zone}
              </p>
              <p className="font-body text-sm text-teatro-gold font-bold">
                {formatPriceRange(play.price.min, play.price.max)}
              </p>
            </>
          ) : (
            <p className="font-display text-lg text-white drop-shadow-md">
              {banner.altText}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
