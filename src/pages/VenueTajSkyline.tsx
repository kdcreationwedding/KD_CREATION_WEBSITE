import React from 'react';
import { ArrowRight, MapPin, Calendar, Star, Camera, Phone } from 'lucide-react';

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const VenueTajSkyline: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span>Venues</span>
          <span>/</span>
          <span className="text-white">Taj Skyline Ahmedabad Wedding</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
              Luxury 5-Star Hotel Venue Portfolio
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold leading-tight mb-6">
              Wedding Photography at <span className="text-gold-gradient italic font-normal">Taj Skyline Ahmedabad</span>
            </h1>
            <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed mb-8">
              Experience modern luxury wedding photography and 4K cinema films at Taj Skyline, SG Highway, Ahmedabad. Fine-art bridal portraits, high-ceiling ballroom lighting, and flawless reception coverage.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
              >
                <span>Book Taj Skyline Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20am%20planning%20a%20wedding%20at%20Taj%20Skyline%20Ahmedabad."
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
              alt="Wedding Photography at Taj Skyline Ahmedabad - KD Creation"
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
