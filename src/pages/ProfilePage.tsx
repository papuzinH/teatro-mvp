import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getRecommendations } from '@/lib/recommendations';
import SubscriptionCard from '@/components/profile/SubscriptionCard';
import LevelProgress from '@/components/profile/LevelProgress';
import FavoritesGrid from '@/components/profile/FavoritesGrid';
import RecommendationsGrid from '@/components/profile/RecommendationsGrid';
import ProfileDetails from '@/components/profile/ProfileDetails';
import EditProfileModal from '@/components/profile/EditProfileModal';
import PointsExplainer from '@/components/profile/PointsExplainer';

export default function ProfilePage() {
  const { currentUser, plays, userLevels, pointActions, updateProfile } = useApp();
  const [showEditModal, setShowEditModal] = useState(false);

  const recommendations = getRecommendations(plays, currentUser.seenPlayIds, currentUser.quizAnswers);

  // Split favorites: quiz-based vs manually added
  const quizFavIds = currentUser.quizFavoritePlayIds ?? [];
  const manualFavIds = currentUser.favoritePlayIds.filter((id) => !quizFavIds.includes(id));

  return (
    <div className="p-4 space-y-6 pb-8">
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

      {/* Profile details (dating-app style) */}
      <ProfileDetails user={currentUser} onEdit={() => setShowEditModal(true)} />

      <SubscriptionCard subscription={currentUser.subscription} />

      <LevelProgress points={currentUser.points} level={currentUser.level} userLevels={userLevels} />

      {/* Points Explainer */}
      <PointsExplainer pointActions={pointActions} currentPoints={currentUser.points} />

      {/* Manual Favorites Section */}
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
          Mis favoritas
        </h2>
        <FavoritesGrid favoritePlayIds={manualFavIds} plays={plays} />
      </section>

      {/* Quiz Favorites Section */}
      {quizFavIds.length > 0 && (
        <section className="space-y-3">
          <div>
            <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
              Mis gustos del quiz
            </h2>
            <p className="font-body text-xs text-teatro-text-muted mt-0.5">
              Obras seleccionadas durante el onboarding
            </p>
          </div>
          <FavoritesGrid favoritePlayIds={quizFavIds} plays={plays} />
        </section>
      )}

      {/* Recommendations Section */}
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-teatro-text-primary">
          Recomendadas para vos
        </h2>
        <RecommendationsGrid plays={recommendations} />
      </section>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          user={currentUser}
          onSave={updateProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
