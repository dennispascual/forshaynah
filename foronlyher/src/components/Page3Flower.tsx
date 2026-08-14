import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface Page3FlowerProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page3Flower: React.FC<Page3FlowerProps> = ({ onNext }) => {
  return (
    <div
      id="page-3-flower"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden bg-transparent text-white select-none"
    >
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center text-center"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl font-bold text-amber-200 tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-6"
        >
          🌻 Sunflowers for You
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-comic text-lg sm:text-xl text-rose-100/90 mb-10 max-w-lg"
        >
          Just like these beautiful sunflowers that follow the light, I hope you always find the light and positivity in your life.
        </motion.p>

        {/* Animated Sunflowers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <svg
            viewBox="0 0 400 300"
            className="w-80 h-60 drop-shadow-lg"
          >
            {/* Sunflower 1 */}
            <g>
              <ellipse cx="80" cy="180" rx="15" ry="60" fill="#2D5016" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x = 80 + Math.cos(angle) * 50;
                const y = 100 + Math.sin(angle) * 50;
                return (
                  <ellipse
                    key={i}
                    cx={x}
                    cy={y}
                    rx="12"
                    ry="25"
                    fill="#FFD166"
                    transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
                  />
                );
              })}
              <circle cx="80" cy="100" r="20" fill="#8B6F47" />
            </g>

            {/* Sunflower 2 */}
            <g>
              <ellipse cx="200" cy="200" rx="15" ry="70" fill="#2D5016" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x = 200 + Math.cos(angle) * 55;
                const y = 100 + Math.sin(angle) * 55;
                return (
                  <ellipse
                    key={i}
                    cx={x}
                    cy={y}
                    rx="14"
                    ry="28"
                    fill="#FFE66D"
                    transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
                  />
                );
              })}
              <circle cx="200" cy="100" r="22" fill="#9B7E56" />
            </g>

            {/* Sunflower 3 */}
            <g>
              <ellipse cx="320" cy="170" rx="15" ry="65" fill="#2D5016" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x = 320 + Math.cos(angle) * 50;
                const y = 105 + Math.sin(angle) * 50;
                return (
                  <ellipse
                    key={i}
                    cx={x}
                    cy={y}
                    rx="12"
                    ry="25"
                    fill="#FFD166"
                    transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
                  />
                );
              })}
              <circle cx="320" cy="105" r="20" fill="#8B6F47" />
            </g>
          </svg>
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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