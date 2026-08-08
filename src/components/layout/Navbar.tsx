import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Sparkles, UserCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenLeadForm: () => void;
  onOpenClientAuth: () => void;
  loggedInClient: { name: string; email: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onOpenLeadForm,
  onOpenClientAuth,
  loggedInClient,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'STORIES', href: '#stories' },
    { name: 'SERVICES', href: '#services' },
    { name: 'LEADERSHIP', href: '#founders' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PROCESS', href: '#process' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'liquid-glass-panel py-3 shadow-2xl border-b border-gold/30'
            : 'bg-gradient-to-b from-[#33060D]/95 via-[#33060D]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          
          {/* Official Logo Brand Container */}
          <a
            href="#hero"
            className="group flex items-center gap-3 relative focus:outline-none py-0.5"
            aria-label="KD CREATION Home"
          >
            <div className="relative h-10 sm:h-11 w-auto overflow-hidden rounded-xl border border-gold/40 bg-[#3B0811] p-1 shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_4px_25px_rgba(212,175,55,0.45)] flex items-center justify-center">
              <img
                src={SITE_CONFIG.brand.officialLogo}
                alt={SITE_CONFIG.brand.logoAlt}
                className="h-full w-auto object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-base tracking-[0.22em] font-serif-luxury font-extrabold text-gold uppercase leading-tight group-hover:text-gold-light transition-colors">
                KD CREATION
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.18em] text-[#F5F2EB]/80 uppercase font-semibold">
                LUXURY WEDDING FILMS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-[0.18em] font-bold text-[#F5F2EB] hover:text-gold transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Client Portal Login / Dashboard Button */}
            <button
              onClick={onOpenClientAuth}
              className="flex items-center gap-1.5 text-[11px] tracking-widest font-bold text-[#F5F2EB] border border-gold/40 bg-[#3B0811] px-3.5 py-2 rounded-full hover:border-gold hover:text-gold transition-all shadow-md"
              title="Open VIP Client Portal"
            >
              <UserCheck className="w-3.5 h-3.5 text-gold" />
              <span>{loggedInClient ? 'MY PORTAL' : 'CLIENT LOGIN'}</span>
            </button>

            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 text-[11px] tracking-widest font-bold text-gold border border-gold/40 bg-[#4A0E17]/80 backdrop-blur-md px-3.5 py-2 rounded-full hover:bg-gold-gradient hover:text-obsidian shadow-md transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ASK KD AI</span>
            </button>

            <button
              onClick={onOpenLeadForm}
              className="flex items-center gap-1.5 text-[11px] tracking-widest font-bold text-obsidian bg-gold-gradient px-4 py-2 rounded-full hover:brightness-110 shadow-lg shadow-gold/25 transition-all duration-300 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>CHECK DATE</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gold focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[60px] z-40 liquid-glass-panel border-b border-gold/30 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-5 items-center text-center py-3">
              <img
                src={SITE_CONFIG.brand.officialLogo}
                alt={SITE_CONFIG.brand.logoAlt}
                className="w-28 h-auto rounded-xl border border-gold/40 p-1 mb-1 bg-[#3B0811] shadow-md"
              />
              <div className="flex flex-col gap-3.5 w-full">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs tracking-[0.22em] font-bold text-[#F5F2EB] hover:text-gold transition-colors py-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2.5 w-full pt-4 border-t border-gold/20">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenClientAuth();
                  }}
                  className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-[#F5F2EB] border border-gold/40 py-2.5 rounded-full w-full bg-[#3B0811] shadow-sm"
                >
                  <UserCheck className="w-4 h-4 text-gold" />
                  <span>{loggedInClient ? 'MY CLIENT PORTAL' : 'CLIENT LOGIN / REGISTER'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenChat();
                  }}
                  className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-gold border border-gold/40 py-2.5 rounded-full w-full bg-[#4A0E17] shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ASK KD AI CONSULTANT</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLeadForm();
                  }}
                  className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-obsidian bg-gold-gradient py-3 rounded-full w-full shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>CHECK YOUR WEDDING DATE</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
