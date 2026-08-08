import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles } from 'lucide-react';

interface ExitIntentModalProps {
  onOpenLeadForm: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onOpenLeadForm }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('kd_exit_intent_dismissed');
    if (isDismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        setIsOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('kd_exit_intent_dismissed', 'true');
  };

  const handleConfirm = () => {
    handleDismiss();
    onOpenLeadForm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-obsidian-200 border-2 border-gold/40 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none" />

          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 text-champagne/60 hover:text-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold text-gold flex items-center justify-center mx-auto shadow-xl">
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs tracking-[0.3em] font-serif-luxury text-gold uppercase block mb-2">
              BEFORE YOU GO...
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-champagne uppercase leading-tight">
              WANT TO KNOW IF YOUR <br />
              <span className="text-gold-gradient italic font-normal">WEDDING DATE</span> IS AVAILABLE?
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-champagne/70 font-light leading-relaxed max-w-sm mx-auto">
            KD CREATION takes only a limited number of signature royal weddings per season to maintain uncompromised cinematic quality.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleConfirm}
              className="w-full flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-obsidian bg-gold-gradient py-3.5 rounded-full shadow-xl hover:brightness-110 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>CHECK AVAILABILITY</span>
            </button>

            <button
              onClick={handleDismiss}
              className="w-full sm:w-auto text-xs tracking-widest text-champagne/60 hover:text-gold px-6 py-3 transition-colors"
            >
              NOT NOW
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
