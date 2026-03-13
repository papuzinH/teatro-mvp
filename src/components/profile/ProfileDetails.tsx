import type { User } from '@/types';
import { capitalizeFirst } from '@/lib/formatters';

interface ProfileDetailsProps {
  user: User;
  onEdit: () => void;
}

export default function ProfileDetails({ user, onEdit }: ProfileDetailsProps) {
  const details = [
    user.bio && { icon: '💬', label: 'Bio', value: user.bio },
    user.age && { icon: '🎂', label: 'Edad', value: `${user.age} años` },
    user.neighborhood && { icon: '📍', label: 'Barrio', value: user.neighborhood },
    user.favoriteGenres && user.favoriteGenres.length > 0 && {
      icon: '🎭', label: 'Géneros', value: user.favoriteGenres.map(capitalizeFirst).join(', ')
    },
    user.theaterFrequency && { icon: '📅', label: 'Frecuencia', value: user.theaterFrequency },
    user.companions && { icon: '👥', label: 'Suelo ir con', value: user.companions },
    user.instagram && { icon: '📸', label: 'Instagram', value: `@${user.instagram}` },
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  const hasDetails = details.length > 0;

  return (
    <div className="bg-teatro-surface rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-teatro-text-primary">
          Sobre mí
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="font-body text-xs text-teatro-gold font-medium hover:underline"
        >
          {hasDetails ? 'Editar' : 'Completar perfil'}
        </button>
      </div>

      {hasDetails ? (
        <div className="space-y-2.5">
          {details.map((d) => (
            <div key={d.label} className="flex items-start gap-2.5">
              <span className="text-sm mt-0.5 w-5 text-center shrink-0">{d.icon}</span>
              <div className="min-w-0">
                <p className="font-body text-[11px] text-teatro-text-muted uppercase tracking-wider">{d.label}</p>
                <p className="font-body text-sm text-teatro-text-primary">{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-body text-sm text-teatro-text-muted text-center py-4">
          Completá tu perfil para conectar con otros teatreros 🎭
        </p>
      )}
    </div>
  );
}
