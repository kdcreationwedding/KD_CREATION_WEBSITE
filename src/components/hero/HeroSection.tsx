import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Award } from 'lucide-react';
import { SplineHero3D } from './SplineHero3D';
import { SITE_CONFIG } from '../../config/siteConfig';

interface HeroSectionProps {
  onExploreStories: () => void;
  onStartStory: () => void;
  onOpenVideoModal: (url: string, title: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreStories,
  onStartStory,
  onOpenVideoModal,
}) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden bg-[#2B050B] text-[#F5F2EB]">
      {/* 3D Spline & Canvas Background */}
      <SplineHero3D />

      {/* Hero Content Stack */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full flex flex-col items-center text-center">
        
        {/* Top Luxury Studio Pill Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 border border-gold/40 bg-[#3B0811]/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-2xl mb-8"
        >
          <Award className="w-4 h-4 text-gold" />
          <span className="text-[11px] sm:text-xs tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase">
            LUXURY WEDDING FILM STUDIO
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-luxury font-extrabold text-[#F5F2EB] leading-[1.05] tracking-tight max-w-5xl mb-6 uppercase"
        >
          WE TURN YOUR <br />
          <span className="text-gold-gradient italic font-normal">WEDDING</span> INTO A <br />
          TIMELESS FILM.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs sm:text-base md:text-lg tracking-[0.25em] text-[#F5F2EB]/85 font-semibold uppercase max-w-2xl mb-12"
        >
          {SITE_CONFIG.brand.subheading}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={onExploreStories}
            data-cursor="EXPLORE"
            className="w-full sm:w-auto flex items-center justify-center gap-3 text-xs tracking-[0.25em] font-bold text-obsidian bg-gold-gradient px-8 py-4 rounded-full shadow-2xl hover:brightness-110 transition-all duration-300 active:scale-95"
          >
            <span>EXPLORE OUR STORIES</span>
          </button>

          <button
            onClick={onStartStory}
            data-cursor="BOOK"
            className="w-full sm:w-auto flex items-center justify-center gap-3 text-xs tracking-[0.25em] font-bold text-[#F5F2EB] border border-gold/50 bg-[#3B0811]/70 backdrop-blur-md px-8 py-4 rounded-full hover:bg-gold/20 hover:border-gold transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>START YOUR STORY</span>
          </button>
        </motion.div>


      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={onExploreStories}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-gold font-bold group-hover:text-white transition-colors">
          SCROLL TO DISCOVER
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-gold/50 flex items-start justify-center p-1 bg-[#3B0811]/50"
        >
          <div className="w-1.5 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
