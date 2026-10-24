import React, { useMemo } from 'react';

interface FloatingPetal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
}

export const FloatingPetalsBackground: React.FC = () => {
  // Pre-calculate deterministic floating petals to avoid hydration mismatch and layout shifts
  const petals: FloatingPetal[] = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8 + 2) % 100}%`,
      size: 14 + (i % 5) * 4,
      duration: 12 + (i % 6) * 2.5,
      delay: (i * 0.8) % 10,
      rotation: (i * 47) % 360,
      opacity: 0.35 + ((i % 4) * 0.15),
    }));
  }, []);

  // Soft glowing ambient particles
  const sparkles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: `${(i * 7.3 + 5) % 95}%`,
      left: `${(i * 8.1 + 3) % 95}%`,
      size: 2 + (i % 3) * 1.5,
      delay: (i * 0.5) % 5,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Soft romantic gradient background */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, #FFFDF8 0%, #FAF0F4 50%, #F5E5EC 100%)',
        }}
      />

      {/* Subtle starlight sparkles */}
      {sparkles.map((s) => (
        <div
          key={`sparkle-${s.id}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: '3.5s',
            boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.85)',
          }}
        />
      ))}

      {/* Floating White Rose Petals */}
      {petals.map((p) => (
        <div
          key={`petal-${p.id}`}
          className="absolute"
          style={{
            left: p.left,
            top: '-40px',
            animation: `petalDrift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          {/* Delicate curved white rose petal SVG */}
          <svg
            width={p.size}
            height={p.size * 1.25}
            viewBox="0 0 30 40"
            fill="none"
            style={{
              transform: `rotate(${p.rotation}deg)`,
              filter: 'drop-shadow(0 2px 4px rgba(86, 60, 74, 0.08))',
            }}
          >
            <path
              d="M 15 2 C 26 2 29 18 24 32 C 20 38 10 38 6 32 C 1 18 4 2 15 2 Z"
              fill="url(#ambientPetalGrad)"
            />
            <path
              d="M 15 5 C 19 14 17 26 14 34"
              stroke="#F0DEE5"
              strokeWidth="0.75"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="ambientPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FFFDF8" />
                <stop offset="90%" stopColor="#F5E4EA" />
                <stop offset="100%" stopColor="#E2BAC6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};
