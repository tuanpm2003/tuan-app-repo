import { Badge } from "@/components/ui/badge";
import { Difficulty } from "@/types/quiz-battle";
import { Sword, Swords, Flame } from "lucide-react";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  showDamage?: boolean;
  damage?: number;
}

export function DifficultyBadge({ difficulty, showDamage = false, damage }: DifficultyBadgeProps) {
  const config = {
    easy: {
      color: "bg-green-500 hover:bg-green-600",
      icon: Sword,
      label: "Easy",
    },
    medium: {
      color: "bg-yellow-500 hover:bg-yellow-600",
      icon: Swords,
      label: "Medium",
    },
    hard: {
      color: "bg-red-500 hover:bg-red-600",
      icon: Flame,
      label: "Hard",
    },
  };

  if (difficulty === "easy") {
  return null;
}

  const { color, icon: Icon, label } = config[difficulty];

  return (
    <Badge className={`${color} text-white flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {label}
      {showDamage && damage && <span className="ml-1">• {damage} DMG</span>}
    </Badge>
  );
}
