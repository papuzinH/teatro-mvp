import { Link } from 'react-router-dom';
import { NewsArticle } from '@/types';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/formatters';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link to={`/news/${article.id}`} className="block no-underline group">
      <Card className="overflow-hidden transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        {article.imageUrl && (
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-display text-lg font-bold text-teatro-text line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-teatro-secondary mt-2 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-4 text-xs text-teatro-muted">
            <span>{article.author}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
