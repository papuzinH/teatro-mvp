import type { Play } from '@/types';
import PlayCard from './PlayCard';

interface PlayGridProps {
  plays: Play[];
}

export default function PlayGrid({ plays }: PlayGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {plays.map((play) => (
        <PlayCard key={play.id} play={play} />
      ))}
    </div>
  );
}
