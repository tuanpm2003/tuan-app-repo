export type Difficulty = "easy" | "medium" | "hard";

export type GameStatus = "setup" | "playing" | "win" | "lose";

export interface Citation {
  slide: number;
  text: string;
}

export interface Question {
  id: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  citation: Citation;
  documentId: string;
  topic: string;
}

export interface Document {
  id: string;
  title: string;
  topic: string;
  questionCount: number;
}

export interface BattleLogItem {
  id: string;
  timestamp: string;
  message: string;
  type: "damage" | "counter" | "heal" | "bonus" | "info";
}

export interface BattleConfig {
  documentId: string;
  difficulty: Difficulty;
  timeLimit: number; // seconds per question, 0 = no limit
}

export interface GameState {
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  hasAnswered: boolean;
  userHp: number;
  bossHp: number;
  score: number;
  correctCount: number;
  wrongCount: number;
  battleLog: BattleLogItem[];
  gameStatus: GameStatus;
  streak: number;
  maxUserHp: number;
  maxBossHp: number;
  timeRemaining: number;
  config: BattleConfig | null;
}

export interface DamageConfig {
  userDamage: number;
  bossCounter: number;
}

export const DAMAGE_CONFIG: Record<Difficulty, DamageConfig> = {
  easy: { userDamage: 50, bossCounter: 20 },
  medium: { userDamage: 100, bossCounter: 40 },
  hard: { userDamage: 150, bossCounter: 70 },
};

export const INITIAL_USER_HP = 300;
export const INITIAL_BOSS_HP = 1000;
export const STREAK_BONUS_DAMAGE = 50;
export const STREAK_THRESHOLD = 3;
export const HEAL_STREAK = 2;
export const HEAL_AMOUNT = 20;
