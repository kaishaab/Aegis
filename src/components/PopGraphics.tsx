import React from 'react';

// Burgundy Satin Bow matching the corners of Screenshot 1 & Screenshot 2
export const BurgundyBow: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 52 }) => (
  <svg
    width={size}
    height={size * 0.8}
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md select-none pointer-events-none ${className}`}
  >
    <defs>
      <linearGradient id="bowGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A0F35" />
        <stop offset="45%" stopColor="#C92A65" />
        <stop offset="80%" stopColor="#54071E" />
      </linearGradient>
      <linearGradient id="bowGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8A0F35" />
        <stop offset="45%" stopColor="#C92A65" />
        <stop offset="80%" stopColor="#54071E" />
      </linearGradient>
      <linearGradient id="knotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A81D4C" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#4A051A" />
      </linearGradient>
      <linearGradient id="tailGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A0F35" />
        <stop offset="100%" stopColor="#3F0414" />
      </linearGradient>
    </defs>
    {/* Left Ribbon Tail */}
    <path
      d="M48 42 C40 56 32 68 18 78 L26 56 L36 44 Z"
      fill="url(#tailGrad1)"
      stroke="#4A051A"
      strokeWidth="0.8"
    />
    {/* Right Ribbon Tail */}
    <path
      d="M52 42 C60 56 68 68 82 78 L74 56 L64 44 Z"
      fill="url(#tailGrad1)"
      stroke="#4A051A"
      strokeWidth="0.8"
    />
    {/* Left Loop */}
    <path
      d="M50 38 C40 18 10 12 14 34 C16 48 42 42 50 38 Z"
      fill="url(#bowGradientLeft)"
      stroke="#4A051A"
      strokeWidth="1"
    />
    <path
      d="M48 37 C42 24 24 20 25 32 C26 39 42 38 48 37 Z"
      fill="#4A051A"
      opacity="0.4"
    />
    {/* Right Loop */}
    <path
      d="M50 38 C60 18 90 12 86 34 C84 48 58 42 50 38 Z"
      fill="url(#bowGradientRight)"
      stroke="#4A051A"
      strokeWidth="1"
    />
    <path
      d="M52 37 C58 24 76 20 75 32 C74 39 58 38 52 37 Z"
      fill="#4A051A"
      opacity="0.4"
    />
    {/* Center Knot */}
    <ellipse cx="50" cy="38" rx="8" ry="7" fill="url(#knotGrad)" stroke="#380312" strokeWidth="1" />
    <path d="M47 34 Q50 31 53 34" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// Pink Disco Ball with sparkly facets matching Screenshot 1
export const PinkDiscoBall: React.FC<{ size?: number; className?: string }> = ({ size = 110, className = '' }) => (
  <div className={`relative inline-block ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <radialGradient id="discoGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FF80BF" />
          <stop offset="70%" stopColor="#FF1493" />
          <stop offset="100%" stopColor="#99004C" />
        </radialGradient>
        <filter id="ballShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#FF1493" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Hanging hook */}
      <line x1="60" y1="0" x2="60" y2="12" stroke="#D13B7E" strokeWidth="2" strokeDasharray="2 2" />
      <circle cx="60" cy="13" r="3" fill="#D13B7E" />

      {/* Sphere base */}
      <circle cx="60" cy="65" r="48" fill="url(#discoGlow)" filter="url(#ballShadow)" />

      {/* Facet tiles grid */}
      <g opacity="0.92">
        {/* Row 1 */}
        <rect x="42" y="24" width="8" height="7" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="52" y="23" width="9" height="7" rx="1" fill="#FFB6C1" />
        <rect x="63" y="23" width="9" height="7" rx="1" fill="#FFFFFF" opacity="0.95" />
        <rect x="74" y="25" width="8" height="7" rx="1" fill="#FF69B4" />

        {/* Row 2 */}
        <rect x="30" y="33" width="9" height="8" rx="1" fill="#FFC0CB" />
        <rect x="41" y="32" width="10" height="8" rx="1" fill="#FFFFFF" />
        <rect x="53" y="31" width="10" height="8" rx="1" fill="#FF1493" opacity="0.75" />
        <rect x="65" y="31" width="10" height="8" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="77" y="33" width="9" height="8" rx="1" fill="#FF69B4" />

        {/* Row 3 */}
        <rect x="22" y="43" width="10" height="9" rx="1" fill="#FF85C0" />
        <rect x="34" y="42" width="11" height="9" rx="1" fill="#FFFFFF" opacity="0.95" />
        <rect x="47" y="41" width="11" height="9" rx="1" fill="#FFB7D5" />
        <rect x="60" y="40" width="11" height="9" rx="1" fill="#FFFFFF" />
        <rect x="73" y="41" width="11" height="9" rx="1" fill="#FF1493" opacity="0.8" />
        <rect x="86" y="43" width="9" height="9" rx="1" fill="#E05297" />

        {/* Row 4 (Equator - brightest highlights) */}
        <rect x="18" y="54" width="10" height="10" rx="1" fill="#D94085" />
        <rect x="30" y="53" width="11" height="10" rx="1" fill="#FF85C0" />
        <rect x="43" y="52" width="12" height="10" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="57" y="51" width="12" height="10" rx="1" fill="#FFE0ED" />
        <rect x="71" y="52" width="12" height="10" rx="1" fill="#FF69B4" />
        <rect x="85" y="53" width="11" height="10" rx="1" fill="#FFFFFF" opacity="0.8" />

        {/* Row 5 */}
        <rect x="20" y="66" width="10" height="10" rx="1" fill="#B32468" />
        <rect x="32" y="65" width="11" height="10" rx="1" fill="#FF69B4" />
        <rect x="45" y="64" width="12" height="10" rx="1" fill="#FFB7D5" />
        <rect x="59" y="63" width="12" height="10" rx="1" fill="#FFFFFF" opacity="0.85" />
        <rect x="73" y="64" width="11" height="10" rx="1" fill="#D94085" />
        <rect x="86" y="66" width="10" height="10" rx="1" fill="#99004C" opacity="0.8" />

        {/* Row 6 */}
        <rect x="25" y="78" width="10" height="9" rx="1" fill="#99004C" opacity="0.75" />
        <rect x="37" y="77" width="11" height="9" rx="1" fill="#D94085" />
        <rect x="50" y="76" width="11" height="9" rx="1" fill="#FF85C0" />
        <rect x="63" y="75" width="11" height="9" rx="1" fill="#FFFFFF" opacity="0.7" />
        <rect x="76" y="77" width="10" height="9" rx="1" fill="#B32468" />

        {/* Row 7 */}
        <rect x="36" y="89" width="10" height="8" rx="1" fill="#7A003D" />
        <rect x="48" y="87" width="11" height="8" rx="1" fill="#B32468" />
        <rect x="61" y="87" width="11" height="8" rx="1" fill="#FF85C0" opacity="0.8" />
        <rect x="74" y="88" width="9" height="8" rx="1" fill="#7A003D" />
      </g>

      {/* Glossy top crescent reflection */}
      <path
        d="M26 48 C32 30 52 22 75 22 C60 25 40 33 34 52 Z"
        fill="#FFFFFF"
        opacity="0.45"
      />
    </svg>

    {/* Pop sparkles around disco ball */}
    <span className="absolute -top-1 -right-2 text-pink-400 text-lg animate-sparkle">✦</span>
    <span className="absolute bottom-2 -left-3 text-pink-500 text-base animate-pulse">✧</span>
    <span className="absolute -bottom-2 right-4 text-pink-300 text-sm animate-sparkle">★</span>
  </div>
);

