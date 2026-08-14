import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, PartyPopper } from 'lucide-react';

interface Page10GrandFinaleProps {
  onReplay: () => void;
  onBack: () => void;
}

export const Page10GrandFinale: React.FC<Page10GrandFinaleProps> = ({ onReplay }) => {
  const [candleLit, setCandleLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  useEffect(() => {
    // Grand celebratory confetti burst sequence
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#FFD166', '#FF006E', '#8338EC', '#3A86FF', '#FB5607', '#06D6A0'],
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const handleBlowCandle = () => {
    setCandleLit(false);
    setWishMade(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF4500', '#FF1493', '#FFFFFF'],
    });
  };

  return (
    <div
      id="page-10-grand-finale"
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 py-16 overflow-x-hidden bg-transparent text-white selection:bg-amber-400 selection:text-black select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating sparkles and celebration icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '105vh',
              x: `${(i * 17) % 96}vw`,
              scale: 0.6 + ((i % 4) * 0.15),
              opacity: 0,
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.7, 0.7, 0],
              x: `${((i * 17) % 96) + ((i % 2 === 0 ? 1 : -1) * 8)}vw`,
            }}
            transition={{
              duration: 6 + (i % 5) * 1.5,
              repeat: Infinity,
              delay: (i * 0.3) % 4,
              ease: 'linear',
            }}
            className="absolute text-xl sm:text-2xl"
          >
            {i % 4 === 0 ? '🎂' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '🎈' : '💖'}
          </motion.div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Celebration Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400/20 to-rose-500/20 border border-amber-400/40 text-amber-200 text-sm font-comic font-bold mb-4 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
        >
          <PartyPopper className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Wishing You A Lifetime of Joy & Magic</span>
          <Sparkles className="w-4 h-4 text-rose-400 animate-spin" />
        </motion.div>

        {/* Grand Headline: Happy Birthday Shaynah! */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-amber-200 tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-2"
        >
          Happy Birthday Shaynah!
        </motion.h1>

        {/* Shaynah's Photo in Glow Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          className="relative my-6 w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.5)]"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/80">
            <img
              src="https://res.cloudinary.com/mujhsz7v/image/upload/v1786612227/Shaynah.jpg"
              alt="Shaynah"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating heart on photo badge */}
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-rose-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
          </div>
        </motion.div>

        {/* Interactive Birthday Cake with Candle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative my-3 flex flex-col items-center"
        >
          {/* SVG Birthday Cake */}
          <div
            onClick={candleLit ? handleBlowCandle : undefined}
            className="cursor-pointer group select-none relative"
            title={candleLit ? 'Click to make a wish and blow out the candle!' : 'Wish made!'}
          >
            <svg
              viewBox="0 0 200 160"
              className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
            >
              {/* Plate */}
              <ellipse cx="100" cy="140" rx="80" ry="14" fill="#E5E5E5" />
              <ellipse cx="100" cy="138" rx="72" ry="11" fill="#FFFFFF" />

              {/* Cake Bottom Layer */}
              <path
                d="M 40 100 Q 100 115 160 100 L 160 130 Q 100 145 40 130 Z"
                fill="#5B1C1A"
              />
              {/* Strawberry Cream Middle */}
              <path
                d="M 40 90 Q 100 105 160 90 L 160 105 Q 100 120 40 105 Z"
                fill="#FFB5A7"
              />
              {/* Cake Top Layer */}
              <path
                d="M 50 65 Q 100 80 150 65 L 150 95 Q 100 110 50 95 Z"
                fill="#FCD5CE"
              />
              <ellipse cx="100" cy="65" rx="50" ry="14" fill="#FFF1E6" />

              {/* Frosting Drips */}
              <path
                d="M 50 65 Q 60 82 70 70 Q 85 86 100 72 Q 115 85 130 70 Q 140 82 150 65"
                fill="none"
                stroke="#FF758F"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Candle Body */}
              <rect x="96" y="32" width="8" height="26" rx="3" fill="#FFD166" />
              <line x1="96" y1="38" x2="104" y2="44" stroke="#FF006E" strokeWidth="2" />
              <line x1="96" y1="46" x2="104" y2="52" stroke="#FF006E" strokeWidth="2" />

              {/* Candle Wick */}
              <line x1="100" y1="32" x2="100" y2="24" stroke="#333333" strokeWidth="2" />

              {/* Candle Flame (Flickering) */}
              {candleLit ? (
                <g>
                  <circle cx="100" cy="18" r="12" fill="#FFD166" opacity="0.3" className="animate-pulse" />
                  <path
                    d="M 100 10 C 94 17, 95 24, 100 24 C 105 24, 106 17, 100 10 Z"
                    fill="#FF9E00"
                  />
                  <path
                    d="M 100 13 C 97 18, 97 22, 100 22 C 103 22, 103 18, 100 13 Z"
                    fill="#FFEE8C"
                  />
                </g>
              ) : (
                /* Smoke effect */
                <path
                  d="M 100 24 Q 96 16 102 10 Q 98 4 100 0"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              )}
            </svg>

            {candleLit && (
              <div className="mt-1 text-xs font-comic text-amber-300 animate-pulse">
                ✨ Tap the cake to make a wish & blow the candle! ✨
              </div>
            )}
          </div>

          {wishMade && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 text-sm font-comic text-amber-300 font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>May all your heartfelt wishes come true, Shaynah! 🌟</span>
            </motion.div>
          )}
        </motion.div>

        {/* Heartfelt Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-3xl bg-white/[0.06] border border-amber-400/30 backdrop-blur-md max-w-lg my-4 shadow-xl text-left"
        >
          <p className="font-comic text-sm sm:text-base text-rose-100 leading-relaxed">
            Thank you for walking through this little birthday celebration. I hope this brought a sweet smile to your face today. You are cherished more than words could ever convey. Here's to a year overflowing with peace, laughter, success, and love!
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-comic text-amber-300">
            <span>💖 Always praying for your happiness</span>
            <span className="font-neon text-lg text-rose-300">Love D3</span>
          </div>
        </motion.div>

        {/* Action Controls: Replay & Extra Confetti Burst */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FFD166', '#FF006E', '#8338EC', '#3A86FF', '#06D6A0'],
              });
            }}
            className="px-6 py-3 rounded-full bg-rose-500/25 hover:bg-rose-500/40 border border-rose-400/40 text-rose-200 font-pill font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <PartyPopper className="w-4 h-4" />
            <span>More Fireworks! 🎉</span>
          </button>

          <button
            onClick={onReplay}
            className="stitched-button px-10 sm:px-14 py-3 sm:py-3.5 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_4px_16px_rgba(239,166,152,0.4)] flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>Replay From Start 💖</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
