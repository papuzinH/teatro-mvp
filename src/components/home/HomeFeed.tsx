import { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import HeroBanner from './HeroBanner';
import RankingSection from './RankingSection';
import BannerInline from './BannerInline';
import CollectionSection from './CollectionSection';
import SearchBar from './SearchBar';
import FilterBar, { type Filters } from './FilterBar';
import PlayGrid from '@/components/play/PlayGrid';

export default function HomeFeed() {
  const { plays, collections, banners } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const heroBanner = banners.find((b) => b.size === 'hero');
  const heroBannerPlay = heroBanner?.playId
    ? plays.find((p) => p.id === heroBanner.playId)
    : undefined;
  const inlineLargeBanners = banners
    .filter((b) => b.size === 'inline-large')
    .sort((a, b) => a.position - b.position);
  const inlineSmallBanners = banners
    .filter((b) => b.size === 'inline-small')
    .sort((a, b) => a.position - b.position);

  const isFiltering = searchQuery.trim() !== '' || filters.genre || filters.circuit || filters.maxPrice;

  const filteredPlays = useMemo(() => {
    if (!isFiltering) return [];
    const q = searchQuery.toLowerCase().trim();
    return plays.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !p.theater.toLowerCase().includes(q)) {
        return false;
      }
      if (filters.genre && p.genre !== filters.genre) return false;
      if (filters.circuit && p.circuit !== filters.circuit) return false;
      if (filters.maxPrice && p.price.min > filters.maxPrice) return false;
      return true;
    });
  }, [plays, searchQuery, filters, isFiltering]);

  return (
    <div className="space-y-6 p-4">
      {/* Search + Filters */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={searchContainerRef}
        className="relative"
        onFocus={() => setIsSearchOpen(true)}
      >
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-teatro-surface border border-teatro-surface-light rounded-xl p-3 shadow-lg">
            <FilterBar filters={filters} onFiltersChange={setFilters} />
          </div>
        )}
      </div>

      {isFiltering ? (
        /* Filtered results view */
        <section>
          <p className="font-body text-sm text-teatro-text-muted mb-3">
            {filteredPlays.length} resultado{filteredPlays.length !== 1 ? 's' : ''}
          </p>
          {filteredPlays.length > 0 ? (
            <PlayGrid plays={filteredPlays} />
          ) : (
            <div className="text-center py-12">
              <p className="text-3xl mb-2">🔍</p>
              <p className="font-body text-sm text-teatro-text-muted">
                No encontramos obras con esos filtros
              </p>
            </div>
          )}
        </section>
      ) : (
        /* Normal feed */
        <>
          {/* Hero Banner */}
          {heroBanner && <HeroBanner banner={heroBanner} play={heroBannerPlay} />}

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
        </>
      )}
    </div>
  );
}
