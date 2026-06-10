"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { QuestionCard } from "@/components/quiz-battle/question-card";
import { BossImage } from "@/components/quiz-battle/boss-image";
import { CompactHpBar } from "@/components/quiz-battle/compact-hp-bar";
import { StatPanel } from "@/components/quiz-battle/stat-panel";
import { GameOverScreen } from "@/components/quiz-battle/game-over-screen";
import { BattleSetup } from "@/components/quiz-battle/battle-setup";
import { mockQuestions, availableDocuments } from "@/lib/mock-questions";
import {
  GameState,
  BattleLogItem,
  BattleConfig,
  DAMAGE_CONFIG,
  INITIAL_USER_HP,
  INITIAL_BOSS_HP,
  STREAK_BONUS_DAMAGE,
  STREAK_THRESHOLD,
  HEAL_STREAK,
  HEAL_AMOUNT,
} from "@/types/quiz-battle";
import { FileText } from "lucide-react";

export default function QuizBattlePage() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    hasAnswered: false,
    userHp: INITIAL_USER_HP,
    bossHp: INITIAL_BOSS_HP,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    battleLog: [],
    gameStatus: "setup",
    streak: 0,
    maxUserHp: INITIAL_USER_HP,
    maxBossHp: INITIAL_BOSS_HP,
    timeRemaining: 0,
    config: null,
  });

  const [bossStatus, setBossStatus] = useState("Waiting for your move...");
  const [heroStatus, setHeroStatus] = useState("Ready to fight!");
  const [bossDamaged, setBossDamaged] = useState(false);
  const [heroDamaged, setHeroDamaged] = useState(false);
  const [bossCountering, setBossCountering] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState(mockQuestions);

  useEffect(() => {
    if (gameState.gameStatus === "playing" && gameState.config && gameState.config.timeLimit > 0 && !gameState.hasAnswered) {
      if (gameState.timeRemaining > 0) {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          }));
        }, 1000);
        return () => clearTimeout(timer);
      } else if (gameState.timeRemaining === 0 && !gameState.selectedAnswer) {
        // Time's up! Auto-fail
        handleTimeOut();
      }
    }
  }, [gameState.timeRemaining, gameState.gameStatus, gameState.hasAnswered]);

  const currentQuestion = filteredQuestions[gameState.currentQuestionIndex];
  const damageConfig = currentQuestion ? DAMAGE_CONFIG[currentQuestion.difficulty] : DAMAGE_CONFIG.easy;

  const addLog = (message: string, type: BattleLogItem["type"]) => {
    const newLog: BattleLogItem = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    setGameState((prev) => ({
      ...prev,
      battleLog: [...prev.battleLog, newLog],
    }));
  };

  const handleStartBattle = (config: BattleConfig) => {
    const questions = mockQuestions.filter(
      (q) =>
        q.documentId === config.documentId &&
        q.difficulty === config.difficulty
    );
    
    setFilteredQuestions(questions);
    setGameState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      hasAnswered: false,
      userHp: INITIAL_USER_HP,
      bossHp: INITIAL_BOSS_HP,
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      battleLog: [],
      gameStatus: "playing",
      streak: 0,
      maxUserHp: INITIAL_USER_HP,
      maxBossHp: INITIAL_BOSS_HP,
      timeRemaining: config.timeLimit,
      config,
    });
    setBossStatus("Waiting for your move...");
    setHeroStatus("Ready to fight!");
    addLog("⚔️ Battle started! Defeat Deep Dark Fantasy!", "info");
  };

  const handleTimeOut = () => {
    const counterDamage = damageConfig.bossCounter;
    const newUserHp = Math.max(0, gameState.userHp - counterDamage);

    setBossStatus("Time's up! Counter attacking!");
    setHeroStatus("Taking damage!");
    setBossCountering(true);
    setHeroDamaged(true);
    setTimeout(() => {
      setHeroDamaged(false);
      setBossCountering(false);
      setHeroStatus(newUserHp > 0 ? "Still fighting!" : "Defeated...");
      setBossStatus("Waiting for your move...");
    }, 500);

    addLog(
      `⏰ Time's up! Deep Dark Fantasy countered for ${counterDamage} damage.`,
      "counter"
    );

    setGameState((prev) => ({
      ...prev,
      hasAnswered: true,
      userHp: newUserHp,
      wrongCount: prev.wrongCount + 1,
      streak: 0,
      gameStatus: newUserHp <= 0 ? "lose" : "playing",
    }));

    if (newUserHp <= 0) {
      addLog("💀 Defeat! You have been defeated by Deep Dark Fantasy.", "info");
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (gameState.hasAnswered) return;
    
    setGameState((prev) => ({ ...prev, selectedAnswer: answer }));
    
    // Auto-attack immediately after selection
    setTimeout(() => {
      handleAttack(answer);
    }, 100);
  };

  const handleAttack = (answer: string) => {
    if (gameState.hasAnswered) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setGameState((prev) => ({ ...prev, hasAnswered: true }));

    if (isCorrect) {
      // User deals damage
      let totalDamage = damageConfig.userDamage;
      const newStreak = gameState.streak + 1;

      // Streak bonus
      if (newStreak >= STREAK_THRESHOLD) {
        totalDamage += STREAK_BONUS_DAMAGE;
        addLog(
          `🔥 STREAK BONUS! +${STREAK_BONUS_DAMAGE} damage (${newStreak} streak)`,
          "bonus"
        );
      }

      const newBossHp = Math.max(0, gameState.bossHp - totalDamage);
      
      setBossStatus("Taking damage!");
      setBossDamaged(true);
      setTimeout(() => {
        setBossDamaged(false);
        setBossStatus(newBossHp > 0 ? "Preparing counter..." : "Defeated!");
      }, 500);

      addLog(
        `✅ Correct! You dealt ${totalDamage} damage to Deep Dark Fantasy.`,
        "damage"
      );

      // Heal on streak
      let newUserHp = gameState.userHp;
      if (newStreak % HEAL_STREAK === 0 && newStreak > 0) {
        newUserHp = Math.min(gameState.maxUserHp, gameState.userHp + HEAL_AMOUNT);
        addLog(`💚 Heal! Restored ${HEAL_AMOUNT} HP from streak.`, "heal");
      }

      setGameState((prev) => ({
        ...prev,
        bossHp: newBossHp,
        userHp: newUserHp,
        score: prev.score + totalDamage,
        correctCount: prev.correctCount + 1,
        streak: newStreak,
        gameStatus: newBossHp <= 0 ? "win" : "playing",
      }));

      if (newBossHp <= 0) {
        addLog("🎉 Victory! Deep Dark Fantasy has been defeated!", "info");
      }
    } else {
      // Boss counters
      const counterDamage = damageConfig.bossCounter;
      const newUserHp = Math.max(0, gameState.userHp - counterDamage);

      setBossStatus("Counter attacking!");
      setHeroStatus("Taking damage!");
      setBossCountering(true);
      setHeroDamaged(true);
      setTimeout(() => {
        setHeroDamaged(false);
        setBossCountering(false);
        setHeroStatus(newUserHp > 0 ? "Still fighting!" : "Defeated...");
        setBossStatus("Waiting for your move...");
      }, 500);

      addLog(
        `❌ Wrong! Deep Dark Fantasy countered for ${counterDamage} damage.`,
        "counter"
      );

      setGameState((prev) => ({
        ...prev,
        userHp: newUserHp,
        wrongCount: prev.wrongCount + 1,
        streak: 0,
        gameStatus: newUserHp <= 0 ? "lose" : "playing",
      }));

      if (newUserHp <= 0) {
        addLog("💀 Defeat! You have been defeated by Deep Dark Fantasy.", "info");
      }
    }
  };

  const handleNext = () => {
    if (gameState.currentQuestionIndex < filteredQuestions.length - 1) {
      const newTimeLimit = gameState.config?.timeLimit || 0;
      setGameState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        hasAnswered: false,
        timeRemaining: newTimeLimit,
      }));
      setBossStatus("Waiting for your move...");
      setHeroStatus("Ready to fight!");
      addLog("📖 Next question loaded.", "info");
    } else {
      // No more questions
      if (gameState.bossHp > 0) {
        setGameState((prev) => ({ ...prev, gameStatus: "lose" }));
        addLog("⏰ Out of questions! Deep Dark Fantasy wins.", "info");
      }
    }
  };

  const handleRestart = () => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: "setup",
      battleLog: [],
    }));
  };

  if (gameState.gameStatus === "setup") {
    return <BattleSetup onStart={handleStartBattle} />;
  }

  const selectedDoc = availableDocuments.find((d) => d.id === gameState.config?.documentId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
            AI Study Buddy: Quiz Battle
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-blue-600 text-white">
              <FileText className="mr-1 h-3 w-3" />
              {selectedDoc?.title || "Document"}
            </Badge>
            <Badge variant="outline" className="text-gray-300 border-gray-600">
              Question {gameState.currentQuestionIndex + 1} / {filteredQuestions.length}
            </Badge>
            {gameState.config && gameState.config.difficulty !== "easy" && (
              <Badge variant="outline" className="text-gray-300 border-gray-600 capitalize">
                {gameState.config.difficulty} Mode
              </Badge>
            )}
          </div>
        </div>

        {/* Boss Image - Large and centered */}
            <BossImage
              isDamaged={bossDamaged}
              isCountering={bossCountering}
              isDefeated={gameState.bossHp <= 0}
            />

        {/* Battle Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Question */}
          <div className="lg:col-span-2 space-y-4">
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={gameState.selectedAnswer}
                hasAnswered={gameState.hasAnswered}
                damage={damageConfig.userDamage}
                onSelectAnswer={handleSelectAnswer}
                onNext={handleNext}
                isCorrect={gameState.selectedAnswer === currentQuestion.correctAnswer}
                timeRemaining={gameState.timeRemaining}
                timeLimit={gameState.config?.timeLimit}
              />
            )}
          </div>

          {/* Right: Boss Image & Stats */}
          <div className="space-y-4">
            
            {/* HP Bars - Compact below boss */}
            <div className="space-y-3 bg-gray-900/80 p-4 rounded-lg border border-gray-700">
              <CompactHpBar
                name="Boss HP"
                current={gameState.bossHp}
                max={gameState.maxBossHp}
                color="red"
                isDamaged={bossDamaged}
              />
              <CompactHpBar
                name="Your HP"
                current={gameState.userHp}
                max={gameState.maxUserHp}
                color="blue"
                isDamaged={heroDamaged}
              />
            </div>

            {/* Stats Panel */}
            <StatPanel
              score={gameState.score}
              correctCount={gameState.correctCount}
              wrongCount={gameState.wrongCount}
              remainingQuestions={filteredQuestions.length - gameState.currentQuestionIndex - 1}
              streak={gameState.streak}
            />
          </div>
        </div>
      </div>

      {/* Game Over Screen */}
      {gameState.gameStatus !== "playing" && (
        <GameOverScreen
          status={gameState.gameStatus}
          score={gameState.score}
          correctCount={gameState.correctCount}
          wrongCount={gameState.wrongCount}
          totalQuestions={filteredQuestions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
