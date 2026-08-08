import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoUrl, title, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-6xl rounded-3xl overflow-hidden bg-obsidian-200 border border-gold/30 shadow-2xl flex flex-col"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6 bg-obsidian-100/90 border-b border-gold/15 z-10">
            <span className="text-xs sm:text-sm tracking-[0.2em] font-serif-luxury font-bold text-gold uppercase">
              KD CREATION CINEMA • {title}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-gold hover:text-white rounded-full bg-gold/10 hover:bg-gold/30 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Video Player Box */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            />

            {/* Floating Custom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-3">
              {/* Progress Scrubber */}
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative">
                <div className="h-full bg-gold-gradient" style={{ width: `${progress}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="p-2 text-gold hover:scale-110 transition-transform">
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                  </button>

                  <button onClick={toggleMute} className="p-2 text-gold hover:scale-110 transition-transform">
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                </div>

                <button onClick={toggleFullscreen} className="p-2 text-gold hover:scale-110 transition-transform">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
