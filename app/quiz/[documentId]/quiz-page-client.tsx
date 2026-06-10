"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quizQuestions } from "@/lib/mock-data";
import { CheckCircle2, XCircle } from "lucide-react";

export default function QuizPageClient({ documentId }: { documentId: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
              <div className="text-muted-foreground">
                You scored {score} out of {quizQuestions.length}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-lg font-semibold">Weak Topics Identified:</div>
              <div className="space-y-1">
                {score < quizQuestions.length && (
                  <>
                    <div className="text-sm text-muted-foreground">â€¢ NAT Gateway Configuration</div>
                    <div className="text-sm text-muted-foreground">â€¢ Security Group Rules</div>
                  </>
                )}
                {score === quizQuestions.length && (
                  <div className="text-sm text-green-600">Perfect score! No weak topics.</div>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Back to Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Quiz</h1>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showResult && setSelectedAnswer(idx)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  selectedAnswer === idx
                    ? showResult
                      ? idx === question.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-primary bg-primary/5"
                    : showResult && idx === question.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1">{option}</div>
                  {showResult && idx === question.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === idx && idx !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
              <div className="font-semibold">
                {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
              </div>
              <div className="text-sm">{question.explanation}</div>
              <div className="text-sm text-muted-foreground">
                Citation: Slide {question.citationSlide} - {question.citationText}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>
            {!showResult ? (
              <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
