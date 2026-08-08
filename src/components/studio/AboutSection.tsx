import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 bg-obsidian-200 border-t border-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Studio Image Gallery Frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85"
                alt="KD CREATION Studio Team"
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -right-6 sm:right-6 border border-gold/40 bg-obsidian-100/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-xs border-l-4 border-l-gold">
              <span className="text-3xl font-serif-luxury font-bold text-gold-gradient block mb-1">
                8+ YEARS
              </span>
              <span className="text-xs text-champagne/80 uppercase font-serif-luxury tracking-widest font-semibold block">
                CRAFTING TIMELESS ROYAL WEDDINGS
              </span>
            </div>
          </motion.div>

          {/* Right Text Editorial */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-xs tracking-[0.3em] font-serif-luxury text-gold uppercase block mb-3">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-champagne uppercase leading-tight">
                THE PEOPLE <br />
                <span className="text-gold-gradient italic font-normal">BEHIND THE</span> FRAMES.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-champagne/80 font-light leading-relaxed">
              At **KD CREATION**, we believe a wedding is not a sequence of events to be documented—it is a sacred emotional universe deserving of museum-grade cinematic preservation.
            </p>

            <p className="text-sm sm:text-base text-champagne/70 font-light leading-relaxed">
              Founded by visionary directors and fine-art photographers, our studio blends haute couture aesthetic direction with raw, unscripted emotion. We obsess over light, color harmony, soundscapes, and editorial framing to create visual legacies that endure for generations.
            </p>

            <div className="pt-6 border-t border-gold/15 grid grid-cols-2 gap-6 text-center sm:text-left">
              <div>
                <span className="text-3xl font-serif-luxury font-bold text-gold block">350+</span>
                <span className="text-xs text-champagne/60 tracking-widest uppercase">ROYAL CELEBRATIONS</span>
              </div>
              <div>
                <span className="text-3xl font-serif-luxury font-bold text-gold block">18+</span>
                <span className="text-xs text-champagne/60 tracking-widest uppercase">GLOBAL DESTINATIONS</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
