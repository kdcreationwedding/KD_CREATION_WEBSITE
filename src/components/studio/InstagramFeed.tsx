import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight, Sparkles, RefreshCw, Film, Camera } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const InstagramFeed: React.FC = () => {
  const [iframeKey, setIframeKey] = useState(0);

  // Auto-trigger Instagram Embed script processing
  useEffect(() => {
    const existingScript = document.getElementById('instagram-embed-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  const profileUrl = SITE_CONFIG.brand.instagramUrl;

  const refreshProfileFeed = () => {
    setIframeKey((prev) => prev + 1);
  };

  // Embedded Instagram Posts from @kdcreation.in
  const instaPosts = [
    {
      id: 'post-1',
      title: 'Royal Udaipur Wedding Cinematography',
      tag: 'REEL • @KDCREATION.IN',
      url: profileUrl,
      embedUrl: 'https://www.instagram.com/kdcreation.in/embed'
    },
    {
      id: 'post-2',
      title: 'Bridal Editorial Fine-Art Stills',
      tag: 'PHOTO • @KDCREATION.IN',
      url: profileUrl,
      embedUrl: 'https://www.instagram.com/kdcreation.in/embed'
    },
    {
      id: 'post-3',
      title: 'Destination Same-Day Edit Teaser',
      tag: 'REEL • @KDCREATION.IN',
      url: profileUrl,
      embedUrl: 'https://www.instagram.com/kdcreation.in/embed'
    }
  ];

  return (
    <section id="instagram-feed" className="relative py-28 sm:py-36 bg-[#2B050B] border-t border-gold/20 overflow-hidden text-[#F5F2EB]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] font-serif-luxury font-extrabold text-gold uppercase block mb-3">
              OFFICIAL INSTAGRAM STREAM
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
              LATEST POSTS FROM <span className="text-gold-gradient italic font-normal">@KDCREATION.IN</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F2EB]/80 font-semibold mt-2">
              REAL-TIME LATEST WEDDING REELS, EDITORIAL SHOTS & BEHIND THE SCENES DIRECT FROM OUR INSTAGRAM
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={refreshProfileFeed}
              className="p-3 text-gold hover:text-white rounded-full border border-gold/35 bg-[#3B0811] hover:bg-gold/20 transition-all shadow-md"
              title="Refresh Live Profile Feed"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs tracking-widest font-bold text-obsidian bg-gold-gradient px-7 py-3.5 rounded-full shadow-2xl hover:brightness-110 transition-all"
              data-cursor="INSTA"
            >
              <Instagram className="w-4 h-4" />
              <span>OPEN @KDCREATION.IN ON INSTAGRAM</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Live Instagram Embedded Profile Container */}
        <div className="liquid-glass-panel rounded-3xl p-4 sm:p-6 border border-gold/35 shadow-2xl bg-[#3B0811]/90 relative overflow-hidden space-y-6">
          
          {/* Header Bar inside Panel */}
          <div className="p-4 rounded-2xl bg-[#2B050B] border border-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full border border-gold bg-[#3B0811] p-0.5 shadow-md">
                <img
                  src={SITE_CONFIG.brand.officialLogo}
                  alt="KD CREATION Official Monogram"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gold tracking-wider">
                    kdcreation.in
                  </span>
                  <span className="text-[9px] bg-gold/15 text-gold font-bold px-2 py-0.5 rounded-full border border-gold/30">
                    OFFICIAL BRAND INSTAGRAM
                  </span>
                </div>
                <span className="text-[11px] text-[#F5F2EB]/70 block font-medium">
                  Wedding Photography • Cinematography • Films • Reels
                </span>
              </div>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs text-gold font-bold bg-gold/10 hover:bg-gold/20 px-4 py-2 rounded-full border border-gold/30 transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>FOLLOW @KDCREATION.IN</span>
            </a>
          </div>

          {/* Live Dynamic Instagram Embedded Profile Grid Frame */}
          <div className="relative w-full h-[680px] sm:h-[760px] rounded-2xl overflow-hidden bg-[#2B050B] border border-gold/20 shadow-2xl">
            <iframe
              key={iframeKey}
              src="https://www.instagram.com/kdcreation.in/embed"
              title="KD Creation Live Instagram Profile Posts"
              className="w-full h-full border-0 bg-[#2B050B]"
              allowTransparency={true}
              loading="lazy"
            />
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 rounded-2xl bg-[#2B050B] border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs text-[#F5F2EB]/90 font-semibold">
              <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Showing latest live posts, reels & wedding film highlights from <strong>@kdcreation.in</strong></span>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-widest font-extrabold text-obsidian bg-gold-gradient px-6 py-2.5 rounded-full shadow-lg hover:brightness-110 transition-all"
            >
              <span>VIEW ALL LATEST POSTS ON INSTAGRAM</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
