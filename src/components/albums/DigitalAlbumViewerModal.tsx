import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut,
  Volume2, VolumeX, QrCode, Share2, Lock, Key, RotateCcw, BookOpen, Layers
} from 'lucide-react';
import { DigitalAlbum } from '../../types/album';
import { getAssetPath } from '../../utils/assetHelper';
import { SITE_CONFIG } from '../../config/siteConfig';

interface DigitalAlbumViewerModalProps {
  album: DigitalAlbum | null;
  isOpen: boolean;
  isQrAccess?: boolean;
  onClose: () => void;
  onOpenQrCode?: (album: DigitalAlbum) => void;
}

export const DigitalAlbumViewerModal: React.FC<DigitalAlbumViewerModalProps> = ({
  album,
  isOpen,
  isQrAccess,
  onClose,
  onOpenQrCode
}) => {
  // Viewer View States: 'cover' | 'password' | 'book' | 'end'
  const [viewMode, setViewMode] = useState<'cover' | 'password' | 'book' | 'end'>('cover');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Page Index State (0-indexed)
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [watermarkOn, setWatermarkOn] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  // Touch Swipe Refs
  const touchStartX = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Helper to safely parse pages array from any format (Array, JSON string, or nested string)
  const getParsedPages = (rawPages: any): string[] => {
    if (!rawPages) return [];
    if (Array.isArray(rawPages)) {
      return rawPages.map((p) => (typeof p === 'string' ? p : String(p))).filter(Boolean);
    }
    if (typeof rawPages === 'string') {
      try {
        const parsed = JSON.parse(rawPages);
        if (Array.isArray(parsed)) {
          return parsed.map((p) => (typeof p === 'string' ? p : String(p))).filter(Boolean);
        }
        if (typeof parsed === 'string') {
          const doubleParsed = JSON.parse(parsed);
          if (Array.isArray(doubleParsed)) {
            return doubleParsed.map((p) => (typeof p === 'string' ? p : String(p))).filter(Boolean);
          }
        }
      } catch {
        if (rawPages.startsWith('http') || rawPages.startsWith('/') || rawPages.startsWith('data:')) {
          return [rawPages];
        }
      }
    }
    return [];
  };

  useEffect(() => {
    if (isOpen && album) {
      setCurrentPageIndex(0);
      setZoomLevel(1);
      const isQrAccess =
        window.location.hash.includes(album.slug) ||
        window.location.search.includes('qr=true') ||
        window.location.search.includes('access=qr') ||
        window.location.search.includes('album=') ||
        window.location.search.includes('album_id=');

      if (isQrAccess || !album.isPrivate) {
        setViewMode('book');
      } else {
        setViewMode('password');
      }
    }
  }, [isOpen, album]);

  // Keyboard Arrow Navigation listener
  useEffect(() => {
    if (!isOpen || viewMode !== 'book') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, viewMode, currentPageIndex, album]);

  if (!isOpen || !album) return null;

  const pages = getParsedPages(album.pages);
  const totalPages = pages.length;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (album.password && enteredPassword === album.password) {
      setPasswordError('');
      setViewMode('cover');
    } else {
      setPasswordError('Invalid album password. Please try again.');
    }
  };

  const handleNextPage = () => {
    setFlipDirection('next');
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    } else {
      setViewMode('end');
    }
  };

  const handlePrevPage = () => {
    setFlipDirection('prev');
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleJumpToPage = (index: number) => {
    setFlipDirection(index > currentPageIndex ? 'next' : 'prev');
    setCurrentPageIndex(index);
    if (viewMode !== 'book') setViewMode('book');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNextPage();
    } else if (diff < -50) {
      handlePrevPage();
    }
    touchStartX.current = null;
  };

  const handleShare = () => {
    const shareableUrl = `${window.location.origin}/#album-${album.slug}`;
    if (navigator.share) {
      navigator.share({
        title: `${album.couple} Wedding Album | KD CREATION`,
        text: `View the official luxury digital wedding photobook of ${album.couple} by KD CREATION`,
        url: shareableUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareableUrl);
      alert('Album share link copied to clipboard!');
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] bg-[#0A0103] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Audio */}
      {album.backgroundMusic && (
        <audio ref={audioRef} src={album.backgroundMusic} loop muted={isMuted} />
      )}

      {/* TOP HEADER TOOLBAR */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3 bg-[#1C0307]/90 border-b border-gold/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src={getAssetPath(SITE_CONFIG.brand.officialLogo)}
            alt="KD CREATION Logo"
            className="h-7 sm:h-8 object-contain"
          />
          <div className="hidden md:block text-left border-l border-gold/30 pl-3">
            <span className="text-xs font-serif-luxury font-bold text-gold block">
              {album.couple}
            </span>
            <span className="text-[10px] font-mono text-[#F5F2EB]/60 block">
              {album.location} • {album.date}
            </span>
          </div>
        </div>

        {/* Counter & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {viewMode === 'book' && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>PAGE {currentPageIndex + 1} OF {totalPages}</span>
            </div>
          )}

          {/* Controls Bar */}
          {viewMode === 'book' && (
            <div className="flex items-center gap-1 bg-[#3B0811] border border-gold/30 rounded-xl p-1">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                className="p-1.5 rounded-lg text-gold hover:bg-gold hover:text-obsidian transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1))}
                className="p-1.5 rounded-lg text-gold hover:bg-gold hover:text-obsidian transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowThumbnails((prev) => !prev)}
                className={`p-1.5 rounded-lg transition-colors ${showThumbnails ? 'bg-gold text-obsidian' : 'text-gold hover:bg-gold/20'}`}
                title="Toggle Pages Drawer"
              >
                <Layers className="w-4 h-4" />
              </button>
              {album.backgroundMusic && (
                <button
                  onClick={() => setIsMuted((m) => !m)}
                  className="p-1.5 rounded-lg text-gold hover:bg-gold hover:text-obsidian transition-colors"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}
            </div>
          )}

          {/* Share & QR Code Controls */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-[#3B0811] border border-gold/30 text-gold hover:bg-gold hover:text-obsidian transition-all"
            title="Share Album"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {onOpenQrCode && (
            <button
              onClick={() => onOpenQrCode(album)}
              className="p-2 rounded-xl bg-[#3B0811] border border-gold/30 text-gold hover:bg-gold hover:text-obsidian transition-all"
              title="Generate QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#3B0811] border border-gold/30 text-gold hover:bg-gold hover:text-obsidian transition-all hidden sm:flex"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gold/20 text-gold hover:bg-gold hover:text-obsidian transition-all"
            aria-label="Close Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT STAGE */}
      <div
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* 1. PRIVATE PASSWORD LOCK SCREEN */}
        {viewMode === 'password' && (
          <div className="w-full max-w-md bg-[#1C0307] border border-gold/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto text-gold">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif-luxury font-bold text-gold">
                PRIVATE WEDDING PHOTOBOOK
              </h3>
              <p className="text-xs text-[#F5F2EB]/70 font-mono">
                This digital album is password protected for family & guests.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  placeholder="Enter Album Password..."
                  className="w-full px-4 py-3 rounded-xl bg-[#3B0811] border border-gold/40 text-gold placeholder-gold/40 focus:outline-none focus:border-gold font-mono text-sm text-center"
                  required
                />
                <Key className="w-4 h-4 text-gold/50 absolute right-4 top-3.5" />
              </div>
              {passwordError && (
                <p className="text-xs text-rose-400 font-mono">{passwordError}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
              >
                UNLOCK DIGITAL PHOTOBOOK
              </button>
            </form>
          </div>
        )}

        {/* 2. CINEMATIC COVER SCREEN */}
        {viewMode === 'cover' && (
          <div className="relative w-full max-w-3xl aspect-[16/10] bg-[#1C0307] border border-gold/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between p-8 sm:p-12 text-center text-[#F5F2EB] group">
            {/* Background Cover Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={getAssetPath(album.coverImage || (album.pages && album.pages[0]) || '')}
                alt={album.couple}
                className="w-full h-full object-cover brightness-[0.35] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0307] via-transparent to-[#1C0307]/80" />
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] tracking-[0.4em] font-mono text-gold uppercase font-extrabold block">
                KD CREATIONS LUXURY HEIRLOOM PHOTOBOOK
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-wide">
                {album.couple}
              </h2>
              {album.subtitle && (
                <p className="text-xs sm:text-sm font-serif-luxury italic text-gold/90">
                  "{album.subtitle}"
                </p>
              )}
            </div>

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/60 border border-gold/30 text-gold text-xs font-mono">
                <span>{album.location}</span>
                <span>•</span>
                <span>{album.date}</span>
              </div>

              <div>
                <button
                  onClick={() => setViewMode('book')}
                  className="px-8 py-4 rounded-full bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl border border-gold/50"
                >
                  OPEN DIGITAL PHOTOBOOK ➔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. 3D REALISTIC PHOTOBOOK SPREAD STAGE */}
        {viewMode === 'book' && (
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Desktop 2-Page Spread View */}
            <div
              className="relative transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <div className="relative flex items-center justify-center shadow-2xl border border-gold/30 rounded-xl overflow-hidden bg-[#1C0307]">

                {/* Left Page (Desktop 2-Page Spread) */}
                <div className="hidden lg:block relative w-[480px] h-[640px] border-r border-black/60 bg-[#140205] overflow-hidden">
                  {currentPageIndex > 0 && pages[currentPageIndex - 1] ? (
                    <img
                      src={getAssetPath(pages[currentPageIndex - 1])}
                      alt={`Page ${currentPageIndex}`}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#1C0307] text-gold/40 border-r border-gold/10">
                      <BookOpen className="w-12 h-12 mb-3" />
                      <p className="font-serif-luxury text-sm uppercase">INSIDE COVER</p>
                    </div>
                  )}
                  {/* Spine Crease Shadow Overlay */}
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
                </div>

                {/* Right / Main Active Page (Mobile 1-Page & Desktop Right Page) */}
                <div
                  className="relative w-[340px] sm:w-[480px] h-[520px] sm:h-[640px] bg-[#140205] overflow-hidden flex items-center justify-center"
                  style={{ perspective: 1200 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPageIndex}
                      initial={{ opacity: 0.2, rotateY: flipDirection === 'next' ? 75 : -75, scale: 0.95 }}
                      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                      exit={{ opacity: 0.2, rotateY: flipDirection === 'next' ? -75 : 75, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="w-full h-full relative flex items-center justify-center"
                      style={{ transformOrigin: flipDirection === 'next' ? 'left center' : 'right center' }}
                    >
                      {pages[currentPageIndex] ? (
                        <img
                          src={getAssetPath(pages[currentPageIndex])}
                          alt={`Page ${currentPageIndex + 1}`}
                          className="w-full h-full object-contain p-2 shadow-2xl"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-gold/60">
                          <BookOpen className="w-10 h-10 mb-2 opacity-50" />
                          <p className="font-mono text-xs uppercase">No Page Loaded</p>
                        </div>
                      )}
                      {/* Dynamic Paper Turn Shadow Overlay */}
                      <motion.div
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Spine Crease Shadow Overlay */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 to-transparent pointer-events-none hidden lg:block" />

                  {/* Watermark Overlay */}
                  {watermarkOn && (
                    <div className="absolute bottom-4 right-4 pointer-events-none opacity-40 text-right">
                      <p className="text-[9px] font-mono tracking-widest text-gold uppercase font-bold">
                        KD CREATIONS
                      </p>
                      <p className="text-[7px] font-mono text-white/70">
                        LUXURY HEIRLOOM PHOTOBOOK
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Desktop Navigation Side Controls */}
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-[#1C0307]/80 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xl"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextPage}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-[#1C0307]/80 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian transition-all shadow-xl"
              aria-label="Next Page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>
        )}

        {/* 4. CINEMATIC END SCREEN */}
        {viewMode === 'end' && (
          <div className="w-full max-w-xl bg-[#1C0307] border border-gold/40 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in text-[#F5F2EB]">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto text-gold">
              <BookOpen className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] font-mono text-gold/80 uppercase block font-bold">
                END OF PHOTOBOOK
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-gold">
                THANK YOU FOR BEING PART OF THEIR STORY
              </h3>
              <p className="text-xs font-serif-luxury italic text-[#F5F2EB]/70">
                Captured with timeless artistry by KD CREATIONS
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => {
                  setCurrentPageIndex(0);
                  setViewMode('book');
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REPLAY PHOTOBOOK</span>
              </button>

              {onOpenQrCode && (
                <button
                  onClick={() => onOpenQrCode(album)}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#3B0811] border border-gold/40 text-gold font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all"
                >
                  <QrCode className="w-4 h-4" />
                  <span>SHOW QR CODE</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM THUMBNAIL DRAWER */}
      {viewMode === 'book' && showThumbnails && (
        <div className="relative z-30 bg-[#1C0307]/95 border-t border-gold/30 p-3 flex items-center gap-3 overflow-x-auto max-h-28 backdrop-blur-md">
          {pages.map((pageUrl, idx) => (
            <button
              key={idx}
              onClick={() => handleJumpToPage(idx)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === currentPageIndex ? 'border-gold scale-105 shadow-md' : 'border-gold/20 opacity-60 hover:opacity-100'}`}
            >
              <img
                src={getAssetPath(pageUrl)}
                alt={`Thumb ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-gold text-center">
                {idx + 1}
              </span>
            </button>
          ))}
        </div>
      )}

    </div>
  );
};
