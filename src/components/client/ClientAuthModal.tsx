import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Calendar, MapPin, ArrowRight, X, Sparkles, Key } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface ClientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (clientInfo: { name: string; email: string; weddingDate?: string }) => void;
}

export const ClientAuthModal: React.FC<ClientAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = {
      name: formData.name || (isSignUp ? 'New Client' : 'Ananya & Devraj'),
      email: formData.email || 'client@example.com',
      weddingDate: formData.weddingDate || '18th December 2026'
    };
    onLoginSuccess(client);
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: 'Ananya & Devraj',
      email: 'ananya.devraj@example.com',
      weddingDate: '18th December 2026'
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg liquid-glass-panel rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-2xl bg-[#3B0811] text-[#F5F2EB]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gold hover:text-white rounded-full bg-gold/10 transition-colors border border-gold/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Brand Logo Header */}
          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl border border-gold/40 bg-[#2B050B] p-1.5 mx-auto shadow-xl flex items-center justify-center">
              <img
                src={SITE_CONFIG.brand.officialLogo}
                alt="KD CREATION Official Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div>
              <span className="text-[10px] tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase block">
                VIP CLIENT PORTAL
              </span>
              <h2 className="text-2xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                {isSignUp ? 'CREATE YOUR CLIENT PORTAL' : 'CLIENT LOGIN'}
              </h2>
              <p className="text-xs text-[#F5F2EB]/70 font-semibold mt-1">
                Access your wedding film timelines, private galleries & project updates.
              </p>
            </div>
          </div>

          {/* Toggle Switch between Login & Register */}
          <div className="flex rounded-full bg-[#2B050B] p-1 border border-gold/30 mb-6">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
                !isSignUp ? 'bg-gold-gradient text-obsidian shadow-md' : 'text-[#F5F2EB]/70 hover:text-white'
              }`}
            >
              CLIENT LOGIN
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
                isSignUp ? 'bg-gold-gradient text-obsidian shadow-md' : 'text-[#F5F2EB]/70 hover:text-white'
              }`}
            >
              REGISTER WEDDING
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-bold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> COUPLE NAMES *
                </label>
                <input
                  type="text"
                  required={isSignUp}
                  placeholder="e.g. Ananya & Devraj"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#2B050B] border border-gold/30 rounded-xl px-4 py-3 text-xs text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. client@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#2B050B] border border-gold/30 rounded-xl px-4 py-3 text-xs text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold"
              />
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-gold uppercase font-serif-luxury font-bold flex items-center gap-1">
                    <Phone className="w-3 h-3" /> PHONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#2B050B] border border-gold/30 rounded-xl px-3 py-2.5 text-xs text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-gold uppercase font-serif-luxury font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> WEDDING DATE
                  </label>
                  <input
                    type="text"
                    placeholder="Dec 2026"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full bg-[#2B050B] border border-gold/30 rounded-xl px-3 py-2.5 text-xs text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> PASSWORD / ACCESS CODE *
              </label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#2B050B] border border-gold/30 rounded-xl px-4 py-3 text-xs text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-xs tracking-[0.2em] font-extrabold text-obsidian bg-gold-gradient py-3.5 rounded-xl shadow-xl hover:brightness-110 transition-all active:scale-98 mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSignUp ? 'REGISTER & ENTER PORTAL' : 'SIGN IN TO MY PORTAL'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Pill */}
          <div className="mt-5 pt-4 border-t border-gold/20 text-center space-y-2">
            <span className="text-[10px] text-[#F5F2EB]/60 block font-semibold">
              Want to see how client portal looks?
            </span>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-xs text-gold font-bold underline tracking-wider hover:text-white transition-colors"
            >
              ✨ EXPLORE CLIENT PORTAL AS DEMO COUPLE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