// Pink Rosette / Scrunchie matching Screenshot 1
export const PinkScrunchie: React.FC<{ size?: number; className?: string }> = ({ size = 44, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-sm select-none pointer-events-none ${className}`}
  >
    <defs>
      <radialGradient id="scrunchieGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF0F5" />
        <stop offset="40%" stopColor="#FFB6C1" />
        <stop offset="85%" stopColor="#FF69B4" />
        <stop offset="100%" stopColor="#DB2777" />
      </radialGradient>
    </defs>
    {/* Ruffled Petals / Scrunchie folds */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
      <circle
        key={idx}
        cx={30 + 14 * Math.cos((angle * Math.PI) / 180)}
        cy={30 + 14 * Math.sin((angle * Math.PI) / 180)}
        r="11"
        fill="url(#scrunchieGrad)"
        opacity="0.9"
        stroke="#F472B6"
        strokeWidth="0.8"
      />
    ))}
    <circle cx="30" cy="30" r="12" fill="#FF85A2" />
    <circle cx="30" cy="30" r="6" fill="#FFF" opacity="0.85" />
  </svg>
);

// Retro Y2K Flip Phone matching Screenshot 2
export const Y2KFlipPhone: React.FC<{ size?: number; className?: string }> = ({ size = 100, className = '' }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 100 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-xl select-none ${className}`}
  >
    <defs>
      <linearGradient id="phoneBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E9D5FF" />
        <stop offset="40%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
      <linearGradient id="rainbowScreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FED7AA" />
        <stop offset="30%" stopColor="#FEF08A" />
        <stop offset="60%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#DDD6FE" />
      </linearGradient>
      <linearGradient id="keypadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
    </defs>

    {/* Small cute antenna */}
    <rect x="76" y="2" width="6" height="18" rx="3" fill="#D946EF" stroke="#86198F" strokeWidth="1" />
    <circle cx="79" cy="2" r="4" fill="#F472B6" />

    {/* Top Flip Screen Section */}
    <g transform="rotate(-6 50 65)">
      <rect x="18" y="10" width="64" height="68" rx="16" fill="url(#phoneBody)" stroke="#9D174D" strokeWidth="2" />
      {/* Screen frame */}
      <rect x="25" y="18" width="50" height="42" rx="8" fill="url(#rainbowScreen)" stroke="#BE185D" strokeWidth="1.5" />
      {/* Heart charm inside screen */}
      <path
        d="M50 32 C50 26 42 24 40 28 C37 33 50 44 50 44 C50 44 63 33 60 28 C58 24 50 26 50 32 Z"
        fill="#FF2E93"
      />
      {/* Speaker slits */}
      <circle cx="45" cy="14" r="1.5" fill="#831843" />
      <circle cx="50" cy="14" r="1.5" fill="#831843" />
      <circle cx="55" cy="14" r="1.5" fill="#831843" />
    </g>

    {/* Hinge */}
    <rect x="22" y="70" width="56" height="10" rx="5" fill="#9D174D" stroke="#700C32" strokeWidth="1.5" />
    <circle cx="32" cy="75" r="3" fill="#F472B6" />
    <circle cx="68" cy="75" r="3" fill="#F472B6" />

    {/* Bottom Keypad Base */}
    <rect x="18" y="75" width="64" height="68" rx="16" fill="url(#phoneBody)" stroke="#9D174D" strokeWidth="2" />

    {/* D-Pad Nav Circle */}
    <circle cx="50" cy="88" r="9" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.5" />
    <circle cx="50" cy="88" r="4" fill="#EC4899" />

    {/* Call & End buttons */}
    <circle cx="32" cy="88" r="4" fill="#34D399" stroke="#059669" strokeWidth="1" />
    <circle cx="68" cy="88" r="4" fill="#F87171" stroke="#DC2626" strokeWidth="1" />

    {/* Numeric keys */}
    <g fill="url(#keypadGrad)" stroke="#DB2777" strokeWidth="0.8">
      {/* Row 1 */}
      <rect x="28" y="100" width="12" height="7" rx="3" />
      <rect x="44" y="100" width="12" height="7" rx="3" />
      <rect x="60" y="100" width="12" height="7" rx="3" />
      {/* Row 2 */}
      <rect x="28" y="110" width="12" height="7" rx="3" />
      <rect x="44" y="110" width="12" height="7" rx="3" />
      <rect x="60" y="110" width="12" height="7" rx="3" />
      {/* Row 3 */}
      <rect x="28" y="120" width="12" height="7" rx="3" />
      <rect x="44" y="120" width="12" height="7" rx="3" />
      <rect x="60" y="120" width="12" height="7" rx="3" />
      {/* Row 4 (* 0 #) */}
      <rect x="28" y="130" width="12" height="7" rx="3" fill="#FDE047" />
      <rect x="44" y="130" width="12" height="7" rx="3" />
      <rect x="60" y="130" width="12" height="7" rx="3" fill="#FDE047" />
    </g>
  </svg>
);

