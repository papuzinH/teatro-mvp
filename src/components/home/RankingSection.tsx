import type { Play } from '@/types';
import PlayRankingGrid from '@/components/play/PlayRankingGrid';

interface RankingSectionProps {
  plays: Play[];
}

export default function RankingSection({ plays }: RankingSectionProps) {
  const rankedPlays = plays
    .filter((p) => p.rankingPosition != null)
    .sort((a, b) => (a.rankingPosition ?? 0) - (b.rankingPosition ?? 0))
    .slice(0, 10);

  if (rankedPlays.length === 0) return null;

  return (
    <section>
      <div className="mb-3">
        <h2 className="font-display text-xl text-teatro-text-primary">
          Top 10 de la semana
        </h2>
        <div className="mt-1 w-16 h-0.5 bg-teatro-gold rounded-full" />
      </div>
      <PlayRankingGrid plays={rankedPlays} />
    </section>
  );
}
