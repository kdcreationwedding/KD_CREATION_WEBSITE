import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Film, Sparkles, CheckCircle2, Play, Maximize2 } from 'lucide-react';
import { PortfolioItem } from '../../config/siteConfig';
import { ImageLightboxModal } from './ImageLightboxModal';

interface StoryDetailModalProps {
  story: PortfolioItem | null;
  onClose: () => void;
  onStartStory: () => void;
  onPlayVideo: (url: string, title: string) => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onStartStory,
  onPlayVideo,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!story) return null;

  // Use modal cover or hero image for video thumbnail preview on top
  const videoThumbnail = story.modalCover || story.heroImage;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl liquid-glass-panel rounded-3xl overflow-hidden shadow-2xl my-auto text-[#F5F2EB] bg-[#3B0811] border border-gold/40 max-h-[90vh] flex flex-col"
          >
            {/* Top Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-[#2B050B] border-b border-gold/30">
              <div>
                <span className="text-[10px] tracking-[0.25em] font-serif-luxury font-extrabold text-gold uppercase block">
                  SELECTED STORY • {story.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                  {story.couple} — {story.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gold hover:text-white rounded-full border border-gold/30 bg-[#3B0811] hover:bg-gold/20 transition-all"
                aria-label="Close Story View"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-10">
              
              {/* Main Top Video Preview & Thumbnail Banner */}
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-[440px] border border-gold/40 group shadow-2xl bg-[#2B050B]">
                <img
                  src={videoThumbnail}
                  alt={`${story.couple} Video Thumbnail`}
                  className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B050B]/90 via-black/30 to-transparent" />
                
                {/* Prominent Glowing 4K Play Button Banner */}
                {story.videoUrl && (
                  <button
                    onClick={() => onPlayVideo(story.videoUrl!, `${story.couple} — 4K Wedding Cinema Film`)}
                    className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-gradient text-obsidian flex flex-col items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform group cursor-pointer"
                    data-cursor="PLAY FILM"
                  >
                    <Play className="w-9 h-9 sm:w-10 sm:h-10 fill-current ml-1" />
                    <span className="text-[8px] font-mono tracking-widest font-extrabold text-obsidian uppercase mt-0.5">PLAY 4K FILM</span>
                  </button>
                )}

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs sm:text-sm text-[#F5F2EB] font-semibold">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5 font-bold text-gold">
                      <MapPin className="w-4 h-4 text-gold" />
                      {story.location}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-gold">
                      <Calendar className="w-4 h-4 text-gold" />
                      {story.year}
                    </span>
                  </div>

                  <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-gold bg-gold/15 px-3.5 py-1 rounded-full border border-gold/30">
                    <Film className="w-3.5 h-3.5" /> 4K CINEMATIC FILM THUMBNAIL
                  </span>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="max-w-3xl space-y-3">
                <h3 className="text-xl font-serif-luxury font-bold text-gold uppercase tracking-wider">
                  THE NARRATIVE
                </h3>
                <p className="text-base sm:text-lg text-[#F5F2EB]/90 font-medium leading-relaxed">
                  {story.description}
                </p>
              </div>

              {/* Highlights & Behind the Scenes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gold/20">
                <div className="space-y-4">
                  <h4 className="text-sm tracking-widest font-serif-luxury font-bold text-gold uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    KEY CELEBRATION HIGHLIGHTS
                  </h4>
                  <ul className="space-y-2.5">
                    {story.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F5F2EB] font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm tracking-widest font-serif-luxury font-bold text-gold uppercase flex items-center gap-2">
                    <Film className="w-4 h-4" />
                    BEHIND THE FRAMES
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F5F2EB]/90 font-medium leading-relaxed italic bg-[#2B050B] p-4 rounded-xl border border-gold/30 shadow-inner">
                    "{story.bts}"
                  </p>
                </div>
              </div>

              {/* 1. CINEMA FILMS & REELS SECTION */}
              {story.videos && story.videos.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-gold/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif-luxury font-bold text-[#F5F2EB] uppercase flex items-center gap-2">
                      <Film className="w-5 h-5 text-gold" />
                      CINEMA FILMS & REELS ({story.videos.length} VIDEOS)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {story.videos.map((vid, vIdx) => (
                      <div
                        key={vIdx}
                        onClick={() => onPlayVideo(vid.url, `${story.couple} — ${vid.title}`)}
                        className="relative rounded-2xl overflow-hidden h-48 border-2 border-gold/40 bg-[#2B050B] group cursor-pointer shadow-2xl flex flex-col justify-between p-4 hover:border-gold hover:scale-[1.02] transition-all duration-300"
                        data-cursor="PLAY FILM"
                      >
                        <img
                          src={story.modalCover || story.heroImage}
                          alt={vid.title}
                          className="absolute inset-0 w-full h-full object-cover brightness-40 group-hover:brightness-55 transition-all"
                        />
                        
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="text-[9px] font-mono tracking-widest font-extrabold text-gold uppercase bg-black/80 px-2.5 py-1 rounded-full border border-gold/40">
                            VIDEO #{vIdx + 1}
                          </span>
                          <span className="text-[9px] bg-gold-gradient text-obsidian px-2 py-0.5 rounded-full font-bold">
                            4K CINEMA
                          </span>
                        </div>

                        <div className="relative z-10 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                          <span className="text-xs font-serif-luxury font-bold text-[#F5F2EB] group-hover:text-gold transition-colors line-clamp-1">
                            {vid.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. STILL PHOTOGRAPHY GALLERY SECTION */}
              <div className="space-y-4 pt-6 border-t border-gold/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif-luxury font-bold text-[#F5F2EB] uppercase flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    STILL PHOTOGRAPHY GALLERY ({story.gallery.length} PHOTOS)
                  </h3>
                  <span className="text-xs text-gold/80 font-bold">CLICK PHOTO TO OPEN LIGHTBOX SLIDESHOW</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {story.gallery.map((imgUrl, gIdx) => (
                    <div
                      key={gIdx}
                      onClick={() => setSelectedImageIndex(gIdx)}
                      className="relative rounded-xl overflow-hidden h-48 border border-gold/30 hover:border-gold transition-all shadow-md bg-[#2B050B] group cursor-pointer"
                      data-cursor="FULL VIEW"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery Still #${gIdx + 1}`}
                        className="w-full h-full object-cover group-hover:object-contain transition-all duration-300 brightness-95 group-hover:brightness-100 bg-[#2B050B]"
                        loading="lazy"
                      />

                      {/* Fullscreen Expand Icon Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                          <Maximize2 className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="p-8 liquid-glass-panel rounded-2xl border border-gold/40 text-center space-y-4 bg-[#2B050B]">
                <h3 className="text-2xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                  CREATE YOUR STORY WITH KD CREATION
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F2EB]/80 font-semibold max-w-md mx-auto">
                  Ready to transform your wedding into an enduring cinematic legacy? Check team availability for your date.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartStory();
                  }}
                  className="inline-flex items-center gap-2 text-xs tracking-widest font-extrabold text-obsidian bg-gold-gradient px-8 py-3.5 rounded-full shadow-2xl hover:brightness-110 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>BEGIN YOUR ENQUIRY</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Full Screen Image Lightbox Modal with Previous/Next Arrows & Keyboard Support */}
      <ImageLightboxModal
        images={story.gallery}
        currentIndex={selectedImageIndex}
        title={`${story.couple} — Editorial Photo Gallery`}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(newIdx) => setSelectedImageIndex(newIdx)}
      />
    </>
  );
};
