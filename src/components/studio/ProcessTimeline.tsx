import React from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '../../config/siteConfig';

export const ProcessTimeline: React.FC = () => {
  return (
    <section id="process" className="relative py-28 bg-obsidian-200 border-t border-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs tracking-[0.3em] font-serif-luxury text-gold uppercase block mb-3">
            OUR WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-champagne uppercase">
            FROM FIRST MEETING <br />
            <span className="text-gold-gradient italic font-normal">TO FINAL</span> FRAME.
          </h2>
        </div>

        {/* Process Steps Cards Line */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Connector Bar across desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent z-0" />

          {SITE_CONFIG.process.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Step Circle Badge */}
              <div className="w-16 h-16 rounded-full bg-obsidian-100 border border-gold/40 text-gold flex items-center justify-center font-serif-luxury text-xl font-bold shadow-xl mb-6 group-hover:bg-gold-gradient group-hover:text-obsidian transition-all duration-500">
                {step.number}
              </div>

              <h3 className="text-lg font-serif-luxury font-bold text-champagne uppercase mb-2 group-hover:text-gold transition-colors">
                {step.title}
              </h3>

              <p className="text-xs text-champagne/70 font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
