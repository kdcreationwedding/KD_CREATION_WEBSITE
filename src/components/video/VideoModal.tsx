import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoUrl, title, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(() => encodeURI(videoUrl));

  useEffect(() => {
    setCurrentVideoSrc(encodeURI(videoUrl));
    setIsPlaying(false);
  }, [videoUrl]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          }
        });
    }
  }, [isOpen, currentVideoSrc]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = clickPosition * videoRef.current.duration;
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl rounded-3xl overflow-hidden bg-[#2B050B] border border-gold/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-[#3B0811] border-b border-gold/30 flex items-center justify-between z-20">
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

          {/* Responsive HTML5 4K Video Player Container */}
          <div
            onClick={togglePlay}
            className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center cursor-pointer group/player"
          >
            <video
              ref={videoRef}
              src={currentVideoSrc}
              autoPlay
              muted={isMuted}
              playsInline
              controls
              onError={() => {
                setCurrentVideoSrc('https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-42861-large.mp4');
              }}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain bg-black"
            />

            {/* Central Animated Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all z-20">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.7)] group-hover/player:scale-110 transition-transform">
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Custom Sleek Gold Control Bar */}
          <div className="p-4 bg-[#3B0811] border-t border-gold/30 space-y-3">
            {/* Clickable Timeline Scrubber */}
            <div
              onClick={handleProgressClick}
              className="relative w-full h-2 bg-[#2B050B] rounded-full cursor-pointer overflow-hidden border border-gold/20 group"
            >
              <div
                className="h-full bg-gold-gradient transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#F5F2EB]">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-2 text-gold hover:text-white rounded-full bg-gold/10 hover:bg-gold/20 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 text-gold hover:text-white rounded-full bg-gold/10 hover:bg-gold/20 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">
                  4K ULTRA HD CINEMA
                </span>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gold hover:text-white rounded-full bg-gold/10 hover:bg-gold/20 transition-colors"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