// Diamond Sparkles
export const SparkleStar: React.FC<{
  size?: number;
  className?: string;
  color?: string;
}> = ({ size = 20, className = '', color = '#FF2E93' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z"
      fill={color}
    />
  </svg>
);

// Garland Ribbon Ties for bottom card border (matching Screenshot 1)
export const RibbonGarland: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 py-1 ${className}`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center">
        <svg width="24" height="14" viewBox="0 0 40 24" fill="none" className="text-red-700">
          <path
            d="M20 12 C12 6 6 8 8 16 C10 20 18 16 20 12 Z"
            fill="#8A0F35"
          />
          <path
            d="M20 12 C28 6 34 8 32 16 C30 20 22 16 20 12 Z"
            fill="#8A0F35"
          />
          <ellipse cx="20" cy="12" rx="3" ry="2.5" fill="#F472B6" />
          <path d="M19 13 Q16 22 12 22" stroke="#8A0F35" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 13 Q24 22 28 22" stroke="#8A0F35" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {i < 5 && <div className="w-8 h-0.5 border-b-2 border-dotted border-red-800/40 -mt-1" />}
      </div>
    ))}
  </div>
);

// Category Icons (matching Screenshot 1 circles)
export const CategoryPillIcon: React.FC<{
  category: 'police' | 'bus' | 'washroom' | 'hospital' | 'pharmacy' | 'metro' | 'petrol' | 'hotel';
  size?: number;
}> = ({ category, size = 52 }) => {
  switch (category) {
    case 'police':
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center shadow-sm relative overflow-hidden"
        >
          <span className="text-2xl">🏛️</span>
          <span className="absolute bottom-0.5 right-0.5 text-[10px]">⭐</span>
        </div>
      );
    case 'bus':
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-cyan-100 border-2 border-cyan-300 flex items-center justify-center shadow-sm"
        >
          <span className="text-2xl">🚏</span>
        </div>
      );
    case 'washroom':
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-pink-100 border-2 border-pink-300 flex items-center justify-center shadow-sm"
        >
          <div className="flex items-center -space-x-0.5 text-lg font-bold">
            <span className="text-blue-500">🚹</span>
            <span className="text-pink-500">🚺</span>
          </div>
        </div>
      );
    case 'hospital':
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center shadow-sm"
        >
          <span className="text-2xl">🏥</span>
        </div>
      );
    case 'pharmacy':
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center shadow-sm"
        >
          <span className="text-2xl">💊</span>
        </div>
      );
    case 'metro':
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-pink-200 border-2 border-pink-400 flex items-center justify-center shadow-sm"
        >
          <span className="text-2xl">🚇</span>
        </div>
      );
    case 'petrol':
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center shadow-sm"
        >
          <span className="text-2xl">⛽</span>
        </div>
      );
    case 'hotel':
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center shadow-sm"
        >
          <span className="text-2xl">🏨</span>
        </div>
      );
  }
};

// =================== EXTRA POP STICKERS ===================

// 1. AEGIS Shield Sticker with Wings, Gold Star & Bow
export const AegisShieldSticker: React.FC<{ size?: number; className?: string }> = ({ size = 72, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md select-none pointer-events-none hover:rotate-3 transition-transform ${className}`}
  >
    <defs>
      <linearGradient id="aegisShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDA4AF" />
        <stop offset="40%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#BE123C" />
      </linearGradient>
      <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FCE7F3" />
      </linearGradient>
    </defs>
    {/* White die-cut outline background */}
    <path
      d="M50 8 C68 8 88 15 88 40 C88 68 56 88 50 94 C44 88 12 68 12 40 C12 15 32 8 50 8 Z"
      fill="#FFFFFF"
    />
    {/* Wings */}
    <path
      d="M18 42 C6 35 2 24 10 16 C18 10 32 20 28 35 Z"
      fill="url(#wingGrad)"
      stroke="#FDA4AF"
      strokeWidth="1.5"
    />
    <path
      d="M82 42 C94 35 98 24 90 16 C82 10 68 20 72 35 Z"
      fill="url(#wingGrad)"
      stroke="#FDA4AF"
      strokeWidth="1.5"
    />
    {/* Shield Core */}
    <path
      d="M50 12 C64 12 80 18 80 38 C80 62 54 78 50 84 C46 78 20 62 20 38 C20 18 36 12 50 12 Z"
      fill="url(#aegisShieldGrad)"
      stroke="#FFE4E6"
      strokeWidth="2"
    />
    {/* Golden Star in center */}
    <path
      d="M50 26 L53.5 34 L62 34.5 L55 39.5 L58 48 L50 42.5 L42 48 L45 39.5 L38 34.5 L46.5 34 Z"
      fill="#FDE047"
      stroke="#CA8A04"
      strokeWidth="1"
    />
    {/* Text "AEGIS" */}
    <text
      x="50"
      y="62"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="10"
      fontWeight="900"
      fontFamily="system-ui, sans-serif"
      letterSpacing="1"
    >
      AEGIS
    </text>
    {/* Small cute ribbon bow on top */}
    <ellipse cx="50" cy="14" rx="4" ry="3" fill="#BE123C" stroke="#FFF" strokeWidth="1" />
  </svg>
);

