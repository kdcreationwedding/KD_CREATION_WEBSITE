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
      setScrolled(window.scrollY > 25);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#33060D]/95 backdrop-blur-md py-2.5 shadow-2xl border-b border-gold/25'
            : 'bg-gradient-to-b from-[#33060D]/95 via-[#33060D]/70 to-transparent py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Official Logo Brand Container */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 relative focus:outline-none py-0.5"
            aria-label="KD CREATION Home"
          >
            <div className="relative h-9 sm:h-10 w-auto overflow-hidden rounded-xl border border-gold/40 bg-[#3B0811] p-1 shadow-[0_4px_15px_rgba(212,175,55,0.2)] transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center">
              <img
                src={SITE_CONFIG.brand.officialLogo}
                alt={SITE_CONFIG.brand.logoAlt}
                className="h-full w-auto object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-base tracking-[0.2em] font-serif-luxury font-extrabold text-gold uppercase leading-tight group-hover:text-gold-light transition-colors">
                KD CREATION
              </span>
              <span className="text-[8px] sm:text-[9.5px] tracking-[0.16em] text-[#F5F2EB]/80 uppercase font-semibold">
                LUXURY WEDDING FILMS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] xl:text-xs tracking-[0.16em] font-bold text-[#F5F2EB] hover:text-gold transition-colors duration-300 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-2">
            {/* Client Portal Login / Dashboard Button */}
            <button
              onClick={onOpenClientAuth}
              className="flex items-center gap-1.5 text-[10px] tracking-widest font-bold text-[#F5F2EB] border border-gold/40 bg-[#3B0811] px-3 py-1.5 rounded-full hover:border-gold hover:text-gold hover:scale-105 transition-all shadow-md"
              title="Open VIP Client Portal"
            >
              <UserCheck className="w-3.5 h-3.5 text-gold" />
              <span>{loggedInClient ? 'MY PORTAL' : 'CLIENT LOGIN'}</span>
            </button>

            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 text-[10px] tracking-widest font-bold text-gold border border-gold/40 bg-[#4A0E17]/80 backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-gold-gradient hover:text-obsidian hover:scale-105 shadow-md transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ASK KD AI</span>
            </button>

            <button
              onClick={onOpenLeadForm}
              className="flex items-center gap-1.5 text-[10px] tracking-widest font-bold text-obsidian bg-gold-gradient px-3.5 py-1.5 rounded-full hover:brightness-110 hover:scale-105 shadow-lg shadow-gold/25 transition-all duration-300 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>BOOK DATES</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center p-2 rounded-xl text-gold border border-gold/40 bg-[#3B0811]/90 backdrop-blur-md shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:border-gold hover:text-white transition-all active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5 text-gold" />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop & Glass Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Fullscreen Frosted Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#1C0307]/80 backdrop-blur-xl lg:hidden"
            />

            {/* Mobile Drawer Content */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[64px] sm:top-[74px] z-50 rounded-3xl bg-[#2B050B]/95 backdrop-blur-2xl border border-gold/40 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-5 items-center text-center py-2">
                <div className="relative p-1.5 rounded-2xl border border-gold/40 bg-[#3B0811] shadow-lg">
                  <img
                    src={SITE_CONFIG.brand.officialLogo}
                    alt={SITE_CONFIG.brand.logoAlt}
                    className="w-28 h-auto object-contain rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-3 w-full">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs tracking-[0.22em] font-bold text-[#F5F2EB] hover:text-gold hover:bg-gold/10 rounded-xl transition-all py-2.5 px-4"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5 w-full pt-4 border-t border-gold/25">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenClientAuth();
                    }}
                    className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-[#F5F2EB] border border-gold/40 py-3 rounded-2xl w-full bg-[#3B0811] shadow-md hover:border-gold transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-gold" />
                    <span>{loggedInClient ? 'MY CLIENT PORTAL' : 'CLIENT LOGIN / REGISTER'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenChat();
                    }}
                    className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-gold border border-gold/40 py-3 rounded-2xl w-full bg-[#4A0E17] shadow-md hover:border-gold transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>ASK KD AI CONSULTANT</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLeadForm();
                    }}
                    className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-obsidian bg-gold-gradient py-3.5 rounded-2xl w-full shadow-lg shadow-gold/20 hover:brightness-110 transition-all active:scale-98"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>CHECK YOUR WEDDING DATE</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
