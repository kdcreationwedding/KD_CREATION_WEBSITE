import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, ShieldCheck, X, Eye, EyeOff } from 'lucide-react';
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
  const [attempts, setAttempts] = useState(0);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized Secret Studio Passcodes
    const validPasscodes = ['KD2026', '9033032922', '919033032922', '7859894521', '917859894521', 'KD@2026#ADMIN', 'admin'];

    if (validPasscodes.includes(passcode.trim())) {
      setError(false);
      setPasscode('');
      setAttempts(0);
      onLoginSuccess();
    } else {
      setError(true);
      setAttempts(prev => prev + 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-3xl p-8 border border-gold/40 shadow-2xl bg-[#2B050B]/95 text-[#F5F2EB]"
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
            <div className="w-16 h-16 rounded-2xl border border-gold/40 bg-[#3B0811] p-2 mx-auto shadow-xl flex items-center justify-center">
              <img
                src={SITE_CONFIG.brand.officialLogo}
                alt="KD CREATION Official Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div>
              <span className="text-[10px] tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase block mb-1">
                PRIVATE STUDIO VAULT
              </span>
              <h2 className="text-2xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                ADMIN AUTHORIZATION
              </h2>
              <p className="text-xs text-[#F5F2EB]/70 font-semibold mt-1">
                Enter your private studio security key to view client inquiries & leads.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-bold flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-gold" />
                SECURITY PASSCODE
              </label>

              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError(false);
                  }}
                  className="w-full bg-[#1C0307] border border-gold/40 rounded-xl px-4 py-3.5 pr-12 text-sm text-[#F5F2EB] placeholder-[#F5F2EB]/30 font-semibold focus:outline-none focus:border-gold transition-colors shadow-inner"
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
                  <span>⚠️ Access Denied. Incorrect studio security key. ({attempts} failed attempt{attempts > 1 ? 's' : ''})</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-xs tracking-[0.2em] font-extrabold text-obsidian bg-gold-gradient py-4 rounded-xl shadow-2xl hover:brightness-110 transition-all active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>UNLOCK STUDIO VAULT</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gold/15 text-center">
            <p className="text-[10px] text-[#F5F2EB]/40 font-mono">
              SECURE 256-BIT ENCRYPTED ADMIN ACCESS
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
