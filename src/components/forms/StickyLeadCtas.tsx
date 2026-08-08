import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface StickyLeadCtasProps {
  onOpenLeadForm: () => void;
}

export const StickyLeadCtas: React.FC<StickyLeadCtasProps> = ({ onOpenLeadForm }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3"
      >
        <button
          onClick={onOpenLeadForm}
          className="flex items-center gap-2 text-xs tracking-widest font-bold text-obsidian bg-gold-gradient px-5 py-3 rounded-full shadow-2xl hover:brightness-110 transition-all border border-gold/30"
        >
          <Calendar className="w-4 h-4" />
          <span>CHECK YOUR DATE</span>
        </button>

        <a
          href={`https://wa.me/${SITE_CONFIG.WHATSAPP.number}?text=${encodeURIComponent(SITE_CONFIG.WHATSAPP.defaultGreeting)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs tracking-widest font-semibold text-champagne bg-obsidian-200/90 backdrop-blur-md border border-gold/30 px-4 py-3 rounded-full hover:bg-gold/10 hover:border-gold transition-all"
        >
          <MessageCircle className="w-4 h-4 text-gold" />
          <span>TALK TO KD</span>
        </a>
      </motion.div>
    </AnimatePresence>
  );
};
