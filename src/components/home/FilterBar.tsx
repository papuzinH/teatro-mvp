import type { Genre, Circuit } from '@/types';

export interface Filters {
  genre?: Genre;
  circuit?: Circuit;
  maxPrice?: number;
}

interface FilterBarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const GENRES: { value: Genre; label: string }[] = [
  { value: 'comedia', label: 'Comedia' },
  { value: 'drama', label: 'Drama' },
  { value: 'musical', label: 'Musical' },
  { value: 'infantil', label: 'Infantil' },
  { value: 'suspenso', label: 'Suspenso' },
  { value: 'clasico', label: 'Clásico' },
  { value: 'experimental', label: 'Experimental' },
];

const PRICE_RANGES: { value: number | undefined; label: string }[] = [
  { value: undefined, label: 'Cualquier precio' },
  { value: 5000, label: 'Hasta $5.000' },
  { value: 10000, label: 'Hasta $10.000' },
  { value: 15000, label: 'Hasta $15.000' },
];

export default function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const hasAnyFilter = filters.genre || filters.circuit || filters.maxPrice;

  function toggleGenre(genre: Genre) {
    onFiltersChange({
      ...filters,
      genre: filters.genre === genre ? undefined : genre,
    });
  }

  function toggleCircuit(circuit: Circuit) {
    onFiltersChange({
      ...filters,
      circuit: filters.circuit === circuit ? undefined : circuit,
    });
  }

  function setMaxPrice(maxPrice: number | undefined) {
    onFiltersChange({ ...filters, maxPrice });
  }

  function clearAll() {
    onFiltersChange({});
  }

  return (
    <div className="space-y-2">
      {/* Genre chips */}
      <div className="flex flex-wrap gap-1.5">
        {GENRES.map((g) => (
          <button
            key={g.value}
            type="button"
            onClick={() => toggleGenre(g.value)}
            className={`px-3 py-1 rounded-full text-xs font-body transition-colors ${
              filters.genre === g.value
                ? 'bg-teatro-gold text-teatro-bg font-semibold'
                : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-secondary hover:border-teatro-gold/40'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Second row: circuit + price */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => toggleCircuit('comercial')}
          className={`px-3 py-1 rounded-full text-xs font-body transition-colors ${
            filters.circuit === 'comercial'
              ? 'bg-teatro-gold text-teatro-bg font-semibold'
              : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-secondary hover:border-teatro-gold/40'
          }`}
        >
          Comercial
        </button>
        <button
          type="button"
          onClick={() => toggleCircuit('independiente')}
          className={`px-3 py-1 rounded-full text-xs font-body transition-colors ${
            filters.circuit === 'independiente'
              ? 'bg-teatro-gold text-teatro-bg font-semibold'
              : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-secondary hover:border-teatro-gold/40'
          }`}
        >
          Independiente
        </button>

        <span className="w-px h-5 bg-teatro-surface-light self-center mx-1" />

        {PRICE_RANGES.slice(1).map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setMaxPrice(filters.maxPrice === p.value ? undefined : p.value)}
            className={`px-3 py-1 rounded-full text-xs font-body transition-colors ${
              filters.maxPrice === p.value
                ? 'bg-teatro-gold text-teatro-bg font-semibold'
                : 'bg-teatro-surface border border-teatro-surface-light text-teatro-text-secondary hover:border-teatro-gold/40'
            }`}
          >
            {p.label}
          </button>
        ))}

        {hasAnyFilter && (
          <button
            type="button"
            onClick={clearAll}
            className="px-3 py-1 rounded-full text-xs font-body text-teatro-crimson border border-teatro-crimson/30 hover:bg-teatro-crimson/10 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
