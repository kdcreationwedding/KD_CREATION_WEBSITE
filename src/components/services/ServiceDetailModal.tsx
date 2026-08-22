import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, MessageCircle, Calendar, ShieldCheck, Film, Camera } from 'lucide-react';
import { ServiceItem, SITE_CONFIG } from '../../config/siteConfig';
import { getAssetUrl } from '../../utils/assetHelper';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi KD CREATION, I would like to inquire about your ${service.title} service for my upcoming wedding.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.WHATSAPP.number}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C0307]/90 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#2B050B] border border-gold/40 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 text-[#F5F2EB]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-[#3B0811]/80 border border-gold/30 text-gold hover:bg-gold hover:text-obsidian transition-all duration-300"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner with Hover Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden bg-[#1C0307]">
            <img
              src={getAssetUrl(service.image)}
              alt={`KD Creation ${service.title} - Luxury Wedding Photography Cinematography Ahmedabad Gujarat`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B050B] via-[#2B050B]/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs tracking-[0.3em] font-serif-luxury font-extrabold text-gold uppercase block mb-2">
                {service.subtitle}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold uppercase text-[#F5F2EB]">
                {service.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            
            {/* Extended SEO Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif-luxury font-bold text-gold uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>EXECUTIVE OVERVIEW & VISUAL APPROACH</span>
              </h3>
              <p className="text-sm sm:text-base text-[#F5F2EB]/90 font-medium leading-relaxed">
                {service.description} At <strong>KD CREATION</strong>, our Ahmedabad-based team led by Mahesh Parmar and Harshad Chavda deploys 4K anamorphic cinema optics, multi-angle direction, custom sound design, and museum-grade color matrix workflows.
              </p>
            </div>

            {/* Key Deliverables & Features Matrix */}
            <div className="space-y-4 border-t border-gold/20 pt-6">
              <h3 className="text-lg font-serif-luxury font-bold text-gold uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>SIGNATURE DELIVERABLES & COVERAGE INCLUSIONS</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-gold/25 bg-[#3B0811]/60 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-[#F5F2EB]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment & Quality Standards Bar */}
            <div className="p-5 rounded-2xl border border-gold/30 bg-[#1C0307] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-gold">
                <Film className="w-6 h-6 flex-shrink-0" />
                <span className="text-xs font-serif-luxury font-bold uppercase tracking-wider">
                  4K Anamorphic Cinema • Sony FX Optics • Drone Aerials
                </span>
              </div>
              <span className="text-[11px] text-[#F5F2EB]/70 font-mono">
                Ahmedabad • Gujarat • Worldwide
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gold/20">
              <button
                onClick={() => {
                  onClose();
                  onBookService(service.title);
                }}
                className="w-full sm:w-auto flex-1 py-4 px-8 rounded-full bg-gold-gradient text-obsidian font-serif-luxury font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>CHECK DATE AVAILABILITY & QUOTE</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto py-4 px-8 rounded-full border border-gold/50 bg-[#3B0811] text-gold font-serif-luxury font-bold text-xs uppercase tracking-widest hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>CHAT ON WHATSAPP</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
