import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import * as THREE from 'three';
import { SITE_CONFIG } from '../../config/siteConfig';
import { getDevicePerformanceProfile } from '../../utils/performance';

// Safe Spline Error Boundary
class SafeSpline extends React.Component<
  { scene: string; onLoad: () => void; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('Spline 3D error, falling back to Three.js Canvas:', error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return (
      <Spline
        scene={this.props.scene}
        onLoad={this.props.onLoad}
        onError={this.props.onError}
      />
    );
  }
}

export const SplineHero3D: React.FC = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const profile = useRef(getDevicePerformanceProfile()).current;

  // Optimized Interactive 3D Royal Maroon Canvas for Hero Page
  useEffect(() => {
    // If Spline has loaded on high-end desktop, skip WebGL canvas to prevent double rendering
    if (splineLoaded) return;
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x33060d, 0.02);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight || 1,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !profile.isLowEnd,
        powerPreference: profile.isLowEnd ? 'low-power' : 'high-performance',
      });
      renderer.setPixelRatio(profile.maxPixelRatio);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    } catch (e) {
      console.warn('WebGL renderer creation warning:', e);
      return;
    }

    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // 1. Dual Interlocking 24k Gold Wedding Rings
    // Low-end uses lightweight StandardMaterial, high-end uses PhysicalMaterial
    const RingMaterialClass = profile.isLowEnd ? THREE.MeshStandardMaterial : THREE.MeshPhysicalMaterial;
    const ringMat = new RingMaterialClass({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x33060d,
    });

    // Lower geometry resolution on low-end systems (16x40 vs 32x100 = 75% fewer vertices)
    const ring1RadialSegs = profile.isLowEnd ? 16 : 24;
    const ring1TubularSegs = profile.isLowEnd ? 40 : 80;
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.22, ring1RadialSegs, ring1TubularSegs);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 4;
    ring1.rotation.y = Math.PI / 6;
    heroGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.4, 0.16, ring1RadialSegs, ring1TubularSegs);
    const ring2Mat = new RingMaterialClass({
      color: 0xf3e5ab,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x240409,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = -Math.PI / 4;
    ring2.position.set(0.6, -0.2, 0.3);
    heroGroup.add(ring2);

    // 2. Outer Floating Camera Lens Ring
    const apertureGeo = new THREE.RingGeometry(2.5, 2.54, profile.isLowEnd ? 32 : 64);
    const apertureMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const apertureRing = new THREE.Mesh(apertureGeo, apertureMat);
    apertureRing.position.set(0, 0, -1);
    heroGroup.add(apertureRing);

    // 3. Floating Gold Particles / Star Dust
    const particleCount = profile.particleCount;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 18;
      posArray[i + 1] = (Math.random() - 0.5) * 18;
      posArray[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: profile.isLowEnd ? 0.055 : 0.045,
      color: 0xf3e5ab,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Dynamic Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, profile.isLowEnd ? 0.8 : 0.5);
    scene.add(ambientLight);

    const goldLight1 = new THREE.PointLight(0xd4af37, 3, 20);
    goldLight1.position.set(5, 6, 5);
    scene.add(goldLight1);

    // Mouse Parallax Logic
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!profile.isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Scroll Logic
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !renderer) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight || 1;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Visibility management: Pause RAF when off-screen or tab hidden
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (canvas) observer.observe(canvas);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop with low-spec throttling
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let lastRenderTime = 0;
    const frameInterval = profile.isLowEnd ? 1000 / 45 : 1000 / 60; // 45fps cap on low-end to preserve CPU/battery

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || document.hidden) return;

      if (profile.isLowEnd && timestamp - lastRenderTime < frameInterval) {
        return;
      }
      lastRenderTime = timestamp;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate 3D Geometries
      ring1.rotation.z = elapsedTime * 0.18;
      ring1.rotation.x = Math.PI / 4 + Math.sin(elapsedTime * 0.25) * 0.15 + targetY * 0.3;

      ring2.rotation.z = -elapsedTime * 0.22;
      ring2.rotation.y = -Math.PI / 4 + Math.cos(elapsedTime * 0.25) * 0.15 + targetX * 0.3;

      apertureRing.rotation.z = elapsedTime * 0.07;
      particles.rotation.y = elapsedTime * 0.025;

      // Camera motion
      camera.position.x = targetX * 1.0;
      camera.position.y = -targetY * 1.0 - scrollY * 0.0015;
      camera.lookAt(scene.position);

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (!profile.isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer) {
        renderer.dispose();
        ring1Geo.dispose();
        ring2Geo.dispose();
        apertureGeo.dispose();
        particleGeo.dispose();
      }
    };
  }, [splineLoaded]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Spline 3D Scene Container - Interactive luxury 3D wedding scene */}
      {!splineError && (
        <div className="absolute inset-0 z-10 opacity-90 transition-opacity duration-1000 pointer-events-auto">
          <SafeSpline
            scene={SITE_CONFIG.SPLINE_SCENE_URL}
            onLoad={() => setSplineLoaded(true)}
            onError={() => setSplineError(true)}
          />
        </div>
      )}

      {/* WebGL 3D Canvas - Zero lag, optimized for every device tier */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full absolute inset-0 z-0 transition-opacity duration-1000 ${
          splineLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Royal Maroon & Gold Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#33060D]/90 via-[#4A0E17]/40 to-[#33060D] z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-[#33060D]/80 to-[#33060D] z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#33060D]/90 via-transparent to-[#33060D]/90 z-20 pointer-events-none" />
    </div>
  );
};
