import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { WhiteRoseSvg } from './WhiteRoseSvg';
import { romanticAudio } from '../utils/audioSynth';

interface WhiteRoseRevealSceneProps {
  nickname: string;
  extraMessages: string[];
  onContinue: () => void;
}

interface FloatingBurstItem {
  id: number;
  x: number;
  y: number;
  type: 'petal' | 'heart';
  rotation: number;
}

export const WhiteRoseRevealScene: React.FC<WhiteRoseRevealSceneProps> = ({
  nickname,
  extraMessages,
  onContinue,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number | null>(null);
  const [bursts, setBursts] = useState<FloatingBurstItem[]>([]);
  const [hugCount, setHugCount] = useState(0);

  // Emit upward floating petals when the rose is tapped
  const triggerPetalBurst = () => {
    romanticAudio.playPetalCollectSound();
    const newItems: FloatingBurstItem[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: 40 + Math.random() * 20 - 10,
      y: 50 + Math.random() * 20 - 10,
      type: 'petal',
      rotation: Math.random() * 360,
    }));
    setBursts((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newItems.some((n) => n.id === b.id)));
    }, 1800);
  };

  // Rose Hug interaction: showers soft glowing hearts + chime
  const handleHugRose = () => {
    romanticAudio.playHugChime();
    setHugCount((prev) => prev + 1);
    const newHearts: FloatingBurstItem[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 30,
      y: 40 + Math.random() * 20,
      type: 'heart',
      rotation: Math.random() * 60 - 30,
    }));
    setBursts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newHearts.some((n) => n.id === b.id)));
    }, 2000);
  };

  // Reveal next romantic petal message
  const handleNextPetalMessage = () => {
    romanticAudio.playPetalCollectSound();
    setCurrentMessageIndex((prev) =>
      prev === null ? 0 : (prev + 1) % extraMessages.length
    );
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto text-center">
      {/* Dynamic Burst Particles (Petals & Hearts) */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="fixed pointer-events-none z-50 animate-burst"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            animation: 'burstFloat 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {b.type === 'heart' ? (
            <Heart
              className="w-6 h-6 text-[#D9A5B3] fill-[#F8E8ED] drop-shadow-md"
              style={{ transform: `rotate(${b.rotation}deg)` }}
            />
          ) : (
            <svg
              width="24"
              height="30"
              viewBox="0 0 30 40"
              style={{ transform: `rotate(${b.rotation}deg)` }}
            >
              <path
                d="M 15 2 C 26 2 29 18 24 32 C 20 38 10 38 6 32 C 1 18 4 2 15 2 Z"
                fill="#FFFFFF"
                stroke="#EAD3DB"
                strokeWidth="1"
              />
            </svg>
          )}
        </div>
      ))}

      {/* Romantic intro text */}
      <div className="max-w-2xl mx-auto mb-6">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-[#735364] font-medium mb-2">
          Centerpiece of pure affection
        </p>
        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#563C4A] leading-relaxed mb-3">
          &ldquo;Jaise white rose simple hoke bhi itna khoobsurat hota hai...
          <br className="hidden sm:inline" />
          Waise hi tumhari chhoti-chhoti baatein mere din ko special bana deti hain.&rdquo; 🤍
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#563C4A]">
          Yeh rose tumhare liye hai, meri {nickname}. 🌹
        </h2>
      </div>

      {/* The Central Animated White Rose */}
      <div className="relative my-2 sm:my-4 flex flex-col items-center">
        <WhiteRoseSvg
          size="hero"
          isGlowing={true}
          isInteractive={true}
          onClick={triggerPetalBurst}
        />
        <p className="text-xs text-[#735364]/80 mt-2 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
          Rose par tap karo to release floating petals
        </p>
      </div>

      {/* Extra petal message card if unlocked */}
      {currentMessageIndex !== null && (
        <div className="w-full max-w-md mx-auto my-4 p-4 rounded-2xl bg-white/90 border border-[#D9A5B3]/40 shadow-sm animate-fadeIn">
          <p className="text-xs font-medium text-[#735364] uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D9A5B3]" />
            Petal Whisper #{currentMessageIndex + 1}
          </p>
          <p className="font-serif text-base sm:text-lg text-[#563C4A] italic">
            &ldquo;{extraMessages[currentMessageIndex]}&rdquo;
          </p>
        </div>
      )}

      {/* Hug counter acknowledgment if user hugged the rose */}
      {hugCount > 0 && (
        <p className="text-xs text-[#735364] mt-1 mb-3">
          Aww, you sent {hugCount} warm hug{hugCount > 1 ? 's' : ''} to the rose! 🤍✨
        </p>
      )}

      {/* Interactive Action Controls */}
      <div className="w-full max-w-md flex flex-wrap items-center justify-center gap-3 mt-4">
        <button
          onClick={handleNextPetalMessage}
          className="min-h-[44px] px-4 py-2.5 rounded-full bg-white text-[#563C4A] border border-[#D9A5B3]/60 hover:bg-[#F8E8ED] text-xs sm:text-sm font-medium transition-all shadow-xs flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
        >
          <Sparkles className="w-4 h-4 text-[#D9A5B3]" />
          <span>Ek aur petal ✨</span>
        </button>

        <button
          onClick={handleHugRose}
          className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#F8E8ED] text-[#563C4A] border border-[#D9A5B3]/50 hover:bg-[#ebd3db] text-xs sm:text-sm font-medium transition-all shadow-xs flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
        >
          <Heart className="w-4 h-4 text-[#D9A5B3] fill-[#D9A5B3]" />
          <span>Rose ko hug karo 🤍</span>
        </button>

        <button
          onClick={onContinue}
          className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#563C4A] text-white hover:bg-[#432e3a] text-xs sm:text-sm font-medium transition-all shadow-md shadow-[#563C4A]/15 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
        >
          <span>Letter padho 💌</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <style>{`
        @keyframes burstFloat {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(0.6);
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--tw-translate-x, 0) + (Math.random() * 60 - 30)px), -120px) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};
