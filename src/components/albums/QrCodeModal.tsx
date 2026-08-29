import React, { useState, useRef } from 'react';
import { X, Download, Copy, Share2, Check, QrCode, Printer } from 'lucide-react';
import { DigitalAlbum } from '../../types/album';
import { albumService } from '../../services/albumService';
import { getAssetPath } from '../../utils/assetHelper';
import { SITE_CONFIG } from '../../config/siteConfig';

interface QrCodeModalProps {
  album: DigitalAlbum;
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ album, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const shareableUrl = albumService.getShareableUrl(album.slug);
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareableUrl)}&color=d4af37&bgcolor=1c0307`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPng = async () => {
    try {
      const response = await fetch(qrApiUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `KD-Creation-QR-${album.slug}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to download QR image', e);
      window.open(qrApiUrl, '_blank');
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  const whatsappMsg = `Explore the official digital wedding photobook of ${album.couple} by KD CREATION:\n${shareableUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#1C0307] border border-gold/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#F5F2EB] my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-obsidian transition-all"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5" /> DIGITAL WEDDING ALBUM QR CODE
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-gold">
            {album.couple}
          </h3>
          <p className="text-xs text-[#F5F2EB]/70 font-mono">
            {album.location} • {album.date}
          </p>
        </div>

        {/* Luxury Printable Card View (Target for Print & Download) */}
        <div
          ref={printableRef}
          className="printable-card border border-gold/40 rounded-xl p-6 bg-gradient-to-b from-[#2A050A] to-[#1C0307] text-center space-y-5 shadow-inner"
        >
          {/* Logo & Brand Heading */}
          <div className="space-y-1">
            <img
              src={getAssetPath(SITE_CONFIG.brand.officialLogo)}
              alt="KD CREATION Logo"
              className="h-10 mx-auto object-contain"
            />
            <p className="text-[10px] tracking-[0.3em] font-mono text-gold/80 uppercase font-extrabold">
              LUXURY WEDDING PHOTOGRAPHY & CINEMATOGRAPHY
            </p>
          </div>

          {/* QR Code Graphic Box */}
          <div className="relative inline-block p-4 rounded-xl border border-gold/50 bg-[#1C0307] shadow-xl">
            <img
              src={qrApiUrl}
              alt={`QR Code for ${album.couple} Wedding Album`}
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-lg"
            />
          </div>

          {/* Printable Callout */}
          <div className="space-y-1">
            <p className="text-xs font-serif-luxury font-bold text-gold tracking-widest uppercase">
              SCAN TO VIEW COMPLETE DIGITAL WEDDING PHOTOBOOK
            </p>
            <p className="text-[11px] font-mono text-[#F5F2EB]/60">
              {shareableUrl}
            </p>
          </div>

          <div className="pt-2 border-t border-gold/20 flex justify-between items-center text-[10px] font-mono text-gold/70">
            <span>STUDIO: +91 9033032922</span>
            <span>AHMEDABAD, GUJARAT</span>
          </div>
        </div>

        {/* Quick Action Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6">
          <button
            onClick={handleDownloadPng}
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs hover:brightness-110 transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD PNG</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#3B0811] border border-gold/40 text-gold font-bold text-xs hover:bg-gold hover:text-obsidian transition-all shadow-md"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED!' : 'COPY LINK'}</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WHATSAPP</span>
          </a>

          <button
            onClick={handlePrintCard}
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#3B0811] border border-gold/40 text-gold font-bold text-xs hover:bg-gold hover:text-obsidian transition-all shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT CARD</span>
          </button>
        </div>

      </div>
    </div>
  );
};
