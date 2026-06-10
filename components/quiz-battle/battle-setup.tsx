"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availableDocuments, mockQuestions } from "@/lib/mock-questions";
import { BattleConfig, Difficulty } from "@/types/quiz-battle";
import { Swords, FileText, Gauge, Clock } from "lucide-react";

interface BattleSetupProps {
  onStart: (config: BattleConfig) => void;
}

export function BattleSetup({ onStart }: BattleSetupProps) {
  const [documentId, setDocumentId] = useState<string>(availableDocuments[0].id);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [timeLimit, setTimeLimit] = useState<number>(0);

  const selectedDoc = availableDocuments.find((d) => d.id === documentId);
  const filteredQuestions = mockQuestions.filter(
    (q) =>
      q.documentId === documentId &&
      (difficulty === "easy" || q.difficulty === difficulty)
  );

  const handleStart = () => {
    if (filteredQuestions.length === 0) {
      alert("No questions available for this configuration!");
      return;
    }
    onStart({ documentId, difficulty, timeLimit });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full bg-gray-900 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Swords className="h-16 w-16 text-red-400" />
          </div>
          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
            Quiz Battle Setup
          </CardTitle>
          <CardDescription className="text-gray-400 text-lg">
            Configure your battle against Deep Dark Fantasy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Document Selection */}
          <div className="space-y-2">
            <Label htmlFor="document" className="text-gray-200 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Select Document
            </Label>
            <Select value={documentId} onValueChange={setDocumentId}>
              <SelectTrigger id="document" className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {availableDocuments.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id} className="text-gray-100">
                    {doc.title} ({doc.questionCount} questions)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDoc && (
              <p className="text-sm text-gray-400">
                Topic: {selectedDoc.topic}
              </p>
            )}
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-gray-200 flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Difficulty Level
            </Label>
            <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
              <SelectTrigger id="difficulty" className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-gray-100">
                  All Difficulties (Mixed)
                </SelectItem>
                <SelectItem value="easy" className="text-green-400">
                  Easy Only (50 DMG / 20 Counter)
                </SelectItem>
                <SelectItem value="medium" className="text-yellow-400">
                  Medium Only (100 DMG / 40 Counter)
                </SelectItem>
                <SelectItem value="hard" className="text-red-400">
                  Hard Only (150 DMG / 70 Counter)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Limit Selection */}
          <div className="space-y-2">
            <Label htmlFor="time" className="text-gray-200 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Limit per Question
            </Label>
            <Select value={timeLimit.toString()} onValueChange={(v) => setTimeLimit(Number(v))}>
              <SelectTrigger id="time" className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="0" className="text-gray-100">
                  No Time Limit
                </SelectItem>
                <SelectItem value="10" className="text-gray-100">
                  10 seconds
                </SelectItem>
                <SelectItem value="15" className="text-gray-100">
                  15 seconds
                </SelectItem>
                <SelectItem value="20" className="text-gray-100">
                  20 seconds
                </SelectItem>
                <SelectItem value="30" className="text-gray-100">
                  30 seconds
                </SelectItem>
                <SelectItem value="45" className="text-gray-100">
                  45 seconds
                </SelectItem>
                <SelectItem value="60" className="text-gray-100">
                  60 seconds
                </SelectItem>
              </SelectContent>
            </Select>
            {timeLimit > 0 && (
              <p className="text-sm text-yellow-400">
                ⚠️ If time runs out, boss will counter automatically!
              </p>
            )}
          </div>

          {/* Battle Preview */}
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-2">
            <div className="text-sm font-semibold text-gray-200">Battle Preview:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">Questions Available:</div>
              <div className="text-gray-100 font-semibold">{filteredQuestions.length}</div>
              <div className="text-gray-400">Boss HP:</div>
              <div className="text-red-400 font-semibold">1000</div>
              <div className="text-gray-400">Your HP:</div>
              <div className="text-blue-400 font-semibold">300</div>
              <div className="text-gray-400">Time Pressure:</div>
              <div className="text-gray-100 font-semibold">
                {timeLimit > 0 ? `${timeLimit}s per question` : "None"}
              </div>
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStart}
            disabled={filteredQuestions.length === 0}
            className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold text-lg py-6"
          >
            <Swords className="mr-2 h-5 w-5" />
            Start Battle
          </Button>

          {filteredQuestions.length === 0 && (
            <p className="text-center text-red-400 text-sm">
              No questions available for this configuration. Try different settings.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
