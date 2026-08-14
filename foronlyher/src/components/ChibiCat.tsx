import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ChibiCatProps {
  className?: string;
  onClick?: () => void;
}

export const ChibiCat: React.FC<ChibiCatProps> = ({ className = '', onClick }) => {
  const [isWinking, setIsWinking] = useState(false);
  const [isExcited, setIsExcited] = useState(false);

  const handleClick = () => {
    setIsExcited(true);
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 800);
    setTimeout(() => setIsExcited(false), 1200);
    onClick?.();
  };

  return (
    <div
      id="chibi-cat-container"
      className={`relative inline-block cursor-pointer select-none ${className}`}
      onClick={handleClick}
      title="Click me! 🐾"
    >
      <motion.div
        animate={
          isExcited
            ? { y: [0, -12, 0, -8, 0], rotate: [-4, 4, -3, 3, 0] }
            : { y: [0, -4, 0], rotate: [0, -1, 1, 0] }
        }
        transition={{
          duration: isExcited ? 0.7 : 3,
          repeat: isExcited ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        <svg
          viewBox="0 0 160 190"
          className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 drop-shadow-sm overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tail on left side */}
          <motion.path
            d="M 52 142 C 40 148, 30 135, 34 118 C 36 112, 43 116, 42 124 C 40 132, 48 138, 56 136"
            stroke="#181818"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FFFFFF"
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '52px', originY: '142px' }}
          />

          {/* Cat Body */}
          <path
            d="M 52 110 C 44 125, 46 150, 56 162 C 65 172, 95 172, 104 162 C 114 150, 116 125, 108 110 Z"
            fill="#FFFFFF"
            stroke="#181818"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Feet / Paws at bottom */}
          {/* Left foot */}
          <path
            d="M 60 164 C 58 171, 68 174, 72 168 C 73 165, 71 162, 68 162 Z"
            fill="#FFFFFF"
            stroke="#181818"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Right foot */}
          <path
            d="M 88 168 C 92 174, 102 171, 100 164 C 97 162, 90 162, 88 168 Z"
            fill="#FFFFFF"
            stroke="#181818"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Cat Head */}
          <path
            d="M 54 85 C 46 72, 48 52, 54 36 C 56 30, 64 34, 70 42 C 78 40, 82 40, 90 42 C 96 34, 104 30, 106 36 C 112 52, 114 72, 106 85 C 98 96, 62 96, 54 85 Z"
            fill="#FFFFFF"
            stroke="#181818"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Left Ear Inner Pink */}
          <path
            d="M 56 42 C 58 37, 63 40, 66 46 C 62 46, 58 45, 56 42 Z"
            fill="#FFA6B9"
            opacity="0.85"
          />

          {/* Right Ear Inner Pink */}
          <path
            d="M 104 42 C 102 37, 97 40, 94 46 C 98 46, 102 45, 104 42 Z"
            fill="#FFA6B9"
            opacity="0.85"
          />

          {/* Cute Eyes (Closed happy arcs or wink) */}
          {isWinking ? (
            <>
              {/* Left Eye: Wink arc */}
              <path
                d="M 64 64 Q 70 59 76 64"
                stroke="#181818"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Eye: Star or open sparkle */}
              <circle cx="90" cy="62" r="3.5" fill="#181818" />
            </>
          ) : (
            <>
              {/* Left Eye: happy curved arc */}
              <path
                d="M 64 63 C 66 58, 72 58, 75 63"
                stroke="#181818"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Eye: happy curved arc */}
              <path
                d="M 85 63 C 88 58, 94 58, 96 63"
                stroke="#181818"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}

          {/* Cheerful Pink Blush */}
          <ellipse
            cx="60"
            cy="70"
            rx="5.5"
            ry="3.5"
            fill="#FF8DA1"
            opacity="0.75"
          />
          <ellipse
            cx="100"
            cy="70"
            rx="5.5"
            ry="3.5"
            fill="#FF8DA1"
            opacity="0.75"
          />

          {/* Cute Nose and Mouth :3 */}
          <path
            d="M 76 71 C 78 74, 80 74, 82 71 C 84 74, 86 74, 88 71"
            stroke="#181818"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Left Paw Raised / Dancing */}
          <motion.path
            d="M 52 110 C 44 98, 48 88, 56 94 C 62 98, 58 108, 54 116"
            stroke="#181818"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FFFFFF"
            animate={{
              rotate: [0, -12, 0],
              y: [0, -3, 0],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '54px', originY: '116px' }}
          />

          {/* Right Paw Raised / Dancing */}
          <motion.path
            d="M 108 110 C 116 98, 112 88, 104 94 C 98 98, 102 108, 106 116"
            stroke="#181818"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FFFFFF"
            animate={{
              rotate: [0, 12, 0],
              y: [0, -3, 0],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            style={{ originX: '106px', originY: '116px' }}
          />
        </svg>

        {/* Floating Sparkles when excited */}
        {isExcited && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], y: -24 }}
            transition={{ duration: 0.8 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-pink-400 font-bold text-sm pointer-events-none"
          >
            ✨ nya! ✨
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
