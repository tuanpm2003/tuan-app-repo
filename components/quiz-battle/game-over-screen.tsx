"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Skull, RotateCcw } from "lucide-react";
import { GameStatus } from "@/types/quiz-battle";

interface GameOverScreenProps {
  status: GameStatus;
  score: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function GameOverScreen({
  status,
  score,
  correctCount,
  wrongCount,
  totalQuestions,
  onRestart,
}: GameOverScreenProps) {
  const isWin = status === "win";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card
        className={`max-w-md w-full ${
          isWin
            ? "bg-gradient-to-br from-green-950 to-blue-950 border-green-600"
            : "bg-gradient-to-br from-red-950 to-gray-950 border-red-600"
        }`}
      >
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isWin ? (
              <Trophy className="h-24 w-24 text-yellow-400" />
            ) : (
              <Skull className="h-24 w-24 text-red-400" />
            )}
          </div>
          <CardTitle className="text-4xl font-bold text-white">
            {isWin ? "🎉 VICTORY!" : "💀 DEFEATED"}
          </CardTitle>
          <p className="text-lg text-gray-300 mt-2">
            {isWin
              ? "You have defeated Deep Dark Fantasy!"
              : "Deep Dark Fantasy has defeated you..."}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-black/30 rounded">
              <span className="text-gray-300">Final Score</span>
              <span className="font-bold text-yellow-400 text-xl">{score}</span>
            </div>
            <div className="flex justify-between p-3 bg-black/30 rounded">
              <span className="text-gray-300">Correct Answers</span>
              <span className="font-bold text-green-400">
                {correctCount} / {totalQuestions}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-black/30 rounded">
              <span className="text-gray-300">Wrong Answers</span>
              <span className="font-bold text-red-400">{wrongCount}</span>
            </div>
            <div className="flex justify-between p-3 bg-black/30 rounded">
              <span className="text-gray-300">Accuracy</span>
              <span className="font-bold text-blue-400">
                {totalQuestions > 0
                  ? Math.round((correctCount / totalQuestions) * 100)
                  : 0}
                %
              </span>
            </div>
          </div>

          <Button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg py-6"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Restart Battle
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
