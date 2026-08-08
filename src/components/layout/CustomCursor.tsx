import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on mobile / touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check target element
      const target = e.target as HTMLElement | null;
      if (target) {
        // Input check
        const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
        setIsInput(isInputField);

        // Hover target check
        const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        const isInteractive = target.closest('a, button, [role="button"], input, select, textarea');

        if (cursorAttr) {
          setCursorText(cursorAttr);
          setIsHovered(true);
        } else if (isInteractive) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999999] overflow-hidden">
      {/* Outer Magnetic Ring */}
      <motion.div
        className={`absolute rounded-full border border-gold/70 flex items-center justify-center transition-colors duration-300 ${
          isHovered ? 'bg-gold/20 border-gold backdrop-blur-[2px] shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-transparent'
        }`}
        animate={{
          x: position.x - (isInput ? 12 : isHovered ? 32 : 16),
          y: position.y - (isInput ? 20 : isHovered ? 32 : 16),
          width: isInput ? 4 : isHovered ? 64 : 32,
          height: isInput ? 40 : isHovered ? 64 : 32,
          borderRadius: isInput ? '4px' : '9999px',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.2,
        }}
      >
        {isHovered && cursorText && !isInput && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono tracking-widest font-extrabold text-white uppercase text-center px-1"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Glowing Gold Dot */}
      {!isInput && (
        <motion.div
          className="absolute w-2.5 h-2.5 bg-gold rounded-full shadow-[0_0_12px_rgba(212,175,55,1)]"
          animate={{
            x: position.x - 5,
            y: position.y - 5,
            opacity: isHovered ? 0.3 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 800,
            mass: 0.1,
          }}
        />
      )}
    </div>
  );
};
