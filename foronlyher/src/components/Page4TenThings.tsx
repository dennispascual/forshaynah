import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';

interface Page4TenThingsProps {
  onNext: () => void;
  onBack: () => void;
}

interface ThingItem {
  number: number;
  title: string;
  description: string;
}

const TEN_THINGS: ThingItem[] = [
  {
    number: 1,
    title: 'Your eyes',
    description: 'They look so innocent, soft, and pretty.',
  },
  {
    number: 2,
    title: 'Your nose',
    description: "It's perfect. Ang pointed tehh, kasuya hahaha.",
  },
  {
    number: 3,
    title: 'Your lips',
    description: "They're small, soft, and smooth.",
  },
  {
    number: 4,
    title: 'Your smile',
    description: "Your smile is so beautiful, and your teeth make it even more charming. It's honestly one of my favorite things about you.",
  },
  {
    number: 5,
    title: 'Your voice',
    description: "You have such a beautiful voice. I'll never forget the karaoke recording you sent.",
  },
  {
    number: 6,
    title: 'Your kindness',
    description: "You're genuinely kind, gentle, and soft-hearted.",
  },
  {
    number: 7,
    title: 'Your sweet side',
    description: 'I love how sweet you are. I really miss that side of you.',
  },
  {
    number: 8,
    title: 'Your dedication',
    description: "You're incredibly focused on your studies. I admire your determination to achieve your dreams.",
  },
  {
    number: 9,
    title: 'Your cheerful personality',
    description: 'I love listening to your stories. You seem like such a fun person to be around.',
  },
  {
    number: 10,
    title: 'Your loyalty and honesty',
    description: "You're loyal, honest, lovable, and beautiful inside and out.",
  },
];

export const Page4TenThings: React.FC<Page4TenThingsProps> = ({ onNext }) => {
  // Track flip state of each card (1 to 10)
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (num: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const flipAll = () => {
    const allFlipped = Object.keys(flippedCards).length === 10 && Object.values(flippedCards).every(Boolean);
    if (allFlipped) {
      setFlippedCards({});
    } else {
      const all: Record<number, boolean> = {};
      TEN_THINGS.forEach((item) => {
        all[item.number] = true;
      });
      setFlippedCards(all);
    }
  };

  const revealedCount = Object.values(flippedCards).filter(Boolean).length;
  const isAllRevealed = revealedCount === 10;

  return (
    <div
      id="page-4-ten-things"
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 py-16 sm:py-20 overflow-x-hidden bg-transparent text-white selection:bg-rose-500 selection:text-white select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating little hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '105vh',
              x: `${(i * 19) % 95}vw`,
              opacity: 0,
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.7, 0.7, 0],
              x: `${((i * 19) % 95) + ((i % 2 === 0 ? 1 : -1) * 8)}vw`,
            }}
            transition={{
              duration: 8 + (i % 3) * 2,
              repeat: Infinity,
              delay: (i * 0.5) % 4,
              ease: 'linear',
            }}
            className="absolute text-rose-300 text-lg sm:text-xl"
          >
            {i % 2 === 0 ? '💖' : '✨'}
          </motion.div>
        ))}
      </div>

      {/* Container */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-comic font-bold mb-3 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
          <span>Interactive Flip Cards</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-script text-4xl sm:text-6xl md:text-7xl font-bold text-amber-200 tracking-wide text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-2"
        >
          10 Things I Like About You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-lg sm:text-xl text-neutral-300 text-center mb-6"
        >
          Click each card to flip and reveal a special reason why you’re so special.
        </motion.p>

        {/* Counter and Reveal All Header Action */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="w-full flex items-center justify-between px-2 sm:px-4 mb-6"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-pill font-bold text-amber-300/90 bg-black/40 px-3.5 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{revealedCount} of 10 Cards Flipped</span>
          </div>

          <button
            onClick={flipAll}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-pill font-bold text-rose-200 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full border border-rose-300/30 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-rose-300" />
            <span>{isAllRevealed ? 'Flip All Back' : 'Reveal All'}</span>
          </button>
        </motion.div>

        {/* 10 Interactive 3D Flip Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {TEN_THINGS.map((item, index) => {
            const isFlipped = !!flippedCards[item.number];

            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.1 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full h-48 sm:h-52 [perspective:1000px] cursor-pointer group"
                onClick={() => toggleCard(item.number)}
              >
                {/* Flipping 3D Card Inner Container */}
                <div
                  className={`relative w-full h-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] shadow-lg ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* ================= CARD FRONT (Closed / Numbered) ================= */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col items-center justify-between [backface-visibility:hidden] bg-gradient-to-br from-[#1C0913]/90 via-[#2B0E1D]/85 to-[#16060E]/95 border-2 border-rose-400/30 group-hover:border-amber-400/70 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-[1.015]"
                  >
                    {/* Top row badge */}
                    <div className="w-full flex items-center justify-between text-rose-300/80">
                      <span className="font-pill text-xs font-bold tracking-wider uppercase text-rose-400/90 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Tap to Reveal</span>
                      </span>
                      <Heart className="w-4 h-4 text-rose-400/60 group-hover:text-rose-400 group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Centered Large Card Label */}
                    <div className="flex flex-col items-center justify-center my-auto">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 text-white font-pill font-black text-2xl sm:text-3xl flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.45)] group-hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] group-hover:scale-105 transition-all duration-300 border-2 border-white/30">
                        {item.number}
                      </div>
                      <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-amber-200 mt-2 tracking-wide group-hover:text-amber-100 transition-colors">
                        Card {item.number}
                      </h3>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="w-full flex items-center justify-center text-center">
                      <span className="text-[11px] sm:text-xs font-comic text-neutral-400 group-hover:text-amber-200/90 transition-colors">
                        ✨ Click to flip & reveal ✨
                      </span>
                    </div>
                  </div>

                  {/* ================= CARD BACK (Revealed Content) ================= */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#2D0B1B]/95 via-[#3B1125]/90 to-[#220713]/95 border-2 border-[#D4AF37]/75 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-left"
                  >
                    {/* Header with Number Pill and Heart */}
                    <div className="flex items-center justify-between pb-2 border-b border-amber-400/25">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-[#2D0B1B] font-pill font-black text-xs flex items-center justify-center shadow-sm">
                          {item.number}
                        </span>
                        <h4 className="font-pill text-base sm:text-lg font-bold text-amber-300 tracking-wide">
                          {item.title}
                        </h4>
                      </div>
                      <Heart className="w-4 h-4 fill-rose-400 text-rose-400 animate-pulse shrink-0" />
                    </div>

                    {/* Body Content Description */}
                    <div className="my-auto py-1.5 overflow-y-auto max-h-[90px] pr-1">
                      <p className="font-comic text-sm sm:text-[15px] text-rose-50/95 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-2 border-t border-rose-500/20 flex items-center justify-between text-[11px] text-rose-300/80">
                      <span className="font-comic">Reason #{item.number}</span>
                      <span className="font-pill text-amber-300/80">Click to flip back ↺</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Next Page Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 mb-4"
        >
          <button
            onClick={onNext}
            className="stitched-button px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
          >
            <span>Read My Letter</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

