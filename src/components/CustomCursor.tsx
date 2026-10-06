import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let mouseX = -200;
    let mouseY = -200;
    let glassX = -200;
    let glassY = -200;
    let hasMoved = false;
    let isFinePointerActive = false;
    let animationFrameId: number | null = null;

    const enableFineCursor = () => {
      if (!isFinePointerActive) {
        isFinePointerActive = true;
        document.documentElement.classList.add('custom-cursor-enabled');
      }
    };

    const disableFineCursor = () => {
      isFinePointerActive = false;
      document.documentElement.classList.remove('custom-cursor-enabled');
      setIsVisible(false);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    // Check primary media query on mount
    const fineMediaQuery = window.matchMedia('(pointer: fine)');
    if (fineMediaQuery.matches) {
      enableFineCursor();
    }

    const onPointerMove = (e: PointerEvent) => {
      // Touch interaction (phone/tablet screen finger touch)
      if (e.pointerType === 'touch') {
        disableFineCursor();
        return;
      }

      // Mouse or Stylus/Pen interaction (desktop, laptop, or mobile/tablet with OTG mouse/stylus)
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        enableFineCursor();
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!hasMoved) {
          hasMoved = true;
          glassX = mouseX;
          glassY = mouseY;
        }

        setIsVisible(true);

        // Immediate repositioning of precision optical bead
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

        // Start animation frame loop if not already running
        if (animationFrameId === null) {
          animationFrameId = requestAnimationFrame(render);
        }

        const target = e.target as HTMLElement | null;
        if (target) {
          const isInteractive = target.closest(
            'button, a, input, textarea, select, [role="button"], [data-cursor="pointer"], .ios-pressable, .liquid-glass, .glass-card, .frosted-squircle, .liquid-lens-capsule'
          );
          setIsHovering(!!isInteractive);
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        disableFineCursor();
        return;
      }
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        enableFineCursor();
        setIsClicking(true);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        disableFineCursor();
        return;
      }
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      if (isFinePointerActive && hasMoved) {
        setIsVisible(true);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Liquid glass outer follower with smooth spring damping
    const render = () => {
      if (isFinePointerActive && hasMoved) {
        glassX += (mouseX - glassX) * 0.28;
        glassY += (mouseY - glassY) * 0.28;

        if (glassRef.current) {
          glassRef.current.style.transform = `translate3d(${glassX}px, ${glassY}px, 0)`;
        }
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = null;
      }
    };

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, []);

  return (
    <>
      {/* Precision Center Optical Bead */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-200px, -200px, 0)' }}
      >
        <div
          className={`w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-150 ${
            isHovering ? 'scale-0' : 'bg-accent-cyan shadow-[0_0_10px_rgba(100,210,255,0.9),0_0_2px_rgba(0,0,0,0.5)]'
          }`}
        />
      </div>

      {/* Translucent Liquid Glass Optical Orb Follower */}
      <div
        ref={glassRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-200px, -200px, 0)' }}
      >
        <div
          className={`rounded-full backdrop-blur-[14px] saturate-[180%] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] flex items-center justify-center ${
            isHovering
              ? 'w-14 h-14 bg-accent-cyan/[0.14] dark:bg-accent-cyan/[0.12] border border-accent-cyan/60 dark:border-accent-cyan/50 shadow-[0_0_28px_rgba(100,210,255,0.45),inset_0_2px_3px_rgba(255,255,255,0.85)]'
              : 'w-10 h-10 bg-slate-900/[0.08] dark:bg-white/[0.08] border border-slate-900/20 dark:border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.2)]'
          } ${isClicking ? 'scale-85 brightness-125' : 'scale-100'}`}
        >
          {isHovering && (
            <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping opacity-80" />
          )}
        </div>
      </div>
    </>
  );
};
