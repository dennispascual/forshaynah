import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight, Sun } from 'lucide-react';

interface Page3FlowerProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page3Flower: React.FC<Page3FlowerProps> = ({ onNext }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptFlower = () => {
    setIsAccepted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD166', '#FFB703', '#FB8500', '#F72585', '#7209B7'],
    });
  };

  return (
    <div
      id="page-3-flower"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden bg-transparent text-white selection:bg-amber-400 selection:text-black select-none"
    >
      {/* Soft golden floral background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating sunflower petals & sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '105vh',
              x: `${(i * 23) % 95}vw`,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: '-10vh',
              rotate: 360,
              opacity: [0, 0.8, 0.8, 0],
              x: `${((i * 23) % 95) + ((i % 2 === 0 ? 1 : -1) * 10)}vw`,
            }}
            transition={{
              duration: 7 + (i % 4) * 2,
              repeat: Infinity,
              delay: (i * 0.4) % 5,
              ease: 'easeInOut',
            }}
            className="absolute text-xl sm:text-2xl opacity-75"
          >
            {i % 3 === 0 ? '🌻' : i % 3 === 1 ? '✨' : '💛'}
          </motion.div>
        ))}
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center px-4"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-comic font-bold mb-4 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
        >
          <Sun className="w-4 h-4 text-amber-400 animate-spin" />
          <span>A Warm Bright Blessing</span>
        </motion.div>

        {/* Title: A Virtual Flowers for You */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl font-bold text-amber-200 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-2"
        >
          A Virtual Flower for You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-handwriting text-lg sm:text-xl text-neutral-300 max-w-md mb-6"
        >
          Like sunflowers that always seek the light, may your days always be filled with warmth, sunshine, and beautiful smiles.
        </motion.p>

        {/* Blooming Sunflower Illustration */}
        <motion.div
          initial={{ scale: 0.7, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', damping: 12 }}
          className="relative my-4 flex items-center justify-center"
        >
          {/* Glowing Aura */}
          <div className="absolute w-56 h-56 rounded-full bg-amber-500/20 blur-2xl animate-pulse" />

          {/* SVG Blooming Sunflower */}
          <svg viewBox="0 0 200 200" className="w-52 h-52 sm:w-64 sm:h-64 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
            {/* Stem & Leaves */}
            <path
              d="M100 130 Q105 160 100 195"
              fill="none"
              stroke="#2D6A4F"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Left Leaf */}
            <path
              d="M100 155 Q75 140 65 155 Q80 170 100 162"
              fill="#40916C"
              stroke="#1B4332"
              strokeWidth="2"
            />
            {/* Right Leaf */}
            <path
              d="M100 170 Q125 155 135 170 Q120 185 100 176"
              fill="#40916C"
              stroke="#1B4332"
              strokeWidth="2"
            />

            {/* Sunflower Petals Ring */}
            <g transform="translate(100, 85)">
              {Array.from({ length: 16 }).map((_, idx) => {
                const angle = (idx * 360) / 16;
                return (
                  <path
                    key={idx}
                    d="M 0 -22 C -8 -45, -6 -60, 0 -68 C 6 -60, 8 -45, 0 -22 Z"
                    fill={idx % 2 === 0 ? '#FFB703' : '#FB8500'}
                    stroke="#D48B00"
                    strokeWidth="1.5"
                    transform={`rotate(${angle})`}
                  />
                );
              })}

              {/* Inner Petal Tier */}
              {Array.from({ length: 12 }).map((_, idx) => {
                const angle = (idx * 360) / 12 + 15;
                return (
                  <path
                    key={`inner-${idx}`}
                    d="M 0 -16 C -6 -32, -4 -46, 0 -52 C 4 -46, 6 -32, 0 -16 Z"
                    fill="#FFD166"
                    opacity="0.9"
                    transform={`rotate(${angle})`}
                  />
                );
              })}

              {/* Center Seed Disk */}
              <circle cx="0" cy="0" r="28" fill="#582F0E" stroke="#3D200A" strokeWidth="3" />
              <circle cx="0" cy="0" r="23" fill="#6F4518" />
              <circle cx="0" cy="0" r="16" fill="#472608" />

              {/* Sparkles on Center Disk */}
              <circle cx="-6" cy="-6" r="2.5" fill="#FFE8A3" opacity="0.8" />
              <circle cx="7" cy="-4" r="2" fill="#FFE8A3" opacity="0.8" />
              <circle cx="-3" cy="8" r="2" fill="#FFE8A3" opacity="0.8" />
              <circle cx="6" cy="7" r="1.5" fill="#FFE8A3" opacity="0.8" />
            </g>
          </svg>
        </motion.div>

        {/* Action Button: Accept the Flower / Continue */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-col items-center gap-3 w-full"
        >
          {!isAccepted ? (
            <button
              onClick={handleAcceptFlower}
              className="stitched-button px-8 sm:px-12 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>Accept the Flower 🌻</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="px-5 py-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-sm sm:text-base font-comic flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>Flower accepted! May your year bloom radiantly. ✨</span>
              </div>

              <button
                onClick={onNext}
                className="stitched-button px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
