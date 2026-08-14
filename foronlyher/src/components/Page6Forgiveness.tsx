import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface Page6ForgivenessProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page6Forgiveness: React.FC<Page6ForgivenessProps> = ({ onNext }) => {
  const [forgiven, setForgiven] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleDodge = () => {
    const newCount = dodgeCount + 1;
    setDodgeCount(newCount);

    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    setBtnPos({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    setForgiven(true);
    try {
      localStorage.setItem('shaynah_forgiveness_answer', 'Yes ❤️');
    } catch {}
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF758F', '#FF4D6D', '#FFD166', '#80ED99', '#57CC99'],
    });
  };

  return (
    <div
      id="page-6-forgiveness"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden bg-transparent text-white selection:bg-rose-500 selection:text-white select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating gentle butterflies / hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '105vh',
              x: `${(i * 21) % 96}vw`,
              opacity: 0,
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.8, 0.8, 0],
              x: `${((i * 21) % 96) + Math.sin(i) * 15}vw`,
            }}
            transition={{
              duration: 7 + (i % 4) * 2,
              repeat: Infinity,
              delay: (i * 0.4) % 4,
              ease: 'easeInOut',
            }}
            className="absolute text-xl sm:text-2xl"
          >
            {i % 3 === 0 ? '🦋' : i % 3 === 1 ? '✨' : '💖'}
          </motion.div>
        ))}
      </div>

      {/* Main Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center p-6 sm:p-10 rounded-3xl bg-white/[0.06] border border-rose-400/25 backdrop-blur-lg shadow-2xl"
      >
        {/* Soft Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-comic font-bold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
          <span>A Humble Question</span>
        </motion.div>

        {/* Question Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl font-bold text-amber-200 tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-8"
        >
          Can you find it in your heart to forgive me?
        </motion.h2>

        {/* Interactive Choices */}
        {!forgiven ? (
          <div className="flex flex-wrap items-center justify-center gap-4 relative min-h-[90px]">
            {/* Yes Button */}
            <button
              onClick={handleYes}
              className="stitched-button px-8 sm:px-12 py-3 sm:py-3.5 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>Yes ❤️</span>
            </button>

            {/* Playful Evasive Button */}
            <motion.button
              animate={{ x: btnPos.x, y: btnPos.y }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onMouseEnter={handleDodge}
              onClick={handleDodge}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-300 font-pill font-bold text-sm sm:text-base transition-colors cursor-pointer select-none"
            >
              {dodgeCount === 0
                ? "I'm Not Sure"
                : dodgeCount < 3
                ? 'Are you sure? 🥺'
                : 'Please forgive me? 🥺❤️'}
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5"
          >
            <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-100 font-comic text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
              <span>Thank you from the bottom of my heart, Shaynah! 💖</span>
            </div>

            <button
              onClick={onNext}
              className="stitched-button px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
