import { useApp } from '@/context/AppContext';
import { getRecommendations } from '@/lib/recommendations';
import SubscriptionCard from '@/components/profile/SubscriptionCard';
import LevelProgress from '@/components/profile/LevelProgress';
import FavoritesGrid from '@/components/profile/FavoritesGrid';
import RecommendationsGrid from '@/components/profile/RecommendationsGrid';

export default function ProfilePage() {
  const { currentUser, plays, userLevels } = useApp();

  const recommendations = getRecommendations(plays, currentUser.seenPlayIds, currentUser.quizAnswers);

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-display text-2xl font-bold text-teatro-text-primary">
        Mi Perfil
      </h1>

      {/* Avatar + User Info */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-teatro-surface-light flex items-center justify-center overflow-hidden border-2 border-teatro-gold">
          {currentUser.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display text-2xl text-teatro-gold">
              {currentUser.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-teatro-text-primary">
            {currentUser.name}
          </p>
          <p className="text-sm text-teatro-text-muted">{currentUser.email}</p>
        </div>
      </div>

      <SubscriptionCard subscription={currentUser.subscription} />

      <LevelProgress points={currentUser.points} level={currentUser.level} userLevels={userLevels} />

      {/* Favorites Section */}
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
          Mis favoritas
        </h2>
        <FavoritesGrid favoritePlayIds={currentUser.favoritePlayIds} plays={plays} />
      </section>

      {/* Recommendations Section */}
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
          Recomendadas para vos
        </h2>
        <RecommendationsGrid plays={recommendations} />
      </section>
    </div>
  );
}
