import React, { useEffect, useRef } from 'react';

/**
 * SoftAtmosphereBackground:
 * Hiệu ứng hạt ánh sáng học thuật ngầm (Academic Constellation) mặc định.
 * Hoàn toàn chạy ẩn, không nút bấm, không popup tùy chỉnh, không cản trở thao tác click (pointer-events: none).
 */
export const SoftAtmosphereBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
      mousePosRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      alpha: number;
      baseAlpha: number;
      pulsePhase: number;
      pulseSpeed: number;
    }

    const palette = [
      { r: 180, g: 83, b: 9 },   // Rich Deep Amber
      { r: 217, g: 119, b: 6 },  // Warm Gold Classic
      { r: 4, g: 120, b: 87 },   // Deep Forest Emerald
      { r: 6, g: 78, b: 59 },    // Deep Forest Green
      { r: 194, g: 65, b: 12 },  // Burnt Gold
      { r: 245, g: 158, b: 11 }, // Radiant Amber
    ];

    let particles: Particle[] = [];

    const initElements = () => {
      // Giới hạn số lượng hạt từ 25 đến 55 để tối ưu hiệu năng tối đa
      const count = Math.min(55, Math.max(25, Math.floor((width * height) / 22000)));
      particles = [];
      for (let i = 0; i < count; i++) {
        const c = palette[Math.floor(Math.random() * palette.length)];
        const baseRadius = Math.random() * 2.6 + 1.8;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: baseRadius,
          baseRadius,
          color: `rgba(${c.r}, ${c.g}, ${c.b}`,
          alpha: Math.random() * 0.35 + 0.45,
          baseAlpha: Math.random() * 0.25 + 0.45,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.015 + 0.008,
        });
      }
    };

    initElements();

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const mouse = mousePosRef.current;
      const hasMouse = mouse.active;

      // Cập nhật và vẽ các hạt ánh sáng
      particles.forEach((p) => {
        p.pulsePhase += p.pulseSpeed * dt * 60;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.2;
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.7;

        if (hasMouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            p.x += (dx / dist) * 0.5;
            p.y += (dy / dist) * 0.5;
          }
        }

        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;

        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;

        // Vầng sáng dịu
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.2);
        glow.addColorStop(0, `${p.color}, ${p.alpha * 0.4})`);
        glow.addColorStop(0.5, `${p.color}, ${p.alpha * 0.15})`);
        glow.addColorStop(1, `${p.color}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Điểm hạt trung tâm
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}, ${Math.min(1, p.alpha * 0.85)})`;
        ctx.fill();
      });

      // Đường liên kết mạng tinh thể tri thức (Constellation Lines)
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(180, 83, 9, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    // Tự động dừng khi chuyển tab để tiết kiệm tối đa CPU/pin
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
      } else {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
    />
  );
};

export default SoftAtmosphereBackground;
