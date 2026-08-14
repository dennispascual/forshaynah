import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';

interface Page5LoveLetterProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page5LoveLetter: React.FC<Page5LoveLetterProps> = ({ onNext }) => {
  return (
    <div
      id="page-5-love-letter"
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 py-16 overflow-x-hidden bg-transparent text-white select-none"
    >
      {/* Main Container */}
      <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-comic font-bold mb-3 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
          <span>A Love Letter</span>
        </motion.div>

        {/* Beautiful Parchment Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full rounded-3xl p-6 sm:p-9 md:p-10 bg-[#FBF7EE] border-4 border-[#D4AF37]/55 shadow-[0_16px_40px_rgba(0,0,0,0.55)] text-[#2D1A14] overflow-hidden mt-6"
        >
          {/* Subtle warm paper texture & glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-transparent to-amber-100/40 pointer-events-none" />

          {/* Top-right wax seal decoration */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8A151B] to-[#550C10] border-2 border-amber-300/70 shadow-md flex items-center justify-center">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-200 text-amber-200" />
          </div>

          {/* Letter Content */}
          <div className="relative z-10 text-left space-y-4 sm:space-y-5">
            {/* Salutation */}
            <h2 className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#791216] font-bold tracking-tight flex items-center gap-2">
              <span>My Dearest Shaynah,</span>
              <span className="text-rose-600 inline-block animate-pulse">❤️</span>
            </h2>

            {/* Letter Body */}
            <p className="font-serif text-sm sm:text-base md:text-[17px] text-[#2C1810] leading-relaxed">
              You've made such a special place in my heart. Every moment with you is precious, and I cherish the memories we've created together. Your presence brings so much light and joy to my life.
            </p>

            <p className="font-serif text-sm sm:text-base md:text-[17px] text-[#2C1810] leading-relaxed">
              I admire your strength, your kindness, and the beautiful soul you are. You inspire me to be a better person every day. On your birthday, I want you to know how much you mean to me and how grateful I am for having you in my life.
            </p>

            <p className="font-serif text-sm sm:text-base md:text-[17px] text-[#2C1810] leading-relaxed">
              May this day be filled with all the happiness you deserve. May you feel celebrated, appreciated, and loved. Because that's exactly what you are—truly loved.
            </p>

            {/* Signature Block */}
            <div className="pt-4 border-t border-[#D4AF37]/40 flex flex-col items-end">
              <span className="font-handwriting text-xl sm:text-2xl text-[#791216]">
                Forever yours,
              </span>
              <span className="font-neon text-2xl text-[#A62639] mt-1 font-bold">
                @ Love D3
              </span>
            </div>
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 mb-4"
        >
          <button
            id="love-letter-next-button"
            onClick={onNext}
            className="stitched-button px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};