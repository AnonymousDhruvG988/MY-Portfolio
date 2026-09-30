import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project' | 'security' | 'text'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if fine pointer is supported (desktop mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-enabled');
    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check context of hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest('[data-cursor="project"]');
      const securityTarget = target.closest('[data-cursor="security"]');
      const interactiveTarget = target.closest('button, a, input, textarea, [data-cursor="pointer"]');

      if (projectTarget) {
        setCursorType('project');
      } else if (securityTarget) {
        setCursorType('security');
      } else if (interactiveTarget) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Spring interpolation for outer reticle ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          backgroundColor: cursorType === 'security' ? '#FF5370' : cursorType === 'project' ? '#62D9FF' : '#7CFFB2',
          boxShadow: `0 0 10px ${cursorType === 'security' ? 'rgba(255,83,112,0.8)' : '#7CFFB2'}`,
        }}
      />

      {/* Dynamic Reticle Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-200 ease-out flex items-center justify-center ${
          isClicking ? 'scale-75' : 'scale-100'
        }`}
        style={{
          width: cursorType === 'project' ? '44px' : cursorType === 'security' ? '48px' : cursorType === 'hover' ? '36px' : '24px',
          height: cursorType === 'project' ? '44px' : cursorType === 'security' ? '48px' : cursorType === 'hover' ? '36px' : '24px',
          marginLeft: cursorType === 'project' ? '-22px' : cursorType === 'security' ? '-24px' : cursorType === 'hover' ? '-18px' : '-12px',
          marginTop: cursorType === 'project' ? '-22px' : cursorType === 'security' ? '-24px' : cursorType === 'hover' ? '-18px' : '-12px',
        }}
      >
        {cursorType === 'project' ? (
          // Inspection reticle with corner brackets for projects
          <div className="w-full h-full relative border border-accent-cyan/50 rotate-45">
            <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-accent-cyan" />
            <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-accent-cyan" />
          </div>
        ) : cursorType === 'security' ? (
          // Security radar targeting crosshair
          <div className="w-full h-full relative border border-accent-crimson/60 rounded-full animate-spin-slow">
            <span className="absolute top-1/2 left-0 w-1.5 h-[1px] bg-accent-crimson -translate-y-1/2" />
            <span className="absolute top-1/2 right-0 w-1.5 h-[1px] bg-accent-crimson -translate-y-1/2" />
            <span className="absolute top-0 left-1/2 w-[1px] h-1.5 bg-accent-crimson -translate-x-1/2" />
            <span className="absolute bottom-0 left-1/2 w-[1px] h-1.5 bg-accent-crimson -translate-x-1/2" />
          </div>
        ) : (
          // Standard sleek minimal ring
          <div
            className={`w-full h-full rounded-full border transition-colors duration-200 ${
              cursorType === 'hover'
                ? 'border-accent-mint/70 bg-accent-mint/5'
                : 'border-white/20'
            }`}
          />
        )}
      </div>
    </>
  );
};
