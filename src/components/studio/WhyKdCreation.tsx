import React from 'react';
import { motion } from 'framer-motion';

export const WhyKdCreation: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'CINEMATIC STORYTELLING',
      desc: 'Hollywood-grade RED camera packages, custom anamorphic glass, and synchronized sound design that turns every wedding into a feature film.'
    },
    {
      num: '02',
      title: 'EDITORIAL PHOTOGRAPHY',
      desc: 'High-fashion framing, fine-art pose direction, and candid high-resolution stills tailored for Vogue and Harper’s Bazaar aesthetics.'
    },
    {
      num: '03',
      title: 'EMOTION-FIRST APPROACH',
      desc: 'Discreet camera operating that captures quiet tearful glances, joyful embraces, and unscripted laughter without breaking the flow of your day.'
    },
    {
      num: '04',
      title: 'PREMIUM EXPERIENCE',
      desc: 'Dedicated concierge team, private client viewing lounge, timeline management, and seamless international travel logistics.'
    },
    {
      num: '05',
      title: 'PROFESSIONAL POST-PRODUCTION',
      desc: 'In-house color grading artists, acoustic sound engineers, and master retouchers refining every single frame to perfection.'
    },
    {
      num: '06',
      title: 'MODERN CREATIVE DIRECTION',
      desc: 'Contemporary color palettes, next-day social reels, and high-impact visual storytelling crafted for discerning modern couples.'
    }
  ];

  return (
    <section className="relative py-28 bg-obsidian border-t border-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs tracking-[0.3em] font-serif-luxury text-gold uppercase block mb-3">
            THE KD STANDARDS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-champagne uppercase">
            NOT JUST COVERAGE. <br />
            <span className="text-gold-gradient italic font-normal">A VISUAL</span> LEGACY.
          </h2>
          <div className="w-16 h-[1px] bg-gold/50 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-8 border border-gold/15 hover:border-gold/40 relative group overflow-hidden"
            >
              <div className="text-4xl font-serif-luxury font-extrabold text-gold-gradient mb-4 opacity-80 group-hover:scale-110 transition-transform origin-left">
                {pillar.num}
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-champagne uppercase mb-3 group-hover:text-gold transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-champagne/70 font-light leading-relaxed">
                {pillar.desc}
              </p>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/15 transition-colors" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
