import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, Sparkles, Music } from 'lucide-react';

interface BirthdayLetterPageProps {
  onNext: () => void;
  onBack: () => void;
}

export const BirthdayLetterPage: React.FC<BirthdayLetterPageProps> = ({ onNext }) => {
  return (
    <div
      id="birthday-letter-page"
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 py-16 sm:py-20 overflow-x-hidden bg-transparent text-white selection:bg-rose-500 selection:text-white select-none"
    >
      {/* Warm ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating subtle ambient hearts and sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '105vh',
              x: `${(i * 19) % 96}vw`,
              opacity: 0,
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.75, 0.75, 0],
              x: `${((i * 19) % 96) + ((i % 2 === 0 ? 1 : -1) * 8)}vw`,
            }}
            transition={{
              duration: 7 + (i % 4) * 2,
              repeat: Infinity,
              delay: (i * 0.4) % 4,
              ease: 'easeInOut',
            }}
            className="absolute text-xl sm:text-2xl opacity-75"
          >
            {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '🌸'}
          </motion.div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-comic font-bold mb-3 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
          <span>A Heartfelt Birthday Message</span>
        </motion.div>

        {/* Music indicator pill */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs font-pill font-semibold mb-6 backdrop-blur-md"
        >
          <Music className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>Playing: Pwede Ka Ba 🎶</span>
        </motion.div>

        {/* Beautiful Parchment Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full rounded-3xl p-6 sm:p-9 md:p-10 bg-[#FBF7EE] border-4 border-[#D4AF37]/55 shadow-[0_16px_40px_rgba(0,0,0,0.55)] text-[#2D1A14] overflow-hidden"
        >
          {/* Subtle warm paper texture & glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-transparent to-amber-100/40 pointer-events-none" />

          {/* Top-right wax seal decoration */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8A151B] to-[#550C10] border-2 border-amber-300/70 shadow-md flex items-center justify-center text-amber-200 select-none">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-200 text-amber-200" />
          </div>

          {/* Letter Content */}
          <div className="relative z-10 text-left space-y-4 sm:space-y-5">
            {/* Salutation */}
            <h2 className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#791216] font-bold tracking-tight flex items-center gap-2">
              <span>Happy Birthday, Shaynah.</span>
              <span className="text-rose-600 inline-block animate-pulse">❤️</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="font-serif text-sm sm:text-base md:text-[17px] text-[#2C1810] leading-relaxed">
              I’m really grateful that we got the chance to know each other. We spent so much time talking, and little by little, I got to know the wonderful person you are. Every conversation with you became something I looked forward to. There were even days that didn’t feel complete unless we had talked.
            </p>

            {/* Paragraph 2 */}
            <p className="font-serif text-sm sm:text-base md:text-[17px] text-[#2C1810] leading-relaxed">
              Today is your special day, and I hope it’s as beautiful as you are. I wish you nothing but genuine happiness, good health, and countless blessings. I hope you celebrate with the people you love, go out, enjoy good food, make wonderful memories, and smile a lot today. You deserve every reason to be happy.
            </p>

            {/* Paragraph 3 */}
            <p className="font-serif text-sm sm:text-base md:text-[17px] text-[#2C1810] leading-relaxed">
              Please don’t let sadness stay in your heart for too long. I truly hope life gives you more reasons to smile because seeing you happy is something I’ll always wish for.
            </p>

            {/* Paragraph 4 */}
            <p className="font-serif text-sm sm:text-base md:text-[17px] text-[#2C1810] leading-relaxed">
              I’m also wishing you success in everything you do. You’re almost graduating, and I’m already so proud of you. Advance congratulations! I know all your hard work will pay off, and I hope all your dreams come true. Congratulations as well to your friends. I wish all of you a bright and successful future. Once again Happy Birthday!!
            </p>

            {/* Signature Block */}
            <div className="pt-4 border-t border-[#D4AF37]/40 flex flex-col items-end">
              <span className="font-handwriting text-xl sm:text-2xl text-[#791216]">
                Always cheering for you,
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
            id="letter-next-button"
            onClick={onNext}
            className="stitched-button px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
