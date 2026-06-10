"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BattleLogItem } from "@/types/quiz-battle";
import { Sword, Shield, Heart, Zap, Info } from "lucide-react";
import { useEffect, useRef } from "react";

interface BattleLogProps {
  logs: BattleLogItem[];
}

export function BattleLog({ logs }: BattleLogProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getIcon = (type: BattleLogItem["type"]) => {
    switch (type) {
      case "damage":
        return <Sword className="h-4 w-4 text-red-400" />;
      case "counter":
        return <Shield className="h-4 w-4 text-orange-400" />;
      case "heal":
        return <Heart className="h-4 w-4 text-green-400" />;
      case "bonus":
        return <Zap className="h-4 w-4 text-yellow-400" />;
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-700 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-100">Battle Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {logs.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Battle log will appear here...</p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-2 text-sm p-2 rounded bg-gray-800 border border-gray-700"
              >
                {getIcon(log.type)}
                <div className="flex-1">
                  <p className="text-gray-200">{log.message}</p>
                  <p className="text-xs text-gray-500">{log.timestamp}</p>
                </div>
              </div>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      </CardContent>
    </Card>
  );
}
