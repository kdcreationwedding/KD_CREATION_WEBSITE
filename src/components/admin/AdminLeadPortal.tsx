import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Download, Trash2, MessageCircle, Phone, Mail, User, Calendar, MapPin, Sparkles, Filter, Lock } from 'lucide-react';
import { Lead } from '../../types';
import { DigitalAlbum } from '../../types/album';
import { LeadService } from '../../services/leadService';
import { SITE_CONFIG } from '../../config/siteConfig';
import { AdminAlbumManager } from './AdminAlbumManager';

interface AdminLeadPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onOpenQrCode?: (album: DigitalAlbum) => void;
}

export const AdminLeadPortal: React.FC<AdminLeadPortalProps> = ({ isOpen, onClose, onLogout, onOpenQrCode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterScore, setFilterScore] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'leads' | 'albums'>('leads');

  useEffect(() => {
    if (isOpen) {
      const stored = LeadService.getStoredLeads();
      setLeads(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    if (filterScore === 'ALL') return true;
    return lead.leadScore === filterScore;
  });

  const hotCount = leads.filter((l) => l.leadScore === 'HOT').length;
  const warmCount = leads.filter((l) => l.leadScore === 'WARM').length;
  const coldCount = leads.filter((l) => l.leadScore === 'COLD').length;

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Wedding Date', 'Location', 'Guest Count', 'Budget', 'Score', 'Source', 'Created At'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.weddingDate}"`,
      `"${l.weddingLocation}"`,
      `"${l.guestCount}"`,
      `"${l.budget}"`,
      l.leadScore,
      l.leadSource,
      new Date(l.createdDate).toLocaleString()
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `KD_CREATION_LEADS_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLeads = () => {
    if (window.confirm('Are you sure you want to clear all stored leads?')) {
      LeadService.clearStoredLeads();
      setLeads([]);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl liquid-glass-panel rounded-3xl overflow-hidden shadow-2xl bg-[#3B0811] border border-gold/40 text-[#F5F2EB] my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#2B050B] border-b border-gold/30 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient text-obsidian flex items-center justify-center font-bold shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase block">
                  KD CREATION STUDIO VAULT
                </span>
                <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                  STUDIO MANAGEMENT VAULT
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                disabled={leads.length === 0}
                className="hidden sm:inline-flex items-center gap-2 text-xs tracking-wider font-extrabold text-obsidian bg-gold-gradient px-4 py-2.5 rounded-full hover:brightness-110 disabled:opacity-50 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT CSV</span>
              </button>

              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 text-xs tracking-wider font-extrabold text-rose-300 bg-rose-950/80 border border-rose-500/40 px-3.5 py-2 rounded-full hover:bg-rose-900 transition-all shadow-md"
                title="Lock Vault & Require Password Again"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>LOCK VAULT</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-gold hover:text-white rounded-full bg-gold/10 hover:bg-gold/20 transition-all border border-gold/30"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Admin Vault Tab Navigation */}
          <div className="bg-[#230409] border-b border-gold/25 px-6 py-2 flex items-center gap-4">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${activeTab === 'leads' ? 'bg-gold-gradient text-obsidian shadow-md' : 'text-gold/70 hover:text-gold'}`}
            >
              CLIENT LEADS ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('albums')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${activeTab === 'albums' ? 'bg-gold-gradient text-obsidian shadow-md' : 'text-gold/70 hover:text-gold'}`}
            >
              DIGITAL WEDDING PHOTOBOOKS
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'albums' ? (
            <div className="flex-1 overflow-y-auto">
              <AdminAlbumManager onOpenQrCode={onOpenQrCode || (() => {})} />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto flex flex-col">
              {/* Lead Metrics & Filters */}
              <div className="p-6 bg-[#3B0811]/90 border-b border-gold/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-6 text-xs">
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#2B050B] border border-gold/30">
                    <span className="text-[#F5F2EB]/70 font-semibold block text-[10px]">TOTAL LEADS</span>
                    <span className="text-lg font-bold text-gold font-mono">{leads.length}</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#2B050B] border border-emerald-500/30">
                    <span className="text-emerald-400 font-semibold block text-[10px]">🔥 HOT LEADS</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">{hotCount}</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#2B050B] border border-amber-500/30">
                    <span className="text-amber-400 font-semibold block text-[10px]">⚡ WARM LEADS</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">{warmCount}</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#2B050B] border border-blue-500/30">
                    <span className="text-blue-400 font-semibold block text-[10px]">❄️ COLD LEADS</span>
                    <span className="text-lg font-bold text-blue-400 font-mono">{coldCount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gold" />
                  {['ALL', 'HOT', 'WARM', 'COLD'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterScore(s)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase transition-all ${
                        filterScore === s
                          ? 'bg-gold-gradient text-obsidian shadow-md'
                          : 'bg-[#2B050B] text-gold/70 border border-gold/20 hover:border-gold'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads List Grid */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Flame className="w-12 h-12 text-gold/30 mx-auto" />
                    <p className="text-base font-serif-luxury text-gold">NO CLIENT INQUIRIES FOUND</p>
                    <p className="text-xs text-[#F5F2EB]/60 max-w-sm mx-auto">
                      Submissions from the lead booking form will automatically populate in this vault.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-5 rounded-2xl bg-[#2B050B] border border-gold/30 space-y-4 hover:border-gold transition-all shadow-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-gold/70 block">
                              ID: {lead.id.slice(0, 8)} • {new Date(lead.createdDate).toLocaleDateString()}
                            </span>
                            <h4 className="text-lg font-serif-luxury font-bold text-white flex items-center gap-2">
                              <User className="w-4 h-4 text-gold" />
                              {lead.name}
                            </h4>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase ${
                              lead.leadScore === 'HOT'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                : lead.leadScore === 'WARM'
                                ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                                : 'bg-blue-950 text-blue-400 border border-blue-500/40'
                            }`}
                          >
                            {lead.leadScore} SCORE
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#F5F2EB]/80">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gold" />
                            <span>{lead.weddingDate || 'TBD'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gold" />
                            <span className="truncate">{lead.weddingLocation || 'Ahmedabad'}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-xs font-mono">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{lead.phone}</span>
                          </a>

                          <a
                            href={`mailto:${lead.email}`}
                            className="text-gold hover:text-white font-bold flex items-center gap-1 truncate max-w-[180px]"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span className="truncate">{lead.email}</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Footer Actions */}
              <div className="p-4 bg-[#2B050B] border-t border-gold/30 flex items-center justify-between">
                <span className="text-[10px] text-[#F5F2EB]/60 font-mono">
                  Press <strong>Ctrl + Shift + A</strong> anytime to toggle Admin Vault.
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClearLeads}
                    disabled={leads.length === 0}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 hover:border-rose-500 transition-all disabled:opacity-40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>CLEAR LEADS</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="text-xs tracking-widest font-bold text-obsidian bg-gold-gradient px-6 py-2 rounded-full hover:brightness-110 transition-all"
                  >
                    CLOSE VAULT
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
