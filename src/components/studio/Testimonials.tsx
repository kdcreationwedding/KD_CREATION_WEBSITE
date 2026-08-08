import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? SITE_CONFIG.testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === SITE_CONFIG.testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = SITE_CONFIG.testimonials[currentIndex];

  return (
    <section className="relative py-28 bg-obsidian border-t border-gold/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] font-serif-luxury text-gold uppercase block mb-3">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-champagne uppercase">
            WORDS FROM <span className="text-gold-gradient italic font-normal">THE COUPLES</span>
          </h2>
        </div>

        {/* Main Testimonial Slider Card */}
        <div className="relative glass-card rounded-3xl p-8 sm:p-14 border border-gold/20 shadow-2xl text-center flex flex-col items-center">
          
          <Quote className="w-12 h-12 text-gold/30 mb-6" />

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-gold mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 max-w-3xl"
            >
              <p className="text-lg sm:text-2xl font-serif-luxury italic text-champagne leading-relaxed">
                "{current.quote}"
              </p>

              <div className="flex flex-col items-center gap-3 pt-4">
                <img
                  src={current.portrait}
                  alt={current.couple}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gold/40 shadow-lg"
                />
                <div>
                  <h3 className="text-lg font-serif-luxury font-bold text-gold uppercase">
                    {current.couple}
                  </h3>
                  <span className="text-xs text-champagne/60 uppercase tracking-widest block">
                    {current.location} • {current.weddingDate}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Control Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 text-gold rounded-full border border-gold/20 hover:border-gold hover:bg-gold/10 transition-all"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-champagne/40 tracking-widest">
              0{currentIndex + 1} / 0{SITE_CONFIG.testimonials.length}
            </span>

            <button
              onClick={nextTestimonial}
              className="p-3 text-gold rounded-full border border-gold/20 hover:border-gold hover:bg-gold/10 transition-all"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
