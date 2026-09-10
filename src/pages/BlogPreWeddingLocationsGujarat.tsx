import React from "react";
import { ArrowRight, MapPin, Calendar, Star, Camera, Phone, CheckCircle2, Compass, Sparkles } from "lucide-react";

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const BlogPreWeddingLocationsGujarat: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span>Editorial Guides</span>
          <span>/</span>
          <span className="text-white">Pre-Wedding Shoot Locations in Gujarat</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
            Curated Architectural Guide
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold leading-tight mb-6">
            Top 10 Luxury Pre-Wedding Shoot Locations in <span className="text-gold-gradient italic font-normal">Gujarat</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed max-w-3xl mx-auto mb-8">
            The top luxury pre-wedding shoot locations in Gujarat include Adalaj Stepwell (Gandhinagar), Glade One Luxury Resort (Sanand), Modhera Sun Temple, White Rann of Kutch, and Polo Forest. KD Creation provides cinema-grade 4K anamorphic pre-wedding shoots with styling coordination and heritage lighting logistics across Gujarat.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
            >
              <span>Plan Pre-Wedding Shoot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20want%20to%20plan%20a%20luxury%20pre-wedding%20shoot%20in%20Gujarat."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Director</span>
            </a>
          </div>
        </div>

        {/* 10 Curated Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30">
            <span className="text-gold font-mono text-xs font-bold uppercase tracking-wider">01. Architectural Heritage</span>
            <h3 className="text-2xl font-serif-luxury font-bold text-white mt-2 mb-3">Adalaj Stepwell (Gandhinagar)</h3>
            <p className="text-xs text-[#F5F2EB]/80 leading-relaxed mb-4">
              A 15th-century subterranean masterpiece with intricate Solanki stone carvings. Perfect for dramatic backlit silhouetted portraits and flowing couture lehengas illuminated through ancient light wells.
            </p>
            <div className="text-[11px] font-mono text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Best Time: 7:00 AM – 9:30 AM (Soft directional morning rays)
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30">
            <span className="text-gold font-mono text-xs font-bold uppercase tracking-wider">02. Ultra-Luxury Resort</span>
            <h3 className="text-2xl font-serif-luxury font-bold text-white mt-2 mb-3">Glade One Golf & Resort (Sanand)</h3>
            <p className="text-xs text-[#F5F2EB]/80 leading-relaxed mb-4">
              Modern stone architecture coupled with Gary Player manicured fairways and reflective lake water. Offers unmatched privacy, high-fashion editorial aesthetics, and breathtaking golden-hour twilight skies.
            </p>
            <div className="text-[11px] font-mono text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Best Time: 4:30 PM – 7:00 PM (Sunset & Blue-Hour Cinema)
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30">
            <span className="text-gold font-mono text-xs font-bold uppercase tracking-wider">03. Ancient Temple Geometry</span>
            <h3 className="text-2xl font-serif-luxury font-bold text-white mt-2 mb-3">Modhera Sun Temple (Mehsana)</h3>
            <p className="text-xs text-[#F5F2EB]/80 leading-relaxed mb-4">
              Stepped water tank (Surya Kund) offering geometric symmetry for wide-angle 4K anamorphic cinematography. Ideal for traditional regal attire and timeless black-and-white fine-art frames.
            </p>
            <div className="text-[11px] font-mono text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Best Time: Early Morning Sunrise
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30">
            <span className="text-gold font-mono text-xs font-bold uppercase tracking-wider">04. Otherworldly Horizon</span>
            <h3 className="text-2xl font-serif-luxury font-bold text-white mt-2 mb-3">White Rann of Kutch (Dhordo)</h3>
            <p className="text-xs text-[#F5F2EB]/80 leading-relaxed mb-4">
              Infinite white salt desert flats creating surreal, minimalist horizons. When filmed under the full moon or sunset with drone 4K lenses, it delivers cinema visuals unmatched anywhere on Earth.
            </p>
            <div className="text-[11px] font-mono text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Best Time: November to February (Full Moon Nights)
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30">
            <span className="text-gold font-mono text-xs font-bold uppercase tracking-wider">05. Lush Ancient Forest</span>
            <h3 className="text-2xl font-serif-luxury font-bold text-white mt-2 mb-3">Polo Forest & Harnav River (Idar)</h3>
            <p className="text-xs text-[#F5F2EB]/80 leading-relaxed mb-4">
              Emerald woodland canopies, 10th-century Jain temple ruins, and gentle riverbeds. Delivers an enchanting, cinematic fairy-tale look for candid romantic narratives and bohemian styling.
            </p>
            <div className="text-[11px] font-mono text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Best Time: August to November (Post-Monsoon Greenery)
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30">
            <span className="text-gold font-mono text-xs font-bold uppercase tracking-wider">06. Royal Grandeur</span>
            <h3 className="text-2xl font-serif-luxury font-bold text-white mt-2 mb-3">Champaner-Pavagadh UNESCO Site</h3>
            <p className="text-xs text-[#F5F2EB]/80 leading-relaxed mb-4">
              Monumental mosque archways and historical fortified walls. An extraordinary royal backdrop for grand bridal couture trails, regal safas, and slow-motion cinematic tracking shots.
            </p>
            <div className="text-[11px] font-mono text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Best Time: 3:00 PM – 6:30 PM
            </div>
          </div>

        </div>

        {/* Pre-Wedding Shoot Production Standards */}
        <div className="border border-gold/30 rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-[#240409] to-[#3B0811]">
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-gold mb-4">
            The KD Creation Pre-Wedding Production Pipeline
          </h2>
          <p className="text-sm text-[#F5F2EB]/80 leading-relaxed mb-6">
            Every pre-wedding project is directed personally by Mahesh Parmar and Harshad Chavda. We handle mood-boarding, color-palette styling harmony with designer wardrobes, wireless portable strobe lighting, and cinema anamorphic glass to produce visuals worthy of international editorial magazines.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gold font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full 4K Anamorphic 2.39:1 Cinema Master File</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>60-Second Viral Instagram Teaser Reel (Delivered in 5 Days)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>50 High-Res Retouched Editorial Stills</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Private Drone & Architectural Location Permits Support</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
