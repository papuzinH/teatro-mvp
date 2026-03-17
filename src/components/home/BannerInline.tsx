import { Link } from 'react-router-dom';
import type { Banner } from '@/types';

interface BannerInlineProps {
  banner: Banner;
}

export default function BannerInline({ banner }: BannerInlineProps) {
  const heightClass = banner.size === 'inline-small' ? 'h-16' : 'h-28';

  const content = (
    <div className={`w-full ${heightClass} rounded-xl overflow-hidden my-4`}>
      <img
        src={banner.imageUrl}
        alt={banner.altText}
        className="w-full h-full object-cover"
      />
    </div>
  );

  if (banner.linkTo) {
    return <Link  to={banner.linkTo}>{content}</Link>;
  }

  return content;
}
