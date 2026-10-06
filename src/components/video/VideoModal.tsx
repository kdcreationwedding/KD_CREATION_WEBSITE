import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, Play, MessageCircle, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

const getYouTubeId = (url: string): string | null => {
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoUrl, title, onClose }) => {
  const [activeUrl, setActiveUrl] = useState(videoUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setActiveUrl(videoUrl);
    setIsLoading(true);
    setHasError(false);
  }, [videoUrl]);

  if (!isOpen) return null;

  const ytId = getYouTubeId(activeUrl);
  const isYouTube = !!ytId;
  const embedSrc = isYouTube
    ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`
    : activeUrl;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 md:p-10">
        {/* Click outside to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-6xl rounded-3xl overflow-hidden bg-[#2B050B] border border-gold/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-[#3B0811] border-b border-gold/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/15 text-gold border border-gold/30 flex items-center justify-center">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] tracking-[0.2em] font-serif-luxury font-extrabold text-gold uppercase block">
                  KD CREATION 4K CINEMA CINEMATOGRAPHY
                </span>
                <h3 className="text-sm sm:text-base font-serif-luxury font-bold text-[#F5F2EB] uppercase truncate max-w-xs sm:max-w-md">
                  {title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gold hover:text-white rounded-full bg-gold/10 hover:bg-gold/20 transition-all border border-gold/30"
              aria-label="Close Video Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
            {isYouTube ? (
              <iframe
                key={embedSrc}
                src={embedSrc}
                title={title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                {isLoading && !hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-gold pointer-events-none">
                    <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-3" />
                    <span className="text-xs font-serif-luxury tracking-widest uppercase">
                      STREAMING 4K CINEMA MASTER...
                    </span>
                  </div>
                )}

                {hasError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1C0307] p-6 text-center z-20">
                    <Film className="w-12 h-12 text-gold mb-3 opacity-80" />
                    <h4 className="text-base font-serif-luxury font-bold text-[#F5F2EB] mb-1">
                      {title}
                    </h4>
                    <p className="text-xs text-[#F5F2EB]/70 max-w-md mb-6 leading-relaxed">
                      This 4K Master film is synchronizing on our Cloud CDN archive. You can stream it directly or request the master copy via WhatsApp.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={activeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gold-gradient text-obsidian text-xs font-serif-luxury font-bold tracking-wider uppercase hover:brightness-110 shadow-lg shadow-gold/20"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Direct Stream</span>
                      </a>
                      <a
                        href={`https://wa.me/919033032922?text=${encodeURIComponent(`Hi KD Creation, I would like to watch the full 4K film: ${title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gold/40 text-gold text-xs font-serif-luxury font-bold tracking-wider uppercase hover:bg-gold/10"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Watch on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <video
                    key={activeUrl}
                    src={activeUrl}
                    autoPlay
                    playsInline
                    controls
                    onWaiting={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                    onLoadedData={() => setIsLoading(false)}
                    onPlaying={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setHasError(true);
                    }}
                    className="w-full h-full object-contain bg-black"
                  />
                )}
              </>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 bg-[#3B0811] border-t border-gold/30 flex items-center justify-between">
            <span className="text-[10px] text-[#F5F2EB]/60">
              KD Creation Post-Production Studio Archive
            </span>
            <span className="text-[9px] tracking-[0.25em] font-serif-luxury font-bold text-gold uppercase">
              4K ULTRA HD CINEMA
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
