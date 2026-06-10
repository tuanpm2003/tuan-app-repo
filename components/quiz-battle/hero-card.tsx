"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HpBar } from "./hp-bar";
import { Shield } from "lucide-react";

interface HeroCardProps {
  name: string;
  currentHp: number;
  maxHp: number;
  status: string;
  isDamaged?: boolean;
}

export function HeroCard({ name, currentHp, maxHp, status, isDamaged }: HeroCardProps) {
  return (
    <Card className={`bg-gradient-to-br from-blue-950 to-purple-950 border-blue-800 transition-all duration-300 ${isDamaged ? 'animate-pulse' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-blue-900 border-4 border-blue-700 flex items-center justify-center">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-100">{name}</h2>
              <p className="text-sm text-blue-300">{status}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <HpBar current={currentHp} max={maxHp} color="blue" />
      </CardContent>
    </Card>
  );
}
