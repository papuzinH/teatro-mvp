import { Link } from 'react-router-dom';
import type { Banner } from '@/types';

interface HeroBannerProps {
  banner: Banner;
}

export default function HeroBanner({ banner }: HeroBannerProps) {
  const content = (
    <div className="relative w-full aspect-[3/1] overflow-hidden rounded-xl">
      <img
        src={banner.imageUrl}
        alt={banner.altText}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <p className="font-display text-lg text-white drop-shadow-md">
          {banner.altText}
        </p>
      </div>
    </div>
  );

  if (banner.linkTo) {
    return <Link to={banner.linkTo}>{content}</Link>;
  }

  return content;
}
