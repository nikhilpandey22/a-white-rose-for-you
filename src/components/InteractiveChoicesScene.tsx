import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Moon, Utensils, Film, Gift } from 'lucide-react';
import { AppConfig } from '../config';
import { romanticAudio } from '../utils/audioSynth';

interface InteractiveChoicesSceneProps {
  questions: AppConfig['questions'];
  selectedAnswers: Record<number, string>;
  onSelectAnswer: (questionId: number, optionId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const InteractiveChoicesScene: React.FC<InteractiveChoicesSceneProps> = ({
  questions,
  selectedAnswers,
  onSelectAnswer,
  onContinue,
  onBack,
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentQ = questions[activeQuestionIndex];
  const currentSelectedOptionId = selectedAnswers[currentQ.id];
  const currentSelectedOption = currentQ.options.find((o) => o.id === currentSelectedOptionId);

  const handleChooseOption = (optionId: string) => {
    romanticAudio.playPetalCollectSound();
    onSelectAnswer(currentQ.id, optionId);
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    } else {
      onContinue();
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-widest text-[#735364] font-medium flex items-center justify-center gap-1.5 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
          Playful Romance Quiz
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#563C4A] tracking-tight">
          Achha madam ji, ab kuch sawaal tumhare liye 😌💗
        </h2>
      </div>

      {/* Progress Indicator (Unboxed, clean metadata per skill rules) */}
      <div className="w-full flex items-center justify-between text-xs text-[#735364] mb-3 px-1">
        <span>
          Moment <span className="font-semibold text-[#563C4A]">{activeQuestionIndex + 1}</span> of {questions.length}
        </span>
        <span>
          {answeredCount} of {questions.length} answered
        </span>
      </div>

      {/* Clean hairline progress bar */}
      <div className="w-full h-1.5 bg-[#F8E8ED] rounded-full overflow-hidden mb-6 border border-[#D9A5B3]/20">
        <div
          className="h-full bg-gradient-to-r from-[#D9A5B3] to-[#563C4A] rounded-full transition-all duration-300"
          style={{ width: `${((activeQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Active Question Card */}
      <div className="w-full bg-[#FFFDF8] border border-[#D9A5B3]/40 rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#563C4A]/5 relative overflow-hidden transition-all duration-300">
        {/* Visual theme preview for Question 2 (Dream date options) */}
        {currentQ.id === 2 && currentSelectedOption?.backdropTheme && (
          <div className="mb-4 p-4 rounded-2xl bg-[#F8E8ED]/60 border border-[#D9A5B3]/30 flex items-center gap-3 animate-fadeIn">
            {currentSelectedOption.backdropTheme === 'moonlight' && (
              <div className="flex items-center gap-2 text-sm text-[#563C4A] font-medium">
                <Moon className="w-5 h-5 text-[#563C4A]" />
                <span>Atmosphere: Chandi raat, thandi hawa & white roses 🌙</span>
              </div>
            )}
            {currentSelectedOption.backdropTheme === 'streetfood' && (
              <div className="flex items-center gap-2 text-sm text-[#563C4A] font-medium">
                <Utensils className="w-5 h-5 text-[#563C4A]" />
                <span>Atmosphere: Chaat, momos, garam chai & uncounted smiles 🌮</span>
              </div>
            )}
            {currentSelectedOption.backdropTheme === 'movienight' && (
              <div className="flex items-center gap-2 text-sm text-[#563C4A] font-medium">
                <Film className="w-5 h-5 text-[#563C4A]" />
                <span>Atmosphere: Soft blanket, dim lights & favorite movie 🍿</span>
              </div>
            )}
          </div>
        )}

        {/* Question Text */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#563C4A] mb-6 leading-snug">
          {currentQ.question}
        </h3>

        {/* Options list */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option) => {
            const isSelected = currentSelectedOptionId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleChooseOption(option.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[52px] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9A5B3] ${
                  isSelected
                    ? 'bg-[#F8E8ED] border-[#D9A5B3] shadow-xs text-[#563C4A]'
                    : 'bg-white hover:bg-[#FFFDF8] border-[#EAD3DB] text-[#563C4A]/90 hover:border-[#D9A5B3]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#563C4A] text-white'
                        : 'bg-[#F8E8ED] text-[#735364]'
                    }`}
                  >
                    {option.id}
                  </span>
                  <span className="text-sm sm:text-base font-medium">{option.label}</span>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-[#563C4A] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Playful Cute Response when option is selected */}
        {currentSelectedOption && (
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#D9A5B3]/50 shadow-2xs animate-fadeIn">
            <p className="text-xs uppercase tracking-wider text-[#735364] font-medium mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
              Reaction
            </p>
            <p className="font-serif text-base sm:text-lg text-[#563C4A] italic leading-relaxed">
              &ldquo;{currentSelectedOption.response}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footbar */}
      <div className="w-full flex items-center justify-between gap-3 mt-6">
        <button
          onClick={handlePrevQuestion}
          className="min-h-[44px] px-4 py-2.5 rounded-full bg-white text-[#735364] hover:text-[#563C4A] border border-[#D9A5B3]/40 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{activeQuestionIndex === 0 ? 'Wapas Letter' : 'Pichhla Sawaal'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick jump dots */}
          <div className="hidden sm:flex items-center gap-1 mr-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIndex(idx)}
                aria-label={`Go to question ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === activeQuestionIndex
                    ? 'bg-[#563C4A] scale-125'
                    : selectedAnswers[q.id]
                    ? 'bg-[#D9A5B3]'
                    : 'bg-[#EAD3DB]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#563C4A] text-white hover:bg-[#432e3a] text-xs sm:text-sm font-medium transition-all shadow-md shadow-[#563C4A]/15 flex items-center gap-2 cursor-pointer"
          >
            <span>
              {activeQuestionIndex === questions.length - 1
                ? 'Rose Mission Khelo 🌹'
                : 'Agla Sawaal ➔'}
            </span>
            {activeQuestionIndex === questions.length - 1 ? (
              <Gift className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
