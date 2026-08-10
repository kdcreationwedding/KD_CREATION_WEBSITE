import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ServicesSection } from './components/services/ServicesSection';
import { SelectedStories } from './components/portfolio/SelectedStories';
import { CinemaSection } from './components/video/CinemaSection';
import { VideoModal } from './components/video/VideoModal';
import { AboutSection } from './components/studio/AboutSection';
import { FoundersSection } from './components/studio/FoundersSection';
import { WhyKdCreation } from './components/studio/WhyKdCreation';
import { ProcessTimeline } from './components/studio/ProcessTimeline';
import { Testimonials } from './components/studio/Testimonials';
import { InstagramFeed } from './components/studio/InstagramFeed';
import { LeadFormSection } from './components/forms/LeadFormSection';
import { StickyLeadCtas } from './components/forms/StickyLeadCtas';
import { KdAiChatbot } from './components/chatbot/KdAiChatbot';
import { ExitIntentModal } from './components/exitIntent/ExitIntentModal';
import { Footer } from './components/layout/Footer';
import { AdminLeadPortal } from './components/admin/AdminLeadPortal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { ClientAuthModal } from './components/client/ClientAuthModal';
import { ClientPortalModal } from './components/client/ClientPortalModal';

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

  // Handle Action Trigger: Prompt Login Modal if visitor is not logged in!
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

  // Global Keyboard Shortcut: Ctrl + Shift + A or Cmd + Shift + A to open Admin Leads Access
  useEffect(() => {
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
        onExploreStories={() => {
          if (!loggedInClient) {
            setIsClientAuthOpen(true);
          } else {
            scrollToSection('stories');
          }
        }}
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

      {/* 17. AI Wedding Consultant Chatbot */}
      <KdAiChatbot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onOpenLeadForm={() => handleOpenLeadForm()}
      />

      {/* 18. Exit-Intent Smart Lead Modal */}
      <ExitIntentModal onOpenLeadForm={() => handleOpenLeadForm()} />

      {/* 19. Fullscreen Video Lightbox Player */}
      <VideoModal
        isOpen={videoModalState.isOpen}
        videoUrl={videoModalState.url}
        title={videoModalState.title}
        onClose={() => setVideoModalState({ isOpen: false, url: '', title: '' })}
      />

      {/* 20. Visitor / Client Auth Login & Sign-Up Modal */}
      <ClientAuthModal
        isOpen={isClientAuthOpen}
        onClose={() => setIsClientAuthOpen(false)}
        onLoginSuccess={handleClientLoginSuccess}
      />

      {/* 21. Logged-In VIP Client Wedding Portal Dashboard */}
      <ClientPortalModal
        isOpen={isClientPortalOpen}
        clientInfo={loggedInClient}
        onClose={() => setIsClientPortalOpen(false)}
        onLogout={handleClientLogout}
        onOpenVideoModal={handleOpenVideoModal}
      />

      {/* 22. Admin Login Modal Screen */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 23. Secret Admin Lead Vault Portal Modal */}
      <AdminLeadPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />
    </div>
  );
};

export default App;
