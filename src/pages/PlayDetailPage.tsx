import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import PlayDetail from '@/components/play/PlayDetail';
import EmptyState from '@/components/ui/EmptyState';

export default function PlayDetailPage() {
  const { playId } = useParams<{ playId: string }>();
  const navigate = useNavigate();
  const { plays } = useApp();

  const play = plays.find((p) => p.id === playId);

  if (!play) {
    return (
      <div className="p-4 space-y-6">
        <EmptyState icon="🎭" title="Obra no encontrada" message="Obra no encontrada" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-teatro-text-secondary hover:text-teatro-gold flex items-center gap-1 transition-colors"
      >
        <span className="text-teatro-text-secondary hover:text-teatro-gold text-lg leading-none">&larr;</span>
        <span>Volver</span>
      </button>

      <PlayDetail play={play} />
    </div>
  );
}
