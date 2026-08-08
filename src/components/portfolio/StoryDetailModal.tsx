import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Film, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { PortfolioItem } from '../../config/siteConfig';

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
  if (!story) return null;

  return (
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
            
            {/* Hero Image / Video Container */}
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-[420px] border border-gold/35 group shadow-2xl">
              <img
                src={story.heroImage}
                alt={story.title}
                className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B050B]/90 via-transparent to-transparent" />
              
              {story.videoUrl && (
                <button
                  onClick={() => onPlayVideo(story.videoUrl!, `${story.couple} — Wedding Film`)}
                  className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
                  data-cursor="PLAY"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              )}

              <div className="absolute bottom-6 left-6 flex items-center gap-6 text-xs sm:text-sm text-[#F5F2EB] font-semibold">
                <span className="flex items-center gap-1.5 font-bold text-gold">
                  <MapPin className="w-4 h-4 text-gold" />
                  {story.location}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-gold">
                  <Calendar className="w-4 h-4 text-gold" />
                  {story.year}
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

            {/* Photo Gallery Grid */}
            <div className="space-y-4 pt-6 border-t border-gold/20">
              <h3 className="text-xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                STILL GALLERY PREVIEW
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {story.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="rounded-xl overflow-hidden h-40 border border-gold/30 hover:border-gold transition-all shadow-md bg-[#2B050B]">
                    <img src={imgUrl} alt={`Gallery ${gIdx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 brightness-95 hover:brightness-100" loading="lazy" />
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
  );
};
