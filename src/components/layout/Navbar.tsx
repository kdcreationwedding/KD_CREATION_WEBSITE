import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Sparkles, UserCheck, Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenLeadForm: () => void;
  onOpenClientAuth: () => void;
  loggedInClient: { name: string; email: string } | null;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onOpenLeadForm,
  onOpenClientAuth,
  loggedInClient,
  onNavigateHome,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          // Scroll spy for active section highlight
          const sections = ['stories', 'video-editing', 'services', 'about', 'founders', 'contact'];
          const scrollPos = window.scrollY + 120;
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    } else {
      if (onNavigateHome) {
        onNavigateHome();
      } else {
        window.location.href = '/';
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '/' || href === '') {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        if (onNavigateHome) {
          onNavigateHome();
        } else {
          window.location.href = '/';
        }
      }
      return;
    }

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      } else {
        // If on dedicated sub-page, navigate back home with hash
        if (onNavigateHome) {
          onNavigateHome();
          setTimeout(() => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        } else {
          window.location.href = `/${href}`;
        }
      }
    }
  };

  const navLinks = [
    { name: 'STORIES', href: '#stories', id: 'stories' },
    { name: 'VIDEO EDITING', href: '#video-editing', id: 'video-editing' },
    { name: 'SERVICES', href: '#services', id: 'services' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'LEADERSHIP', href: '#founders', id: 'founders' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#33060D]/95 backdrop-blur-md py-2.5 shadow-2xl border-b border-gold/30'
            : 'bg-gradient-to-b from-[#2B050B]/95 via-[#2B050B]/75 to-transparent py-3.5 border-b border-gold/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Official Logo Brand Container */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2.5 relative focus:outline-none py-0.5 cursor-pointer shrink-0"
            aria-label="KD CREATION Home"
          >
            <div className="relative h-9 sm:h-10 w-9 sm:w-10 overflow-hidden rounded-xl border border-gold/40 bg-[#3B0811] p-0.5 shadow-[0_4px_15px_rgba(212,175,55,0.2)] transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center">
              <img
                src={SITE_CONFIG.brand.officialLogo}
                alt={SITE_CONFIG.brand.logoAlt}
                className="h-full w-full object-cover rounded-lg"
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
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-[11px] xl:text-xs tracking-[0.16em] font-bold py-1 transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-[#F5F2EB]/90 hover:text-gold'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Client Portal Login / Dashboard Button (Desktop Only) */}
            <button
              onClick={onOpenClientAuth}
              className="hidden xl:flex items-center gap-1.5 text-[10px] tracking-widest font-bold text-[#F5F2EB] border border-gold/40 bg-[#3B0811] px-3 py-1.5 rounded-full hover:border-gold hover:text-gold hover:scale-105 transition-all shadow-md shrink-0"
              title="Open VIP Client Portal"
            >
              <UserCheck className="w-3.5 h-3.5 text-gold" />
              <span>{loggedInClient ? 'MY PORTAL' : 'CLIENT LOGIN'}</span>
            </button>

            {/* Ask AI Consultant (Tablet & Desktop) */}
            <button
              onClick={onOpenChat}
              className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-widest font-bold text-gold border border-gold/40 bg-[#4A0E17]/80 backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-gold-gradient hover:text-obsidian hover:scale-105 shadow-md transition-all duration-300 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ASK KD AI</span>
              <span className="md:hidden">AI</span>
            </button>

            {/* Book Dates CTA (Always visible for top conversion) */}
            <button
              onClick={onOpenLeadForm}
              className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-widest font-bold text-obsidian bg-gold-gradient px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:brightness-110 hover:scale-105 shadow-lg shadow-gold/25 transition-all duration-300 active:scale-95 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-obsidian" />
              <span>BOOK DATES</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center p-2 rounded-xl text-gold border border-gold/40 bg-[#3B0811]/90 backdrop-blur-md shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:border-gold hover:text-white transition-all active:scale-95 ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5 text-gold" />}
            </button>
          </div>
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
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#1C0307]/80 backdrop-blur-xl lg:hidden"
            />

            {/* Mobile Drawer Content */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[64px] sm:top-[74px] z-50 rounded-3xl bg-[#2B050B]/95 backdrop-blur-2xl border border-gold/40 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-4 items-center text-center py-1">
                {/* Brand Logo in Menu */}
                <div className="flex items-center gap-3 p-2 rounded-2xl border border-gold/40 bg-[#3B0811] shadow-lg w-full justify-center">
                  <img
                    src={SITE_CONFIG.brand.officialLogo}
                    alt={SITE_CONFIG.brand.logoAlt}
                    className="w-9 h-9 object-cover rounded-lg border border-gold/30"
                  />
                  <div className="text-left">
                    <span className="text-sm font-serif-luxury font-bold text-gold tracking-widest block leading-tight">
                      KD CREATION
                    </span>
                    <span className="text-[9px] text-[#F5F2EB]/70 tracking-widest uppercase">
                      LUXURY WEDDING FILMS
                    </span>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-2 w-full">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-xs tracking-[0.2em] font-bold rounded-xl transition-all py-2.5 px-4 flex items-center justify-between ${
                          isActive
                            ? 'text-gold bg-gold/15 border border-gold/40 shadow-sm'
                            : 'text-[#F5F2EB]/90 hover:text-gold hover:bg-gold/10'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#D4AF37]" />}
                      </a>
                    );
                  })}
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col gap-2.5 w-full pt-3 border-t border-gold/25">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenClientAuth();
                    }}
                    className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-[#F5F2EB] border border-gold/40 py-2.5 rounded-2xl w-full bg-[#3B0811] shadow-md hover:border-gold transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-gold" />
                    <span>{loggedInClient ? 'MY CLIENT PORTAL' : 'CLIENT LOGIN / REGISTER'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenChat();
                    }}
                    className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-gold border border-gold/40 py-2.5 rounded-2xl w-full bg-[#4A0E17] shadow-md hover:border-gold transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>ASK KD AI CONSULTANT</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLeadForm();
                    }}
                    className="flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-obsidian bg-gold-gradient py-3 rounded-2xl w-full shadow-lg shadow-gold/20 hover:brightness-110 transition-all active:scale-98"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>BOOK YOUR WEDDING DATE</span>
                  </button>
                </div>

                {/* Quick Phone & WhatsApp Contact */}
                <div className="flex items-center justify-center gap-4 w-full pt-2 border-t border-gold/15 text-[11px] text-gold font-bold">
                  <a
                    href="tel:+919033032922"
                    className="flex items-center gap-1.5 hover:text-gold-light transition-colors py-1 px-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Studio</span>
                  </a>
                  <span className="text-gold/40">•</span>
                  <a
                    href="https://wa.me/919033032922?text=Hello%20KD%20Creation%2C%20I%20would%20like%20to%20inquire%20about%20wedding%20photography%20and%20films."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-gold-light transition-colors py-1 px-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
