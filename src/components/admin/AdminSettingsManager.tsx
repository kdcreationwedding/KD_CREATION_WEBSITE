import React, { useState } from 'react';
import { Settings, Phone, MessageSquare, Mail, MapPin, Globe, Check } from 'lucide-react';
import { cmsService, SiteSettings } from '../../services/cmsService';

export const AdminSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => cmsService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    alert('✓ Studio & Contact Settings saved successfully!');
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

        <div className="flex justify-end pt-4 border-t border-gold/20">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg"
          >
            SAVE SITE BACKEND SETTINGS
          </button>
        </div>
      </form>
    </div>
  );
};
