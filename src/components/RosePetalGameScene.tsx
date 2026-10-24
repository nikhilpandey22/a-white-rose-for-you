import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Gift, Trophy, ArrowLeft } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface PetalItem {
  id: number;
  message: string;
  x: number; // percentage
  y: number; // percentage
  size: number;
  rotation: number;
  speed: number;
}

interface RosePetalGameSceneProps {
  petalMessages: string[];
  onCompleteGame: () => void;
  onBack: () => void;
}

export const RosePetalGameScene: React.FC<RosePetalGameSceneProps> = ({
  petalMessages,
  onCompleteGame,
  onBack,
}) => {
  const [collectedPetalIds, setCollectedPetalIds] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [sparklePops, setSparklePops] = useState<{ id: number; x: number; y: number }[]>([]);

  // 5 distinct floating petals positioned gracefully
  const [petals, setPetals] = useState<PetalItem[]>([]);

  const initializePetals = () => {
    const initialPositions = [
      { x: 18, y: 22, size: 48, speed: 4.2 },
      { x: 74, y: 26, size: 44, speed: 4.8 },
      { x: 46, y: 48, size: 52, speed: 3.8 },
      { x: 22, y: 72, size: 46, speed: 5.1 },
      { x: 78, y: 74, size: 50, speed: 4.5 },
    ];

    const generated = petalMessages.slice(0, 5).map((msg, idx) => ({
      id: idx + 1,
      message: msg,
      x: initialPositions[idx].x,
      y: initialPositions[idx].y,
      size: initialPositions[idx].size,
      rotation: (idx * 65) % 360,
      speed: initialPositions[idx].speed,
    }));

    setPetals(generated);
    setCollectedPetalIds([]);
    setActiveMessage(null);
  };

  useEffect(() => {
    initializePetals();
  }, [petalMessages]);

  const handleCollectPetal = (petal: PetalItem) => {
    if (collectedPetalIds.includes(petal.id)) return;

    romanticAudio.playPetalCollectSound();

    // Trigger visual pop sparkle
    const popId = Date.now();
    setSparklePops((prev) => [...prev, { id: popId, x: petal.x, y: petal.y }]);
    setTimeout(() => {
      setSparklePops((prev) => prev.filter((p) => p.id !== popId));
    }, 1000);

    const nextCollected = [...collectedPetalIds, petal.id];
    setCollectedPetalIds(nextCollected);
    setActiveMessage(petal.message);

    // If all collected, trigger celebration chime
    if (nextCollected.length === 5) {
      setTimeout(() => {
        romanticAudio.playHugChime();
      }, 400);
    }
  };

  const handleResetGame = () => {
    initializePetals();
  };

  const isMissionComplete = collectedPetalIds.length === 5;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-between px-4 py-6 max-w-4xl mx-auto text-center">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between gap-4 mb-2">
        <button
          onClick={onBack}
          className="min-h-[44px] px-3.5 py-2 rounded-full bg-white text-[#735364] hover:text-[#563C4A] border border-[#D9A5B3]/40 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Pichhla Scene</span>
        </button>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#735364] font-medium flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
            Mini Love Game
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#563C4A]">
            Mission: White Rose Unlock Karo 🌹
          </h2>
        </div>

        <button
          onClick={handleResetGame}
          title="Reset game"
          aria-label="Reset petal collection"
          className="min-h-[44px] px-3.5 py-2 rounded-full bg-white text-[#735364] hover:text-[#563C4A] border border-[#D9A5B3]/40 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Progress & instructions */}
      <div className="my-2 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs sm:text-sm font-semibold text-[#563C4A]">
            Petals collected: {collectedPetalIds.length} / 5
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`w-3 h-3 rounded-full transition-all ${
                  collectedPetalIds.includes(num)
                    ? 'bg-[#563C4A] scale-110 shadow-xs'
                    : 'bg-[#D9A5B3]/40 border border-[#D9A5B3]/60'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-[#735364]">
          Garden mein ghoomte hue white petals par tap karke unhe collect karo 🤍
        </p>
      </div>

      {/* Interactive Garden Playing Field */}
      <div className="relative w-full h-[360px] sm:h-[420px] my-3 rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF1F5] to-[#F5E6ED] border border-[#D9A5B3]/40 shadow-inner overflow-hidden select-none">
        {/* Soft background radial lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FFFDF8] blur-2xl opacity-70 pointer-events-none" />

        {/* Dynamic Sparkle Pops */}
        {sparklePops.map((pop) => (
          <div
            key={pop.id}
            className="absolute pointer-events-none z-30 animate-ping"
            style={{
              left: `${pop.x}%`,
              top: `${pop.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-12 h-12 rounded-full bg-white/90 border border-[#D9A5B3] flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-[#D9A5B3]" />
            </div>
          </div>
        ))}

        {/* 5 Floating Interactive Petals */}
        {petals.map((petal) => {
          const isCollected = collectedPetalIds.includes(petal.id);
          if (isCollected) return null;

          return (
            <button
              key={petal.id}
              onClick={() => handleCollectPetal(petal)}
              style={{
                left: `${petal.x}%`,
                top: `${petal.y}%`,
                transform: `translate(-50%, -50%) rotate(${petal.rotation}deg)`,
                animation: `floatSlow ${petal.speed}s ease-in-out infinite`,
              }}
              aria-label={`Collect white rose petal number ${petal.id}`}
              className="absolute z-20 cursor-pointer p-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3] group transition-transform active:scale-95"
            >
              {/* Petal Artwork */}
              <div className="relative">
                <svg
                  width={petal.size}
                  height={petal.size * 1.3}
                  viewBox="0 0 40 50"
                  fill="none"
                  className="drop-shadow-md group-hover:scale-110 transition-transform"
                >
                  <path
                    d="M 20 2 C 36 2 39 24 33 42 C 28 49 12 49 7 42 C 1 24 4 2 20 2 Z"
                    fill="url(#gamePetalGrad)"
                    stroke="#EAD3DB"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 20 6 C 26 18 24 34 18 45"
                    stroke="#F2DFE6"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <defs>
                    <linearGradient id="gamePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#FFFDF8" />
                      <stop offset="90%" stopColor="#F9EBF0" />
                      <stop offset="100%" stopColor="#E0BDC8" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Subtle shine dot */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white opacity-90" />
              </div>
            </button>
          );
        })}

        {/* Center message banner showing the last collected petal's note */}
        {activeMessage && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-12 sm:right-12 z-20 p-3 sm:p-4 rounded-2xl bg-white/95 border border-[#D9A5B3]/50 shadow-md animate-fadeIn">
            <p className="text-xs uppercase tracking-wider text-[#735364] font-medium mb-0.5">
              Unlocked Thought
            </p>
            <p className="font-serif text-sm sm:text-base text-[#563C4A] font-semibold">
              &ldquo;{activeMessage}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Mission Accomplished Banner */}
      {isMissionComplete && (
        <div className="w-full bg-[#FFFDF8] border-2 border-[#D9A5B3] rounded-3xl p-6 shadow-xl my-3 animate-fadeIn">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#F8E8ED] flex items-center justify-center text-[#563C4A]">
            <Trophy className="w-6 h-6 text-[#D9A5B3]" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#563C4A] mb-1">
            Mission complete! Madam ji ne saare petals collect kar liye. 🥹🤍
          </h3>
          <p className="text-xs sm:text-sm text-[#735364] mb-4">
            Saare 5 petals mil gaye hain... ab waqt hai final surprise unlock karne ka!
          </p>

          <button
            onClick={onCompleteGame}
            className="min-h-[48px] px-8 py-3 rounded-full bg-[#563C4A] text-white hover:bg-[#432e3a] text-sm font-semibold tracking-wide shadow-lg shadow-[#563C4A]/20 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
          >
            <Gift className="w-5 h-5 text-[#D9A5B3]" />
            <span>Unlock my gift 🎁</span>
          </button>
        </div>
      )}

      {/* Default bottom helper */}
      {!isMissionComplete && (
        <div className="w-full flex items-center justify-center py-2">
          <span className="text-xs text-[#735364]">
            {5 - collectedPetalIds.length} petal{5 - collectedPetalIds.length > 1 ? 's' : ''} baaki hain collect karne ko ✨
          </span>
        </div>
      )}
    </div>
  );
};
