import React, { useEffect, useRef, useState } from 'react';

/**
 * SLEEK MODERN MAGNETIC CURSOR
 * 
 * Smooth, floating glow ring + crisp center dot.
 * Expands gently on interactive elements.
 * Desktop only (hidden on touch devices).
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [cursorState, setCursorState] = useState({ label: '', hovered: false, active: false });
  const mousePos = useRef({ x: -100, y: -100, currentX: -100, currentY: -100 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchDevice.current = true;
      return;
    }

    document.body.classList.add('custom-cursor-active');

    let animationFrameId;

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!cursorState.active) {
        setCursorState((prev) => ({ ...prev, active: true }));
      }
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], button, a, input, select');
      if (target) {
        const customLabel = target.getAttribute('data-cursor') || '';
        setCursorState({ label: customLabel, hovered: true, active: true });
      } else {
        setCursorState({ label: '', hovered: false, active: true });
      }
    };

    const onMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, active: false }));
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);

    const updateLoop = () => {
      // Smooth lerp for trailing ring
      mousePos.current.currentX += (mousePos.current.x - mousePos.current.currentX) * 0.16;
      mousePos.current.currentY += (mousePos.current.y - mousePos.current.currentY) * 0.16;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.currentX}px, ${mousePos.current.currentY}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice.current) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          cursorState.active ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>

      {/* Modern Soft Trailing Glow Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300 ${
          cursorState.active ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`relative transition-all duration-300 flex items-center justify-center rounded-full ${
            cursorState.hovered
              ? 'w-12 h-12 -ml-6 -mt-6 border border-indigo-400/50 bg-indigo-500/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(99,102,241,0.25)]'
              : 'w-8 h-8 -ml-4 -mt-4 border border-white/20 bg-transparent'
          }`}
        >
          {cursorState.label && (
            <span className="absolute left-10 whitespace-nowrap bg-black/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[10px] font-sans font-medium text-white shadow-lg">
              {cursorState.label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
