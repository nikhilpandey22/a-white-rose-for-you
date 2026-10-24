import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw, Mail, Flower, Share2, Check } from 'lucide-react';
import { WhiteRoseSvg } from './WhiteRoseSvg';
import { romanticAudio } from '../utils/audioSynth';

interface FinalSurpriseSceneProps {
  nickname: string;
  senderName: string;
  finalParagraphs: string[];
  finalClosing: string;
  onGoToRose: () => void;
  onGoToLetter: () => void;
  onRestartStory: () => void;
  onOpenCustomize: () => void;
}

export const FinalSurpriseScene: React.FC<FinalSurpriseSceneProps> = ({
  nickname,
  senderName,
  finalParagraphs,
  finalClosing,
  onGoToRose,
  onGoToLetter,
  onRestartStory,
  onOpenCustomize,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [huggedBouquet, setHuggedBouquet] = useState(false);

  const handleBouquetClick = () => {
    romanticAudio.playHugChime();
    setHuggedBouquet(true);
    setTimeout(() => setHuggedBouquet(false), 2500);
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto text-center">
      {/* Ambient center aura */}
      <div
        className="absolute w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full blur-3xl opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FFFDF8 0%, #F8E8ED 50%, #D9A5B3 80%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Top Kicker */}
        <p className="text-xs sm:text-sm uppercase tracking-widest text-[#735364] font-medium mb-2 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
          The Final Surprise & Keepsake
          <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#563C4A] tracking-tight mb-4">
          Ek last baat, meri {nickname}... 🤍
        </h2>

        {/* White Rose Bouquet Centerpiece */}
        <div
          onClick={handleBouquetClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBouquetClick();
            }
          }}
          aria-label="Tap to give a warm hug to the bouquet"
          className="relative my-4 cursor-pointer group flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3] rounded-3xl p-2 transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Bouquet arrangement: 3 White Roses layered with ribbon */}
          <div className="relative w-72 sm:w-88 h-64 sm:h-72 flex items-center justify-center">
            {/* Left rose */}
            <div className="absolute -left-2 sm:left-4 top-4 transform -rotate-15 scale-75 opacity-90">
              <WhiteRoseSvg size="md" isGlowing={false} isInteractive={false} showStem={true} />
            </div>

            {/* Right rose */}
            <div className="absolute -right-2 sm:right-4 top-4 transform rotate-15 scale-75 opacity-90">
              <WhiteRoseSvg size="md" isGlowing={false} isInteractive={false} showStem={true} />
            </div>

            {/* Center main rose */}
            <div className="relative z-20 transform scale-95 sm:scale-105">
              <WhiteRoseSvg size="md" isGlowing={true} isInteractive={false} showStem={true} />
            </div>

            {/* Dusty Rose Silk Ribbon tied around stems */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
              <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D9A5B3] via-[#E8C0CB] to-[#D9A5B3] text-white text-[11px] font-medium tracking-wider uppercase shadow-md border border-white/60 flex items-center gap-1">
                <Heart className="w-3 h-3 fill-white" />
                <span>Tied with Love</span>
              </div>
            </div>
          </div>
        </div>

        {huggedBouquet && (
          <p className="text-xs text-[#563C4A] font-medium my-1 animate-fadeIn flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 text-[#D9A5B3] fill-[#D9A5B3]" />
            A gentle warm embrace for you! 🤍✨
          </p>
        )}

        {/* Heartwarming emotional message card */}
        <div className="w-full bg-[#FFFDF8]/90 border border-[#D9A5B3]/40 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#563C4A]/5 text-center my-4">
          <div className="space-y-4 text-sm sm:text-base text-[#563C4A] leading-relaxed">
            {finalParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-6 pt-4 border-t border-[#D9A5B3]/30 flex flex-col items-center">
            <span className="font-serif italic text-sm text-[#735364]">{finalClosing}</span>
            <span className="font-serif text-2xl font-bold text-[#563C4A] mt-1 tracking-wide">
              {senderName} 🤍🌹
            </span>
          </div>
        </div>

        {/* Final Navigation Buttons */}
        <div className="w-full flex flex-wrap items-center justify-center gap-3 my-4">
          <button
            onClick={onGoToRose}
            className="min-h-[44px] px-5 py-2.5 rounded-full bg-white text-[#563C4A] border border-[#D9A5B3]/50 hover:bg-[#F8E8ED] text-xs sm:text-sm font-medium transition-all shadow-xs flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
          >
            <Flower className="w-4 h-4 text-[#D9A5B3]" />
            <span>Rose ko phir se dekho 🌹</span>
          </button>

          <button
            onClick={onGoToLetter}
            className="min-h-[44px] px-5 py-2.5 rounded-full bg-white text-[#563C4A] border border-[#D9A5B3]/50 hover:bg-[#F8E8ED] text-xs sm:text-sm font-medium transition-all shadow-xs flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
          >
            <Mail className="w-4 h-4 text-[#D9A5B3]" />
            <span>Mera letter dobara padho 💌</span>
          </button>

          <button
            onClick={onRestartStory}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#563C4A] text-white hover:bg-[#432e3a] text-xs sm:text-sm font-medium transition-all shadow-md shadow-[#563C4A]/15 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start our little story again 🤍</span>
          </button>
        </div>

        {/* Share & Customize actions */}
        <div className="flex items-center justify-center gap-4 text-xs text-[#735364] mt-2">
          <button
            onClick={handleShareLink}
            className="hover:text-[#563C4A] underline underline-offset-4 flex items-center gap-1 cursor-pointer py-1"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link copied! 📋' : 'Share this surprise'}</span>
          </button>

          <span>·</span>

          <button
            onClick={onOpenCustomize}
            className="hover:text-[#563C4A] underline underline-offset-4 cursor-pointer py-1"
          >
            Customize names ✏️
          </button>
        </div>
      </div>
    </div>
  );
};
