import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, CheckCircle, XCircle, ListOrdered } from "lucide-react";

interface StatPanelProps {
  score: number;
  correctCount: number;
  wrongCount: number;
  remainingQuestions: number;
  streak: number;
}

export function StatPanel({
  score,
  correctCount,
  wrongCount,
  remainingQuestions,
  streak,
}: StatPanelProps) {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-100">Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Score</span>
          </div>
          <span className="font-bold text-yellow-400">{score}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-300">Correct</span>
          </div>
          <span className="font-bold text-green-400">{correctCount}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-400" />
            <span className="text-sm text-gray-300">Wrong</span>
          </div>
          <span className="font-bold text-red-400">{wrongCount}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
          <div className="flex items-center gap-2">
            <ListOrdered className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">Remaining</span>
          </div>
          <span className="font-bold text-blue-400">{remainingQuestions}</span>
        </div>
        {streak >= 2 && (
          <div className="p-2 bg-gradient-to-r from-orange-900 to-yellow-900 rounded border border-yellow-600">
            <div className="text-center">
              <div className="text-xs text-yellow-200">🔥 STREAK</div>
              <div className="text-2xl font-bold text-yellow-400">{streak}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
