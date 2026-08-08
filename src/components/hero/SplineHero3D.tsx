import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import * as THREE from 'three';
import { SITE_CONFIG } from '../../config/siteConfig';

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

  // Unique Interactive 3D Royal Maroon Canvas for Hero Page
  useEffect(() => {
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

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    } catch (e) {
      console.warn("WebGL renderer creation warning:", e);
      return;
    }

    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // 1. Dual Interlocking 24k Gold Wedding Rings
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      emissive: 0x4a0e17,
    });

    const ring1Geo = new THREE.TorusGeometry(1.8, 0.22, 32, 100);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 4;
    ring1.rotation.y = Math.PI / 6;
    heroGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.4, 0.16, 32, 100);
    const ring2Mat = new THREE.MeshPhysicalMaterial({
      color: 0xf3e5ab,
      metalness: 0.95,
      roughness: 0.05,
      clearcoat: 1.0,
      emissive: 0x3b0811,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = -Math.PI / 4;
    ring2.position.set(0.6, -0.2, 0.3);
    heroGroup.add(ring2);

    // 2. Outer Floating Camera Lens Ring
    const apertureGeo = new THREE.RingGeometry(2.5, 2.54, 64);
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
    const particleCount = window.innerWidth < 768 ? 200 : 600;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 18;
      posArray[i + 1] = (Math.random() - 0.5) * 18;
      posArray[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xf3e5ab,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Dynamic Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const goldLight1 = new THREE.PointLight(0xd4af37, 4, 25);
    goldLight1.position.set(5, 6, 5);
    scene.add(goldLight1);

    const wineLight = new THREE.PointLight(0x5a121f, 5, 25);
    wineLight.position.set(-5, -5, -2);
    scene.add(wineLight);

    // Mouse Parallax Logic
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Logic
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !renderer) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight || 1;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate 3D Geometries
      ring1.rotation.z = elapsedTime * 0.2;
      ring1.rotation.x = Math.PI / 4 + Math.sin(elapsedTime * 0.3) * 0.2 + targetY * 0.4;

      ring2.rotation.z = -elapsedTime * 0.25;
      ring2.rotation.y = -Math.PI / 4 + Math.cos(elapsedTime * 0.3) * 0.2 + targetX * 0.4;

      apertureRing.rotation.z = elapsedTime * 0.08;

      particles.rotation.y = elapsedTime * 0.03;

      // Camera motion
      camera.position.x = targetX * 1.2;
      camera.position.y = -targetY * 1.2 - scrollY * 0.002;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Spline 3D Scene Container */}
      {!splineError && (
        <div className="absolute inset-0 z-10 opacity-90 transition-opacity duration-1000 pointer-events-auto">
          <SafeSpline
            scene={SITE_CONFIG.SPLINE_SCENE_URL}
            onLoad={() => setSplineLoaded(true)}
            onError={() => setSplineError(true)}
          />
        </div>
      )}

      {/* WebGL 3D Canvas Fallback & Ambient Gold Glow Layer */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full absolute inset-0 z-0 transition-opacity duration-1000 ${
          splineLoaded ? 'opacity-40' : 'opacity-100'
        }`}
      />

      {/* Royal Maroon & Gold Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#33060D]/90 via-[#4A0E17]/40 to-[#33060D] z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-[#33060D]/80 to-[#33060D] z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#33060D]/90 via-transparent to-[#33060D]/90 z-20 pointer-events-none" />
    </div>
  );
};
