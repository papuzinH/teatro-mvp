import { useApp } from '@/context/AppContext';
import HeroBanner from './HeroBanner';
import RankingSection from './RankingSection';
import BannerInline from './BannerInline';
import CollectionSection from './CollectionSection';

export default function HomeFeed() {
  const { plays, collections, banners } = useApp();

  const heroBanner = banners.find((b) => b.size === 'hero');
  const inlineLargeBanners = banners
    .filter((b) => b.size === 'inline-large')
    .sort((a, b) => a.position - b.position);
  const inlineSmallBanners = banners
    .filter((b) => b.size === 'inline-small')
    .sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-8 p-4">
      {/* Hero Banner */}
      {heroBanner && <HeroBanner banner={heroBanner} />}

      {/* Ranking Section */}
      <RankingSection plays={plays} />

      {/* First inline-large banner */}
      {inlineLargeBanners[0] && (
        <BannerInline banner={inlineLargeBanners[0]} />
      )}

      {/* First collection */}
      {collections[0] && (
        <CollectionSection collection={collections[0]} plays={plays} />
      )}

      {/* Second collection */}
      {collections[1] && (
        <CollectionSection collection={collections[1]} plays={plays} />
      )}

      {/* Second inline-large banner */}
      {inlineLargeBanners[1] && (
        <BannerInline banner={inlineLargeBanners[1]} />
      )}

      {/* Third collection */}
      {collections[2] && (
        <CollectionSection collection={collections[2]} plays={plays} />
      )}

      {/* First inline-small banner */}
      {inlineSmallBanners[0] && (
        <BannerInline banner={inlineSmallBanners[0]} />
      )}

      {/* Fourth collection */}
      {collections[3] && (
        <CollectionSection collection={collections[3]} plays={plays} />
      )}
    </div>
  );
}
