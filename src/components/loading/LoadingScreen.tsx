import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../../config/siteConfig';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian text-champagne px-6 pointer-events-none select-none"
        >
          {/* Subtle Ambient Radial Gold Backdrop */}
          <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />

          {/* Official KD CREATION Brand Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center mb-10"
          >
            <div className="relative p-2 rounded-lg border border-gold/30 bg-obsidian-100/90 backdrop-blur-md shadow-2xl overflow-hidden max-w-[280px] sm:max-w-[340px]">
              <img
                src={SITE_CONFIG.brand.officialLogo}
                alt={SITE_CONFIG.brand.logoAlt}
                className="w-full h-auto object-contain rounded brightness-105"
              />
              <div className="absolute inset-0 border border-gold/30 rounded pointer-events-none" />
            </div>
          </motion.div>

          {/* Cinematic Loading Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-4 text-center max-w-md w-full"
          >
            <span className="text-xs sm:text-sm tracking-[0.35em] font-medium text-gold uppercase font-serif-luxury">
              CRAFTING YOUR STORY...
            </span>

            {/* Luxury Champagne Gold Progress Bar */}
            <div className="w-full h-[2px] bg-obsidian-50 rounded-full overflow-hidden relative border border-gold/10">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
              />
            </div>

            <div className="text-[11px] tracking-widest text-champagne/40 font-mono">
              {progress}%
            </div>
          </motion.div>

          {/* Footer Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-8 text-[10px] tracking-[0.2em] uppercase text-champagne/50"
          >
            KD CREATION © 2026 • CINEMATIC VISUALS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
