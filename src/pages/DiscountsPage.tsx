import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import type { Lottery, TicketPack } from '@/types';
import LotteryCard from '@/components/discounts/LotteryCard';
import TicketPackCard from '@/components/discounts/TicketPackCard';
import LotterySignupModal from '@/components/discounts/LotterySignupModal';
import PackJoinFlow from '@/components/discounts/PackJoinFlow';
import { useNavigate } from 'react-router-dom';

export default function DiscountsPage() {
  const { lotteries, ticketPacks, plays, currentUser, signUpForLottery, joinPack } = useApp();
  const navigate = useNavigate();

  const [lotteryModal, setLotteryModal] = useState<Lottery | null>(null);
  const [packModal, setPackModal] = useState<TicketPack | null>(null);

  const handleLotteryConfirm = (lotteryId: string, _ticketCount: number) => {
    signUpForLottery(lotteryId);
    setLotteryModal(null);
  };

  const handlePackConfirm = (packId: string) => {
    joinPack(packId);
  };

  return (
    <div className="p-4 space-y-6 pb-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-teatro-text-primary">
          Descuentos Exclusivos
        </h1>
        <p className="font-body text-sm text-teatro-text-muted mt-1">
          Sorteos, packs grupales y ofertas especiales
        </p>
      </div>

      {/* Lotteries Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎲</span>
          <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
            Sorteos
          </h2>
        </div>
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
                onSignUp={() => setLotteryModal(lottery)}
              />
            );
          })}
        </div>
      </section>

      {/* Ticket Packs Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">👥</span>
          <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
            Packs Grupales
          </h2>
        </div>
        <div className="space-y-4">
          {ticketPacks.map((pack) => {
            const play = plays.find((p) => p.id === pack.playId);
            const isJoined = currentUser.joinedPackIds.includes(pack.id);
            return (
              <TicketPackCard
                key={pack.id}
                pack={pack}
                play={play}
                isJoined={isJoined}
                onJoin={() => setPackModal(pack)}
                onOpenChat={(packId) => navigate(`/discounts/pack/${packId}/chat`)}
              />
            );
          })}
        </div>
      </section>

      {/* Lottery signup modal */}
      {lotteryModal && (
        <LotterySignupModal
          lottery={lotteryModal}
          play={plays.find((p) => p.id === lotteryModal.playId)}
          onConfirm={handleLotteryConfirm}
          onClose={() => setLotteryModal(null)}
        />
      )}

      {/* Pack join flow modal */}
      {packModal && (
        <PackJoinFlow
          pack={packModal}
          play={plays.find((p) => p.id === packModal.playId)}
          onConfirm={handlePackConfirm}
          onClose={() => setPackModal(null)}
          onOpenChat={(packId) => navigate(`/discounts/pack/${packId}/chat`)}
        />
      )}
    </div>
  );
}
