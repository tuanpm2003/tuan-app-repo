"use client";

interface CompactHpBarProps {
  name: string;
  current: number;
  max: number;
  color?: "red" | "blue";
  isDamaged?: boolean;
}

export function CompactHpBar({ name, current, max, color = "red", isDamaged }: CompactHpBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const colorClasses = {
    red: {
      bg: "bg-red-500",
      glow: "shadow-red-500/50",
      text: "text-red-100",
    },
    blue: {
      bg: "bg-blue-500",
      glow: "shadow-blue-500/50",
      text: "text-blue-100",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={`relative transition-all duration-300 ${isDamaged ? 'animate-pulse' : ''}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-sm font-bold ${colors.text}`}>{name}</span>
        <span className={`text-xs font-bold ${colors.text}`}>
          {current} / {max}
        </span>
      </div>
      <div className={`relative h-4 bg-gray-800 rounded-full overflow-hidden border-2 ${
        isDamaged ? `border-${color}-400 ${colors.glow} shadow-lg` : 'border-gray-700'
      }`}>
        <div
          className={`h-full ${colors.bg} transition-all duration-500 ease-out ${
            isDamaged ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
        {isDamaged && color === "blue" && (
          <div className="absolute inset-0 bg-red-500/40 animate-pulse" />
        )}
      </div>
    </div>
  );
}
