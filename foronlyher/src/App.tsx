import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { ChibiCat } from './components/ChibiCat.tsx';
import { BirthdayPage } from './components/BirthdayPage.tsx';
import { BirthdayLetterPage } from './components/BirthdayLetterPage.tsx';
import { Page3Flower } from './components/Page3Flower.tsx';
import { Page4TenThings } from './components/Page4TenThings.tsx';
import { Page5LoveLetter } from './components/Page5LoveLetter.tsx';
import { Page6Forgiveness } from './components/Page6Forgiveness.tsx';
import { Page7DoYouLoveMe } from './components/Page7DoYouLoveMe.tsx';
import { Page8GiftAddress } from './components/Page8GiftAddress.tsx';
import { Page9FreeTime } from './components/Page9FreeTime.tsx';
import { Page10HangoutReplica } from './components/Page10HangoutReplica.tsx';
import { Page10GrandFinale } from './components/Page10GrandFinale.tsx';
import { NavHeader } from './components/NavHeader.tsx';

const PAGE1_BG_VIDEO_URL = 'https://res.cloudinary.com/mujhsz7v/video/upload/v1786692546/kling_20260814_VIDEO_Animate_th_3909_0.mp4';
const BIRTHDAY_SONG_URL = 'https://res.cloudinary.com/mujhsz7v/video/upload/v1786616398/Birthday.mp3';
const PWEDE_KA_BA_URL = 'https://res.cloudinary.com/mujhsz7v/video/upload/v1786616457/Pwede_ka_ba.mp3';
const PAGE3_PLUS_BG_VIDEO_URL = 'https://res.cloudinary.com/mujhsz7v/video/upload/v1786686342/kling_20260814_VIDEO_Create_a_3_3495_0.mp4';
const TOTAL_PAGES = 12;

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [petCount, setPetCount] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTrack, setActiveTrack] = useState<'none' | 'birthday' | 'pwede'>('none');

  const birthdayAudioRef = useRef<HTMLAudioElement | null>(null);
  const pwedeAudioRef = useRef<HTMLAudioElement | null>(null);
  const stopBirthdayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isManuallyMutedRef = useRef<boolean>(false);

  // Initialize both audio elements
  useEffect(() => {
    // 1. Birthday intro song
    const bdayAudio = new Audio(BIRTHDAY_SONG_URL);
    bdayAudio.volume = 0.9;
    bdayAudio.loop = false;
    birthdayAudioRef.current = bdayAudio;

    // 2. Pwede Ka Ba continuous song
    const pwedeAudio = new Audio(PWEDE_KA_BA_URL);
    pwedeAudio.volume = 0.85;
    pwedeAudio.loop = true;
    pwedeAudioRef.current = pwedeAudio;

    return () => {
      if (stopBirthdayTimeoutRef.current) {
        clearTimeout(stopBirthdayTimeoutRef.current);
      }
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.pause();
        birthdayAudioRef.current.src = '';
        birthdayAudioRef.current = null;
      }
      if (pwedeAudioRef.current) {
        pwedeAudioRef.current.pause();
        pwedeAudioRef.current.src = '';
        pwedeAudioRef.current = null;
      }
    };
  }, []);

  // Stop Birthday Audio
  const stopBirthdaySong = () => {
    if (stopBirthdayTimeoutRef.current) {
      clearTimeout(stopBirthdayTimeoutRef.current);
      stopBirthdayTimeoutRef.current = null;
    }
    if (birthdayAudioRef.current) {
      birthdayAudioRef.current.pause();
      birthdayAudioRef.current.currentTime = 0;
    }
  };

  // Play Birthday song for 15 seconds
  const playBirthdaySong15s = () => {
    stopBirthdaySong();
    if (birthdayAudioRef.current) {
      birthdayAudioRef.current.volume = 0.9;
      birthdayAudioRef.current.currentTime = 0;
      birthdayAudioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
          setActiveTrack('birthday');

          // Auto-stop after 15s
          stopBirthdayTimeoutRef.current = setTimeout(() => {
            if (birthdayAudioRef.current) {
              let currentVol = birthdayAudioRef.current.volume;
              const fadeInterval = setInterval(() => {
                if (birthdayAudioRef.current && currentVol > 0.15) {
                  currentVol -= 0.15;
                  birthdayAudioRef.current.volume = Math.max(0, currentVol);
                } else {
                  clearInterval(fadeInterval);
                  stopBirthdaySong();
                  setIsPlayingAudio(false);
                  setActiveTrack('none');
                }
              }, 50);
            }
          }, 15000);
        })
        .catch((e) => console.log('Audio autoplay policy:', e));
    }
  };

  // Start continuous "Pwede Ka Ba" playback
  const startPwedeKaBa = () => {
    stopBirthdaySong();
    if (pwedeAudioRef.current) {
      pwedeAudioRef.current.volume = 0.85;
      pwedeAudioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
          setActiveTrack('pwede');
          isManuallyMutedRef.current = false;
        })
        .catch((e) => console.log('Pwede Ka Ba autoplay:', e));
    }
  };

  // Page change listener to start continuous song from Page 3 onwards
  useEffect(() => {
    if (currentPage >= 3) {
      // Stop 15s birthday intro song if still running
      stopBirthdaySong();

      // If Pwede Ka Ba is not playing and user hasn't manually muted it, start it!
      if (pwedeAudioRef.current && pwedeAudioRef.current.paused && !isManuallyMutedRef.current) {
        startPwedeKaBa();
      }
    }
  }, [currentPage]);

  // Audio Toggle Button handler
  const toggleAudio = () => {
    if (currentPage >= 3) {
      if (!pwedeAudioRef.current) return;
      if (isPlayingAudio) {
        pwedeAudioRef.current.pause();
        setIsPlayingAudio(false);
        isManuallyMutedRef.current = true;
      } else {
        pwedeAudioRef.current
          .play()
          .then(() => {
            setIsPlayingAudio(true);
            setActiveTrack('pwede');
            isManuallyMutedRef.current = false;
          })
          .catch((e) => console.log('Audio playback error:', e));
      }
    } else {
      // Pages 1 & 2
      if (isPlayingAudio) {
        stopBirthdaySong();
        setIsPlayingAudio(false);
        setActiveTrack('none');
        isManuallyMutedRef.current = true;
      } else {
        isManuallyMutedRef.current = false;
        playBirthdaySong15s();
      }
    }
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#791216', '#FFA6B9', '#FFD166', '#4CAF50', '#2196F3', '#FF6B6B'],
    });

    isManuallyMutedRef.current = false;
    playBirthdaySong15s();
    setCurrentPage(2);
  };

  const handlePetCat = () => {
    setPetCount((prev) => prev + 1);
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= TOTAL_PAGES) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    if (pwedeAudioRef.current) {
      pwedeAudioRef.current.pause();
      pwedeAudioRef.current.currentTime = 0;
    }
    stopBirthdaySong();
    setIsPlayingAudio(false);
    setActiveTrack('none');
    isManuallyMutedRef.current = false;
    goToPage(1);
  };

  const currentTrackName = currentPage >= 3 ? 'Pwede Ka Ba' : 'Birthday Music';

  return (
    <div
      id="app-root-container"
      className="relative min-h-screen w-full overflow-hidden bg-black [perspective:1400px]"
    >
      {/* Persistent Top Navigation Bar for Pages 2 to 11 */}
      {currentPage >= 2 && (
        <NavHeader
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onBack={prevPage}
          onGoToPage={goToPage}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={toggleAudio}
          trackName={currentTrackName}
          theme={currentPage === 2 ? 'light' : 'dark'}
        />
      )}

      {/* Persistent Video Background for Page 3 onwards */}
      {currentPage >= 3 && (
        <div
          id="page3-plus-bg-video-container"
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <video
            key="pages-3-plus-video"
            autoPlay
            loop
            muted
            playsInline
            className="fixed inset-0 w-full h-full object-cover"
          >
            <source src={PAGE3_PLUS_BG_VIDEO_URL} type="video/mp4" />
          </video>
          {/* Subtle dark backdrop overlay to ensure pristine contrast and readability across text and buttons */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[0.5px]" />
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {currentPage === 1 && (
          /* ================= PAGE 1: Intro / "Hello there _! do you want to see your gift?" ================= */
          <motion.div
            key="page-1"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -55, z: -250, scale: 0.88 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden selection:bg-rose-100 selection:text-[#5a0c10] transform-gpu [backface-visibility:hidden]"
          >
            {/* Fullscreen Video Background for Page 1 */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
            >
              <source
                src={PAGE1_BG_VIDEO_URL}
                type="video/mp4"
              />
            </video>

            {/* Backdrop overlay for crisp contrast */}
            <div
              className="fixed inset-0 bg-white/20 backdrop-blur-[0.5px] z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Main Central Content Area */}
            <div
              id="main-card-container"
              className="relative z-20 w-full max-w-2xl px-6 py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center text-center select-none"
            >
              {/* Animated Chibi White Kitten */}
              <div className="mb-2 sm:mb-3">
                <ChibiCat onClick={handlePetCat} />
              </div>

              {/* Big Script Headline: "Hello there" */}
              <motion.h1
                id="greeting-heading"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-[5.75rem] font-bold text-[#111111] tracking-tight leading-[1.05] drop-shadow-xs"
              >
                Hello there
              </motion.h1>

              {/* Deep Red Dash and Exclamation Mark: "_!" */}
              <motion.div
                id="punctuation-mark"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="my-1 sm:my-2"
              >
                <span className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-black text-[#791216] tracking-tighter inline-block select-none transform translate-y-[-4px]">
                  _!
                </span>
              </motion.div>

              {/* Subtitle: "do you want to see your gift?" */}
              <motion.p
                id="gift-prompt-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-handwriting text-xl sm:text-2xl md:text-3xl text-[#5c5c5c] font-normal tracking-wide mt-2 sm:mt-3 mb-8 sm:mb-10"
              >
                do you want to see your gift?
              </motion.p>

              {/* Exact Button Layout: "YES PLEASE" */}
              <motion.div
                id="button-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center w-full"
              >
                <button
                  id="yes-please-button"
                  onClick={handleYesClick}
                  className="group relative inline-flex items-center justify-center px-12 sm:px-16 md:px-20 py-3 sm:py-3.5 md:py-4 rounded-full bg-[#E5E4E6] hover:bg-[#DDDCE0] active:scale-[0.97] border-[3.5px] border-[#550c10] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_14px_rgba(85,12,16,0.15)] transition-all duration-200 cursor-pointer"
                >
                  <span className="font-pill text-base sm:text-lg md:text-xl font-bold tracking-[0.14em] text-[#141414] uppercase">
                    YES PLEASE
                  </span>

                  <span
                    className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    aria-hidden="true"
                  />
                </button>
              </motion.div>

              {/* Kitty petting counter hint */}
              {petCount > 0 && petCount < 5 && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-xs text-neutral-400 font-handwriting"
                >
                  🐾 You petted the kitty {petCount} {petCount === 1 ? 'time' : 'times'}!
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {currentPage === 2 && (
          /* ================= PAGE 2: Birthday Celebration Page ================= */
          <motion.div
            key="page-2"
            initial={{ opacity: 0, rotateY: 55, z: -250, scale: 0.88 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <BirthdayPage
              onBack={prevPage}
              onNext={nextPage}
              isPlayingAudio={isPlayingAudio}
              onToggleAudio={toggleAudio}
            />
          </motion.div>
        )}

        {currentPage === 3 && (
          /* ================= PAGE 3: Heartfelt Birthday Letter ("Happy Birthday, Shaynah. ❤️") ================= */
          <motion.div
            key="page-3"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <BirthdayLetterPage onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 4 && (
          /* ================= PAGE 4: Sunflower Bouquet Blooming ================= */
          <motion.div
            key="page-4"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page3Flower onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 5 && (
          /* ================= PAGE 5: 10 Things I Like About You ================= */
          <motion.div
            key="page-5"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page4TenThings onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 6 && (
          /* ================= PAGE 6: Love Letter Scroll ================= */
          <motion.div
            key="page-6"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page5LoveLetter onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 7 && (
          /* ================= PAGE 7: Forgiveness Interactive Stage ================= */
          <motion.div
            key="page-7"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page6Forgiveness onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 8 && (
          /* ================= PAGE 8: Do You Still Love Me? ================= */
          <motion.div
            key="page-8"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page7DoYouLoveMe onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 9 && (
          /* ================= PAGE 9: Gift Delivery Address Form ================= */
          <motion.div
            key="page-9"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page8GiftAddress onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 10 && (
          /* ================= PAGE 10: Free Time Today? ================= */
          <motion.div
            key="page-10"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page9FreeTime onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 11 && (
          /* ================= PAGE 11: Replicated Hangout Page ================= */
          <motion.div
            key="page-11"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page10HangoutReplica onNext={nextPage} onBack={prevPage} />
          </motion.div>
        )}

        {currentPage === 12 && (
          /* ================= PAGE 12: Grand Finale Celebration ================= */
          <motion.div
            key="page-12"
            initial={{ opacity: 0, rotateY: 45, z: -200, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -200, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen transform-gpu [backface-visibility:hidden]"
          >
            <Page10GrandFinale onReplay={handleReplay} onBack={prevPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
