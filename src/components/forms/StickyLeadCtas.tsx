import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface StickyLeadCtasProps {
  onOpenLeadForm: () => void;
}

export const StickyLeadCtas: React.FC<StickyLeadCtasProps> = ({ onOpenLeadForm }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.WHATSAPP.number}?text=${encodeURIComponent(SITE_CONFIG.WHATSAPP.defaultGreeting)}`;
  const phoneCallUrl = `tel:${SITE_CONFIG.brand.phone.replace(/\s+/g, '')}`;

  return (
    <AnimatePresence>
      {/* Desktop Floating Pill (Left Bottom) */}
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
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs tracking-widest font-semibold text-champagne bg-obsidian-200/90 backdrop-blur-md border border-gold/30 px-4 py-3 rounded-full hover:bg-gold/10 hover:border-gold transition-all shadow-xl"
        >
          <MessageCircle className="w-4 h-4 text-gold" />
          <span>TALK TO KD</span>
        </a>
      </motion.div>

      {/* Mobile Floating Action Bar (Docked Bottom on Mobile screens < 640px) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="fixed bottom-3 inset-x-3 z-40 sm:hidden flex items-center justify-between gap-1.5 p-2 rounded-2xl bg-[#2B050B]/95 backdrop-blur-xl border border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      >
        {/* Mobile WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-700 text-white font-bold text-[10.5px] tracking-wider shadow-md border border-emerald-500/40 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WHATSAPP</span>
        </a>

        {/* Mobile Direct Call Button */}
        <a
          href={phoneCallUrl}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#3B0811] text-gold font-bold text-[10.5px] tracking-wider border border-gold/40 shadow-md active:scale-95 transition-transform"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>CALL</span>
        </a>

        {/* Mobile Book Dates Button */}
        <button
          onClick={onOpenLeadForm}
          className="flex-[1.2] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gold-gradient text-obsidian font-extrabold text-[10.5px] tracking-wider shadow-md active:scale-95 transition-transform"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>BOOK DATES</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
