import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gift, MapPin, Phone, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface Page8GiftAddressProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page8GiftAddress: React.FC<Page8GiftAddressProps> = ({ onNext }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const savedAddr = localStorage.getItem('shaynah_gift_address') || '';
      const savedPhone = localStorage.getItem('shaynah_gift_phone') || '';
      const savedNotes = localStorage.getItem('shaynah_gift_notes') || '';
      if (savedAddr) setAddress(savedAddr);
      if (savedPhone) setPhone(savedPhone);
      if (savedNotes) setNotes(savedNotes);
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('shaynah_gift_address', address);
      localStorage.setItem('shaynah_gift_phone', phone);
      localStorage.setItem('shaynah_gift_notes', notes);
    } catch {}
    setIsSaved(true);
  };

  return (
    <div
      id="page-8-gift-address"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-x-hidden bg-transparent text-white selection:bg-rose-500 selection:text-white select-none"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 w-full max-w-lg mx-auto flex flex-col items-center text-center p-6 sm:p-10 rounded-3xl bg-white/[0.06] border border-rose-400/25 backdrop-blur-lg shadow-2xl"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-comic font-bold mb-4"
        >
          <Gift className="w-4 h-4 text-rose-400" />
          <span>Special Delivery</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl font-bold text-amber-200 tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-2"
        >
          I have a gift heading to you. 🎁
        </motion.h2>

        <p className="font-comic text-xs sm:text-sm text-rose-100/80 mb-6">
          Please let me know where to send it so it reaches you safely!
        </p>

        {!isSaved ? (
          <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-pill font-bold text-rose-200 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Delivery Address / Landmarks</span>
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Bldg No., Street, Barangay, City / Province..."
                className="w-full px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-comic transition-all"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-xs font-pill font-bold text-rose-200 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Contact Number</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09XX-XXX-XXXX"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-comic transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                className="stitched-button w-full py-3 sm:py-3.5 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center justify-center gap-2"
              >
                <span>Save Details & Continue</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 my-4"
          >
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 font-comic text-sm sm:text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
              <span>Details safely noted! Your surprise will find its way. ✨</span>
            </div>

            <button
              onClick={onNext}
              className="stitched-button px-10 sm:px-14 py-3.5 sm:py-4 rounded-full text-white font-handwriting text-2xl sm:text-3xl font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(239,166,152,0.4)] flex items-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
