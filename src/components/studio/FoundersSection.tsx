import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const FoundersSection: React.FC = () => {
  return (
    <section id="founders" className="relative py-28 sm:py-36 bg-[#2B050B] border-t border-gold/20 overflow-hidden text-[#F5F2EB]">
      {/* Background ambient gold glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] font-serif-luxury font-extrabold text-gold uppercase block mb-3"
          >
            EXECUTIVE LEADERSHIP & VISIONARIES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#F5F2EB] uppercase mb-6"
          >
            THE <span className="text-gold-gradient italic font-normal">FOUNDERS</span> BEHIND KD CREATION
          </motion.h2>

          <div className="w-16 h-[1.5px] bg-gold mx-auto mb-6" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#F5F2EB]/80 font-semibold leading-relaxed"
          >
            Pioneering the future of luxury 4K wedding cinematography, editorial fine-art photography, and grand celebration storytelling across Gujarat and All Over India.
          </motion.p>
        </div>

        {/* Founders Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {SITE_CONFIG.founders.map((founder, idx) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 45, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="liquid-glass-card rounded-3xl overflow-hidden flex flex-col group border border-gold/35 hover:border-gold/65 shadow-2xl bg-[#3B0811]/90 transition-all duration-300"
              data-cursor="LEADER"
            >
              {/* Founder Image Container */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-[#2B050B]">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B0811] via-transparent to-transparent opacity-90" />

                {/* Founder Badge */}
                <div className="absolute top-4 left-4 liquid-glass-pill px-4 py-1.5 rounded-full text-[9px] tracking-widest text-gold uppercase font-serif-luxury font-extrabold shadow-lg flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-gold" />
                  <span>{founder.badge}</span>
                </div>
              </div>

              {/* Founder Bio Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.2em] font-serif-luxury font-extrabold text-gold uppercase block mb-1">
                    {founder.role}
                  </span>

                  <h3 className="text-2xl font-serif-luxury font-bold text-[#F5F2EB] uppercase group-hover:text-gold transition-colors mb-2">
                    {founder.name}
                  </h3>

                  <p className="text-xs text-gold/90 font-semibold italic mb-4">
                    "{founder.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-[#F5F2EB]/80 font-medium leading-relaxed">
                    {founder.bio}
                  </p>
                </div>

                {/* Founder Footer Badge */}
                <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] font-serif-luxury font-extrabold text-gold uppercase">
                    KD CREATION DIRECTORS
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> EXECUTIVE
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
