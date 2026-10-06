import React, { useEffect, useRef } from 'react';

export const HeroCoreVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates with spring damping
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Technical nodes array
    interface Node {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      label?: string;
    }

    const codeTokens = [
      'airmon-ng', '0x7CFFB2', 'WPA2_EAPOL', 'SELECT *',
      'hashcat -m', 'socket.AF_INET', 'JOIN schema',
      'SHA256', '802.11', 'bssid_scan', 'def audit():',
    ];

    // Section 11: Reduce particle count and parallax on mobile
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 14 : 38;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const radius = (isMobile ? 120 : 180) + Math.random() * (isMobile ? 50 : 80);
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      nodes.push({
        x: radius * Math.cos(theta) * Math.cos(phi),
        y: radius * Math.sin(phi),
        z: radius * Math.sin(theta) * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
        vz: (Math.random() - 0.5) * 0.004,
        label: !isMobile && i < codeTokens.length ? codeTokens[i] : undefined,
      });
    }

    let angleX = 0;
    let angleY = 0;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (!wasVisible && isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping (only on desktop to reduce mobile parallax per Section 11)
      if (!isMobile) {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
      }

      const mouseNormX = isMobile ? 0 : (mouseX / width - 0.5) * 2;
      const mouseNormY = isMobile ? 0 : (mouseY / height - 0.5) * 2;

      angleY += 0.0025 + mouseNormX * 0.003;
      angleX += 0.001 + mouseNormY * 0.002;

      const centerX = width * 0.65; // Positioned symmetrically towards right side of hero
      const centerY = height * 0.48;

      // Draw faint coordinate orbital rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer engineering ring
      ctx.beginPath();
      ctx.ellipse(0, 0, 240, 100, angleY * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(124, 255, 178, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      // Middle cyan ring
      ctx.beginPath();
      ctx.ellipse(0, 0, 180, 80, -angleY * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(98, 217, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Project and draw 3D nodes
      const projectedNodes: { x: number; y: number; scale: number; alpha: number; label?: string }[] = [];

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      nodes.forEach((node) => {
        // Rotate Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate X
        let y1 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        const fov = 420;
        const scale = fov / (fov + z2);
        const px = x1 * scale;
        const py = y1 * scale;
        const alpha = Math.max(0.1, Math.min(0.9, (z2 + 250) / 500));

        projectedNodes.push({ x: px, y: py, scale, alpha, label: node.label });
      });

      // Draw connecting lines between near nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const dx = projectedNodes[i].x - projectedNodes[j].x;
          const dy = projectedNodes[i].y - projectedNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const lineAlpha = (1 - dist / 90) * 0.25 * projectedNodes[i].alpha;
            ctx.beginPath();
            ctx.moveTo(projectedNodes[i].x, projectedNodes[i].y);
            ctx.lineTo(projectedNodes[j].x, projectedNodes[j].y);
            ctx.strokeStyle = `rgba(124, 255, 178, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw nodes and code markers
      projectedNodes.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, 2.5 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 255, 178, ${p.alpha * 0.9})`;
        ctx.shadowColor = '#7CFFB2';
        ctx.shadowBlur = p.scale > 1 ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.label && p.alpha > 0.45) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(154, 163, 173, ${p.alpha * 0.8})`;
          ctx.fillText(p.label, p.x + 6, p.y + 3);
        }
      });

      // Center core coordinate reticle
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(98, 217, 255, 0.8)';
      ctx.fill();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(12, 0);
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 12);
      ctx.strokeStyle = 'rgba(98, 217, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full opacity-90 z-0"
    />
  );
};
