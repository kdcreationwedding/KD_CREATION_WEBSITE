import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, ArrowRight, ArrowUpRight, ShieldCheck, X, Eye, EyeOff } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Valid Passcodes: "KD2026", "7859894521", "admin"
    const validPasscodes = ['KD2026', '7859894521', '917859894521', 'admin'];
    
    if (validPasscodes.includes(passcode.trim())) {
      setError(false);
      setPasscode('');
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md liquid-glass-panel rounded-3xl p-8 border border-gold/40 shadow-2xl bg-[#3B0811] text-[#F5F2EB]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gold hover:text-white rounded-full bg-gold/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Monogram */}
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 rounded-2xl border border-gold/40 bg-[#2B050B] p-2 mx-auto shadow-xl flex items-center justify-center">
              <img
                src={SITE_CONFIG.brand.officialLogo}
                alt="KD CREATION Official Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div>
              <span className="text-[10px] tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase block mb-1">
                STUDIO VAULT SECURITY
              </span>
              <h2 className="text-2xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                ADMIN LOGIN
              </h2>
              <p className="text-xs text-[#F5F2EB]/70 font-semibold mt-1">
                Enter your studio admin passcode to view client inquiries & leads.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-gold" />
                  ADMIN PASSCODE
                </span>
                <span className="text-[9px] text-[#F5F2EB]/50 font-mono">
                  Default: KD2026
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  required
                  placeholder="Enter passcode (e.g. KD2026)"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError(false);
                  }}
                  className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 pr-12 text-sm text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold transition-colors shadow-inner"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/70 hover:text-gold transition-colors p-1"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-rose-400 font-semibold pt-1 flex items-center gap-1">
                  <span>⚠️ Incorrect passcode. Try using <strong>KD2026</strong> or <strong>7859894521</strong>.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-xs tracking-[0.2em] font-extrabold text-obsidian bg-gold-gradient py-4 rounded-xl shadow-2xl hover:brightness-110 transition-all active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>UNLOCK ADMIN PORTAL</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Passcode Helper */}
          <div className="mt-6 pt-4 border-t border-gold/20 text-center">
            <button
              type="button"
              onClick={() => {
                setPasscode('KD2026');
                setError(false);
              }}
              className="text-[11px] text-gold font-mono font-bold hover:underline"
            >
              Autofill Passcode: KD2026
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
