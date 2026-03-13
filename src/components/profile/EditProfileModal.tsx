import { useState } from 'react';
import type { User } from '@/types';
import type { Genre } from '@/types/play';
import Modal from '@/components/ui/Modal';
import { capitalizeFirst } from '@/lib/formatters';

interface EditProfileModalProps {
  user: User;
  onSave: (data: Partial<User>) => void;
  onClose: () => void;
}

const GENRE_OPTIONS: Genre[] = ['drama', 'comedia', 'musical', 'suspenso', 'infantil', 'experimental', 'clasico'];
const FREQUENCY_OPTIONS = ['Todas las semanas', '2-3 veces al mes', '1 vez al mes', 'Cada 2-3 meses', 'Pocas veces al año'];
const COMPANIONS_OPTIONS = ['Solo/a', 'En pareja', 'Con amigos', 'En familia', 'Variable'];

export default function EditProfileModal({ user, onSave, onClose }: EditProfileModalProps) {
  const [bio, setBio] = useState(user.bio ?? '');
  const [age, setAge] = useState(user.age?.toString() ?? '');
  const [neighborhood, setNeighborhood] = useState(user.neighborhood ?? '');
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(user.favoriteGenres ?? []);
  const [theaterFrequency, setTheaterFrequency] = useState(user.theaterFrequency ?? '');
  const [companions, setCompanions] = useState(user.companions ?? '');
  const [instagram, setInstagram] = useState(user.instagram ?? '');

  const toggleGenre = (g: string) => {
    setFavoriteGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const handleSave = () => {
    const parsedAge = parseInt(age, 10);
    onSave({
      bio: bio.trim() || undefined,
      age: !isNaN(parsedAge) && parsedAge > 0 && parsedAge < 120 ? parsedAge : undefined,
      neighborhood: neighborhood.trim() || undefined,
      favoriteGenres: favoriteGenres.length > 0 ? favoriteGenres : undefined,
      theaterFrequency: theaterFrequency || undefined,
      companions: companions || undefined,
      instagram: instagram.trim().replace(/^@/, '') || undefined,
    });
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose}>
      <div className="space-y-5 max-h-[70vh] overflow-y-auto">
        <h2 className="font-display text-xl text-teatro-text-primary font-bold">
          Editar perfil
        </h2>

        {/* Bio */}
        <Field label="Bio">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={140}
            rows={2}
            placeholder="Algo sobre vos..."
            className="w-full bg-teatro-surface border border-teatro-surface-light rounded-xl px-3 py-2 text-sm font-body text-teatro-text-primary placeholder:text-teatro-text-muted resize-none focus:outline-none focus:border-teatro-gold/50"
          />
          <p className="text-right text-[11px] font-body text-teatro-text-muted">{bio.length}/140</p>
        </Field>

        {/* Age + Neighborhood row */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Edad">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={1}
              max={119}
              placeholder="25"
              className="w-full bg-teatro-surface border border-teatro-surface-light rounded-xl px-3 py-2 text-sm font-body text-teatro-text-primary placeholder:text-teatro-text-muted focus:outline-none focus:border-teatro-gold/50"
            />
          </Field>
          <Field label="Barrio">
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              maxLength={30}
              placeholder="Palermo"
              className="w-full bg-teatro-surface border border-teatro-surface-light rounded-xl px-3 py-2 text-sm font-body text-teatro-text-primary placeholder:text-teatro-text-muted focus:outline-none focus:border-teatro-gold/50"
            />
          </Field>
        </div>

        {/* Genres */}
        <Field label="Géneros favoritos">
          <div className="flex flex-wrap gap-2">
            {GENRE_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => toggleGenre(g)}
                className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                  favoriteGenres.includes(g)
                    ? 'bg-teatro-gold text-teatro-bg'
                    : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-secondary hover:border-teatro-gold/30'
                }`}
              >
                {capitalizeFirst(g)}
              </button>
            ))}
          </div>
        </Field>

        {/* Frequency */}
        <Field label="Frecuencia al teatro">
          <div className="flex flex-wrap gap-2">
            {FREQUENCY_OPTIONS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setTheaterFrequency(f === theaterFrequency ? '' : f)}
                className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                  theaterFrequency === f
                    ? 'bg-teatro-gold text-teatro-bg'
                    : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-secondary hover:border-teatro-gold/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Field>

        {/* Companions */}
        <Field label="Suelo ir con">
          <div className="flex flex-wrap gap-2">
            {COMPANIONS_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCompanions(c === companions ? '' : c)}
                className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                  companions === c
                    ? 'bg-teatro-gold text-teatro-bg'
                    : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-secondary hover:border-teatro-gold/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Field>

        {/* Instagram */}
        <Field label="Instagram">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-teatro-text-muted">@</span>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              maxLength={30}
              placeholder="tu_usuario"
              className="w-full bg-teatro-surface border border-teatro-surface-light rounded-xl pl-8 pr-3 py-2 text-sm font-body text-teatro-text-primary placeholder:text-teatro-text-muted focus:outline-none focus:border-teatro-gold/50"
            />
          </div>
        </Field>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-teatro-surface-light text-teatro-text-secondary font-body text-sm hover:bg-teatro-surface transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 px-4 py-3 rounded-xl bg-teatro-gold text-teatro-bg font-body font-bold text-sm hover:bg-teatro-gold/90 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="font-body text-xs text-teatro-text-muted font-medium uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
