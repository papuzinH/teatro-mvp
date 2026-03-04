interface RankingBadgeProps {
  position: number;
}

export default function RankingBadge({ position }: RankingBadgeProps) {
  return (
    <div className="absolute top-2 left-2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#d4a853] shadow-lg">
      <span className="text-white text-xs font-bold font-body leading-none">
        #{position}
      </span>
    </div>
  );
}
