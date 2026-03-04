import type { Play } from '@/types';
import PlayCard from './PlayCard';

interface PlayCarouselProps {
  plays: Play[];
}

export default function PlayCarousel({ plays }: PlayCarouselProps) {
  return (
    <div
      className="flex overflow-x-auto gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1"
    >
      {plays.map((play) => (
        <div key={play.id} className="snap-start">
          <PlayCard play={play} compact />
        </div>
      ))}
    </div>
  );
}
