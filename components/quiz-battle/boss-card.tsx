"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HpBar } from "./hp-bar";
import { Skull } from "lucide-react";

interface BossCardProps {
  name: string;
  currentHp: number;
  maxHp: number;
  status: string;
  isDamaged?: boolean;
}

export function BossCard({ name, currentHp, maxHp, status, isDamaged }: BossCardProps) {
  return (
    <Card className={`bg-gradient-to-br from-red-950 to-purple-950 border-red-800 transition-all duration-300 ${isDamaged ? 'animate-pulse' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-red-900 border-4 border-red-700 flex items-center justify-center">
              <Skull className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-100">{name}</h2>
              <p className="text-sm text-red-300">{status}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <HpBar current={currentHp} max={maxHp} color="red" />
      </CardContent>
    </Card>
  );
}
