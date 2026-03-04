import { NewsArticle } from '@/types';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/formatters';

interface NewsDetailProps {
  article: NewsArticle;
}

export default function NewsDetail({ article }: NewsDetailProps) {
  const paragraphs = article.body.split('\n\n');

  return (
    <article className="max-w-3xl mx-auto">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full max-h-80 object-cover rounded-xl mb-6"
        />
      )}

      <h1 className="font-display text-2xl md:text-3xl font-bold text-teatro-text mb-4">
        {article.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-teatro-muted mb-4">
        <span className="font-medium text-teatro-secondary">{article.author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag) => (
            <Badge key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="font-body text-teatro-text leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
