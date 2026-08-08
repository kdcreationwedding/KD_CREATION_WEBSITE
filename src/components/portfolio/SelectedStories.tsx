import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, PortfolioItem } from '../../config/siteConfig';
import { StoryDetailModal } from './StoryDetailModal';

interface SelectedStoriesProps {
  onStartStory: () => void;
  onPlayVideo: (url: string, title: string) => void;
}

export const SelectedStories: React.FC<SelectedStoriesProps> = ({
  onStartStory,
  onPlayVideo,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedStory, setSelectedStory] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Royal Wedding', 'Destination', 'Pre-Wedding'];

  const filteredPortfolio =
    activeCategory === 'All'
      ? SITE_CONFIG.portfolio
      : SITE_CONFIG.portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="stories" className="relative py-28 sm:py-36 bg-[#2B050B] border-t border-gold/20 overflow-hidden text-[#F5F2EB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-xs tracking-[0.3em] font-serif-luxury font-extrabold text-gold uppercase block mb-3">
              CINEMATIC ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
              SELECTED <span className="text-gold-gradient italic font-normal">STORIES</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs tracking-widest uppercase font-bold px-4 py-2.5 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold-gradient text-obsidian border-gold shadow-md'
                    : 'liquid-glass-pill text-[#F5F2EB] hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredPortfolio.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setSelectedStory(story)}
              className="group relative rounded-3xl overflow-hidden liquid-glass-card cursor-pointer shadow-2xl"
              data-cursor="OPEN"
            >
              {/* Media Preview Container */}
              <div className="relative h-80 sm:h-96 overflow-hidden">
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B050B] via-transparent to-transparent opacity-90" />

                {/* Top Category Badge */}
                <div className="absolute top-6 left-6 liquid-glass-pill px-4 py-1.5 rounded-full text-[10px] tracking-widest text-gold uppercase font-serif-luxury font-bold shadow-md">
                  {story.category}
                </div>

                {/* Hover Play / View Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gold/40 bg-[#3B0811]/90 text-gold flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#F5F2EB]/80 mb-2 font-semibold">
                    <span className="flex items-center gap-1 font-bold text-gold">
                      <MapPin className="w-3.5 h-3.5" />
                      {story.location}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-gold">
                      <Calendar className="w-3.5 h-3.5" />
                      {story.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif-luxury font-bold text-[#F5F2EB] uppercase group-hover:text-gold transition-colors mb-2">
                    {story.couple} — {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#F5F2EB]/80 font-medium line-clamp-2 leading-relaxed">
                    {story.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between text-xs tracking-widest text-gold font-extrabold uppercase group-hover:translate-x-1 transition-transform">
                  <span>EXPLORE FULL STORY & FILM</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Story Modal View */}
      <StoryDetailModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onStartStory={onStartStory}
        onPlayVideo={onPlayVideo}
      />
    </section>
  );
};
