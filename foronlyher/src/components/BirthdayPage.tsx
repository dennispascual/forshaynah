import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Camera, Heart, ArrowLeft, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import woodFrameImg from '../assets/images/wooden_round_frame_1786684537680.jpg';

interface BirthdayPageProps {
  onBack?: () => void;
  onNext?: () => void;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

export const BirthdayPage: React.FC<BirthdayPageProps> = ({
  onBack,
  onNext,
  isPlayingAudio = false,
  onToggleAudio,
}) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(
    'https://res.cloudinary.com/mujhsz7v/image/upload/v1786612227/Shaynah.jpg'
  );
  const [isNextClicked, setIsNextClicked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhoto(url);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.3, y: 0.5 },
      });
    }
  };

  const handleNextClick = () => {
    setIsNextClicked(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF4D6D', '#FFD166', '#06D6A0', '#118AB2', '#9B5DE5', '#FFA69E', '#FF007F'],
    });
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 450);
    }
  };

  return (
    <div
      id="birthday-page"
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 lg:p-14 overflow-hidden select-none"
    >
      {/* Background Video for Page 2 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source
          src="https://res.cloudinary.com/mujhsz7v/video/upload/v1786685585/kling_20260814_Image_to_Video_Animate_th_3432_0.mp4"
          type="video/mp4"
        />
      </video>

      {/* Light Overlay to preserve pristine contrast */}
      <div
        className="fixed inset-0 bg-white/10 backdrop-blur-[0.3px] z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Floating Controls Bar */}
      <div className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        {onBack ? (
          <button
            id="back-to-greeting-btn"
            onClick={onBack}
            className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-[#5a0c10] shadow-md backdrop-blur-sm border border-neutral-200/80 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-pill font-bold active:scale-95"
            title="Back to start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : <div />}

        {onToggleAudio && (
          <button
            id="audio-toggle-btn"
            onClick={onToggleAudio}
            className={`pointer-events-auto px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-pill font-bold active:scale-95 ${
              isPlayingAudio
                ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse'
                : 'bg-white/85 hover:bg-white text-neutral-800 border border-neutral-200/80'
            }`}
            title={isPlayingAudio ? 'Mute Music' : 'Play Birthday Music (15s)'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{isPlayingAudio ? 'Playing (15s)' : 'Music'}</span>
          </button>
        )}
      </div>

      {/* Hidden File Input for Frame Photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
        id="frame-photo-input"
      />

      {/* Main Content Grid Layout */}
      <div
        id="birthday-content-card"
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 xl:gap-20"
      >
        {/* ================= LEFT COLUMN: Circular Wooden Embroidery Frame with @Love D3 Neon ================= */}
        <motion.div
          id="wooden-frame-container"
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px] xl:w-[480px] xl:h-[480px] shrink-0 flex items-center justify-center"
        >
          {/* Glowing Neon Sign at Top-Left of the Frame */}
          <motion.div
            id="neon-love-d3-sign"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-2 left-6 sm:top-4 sm:left-8 md:top-6 md:left-12 z-30 transform -rotate-12 pointer-events-none select-none"
          >
            <div className="font-neon text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide neon-pink-text">
              @ Love D3
            </div>
          </motion.div>

          {/* Wooden Frame Structure (Layered Realistic Wood Texture + SVG Ring) */}
          <div
            className="relative w-full h-full rounded-full flex items-center justify-center p-6 sm:p-8 md:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.12)] cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            title="Click to add / change photo inside frame"
          >
            {/* Wooden Grain Ring Texture */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <img
                src={woodFrameImg}
                alt="Wooden embroidery frame"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full filter contrast-105 brightness-102"
              />
            </div>

            {/* Inner Ring Opening / Photo Canvas */}
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-white/95 shadow-inner border-2 border-amber-900/10 flex items-center justify-center group-hover:bg-white transition-colors">
              {customPhoto ? (
                <img
                  src={customPhoto}
                  alt="Custom memory"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 text-neutral-400 group-hover:text-neutral-600 transition-colors">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-rose-300 fill-rose-100 mb-2 group-hover:text-rose-400 group-hover:fill-rose-200 transition-colors" />
                  </motion.div>
                  <div className="font-handwriting text-sm sm:text-base md:text-lg text-neutral-400 group-hover:text-neutral-600 flex items-center gap-1.5">
                    <Camera className="w-4 h-4" />
                    <span>Add Photo</span>
                  </div>
                </div>
              )}

              {/* Glass Reflection Highlight across inner circle */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: Typography, Butterfly, Message, Button & Hearts ================= */}
        <div
          id="birthday-text-container"
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
        >
          {/* Eyebrow: "For: Shaynah" */}
          <motion.div
            id="eyebrow-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-comic text-base sm:text-lg md:text-xl text-[#222222] font-semibold tracking-wide mb-1 sm:mb-2"
          >
            For: Shaynah
          </motion.div>

          {/* Headline Title Area */}
          <div className="relative inline-block my-1 sm:my-2">
            {/* Line 1: HAPPIEST */}
            <motion.h1
              id="title-happiest"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-birthday-title text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-wide leading-[0.95] text-[#151515] birthday-text-stroke uppercase select-none"
            >
              HAPPIEST
            </motion.h1>

            {/* Line 2: BIRTHDAY */}
            <motion.h1
              id="title-birthday"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-birthday-title text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-wide leading-[0.95] text-[#151515] birthday-text-stroke uppercase select-none mt-1"
            >
              BIRTHDAY
            </motion.h1>
          </div>

          {/* Birthday Message Paragraph */}
          <motion.p
            id="birthday-message-paragraph"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-comic text-base sm:text-lg md:text-xl lg:text-[1.25rem] text-[#111111] font-bold leading-relaxed max-w-lg mt-3 sm:mt-4 mb-6 sm:mb-8 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
          >
            I hope you have the most wonderful birthday and truly enjoy every moment of your special day. You deserve all the happiness, love, and beautiful memories today and always.
          </motion.p>

          {/* Bottom Area: Stitched "Next" Button & Hand-Drawn Red Hearts */}
          <div className="relative w-full flex items-center justify-between mt-2">
            {/* Stitched Next Button */}
            <motion.div
              id="next-button-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mx-auto lg:mx-0"
            >
              <button
                id="birthday-next-button"
                onClick={handleNextClick}
                className="stitched-button px-10 sm:px-14 py-2.5 sm:py-3 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-105 active:scale-95 transition-all duration-150 cursor-pointer shadow-md"
              >
                Next
              </button>
            </motion.div>

            {/* Sketched Red Hearts on Bottom-Right */}
            <motion.div
              id="sketched-red-hearts"
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.7, type: 'spring' }}
              className="absolute -bottom-4 right-2 sm:right-6 lg:right-4 flex flex-col items-end pointer-events-none select-none"
            >
              {/* Top Larger Sketched Crayon Red Heart */}
              <svg
                viewBox="0 0 100 90"
                className="w-16 h-14 sm:w-20 sm:h-16 md:w-24 md:h-20 drop-shadow-sm transform -rotate-12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Hand-drawn crayon scribble texture for heart */}
                <path
                  d="M 50 82 C 45 74, 18 55, 10 38 C 2 22, 14 6, 32 8 C 42 9, 48 18, 50 24 C 52 18, 58 9, 68 8 C 86 6, 98 22, 90 38 C 82 55, 55 74, 50 82 Z"
                  fill="#D81B28"
                  opacity="0.9"
                />
                {/* Sketchy crayon hatching lines */}
                <path
                  d="M 22 28 Q 50 45 78 28 M 16 38 Q 50 60 84 38 M 25 50 Q 50 72 75 50 M 35 62 Q 50 78 65 62 M 28 20 Q 50 35 72 20"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>

              {/* Bottom Smaller Sketched Crayon Red Heart */}
              <svg
                viewBox="0 0 100 90"
                className="w-8 h-7 sm:w-10 sm:h-8 md:w-12 md:h-10 drop-shadow-xs transform rotate-6 mt-[-4px] mr-2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 50 82 C 45 74, 18 55, 10 38 C 2 22, 14 6, 32 8 C 42 9, 48 18, 50 24 C 52 18, 58 9, 68 8 C 86 6, 98 22, 90 38 C 82 55, 55 74, 50 82 Z"
                  fill="#E02433"
                  opacity="0.95"
                />
                <path
                  d="M 25 32 Q 50 50 75 32 M 20 42 Q 50 65 80 42"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </motion.div>
          </div>

          {/* Celebratory message when Next is clicked */}
          {isNextClicked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="mt-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-rose-200 shadow-lg text-sm font-comic text-[#5a0c10] flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 text-left">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0 animate-spin" />
                <span className="font-bold">Wishing you the most magical, love-filled year ahead, Shaynah! 🎂🎈✨</span>
              </div>
              <button
                onClick={() => {
                  confetti({
                    particleCount: 80,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#FF4D6D', '#FFD166', '#06D6A0', '#118AB2', '#9B5DE5'],
                  });
                }}
                className="px-3.5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-pill font-bold shadow-xs cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>More Confetti! 🎉</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
