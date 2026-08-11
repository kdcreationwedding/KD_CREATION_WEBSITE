import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Video, Smartphone, BookOpen, Crown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const getServiceIcon = (id: string) => {
  switch (id) {
    case 'wedding-photography':
      return <Camera className="w-5 h-5 text-gold" />;
    case 'wedding-cinematography':
      return <Film className="w-5 h-5 text-gold" />;
    case 'pre-wedding-films':
      return <Video className="w-5 h-5 text-gold" />;
    case 'wedding-reels':
      return <Smartphone className="w-5 h-5 text-gold" />;
    case 'wedding-albums':
      return <BookOpen className="w-5 h-5 text-gold" />;
    case 'complete-coverage':
      return <Crown className="w-5 h-5 text-gold" />;
    default:
      return <Camera className="w-5 h-5 text-gold" />;
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative py-28 sm:py-36 bg-[#3B0811] border-t border-gold/20 overflow-hidden text-[#F5F2EB]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs tracking-[0.3em] font-serif-luxury font-extrabold text-gold uppercase block mb-3">
            BESPOKE OFFERINGS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#F5F2EB] uppercase mb-6">
            OUR <span className="text-gold-gradient italic font-normal">SIGNATURE</span> SERVICES
          </h2>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#F5F2EB]/80 font-semibold leading-relaxed">
            Every celebration demands a unique visual language. We combine editorial still frames, high-end 4K cinema production, and handcrafted heirlooms into one continuous legacy.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_CONFIG.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -7, scale: 1.015 }}
              className="liquid-glass-card rounded-3xl overflow-hidden flex flex-col group shadow-xl transition-all duration-300"
              data-cursor="VIEW"
            >
              {/* Image Preview with Hover Zoom & Crossfade */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-[#2B050B]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-[center_15%] transition-all duration-700 group-hover:scale-105 brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />
                {service.images && service.images.length > 1 && (
                  <img
                    src={service.images[1]}
                    alt={`${service.title} alternate`}
                    className="absolute inset-0 w-full h-full object-cover object-[center_15%] transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105 brightness-95 group-hover:brightness-100"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B0811] via-[#3B0811]/30 to-transparent opacity-85 pointer-events-none" />
                
                {/* Floating Service Badge */}
                <div className="absolute top-4 left-4 liquid-glass-pill p-2.5 rounded-2xl shadow-lg">
                  {getServiceIcon(service.id)}
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.2em] font-serif-luxury font-extrabold text-gold uppercase block mb-1">
                    {service.subtitle}
                  </span>
                  <h3 className="text-xl font-serif-luxury font-bold text-[#F5F2EB] uppercase mb-3 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5F2EB]/80 font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 mb-8 border-t border-gold/20 pt-4">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-[#F5F2EB]/90 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Action */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full flex items-center justify-between text-xs tracking-widest font-bold text-gold border border-gold/40 bg-[#2B050B]/60 py-3.5 px-5 rounded-2xl hover:bg-gold-gradient hover:text-obsidian shadow-sm transition-all duration-300 group/btn"
                >
                  <span>{service.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
