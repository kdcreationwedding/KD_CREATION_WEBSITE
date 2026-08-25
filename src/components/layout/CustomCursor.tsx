import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on mobile / touch devices for native touch behavior
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        // Input / Textarea check
        const isInputField =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable;
        setIsInput(isInputField);

        // Hover target check (buttons, links, interactive cards)
        const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor]');
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999999] overflow-hidden">
      {/* Premium Golden Outer Ring */}
      <motion.div
        className={`absolute rounded-full border transition-colors duration-200 ${
          isHovered
            ? 'border-gold bg-gold/15 shadow-[0_0_20px_rgba(212,175,55,0.45)]'
            : 'border-gold/60 bg-gold/5 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
        }`}
        animate={{
          x: position.x - (isInput ? 2 : isHovered ? 24 : 14),
          y: position.y - (isInput ? 16 : isHovered ? 24 : 14),
          width: isInput ? 4 : isHovered ? 48 : 28,
          height: isInput ? 32 : isHovered ? 48 : 28,
          borderRadius: isInput ? '4px' : '9999px',
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.15,
        }}
      />

      {/* Premium Precision Gold Core Dot */}
      {!isInput && (
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,55,1)]"
          animate={{
            x: position.x - 4,
            y: position.y - 4,
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.9 : 0.85,
          }}
          transition={{
            type: 'spring',
            damping: 45,
            stiffness: 900,
            mass: 0.05,
          }}
        />
      )}
    </div>
  );
};
