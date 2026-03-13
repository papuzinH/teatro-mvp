
interface RushTicketCardProps {
  rushPrice: number;
  isUnlocked: boolean;
  onToggle: () => void;
}

export default function RushTicketCard({ rushPrice, isUnlocked, onToggle }: RushTicketCardProps) {
  const formattedPrice = rushPrice.toLocaleString('es-AR');

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#e91e63] to-[#c2185b] p-4">
      {/* Decorative shape */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" fill="white">
          <polygon points="100,0 100,100 0,100" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 text-lg">⚡</span>
            <h3 className="font-display font-bold text-white text-base">
              {isUnlocked ? 'Rush unlocked' : `$${formattedPrice} Rush tickets`}
            </h3>
          </div>
          <button className="text-white/70 hover:text-white" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>

        {/* Description */}
        {!isUnlocked && (
          <p className="font-body text-sm text-white/90 mb-4">
            Desbloqueá Rush para acceder a entradas a ${formattedPrice}. Las entradas Rush pueden ser vista parcial.
          </p>
        )}

        {/* Action button */}
        <button
          type="button"
          onClick={onToggle}
          className="w-full bg-white text-[#c2185b] font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-white/90 transition-colors"
        >
          {isUnlocked ? 'Cancelar alerta' : 'Desbloquear ahora'}
        </button>
      </div>
    </div>
  );
}
