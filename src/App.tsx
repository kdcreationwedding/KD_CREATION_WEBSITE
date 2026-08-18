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
import { InstagramFeed } from './components/studio/InstagramFeed';
import { LeadFormSection } from './components/forms/LeadFormSection';
import { StickyLeadCtas } from './components/forms/StickyLeadCtas';
import { Footer } from './components/layout/Footer';

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

      {/* 13. Instagram Live Feed */}
      <InstagramFeed />

      {/* 14. Lead Inquiry Form Section */}
      <LeadFormSection preselectedService={selectedService} />

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
        />
      </Suspense>
    </div>
  );
};

export default App;
