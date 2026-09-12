/**
 * Performance & Hardware Detection Utilities
 * Detects low-spec machines, older devices, budget smartphones, and power-saving modes
 * to dynamically adjust graphics, animations, and resource consumption.
 */

export interface DevicePerformanceProfile {
  isLowEnd: boolean;
  isMobile: boolean;
  maxPixelRatio: number;
  enableHeavy3D: boolean;
  particleCount: number;
  enableBlur: boolean;
  reducedMotion: boolean;
}

// Cached profile to prevent continuous re-checks
let cachedProfile: DevicePerformanceProfile | null = null;

export const getDevicePerformanceProfile = (): DevicePerformanceProfile => {
  if (cachedProfile) return cachedProfile;

  if (typeof window === 'undefined') {
    return {
      isLowEnd: false,
      isMobile: false,
      maxPixelRatio: 1,
      enableHeavy3D: false,
      particleCount: 50,
      enableBlur: false,
      reducedMotion: false,
    };
  }

  const isMobile =
    window.innerWidth < 768 ||
    ('ontouchstart' in window && window.innerWidth < 1024) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // CPU cores check (<= 4 cores is typical for older / budget hardware)
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isLowCpu = hardwareConcurrency <= 4;

  // RAM check (<= 4GB is typical for low-spec systems)
  const deviceMemory = (navigator as any).deviceMemory || 8;
  const isLowRam = deviceMemory <= 4;

  // Data saver mode
  const connection = (navigator as any).connection;
  const isSaveData = connection?.saveData === true;
  const isSlowNetwork = connection?.effectiveType === '2g' || connection?.effectiveType === '3g';

  // User preference for reduced motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isLowEnd = isMobile || isLowCpu || isLowRam || isSaveData || isSlowNetwork || reducedMotion;

  // On low-end systems, cap pixel ratio to 1.0 (saving 75% GPU pixels on 2x/3x screens!)
  const maxPixelRatio = isLowEnd ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.75);

  // Only enable heavy 3D (like remote Spline runtime) on high-spec desktops
  const enableHeavy3D = !isLowEnd && !isMobile && hardwareConcurrency >= 8 && deviceMemory >= 8;

  const particleCount = isLowEnd ? 40 : 180;
  const enableBlur = !isLowEnd && !reducedMotion;

  cachedProfile = {
    isLowEnd,
    isMobile,
    maxPixelRatio,
    enableHeavy3D,
    particleCount,
    enableBlur,
    reducedMotion,
  };

  return cachedProfile;
};

/**
 * Helper to check if low-end mode is active
 */
export const isLowEndSystem = (): boolean => {
  return getDevicePerformanceProfile().isLowEnd;
};
