"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/quiz-battle";
import { DifficultyBadge } from "./difficulty-badge";
import { CheckCircle2, XCircle, BookOpen, Clock } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  hasAnswered: boolean;
  damage: number;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  isCorrect?: boolean;
  timeRemaining?: number;
  timeLimit?: number;
}

export function QuestionCard({
  question,
  selectedAnswer,
  hasAnswered,
  damage,
  onSelectAnswer,
  onNext,
  isCorrect,
  timeRemaining = 0,
  timeLimit = 0,
}: QuestionCardProps) {
  const showTimer = timeLimit > 0;
  const timePercentage = timeLimit > 0 ? (timeRemaining / timeLimit) * 100 : 100;
  const isTimeWarning = timePercentage < 30;
  const isTimeCritical = timePercentage < 10;

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <DifficultyBadge difficulty={question.difficulty} showDamage damage={damage} />
          {showTimer && !hasAnswered && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              isTimeCritical ? 'bg-red-900 animate-pulse' : isTimeWarning ? 'bg-orange-900' : 'bg-gray-800'
            }`}>
              <Clock className={`h-4 w-4 ${isTimeCritical ? 'text-red-400' : isTimeWarning ? 'text-orange-400' : 'text-gray-400'}`} />
              <span className={`font-bold ${isTimeCritical ? 'text-red-400' : isTimeWarning ? 'text-orange-400' : 'text-gray-300'}`}>
                {timeRemaining}s
              </span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl text-gray-100">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === question.correctAnswer;
            const showResult = hasAnswered;

            let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
            
            if (!hasAnswered) {
              buttonClass += isSelected
                ? "border-blue-500 bg-blue-950"
                : "border-gray-700 bg-gray-800 hover:border-gray-600 hover:bg-gray-750";
            } else {
              if (isCorrectAnswer) {
                buttonClass += "border-green-500 bg-green-950";
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += "border-red-500 bg-red-950";
              } else {
                buttonClass += "border-gray-700 bg-gray-800";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !hasAnswered && onSelectAnswer(option)}
                disabled={hasAnswered}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-100">{option}</span>
                  {showResult && isCorrectAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div className="space-y-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
              <span className="font-semibold text-lg text-gray-100">
                {isCorrect ? "Correct!" : "Incorrect"}
              </span>
            </div>
            <p className="text-sm text-gray-300">{question.explanation}</p>
            <div className="flex items-start gap-2 p-3 bg-gray-900 rounded border border-gray-700">
              <BookOpen className="h-4 w-4 text-blue-400 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-blue-400">
                  Citation: Slide {question.citation.slide}
                </div>
                <div className="text-gray-400 mt-1">{question.citation.text}</div>
              </div>
            </div>
          </div>
        )}

        {hasAnswered && (
          <Button
            onClick={onNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-6"
          >
            Next Question →
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
