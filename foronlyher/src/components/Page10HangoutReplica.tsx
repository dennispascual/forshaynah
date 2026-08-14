import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface Page10HangoutReplicaProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page10HangoutReplica: React.FC<Page10HangoutReplicaProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    setSelected(choice);
    try {
      localStorage.setItem('shaynah_hangout_answer', choice);
    } catch {}

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD166', '#FF006E', '#8338EC', '#3A86FF', '#06D6A0'],
    });

    setTimeout(() => {
      onNext();
    }, 600);
  };

  return (
    <div
      id="page-10-hangout"
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
          <MapPin className="w-4 h-4 text-amber-300" />
          <span>Let's Hang Out</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl font-bold text-amber-200 tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-6"
        >
          Tara gala tayo?
        </motion.h2>

        <p className="font-comic text-sm sm:text-base text-rose-100/80 mb-6">
          Would you like to hang out with me and celebrate together?
        </p>

        {!selected ? (
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            {/* Yes Option */}
            <button
              onClick={() => handleSelect('Yes, let\'s go! 🎉')}
              className="stitched-button px-8 sm:px-12 py-3 sm:py-3.5 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all"
            >
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>Yes! 💖</span>
            </button>

            {/* Maybe Option */}
            <button
              onClick={() => handleSelect('Maybe 🤔')}
              className="px-8 sm:px-12 py-3 sm:py-3.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-pill font-bold text-sm sm:text-base transition-colors cursor-pointer"
            >
              <span>Maybe 🤔</span>
            </button>

            {/* Not Now Option */}
            <button
              onClick={() => handleSelect('Not today 😔')}
              className="px-8 sm:px-12 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-200 font-handwriting text-xl sm:text-2xl font-bold tracking-wide transition-colors cursor-pointer"
            >
              <span>Not Today 😔</span>
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
                {selected.includes('Yes')
                  ? 'Yay! Can\'t wait to celebrate with you! 🎉💖'
                  : selected.includes('Maybe')
                  ? 'I hope you can make it! 🥺'
                  : 'No worries! Next time for sure! 💕'}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};