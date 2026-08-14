import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';

interface Page4TenThingsProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page4TenThings: React.FC<Page4TenThingsProps> = ({ onNext }) => {
  const [revealed, setRevealed] = useState<boolean[]>(Array(10).fill(false));

  const things = [
    '💖 Your genuine kindness',
    '😊 The way you smile',
    '🧠 Your intelligence',
    '🎨 Your creativity',
    '💪 Your strength & determination',
    '🗣️ Your honesty',
    '🌟 Your unique personality',
    '❤️ Your caring heart',
    '🎵 Your sense of humor',
    '👑 You, just as you are',
  ];

  const toggleReveal = (index: number) => {
    const newRevealed = [...revealed];
    newRevealed[index] = !newRevealed[index];
    setRevealed(newRevealed);
  };

  return (
    <div
      id="page-4-ten-things"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden bg-transparent text-white select-none"
    >
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center text-center"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl font-bold text-amber-200 tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-3"
        >
          10 Things I Love About You
        </motion.h1>

        <p className="font-comic text-sm sm:text-base text-rose-100/80 mb-8">
          Click each card to reveal something special 💝
        </p>

        {/* Grid of Things */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
          {things.map((thing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleReveal(index)}
              className="cursor-pointer"
            >
              <motion.div
                animate={{
                  rotateY: revealed[index] ? 180 : 0,
                }}
                transition={{ duration: 0.6 }}
                className="h-24 rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-400/40 hover:border-amber-400/60 flex items-center justify-center p-4 text-center transition-colors"
              >
                <div className="text-sm sm:text-base font-comic text-rose-100 font-semibold">
                  {revealed[index] ? thing : `Reveal ${index + 1}`}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onNext}
          className="stitched-button px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>Next</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </motion.button>
      </motion.div>
    </div>
  );
};