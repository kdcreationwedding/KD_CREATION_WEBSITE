import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ServicesSection } from './components/services/ServicesSection';
import { SelectedStories } from './components/portfolio/SelectedStories';
import { CinemaSection } from './components/video/CinemaSection';
import { AboutSection } from './components/studio/AboutSection';
import { FoundersSection } from './components/studio/FoundersSection';
import { WhyKdCreation } from './components/studio/WhyKdCreation';
import { ProcessTimeline } from './components/studio/ProcessTimeline';
import { Testimonials } from './components/studio/Testimonials';
import { FaqSection } from './components/studio/FaqSection';
import { InstagramFeed } from './components/studio/InstagramFeed';
import { LeadFormSection } from './components/forms/LeadFormSection';
import { StickyLeadCtas } from './components/forms/StickyLeadCtas';
import { Footer } from './components/layout/Footer';
import { apiClient } from './services/apiClient';

import { DigitalAlbum } from './types/album';
import { albumService, decodeAlbumFromUrl } from './services/albumService';
import { SITE_CONFIG } from './config/siteConfig';

// Lazy-loaded Album Components for Instant Mobile Loading
const DigitalAlbumsShowcase = lazy(() => import('./components/albums/DigitalAlbumsShowcase').then(m => ({ default: m.DigitalAlbumsShowcase })));
const DigitalAlbumViewerModal = lazy(() => import('./components/albums/DigitalAlbumViewerModal').then(m => ({ default: m.DigitalAlbumViewerModal })));
const QrCodeModal = lazy(() => import('./components/albums/QrCodeModal').then(m => ({ default: m.QrCodeModal })));

// Lazy-loaded Dedicated SEO Landing Pages for Sub-Second Initial Page Paint
const WeddingPhotographerAhmedabad = lazy(() => import('./pages/WeddingPhotographerAhmedabad').then(m => ({ default: m.WeddingPhotographerAhmedabad })));
const PreWeddingPhotographerAhmedabad = lazy(() => import('./pages/PreWeddingPhotographerAhmedabad').then(m => ({ default: m.PreWeddingPhotographerAhmedabad })));
const WeddingVideographerAhmedabad = lazy(() => import('./pages/WeddingVideographerAhmedabad').then(m => ({ default: m.WeddingVideographerAhmedabad })));
const DestinationWeddingGujarat = lazy(() => import('./pages/DestinationWeddingGujarat').then(m => ({ default: m.DestinationWeddingGujarat })));
const CandidWeddingPhotographerAhmedabad = lazy(() => import('./pages/CandidWeddingPhotographerAhmedabad').then(m => ({ default: m.CandidWeddingPhotographerAhmedabad })));
const WeddingPhotographyCostAhmedabad = lazy(() => import('./pages/WeddingPhotographyCostAhmedabad').then(m => ({ default: m.WeddingPhotographyCostAhmedabad })));
const VenueBelvedereClub = lazy(() => import('./pages/VenueBelvedereClub').then(m => ({ default: m.VenueBelvedereClub })));
const VenueTajSkyline = lazy(() => import('./pages/VenueTajSkyline').then(m => ({ default: m.VenueTajSkyline })));
const AnamorphicPalaceCinematography = lazy(() => import('./pages/AnamorphicPalaceCinematography').then(m => ({ default: m.AnamorphicPalaceCinematography })));
const BridalPortraitsAhmedabad = lazy(() => import('./pages/BridalPortraitsAhmedabad').then(m => ({ default: m.BridalPortraitsAhmedabad })));
const DroneWeddingPhotography = lazy(() => import('./pages/DroneWeddingPhotography').then(m => ({ default: m.DroneWeddingPhotography })));
const LuxuryWeddingAlbums = lazy(() => import('./pages/LuxuryWeddingAlbums').then(m => ({ default: m.LuxuryWeddingAlbums })));
const AnamorphicWeddingVideographyCostGujarat = lazy(() => import('./pages/AnamorphicWeddingVideographyCostGujarat').then(m => ({ default: m.AnamorphicWeddingVideographyCostGujarat })));
const VenueGladeOne = lazy(() => import('./pages/VenueGladeOne').then(m => ({ default: m.VenueGladeOne })));
const VenueGulmoharGreens = lazy(() => import('./pages/VenueGulmoharGreens').then(m => ({ default: m.VenueGulmoharGreens })));
const BlogPreWeddingLocationsGujarat = lazy(() => import('./pages/BlogPreWeddingLocationsGujarat').then(m => ({ default: m.BlogPreWeddingLocationsGujarat })));
const RealWeddingBelvedereCaseStudy = lazy(() => import('./pages/RealWeddingBelvedereCaseStudy').then(m => ({ default: m.RealWeddingBelvedereCaseStudy })));

