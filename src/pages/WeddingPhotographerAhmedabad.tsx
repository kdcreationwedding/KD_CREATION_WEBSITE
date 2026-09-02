import React from 'react';
import { ArrowRight, CheckCircle2, Star, MapPin, Calendar, Camera, Phone, Award, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const WeddingPhotographerAhmedabad: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-white">Wedding Photographer Ahmedabad</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
              Premier Luxury Wedding Studio in Ahmedabad
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold leading-tight mb-6">
              Best Wedding Photographer in <span className="text-gold-gradient italic font-normal">Ahmedabad</span>
            </h1>
            <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed mb-8">
              KD Creation is an acclaimed luxury wedding photography studio based in Ahmedabad, Gujarat. Founded by Mahesh Parmar & Harshad Chawda, we craft timeless 4K visual heirlooms, royal candid portraits, and cinematic wedding stories across Gujarat and worldwide destination venues.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
              >
                <span>Check Date Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20am%20looking%20for%20wedding%20photography%20in%20Ahmedabad."
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
              src="assets/service-wedding-photography.jpg"
              alt="Luxury Wedding Photographer in Ahmedabad - KD Creation"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#33060D] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 border border-gold/30 backdrop-blur-md flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gold uppercase tracking-wider">Royal Wedding Portfolio</p>
                <p className="text-sm font-serif-luxury font-semibold text-white">Yash & Kavya • Belvedere Club</p>
              </div>
              <div className="flex items-center gap-1 text-gold text-xs font-bold">
                <Star className="w-4 h-4 fill-gold" />
                <span>4.9 / 5.0 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose KD Creation Section */}
        <div className="bg-[#3B0811] border border-gold/30 rounded-2xl p-8 sm:p-12 mb-20">
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-gold mb-8 text-center uppercase">
            Why KD Creation Is Choice #1 For Luxury Weddings in Ahmedabad
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <Camera className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">4K Anamorphic & Cinema Gear</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                We deploy Sony Alpha 4K cameras, master G-Master prime lenses, cinema drones, and multi-track audio gear for magazine-grade visual clarity.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <Award className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">10+ Years Heritage & 500+ Weddings</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Over a decade of expertise capturing Royal Marwari, Gujarati, Jain, and NRI destination weddings across Ahmedabad's finest resorts.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#240409] border border-gold/20">
              <ShieldCheck className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">100% RAW Cloud Digital Albums</h3>
              <p className="text-xs text-[#F5F2EB]/70 leading-relaxed">
                Receive uncompressed 4K digital photobooks accessible anytime via custom QR code links and cloud databases.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-gold mb-8 text-center uppercase">
            Frequently Asked Questions — Wedding Photography Ahmedabad
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-[#3B0811] border border-gold/30">
              <h3 className="font-bold text-white text-base mb-2">What is the cost of booking KD Creation for a wedding in Ahmedabad?</h3>
              <p className="text-xs text-[#F5F2EB]/80 leading-relaxed">
                Our luxury wedding photography and 4K cinematography packages start from ₹1.5 Lakhs per day, tailored to event days, crew size, and deliverables.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#3B0811] border border-gold/30">
              <h3 className="font-bold text-white text-base mb-2">How early should we book our wedding dates?</h3>
              <p className="text-xs text-[#F5F2EB]/80 leading-relaxed">
                We recommend booking 4 to 8 months in advance during peak Gujarati wedding seasons (November through March) to reserve your dates.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
