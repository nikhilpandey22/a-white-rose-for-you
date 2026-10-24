import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Heart,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Lock,
  Unlock,
  Flower2,
} from 'lucide-react';
import { WhiteRoseSvg } from './WhiteRoseSvg';
import { InteractiveBouquet } from './InteractiveBouquet';
import { romanticAudio } from '../utils/audioSynth';

interface WhiteRoseGardenProps {
  nickname: string;
  senderName: string;
  isMusicPlaying: boolean;
  isMuted: boolean;
  onToggleMusic: () => void;
  onToggleMute: () => void;
  onRestartExperience: () => void;
}

interface GardenRose {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  size: 'xs' | 'sm' | 'md' | 'lg';
  rotation: number;
  message: string;
  isSpecial?: boolean;
}

interface CollectiblePetal {
  id: number;
  x: number;
  y: number;
  note: string;
  collected: boolean;
}

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  glowDelay: number;
  isScared?: boolean;
}

export const WhiteRoseGarden: React.FC<WhiteRoseGardenProps> = ({
  nickname,
  senderName,
  isMusicPlaying,
  isMuted,
  onToggleMusic,
  onToggleMute,
  onRestartExperience,
}) => {
  // Garden Rose Whispers
  const roseData: GardenRose[] = useMemo(
    () => [
      { id: 1, x: 12, y: 72, size: 'lg', rotation: -8, message: `Sirf tumhare liye 🤍` },
      { id: 2, x: 26, y: 58, size: 'md', rotation: 10, message: `Smile kar do, ${nickname} 🌹` },
      { id: 3, x: 42, y: 76, size: 'lg', rotation: -4, message: `Ek virtual hug 🤗`, isSpecial: true },
      { id: 4, x: 60, y: 62, size: 'md', rotation: 8, message: `Tum special ho 🤍` },
      { id: 5, x: 78, y: 74, size: 'lg', rotation: -12, message: `A little flower, a little love ✨` },
      { id: 6, x: 88, y: 55, size: 'sm', rotation: 14, message: `Chhoti si hansi, sabse pyari 🌸` },
      { id: 7, x: 18, y: 44, size: 'sm', rotation: -15, message: `Yeh white rose bilkul tumhari tarah calm aur beautiful hai 🤍` },
      { id: 8, x: 34, y: 38, size: 'xs', rotation: 6, message: `Thoda sa pyaar, thoda sa nakhra 😉` },
      { id: 9, x: 66, y: 42, size: 'sm', rotation: -10, message: `My favorite thought today? You. 🌙` },
      { id: 10, x: 82, y: 35, size: 'xs', rotation: 12, message: `A peaceful garden for you to breathe ✨` },
      { id: 11, x: 50, y: 46, size: 'md', rotation: 0, message: `The centerpiece of my thoughts 🌹`, isSpecial: true },
      { id: 12, x: 6, y: 52, size: 'sm', rotation: 18, message: `Soft petals, pure moments 🤍` },
    ],
    [nickname]
  );

  // 10 Collectible glowing petals scattered across the garden
  const [petals, setPetals] = useState<CollectiblePetal[]>([
    { id: 1, x: 8, y: 82, note: 'Petal of Pure Kindness 🤍', collected: false },
    { id: 2, x: 22, y: 66, note: 'Petal of Your Sweet Smile ✨', collected: false },
    { id: 3, x: 36, y: 86, note: 'Petal of Warm Hugs 🤗', collected: false },
    { id: 4, x: 48, y: 60, note: 'Petal of Late Night Thoughts 🌙', collected: false },
    { id: 5, x: 62, y: 84, note: 'Petal of Unspoken Care 🤍', collected: false },
    { id: 6, x: 72, y: 68, note: 'Petal of Cute Teasing 😉', collected: false },
    { id: 7, x: 84, y: 82, note: 'Petal of Endless Comfort 🌹', collected: false },
    { id: 8, x: 92, y: 64, note: 'Petal of Laughter 🌸', collected: false },
    { id: 9, x: 16, y: 32, note: 'Petal of Starlight Whispers ✨', collected: false },
    { id: 10, x: 78, y: 28, note: 'Petal of Forever Fondness 🤍', collected: false },
  ]);

  // 3 Hidden Golden Sparkles
  const [sparklesFound, setSparklesFound] = useState<number[]>([]);

  // Interactive fireflies
  const [fireflies, setFireflies] = useState<Firefly[]>([
    { id: 1, x: 20, y: 25, size: 6, glowDelay: 0 },
    { id: 2, x: 38, y: 32, size: 7, glowDelay: 1.2 },
    { id: 3, x: 58, y: 22, size: 5, glowDelay: 0.6 },
    { id: 4, x: 74, y: 36, size: 8, glowDelay: 2.1 },
    { id: 5, x: 85, y: 18, size: 6, glowDelay: 1.5 },
    { id: 6, x: 14, y: 50, size: 5, glowDelay: 0.8 },
  ]);

  // State
  const [bloomedRoseIds, setBloomedRoseIds] = useState<number[]>([]);
  const [activeWhisper, setActiveWhisper] = useState<{ id: number; message: string; x: number; y: number } | null>(null);
  const [lastPetalNote, setLastPetalNote] = useState<string | null>(null);
  const [showHeartConstellation, setShowHeartConstellation] = useState(false);
  const [showSecretGarden, setShowSecretGarden] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [petalShower, setPetalShower] = useState(false);

  // Petal count
  const collectedCount = petals.filter((p) => p.collected).length;
  const isSecretUnlocked = collectedCount >= 10 || sparklesFound.length >= 3;

  // Tap Rose Handler
  const handleRoseTap = (rose: GardenRose) => {
    romanticAudio.playBloomChime();
    setBloomedRoseIds((prev) => (prev.includes(rose.id) ? prev : [...prev, rose.id]));
    setActiveWhisper({
      id: rose.id,
      message: rose.message,
      x: rose.x,
      y: Math.max(15, rose.y - 12),
    });
  };

  // Double-tap Rose Handler -> Petal Shower!
  const handleRoseDoubleTap = (rose: GardenRose) => {
    romanticAudio.playHugChime();
    setPetalShower(true);
    setActiveWhisper({
      id: rose.id,
      message: `A shower of petals for ${nickname}! 🤍🌹`,
      x: rose.x,
      y: Math.max(15, rose.y - 14),
    });
    setTimeout(() => setPetalShower(false), 3000);
  };

  // Collect Petal Handler
  const handleCollectPetal = (petal: CollectiblePetal) => {
    if (petal.collected) return;
    romanticAudio.playPetalCollectSound();

    setPetals((prev) =>
      prev.map((p) => (p.id === petal.id ? { ...p, collected: true } : p))
    );
    setLastPetalNote(petal.note);
    setTimeout(() => setLastPetalNote(null), 2500);

    // If this was the 10th petal, play fanfare
    if (collectedCount + 1 >= 10) {
      setTimeout(() => {
        romanticAudio.playHugChime();
      }, 500);
    }
  };

  // Tap Firefly
  const handleTapFirefly = (id: number) => {
    romanticAudio.playFireflyChime();
    setFireflies((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, x: (f.x + 20) % 90, y: Math.max(15, (f.y - 15 + 100) % 70), isScared: true }
          : f
      )
    );
  };

  // Tap Golden Sparkle
  const handleTapSparkle = (id: number) => {
    if (sparklesFound.includes(id)) return;
    romanticAudio.playHugChime();
    setSparklesFound((prev) => [...prev, id]);
    setLastPetalNote(`Golden Starlight #${id} found! ✨`);
    setTimeout(() => setLastPetalNote(null), 2500);
  };

  // Tap Moon
  const handleTapMoon = () => {
    romanticAudio.playFireflyChime();
    setShowHeartConstellation((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none bg-gradient-to-b from-[#0F0813] via-[#1B0E20] to-[#25122B] text-[#FFFDF8]">
      {/* Dynamic Petal Shower Effect on double tap */}
      {petalShower && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(i * 3.3) % 100}%`,
                top: '-20px',
                animation: `petalFallGarden ${1.8 + (i % 5) * 0.3}s ease-in infinite`,
                animationDelay: `${(i * 0.08) % 1}s`,
              }}
            >
              <div className="w-5 h-7 rounded-full bg-white/95 shadow-md transform rotate-45 border border-[#F8E8ED]" />
            </div>
          ))}
        </div>
      )}

      {/* Atmospheric Fog Layers */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 animate-fog-drift"
        style={{
          background: 'radial-gradient(ellipse at 30% 60%, rgba(248, 232, 237, 0.18) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(to top, rgba(20, 9, 23, 0.95) 0%, rgba(35, 17, 41, 0.4) 60%, transparent 100%)',
        }}
      />

      {/* Twinkling Starfield in the Night Sky */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 4.7 + 3) % 45}%`,
              left: `${(i * 6.3 + 2) % 98}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              animationDelay: `${(i * 0.35) % 4}s`,
              animationDuration: '3.5s',
              opacity: 0.75,
            }}
          />
        ))}
      </div>

      {/* Heart Constellation in the sky (revealed by tapping Moon) */}
      {showHeartConstellation && (
        <div className="absolute top-10 left-1/3 sm:left-1/2 -translate-x-1/2 pointer-events-none z-20 animate-fadeIn">
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            {/* Connecting starlight lines */}
            <path
              d="M 110 50 C 70 10 20 40 50 100 L 110 160 L 170 100 C 200 40 150 10 110 50 Z"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Constellation Star Nodes */}
            {[
              [110, 50],
              [70, 20],
              [40, 50],
              [50, 100],
              [80, 130],
              [110, 160],
              [140, 130],
              [170, 100],
              [180, 50],
              [150, 20],
            ].map(([cx, cy], idx) => (
              <g key={idx}>
                <circle cx={cx} cy={cy} r="4" fill="#FFFBE6" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx={cx} cy={cy} r="3" fill="#FFFFFF" />
              </g>
            ))}
          </svg>
          <p className="text-[10px] text-center text-[#E2E8F0]/80 tracking-widest uppercase mt-1">
            Heart Constellation 🤍
          </p>
        </div>
      )}

      {/* Dreamy Interactive Moon */}
      <div
        onClick={handleTapMoon}
        role="button"
        tabIndex={0}
        aria-label="Tap the moon to reveal a heart constellation"
        className="absolute top-6 left-6 sm:left-12 z-20 cursor-pointer group flex flex-col items-center focus:outline-none"
      >
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FFF7D6] via-[#FFFDF8] to-[#FFFFFF] shadow-2xl transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
          {/* Subtle lunar craters */}
          <div className="absolute top-3 left-4 w-3.5 h-3.5 rounded-full bg-[#EADCC0]/35" />
          <div className="absolute bottom-4 right-5 w-4 h-4 rounded-full bg-[#EADCC0]/25" />
          <div className="absolute top-7 right-3 w-2 h-2 rounded-full bg-[#EADCC0]/30" />

          {/* Moonlight halo */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-70 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 254, 230, 0.8) 0%, rgba(217, 165, 179, 0.3) 60%, transparent 100%)',
            }}
          />
        </div>
        <span className="text-[10px] text-[#A7B5A0]/90 tracking-wider mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
          Tap Moon ✨
        </span>
      </div>

      {/* Top Floating HUD: Controls & Petal Counter */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-8 z-30 flex items-center gap-2.5 sm:gap-3">
        {/* Minimal Petal Collection Counter: ♡ X/10 */}
        <button
          onClick={() => {
            if (isSecretUnlocked) {
              setShowSecretGarden(true);
            }
          }}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-full backdrop-blur-md border text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
            isSecretUnlocked
              ? 'bg-[#F8E8ED]/90 text-[#2A1530] border-[#D9A5B3] hover:scale-105'
              : 'bg-[#1F0E20]/80 text-[#FFFDF8] border-white/20'
          }`}
          title={isSecretUnlocked ? 'Click to open Secret Garden' : 'Collect 10 petals in the garden'}
        >
          <Heart
            className={`w-4 h-4 ${
              isSecretUnlocked
                ? 'text-[#D9A5B3] fill-[#D9A5B3] animate-pulse'
                : 'text-[#D9A5B3]'
            }`}
          />
          <span className="tabular-nums font-semibold tracking-wide">
            {collectedCount}/10
          </span>
          {isSecretUnlocked ? (
            <Unlock className="w-3.5 h-3.5 text-green-400 ml-1" />
          ) : (
            <Lock className="w-3 h-3 text-[#A7B5A0] ml-1" />
          )}
        </button>

        {/* Secret Garden direct button if unlocked */}
        {isSecretUnlocked && (
          <button
            onClick={() => setShowSecretGarden(true)}
            className="min-h-[40px] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D9A5B3] to-[#F8E8ED] text-[#2A1530] text-xs font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secret Garden</span>
          </button>
        )}

        {/* Ambient Melodic Music Toggle */}
        <button
          onClick={onToggleMusic}
          aria-label={isMusicPlaying ? 'Mute/Pause melody' : 'Play gentle garden melody'}
          title={isMusicPlaying ? 'Melody Playing (Tap to pause)' : 'Play Romantic Melody'}
          className={`min-h-[40px] min-w-[40px] rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer shadow-md ${
            isMusicPlaying
              ? 'bg-[#F8E8ED] text-[#2A1530] border-[#D9A5B3]'
              : 'bg-[#1F0E20]/80 text-[#E2E8F0] border-white/20 hover:bg-[#2A1530]'
          }`}
        >
          {isMusicPlaying ? (
            isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 opacity-70" />
          )}
        </button>

        {/* Restart / Re-explore Garden */}
        <button
          onClick={onRestartExperience}
          aria-label="Restart garden journey"
          title="Restart opening"
          className="min-h-[40px] min-w-[40px] rounded-full backdrop-blur-md bg-[#1F0E20]/80 text-[#E2E8F0] border border-white/20 hover:bg-[#2A1530] flex items-center justify-center cursor-pointer shadow-md transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Toast alert when a petal or sparkle is collected */}
      {lastPetalNote && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-white/95 text-[#2A1530] text-xs font-medium shadow-xl border border-[#D9A5B3] animate-fadeIn flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A5B3]" />
          <span>{lastPetalNote}</span>
        </div>
      )}

      {/* Floating Active Rose Whisper */}
      {activeWhisper && (
        <div
          className="absolute z-40 transform -translate-x-1/2 pointer-events-auto animate-fadeIn"
          style={{
            left: `${activeWhisper.x}%`,
            top: `${activeWhisper.y}%`,
          }}
        >
          <div className="relative px-4 py-2.5 rounded-2xl bg-[#FFFDF8] text-[#2A1530] border border-[#D9A5B3] shadow-2xl flex items-center gap-2 max-w-xs">
            <Sparkles className="w-4 h-4 text-[#D9A5B3] shrink-0" />
            <p className="font-serif text-sm sm:text-base font-semibold italic">
              {activeWhisper.message}
            </p>
            <button
              onClick={() => setActiveWhisper(null)}
              className="p-1 text-[#735364] hover:text-[#2A1530] rounded-full ml-1 cursor-pointer"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Glowing Bioluminescent Fireflies */}
      {fireflies.map((f) => (
        <div
          key={f.id}
          onClick={() => handleTapFirefly(f.id)}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            animation: 'fireflyWiggle 6s ease-in-out infinite',
            animationDelay: `${f.glowDelay}s`,
          }}
          className="absolute z-25 cursor-pointer p-2 transition-all duration-700 hover:scale-150"
          title="Tap firefly to watch it glow"
        >
          <div className="relative flex items-center justify-center">
            <div
              className="w-2.5 h-2.5 rounded-full bg-[#FFFBE6] shadow-lg animate-pulse"
              style={{
                boxShadow: '0 0 12px 3px rgba(255, 251, 230, 0.9), 0 0 24px 6px rgba(229, 195, 120, 0.5)',
              }}
            />
          </div>
        </div>
      ))}

      {/* 3 Hidden Golden Sparkles */}
      {[
        { id: 1, x: 28, y: 78, hint: 'Near bottom left path' },
        { id: 2, x: 50, y: 36, hint: 'In the moonlit mist' },
        { id: 3, x: 86, y: 70, hint: 'Tucked inside right bush' },
      ].map((sp) => {
        const isFound = sparklesFound.includes(sp.id);
        if (isFound) return null;
        return (
          <button
            key={sp.id}
            onClick={() => handleTapSparkle(sp.id)}
            style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
            className="absolute z-30 p-2 cursor-pointer focus:outline-none animate-ping"
            title="A hidden golden starlight!"
            style-animation-duration="3s"
          >
            <Sparkles className="w-4 h-4 text-[#FFFBE6] drop-shadow-md" />
          </button>
        );
      })}

      {/* Winding Garden Path (SVG) */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      >
        <defs>
          <linearGradient id="pathGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4A2650" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#351B3A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1E0E22" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Curved Cobblestone Garden Path */}
        <path
          d="M 460 600 C 470 520 400 450 440 380 C 470 330 540 320 500 240 L 520 240 C 570 330 500 350 480 400 C 440 470 540 530 550 600 Z"
          fill="url(#pathGrad)"
        />
        {/* Path stepping stone glints */}
        <ellipse cx="495" cy="560" rx="20" ry="8" fill="#FFFDF8" opacity="0.15" />
        <ellipse cx="455" cy="490" rx="16" ry="6" fill="#FFFDF8" opacity="0.12" />
        <ellipse cx="460" cy="420" rx="14" ry="5" fill="#FFFDF8" opacity="0.1" />
        <ellipse cx="505" cy="350" rx="12" ry="4" fill="#FFFDF8" opacity="0.08" />
      </svg>

      {/* 10 Floating Collectible White Rose Petals */}
      {petals.map((petal) => {
        if (petal.collected) return null;
        return (
          <button
            key={petal.id}
            onClick={() => handleCollectPetal(petal)}
            style={{
              left: `${petal.x}%`,
              top: `${petal.y}%`,
              animation: `floatSlow ${4.5 + (petal.id % 4)}s ease-in-out infinite`,
            }}
            className="absolute z-35 cursor-pointer p-2.5 transition-transform hover:scale-125 active:scale-90 focus:outline-none group"
            aria-label={`Collect white petal #${petal.id}`}
          >
            <div className="relative">
              {/* Petal SVG */}
              <svg
                width="28"
                height="36"
                viewBox="0 0 30 40"
                fill="none"
                className="drop-shadow-lg group-hover:drop-shadow-xl"
              >
                <path
                  d="M 15 2 C 26 2 29 18 24 32 C 20 38 10 38 6 32 C 1 18 4 2 15 2 Z"
                  fill="#FFFDF8"
                  stroke="#F5E4EA"
                  strokeWidth="1.2"
                />
                <circle cx="15" cy="14" r="3" fill="#FFEBB3" opacity="0.75" />
              </svg>
              {/* Soft glow dot around petal */}
              <div className="absolute inset-0 rounded-full blur-xs bg-white/40 pointer-events-none" />
            </div>
          </button>
        );
      })}

      {/* Interactive Garden White Roses */}
      <div className="absolute inset-0 pointer-events-none">
        {roseData.map((rose) => {
          const isBloomed = bloomedRoseIds.includes(rose.id);
          return (
            <div
              key={rose.id}
              style={{
                left: `${rose.x}%`,
                top: `${rose.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 pointer-events-auto"
            >
              <WhiteRoseSvg
                size={rose.size}
                showStem={true}
                stemAngle={rose.rotation}
                isBloomed={isBloomed}
                isInteractive={true}
                isGlowing={true}
                onClick={() => handleRoseTap(rose)}
                onDoubleClick={() => handleRoseDoubleTap(rose)}
              />
            </div>
          );
        })}
      </div>

      {/* Secret Garden Modal Overlay when unlocked and opened */}
      {showSecretGarden && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1C0D20] via-[#24112A] to-[#120716] border border-[#D9A5B3]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowSecretGarden(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#A7B5A0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close secret garden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Secret Garden Arch Title */}
            <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-[#D9A5B3] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Secret Sanctuary</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FFFDF8] tracking-tight mb-2">
              You found my little secret. 🤍
            </h3>

            <p className="text-xs sm:text-sm text-[#A7B5A0] mb-4">
              Saare petals collect ho gaye... yeh secret bouquet sirf tumhare liye hai.
            </p>

            {/* Interactive Bouquet Centerpiece */}
            <InteractiveBouquet
              nickname={nickname}
              senderName={senderName}
              onOpenLetter={() => setShowLetterModal(true)}
            />

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-4">
              <button
                onClick={() => setShowSecretGarden(false)}
                className="text-xs text-[#A7B5A0] hover:text-[#FFFDF8] underline underline-offset-4 cursor-pointer py-1"
              >
                Continue exploring garden 🌹
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Love Letter Modal (Triggered from bouquet envelope) */}
      {showLetterModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-sm bg-[#FFFDF8] text-[#2A1530] border border-[#D9A5B3] rounded-3xl p-6 sm:p-7 shadow-2xl">
            <button
              onClick={() => setShowLetterModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#735364] hover:text-[#2A1530] hover:bg-[#F8E8ED] transition-colors cursor-pointer"
              aria-label="Close letter"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#735364]">
                A Whisper In The Garden
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1530] mt-1">
                Sirf tumhare liye 💌
              </h4>
            </div>

            {/* Exact minimal letter requested by user prompt */}
            <div className="space-y-3 font-serif text-sm sm:text-base leading-relaxed text-[#2A1530]/90">
              <p>Hey meri {nickname},</p>
              <p>Yeh chhota sa garden sirf tumhare liye. 🤍</p>
              <p>Har rose ke saath thoda sa pyaar aur ek chhoti si smile.</p>
              <div className="pt-2 text-right">
                <p className="font-serif italic text-xs text-[#735364]">With love,</p>
                <p className="font-serif text-base font-bold text-[#2A1530]">
                  {senderName} 🌹
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#D9A5B3]/30 flex justify-center">
              <button
                onClick={() => setShowLetterModal(false)}
                className="min-h-[40px] px-6 py-1.5 rounded-full bg-[#2A1530] text-white text-xs font-medium hover:bg-[#1C0D20] transition-colors cursor-pointer"
              >
                Close 🤍
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gentle Floating Petals Background throughout garden */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 8.5) % 100}%`,
              top: '-30px',
              animation: `petalFallGarden ${12 + (i % 6) * 2}s linear infinite`,
              animationDelay: `${(i * 1.1) % 8}s`,
              opacity: 0.45,
            }}
          >
            <div className="w-3.5 h-4.5 rounded-full bg-white/80 shadow-xs transform rotate-25" />
          </div>
        ))}
      </div>
    </div>
  );
};
