import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import EphemeralChat from '@/components/discounts/EphemeralChat';
import EmptyState from '@/components/ui/EmptyState';

export default function EphemeralChatPage() {
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  const { ticketPacks, currentUser } = useApp();

  const pack = ticketPacks.find((tp) => tp.id === packId);

  if (!pack) {
    return (
      <div className="p-4 space-y-6">
        <EmptyState icon="📦" title="Pack no encontrado" message="Pack no encontrado" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="text-teatro-text-secondary hover:text-teatro-gold flex items-center gap-1 transition-colors"
        >
          <span className="text-teatro-text-secondary hover:text-teatro-gold text-lg leading-none">&larr;</span>
          <span>Volver</span>
        </button>
        <h1 className="font-display text-2xl font-bold text-teatro-text-primary">
          {pack.name}
        </h1>
      </div>

      <EphemeralChat pack={pack} currentUserName={currentUser.name} currentUserAvatar={currentUser.avatarUrl} />
    </div>
  );
}
