"use client";

import { useEffect, useState } from "react";

interface BossImageProps {
  isDamaged?: boolean;
  isCountering?: boolean;
  isDefeated?: boolean;
}

export function BossImage({ isDamaged, isCountering, isDefeated }: BossImageProps) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (isDamaged) {
      setFlash(true);
      setTimeout(() => setFlash(false), 500);
    }
  }, [isDamaged]);

  return (
    <div className={`relative w-full h-[500px] aspect-square rounded-2xl overflow-hidden border-4 ${
      isDefeated ? 'border-gray-700' : isDamaged ? 'border-red-500' : isCountering ? 'border-orange-500' : 'border-purple-700'
    } ${isDefeated ? 'opacity-50 grayscale' : ''} transition-all duration-300`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-purple-900 to-black" />

      {/* Boss content */}
      

      {/* Actual image overlay (if exists) */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        flash ? 'opacity-0' : 'opacity-100'
      }`}>
        <img
          src="/dragon-boss.png"
          alt="Deep Dark Fantasy Boss"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Flash effect when damaged */}
      {flash && (
        <div className="absolute inset-0 bg-white animate-ping" />
      )}

      {/* Counter overlay */}
      {isCountering && (
        <div className="absolute inset-0 bg-orange-500/20" />
      )}

      {/* Defeat overlay */}
      {isDefeated && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-8xl animate-bounce">💀</div>
        </div>
      )}

      {/* Particle effects for counter */}
      {isCountering && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-orange-500 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
