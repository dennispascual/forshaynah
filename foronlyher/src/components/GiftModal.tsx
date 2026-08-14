import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, X, Star, Coffee, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import giftBoxImg from '../assets/images/gift_surprise_box_1786683799516.jpg';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose }) => {
  const [selectedGiftIndex, setSelectedGiftIndex] = useState(0);
  const [isOpened, setIsOpened] = useState(true);

  const gifts = [
    {
      icon: Heart,
      title: 'A Lifetime of Warm Hugs & Love',
      desc: 'Redeemable anytime, anywhere! 100% unconditional comfort and sweet moments.',
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      icon: Coffee,
      title: 'Cozy Coffee & Sweet Pastry Date',
      desc: 'One warm cup of your favorite drink plus the sweetest dessert of your choice.',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      icon: Sparkles,
      title: 'A Day of Pure Joy & Relaxation',
      desc: 'Zero stress, zero chores, and whatever fun activities make your heart happy.',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      icon: Smile,
      title: 'Secret Wish Voucher',
      desc: 'Good for one special favor, movie night, or fun surprise of your choice!',
      color: 'text-pink-600 bg-pink-50 border-pink-200',
    },
  ];

  const triggerMoreConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF5E7E', '#FFD166', '#06D6A0', '#118AB2', '#9B5DE5'],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="gift-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            id="gift-modal-card"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-[#5a0c10] text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              id="gift-modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-[#5a0c10] hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Close gift"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header / Celebration Title */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
              <h2 className="font-script text-3xl md:text-4xl text-[#181818] tracking-wide">
                Here is your gift!
              </h2>
              <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
            </div>

            <p className="font-handwriting text-lg md:text-xl text-neutral-600 mb-5">
              Made with special love just for you! ✨
            </p>

            {/* Visual Box / Illustration */}
            <div className="relative mb-6 mx-auto w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-inner bg-gradient-to-b from-rose-50 to-amber-50/50 flex items-center justify-center p-2">
              <img
                src={giftBoxImg}
                alt="Magical gift box with sparkles"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-full shadow-sm"
              >
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </motion.div>
            </div>

            {/* Gift Options Carousel / Tabs */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-center gap-2">
                {gifts.map((gift, idx) => {
                  const Icon = gift.icon;
                  return (
                    <button
                      key={idx}
                      id={`gift-tab-${idx}`}
                      onClick={() => {
                        setSelectedGiftIndex(idx);
                        triggerMoreConfetti();
                      }}
                      className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedGiftIndex === idx
                          ? 'border-[#5a0c10] bg-rose-50 scale-105 shadow-sm'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-400 hover:border-neutral-300'
                      }`}
                      title={gift.title}
                    >
                      <Icon className={`w-5 h-5 ${selectedGiftIndex === idx ? 'text-[#5a0c10]' : 'text-neutral-500'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Selected Gift Card */}
              <motion.div
                key={selectedGiftIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`p-4 rounded-2xl border-2 text-left ${gifts[selectedGiftIndex].color}`}
              >
                <div className="flex items-center gap-2 font-pill font-bold text-lg mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{gifts[selectedGiftIndex].title}</span>
                </div>
                <p className="font-handwriting text-base md:text-lg text-neutral-700 leading-relaxed">
                  {gifts[selectedGiftIndex].desc}
                </p>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="confetti-more-btn"
                onClick={triggerMoreConfetti}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border-2 border-[#5a0c10] bg-rose-100/70 text-[#5a0c10] font-pill font-bold text-sm tracking-wider uppercase hover:bg-rose-200 active:scale-95 transition-all cursor-pointer"
              >
                🎉 More Sparkles!
              </button>

              <button
                id="accept-gift-btn"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#5a0c10] text-white font-pill font-bold text-sm tracking-wider uppercase hover:bg-[#720e14] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Love It! ❤️
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
