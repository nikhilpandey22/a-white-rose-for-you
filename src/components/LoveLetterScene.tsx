import React, { useState } from 'react';
import { Heart, RotateCcw, ArrowRight, ArrowLeft, Sparkles, Feather } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface LoveLetterSceneProps {
  nickname: string;
  senderName: string;
  letterParagraphs: string[];
  letterSecretNote: string;
  onContinue: () => void;
  onBack: () => void;
}

export const LoveLetterScene: React.FC<LoveLetterSceneProps> = ({
  nickname,
  senderName,
  letterParagraphs,
  letterSecretNote,
  onContinue,
  onBack,
}) => {
  const [revealedSections, setRevealedSections] = useState<number>(1);
  const [showSecretNote, setShowSecretNote] = useState(false);

  const handleRevealMore = () => {
    romanticAudio.playPetalCollectSound();
    setRevealedSections((prev) => Math.min(prev + 1, letterParagraphs.length));
  };

  const handleRevealAll = () => {
    romanticAudio.playEnvelopeOpenSound();
    setRevealedSections(letterParagraphs.length);
  };

  const handleResetLetter = () => {
    setRevealedSections(1);
    setShowSecretNote(false);
  };

  const handleToggleSecretNote = () => {
    romanticAudio.playHugChime();
    setShowSecretNote((prev) => !prev);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto">
      {/* Top Breadcrumb / Title */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-widest text-[#735364] font-medium flex items-center justify-center gap-1.5 mb-1">
          <Feather className="w-3.5 h-3.5 text-[#D9A5B3]" />
          A Handwritten Digital Keepsake
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#563C4A] tracking-tight">
          Sirf tumhare liye, meri jaan 💌
        </h2>
      </div>

      {/* Parchment Paper Card */}
      <div
        className="w-full bg-[#FFFDF8] border border-[#D9A5B3]/40 rounded-3xl p-6 sm:p-10 shadow-xl shadow-[#563C4A]/5 relative overflow-hidden transition-all duration-500"
        style={{
          backgroundImage:
            'radial-gradient(#F5E4EA 0.75px, transparent 0.75px), radial-gradient(#F5E4EA 0.75px, #FFFDF8 0.75px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
        }}
      >
        {/* Subtle decorative stamp in top right corner */}
        <div className="absolute top-5 right-5 sm:top-7 sm:right-7 border border-[#D9A5B3]/50 rounded-lg p-1.5 bg-white/70 rotate-3 shadow-2xs pointer-events-none">
          <div className="text-[10px] text-[#735364] uppercase font-mono tracking-wider text-center">
            Love Airmail
          </div>
          <div className="text-center text-xs text-[#D9A5B3]">🤍🌹</div>
        </div>

        {/* Letter Greeting */}
        <p className="font-serif text-xl sm:text-2xl font-semibold text-[#563C4A] mb-5">
          Hey meri {nickname},
        </p>

        {/* Paragraphs with gradual reveal */}
        <div className="space-y-4 text-sm sm:text-base text-[#563C4A]/90 leading-relaxed font-normal">
          {letterParagraphs.slice(0, revealedSections).map((para, idx) => (
            <p
              key={idx}
              className="animate-fadeIn transition-opacity duration-500"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Step-by-step reading prompt if not all revealed */}
        {revealedSections < letterParagraphs.length && (
          <div className="mt-6 pt-4 border-t border-[#D9A5B3]/25 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#735364]">
              Section {revealedSections} of {letterParagraphs.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleRevealMore}
                className="min-h-[40px] px-4 py-1.5 rounded-full bg-[#F8E8ED] text-[#563C4A] border border-[#D9A5B3]/40 text-xs font-medium hover:bg-[#edd4de] transition-colors cursor-pointer"
              >
                Aage padhein... ✨
              </button>
              <button
                onClick={handleRevealAll}
                className="min-h-[40px] px-3 py-1.5 rounded-full text-xs text-[#735364] hover:text-[#563C4A] transition-colors cursor-pointer"
              >
                Poora dikhao
              </button>
            </div>
          </div>
        )}

        {/* Sign-off & closing once all sections are visible */}
        {revealedSections >= letterParagraphs.length && (
          <div className="mt-8 pt-6 border-t border-[#D9A5B3]/30 animate-fadeIn">
            <div className="flex flex-col items-end">
              <p className="font-serif italic text-base text-[#735364] mb-1">Tumhara,</p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#563C4A] tracking-wide">
                {senderName} 🤍
              </p>
            </div>

            {/* Secret "Dil se likha hai" note disclosure */}
            <div className="mt-6">
              <button
                onClick={handleToggleSecretNote}
                className="min-h-[42px] px-4 py-2 rounded-full bg-[#F8E8ED]/80 hover:bg-[#F8E8ED] border border-[#D9A5B3]/40 text-xs sm:text-sm font-medium text-[#563C4A] flex items-center gap-2 cursor-pointer transition-all shadow-2xs"
              >
                <Heart className={`w-4 h-4 text-[#D9A5B3] ${showSecretNote ? 'fill-[#D9A5B3]' : ''}`} />
                <span>Dil se likha hai 🤍 (Click for secret note)</span>
              </button>

              {showSecretNote && (
                <div className="mt-3 p-4 rounded-2xl bg-white/90 border border-[#D9A5B3]/50 shadow-xs animate-fadeIn">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#D9A5B3] mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D9A5B3]" />
                    Secret Whisper
                  </p>
                  <p className="text-xs sm:text-sm text-[#563C4A] leading-relaxed italic">
                    {letterSecretNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation & Controls */}
      <div className="w-full flex items-center justify-between gap-3 mt-6">
        <button
          onClick={onBack}
          className="min-h-[44px] px-4 py-2.5 rounded-full bg-white text-[#735364] hover:text-[#563C4A] border border-[#D9A5B3]/40 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Wapas Rose 🌹</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetLetter}
            aria-label="Replay or reread letter from beginning"
            title="Reread from beginning"
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-white text-[#735364] hover:text-[#563C4A] border border-[#D9A5B3]/40 transition-colors flex items-center justify-center cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onContinue}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#563C4A] text-white hover:bg-[#432e3a] text-xs sm:text-sm font-medium transition-all shadow-md shadow-[#563C4A]/15 flex items-center gap-2 cursor-pointer"
          >
            <span>Kuch Sawaal 😌</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
