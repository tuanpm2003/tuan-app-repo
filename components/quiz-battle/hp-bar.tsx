interface HpBarProps {
  current: number;
  max: number;
  color?: "red" | "green" | "blue";
  showNumbers?: boolean;
}

export function HpBar({ current, max, color = "red", showNumbers = true }: HpBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };

  return (
    <div className="space-y-1">
      <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
        {showNumbers && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
            {current} / {max}
          </div>
        )}
      </div>
    </div>
  );
}
