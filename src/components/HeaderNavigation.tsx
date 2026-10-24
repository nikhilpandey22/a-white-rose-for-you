import React from 'react';
import { Volume2, VolumeX, Music, Settings2 } from 'lucide-react';

interface HeaderNavigationProps {
  currentScene: number;
  onSelectScene: (sceneIndex: number) => void;
  isMusicPlaying: boolean;
  isMuted: boolean;
  onToggleMusic: () => void;
  onToggleMute: () => void;
  onOpenCustomize: () => void;
  nickname: string;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentScene,
  onSelectScene,
  isMusicPlaying,
  isMuted,
  onToggleMusic,
  onToggleMute,
  onOpenCustomize,
  nickname,
}) => {
  const sceneLabels = [
    { id: 1, label: 'Envelope' },
    { id: 2, label: 'The Rose' },
    { id: 3, label: 'Love Letter' },
    { id: 4, label: 'Cute Choices' },
    { id: 5, label: 'Petal Mission' },
    { id: 6, label: 'Final Surprise' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFFDF8]/85 border-b border-[#D9A5B3]/25 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectScene(1)}
          className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A5B3] rounded-md px-1 py-1"
          aria-label="Go to start"
        >
          <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#563C4A] whitespace-nowrap shrink-0 group-hover:text-[#D9A5B3] transition-colors">
            For {nickname} 🤍
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean text with subtle underline, hidden on small screens, scrollable or dropdown) */}
        <nav
          aria-label="Story scenes"
          className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-medium text-[#735364]"
        >
          {sceneLabels.map((s) => {
            const isActive = currentScene === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScene(s.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A5B3] rounded ${
                  isActive
                    ? 'text-[#563C4A] font-semibold'
                    : 'hover:text-[#563C4A]'
                }`}
              >
                {s.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D9A5B3] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Sound & Customize Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Music Play/Pause Toggle */}
          <button
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? 'Pause romantic melody' : 'Play romantic melody'}
            title={isMusicPlaying ? 'Pause Music' : 'Play Romantic Music'}
            className={`min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A5B3] ${
              isMusicPlaying
                ? 'bg-[#F8E8ED] text-[#563C4A] border-[#D9A5B3]/40 shadow-xs'
                : 'bg-white/80 text-[#735364] border-[#EAD3DB] hover:bg-[#F8E8ED]/60'
            }`}
          >
            <Music
              className={`w-3.5 h-3.5 ${
                isMusicPlaying ? 'text-[#D9A5B3] animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            />
            <span className="hidden sm:inline whitespace-nowrap">
              {isMusicPlaying ? 'Melody Playing' : 'Play Melody'}
            </span>
          </button>

          {/* Mute Toggle if music is active */}
          {isMusicPlaying && (
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
              className="min-h-[44px] min-w-[44px] p-2 rounded-full text-[#735364] hover:text-[#563C4A] hover:bg-[#F8E8ED]/60 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A5B3]"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}

          {/* Customize names button */}
          <button
            onClick={onOpenCustomize}
            aria-label="Customize names and details"
            title="Edit Nickname or Sender Name"
            className="min-h-[44px] min-w-[44px] p-2 rounded-full text-[#735364] hover:text-[#563C4A] hover:bg-[#F8E8ED]/60 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A5B3]"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
