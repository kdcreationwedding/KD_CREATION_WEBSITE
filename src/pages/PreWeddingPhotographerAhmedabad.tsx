import React from 'react';
import { ArrowRight, Star, MapPin, Camera, Phone, Sparkles } from 'lucide-react';

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const PreWeddingPhotographerAhmedabad: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-white">Pre Wedding Photographer Ahmedabad</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
              Concept Love Story Films & Editorial Photoshoots
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold leading-tight mb-6">
              Best Pre Wedding Photographer in <span className="text-gold-gradient italic font-normal">Ahmedabad</span>
            </h1>
            <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed mb-8">
              Capture your unique love story before the wedding day. KD Creation creates editorial pre-wedding photoshoots and 4K concept teaser films at iconic heritage stepwells, royal palaces, desert dunes, and luxury resorts across Gujarat.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
              >
                <span>Book Pre-Wedding Shoot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20am%20interested%20in%20a%20pre-wedding%20shoot%20in%20Ahmedabad."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Creative Director</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl">
            <img
              src="assets/service-prewedding-rakhi.jpg"
              alt="Pre Wedding Shoot in Ahmedabad Gujarat - KD Creation"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#33060D] via-transparent to-transparent" />
          </div>
        </div>

        {/* Top Locations Guide */}
        <div className="bg-[#3B0811] border border-gold/30 rounded-2xl p-8 sm:p-12 mb-20">
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-gold mb-8 text-center uppercase">
            Top Pre-Wedding Shoot Locations in Gujarat
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <h3 className="font-bold text-gold text-lg mb-2">1. Polo Forest, Vijaynagar</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Ancient temple ruins surrounded by lush green forest, dams, and golden hour lighting.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <h3 className="font-bold text-gold text-lg mb-2">2. Adalaj Stepwell, Gandhinagar</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                15th-century Indo-Islamic Solanki architecture with intricate carved pillars & depth.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <h3 className="font-bold text-gold text-lg mb-2">3. Little Rann of Kutch</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Exotic white salt desert dunes for editorial fashion-style couple portraits.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
