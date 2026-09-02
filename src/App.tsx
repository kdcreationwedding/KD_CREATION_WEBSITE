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

import { DigitalAlbumsShowcase } from './components/albums/DigitalAlbumsShowcase';
import { DigitalAlbumViewerModal } from './components/albums/DigitalAlbumViewerModal';
import { QrCodeModal } from './components/albums/QrCodeModal';
import { DigitalAlbum } from './types/album';
import { albumService, decodeAlbumFromUrl } from './services/albumService';
import { SITE_CONFIG } from './config/siteConfig';

// Dedicated SEO Landing Pages
import { WeddingPhotographerAhmedabad } from './pages/WeddingPhotographerAhmedabad';
import { PreWeddingPhotographerAhmedabad } from './pages/PreWeddingPhotographerAhmedabad';

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

  // Digital Album Platform State
  const [activeAlbum, setActiveAlbum] = useState<DigitalAlbum | null>(null);
  const [qrModalAlbum, setQrModalAlbum] = useState<DigitalAlbum | null>(null);
  const [isDirectAlbumLink, setIsDirectAlbumLink] = useState(false);

  // URL Hash & Query Deep-Linking for Direct Shareable Album Links (e.g. /?album=yash-kavya)
  useEffect(() => {
    const handleHashChange = async () => {
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

      if (slug) {
        const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

        // 1. Try 24/7 Supabase Cloud Database first for instant multi-device sync
        const cloudAlbums = await apiClient.getAlbums();
        if (cloudAlbums && Array.isArray(cloudAlbums) && cloudAlbums.length > 0) {
          const matched = cloudAlbums.find((a: any) => {
            const s = (a.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const c = (a.couple || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const i = (a.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            return s === cleanSlug || c === cleanSlug || i === cleanSlug || i === `album${cleanSlug}` || cleanSlug.includes(s) || s.includes(cleanSlug);
          });

          if (matched) {
            albumService.saveAlbum(matched);
            setActiveAlbum(matched);
            setIsDirectAlbumLink(true);
            return;
          }
        }

        // 2. Fallback to local memory / demo albums
        let found = albumService.getAlbumBySlug(slug);
        if (!found && encodedData) {
          found = decodeAlbumFromUrl(encodedData) || undefined;
        }

        if (found) {
          setActiveAlbum(found);
          setIsDirectAlbumLink(true);
        }
      } else {
        setIsDirectAlbumLink(false);
      }
    };

    handleHashChange();
    const unsubscribe = albumService.subscribe(handleHashChange);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      unsubscribe();
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

  // Handle Action Trigger: require login before opening inquiry form
  const handleOpenLeadForm = (serviceName?: string) => {
    if (!loggedInClient) {
      setIsClientAuthOpen(true);
      return;
    }
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
  if (isDirectAlbumLink && activeAlbum) {
    return (
      <div className="fixed inset-0 bg-[#0F0204] text-[#F5F2EB] z-[999999] overflow-hidden">
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
      </div>
    );
  }

  // Render Dedicated SEO Landing Pages if URL matches
  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isWeddingPhotographerPage = currentPath.includes('wedding-photographer-ahmedabad') || currentPath.includes('candid-wedding-photographer');
  const isPreWeddingPage = currentPath.includes('pre-wedding-photographer-ahmedabad');

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
      />

      {/* Render Dedicated Sub-Page or Main SPA Flow */}
      {isWeddingPhotographerPage ? (
        <WeddingPhotographerAhmedabad
          onBackToHome={navigateHome}
          onOpenBooking={() => handleOpenLeadForm('Wedding Photography')}
        />
      ) : isPreWeddingPage ? (
        <PreWeddingPhotographerAhmedabad
          onBackToHome={navigateHome}
          onOpenBooking={() => handleOpenLeadForm('Pre-Wedding Shoot')}
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
      </Suspense>

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
    </div>
  );
};

export default App;
