import React, { useState } from 'react';
import { Heart, Sparkles, Mail, X } from 'lucide-react';
import { WhiteRoseSvg } from './WhiteRoseSvg';
import { romanticAudio } from '../utils/audioSynth';

interface InteractiveBouquetProps {
  nickname: string;
  senderName: string;
  onOpenLetter: () => void;
}

export const InteractiveBouquet: React.FC<InteractiveBouquetProps> = ({
  nickname,
  senderName,
  onOpenLetter,
}) => {
  // Track bloom state of 5 roses in the bouquet
  const [bloomedRoses, setBloomedRoses] = useState<Record<number, boolean>>({
    0: true, // Center rose is bloomed by default
  });
  const [showRibbonHeart, setShowRibbonHeart] = useState(false);
  const [centerMessage, setCenterMessage] = useState<string | null>(null);
  const [burstSparkles, setBurstSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleRoseTap = (index: number) => {
    romanticAudio.playBloomChime();
    setBloomedRoses((prev) => ({ ...prev, [index]: !prev[index] }));

    const popId = Date.now();
    setBurstSparkles((prev) => [...prev, { id: popId, x: 50 + (index - 2) * 15, y: 40 }]);
    setTimeout(() => {
      setBurstSparkles((prev) => prev.filter((p) => p.id !== popId));
    }, 1200);

    if (index === 0) {
      setCenterMessage(`"You are my forever favorite white rose, ${nickname}." 🤍🌹`);
    } else {
      setCenterMessage(null);
    }
  };

  const handleRibbonTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.playHugChime();
    setShowRibbonHeart(true);
    setTimeout(() => setShowRibbonHeart(false), 2400);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 max-w-lg mx-auto select-none">
      {/* Floating Sparkles from bouquet */}
      {burstSparkles.map((s) => (
        <div
          key={s.id}
          className="absolute z-40 pointer-events-none animate-ping"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <Sparkles className="w-8 h-8 text-[#FFFBE6]" />
        </div>
      ))}

      {/* Bouquet Aura Glow */}
      <div
        className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full blur-3xl opacity-75 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(248, 232, 237, 0.3) 40%, rgba(217, 165, 179, 0.2) 70%, transparent 100%)',
        }}
      />

      {/* Bouquet Arrangement: 5 Layered White Roses */}
      <div className="relative w-72 sm:w-84 h-72 sm:h-80 flex items-center justify-center">
        {/* Rose 1: Top Left */}
        <div
          onClick={() => handleRoseTap(1)}
          className="absolute top-2 left-6 transform -rotate-25 scale-75 cursor-pointer z-10 transition-transform hover:scale-85"
        >
          <WhiteRoseSvg
            size="md"
            showStem={true}
            isBloomed={bloomedRoses[1]}
            isInteractive={true}
          />
        </div>

        {/* Rose 2: Top Right */}
        <div
          onClick={() => handleRoseTap(2)}
          className="absolute top-2 right-6 transform rotate-25 scale-75 cursor-pointer z-10 transition-transform hover:scale-85"
        >
          <WhiteRoseSvg
            size="md"
            showStem={true}
            isBloomed={bloomedRoses[2]}
            isInteractive={true}
          />
        </div>

        {/* Rose 3: Mid Left */}
        <div
          onClick={() => handleRoseTap(3)}
          className="absolute top-14 left-0 transform -rotate-12 scale-80 cursor-pointer z-20 transition-transform hover:scale-90"
        >
          <WhiteRoseSvg
            size="md"
            showStem={true}
            isBloomed={bloomedRoses[3]}
            isInteractive={true}
          />
        </div>

        {/* Rose 4: Mid Right */}
        <div
          onClick={() => handleRoseTap(4)}
          className="absolute top-14 right-0 transform rotate-12 scale-80 cursor-pointer z-20 transition-transform hover:scale-90"
        >
          <WhiteRoseSvg
            size="md"
            showStem={true}
            isBloomed={bloomedRoses[4]}
            isInteractive={true}
          />
        </div>

        {/* Rose 0: Centerpiece Master Rose */}
        <div
          onClick={() => handleRoseTap(0)}
          className="relative top-4 z-30 transform scale-100 sm:scale-105 cursor-pointer transition-transform hover:scale-110"
        >
          <WhiteRoseSvg
            size="md"
            showStem={true}
            isBloomed={bloomedRoses[0]}
            isInteractive={true}
            isGlowing={true}
          />
        </div>

        {/* Blush-Pink Silk Ribbon tied around stems */}
        <div
          onClick={handleRibbonTap}
          role="button"
          tabIndex={0}
          aria-label="Tap ribbon to reveal heart"
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 cursor-pointer group flex flex-col items-center focus:outline-none"
        >
          <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-[#D9A5B3] via-[#F8E8ED] to-[#D9A5B3] text-[#563C4A] text-xs font-semibold tracking-wider uppercase shadow-lg border border-white/80 flex items-center gap-1.5 transition-transform group-hover:scale-105">
            <Heart className="w-3.5 h-3.5 fill-[#563C4A]" />
            <span>Tied With Love</span>
          </div>

          {/* Ribbon Tails */}
          <div className="flex gap-2 -mt-1 pointer-events-none">
            <span className="w-1.5 h-6 bg-[#D9A5B3] rounded-b-md transform -rotate-12" />
            <span className="w-1.5 h-7 bg-[#E8B5C2] rounded-b-md transform rotate-12" />
          </div>
        </div>

        {/* Ribbon Heart popover */}
        {showRibbonHeart && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-white text-[#563C4A] text-xs font-medium shadow-xl border border-[#D9A5B3] flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-[#D9A5B3] fill-[#D9A5B3]" />
              <span>Har ek petal tumhare naam!</span>
            </div>
          </div>
        )}
      </div>

      {/* Center Rose message if tapped */}
      {centerMessage && (
        <div className="mt-3 px-4 py-2 rounded-2xl bg-white/90 border border-[#D9A5B3]/50 text-xs sm:text-sm text-[#563C4A] shadow-md animate-fadeIn text-center italic">
          {centerMessage}
        </div>
      )}

      {/* Sealed Love Letter Envelope Button */}
      <div className="mt-5 flex items-center justify-center">
        <button
          onClick={onOpenLetter}
          className="min-h-[44px] px-5 py-2.5 rounded-full bg-white/95 text-[#563C4A] hover:bg-[#FFFDF8] border border-[#D9A5B3] shadow-md hover:shadow-lg transition-all text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
        >
          <Mail className="w-4 h-4 text-[#D9A5B3]" />
          <span>Open love letter 💌</span>
        </button>
      </div>
    </div>
  );
};