// 2. GIRL POWER Y2K Pop Badge Sticker
export const GirlPowerSticker: React.FC<{ size?: number; className?: string }> = ({ size = 70, className = '' }) => (
  <svg
    width={size}
    height={size * 0.75}
    viewBox="0 0 110 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-lg select-none pointer-events-none hover:scale-105 transition-transform ${className}`}
  >
    <defs>
      <linearGradient id="gpTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="50%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#D946EF" />
      </linearGradient>
    </defs>
    {/* White Die-cut bubble badge */}
    <rect x="5" y="6" width="100" height="66" rx="22" fill="#FFFFFF" />
    {/* Inner pink outline */}
    <rect x="8" y="9" width="94" height="60" rx="19" fill="#FFF1F2" stroke="#FB7185" strokeWidth="2.5" strokeDasharray="4 2" />
    
    {/* GIRL */}
    <text
      x="55"
      y="34"
      textAnchor="middle"
      fill="url(#gpTextGrad)"
      fontSize="19"
      fontWeight="900"
      fontFamily="system-ui, sans-serif"
      stroke="#881337"
      strokeWidth="0.8"
      letterSpacing="1.5"
    >
      GIRL
    </text>
    {/* POWER */}
    <text
      x="55"
      y="55"
      textAnchor="middle"
      fill="#BE185D"
      fontSize="17"
      fontWeight="900"
      fontFamily="system-ui, sans-serif"
      stroke="#FFF"
      strokeWidth="0.5"
      letterSpacing="2"
    >
      POWER
    </text>
    {/* Sparkles */}
    <text x="14" y="24" fontSize="13">✨</text>
    <text x="86" y="58" fontSize="13">💖</text>
  </svg>
);

