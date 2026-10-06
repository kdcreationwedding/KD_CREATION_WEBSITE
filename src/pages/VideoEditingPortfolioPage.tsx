import React from 'react';
import { ArrowLeft, ArrowRight, Film, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { VideoEditingPortfolio } from '../components/portfolio/VideoEditingPortfolio';

interface VideoEditingPortfolioPageProps {
  onBackToHome: () => void;
  onPlayVideo: (url: string, title: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const VideoEditingPortfolioPage: React.FC<VideoEditingPortfolioPageProps> = ({
  onBackToHome,
  onPlayVideo,
  onOpenBooking,
}) => {
  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-6">
          <button
            onClick={onBackToHome}
            className="hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold" />
            <span>Back to Home</span>
          </button>
          <span className="text-gold/40">/</span>
          <span className="text-[#F5F2EB]/90">Video Editing Portfolio</span>
        </div>

        {/* Dedicated Page Luxury Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#240409] via-[#3B0811] to-[#240409] border border-gold/30 p-8 sm:p-12 mb-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Film className="w-3.5 h-3.5 text-gold" />
              <span>POST-PRODUCTION ATELIER • 36 MASTER 4K EDITS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-[#F5F2EB] leading-tight mb-4">
              Video Editing <span className="text-gold-gradient italic font-normal">Portfolio</span>
            </h1>

            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed mb-6 max-w-2xl">
              Explore our curated, folder-wise post-production showcase. From high-energy 9:16 viral reels to cinematic wedding highlights, teasers, and luxury automobile deliveries — color-graded in DaVinci Resolve Studio 19 and directed by Mr. Aniket Vaghela.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBooking('Video Editing Suite')}
                className="px-6 py-3 rounded-full bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
              >
                <span>Book Editing Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/919033032922?text=Hello%20KD%20Creation%2C%20I%20would%20like%20to%20inquire%20about%20video%20editing%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#4A0E17]/80 border border-gold/40 text-gold font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Editor</span>
              </a>

              <button
                onClick={onBackToHome}
                className="px-5 py-3 rounded-full bg-black/40 border border-gold/20 text-[#F5F2EB]/80 font-bold text-xs uppercase tracking-widest hover:text-gold hover:border-gold/50 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Main Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Full Folder-Wise Video Editing Portfolio */}
        <VideoEditingPortfolio
          onPlayVideo={onPlayVideo}
          onInquire={(service) => onOpenBooking(service || 'Video Editing Suite')}
        />

        {/* Bottom Booking Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#240409] via-[#3B0811] to-[#240409] border border-gold/40 text-center relative overflow-hidden shadow-2xl">
          <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F2EB] mb-2">
            Have RAW Footage From Your Wedding Or Event?
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F2EB]/70 max-w-xl mx-auto mb-6">
            We turn your raw multi-camera footage into a world-class cinematic film with DCI-P3 color grading, dialogue audio cleanup, and licensed musical score.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking('RAW Footage Editing Commission')}
              className="px-8 py-3.5 rounded-full bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-gold/25 transition-all"
            >
              Get Custom Editing Quote
            </button>
            <a
              href="tel:+919033032922"
              className="px-6 py-3.5 rounded-full bg-[#4A0E17] border border-gold/40 text-gold font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +91 90330 32922</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