// Lazy-loaded Modal and Overlay Components for Performance Optimization
const VideoModal = lazy(() => import('./components/video/VideoModal').then(m => ({ default: m.VideoModal })));
const KdAiChatbot = lazy(() => import('./components/chatbot/KdAiChatbot').then(m => ({ default: m.KdAiChatbot })));
const AdminLeadPortal = lazy(() => import('./components/admin/AdminLeadPortal').then(m => ({ default: m.AdminLeadPortal })));
const AdminLoginModal = lazy(() => import('./components/admin/AdminLoginModal').then(m => ({ default: m.AdminLoginModal })));
const ClientAuthModal = lazy(() => import('./components/client/ClientAuthModal').then(m => ({ default: m.ClientAuthModal })));
const ClientPortalModal = lazy(() => import('./components/client/ClientPortalModal').then(m => ({ default: m.ClientPortalModal })));

export const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('kd_admin_auth') === 'true';
  });

  // Client-Side Router State for SEO Landing Pages
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize dynamic Canonical tag on client-side navigation
  useEffect(() => {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const cleanPath = window.location.pathname.replace(/\/$/, '') || '';
    const canonicalUrl = `https://www.kdcreations.in${cleanPath || '/'}`;
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [currentPath]);

// Helper to extract album query/hash deep link parameters
const parseAlbumFromLocation = (): { slug: string; encodedData: string; isDirect: boolean } => {
  if (typeof window === 'undefined') return { slug: '', encodedData: '', isDirect: false };
  const hash = window.location.hash;
  const search = window.location.search;
  const pathname = window.location.pathname;
  let slug = '';
  let encodedData = '';

  if (search.includes('album=')) {
    const params = new URLSearchParams(search);
    slug = params.get('album') || '';
    encodedData = params.get('d') || '';
  } else if (search.includes('album_id=')) {
    const params = new URLSearchParams(search);
    slug = params.get('album_id') || '';
  } else if (hash.includes('album-')) {
    slug = hash.split('album-')[1].split('?')[0].split('&')[0];
  } else if (hash.includes('album/')) {
    slug = hash.split('album/')[1].split('?')[0].split('&')[0];
  } else if (pathname.includes('/album/')) {
    slug = pathname.split('/album/')[1].split('?')[0].split('&')[0];
  }

  return {
    slug,
    encodedData,
    isDirect: Boolean(slug)
  };
};

  // Digital Album Platform State
  const [activeAlbum, setActiveAlbum] = useState<DigitalAlbum | null>(() => {
    const { slug, encodedData } = parseAlbumFromLocation();
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    let found = albumService.getAlbumBySlug(cleanSlug) || albumService.getAlbumBySlug(slug);
    if (!found && encodedData) {
      found = decodeAlbumFromUrl(encodedData) || undefined;
    }
    return found || null;
  });

  const [qrModalAlbum, setQrModalAlbum] = useState<DigitalAlbum | null>(null);
  const [isDirectAlbumLink, setIsDirectAlbumLink] = useState<boolean>(() => {
    const { isDirect } = parseAlbumFromLocation();
    return isDirect;
  });

  // URL Hash & Query Deep-Linking for Direct Shareable Album Links (e.g. /?album=nikhil-priyanka)
  useEffect(() => {
    let isMounted = true;

    const handleHashChange = async () => {
      const { slug, encodedData, isDirect } = parseAlbumFromLocation();
      if (!isDirect || !slug) {
        if (isMounted) setIsDirectAlbumLink(false);
        return;
      }

      const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

      // 1. Immediate synchronous fallback check from local memory / demo albums
      let localFound = albumService.getAlbumBySlug(cleanSlug) || albumService.getAlbumBySlug(slug);
      if (!localFound && encodedData) {
        localFound = decodeAlbumFromUrl(encodedData) || undefined;
      }

      if (localFound && isMounted) {
        setActiveAlbum(localFound);
        setIsDirectAlbumLink(true);
      }

      // 2. Fetch 24/7 Supabase Cloud Database with fast sub-50ms single lookup
      try {
        let matched = await apiClient.getAlbumBySlug(cleanSlug);
        if (!matched && isMounted) {
          const cloudAlbums = await apiClient.getAlbums();
          if (cloudAlbums && Array.isArray(cloudAlbums)) {
            matched = cloudAlbums.find((a: any) => {
              const s = (a.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
              const c = (a.couple || '').toLowerCase().replace(/[^a-z0-9]/g, '');
              const i = (a.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
              return s === cleanSlug || c === cleanSlug || i === cleanSlug || i === `album${cleanSlug}` || cleanSlug.includes(s) || s.includes(cleanSlug);
            });
          }
        }

        if (matched && isMounted) {
          // Cache in localStorage for instant 0ms access on next visit
          try {
            const stored = localStorage.getItem('kd_digital_albums_v9');
            const existing = stored ? JSON.parse(stored) : [];
            const idx = existing.findIndex((a: any) => a.id === matched.id || a.slug === matched.slug);
            if (idx >= 0) existing[idx] = matched;
            else existing.unshift(matched);
            localStorage.setItem('kd_digital_albums_v9', JSON.stringify(existing));
          } catch (e) {}

          setActiveAlbum((prev) => {
            if (prev && prev.id === matched.id && JSON.stringify(prev.pages) === JSON.stringify(matched.pages)) {
              return prev;
            }
            return matched;
          });
          setIsDirectAlbumLink(true);
        }
      } catch (err) {
        console.warn('Could not sync cloud album in background:', err);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      isMounted = false;
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Visitor / Client Authentication State
  const [isClientAuthOpen, setIsClientAuthOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [loggedInClient, setLoggedInClient] = useState<{
    name: string;
    email: string;
    weddingDate?: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('kd_client_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [videoModalState, setVideoModalState] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({ isOpen: false, url: '', title: '' });

  // Handle Client Auth & Dashboard Access
  const handleOpenClientAuth = () => {
    if (loggedInClient) {
      setIsClientPortalOpen(true);
    } else {
      setIsClientAuthOpen(true);
    }
  };

  const handleClientLoginSuccess = (clientInfo: { name: string; email: string; weddingDate?: string }) => {
    setLoggedInClient(clientInfo);
    try {
      localStorage.setItem('kd_client_user', JSON.stringify(clientInfo));
    } catch (e) {
      console.warn('Could not store client session', e);
    }
    setIsClientAuthOpen(false);
    setIsClientPortalOpen(true);
  };

  const handleClientLogout = () => {
    setLoggedInClient(null);
    try {
      localStorage.removeItem('kd_client_user');
    } catch (e) {
      console.warn('Could not clear client session', e);
    }
    setIsClientPortalOpen(false);
  };

  // Handle Action Trigger: smoothly scroll to contact inquiry form
  const handleOpenLeadForm = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    scrollToSection('contact');
  };


  // Handle Admin Lead Access Trigger (Checks Auth first)
  const handleOpenAdminAccess = () => {
    if (isAdminAuthenticated) {
      setIsAdminPortalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('kd_admin_auth', 'true');
    setIsLoginModalOpen(false);
    setIsAdminPortalOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('kd_admin_auth');
    setIsAdminPortalOpen(false);
  };

  // Global Private Admin Triggers: Ctrl + Shift + A or secret URL parameter (?admin=true or ?vault=true)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || urlParams.get('vault') === 'true' || window.location.hash === '#admin-vault') {
      handleOpenAdminAccess();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleOpenAdminAccess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenVideoModal = (url: string, title: string) => {
    setVideoModalState({ isOpen: true, url, title });
  };

  // Real-Time Scroll Reactive Physics Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Standalone Direct 3D E-Album Viewer Page (When accessed via QR or direct album URL)
  if (isDirectAlbumLink) {
    if (!activeAlbum) {
      return (
        <div className="fixed inset-0 bg-[#0A0103] flex flex-col items-center justify-center text-gold z-[999999] p-6 text-center">
          <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
          <span className="text-sm font-serif-luxury tracking-[0.25em] uppercase text-gold font-bold">
            KD CREATION
          </span>
          <span className="text-[11px] font-mono text-[#F5F2EB]/60 mt-1.5 tracking-wider">
            OPENING 4K ULTRA-HD PHOTOBOOK...
          </span>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-[#0F0204] text-[#F5F2EB] z-[999999] overflow-hidden">
        <Suspense fallback={
          <div className="fixed inset-0 bg-[#0F0204] flex flex-col items-center justify-center text-gold">
            <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-3 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
            <span className="text-xs font-serif-luxury tracking-widest uppercase">Opening 4K Photobook Atelier...</span>
          </div>
        }>
          <DigitalAlbumViewerModal
            album={activeAlbum}
            isOpen={true}
            isQrAccess={true}
            onClose={() => {
              setActiveAlbum(null);
              setIsDirectAlbumLink(false);
              window.history.pushState('', document.title, window.location.pathname);
            }}
            onOpenQrCode={(album) => setQrModalAlbum(album)}
          />

          {qrModalAlbum && (
            <QrCodeModal
              album={qrModalAlbum}
              isOpen={!!qrModalAlbum}
              onClose={() => setQrModalAlbum(null)}
            />
          )}
        </Suspense>
      </div>
    );
  }

  // Render Dedicated SEO Landing Pages if URL matches
  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isWeddingPhotographerPage = currentPath.includes('wedding-photographer-ahmedabad') || currentPath.includes('wedding-photography');
  const isCandidPage = currentPath.includes('candid-wedding-photographer') || currentPath.includes('candid-photography');
  const isPreWeddingPage = currentPath.includes('pre-wedding-photographer-ahmedabad') || currentPath.includes('pre-wedding-photography');
  const isVideographerPage = currentPath.includes('wedding-videographer-ahmedabad') || currentPath.includes('cinematic-wedding-photography') || currentPath.includes('cinematic-films') || currentPath.includes('wedding-cinematography');
  const isDestinationPage = currentPath.includes('destination-wedding-photographer-gujarat') || currentPath.includes('destination-weddings');
  const isCostPage = currentPath.includes('wedding-photography-cost-ahmedabad') || currentPath.includes('packages') || currentPath.includes('pricing');
  const isRealWeddingBelvederePage = currentPath.includes('real-weddings') || currentPath.includes('royal-belvedere');
  const isBelvedereVenuePage = !isRealWeddingBelvederePage && currentPath.includes('belvedere');
  const isTajSkylineVenuePage = currentPath.includes('taj-skyline');
  const isGladeOneVenuePage = currentPath.includes('glade-one');
  const isGulmoharVenuePage = currentPath.includes('gulmohar');
  const isBlogPreWeddingPage = currentPath.includes('pre-wedding-shoot-locations') || currentPath.includes('shoot-locations');
  const isAnamorphicPalacePage = currentPath.includes('4k-anamorphic') || currentPath.includes('anamorphic') || currentPath.includes('palace-cinema');
  const isBridalPage = currentPath.includes('bridal-portraits') || currentPath.includes('bridal');
  const isDronePage = currentPath.includes('drone-wedding-photography') || currentPath.includes('drone');
  const isAlbumPage = currentPath.includes('luxury-wedding-albums') || currentPath.includes('wedding-albums');
  const isAnamorphicCostPage = currentPath.includes('anamorphic-4k-wedding-videography-cost-gujarat') || currentPath.includes('videography-cost') || currentPath.includes('cinematography-cost');

  return (
    <div className="relative min-h-screen bg-obsidian text-champagne font-sans overflow-x-hidden">
      {/* Real-Time Luxury Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-light via-gold to-[#A38136] z-[999999] origin-left shadow-[0_0_12px_rgba(212,175,55,0.85)]"
        style={{ scaleX }}
      />

      {/* 1. Cinematic Loading Screen Overlay */}
      <LoadingScreen />

      {/* 2. Custom Magnetic Desktop Cursor */}
      <CustomCursor />

      {/* 3. Glass Header Navbar */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenLeadForm={() => handleOpenLeadForm()}
        onOpenClientAuth={handleOpenClientAuth}
        loggedInClient={loggedInClient}
        onNavigateHome={navigateHome}
      />

      {/* Render Dedicated Sub-Page or Main SPA Flow with Suspense for Zero Initial Blocking */}
      <Suspense fallback={
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center text-gold">
          <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-3" />
          <span className="text-xs font-serif-luxury tracking-widest uppercase">Loading KD Creation Atelier...</span>
        </div>
      }>
        {isWeddingPhotographerPage ? (
          <WeddingPhotographerAhmedabad
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Wedding Photography')}
          />
        ) : isCandidPage ? (
          <CandidWeddingPhotographerAhmedabad
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Candid Photography')}
          />
        ) : isPreWeddingPage ? (
          <PreWeddingPhotographerAhmedabad
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Pre-Wedding Shoot')}
          />
        ) : isVideographerPage ? (
          <WeddingVideographerAhmedabad
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Wedding Videography')}
          />
        ) : isDestinationPage ? (
          <DestinationWeddingGujarat
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Destination Wedding')}
          />
        ) : isCostPage ? (
          <WeddingPhotographyCostAhmedabad
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Packages & Price Guide')}
          />
        ) : isRealWeddingBelvederePage ? (
          <RealWeddingBelvedereCaseStudy
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Belvedere Real Wedding Case Study')}
          />
        ) : isBelvedereVenuePage ? (
          <VenueBelvedereClub
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Belvedere Club Wedding')}
          />
        ) : isTajSkylineVenuePage ? (
          <VenueTajSkyline
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Taj Skyline Wedding')}
          />
        ) : isGladeOneVenuePage ? (
          <VenueGladeOne
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Glade One Resort Wedding')}
          />
        ) : isGulmoharVenuePage ? (
          <VenueGulmoharGreens
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Gulmohar Greens Wedding')}
          />
        ) : isBlogPreWeddingPage ? (
          <BlogPreWeddingLocationsGujarat
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Pre-Wedding Locations Shoot')}
          />
        ) : isAnamorphicPalacePage ? (
          <AnamorphicPalaceCinematography
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('4K Anamorphic Palace Cinematography')}
          />
        ) : isBridalPage ? (
          <BridalPortraitsAhmedabad
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Bridal Portrait Session')}
          />
        ) : isDronePage ? (
          <DroneWeddingPhotography
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Drone Wedding Coverage')}
          />
        ) : isAlbumPage ? (
          <LuxuryWeddingAlbums
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Heirloom Wedding Album')}
          />
        ) : isAnamorphicCostPage ? (
          <AnamorphicWeddingVideographyCostGujarat
            onBackToHome={navigateHome}
            onOpenBooking={() => handleOpenLeadForm('Anamorphic 4K Videography Cost Proposal')}
          />
        ) : (
          <>
            {/* 4. Fullscreen 3D Hero Section */}
            <HeroSection
              onExploreStories={() => scrollToSection('stories')}
              onStartStory={() => handleOpenLeadForm()}
              onOpenVideoModal={handleOpenVideoModal}
            />

            {/* 5. Portfolio Stories Section */}
            <SelectedStories
              onStartStory={() => handleOpenLeadForm()}
              onPlayVideo={handleOpenVideoModal}
            />

            {/* 6. Signature Services Section */}
            <ServicesSection onSelectService={handleOpenLeadForm} />

            {/* 7. Cinema Showreel Showcase */}
            <CinemaSection
              onOpenVideoModal={handleOpenVideoModal}
              onStartStory={() => handleOpenLeadForm()}
            />

            {/* 8. Studio Philosophy & About Section */}
            <AboutSection />

            {/* 9. Founders & Executive Leadership Section */}
            <FoundersSection />

            {/* 10. Why KD Creation Showcase */}
            <WhyKdCreation />

            {/* 11. Process & Timeline Section */}
            <ProcessTimeline />

            {/* 12. Testimonials Showcase */}
            <Testimonials />

            <FaqSection />

            {/* 13. Instagram Live Feed */}
            <InstagramFeed />

            {/* 14. Lead Inquiry Form Section */}
            <LeadFormSection preselectedService={selectedService} />
          </>
        )}
      </Suspense>

      {/* 15. Footer with Brand Credits & Admin Lead Access */}
      <Footer onOpenAdminPortal={handleOpenAdminAccess} />

      {/* 16. Sticky Quick Lead Action Floating Bar */}
      <StickyLeadCtas
        onOpenLeadForm={() => handleOpenLeadForm()}
      />

      {/* 17. Lazy Loaded Overlays & Modals */}
      <Suspense fallback={null}>
        <KdAiChatbot
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          onOpenLeadForm={() => handleOpenLeadForm()}
        />

        <VideoModal
          isOpen={videoModalState.isOpen}
          videoUrl={videoModalState.url}
          title={videoModalState.title}
          onClose={() => setVideoModalState({ isOpen: false, url: '', title: '' })}
        />

        <ClientAuthModal
          isOpen={isClientAuthOpen}
          onClose={() => setIsClientAuthOpen(false)}
          onLoginSuccess={handleClientLoginSuccess}
        />

        <ClientPortalModal
          isOpen={isClientPortalOpen}
          clientInfo={loggedInClient}
          onClose={() => setIsClientPortalOpen(false)}
          onLogout={handleClientLogout}
          onOpenVideoModal={handleOpenVideoModal}
        />

        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        <AdminLeadPortal
          isOpen={isAdminPortalOpen}
          onClose={() => setIsAdminPortalOpen(false)}
          onLogout={handleAdminLogout}
          onOpenQrCode={(album) => setQrModalAlbum(album)}
          onSelectAlbum={(album) => setActiveAlbum(album)}
        />

        {/* 18. Digital Album Viewer & QR Code Modals */}
        <DigitalAlbumViewerModal
          album={activeAlbum}
          isOpen={!!activeAlbum}
          onClose={() => {
            setActiveAlbum(null);
            if (window.location.hash.startsWith('#album-')) {
              window.history.pushState('', document.title, window.location.pathname + window.location.search);
            }
          }}
          onOpenQrCode={(album) => setQrModalAlbum(album)}
        />

        {qrModalAlbum && (
          <QrCodeModal
            album={qrModalAlbum}
            isOpen={!!qrModalAlbum}
            onClose={() => setQrModalAlbum(null)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
