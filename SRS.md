# Software Requirements Specification (SRS)
## Project Name: KD CREATION 4K Cinema & Luxury Wedding Web Application
**Document Version:** 1.0.0  
**Date:** August 11, 2026  
**Status:** Approved & Implemented  
**Client/Brand:** KD CREATION (Ahmedabad, Gujarat, India)  

---

## 1. Introduction & Executive Summary

### 1.1 Purpose
This Software Requirements Specification (SRS) defines the comprehensive architectural, functional, and non-functional requirements for the **KD CREATION** luxury 4K wedding cinematography and editorial photography web application.

### 1.2 System Purpose
The primary objective of this web application is to showcase KD CREATION's ultra-premium wedding portfolio, cinema showreels, fine-art photography, and bespoke services with a 3D interactive luxury aesthetic while driving high-converting client lead generation.

### 1.3 Scope
The system encompasses:
- Interactive 3D Spline & Three.js Canvas Hero Experience.
- Cinema Showreel Showcase with high-performance 4K YouTube embeds.
- Bespoke Services Directory with interactive hover image cross-fading.
- VIP Client Portal with authentication & personalized wedding dashboards.
- Protected Admin Lead Vault accessed via global keyboard shortcut (`Ctrl + Shift + A`).
- AI-Powered Wedding Consultant Chatbot for instant inquiry assistance.
- Multi-cloud deployment pipelines supporting GitHub Pages and Vercel.

---

## 2. Technology Stack & System Architecture

### 2.1 Core Frameworks & Libraries
- **Frontend Core**: React 18 (TypeScript), Vite 6.
- **Styling Design System**: Vanilla TailwindCSS with custom HSL luxury color tokens (`obsidian`, `gold`, `champagne`, `burgundy`).
- **3D & Canvas Graphics**: `@splinetool/react-spline`, `@splinetool/runtime`, `three` (Three.js WebGL Renderer).
- **Animations & Micro-Interactions**: `framer-motion` (Spring physics & exit transitions).
- **Icons**: `lucide-react`.

### 2.2 Performance & Bundling Strategy
- **Code Splitting**: Dynamic `React.lazy()` and `<Suspense>` for modal overlays and portals.
- **Vendor Chunking**: Rollup `manualChunks` separation (`vendor-react`, `vendor-framer`, `vendor-icons`, `vendor-three`).
- **Content Hashing**: Immutable browser disk caching via `assets/[name].[hash].js`.
- **Smart Asset Resolution**: `getAssetUrl` helper enforcing `import.meta.env.BASE_URL` compatibility.

---

## 3. Functional Requirements

### 3.1 Hero Section & 3D Interactive Canvas
- **FR-1.1**: Render a full-screen interactive 3D WebGL royal maroon particle canvas with camera mouse-tracking.
- **FR-1.2**: Display luxury gold typography with spring animations for brand slogans and CTAs.

### 3.2 Portfolio & Selected Stories Showcase
- **FR-2.1**: Interactive wedding story cards showcasing couple names, locations, and high-resolution fine-art galleries.
- **FR-2.2**: Fullscreen modal lightboxes displaying couple stories, behind-the-scenes film notes, and high-definition photo grids.

### 3.3 Cinema Showreel & YouTube Integration
- **FR-3.1**: Display couple cinema reels (Yash & Kavya, Dhaval & Sangeeta, Kaushik & Anjali).
- **FR-3.2**: Utilize high-performance YouTube iframe embeds (`youtube-nocookie.com/embed/`) inside the Video Modal for 4K streaming playback without hosting overhead.

### 3.4 Bespoke Services Directory
- **FR-4.1**: 6 Core offerings (Wedding Photography, Wedding Cinematography, Pre-Wedding Films, Wedding Reels, Luxury Heirloom Albums, Complete Wedding Coverage).
- **FR-4.2**: Dual-image hover cross-fade effect allowing visitors to preview alternate couple portraits on hover.

### 3.5 Visitor & VIP Client Authentication
- **FR-5.1**: Gated lead inquiry submission requiring visitor login/sign-up.
- **FR-5.2**: Client Portal modal featuring personalized wedding countdowns, deliverables status, and custom project galleries.

### 3.6 Secret Admin Lead Vault
- **FR-6.1**: Hidden from public footer navigation for security.
- **FR-6.2**: Triggered via global keyboard shortcut (`Ctrl + Shift + A` / `Cmd + Shift + A`).
- **FR-6.3**: Secured with admin credential verification storing session auth (`sessionStorage`).
- **FR-6.4**: Real-time management of client leads, inquiry filtering, and status updates.

### 3.7 AI Wedding Consultant Chatbot
- **FR-7.1**: Floating AI assistant providing interactive Q&A on pricing, availability, and packages.
- **FR-7.2**: Quick actions for booking consultations and opening the lead inquiry form.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Latency
- **NFR-1.1**: Initial main JavaScript bundle size under 250 KB (compressed gzip < 75 KB).
- **NFR-1.2**: First Contentful Paint (FCP) < 1.0s.
- **NFR-1.3**: Zero perceptible font flicker using `font-display: swap` and Google Fonts preconnecting.

### 4.2 Security & Privacy
- **NFR-2.1**: Sanitize all client input fields to prevent XSS.
- **NFR-2.2**: Admin portal hidden from public UI DOM elements.
- **NFR-2.3**: Exclude large local video binaries via `.vercelignore` to protect repository integrity.

### 4.3 Responsiveness & Compatibility
- **NFR-3.1**: Fully responsive layout optimized for Mobile (320px+), Tablet (768px+), Laptop (1024px+), and 4K Displays (2560px+).
- **NFR-3.2**: Support for Chrome, Safari, Edge, Firefox, and mobile WebKit browsers.

---

## 5. Deployment & CI/CD Pipelines

### 5.1 GitHub Pages Pipeline
- **Branch**: `gh-pages` (dist distribution).
- **Base Path**: `/WEBSITE/`.
- **Command**: `npm run deploy` (`npx gh-pages -d dist`).

### 5.2 Vercel Production Pipeline
- **Project Name**: `kd-creation-3d`
- **Branch**: `main`
- **Production URL**: `https://kd-creation-3d.vercel.app`
- **Base Path**: `/`

---

## 6. Document Sign-Off
- **Author**: Antigravity AI Engineering
- **Approved By**: KD CREATION Leadership
