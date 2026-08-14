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
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden bg-transparent text-white selection:bg-rose-500 selection:text-white select-none"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-rose-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-comic font-bold mb-3 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
          <span>A Letter Just For You</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl font-bold text-amber-200 tracking-wide text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-6"
        >
          From the Bottom of My Heart
        </motion.h2>

        {/* Letter Scroll Paper (Parchment Card with left-side custom gold scrollbar) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full rounded-3xl p-6 sm:p-8 bg-[#FBF7EE] border-4 border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(0,0,0,0.5)] text-[#3E2319] overflow-hidden"
        >
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-transparent to-amber-100/40 pointer-events-none" />

          {/* Wax seal ornament in top right */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#8A151B] to-[#550C10] border-2 border-amber-300/60 shadow-md flex items-center justify-center text-amber-200 select-none">
            <Heart className="w-6 h-6 fill-amber-200 text-amber-200" />
          </div>

          {/* Letter Content Container with Left-Sided Gold Scrollbar styling */}
          <div
            className="max-h-[50vh] sm:max-h-[55vh] overflow-y-auto pr-3 pl-2 text-left space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[#2C1810]"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#D4AF37 #F1E7D0',
            }}
          >
            <p className="font-handwriting text-2xl sm:text-3xl text-[#791216] font-bold">
              Dear Shaynah,
            </p>

            <p>
              Baka natamad kana mag basa ah HAHAH. Letter nanaman. I know this is random, sa mismong birthday mo pa. I wanted to tell you this personally, pero idadaan ko na lang dito.
            </p>

            <p>
              Shaynah, teh I know you were hurt sa nangyari and d mo yun iniexpect na magagawa ko. Hinding hindi ko un naka kalimutan and every day it haunts me. Yung guilt. tapos nakikita ko pang nasaktan ka, yung likes yung repost mo. Lagi ko naiisip un. I truly regret it, and I'm really really sorry. I know d to madadaan sa sorry but still, I just wanted you to know na I genuinely am sorry.
            </p>

            <p>
              It’s painful na kasalanan ko kaya you seem to ignore me when I messaged you. And that’s not what we were used to. Teh I really miss you. I miss you more than I can put into words and having few replies from you or without conversation has been really hard for me. I think about you a lot, and I wish things had turned out differently.
            </p>

            <p>
              I completely understand the way you treat me, the way you act. The way you reply kasi you were hurt. But believe me, I really love you with all my heart. I wanted to show you na my feelings are true and gusto ko mag effort in every possible way. Gusto ko yun ipa feel sayo, sana don’t close your heart. And huwag mo sana ako iwasan teh. Please still allow me na mag effort pa.
            </p>

            <p>
              Sana mapatawad mo ako. I wanted you to be happy and that’s all I ever asked. If I will be given a chance lang, I will never hurt you again. And I will always do the right thing. Maisip ko pa lang na you'll leave me, sobrang nalulungkot na ako. Kaya please stay lang ah. I really really like you a lot.
            </p>

            <div className="pt-4 border-t border-[#D4AF37]/40 flex flex-col items-end">
              <span className="font-handwriting text-xl sm:text-2xl text-[#791216]">
                Lovelots 🥺
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
          className="mt-8"
        >
          <button
            onClick={onNext}
            className="stitched-button px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
          >
            <span>Next Question</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
