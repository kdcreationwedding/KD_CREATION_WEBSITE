import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Film, Image, CheckCircle2, Clock, Download, MessageCircle, LogOut, Calendar, MapPin, Award } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface ClientPortalModalProps {
  isOpen: boolean;
  clientInfo: { name: string; email: string; weddingDate?: string } | null;
  onClose: () => void;
  onLogout: () => void;
  onOpenVideoModal: (url: string, title: string) => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  clientInfo,
  onClose,
  onLogout,
  onOpenVideoModal,
}) => {
  if (!isOpen || !clientInfo) return null;

  const projectStages = [
    { number: '01', title: 'Pre-Wedding Film Shoot', status: 'Completed', date: 'October 2025' },
    { number: '02', title: 'Main Wedding 4K Production', status: 'Completed', date: 'December 2025' },
    { number: '03', title: 'Cinema Color Grading & Sound Sync', status: 'In Progress (85%)', date: 'Est. Delivery: 3 Days' },
    { number: '04', title: 'Italian Leather Album Printing', status: 'Upcoming', date: 'Est. Delivery: 10 Days' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl liquid-glass-panel rounded-3xl overflow-hidden shadow-2xl bg-[#3B0811] border border-gold/40 text-[#F5F2EB] my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#2B050B] border-b border-gold/30 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl border border-gold/40 bg-[#3B0811] p-1 shadow-md">
                <img
                  src={SITE_CONFIG.brand.officialLogo}
                  alt="KD CREATION Official Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase block">
                  VIP CLIENT WEDDING PORTAL
                </span>
                <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                  WELCOME, {clientInfo.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-white px-3 py-1.5 rounded-full border border-rose-500/30 hover:border-rose-500 transition-all font-bold"
                title="Logout from Client Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LOGOUT</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-gold hover:text-white rounded-full bg-gold/10 hover:bg-gold/20 transition-all border border-gold/30"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Scroll Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            
            {/* Wedding Overview Card */}
            <div className="liquid-glass-card rounded-2xl p-6 border border-gold/35 bg-[#2B050B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-serif-luxury font-extrabold text-gold uppercase bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>ROYAL SIGNATURE WEDDING PACKAGE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                  {clientInfo.name} WEDDING FILM
                </h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[#F5F2EB]/80 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gold" />
                    {clientInfo.weddingDate || '18th December 2026'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gold" />
                    Taj Lake Palace, Udaipur
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/${SITE_CONFIG.WHATSAPP.number}?text=${encodeURIComponent(`Hi KD CREATION, I am checking in from my Client Portal regarding project updates for ${clientInfo.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-xs tracking-widest font-extrabold text-obsidian bg-gold-gradient px-6 py-3.5 rounded-full shadow-2xl hover:brightness-110 transition-all flex-shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-current text-emerald-950" />
                <span>CHAT WITH CREATIVE DIRECTOR</span>
              </a>
            </div>

            {/* Production Timeline Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm tracking-widest font-serif-luxury font-bold text-gold uppercase flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  YOUR WEDDING FILM PRODUCTION TIMELINE
                </h4>
                <span className="text-xs text-gold font-mono font-bold">Overall Progress: 85%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {projectStages.map((st, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      st.status.includes('Progress')
                        ? 'bg-[#2B050B] border-gold shadow-lg shadow-gold/15'
                        : st.status === 'Completed'
                        ? 'bg-[#2B050B]/60 border-emerald-500/40 text-[#F5F2EB]/90'
                        : 'bg-[#2B050B]/30 border-gold/20 text-[#F5F2EB]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-gold">{st.number}</span>
                      {st.status === 'Completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-[#F5F2EB] mb-1">{st.title}</h5>
                    <span className="text-[10px] text-gold font-semibold block">{st.status}</span>
                    <span className="text-[9px] text-[#F5F2EB]/60 block font-mono mt-1">{st.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Private Teaser & Gallery Vault */}
            <div className="space-y-4 pt-4 border-t border-gold/20">
              <h4 className="text-sm tracking-widest font-serif-luxury font-bold text-gold uppercase flex items-center gap-2">
                <Film className="w-4 h-4" />
                PRIVATE 4K TRAILER & TEASER REELS
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  onClick={() =>
                    onOpenVideoModal(
                      'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-42861-large.mp4',
                      `${clientInfo.name} — Private Teaser`
                    )
                  }
                  className="relative h-56 rounded-2xl overflow-hidden border border-gold/30 cursor-pointer group shadow-xl"
                  data-cursor="PLAY"
                >
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                    alt="Teaser Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center" />
                  <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center font-bold shadow-2xl group-hover:scale-110 transition-transform">
                    ▶
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-bold text-white uppercase">
                    WATCH 4K TEASER REEL (1:45 MIN)
                  </div>
                </div>

                <div className="liquid-glass-panel rounded-2xl p-6 border border-gold/30 flex flex-col justify-between space-y-4">
                  <div>
                    <h5 className="text-base font-serif-luxury font-bold text-gold uppercase mb-2">
                      DIGITAL HEIRLOOM VAULT
                    </h5>
                    <p className="text-xs text-[#F5F2EB]/80 font-semibold leading-relaxed">
                      Your master 4K films, high-resolution retouched photo gallery, and Instagram reels are protected with 256-bit encryption in our cloud vault.
                    </p>
                  </div>

                  <button
                    onClick={() => alert('Downloading Client Package Invoice & Master Contract PDF...')}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs tracking-widest font-bold text-gold border border-gold/40 bg-[#2B050B] py-3 rounded-xl hover:bg-gold-gradient hover:text-obsidian transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD INVOICE & CONTRACT PDF</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
