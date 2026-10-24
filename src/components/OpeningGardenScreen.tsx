import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { WhiteRoseSvg } from './WhiteRoseSvg';
import { romanticAudio } from '../utils/audioSynth';

interface OpeningGardenScreenProps {
  onEnterGarden: () => void;
  isMusicPlaying: boolean;
  onStartMusic: () => void;
}

export const OpeningGardenScreen: React.FC<OpeningGardenScreenProps> = ({
  onEnterGarden,
  isMusicPlaying,
  onStartMusic,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnter = () => {
    romanticAudio.playBloomChime();
    if (!isMusicPlaying) {
      onStartMusic();
    }
    setIsTransitioning(true);
    setTimeout(() => {
      onEnterGarden();
    }, 600);
  };

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden transition-all duration-700 ${
        isTransitioning ? 'scale-110 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* Night Sky & Moonlit Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, #221226 0%, #150918 55%, #0B040D 100%)',
        }}
      />

      {/* Soft Moon Halo */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 254, 240, 0.25) 0%, rgba(217, 165, 179, 0.15) 50%, transparent 80%)',
        }}
      />

      {/* Floating Starlight Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 13) % 90}%`,
              left: `${(i * 17) % 94}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDelay: `${(i * 0.4) % 3}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      {/* Centerpiece: Full-screen Single White Rose */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          onClick={handleEnter}
          className="cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 group focus:outline-none"
          role="button"
          tabIndex={0}
          aria-label="Tap to enter the white rose garden"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleEnter();
            }
          }}
        >
          <WhiteRoseSvg
            size="hero"
            isGlowing={true}
            isInteractive={true}
            showStem={true}
          />
        </div>

        {/* Minimal Text as requested: Only "Ek rose tumhare liye 🤍" */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FFFDF8] tracking-tight mt-6 mb-8 drop-shadow-md">
          Ek rose tumhare liye 🤍
        </h1>

        {/* Small Elegant Button: "Enter my garden" */}
        <button
          onClick={handleEnter}
          className="min-h-[46px] px-8 py-2.5 rounded-full bg-white/95 text-[#2A1530] hover:bg-white hover:shadow-xl hover:shadow-[#D9A5B3]/20 active:scale-95 text-xs sm:text-sm font-medium tracking-wide transition-all shadow-md flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
        >
          <span>Enter my garden</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#2A1530]" />
        </button>

        <p className="text-[11px] text-[#A7B5A0]/80 mt-4 tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#D9A5B3]" />
          Tap the rose or button to explore
        </p>
      </div>
    </div>
  );
};
