import React from 'react';
import { ArrowRight, CheckCircle2, DollarSign, Shield, Phone } from 'lucide-react';

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const WeddingPhotographyCostAhmedabad: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-white">Wedding Photography Packages & Price Guide</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
            Transparent Pricing & Package Breakdown
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold leading-tight mb-6">
            Wedding Photography Packages in <span className="text-gold-gradient italic font-normal">Ahmedabad</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed mb-8">
            Learn what factors determine wedding photography pricing in Ahmedabad and customize a luxury package matching your wedding dates, crew size, and deliverables.
          </p>
        </div>

        {/* Package Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-gold font-bold uppercase tracking-wider block mb-2">Essential Package</span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-4">Classic Wedding Visuals</h3>
              <p className="text-3xl font-bold text-gold mb-6">₹1.5 Lakhs <span className="text-xs font-normal text-white/70">/ day</span></p>
              <ul className="space-y-3 text-xs text-[#F5F2EB]/80 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 1 Senior Candid Photographer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 1 Traditional Photographer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 1 4K Cinematic Videographer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Edited High-Res Digital Album</li>
              </ul>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            >
              Select Essential
            </button>
          </div>

          <div className="p-8 rounded-2xl bg-[#4A0E17] border-2 border-gold flex flex-col justify-between relative shadow-2xl scale-105">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-obsidian text-[10px] font-mono font-bold uppercase tracking-widest">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-mono text-gold font-bold uppercase tracking-wider block mb-2">Luxury Package</span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-4">Royal Cinema & Photography</h3>
              <p className="text-3xl font-bold text-gold mb-6">₹2.5 Lakhs <span className="text-xs font-normal text-white/70">/ day</span></p>
              <ul className="space-y-3 text-xs text-[#F5F2EB]/80 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 2 Senior Candid Photographers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 2 4K Anamorphic Cinema Crew</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 4K Aerial Drone Coverage</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Flush-Mount Printed Photobook</li>
              </ul>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            >
              Book Luxury Package
            </button>
          </div>

          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-gold font-bold uppercase tracking-wider block mb-2">Signature Package</span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-4">Grand Royal Destination</h3>
              <p className="text-3xl font-bold text-gold mb-6">Custom Quote</p>
              <ul className="space-y-3 text-xs text-[#F5F2EB]/80 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Unlimited Multi-Day Event Crew</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Full 4K Feature Film Production</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Same-Day Teaser Editing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Heirloom Velvet Glass Albums</li>
              </ul>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all"
            >
              Request Custom Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
