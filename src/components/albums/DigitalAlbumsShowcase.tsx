import React, { useState } from 'react';
import { BookOpen, Lock, QrCode, Search, Sparkles } from 'lucide-react';
import { DigitalAlbum } from '../../types/album';
import { albumService } from '../../services/albumService';
import { getAssetPath } from '../../utils/assetHelper';

interface DigitalAlbumsShowcaseProps {
  onSelectAlbum: (album: DigitalAlbum) => void;
  onOpenQrCode: (album: DigitalAlbum) => void;
}

export const DigitalAlbumsShowcase: React.FC<DigitalAlbumsShowcaseProps> = ({
  onSelectAlbum,
  onOpenQrCode
}) => {
  const [albums] = useState<DigitalAlbum[]>(() => albumService.getAlbums().filter((a) => a.isPublished));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');

  const locations = ['ALL', ...Array.from(new Set(albums.map((a) => a.location)))];

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.couple.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'ALL' || album.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <section id="digital-albums" className="relative bg-[#1C0307] py-24 px-6 sm:px-10 lg:px-12 text-[#F5F2EB] overflow-hidden">
      
      {/* Decorative Golden Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-maroon/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" /> HEIRLOOM DIGITAL PHOTOBOOKS
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-gold tracking-wide">
            WEDDING E-ALBUMS & PHOTOBOOKS
          </h2>

          <p className="text-xs sm:text-sm text-[#F5F2EB]/80 font-sans leading-relaxed">
            Experience our handcrafted luxury wedding albums in an interactive 3D digital photobook format. Flip through timeless moments with 4K clarity.
          </p>
        </div>

        {/* Search & Location Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#3B0811] border border-gold/30 shadow-xl max-w-4xl mx-auto">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gold/60 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Couple or Location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C0307] border border-gold/30 text-gold placeholder-gold/40 text-xs focus:outline-none focus:border-gold font-mono"
            />
          </div>

          {/* Location Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase transition-all whitespace-nowrap ${selectedLocation === loc ? 'bg-gold-gradient text-obsidian shadow-md' : 'bg-[#1C0307] text-gold/70 border border-gold/20 hover:border-gold'}`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Album Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="group relative bg-[#3B0811] border border-gold/30 rounded-2xl overflow-hidden shadow-2xl hover:border-gold transition-all duration-500 flex flex-col justify-between"
            >
              {/* Large Cover Image Frame */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={getAssetPath(album.coverImage)}
                  alt={album.couple}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B0811] via-transparent to-black/40" />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 border border-gold/40 text-gold text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                    {album.pages.length} PAGES
                  </span>
                  {album.isPrivate && (
                    <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md">
                      <Lock className="w-3 h-3" /> PRIVATE
                    </span>
                  )}
                </div>

                {/* Action Controls */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => onOpenQrCode(album)}
                    className="p-2.5 rounded-full bg-black/70 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian transition-all shadow-lg backdrop-blur-md"
                    title="Generate QR Code for Album"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Meta Body */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-gold uppercase tracking-[0.25em] font-extrabold block">
                    {album.location} • {album.date}
                  </span>
                  <h3 className="text-2xl font-serif-luxury font-bold text-white group-hover:text-gold transition-colors">
                    {album.couple}
                  </h3>
                  {album.subtitle && (
                    <p className="text-xs font-serif-luxury italic text-gold/80 mt-0.5">
                      "{album.subtitle}"
                    </p>
                  )}
                </div>

                <p className="text-xs text-[#F5F2EB]/80 font-sans line-clamp-2 leading-relaxed">
                  {album.description}
                </p>

                {/* View Album CTA */}
                <div className="pt-2 border-t border-gold/20 flex items-center justify-between">
                  <button
                    onClick={() => onSelectAlbum(album)}
                    className="w-full py-3 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>VIEW DIGITAL PHOTOBOOK</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
