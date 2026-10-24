import React from 'react';

interface WhiteRoseSvgProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  isGlowing?: boolean;
  isInteractive?: boolean;
  isBloomed?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  showStem?: boolean;
  stemAngle?: number;
}

export const WhiteRoseSvg: React.FC<WhiteRoseSvgProps> = ({
  className = '',
  size = 'md',
  isGlowing = true,
  isInteractive = true,
  isBloomed = false,
  onClick,
  onDoubleClick,
  showStem = true,
  stemAngle = 0,
}) => {
  const sizeMap = {
    xs: 'w-14 h-16 sm:w-16 sm:h-20',
    sm: 'w-20 h-24 sm:w-24 sm:h-28',
    md: 'w-32 h-36 sm:w-40 sm:h-44',
    lg: 'w-48 h-56 sm:w-60 sm:h-72',
    hero: 'w-64 h-72 sm:w-80 sm:h-96 md:w-96 md:h-[420px]',
  };

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label="Interactive delicate white rose"
      style={{
        transform: stemAngle ? `rotate(${stemAngle}deg)` : undefined,
      }}
      className={`relative inline-block select-none transition-all duration-700 ${
        isInteractive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${sizeMap[size]} ${className}`}
    >
      {/* Background radial aura glow */}
      {isGlowing && (
        <div
          className={`absolute inset-0 rounded-full blur-2xl pointer-events-none transition-all duration-700 ${
            isBloomed
              ? 'opacity-90 scale-125'
              : 'opacity-40 animate-pulse-glow'
          }`}
          style={{
            background: isBloomed
              ? 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(248, 232, 237, 0.8) 40%, rgba(229, 195, 120, 0.4) 70%, transparent 100%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(248, 232, 237, 0.45) 50%, transparent 80%)',
          }}
        />
      )}

      {/* Primary White Rose SVG */}
      <svg
        viewBox="0 0 400 480"
        className={`relative z-10 w-full h-full drop-shadow-md transition-transform duration-700 ${
          isBloomed ? 'scale-110' : 'animate-sway-slow'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rosePetalOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFDF8" />
            <stop offset="90%" stopColor="#F5E4EA" />
            <stop offset="100%" stopColor="#E6C8D2" />
          </linearGradient>

          <linearGradient id="rosePetalMid" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF9FB" />
            <stop offset="85%" stopColor="#EED7DE" />
            <stop offset="100%" stopColor="#D9A5B3" />
          </linearGradient>

          <linearGradient id="rosePetalCore" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#FFF7FA" />
            <stop offset="50%" stopColor="#F1D8E1" />
            <stop offset="85%" stopColor="#C98B9C" />
            <stop offset="100%" stopColor="#563C4A" />
          </linearGradient>

          <linearGradient id="roseStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4D6345" />
            <stop offset="45%" stopColor="#7F9C75" />
            <stop offset="70%" stopColor="#A7B5A0" />
            <stop offset="100%" stopColor="#3E5237" />
          </linearGradient>

          <linearGradient id="roseLeafGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#AEC0A8" />
            <stop offset="50%" stopColor="#728F68" />
            <stop offset="100%" stopColor="#3E5237" />
          </linearGradient>

          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBE6" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FBE9F0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F8E8ED" stopOpacity="0" />
          </radialGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#2A1530" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Stem and Leaves */}
        {showStem && (
          <g id="stem-and-leaves">
            <path
              d="M 200 240 Q 198 320 206 380 T 202 460"
              stroke="url(#roseStemGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 202 245 Q 200 320 208 380 T 204 455"
              stroke="#D3E0CE"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Little natural thorn */}
            <path
              d="M 203 330 Q 218 335 220 342 Q 212 346 204 340 Z"
              fill="#3E5237"
            />

            {/* Left Leaf with vein */}
            <g transform="translate(198, 300) rotate(-35)">
              <path
                d="M 0 0 C -30 -30 -70 -20 -90 0 C -70 30 -30 30 0 0 Z"
                fill="url(#roseLeafGrad)"
                filter="url(#softShadow)"
              />
              <path
                d="M 0 0 C -30 -5 -60 -2 -85 0"
                stroke="#DCE5D8"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.75"
              />
              <circle cx="-50" cy="-6" r="3" fill="#FFFFFF" opacity="0.85" />
            </g>

            {/* Right Leaf with vein */}
            <g transform="translate(204, 355) rotate(32)">
              <path
                d="M 0 0 C 30 -25 70 -15 88 5 C 68 32 30 28 0 0 Z"
                fill="url(#roseLeafGrad)"
                filter="url(#softShadow)"
              />
              <path
                d="M 0 0 C 30 -3 60 2 82 5"
                stroke="#DCE5D8"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.75"
              />
            </g>

            {/* Sepals underneath rose bloom */}
            <path
              d="M 188 235 C 170 245 155 265 148 285 C 160 270 178 255 194 240 Z"
              fill="#3E5237"
            />
            <path
              d="M 212 235 C 230 245 245 265 252 285 C 240 270 222 255 206 240 Z"
              fill="#3E5237"
            />
          </g>
        )}

        {/* Rose Flower Head / Petals Layers */}
        <g id="flower-bloom" filter="url(#softShadow)">
          {/* Layer 1: Outermost wide velvety petals */}
          <path
            d="M 200 245 C 140 250 85 205 90 145 C 95 90 150 70 200 80 C 250 70 305 90 310 145 C 315 205 260 250 200 245 Z"
            fill="url(#rosePetalOuter)"
            stroke="#E9D5DD"
            strokeWidth="0.8"
            className="transition-transform duration-700"
            style={{
              transform: isBloomed ? 'scale(1.08) translate(-15px, -5px)' : 'none',
              transformOrigin: '200px 200px',
            }}
          />

          {/* Layer 2: Left and Right outer folding petals */}
          <path
            d="M 105 130 C 90 175 125 225 175 235 C 160 195 140 160 145 125 C 125 122 112 124 105 130 Z"
            fill="url(#rosePetalOuter)"
            stroke="#E0CCD5"
            strokeWidth="0.8"
          />
          <path
            d="M 295 130 C 310 175 275 225 225 235 C 240 195 260 160 255 125 C 275 122 288 124 295 130 Z"
            fill="url(#rosePetalOuter)"
            stroke="#E0CCD5"
            strokeWidth="0.8"
          />

          {/* Layer 3: Mid-tier cupped petals with soft blush shading */}
          <path
            d="M 125 110 C 120 160 155 210 200 220 C 245 210 280 160 275 110 C 245 125 225 125 200 120 C 175 125 155 125 125 110 Z"
            fill="url(#rosePetalMid)"
            stroke="#E4D1D8"
            strokeWidth="0.8"
          />

          {/* Layer 4: Asymmetric graceful organic petal folds */}
          <path
            d="M 140 125 C 135 175 180 205 210 205 C 180 190 165 160 168 120 C 152 120 144 122 140 125 Z"
            fill="url(#rosePetalMid)"
            stroke="#DFC9D2"
            strokeWidth="0.6"
          />
          <path
            d="M 260 125 C 265 175 220 205 190 205 C 220 190 235 160 232 120 C 248 120 256 122 260 125 Z"
            fill="url(#rosePetalMid)"
            stroke="#DFC9D2"
            strokeWidth="0.6"
          />

          {/* Layer 5: Inner heart spiral / rose whorl */}
          <path
            d="M 160 105 C 155 145 185 180 200 185 C 215 180 245 145 240 105 C 220 115 210 115 200 112 C 190 115 180 115 160 105 Z"
            fill="url(#rosePetalCore)"
            stroke="#D6AAB8"
            strokeWidth="0.6"
          />

          {/* Inner heart swirling petals */}
          <path
            d="M 175 115 C 170 140 190 165 205 165 C 215 155 225 135 220 118 C 210 124 205 124 200 120 C 192 124 185 124 175 115 Z"
            fill="url(#rosePetalCore)"
            stroke="#BA8B9C"
            strokeWidth="0.5"
          />

          {/* Central tight bud vortex */}
          <path
            d="M 190 120 C 185 135 198 150 204 150 C 210 145 215 132 210 122 C 205 125 198 125 190 120 Z"
            fill="#563C4A"
            opacity="0.85"
          />
          <path
            d="M 195 122 C 192 130 200 138 203 138 C 206 135 208 128 205 123 C 202 124 198 124 195 122 Z"
            fill="#FFF5F8"
            opacity="0.9"
          />

          {/* Center golden stamen shimmer */}
          <circle cx="200" cy="132" r={isBloomed ? 24 : 18} fill="url(#centerGlow)" />
          <circle cx="200" cy="132" r={isBloomed ? 4.5 : 3} fill="#FFEBB3" opacity="0.9" />

          {/* Dew droplets on petals */}
          <circle cx="160" cy="180" r="2.8" fill="#FFFFFF" opacity="0.9" />
          <circle cx="160" cy="179.5" r="1.1" fill="#EBF4FF" />
          <circle cx="245" cy="170" r="3.2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="190" cy="215" r="2.4" fill="#FFFFFF" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
};
