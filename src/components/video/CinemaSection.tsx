import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, RefreshCw } from 'lucide-react';

interface CinemaSectionProps {
  onOpenVideoModal: (url: string, title: string) => void;
  onStartStory: () => void;
}

const SHOWREEL_VIDEOS = [
  {
    title: "Yash & Kavya — Grand Roka Ceremony 4K Film",
    url: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-42861-large.mp4",
    poster: "/WEBSITE/assets/yash-kavya-outer-cover.jpg",
    badge: "YASH & KAVYA — ROKA CEREMONY 4K FILM"
  },
  {
    title: "Dhaval & Sangeeta — Pre-Wedding Teaser & Song Film",
    url: "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-happy-couple-walking-in-a-forest-42866-large.mp4",
    poster: "/WEBSITE/assets/dhaval-sangeeta-outer-cover.jpg",
    badge: "DHAVAL & SANGEETA — PRE-WEDDING FILM"
  },
  {
    title: "Dhaval & Sangeeta — High-Impact Cinema Reel",
    url: "https://youtu.be/x7782vFootg",
    poster: "/WEBSITE/assets/dhaval-sangeeta-outer-cover.jpg",
    badge: "DHAVAL & SANGEETA — CINEMA REEL"
  },
  {
    title: "Kaushik & Anjali — Royal Wedding Highlights Film",
    url: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-posing-for-a-photo-shoot-42863-large.mp4",
    poster: "/WEBSITE/assets/kaushik-anjali-outer-cover.jpg",
    badge: "KAUSHIK & ANJALI — HIGHLIGHTS FILM"
  },
  {
    title: "Kaushik & Anjali — Bridal Highlights Cinema Film",
    url: "https://assets.mixkit.co/videos/preview/mixkit-bride-putting-on-an-earring-42865-large.mp4",
    poster: "/WEBSITE/assets/service-bride-mirror.jpg",
    badge: "KAUSHIK & ANJALI — BRIDAL FILM"
  }
];

export const CinemaSection: React.FC<CinemaSectionProps> = ({ onOpenVideoModal, onStartStory }) => {
  // Select a random video index on component mount / page refresh
  const [currentIndex, setCurrentIndex] = useState(() => {
    return Math.floor(Math.random() * SHOWREEL_VIDEOS.length);
  });

  const activeVideo = SHOWREEL_VIDEOS[currentIndex];

  const handleNextVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SHOWREEL_VIDEOS.length);
  };

  return (
    <section id="cinema" className="relative py-28 bg-obsidian border-t border-gold/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gold-radial opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] font-serif-luxury text-gold uppercase block mb-3">
            CINEMATIC IMMERSION
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif-luxury font-extrabold text-champagne uppercase leading-tight mb-6">
            PRESS PLAY. <br />
            <span className="text-gold-gradient italic font-normal">RELIVE</span> THE MOMENT.
          </h2>
          <p className="text-sm sm:text-base text-champagne/70 font-light leading-relaxed">
            We don't just record events. We engineer emotional time capsules with cinema-grade color science, acoustic scoring, and poetic creative direction.
          </p>
        </div>

        {/* Video Hero Player Banner Card */}
        <motion.div
          key={activeVideo.url}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onClick={() => onOpenVideoModal(activeVideo.url, activeVideo.title)}
          className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl h-[420px] sm:h-[560px] group cursor-pointer"
          data-cursor="PLAY"
        >
          {/* Background Live Looping Video Frame */}
          <video
            key={activeVideo.url}
            src={encodeURI(activeVideo.url)}
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => {
              (e.currentTarget as HTMLVideoElement).src = 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-42861-large.mp4';
            }}
            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

          {/* Central Animated Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gold/20 animate-ping opacity-75 pointer-events-none" />
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 sm:w-12 sm:h-12 fill-current ml-1" />
              </div>
            </div>
          </div>

          {/* Top Right Quick Change Button */}
          <div className="absolute top-6 right-6">
            <button
              onClick={handleNextVideo}
              className="inline-flex items-center gap-2 text-[10px] tracking-widest font-semibold text-gold border border-gold/40 bg-obsidian/85 backdrop-blur-md px-4 py-2 rounded-full hover:bg-gold-gradient hover:text-obsidian transition-all shadow-lg"
              title="Switch to next film"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>SWITCH FILM ({currentIndex + 1}/{SHOWREEL_VIDEOS.length})</span>
            </button>
          </div>

          {/* Bottom Card Title Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs tracking-[0.25em] text-gold uppercase font-serif-luxury font-semibold block mb-1">
                {activeVideo.badge}
              </span>
              <h3 className="text-xl sm:text-3xl font-serif-luxury font-bold text-champagne uppercase">
                {activeVideo.title}
              </h3>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartStory();
              }}
              className="inline-flex items-center gap-2 text-xs tracking-widest font-semibold text-gold border border-gold/40 bg-obsidian-200/90 backdrop-blur-md px-6 py-3 rounded-full hover:bg-gold-gradient hover:text-obsidian transition-all self-start sm:self-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>BOOK YOUR FILM</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
