import type { TicketPack, Play } from '@/types';
import TicketPackCard from './TicketPackCard';

interface TicketPackListProps {
  packs: TicketPack[];
  plays: Play[];
  joinedPackIds: string[];
  onJoin: (packId: string) => void;
  onOpenChat: (packId: string) => void;
}

export default function TicketPackList({ packs, plays, joinedPackIds, onJoin, onOpenChat }: TicketPackListProps) {
  return (
    <div className="space-y-4">
      {packs.map((pack) => {
        const play = plays.find((p) => p.id === pack.playId);
        const isJoined = joinedPackIds.includes(pack.id);

        return (
          <TicketPackCard
            key={pack.id}
            pack={pack}
            play={play}
            isJoined={isJoined}
            onJoin={() => onJoin(pack.id)}
            onOpenChat={onOpenChat}
          />
        );
      })}
    </div>
  );
}