// 3. "STAY SAFE" Heart Pop Sticker
export const StaySafeHeartSticker: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md select-none pointer-events-none hover:rotate-6 transition-transform ${className}`}
  >
    <defs>
      <linearGradient id="heartStickerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>
    {/* White die-cut outline */}
    <path
      d="M45 80 C20 62 6 46 6 27 C6 14 16 5 28 5 C36 5 42 9 45 15 C48 9 54 5 62 5 C74 5 84 14 84 27 C84 46 70 62 45 80 Z"
      fill="#FFFFFF"
    />
    {/* Inner Heart */}
    <path
      d="M45 74 C24 58 12 44 12 28 C12 17 20 10 30 10 C37 10 42 14 45 19 C48 14 53 10 60 10 C70 10 78 17 78 28 C78 44 66 58 45 74 Z"
      fill="url(#heartStickerGrad)"
      stroke="#FCE7F3"
      strokeWidth="2"
    />
    {/* Gloss shine */}
    <path
      d="M20 22 C20 16 28 14 36 17 C26 19 22 25 20 22 Z"
      fill="#FFFFFF"
      opacity="0.6"
    />
    <text
      x="45"
      y="38"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="10"
      fontWeight="900"
      fontFamily="system-ui, sans-serif"
      letterSpacing="1"
    >
      STAY
    </text>
    <text
      x="45"
      y="51"
      textAnchor="middle"
      fill="#FDF2F8"
      fontSize="11"
      fontWeight="900"
      fontFamily="system-ui, sans-serif"
      letterSpacing="1.2"
    >
      SAFE 💕
    </text>
  </svg>
);

// 4. Cute Pink Pepper Spray Sticker
export const CutePepperSpraySticker: React.FC<{ size?: number; className?: string }> = ({ size = 68, className = '' }) => (
  <svg
    width={size * 0.6}
    height={size}
    viewBox="0 0 50 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md select-none pointer-events-none hover:-rotate-6 transition-transform ${className}`}
  >
    <defs>
      <linearGradient id="canisterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="45%" stopColor="#FFB6C1" />
        <stop offset="70%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
    </defs>
    {/* White die-cut border */}
    <rect x="8" y="2" width="34" height="80" rx="14" fill="#FFFFFF" />
    
    {/* Trigger Cap */}
    <path d="M16 8 C16 4 20 4 25 4 C30 4 34 4 34 8 L36 24 L14 24 Z" fill="#9D174D" />
    <circle cx="25" cy="14" r="3" fill="#F43F5E" />
    {/* Spray nozzle notch */}
    <rect x="12" y="12" width="6" height="4" rx="1" fill="#4C0519" />
    {/* Canister Body */}
    <rect x="12" y="24" width="26" height="52" rx="6" fill="url(#canisterGrad)" stroke="#BE185D" strokeWidth="1" />
    
    {/* Canister Label */}
    <rect x="14" y="36" width="22" height="26" rx="3" fill="#FFF" />
    <text x="25" y="46" textAnchor="middle" fill="#BE185D" fontSize="6.5" fontWeight="900">
      SAFETY
    </text>
    <text x="25" y="55" textAnchor="middle" fill="#9D174D" fontSize="6" fontWeight="bold">
      SPRAY
    </text>
    <text x="25" y="60" textAnchor="middle" fontSize="6">🌶️</text>
    {/* Star charm on lanyard */}
    <path d="M38 22 Q44 26 42 34" stroke="#FB7185" strokeWidth="1.5" fill="none" />
    <polygon points="42,33 44,36 47,36 45,38 46,41 42,39 40,41 40,38 38,36 41,36" fill="#FDE047" stroke="#CA8A04" strokeWidth="0.5" />
  </svg>
);

