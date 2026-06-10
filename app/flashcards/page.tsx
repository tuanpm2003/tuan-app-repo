"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { flashcards } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground">Review key concepts with flashcards</p>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Card {currentIndex + 1} of {flashcards.length}
      </div>

      <Card className="min-h-[400px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-center">{currentCard.documentTitle}</CardTitle>
          <div className="text-center text-sm text-muted-foreground">{currentCard.topic}</div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <div className="text-lg font-semibold mb-4">
              {showAnswer ? "Answer:" : "Question:"}
            </div>
            <div className="text-xl">
              {showAnswer ? currentCard.answer : currentCard.question}
            </div>
          </div>

          {!showAnswer ? (
            <Button onClick={() => setShowAnswer(true)} size="lg">
              Show Answer
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleNext}>
                Hard
              </Button>
              <Button variant="outline" onClick={handleNext}>
                Medium
              </Button>
              <Button onClick={handleNext}>Easy</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="ghost" onClick={() => setShowAnswer(false)}>
          <RotateCw className="mr-2 h-4 w-4" />
          Flip Card
        </Button>
        <Button variant="outline" onClick={handleNext}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
