import React, { useState } from 'react';
import { Instagram, Youtube, MessageCircle, ArrowUp, Mail, Phone, PhoneCall, Check, Lock } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface FooterProps {
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminPortal }) => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_CONFIG.brand.email}&su=${encodeURIComponent('Wedding Photography & Film Enquiry - KD CREATION')}`;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.WHATSAPP.number}?text=${encodeURIComponent(SITE_CONFIG.WHATSAPP.defaultGreeting)}`;
  const phoneCallUrl = `tel:${SITE_CONFIG.brand.phone.replace(/\s+/g, '')}`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(SITE_CONFIG.brand.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.open(gmailUrl, '_blank');
  };

  return (
    <footer className="relative bg-[#1C0307] border-t border-gold/30 pt-20 pb-12 overflow-hidden text-[#F5F2EB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gold/25">
          
          {/* Brand Info & Official Logo */}
          <div className="md:col-span-5 space-y-6">
            <a href="#hero" className="inline-block">
              <div className="border border-gold/40 p-2 rounded-xl bg-[#3B0811] shadow-md inline-block max-w-[240px]">
                <img
                  src={SITE_CONFIG.brand.officialLogo}
                  alt={SITE_CONFIG.brand.logoAlt}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </a>

            <p className="text-sm font-serif-luxury italic text-gold font-bold text-lg">
              "{SITE_CONFIG.brand.tagline}"
            </p>

            <p className="text-xs text-[#F5F2EB]/80 font-semibold max-w-sm leading-relaxed">
              KD CREATION creates cinematic wedding films, editorial photography, pre-wedding films and timeless visual stories for couples across India and worldwide.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs tracking-widest uppercase font-bold text-[#F5F2EB]">
              <li><a href="#hero" className="hover:text-gold transition-colors">HOME</a></li>
              <li><a href="#stories" className="hover:text-gold transition-colors">STORIES</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">SERVICES</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">ABOUT STUDIO</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">ENQUIRE / BOOK</a></li>
            </ul>
          </div>

          {/* Connect & Direct Interactive Options */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-xs tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase">
              CONNECT WITH US
            </h4>
            
            {/* Direct Gmail Clickable Action */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-gold uppercase tracking-wider font-extrabold block">
                DIRECT EMAIL (OPEN IN GMAIL)
              </span>
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCopyEmail}
                className="flex items-center justify-between text-xs text-gold font-mono font-bold hover:text-white p-3 rounded-xl bg-[#3B0811] border border-gold/35 hover:border-gold transition-all shadow-md group"
                title="Click to open Gmail directly"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                  <span>{SITE_CONFIG.brand.email}</span>
                </div>
                {copied ? (
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> COPIED
                  </span>
                ) : (
                  <span className="text-[10px] text-gold/70 group-hover:text-gold uppercase tracking-widest font-sans font-extrabold">
                    OPEN GMAIL ↗
                  </span>
                )}
              </a>
            </div>

            {/* Mobile Number with 2 INSTANT OPTIONS: WhatsApp & Direct Call */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] text-gold uppercase tracking-wider font-extrabold block">
                MOBILE NUMBER ({SITE_CONFIG.brand.phone})
              </span>
              
              <div className="p-3 rounded-2xl bg-[#3B0811] border border-gold/35 space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F5F2EB]">
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    {SITE_CONFIG.brand.phone}
                  </span>
                  <span className="text-[9px] text-gold uppercase tracking-widest font-bold">
                    SELECT ACTION
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Option 1: WhatsApp Msg */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 text-[10px] tracking-widest font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 p-2.5 rounded-xl shadow-md transition-all border border-emerald-500/40"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WHATSAPP MSG</span>
                  </a>

                  {/* Option 2: Direct Call */}
                  <a
                    href={phoneCallUrl}
                    className="flex items-center justify-center gap-1.5 text-[10px] tracking-widest font-extrabold text-obsidian bg-gold-gradient hover:brightness-110 p-2.5 rounded-xl shadow-md transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>DIRECT CALL</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/40 bg-[#3B0811] flex items-center justify-center text-gold hover:bg-gold-gradient hover:text-obsidian shadow-sm transition-all"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.brand.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/40 bg-[#3B0811] flex items-center justify-center text-gold hover:bg-gold-gradient hover:text-obsidian shadow-sm transition-all"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/40 bg-[#3B0811] flex items-center justify-center text-gold hover:bg-gold-gradient hover:text-obsidian shadow-sm transition-all"
                aria-label="WhatsApp Direct Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

        {/* Copyright, Admin Portal Trigger & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-widest text-[#F5F2EB]/70 font-bold">
          <div>
            CRAFTING STORIES THAT LAST FOREVER.
          </div>

          {/* Admin Leads Vault Secret Trigger */}
          <button
            onClick={onOpenAdminPortal}
            className="flex items-center gap-2 text-gold hover:text-white transition-colors bg-[#3B0811] px-4 py-1.5 rounded-full border border-gold/30 shadow-sm"
            title="Open Admin Client Leads Vault"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>VIEW ALL CLIENT LEADS (ADMIN)</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gold hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
