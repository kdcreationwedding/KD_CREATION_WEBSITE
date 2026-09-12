import React, { useState } from 'react';
import { Settings, Phone, MessageSquare, Mail, MapPin, Globe, Check, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { cmsService, SiteSettings } from '../../services/cmsService';
import { r2Service, R2Config } from '../../services/r2Client';

export const AdminSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => cmsService.getSettings());
  const [r2Config, setR2Config] = useState<R2Config>(() => r2Service.getConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isTestingR2, setIsTestingR2] = useState(false);
  const [r2TestMessage, setR2TestMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.saveSettings(settings);
    r2Service.saveConfig(r2Config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    alert('✓ Studio, Contact & Cloudflare R2 Settings saved successfully!');
  };

  const handleTestR2 = async () => {
    setIsTestingR2(true);
    setR2TestMessage(null);
    r2Service.saveConfig(r2Config); // save current inputs first
    const result = await r2Service.testConnection();
    setIsTestingR2(false);
    setR2TestMessage(result.message);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 text-[#F5F2EB]">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gold/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold uppercase tracking-wider">
            <Settings className="w-4 h-4" /> STUDIO BACKEND CONFIG & CONTACTS
          </div>
          <h3 className="text-2xl font-serif-luxury font-bold text-white">
            WEBSITE CONTACT & BRANDING CONTROL
          </h3>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4" /> SETTINGS SAVED!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-[#1C0307] border border-gold/40 rounded-2xl p-6 space-y-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-mono text-gold uppercase block mb-1 font-bold">
              STUDIO PHONE NUMBER
            </label>
            <div className="relative">
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono font-bold"
                required
              />
              <Phone className="w-4 h-4 text-gold/60 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gold uppercase block mb-1 font-bold">
              WHATSAPP NUMBER (10 DIGITS)
            </label>
            <div className="relative">
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono font-bold"
                required
              />
              <MessageSquare className="w-4 h-4 text-gold/60 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gold uppercase block mb-1 font-bold">
              STUDIO EMAIL ADDRESS
            </label>
            <div className="relative">
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono font-bold"
                required
              />
              <Mail className="w-4 h-4 text-gold/60 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gold uppercase block mb-1 font-bold">
              INSTAGRAM PROFILE URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono font-bold"
              />
              <Globe className="w-4 h-4 text-gold/60 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-gold uppercase block mb-1 font-bold">
            REGIONAL COVERAGE & LOCATION FOOTER BAR
          </label>
          <div className="relative">
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono font-bold"
            />
            <MapPin className="w-4 h-4 text-gold/60 absolute left-3.5 top-3" />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-gold uppercase block mb-1 font-bold">
            HERO SLOGAN & BRAND TAGLINE
          </label>
          <textarea
            rows={2}
            value={settings.heroTagline}
            onChange={(e) => setSettings({ ...settings, heroTagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono font-bold"
          />
        </div>

        {/* Supabase 24/7 Cloud Database & Storage Config */}
        <div className="p-5 rounded-xl bg-[#3B0811] border border-gold/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-gold uppercase flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold" /> SUPABASE 24/7 CLOUD DATABASE & ASSET STORAGE
            </span>
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600 font-bold uppercase">
              READY FOR PRODUCTION
            </span>
          </div>

          <p className="text-xs font-mono text-[#F5F2EB]/70">
            Supabase provides 24/7 persistent PostgreSQL database storage and infinite multi-GB photo CDN hosting.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-gold uppercase block mb-1 font-bold">
                SUPABASE PROJECT URL (VITE_SUPABASE_URL)
              </label>
              <input
                type="text"
                value={(settings as any).supabaseUrl || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setSettings({ ...settings, supabaseUrl: val } as any);
                  if (typeof window !== 'undefined') (window as any).SUPABASE_URL = val;
                }}
                placeholder="https://xyz.supabase.co"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C0307] border border-gold/30 text-gold text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-gold uppercase block mb-1 font-bold">
                SUPABASE ANON KEY (VITE_SUPABASE_ANON_KEY)
              </label>
              <input
                type="password"
                value={(settings as any).supabaseAnonKey || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setSettings({ ...settings, supabaseAnonKey: val } as any);
                  if (typeof window !== 'undefined') (window as any).SUPABASE_ANON_KEY = val;
                }}
                placeholder="eyJhbGciOiJIUzI1NiIsInR..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C0307] border border-gold/30 text-gold text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* 3. Cloudflare R2 Object Storage & CDN Configuration */}
        <div className="bg-[#2B050B] border border-amber-500/50 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gold/20">
            <div>
              <span className="text-[10px] tracking-widest font-mono text-amber-400 uppercase font-extrabold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                CLOUDFLARE R2 OBJECT STORAGE (ZERO EGRESS & GLOBAL CDN)
              </span>
              <h4 className="text-base font-serif-luxury font-bold text-[#F5F2EB]">
                DIGITAL PHOTOBOOK MEDIA HOSTING
              </h4>
            </div>

            {r2Service.isConfigured() ? (
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-[10px] font-mono font-bold inline-flex items-center gap-1 self-start">
                <Check className="w-3 h-3" /> R2 ACTIVE
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 text-[10px] font-mono font-bold inline-flex items-center gap-1 self-start">
                <AlertCircle className="w-3 h-3" /> NOT CONFIGURED
              </span>
            )}
          </div>

          <p className="text-xs font-mono text-[#F5F2EB]/80 leading-relaxed">
            Cloudflare R2 provides 10GB free lifetime storage with <strong className="text-gold">0 bandwidth/egress fees</strong>. All uploaded photobook spreads are delivered globally through Cloudflare's ultra-fast CDN without lag or quality loss.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-gold uppercase block mb-1 font-bold">
                CLOUDFLARE ACCOUNT ID *
              </label>
              <input
                type="text"
                value={r2Config.accountId}
                onChange={(e) => setR2Config({ ...r2Config, accountId: e.target.value.trim() })}
                placeholder="e.g. 5f8a123bc456..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C0307] border border-gold/30 text-gold text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-gold uppercase block mb-1 font-bold">
                R2 BUCKET NAME *
              </label>
              <input
                type="text"
                value={r2Config.bucketName}
                onChange={(e) => setR2Config({ ...r2Config, bucketName: e.target.value.trim() })}
                placeholder="kd-creation-albums"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C0307] border border-gold/30 text-gold text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-gold uppercase block mb-1 font-bold">
                R2 ACCESS KEY ID *
              </label>
              <input
                type="text"
                value={r2Config.accessKeyId}
                onChange={(e) => setR2Config({ ...r2Config, accessKeyId: e.target.value.trim() })}
                placeholder="e.g. 78f9a0b1c2..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C0307] border border-gold/30 text-gold text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-gold uppercase block mb-1 font-bold">
                R2 SECRET ACCESS KEY *
              </label>
              <input
                type="password"
                value={r2Config.secretAccessKey}
                onChange={(e) => setR2Config({ ...r2Config, secretAccessKey: e.target.value.trim() })}
                placeholder="e.g. 91a8b7c6d5..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C0307] border border-gold/30 text-gold text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] font-mono text-gold uppercase block mb-1 font-bold">
                PUBLIC DOMAIN / R2.DEV CDN URL (FOR DIRECT VIEWING)
              </label>
              <input
                type="text"
                value={r2Config.publicDomain}
                onChange={(e) => setR2Config({ ...r2Config, publicDomain: e.target.value.trim() })}
                placeholder="e.g. https://pub-xxxxxx.r2.dev or https://albums.kdcreations.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C0307] border border-gold/30 text-gold text-xs font-mono"
              />
              <span className="text-[9.5px] font-mono text-[#F5F2EB]/60 block mt-1">
                Enable "Public R2.dev access" or connect a custom domain in your Cloudflare R2 bucket settings.
              </span>
            </div>
          </div>

          {/* Test & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-gold/20">
            <button
              type="button"
              onClick={handleTestR2}
              disabled={isTestingR2}
              className="px-4 py-2 rounded-xl bg-[#3B0811] border border-gold/40 text-gold hover:bg-gold hover:text-black transition-colors text-xs font-mono font-bold flex items-center gap-2"
            >
              {isTestingR2 ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>TESTING R2 CONNECTION...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TEST R2 CONNECTION</span>
                </>
              )}
            </button>

            {r2TestMessage && (
              <div className="text-xs font-mono text-gold/90 bg-black/40 px-3 py-1.5 rounded-lg border border-gold/20 flex-1">
                {r2TestMessage}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gold/20">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg active:scale-95 transition-transform"
          >
            SAVE SITE & R2 BACKEND SETTINGS
          </button>
        </div>
      </form>
    </div>
  );
};
