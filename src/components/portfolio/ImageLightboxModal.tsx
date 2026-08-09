import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ImageLightboxModalProps {
  images: string[];
  currentIndex: number | null;
  title?: string;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  images,
  currentIndex,
  title = "KD CREATION Editorial Photography",
  onClose,
  onNavigate,
}) => {
  if (currentIndex === null || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % images.length;
    onNavigate(nextIdx);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIdx);
  };

  // Keyboard arrow keys navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIndex + 1) % images.length;
        onNavigate(nextIdx);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIndex - 1 + images.length) % images.length;
        onNavigate(prevIdx);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images, onNavigate, onClose]);

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 select-none"
      >
        {/* Top Header Bar - Always visible high-contrast header */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-[999999999]"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gold font-serif-luxury text-xs tracking-widest uppercase font-bold bg-[#3B0811] border-2 border-gold/50 px-4 py-2 rounded-full shadow-2xl">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="truncate max-w-xs sm:max-w-md">{title}</span>
            </div>

            <div className="hidden sm:flex items-center text-xs font-mono tracking-widest text-obsidian bg-gold-gradient px-4 py-1.5 rounded-full font-extrabold shadow-2xl">
              STILL {currentIndex + 1} OF {images.length}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-3 text-gold hover:text-white rounded-full bg-[#3B0811] hover:bg-gold/30 transition-all border-2 border-gold/50 shadow-2xl"
            aria-label="Close Fullscreen View"
            data-cursor="CLOSE"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Floating Screen Left Arrow Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="fixed left-3 sm:left-8 top-1/2 -translate-y-1/2 z-[999999999] p-4 sm:p-5 text-gold hover:text-white rounded-full bg-[#3B0811] hover:bg-gold/40 border-2 border-gold shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all hover:scale-115 active:scale-95 cursor-pointer"
            aria-label="Previous Image"
            data-cursor="PREV"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
          </button>
        )}

        {/* Floating Screen Right Arrow Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="fixed right-3 sm:right-8 top-1/2 -translate-y-1/2 z-[999999999] p-4 sm:p-5 text-gold hover:text-white rounded-full bg-[#3B0811] hover:bg-gold/40 border-2 border-gold shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all hover:scale-115 active:scale-95 cursor-pointer"
            aria-label="Next Image"
            data-cursor="NEXT"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
          </button>
        )}

        {/* Main Image Frame Container with In-Frame Overlay Arrows */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-[85vw] max-h-[80vh] overflow-hidden rounded-2xl border-2 border-gold/60 shadow-[0_0_80px_rgba(212,175,55,0.35)] flex items-center justify-center bg-[#2B050B] z-10 group"
        >
          <img
            src={currentImage}
            alt={`KD Creation Full Screen Still #${currentIndex + 1}`}
            className="w-full h-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
          />

          {/* In-Image Hover Overlay Arrows (guaranteed visible directly over the image boundaries!) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#3B0811]/90 hover:bg-gold-gradient text-gold hover:text-obsidian p-3 rounded-full border border-gold shadow-2xl transition-all hover:scale-110 flex items-center gap-1 font-extrabold text-xs"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="hidden md:inline font-mono">PREV</span>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#3B0811]/90 hover:bg-gold-gradient text-gold hover:text-obsidian p-3 rounded-full border border-gold shadow-2xl transition-all hover:scale-110 flex items-center gap-1 font-extrabold text-xs"
              >
                <span className="hidden md:inline font-mono">NEXT</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </motion.div>

        {/* Bottom Counter Bar on Mobile */}
        <div className="sm:hidden fixed bottom-6 z-[999999999] text-xs font-mono tracking-widest text-obsidian bg-gold-gradient font-extrabold px-5 py-2 rounded-full border border-gold shadow-2xl">
          STILL {currentIndex + 1} OF {images.length}
        </div>
      </div>
    </AnimatePresence>
  );
};
