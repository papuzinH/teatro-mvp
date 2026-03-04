import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import NewsDetail from '@/components/news/NewsDetail';
import EmptyState from '@/components/ui/EmptyState';

export default function NewsDetailPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { news } = useApp();

  const article = news.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="p-4 space-y-6">
        <EmptyState icon="📰" title="Articulo no encontrado" message="Articulo no encontrado" />
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

      <NewsDetail article={article} />
    </div>
  );
}
