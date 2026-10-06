import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  FolderOpen,
  Film,
  Video,
  Smartphone,
  Sliders,
  Sparkles,
  Scissors,
  Play,
  Clock,
  Monitor,
  Cpu,
  Layers,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Headphones,
  Wand2,
  FolderArchive
} from 'lucide-react';
import {
  VIDEO_EDITING_FOLDERS,
  VIDEO_EDITING_PROJECTS,
  POST_PRODUCTION_STATS,
  VideoEditingFolder,
  VideoEditingProject
} from '../../config/videoEditingData';
import { SITE_CONFIG } from '../../config/siteConfig';

interface VideoEditingPortfolioProps {
  onPlayVideo: (url: string, title: string) => void;
  onInquire: (serviceName?: string) => void;
}

export const VideoEditingPortfolio: React.FC<VideoEditingPortfolioProps> = ({
  onPlayVideo,
  onInquire
}) => {
  const [activeFolderId, setActiveFolderId] = useState<string>('reel');

  const activeFolder = VIDEO_EDITING_FOLDERS.find((f) => f.id === activeFolderId);

  const filteredProjects: VideoEditingProject[] =
    activeFolderId === 'all'
      ? VIDEO_EDITING_PROJECTS
      : VIDEO_EDITING_PROJECTS.filter((p) => p.folderId === activeFolderId);

  // Icon mapping
  const renderFolderIcon = (iconName: string, isCurrent: boolean) => {
    const props = { className: `w-4 h-4 ${isCurrent ? 'text-gold' : 'text-[#F5F2EB]/60 group-hover:text-gold'}` };
    switch (iconName) {
      case 'Film':
        return <Film {...props} />;
      case 'Video':
        return <Video {...props} />;
      case 'Smartphone':
        return <Smartphone {...props} />;
      case 'Sliders':
        return <Sliders {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Scissors':
        return <Scissors {...props} />;
      default:
        return <Film {...props} />;
    }
  };

  return (
    <section
      id="video-editing"
      className="relative py-28 sm:py-36 bg-[#1C0307] border-t border-gold/20 overflow-hidden text-[#F5F2EB]"
    >
      {/* Background Atmosphere Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#4A0E17]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-[#2B050B] shadow-inner mb-4">
            <Cpu className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] font-serif-luxury font-bold text-gold uppercase">
              POST-PRODUCTION ATELIER & STUDIO EDITING SUITE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-extrabold text-[#F5F2EB] uppercase leading-tight mb-5">
            VIDEO EDITING <span className="text-gold-gradient italic font-normal">PORTFOLIO</span>
          </h2>
          <div className="text-xs sm:text-sm tracking-[0.2em] font-serif-luxury text-gold uppercase mb-4">
            CURATED FOLDER-WISE POST-PRODUCTION SHOWCASE • DIRECTED BY MR. ANIKET VAGHELA
          </div>
          <p className="text-sm sm:text-base text-[#F5F2EB]/70 font-light leading-relaxed max-w-2xl mx-auto">
            Explore our executive, folder-wise video editing archive. From 2.39:1 Anamorphic Wedding Teasers and 9:16 Viral Instagram Reels to multi-camera feature films and DaVinci Resolve color grading.
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gold/15">
            {POST_PRODUCTION_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-[#2B050B]/60 border border-gold/15">
                <span className="text-xl sm:text-2xl font-serif-luxury font-extrabold text-gold">{stat.value}</span>
                <span className="text-xs font-semibold text-[#F5F2EB] mt-0.5">{stat.label}</span>
                <span className="text-[10px] text-[#F5F2EB]/60 mt-0.5">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FOLDER NAVIGATION (Folder-Wise Switcher) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FolderArchive className="w-4 h-4 text-gold" />
              <span className="text-xs tracking-[0.2em] font-serif-luxury font-bold text-gold uppercase">
                SELECT PROJECT FOLDER
              </span>
            </div>
            <button
              onClick={() => setActiveFolderId('all')}
              className={`text-[11px] tracking-wider uppercase font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                activeFolderId === 'all'
                  ? 'bg-gold-gradient text-obsidian border-gold font-bold shadow-md'
                  : 'bg-[#2B050B] text-[#F5F2EB]/80 border-gold/30 hover:border-gold hover:text-gold'
              }`}
            >
              📁 All Folders ({VIDEO_EDITING_PROJECTS.length})
            </button>
          </div>

          {/* Folder Tabs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {VIDEO_EDITING_FOLDERS.map((folder) => {
              const isSelected = activeFolderId === folder.id;
              const count = VIDEO_EDITING_PROJECTS.filter((p) => p.folderId === folder.id).length;

              return (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolderId(folder.id)}
                  className={`group relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#4A0E17] to-[#2B050B] border-gold shadow-[0_8px_25px_rgba(212,175,55,0.25)] scale-[1.02]'
                      : 'bg-[#2B050B]/80 hover:bg-[#3B0811] border-gold/20 hover:border-gold/50'
                  }`}
                >
                  {/* Top Bar: Icon + Count */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <FolderOpen className="w-4 h-4 text-gold" />
                      ) : (
                        <Folder className="w-4 h-4 text-[#F5F2EB]/50 group-hover:text-gold" />
                      )}
                      {renderFolderIcon(folder.iconName, isSelected)}
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? 'bg-gold/20 border-gold/40 text-gold font-bold'
                          : 'bg-black/30 border-white/10 text-[#F5F2EB]/60'
                      }`}
                    >
                      {count}
                    </span>
                  </div>

                  {/* Folder Title */}
                  <div>
                    <div className="text-[9px] font-mono tracking-wider text-gold/80 uppercase block mb-1">
                      {folder.folderCode}
                    </div>
                    <h3
                      className={`text-xs sm:text-[13px] font-serif-luxury font-bold leading-snug transition-colors line-clamp-2 ${
                        isSelected ? 'text-[#F5F2EB]' : 'text-[#F5F2EB]/80 group-hover:text-[#F5F2EB]'
                      }`}
                    >
                      {folder.name}
                    </h3>
                  </div>

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <div className="absolute -bottom-px left-4 right-4 h-0.5 bg-gold-gradient rounded-full shadow-[0_0_8px_#D4AF37]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE FOLDER DETAILS INSPECTOR BANNER */}
        {activeFolder && activeFolderId !== 'all' && (
          <motion.div
            key={activeFolder.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2B050B] via-[#3B0811] to-[#2B050B] border border-gold/35 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-[10px] tracking-widest font-mono text-gold px-2.5 py-1 rounded-md bg-gold/10 border border-gold/30">
                    📂 {activeFolder.folderCode}
                  </span>
                  <span className="text-[10px] tracking-widest font-serif-luxury font-bold text-gold-light uppercase">
                    {activeFolder.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F5F2EB] mb-2">
                  {activeFolder.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed mb-4">
                  {activeFolder.description}
                </p>

                {/* Workflow tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-gold/80 mr-1">Key Workflow:</span>
                  {activeFolder.workflowHighlights.map((wf, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] tracking-wide text-[#F5F2EB]/90 bg-black/40 border border-gold/20 px-2.5 py-1 rounded-full"
                    >
                      ✓ {wf}
                    </span>
                  ))}
                </div>
              </div>

              {/* Editing Suite Software Pill Stack */}
              <div className="flex flex-col gap-2 bg-black/40 p-4 rounded-2xl border border-gold/20 min-w-[240px]">
                <div className="flex items-center gap-1.5 text-xs text-gold font-serif-luxury font-bold uppercase mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>EDITING SUITE STACK</span>
                </div>
                {activeFolder.softwareStack.map((soft, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F2EB]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="font-mono text-[11px]">{soft}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-3xl overflow-hidden bg-[#2B050B] border border-gold/25 hover:border-gold/60 shadow-xl hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Preview Box - Thumbnail generated directly from video itself */}
                <div
                  className="relative aspect-video sm:h-56 overflow-hidden cursor-pointer bg-black"
                  onClick={() => onPlayVideo(project.videoUrl, project.title)}
                >
                  {/* Video Thumbnail extracted directly from the video frame */}
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B050B] via-black/20 to-transparent pointer-events-none" />

                  {/* Top Aspect Ratio & Duration Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono tracking-wider font-bold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-gold border border-gold/30">
                      {project.aspectRatio}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                      <Clock className="w-3 h-3 text-gold" />
                      {project.duration}
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] transform group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 fill-obsidian ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Resolution Bar */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-white/80 font-mono">
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      {project.resolution}
                    </span>
                    <span className="text-gold font-serif-luxury font-bold">
                      {project.client}
                    </span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gold/80">
                        {project.eventDate}
                      </span>
                    </div>

                    <h3
                      onClick={() => onPlayVideo(project.videoUrl, project.title)}
                      className="text-base sm:text-lg font-serif-luxury font-bold text-[#F5F2EB] group-hover:text-gold transition-colors leading-snug mb-2 cursor-pointer line-clamp-2"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#F5F2EB]/70 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Key Technical Feature */}
                    <div className="p-2.5 rounded-xl bg-[#1C0307]/70 border border-gold/15 mb-4 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span className="text-[11px] text-gold-light leading-snug">
                        {project.keyFeature}
                      </span>
                    </div>

                    {/* Edit Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] font-mono tracking-wider text-[#F5F2EB]/70 bg-black/30 border border-white/10 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-gold/15 flex items-center justify-between">
                    <button
                      onClick={() => onPlayVideo(project.videoUrl, project.title)}
                      className="inline-flex items-center gap-2 text-xs font-serif-luxury font-bold tracking-wider text-gold hover:text-gold-light transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-gold" />
                      <span>PLAY VIDEO</span>
                    </button>

                    <button
                      onClick={() => onInquire(`Video Editing: ${project.title}`)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#F5F2EB]/60 hover:text-gold transition-colors"
                      title="Request similar edit style"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* BOTTOM POST-PRODUCTION SUITE CAPABILITIES BAR */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-b from-[#2B050B] to-[#1C0307] border border-gold/30 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-serif-luxury font-bold text-[#F5F2EB]">
                  Dual 4K Calibrated Suite
                </h4>
                <p className="text-xs text-[#F5F2EB]/60 mt-1 leading-relaxed">
                  100% Rec.709 & DCI-P3 calibrated hardware displays for skin-tone precision.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-serif-luxury font-bold text-[#F5F2EB]">
                  Licensed Cinematic Scoring
                </h4>
                <p className="text-xs text-[#F5F2EB]/60 mt-1 leading-relaxed">
                  Bespoke audio restoration, lapel voice de-noise, and acoustic foley sound design.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-serif-luxury font-bold text-[#F5F2EB]">
                  48-Hour Rush Teaser Delivery
                </h4>
                <p className="text-xs text-[#F5F2EB]/60 mt-1 leading-relaxed">
                  High-energy 9:16 vertical teaser ready for Instagram & WhatsApp during the wedding.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-serif-luxury font-bold text-[#F5F2EB]">
                  Custom RAW Footage Editing
                </h4>
                <p className="text-xs text-[#F5F2EB]/60 mt-1 leading-relaxed">
                  Got raw wedding footage from another team? We turn it into a luxury cinematic masterpiece.
                </p>
              </div>
            </div>
          </div>

          {/* In-House Post Production Lead & CTA Banner */}
          <div className="pt-6 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="assets/aniket-vaghela.jpg"
                alt="Mr. Aniket Vaghela - Head of Post-Production"
                className="w-14 h-14 rounded-2xl object-cover border border-gold/40 shadow-lg"
              />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase block">
                  HEAD OF POST-PRODUCTION & CREATIVE DIRECTION
                </span>
                <h4 className="text-base font-serif-luxury font-bold text-[#F5F2EB]">
                  Mr. Aniket Vaghela — Co-Founder
                </h4>
                <p className="text-xs text-[#F5F2EB]/70">
                  "Every frame we cut carries the emotional legacy of your once-in-a-lifetime day."
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => onInquire('Video Editing & Post-Production Suite')}
                className="flex-1 md:flex-none text-xs font-serif-luxury font-bold tracking-widest uppercase px-6 py-3.5 rounded-full bg-gold-gradient text-obsidian shadow-lg shadow-gold/20 hover:brightness-110 active:scale-95 transition-all text-center"
              >
                BOOK EDITING SUITE
              </button>

              <a
                href={`https://wa.me/${SITE_CONFIG.WHATSAPP.number}?text=${encodeURIComponent(
                  'Hi KD Creation, I would like to inquire about your Video Editing & Post-Production services for our wedding / event footage.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none text-xs font-serif-luxury font-bold tracking-widest uppercase px-6 py-3.5 rounded-full border border-gold/40 bg-[#2B050B] text-gold hover:border-gold hover:bg-gold/10 transition-all text-center"
              >
                WHATSAPP CHAT
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
