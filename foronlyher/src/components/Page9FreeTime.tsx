import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Calendar, Heart, ArrowRight, Sparkles } from 'lucide-react';

interface Page9FreeTimeProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page9FreeTime: React.FC<Page9FreeTimeProps> = ({ onNext }) => {
  const [response, setResponse] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    setResponse(choice);
    try {
      localStorage.setItem('shaynah_freetime_answer', choice);
    } catch {}

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD166', '#FF4D6D', '#70E000', '#38B000', '#007200'],
    });

    setTimeout(() => {
      onNext();
    }, 500);
  };

  return (
    <div
      id="page-9-free-time"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden bg-transparent text-white selection:bg-rose-500 selection:text-white select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center p-6 sm:p-10 rounded-3xl bg-white/[0.06] border border-rose-400/25 backdrop-blur-lg shadow-2xl"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-comic font-bold mb-4"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Birthday Hangout</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl font-bold text-amber-200 tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-6"
        >
          Do you have free time today?
        </motion.h2>

        {!response ? (
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            {/* Yes Option */}
            <button
              onClick={() => handleSelect('Yes')}
              className="stitched-button px-8 sm:px-12 py-3 sm:py-3.5 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>Yes 🎉</span>
            </button>

            {/* No Option */}
            <button
              onClick={() => handleSelect('No')}
              className="px-8 sm:px-12 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-200 font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>No 🌙</span>
            </button>
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
                {response === 'Yes'
                  ? 'Yay! Taking you to the next page... 🎉'
                  : 'Taking you to the next page... ✨'}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
