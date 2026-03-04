import { useApp } from '@/context/AppContext';
import NewsCard from '@/components/news/NewsCard';

export default function NewsPage() {
  const { news } = useApp();

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-display text-2xl font-bold text-teatro-text-primary">
        Noticias
      </h1>

      <div className="space-y-4">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
