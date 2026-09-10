import React from "react";
import { ArrowRight, CheckCircle2, Shield, Phone, Sparkles, Calendar, Clock, Lock } from "lucide-react";

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
          <span className="text-white">Bespoke Commissions & Investment</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
            Bespoke Commissions • By Private Consultation Only
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold leading-tight mb-6">
            Bespoke Wedding Commissions in <span className="text-gold-gradient italic font-normal">Ahmedabad & Beyond</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed max-w-3xl mx-auto mb-8">
            Because every royal celebration is an unrepeatable visual legacy, KD Creation does not provide standardized, off-the-shelf pricing. We accept strictly 18 exclusive weddings per calendar year to dedicate hundreds of production hours to each couple.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
            >
              <span>Check Date Availability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20would%20like%20to%20inquire%20about%20availability%20and%20request%20a%20private%20bespoke%20proposal%20for%20our%20wedding."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Founders Desk</span>
            </a>
          </div>
        </div>

        {/* Bespoke Experience Tiers (No Fixed Rate Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-gold font-bold uppercase tracking-wider block mb-2">Heritage Commission</span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-3">Royal Wedding Visuals</h3>
              <p className="text-sm font-serif-luxury italic text-gold mb-6">Tailored Proposal Upon Date Inquiry</p>
              <ul className="space-y-3.5 text-xs text-[#F5F2EB]/80 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Master candid photography led personally by Creative Director Mahesh Parmar</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>4K cinema capture with dedicated prime lenses & true skin-tone color grading</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>32-bit float audio capture preserving sacred Vedic chants with zero distortion</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Hand-curated private digital client gallery with high-speed delivery</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all"
            >
              Inquire for Dates
            </button>
          </div>

          <div className="p-8 rounded-2xl bg-[#4A0E17] border-2 border-gold flex flex-col justify-between relative shadow-2xl scale-105">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-obsidian text-[10px] font-mono font-bold uppercase tracking-widest">
              Cinema Flagship
            </span>
            <div>
              <span className="text-xs font-mono text-gold font-bold uppercase tracking-wider block mb-2">Palace & Destination</span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-3">4K Anamorphic Cinema</h3>
              <p className="text-sm font-serif-luxury italic text-gold mb-6">Bespoke Proposal By Application</p>
              <ul className="space-y-3.5 text-xs text-[#F5F2EB]/80 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Hollywood 2.39:1 widescreen cinema using RED sensors & Atlas Orion Anamorphic primes</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Multi-day coverage across royal heritage palaces (Rajasthan & Gujarat)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>DGCA-licensed aerial drone cinematography with dual operator safety</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Two museum-grade handcrafted Italian Nappa leather heirloom albums</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              Request Bespoke Proposal
            </button>
          </div>

          <div className="p-8 rounded-2xl bg-[#3B0811] border border-gold/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-gold font-bold uppercase tracking-wider block mb-2">Private Estate</span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-3">Pre-Wedding & Editorial</h3>
              <p className="text-sm font-serif-luxury italic text-gold mb-6">Custom Production Itinerary</p>
              <ul className="space-y-3.5 text-xs text-[#F5F2EB]/80 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Curated concept direction in heritage monuments, luxury resorts, or desert dunes</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>High-fashion wardrobe styling coordination & dramatic directional lighting</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>60-second viral cinema teaser delivered within 5 days of production</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Complete raw media archival backup on encrypted solid-state drives</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all"
            >
              Schedule Director Call
            </button>
          </div>

        </div>

        {/* Why Bespoke: Scarcity & Quality Guarantee */}
        <div className="border border-gold/30 rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-[#240409] to-[#3B0811] mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <Lock className="w-8 h-8 text-gold mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-gold mb-4">
              Why We Never Publish Standard Rate Cards
            </h2>
            <p className="text-sm text-[#F5F2EB]/80 leading-relaxed mb-6">
              True luxury cannot be mass-produced. Your wedding vision depends on multi-generational family dynamics, venue architecture, and ritual timings. By tailoring every proposal individually, we guarantee that your visual legacy receives uncompromised attention from our founders rather than outsourced sub-contractors.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/30 text-xs font-mono text-gold">
              <Clock className="w-4 h-4" />
              <span>Strictly Limited to 18 Commissions Per Wedding Season</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