// 5. Retro Heart-Shaped Pink Sunglasses Sticker
export const HeartSunglassesSticker: React.FC<{ size?: number; className?: string }> = ({ size = 70, className = '' }) => (
  <svg
    width={size}
    height={size * 0.55}
    viewBox="0 0 100 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md select-none pointer-events-none hover:scale-105 transition-transform ${className}`}
  >
    {/* White die-cut outline */}
    <path
      d="M2 18 C2 6 18 2 28 10 C34 16 38 22 46 22 C54 22 58 16 64 10 C74 2 90 6 90 18 C90 34 76 46 65 52 C58 48 54 40 50 36 C46 40 42 48 35 52 C24 46 10 34 10 18 Z"
      fill="#FFFFFF"
      transform="scale(1.08) translate(-4, -2)"
    />
    {/* Bridge */}
    <rect x="42" y="16" width="16" height="5" rx="2" fill="#BE185D" />
    {/* Left Heart Frame */}
    <path
      d="M28 6 C36 6 42 12 44 20 C44 32 32 42 24 48 C16 42 4 32 4 20 C4 12 10 6 18 6 C22 6 26 8 28 11 C30 8 34 6 38 6 Z"
      fill="#FB7185"
      stroke="#BE185D"
      strokeWidth="2.5"
    />
    {/* Left Dark Lens */}
    <path
      d="M26 12 C32 12 37 16 38 22 C38 30 28 38 22 42 C16 38 8 30 8 22 C8 16 13 12 19 12 C22 12 25 14 26 16 Z"
      fill="#831843"
    />
    {/* Left Reflection */}
    <line x1="14" y1="18" x2="22" y2="34" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

    {/* Right Heart Frame */}
    <path
      d="M72 6 C80 6 86 12 88 20 C88 32 76 42 68 48 C60 42 48 32 48 20 C48 12 54 6 62 6 C66 6 70 8 72 11 C74 8 78 6 82 6 Z"
      fill="#FB7185"
      stroke="#BE185D"
      strokeWidth="2.5"
    />
    {/* Right Dark Lens */}
    <path
      d="M70 12 C76 12 81 16 82 22 C82 30 72 38 66 42 C60 38 52 30 52 22 C52 16 57 12 63 12 C66 12 69 14 70 16 Z"
      fill="#831843"
    />
    {/* Right Reflection */}
    <line x1="58" y1="18" x2="66" y2="34" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 6. VIP Safe Pass Retro Pop Ticket Sticker
export const PinkTicketSticker: React.FC<{ size?: number; className?: string }> = ({ size = 76, className = '' }) => (
  <svg
    width={size}
    height={size * 0.5}
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md select-none pointer-events-none hover:rotate-2 transition-transform ${className}`}
  >
    {/* White die-cut border */}
    <path
      d="M6 10 C6 6 10 2 14 2 H106 C110 2 114 6 114 10 V24 C110 24 107 27 107 30 C107 33 110 36 114 36 V50 C114 54 110 58 106 58 H14 C10 58 6 54 6 50 V36 C10 36 13 33 13 30 C13 27 10 24 6 24 Z"
      fill="#FFFFFF"
    />
    {/* Ticket Body */}
    <path
      d="M9 13 C9 9 12 6 16 6 H104 C108 6 111 9 111 13 V23 C106 24 103 27 103 30 C103 33 106 36 111 37 V47 C111 51 108 54 104 54 H16 C12 54 9 51 9 47 V37 C14 36 17 33 17 30 C17 27 14 24 9 23 Z"
      fill="#FCE7F3"
      stroke="#F43F5E"
      strokeWidth="1.5"
    />
    {/* Perforated vertical line */}
    <line x1="82" y1="6" x2="82" y2="54" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 3" />
    
    <text x="45" y="24" textAnchor="middle" fill="#BE123C" fontSize="11" fontWeight="900" letterSpacing="1">
      AEGIS SAFE PASS
    </text>
    <text x="45" y="42" textAnchor="middle" fill="#E11D48" fontSize="8" fontWeight="bold">
      ★ PROTECTED JOURNEY ★
    </text>
    <text x="96" y="25" textAnchor="middle" fill="#BE123C" fontSize="9" fontWeight="900">
      VIP
    </text>
    <text x="96" y="40" textAnchor="middle" fill="#E11D48" fontSize="7" fontWeight="bold">
      24/7
    </text>
  </svg>
);
