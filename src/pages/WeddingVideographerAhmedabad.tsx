import React from 'react';
import { ArrowRight, Film, Video, Star, Phone, Play } from 'lucide-react';

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const WeddingVideographerAhmedabad: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-white">Wedding Videographer Ahmedabad</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
              4K Anamorphic Wedding Cinema & Films
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold leading-tight mb-6">
              Best Wedding Videographer in <span className="text-gold-gradient italic font-normal">Ahmedabad</span>
            </h1>
            <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed mb-8">
              Experience Bollywood-grade 4K cinematic wedding films in Ahmedabad. KD Creation produces cinematic teasers, aerial drone coverage, multi-cam live audio mixing, and emotional wedding highlight films across Gujarat.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
              >
                <span>Book Cinematic Videography</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20am%20looking%20for%20wedding%20videography%20in%20Ahmedabad."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Director</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl">
            <img
              src="assets/dhaval-sangeeta-outer-cover.jpg"
              alt="4K Cinematic Wedding Videographer Ahmedabad - KD Creation"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#33060D] via-transparent to-transparent" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-[#3B0811] border border-gold/30 rounded-2xl p-8 sm:p-12 mb-20">
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-gold mb-8 text-center uppercase">
            Our 4K Cinema Production Standard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <Film className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Cinema Prime Lenses</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Color-graded footage using anamorphic cinema glass for rich depth of field and filmic skin tones.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <Video className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Aerial Drone Shots</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                4K 60fps aerial drone shots capturing grand Baarat entries, resort architecture, and lawn illuminations.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <Play className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Multi-Cam Audio Mixing</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Crystal clear live audio recording during Phera vows, speeches, and Sangeet musical performances.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
