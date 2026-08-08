import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

interface CinemaSectionProps {
  onOpenVideoModal: (url: string, title: string) => void;
  onStartStory: () => void;
}

export const CinemaSection: React.FC<CinemaSectionProps> = ({ onOpenVideoModal, onStartStory }) => {
  const showreelUrl = "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-42861-large.mp4";

  return (
    <section className="relative py-28 bg-obsidian border-t border-gold/10 overflow-hidden">
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
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => onOpenVideoModal(showreelUrl, "KD CREATION Signature Master Film")}
          className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl h-[420px] sm:h-[560px] group cursor-pointer"
          data-cursor="PLAY"
        >
          {/* Background Poster Image */}
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
            alt="KD CREATION Cinema"
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

          {/* Bottom Card Title Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs tracking-[0.25em] text-gold uppercase font-serif-luxury font-semibold block mb-1">
                4K ANAMORPHIC MASTERPIECE
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-champagne uppercase">
                THE KD CREATION EXPERIENCE
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
