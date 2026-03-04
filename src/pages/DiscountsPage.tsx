import { useApp } from '@/context/AppContext';
import LotteryCard from '@/components/discounts/LotteryCard';
import TicketPackList from '@/components/discounts/TicketPackList';
import { useNavigate } from 'react-router-dom';

export default function DiscountsPage() {
  const { lotteries, ticketPacks, plays, currentUser, signUpForLottery, joinPack } = useApp();
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-display text-2xl font-bold text-teatro-text-primary">
        Descuentos Exclusivos
      </h1>

      {/* Lotteries Section */}
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
          Sorteos
        </h2>
        <div className="space-y-4">
          {lotteries.map((lottery) => {
            const play = plays.find((p) => p.id === lottery.playId);
            const isSignedUp = currentUser.lotterySignups.includes(lottery.id);
            return (
              <LotteryCard
                key={lottery.id}
                lottery={lottery}
                play={play}
                isSignedUp={isSignedUp}
                onSignUp={signUpForLottery}
              />
            );
          })}
        </div>
      </section>

      {/* Ticket Packs Section */}
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
          Packs de Entradas
        </h2>
        <TicketPackList
          packs={ticketPacks}
          plays={plays}
          joinedPackIds={currentUser.joinedPackIds}
          onJoin={joinPack}
          onOpenChat={(packId) => navigate(`/discounts/chat/${packId}`)}
        />
      </section>
    </div>
  );
}
