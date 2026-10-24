import React, { useState } from 'react';
import { Mail, Sparkles, Heart, Smile } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface EnvelopeSceneProps {
  nickname: string;
  onOpenEnvelope: () => void;
  isMusicPlaying: boolean;
  onStartMusic: () => void;
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({
  nickname,
  onOpenEnvelope,
  isMusicPlaying,
  onStartMusic,
}) => {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const [showSuspenseModal, setShowSuspenseModal] = useState(false);
  const [suspenseTimer, setSuspenseTimer] = useState<number | null>(null);

  const handleOpenClick = () => {
    romanticAudio.playEnvelopeOpenSound();
    if (!isMusicPlaying) {
      onStartMusic();
    }
    setIsOpenAnimation(true);
    setTimeout(() => {
      onOpenEnvelope();
    }, 900);
  };

  const handleSuspenseClick = () => {
    setShowSuspenseModal(true);
  };

  const handleStart5SecTimer = () => {
    setSuspenseTimer(5);
    const interval = window.setInterval(() => {
      setSuspenseTimer((prev) => {
        if (prev === null || prev <= 1) {
          window.clearInterval(interval);
          setShowSuspenseModal(false);
          handleOpenClick();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 text-center">
      {/* Ambient soft glow center */}
      <div
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #F8E8ED 0%, #D9A5B3 40%, transparent 70%)',
        }}
      />

      {/* Main card container */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Subtle greeting */}
        <p className="text-xs sm:text-sm uppercase tracking-widest text-[#735364] font-medium mb-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
          A Little Token Of Love
          <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
        </p>

        {/* Romantic Headlines */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#563C4A] tracking-tight leading-tight text-balance mb-3">
          Ek chhoti si cheez hai tumhare liye... 🤍
        </h1>

        <p className="text-base sm:text-lg text-[#735364] mb-8 font-normal">
          Ready ho, <span className="font-semibold text-[#563C4A]">{nickname}</span>?
        </p>

        {/* Realistic Interactive Sealed Envelope */}
        <div
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenClick();
            }
          }}
          aria-label="Click to open the surprise love envelope"
          className="group relative cursor-pointer my-4 w-64 sm:w-72 h-44 sm:h-48 transition-transform duration-500 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]/40 rounded-2xl"
        >
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-[#FFFDF8] rounded-2xl shadow-xl shadow-[#563C4A]/10 border border-[#D9A5B3]/35 overflow-hidden flex flex-col justify-between">
            {/* Inner letter peek */}
            <div
              className={`absolute left-4 right-4 top-4 h-28 bg-white border border-[#EAD3DB] rounded-t-lg transition-transform duration-700 shadow-xs flex flex-col items-center pt-3 ${
                isOpenAnimation ? '-translate-y-16 scale-105' : 'translate-y-2'
              }`}
            >
              <span className="w-16 h-1 bg-[#D9A5B3]/30 rounded-full mb-1.5" />
              <span className="w-24 h-1 bg-[#D9A5B3]/20 rounded-full mb-2" />
              <span className="text-xs text-[#563C4A] font-serif italic">For my favorite person</span>
            </div>

            {/* Envelope Bottom Triangle Flaps */}
            <div className="relative z-10 w-full h-full pointer-events-none">
              <svg
                viewBox="0 0 280 190"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left and Right folded flaps */}
                <path d="M 0 190 L 140 100 L 0 0 Z" fill="#FBF3F6" opacity="0.9" />
                <path d="M 280 190 L 140 100 L 280 0 Z" fill="#F8EBF0" opacity="0.9" />
                {/* Bottom flap */}
                <path d="M 0 190 L 140 95 L 280 190 Z" fill="#FFFDF8" stroke="#EAD3DB" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Top Triangular Flap (Animates open) */}
            <div
              className={`absolute top-0 left-0 right-0 z-20 origin-top transition-all duration-700 ${
                isOpenAnimation ? '-rotate-x-180 opacity-0' : 'rotate-x-0'
              }`}
            >
              <svg
                viewBox="0 0 280 110"
                className="w-full drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 0 L 140 105 L 280 0 Z"
                  fill="#FFF7FA"
                  stroke="#E2CBD4"
                  strokeWidth="1"
                />
              </svg>

              {/* Romantic Gold/Dusty Rose Wax Seal */}
              <div className="absolute top-[68px] sm:top-[74px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#A66D7D] via-[#D9A5B3] to-[#F1CAD4] shadow-md border-2 border-white/80 flex items-center justify-center transition-transform group-hover:scale-110">
                <Heart className="w-5 h-5 text-white fill-white drop-shadow-xs" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#735364]/75 mt-3 mb-6 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
          Envelope par tap karke kholo ya neeche button dabao
        </p>

        {/* Primary Action Buttons */}
        <div className="w-full max-w-sm flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleOpenClick}
            disabled={isOpenAnimation}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full bg-[#563C4A] text-white hover:bg-[#432e3a] active:scale-[0.98] font-medium text-sm tracking-wide shadow-md shadow-[#563C4A]/15 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
          >
            <Mail className="w-4 h-4" />
            <span className="whitespace-nowrap">Open my surprise 💌</span>
          </button>

          <button
            onClick={handleSuspenseClick}
            disabled={isOpenAnimation}
            className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-full bg-white/80 text-[#563C4A] hover:bg-[#F8E8ED] border border-[#D9A5B3]/50 active:scale-[0.98] font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
          >
            <span>Thoda suspense rakho 🙈</span>
          </button>
        </div>
      </div>

      {/* Playful Suspense Modal */}
      {showSuspenseModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn"
        >
          <div className="bg-[#FFFDF8] border border-[#D9A5B3]/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F8E8ED] text-[#D9A5B3] flex items-center justify-center">
              <Smile className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#563C4A] mb-2">
              Achha ji, suspense bhi chahiye aur surprise bhi? 😂🤍
            </h3>

            <p className="text-sm text-[#735364] leading-relaxed mb-6">
              Itna impatient mat bano, madam ji! Par agar zyada intezaar nahi hota, toh bas 5 second ka countdown shuru kar sakte hain ya abhi khol lo.
            </p>

            {suspenseTimer !== null ? (
              <div className="mb-6 p-4 rounded-2xl bg-[#F8E8ED]/70 border border-[#D9A5B3]/30">
                <span className="text-3xl font-bold text-[#563C4A] tabular-nums">
                  {suspenseTimer}
                </span>
                <p className="text-xs text-[#735364] mt-1">Countdown chal raha hai... ⏳</p>
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowSuspenseModal(false);
                  handleOpenClick();
                }}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full bg-[#563C4A] text-white font-medium text-xs sm:text-sm hover:bg-[#432e3a] cursor-pointer transition-all"
              >
                Abhi khol do, nahi ho raha sabr! 💌
              </button>

              {suspenseTimer === null && (
                <button
                  onClick={handleStart5SecTimer}
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-full bg-white text-[#563C4A] border border-[#D9A5B3]/40 hover:bg-[#F8E8ED] font-medium text-xs sm:text-sm cursor-pointer transition-all"
                >
                  5 sec timer lagao ⏱️
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
