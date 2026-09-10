import React from "react";
import { ArrowRight, MapPin, Calendar, Star, Camera, Phone, CheckCircle2 } from "lucide-react";

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const VenueGulmoharGreens: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span>Venues</span>
          <span>/</span>
          <span className="text-white">Gulmohar Greens Golf Club Wedding</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
              Featured Luxury Venue Portfolio
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold leading-tight mb-6">
              Wedding Photography at <span className="text-gold-gradient italic font-normal">Gulmohar Greens Golf Club</span>
            </h1>
            <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed mb-8">
              Documenting grand Gujarati weddings at Gulmohar Greens Golf & Country Club, Sanand-Sarkhej Road, Ahmedabad. Master 4K anamorphic cinematography, sprawling lawn decor illumination, and candid fine-art photography by KD Creation.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
              >
                <span>Book Gulmohar Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20am%20planning%20a%20wedding%20at%20Gulmohar%20Greens%20Ahmedabad."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl">
            <img
              src="assets/service-candid-photography.jpg"
              alt="Wedding Photography at Gulmohar Greens Golf Club Ahmedabad - KD Creation"
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>

        {/* Venue Photography Highlights */}
        <div className="bg-[#3B0811] border border-gold/30 rounded-2xl p-8 sm:p-12 mb-20">
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-gold mb-8 text-center uppercase">
            Signature Zones at Gulmohar Greens
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <h3 className="font-bold text-gold text-lg mb-2">1. Sprawling Grand Lawns</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Capable of hosting over 3,000 guests with vast floral mandap sets. Perfect for synchronized multi-camera crane and drone coverage.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <h3 className="font-bold text-gold text-lg mb-2">2. The Banyan Tree Deck</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Shaded natural canopy ideal for intimate afternoon Haldi, Mehendi, and Pithi rituals with rich organic green bokeh.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <h3 className="font-bold text-gold text-lg mb-2">3. Golf Course Sunset Vista</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Unobstructed western horizon for dramatic sunset couple portraits, capturing warm Gujarat golden light without urban interference.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Cinema Specification */}
        <div className="border border-gold/30 rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-[#240409] to-[#3B0811]">
          <h2 className="text-2xl font-serif-luxury font-bold text-gold mb-4">
            Master Night-Lighting & Sangeet Acoustics at Gulmohar Greens
          </h2>
          <p className="text-sm text-[#F5F2EB]/80 leading-relaxed mb-6">
            With Gulmohar Greens featuring open-air wedding lawns spanning acres, audio dissipation and uneven darkness are major hurdles for standard videographers. KD Creation deploys a synchronized 4-point wireless strobe network and directional boom microphones paired with 32-bit float audio recorders to capture crystal-clear orchestral sound and vibrant royal visuals.
          </p>
          <div className="flex items-center gap-2 text-xs text-gold font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Dedicated Multi-Cam Rig with Dual Operator 4K RED Cinema Systems</span>
          </div>
        </div>

      </div>
    </div>
  );
};
