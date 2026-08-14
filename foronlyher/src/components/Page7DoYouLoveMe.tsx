import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface Page7DoYouLoveMeProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page7DoYouLoveMe: React.FC<Page7DoYouLoveMeProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleSelect = (choice: string) => {
    setSelected(choice);
    try {
      localStorage.setItem('shaynah_love_answer', choice);
    } catch {}

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4D6D', '#FF758F', '#FFD166', '#FFB703', '#FFFFFF'],
    });
  };

  const dodgeNo = () => {
    const randomX = (Math.random() - 0.5) * 180;
    const randomY = (Math.random() - 0.5) * 80;
    setNoPos({ x: randomX, y: randomY });
  };

  return (
    <div
      id="page-7-do-you-love-me"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden bg-transparent text-white selection:bg-rose-500 selection:text-white select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
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
          <span>Straight From The Heart</span>
        </motion.div>

        {/* Question Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl font-bold text-amber-200 tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-6"
        >
          Do you still love me?
        </motion.h2>

        {!selected ? (
          <div className="flex flex-wrap items-center justify-center gap-4 relative min-h-[90px] w-full">
            {/* Yes Button */}
            <button
              onClick={() => handleSelect('Yes')}
              className="stitched-button px-8 sm:px-12 py-3 sm:py-3.5 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>Yes ❤️</span>
            </button>

            {/* Maybe Button */}
            <button
              onClick={() => handleSelect('Maybe')}
              className="px-6 py-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-pill font-bold text-sm sm:text-base transition-colors cursor-pointer"
            >
              <span>Maybe 🤔</span>
            </button>

            {/* Playful Dodging No Button */}
            <motion.button
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onMouseEnter={dodgeNo}
              onClick={dodgeNo}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-300 font-pill font-bold text-sm sm:text-base transition-colors cursor-pointer select-none"
            >
              <span>No 🙈</span>
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
              <span>
                {selected === 'Yes'
                  ? 'My heart is so happy! You mean the world to me. 💖'
                  : 'I will keep trying my best to make you smile every day! ✨'}
              </span>
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
    </div>
  );
};
