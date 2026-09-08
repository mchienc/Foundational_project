import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Sliders,
  X,
  RotateCcw,
  Eye,
  Zap,
  MousePointer,
  Radio,
  Layers,
  Activity,
  Flame,
} from 'lucide-react';

export type AnimationMode = 'golden-stardust' | 'forest-aurora' | 'acoustic-waves' | 'fireflies';
export type SpeedLevel = 'slow' | 'normal' | 'fast';
export type OpacityLevel = 'soft' | 'medium' | 'vivid';

export interface BgSettings {
  enabled: boolean;
  mode: AnimationMode;
  speed: SpeedLevel;
  opacity: OpacityLevel;
  mouseInteraction: boolean;
}

const DEFAULT_SETTINGS: BgSettings = {
  enabled: true,
  mode: 'golden-stardust',
  speed: 'normal',
  opacity: 'medium',
  mouseInteraction: true,
};

const STORAGE_KEY = 'eduflow_soft_bg_settings';

const SPEED_MULTIPLIERS: Record<SpeedLevel, number> = {
  slow: 0.5,
  normal: 1.0,
  fast: 1.8,
};

const OPACITY_MULTIPLIERS: Record<OpacityLevel, number> = {
  soft: 0.65,
  medium: 1.0,
  vivid: 1.45,
};

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

interface AuroraBlob {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  colorStops: { r: number; g: number; b: number };
  angleX: number;
  angleY: number;
  speedX: number;
  speedY: number;
}

export const SoftAtmosphereBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<BgSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Cannot read background settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Save settings on update
  const updateSettings = (partial: Partial<BgSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save background settings:', e);
      }
      return next;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    } catch (e) {
      console.warn('Failed to reset background settings:', e);
    }
  };

  // Main Canvas Animation Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !settings.enabled) return;

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

    // Initialize elements based on current mode
    let particles: Particle[] = [];
    let auroraBlobs: AuroraBlob[] = [];
    let time = 0;

    const palette = [
      { r: 180, g: 83, b: 9 }, // Rich Deep Amber
      { r: 217, g: 119, b: 6 }, // Warm Gold Classic
      { r: 4, g: 120, b: 87 }, // Deep Forest Emerald
      { r: 6, g: 78, b: 59 }, // Deep Forest Green
      { r: 194, g: 65, b: 12 }, // Burnt Gold
      { r: 245, g: 158, b: 11 }, // Radiant Amber
    ];

    const initElements = () => {
      const mode = settings.mode;
      const count =
        mode === 'golden-stardust'
          ? Math.floor((width * height) / 9500)
          : mode === 'fireflies'
          ? Math.floor((width * height) / 16000)
          : 0;

      particles = [];
      for (let i = 0; i < count; i++) {
        const c = palette[Math.floor(Math.random() * palette.length)];
        const baseRadius =
          mode === 'fireflies'
            ? Math.random() * 5.0 + 3.5
            : Math.random() * 3.6 + 2.2;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: baseRadius,
          baseRadius,
          color: `rgba(${c.r}, ${c.g}, ${c.b}`,
          alpha: Math.random() * 0.35 + 0.65,
          baseAlpha: Math.random() * 0.3 + 0.7,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }

      // Aurora Blobs with expanded coverage and rich jewel tones
      if (mode === 'forest-aurora') {
        auroraBlobs = [
          {
            x: width * 0.2,
            y: height * 0.25,
            baseX: width * 0.2,
            baseY: height * 0.25,
            radius: Math.min(width, height) * 0.65,
            colorStops: { r: 6, g: 78, b: 59 }, // Deep Forest Green
            angleX: 0,
            angleY: 0.5,
            speedX: 0.003,
            speedY: 0.002,
          },
          {
            x: width * 0.8,
            y: height * 0.35,
            baseX: width * 0.8,
            baseY: height * 0.35,
            radius: Math.min(width, height) * 0.6,
            colorStops: { r: 217, g: 119, b: 6 }, // Warm Gold
            angleX: 1.2,
            angleY: 0.8,
            speedX: 0.0025,
            speedY: 0.0035,
          },
          {
            x: width * 0.45,
            y: height * 0.75,
            baseX: width * 0.45,
            baseY: height * 0.75,
            radius: Math.min(width, height) * 0.7,
            colorStops: { r: 4, g: 120, b: 87 }, // Emerald Glow
            angleX: 2.1,
            angleY: 1.5,
            speedX: 0.002,
            speedY: 0.002,
          },
          {
            x: width * 0.88,
            y: height * 0.82,
            baseX: width * 0.88,
            baseY: height * 0.82,
            radius: Math.min(width, height) * 0.55,
            colorStops: { r: 245, g: 158, b: 11 }, // Amber Honey
            angleX: 3.1,
            angleY: 2.2,
            speedX: 0.003,
            speedY: 0.0028,
          },
        ];
      }
    };

    initElements();

    // Render loop
    const speedMult = SPEED_MULTIPLIERS[settings.speed];
    const opacityMult = OPACITY_MULTIPLIERS[settings.opacity];

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.666, 2.5); // normalized delta time
      lastTime = now;
      time += 0.015 * speedMult * dt;

      ctx.clearRect(0, 0, width, height);

      const mouse = mousePosRef.current;
      const hasMouse = settings.mouseInteraction && mouse.active;

      // AMBIENT ATMOSPHERE: Soft breathing glows in the corners & empty gutters
      const pulse = Math.sin(time * 0.7) * 0.03;
      const ambientGlows = [
        {
          x: width * 0.05,
          y: height * 0.22,
          r: Math.max(380, width * 0.32),
          color: `rgba(6, 78, 59, ${(0.18 + pulse) * opacityMult})`,
        }, // Deep Forest (top left)
        {
          x: width * 0.95,
          y: height * 0.35,
          r: Math.max(420, width * 0.35),
          color: `rgba(217, 119, 6, ${(0.22 + pulse) * opacityMult})`,
        }, // Warm Gold (top right)
        {
          x: width * 0.08,
          y: height * 0.85,
          r: Math.max(400, width * 0.32),
          color: `rgba(245, 158, 11, ${(0.2 + pulse) * opacityMult})`,
        }, // Amber Glow (bottom left)
        {
          x: width * 0.92,
          y: height * 0.82,
          r: Math.max(450, width * 0.35),
          color: `rgba(4, 120, 87, ${(0.19 + pulse) * opacityMult})`,
        }, // Emerald Glow (bottom right)
      ];

      ambientGlows.forEach((g) => {
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        grad.addColorStop(0, g.color);
        grad.addColorStop(1, 'rgba(250, 250, 249, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // MODE 1: GOLDEN STARDUST & CONSTELLATIONS
      if (settings.mode === 'golden-stardust') {
        const lineDist = 135;

        // Draw connections first
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < lineDist) {
              const alphaRatio = (1 - dist / lineDist) * 0.75 * opacityMult;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle =
                i % 2 === 0
                  ? `rgba(180, 83, 9, ${alphaRatio})`
                  : `rgba(4, 120, 87, ${alphaRatio * 0.85})`;
              ctx.lineWidth = 1.3;
              ctx.stroke();
            }
          }
        }

        // Draw and update particles
        particles.forEach((p) => {
          p.pulsePhase += p.pulseSpeed * speedMult * dt;
          p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.25;
          p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.6;

          // Mouse gentle repel
          if (hasMouse) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140 && dist > 0) {
              const force = (1 - dist / 140) * 1.8;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }

          p.x += p.vx * speedMult * dt;
          p.y += p.vy * speedMult * dt;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Outer soft halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(2, p.radius * 2.4), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}, ${Math.max(0, p.alpha * 0.45 * opacityMult)})`;
          ctx.fill();

          // Core bright dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, p.radius), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}, ${Math.max(0, p.alpha * opacityMult)})`;
          ctx.fill();
        });
      }

      // MODE 2: FOREST AURORA MESH
      else if (settings.mode === 'forest-aurora') {
        auroraBlobs.forEach((blob, idx) => {
          blob.angleX += blob.speedX * speedMult * dt;
          blob.angleY += blob.speedY * speedMult * dt;

          const offsetX = Math.sin(blob.angleX) * (width * 0.14);
          const offsetY = Math.cos(blob.angleY) * (height * 0.14);

          let targetX = blob.baseX + offsetX;
          let targetY = blob.baseY + offsetY;

          if (hasMouse && idx === 0) {
            targetX += (mouse.x - targetX) * 0.15;
            targetY += (mouse.y - targetY) * 0.15;
          }

          blob.x += (targetX - blob.x) * 0.05;
          blob.y += (targetY - blob.y) * 0.05;

          const grad = ctx.createRadialGradient(
            blob.x,
            blob.y,
            0,
            blob.x,
            blob.y,
            blob.radius
          );

          const { r, g, b } = blob.colorStops;
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.75 * opacityMult})`);
          grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.35 * opacityMult})`);
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // MODE 3: ACOUSTIC PHONEME WAVES
      else if (settings.mode === 'acoustic-waves') {
        const waveCount = 5;
        const colors = [
          { r: 6, g: 78, b: 59 }, // Deep Forest
          { r: 217, g: 119, b: 6 }, // Warm Gold
          { r: 16, g: 185, b: 129 }, // Emerald
          { r: 245, g: 158, b: 11 }, // Amber
          { r: 4, g: 120, b: 87 }, // Forest Light
        ];

        for (let i = 0; i < waveCount; i++) {
          const c = colors[i % colors.length];
          const baseHeight = height * (0.2 + (i * 0.6) / waveCount);
          const freq = 0.0015 + i * 0.0006;
          const amp = 35 + i * 18;
          const phase = time * 0.8 + i * 1.5;

          ctx.beginPath();
          ctx.moveTo(0, baseHeight);

          for (let x = 0; x <= width; x += 15) {
            let mouseInfluence = 0;
            if (hasMouse) {
              const distToMouse = Math.abs(x - mouse.x);
              if (distToMouse < 200) {
                mouseInfluence = (1 - distToMouse / 200) * (mouse.y - baseHeight) * 0.25;
              }
            }

            const y =
              baseHeight +
              Math.sin(x * freq + phase) * amp +
              Math.cos(x * freq * 0.6 + phase * 0.8) * (amp * 0.45) +
              mouseInfluence;
            ctx.lineTo(x, y);
          }

          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${0.75 * opacityMult})`;
          ctx.lineWidth = 3.0;
          ctx.stroke();
        }
      }

      // MODE 4: GENTLE FIREFLIES & BOKEH
      else if (settings.mode === 'fireflies') {
        particles.forEach((p) => {
          p.pulsePhase += p.pulseSpeed * speedMult * dt;
          p.alpha = Math.max(0.2, p.baseAlpha + Math.sin(p.pulsePhase) * 0.45);
          p.radius = Math.max(2, p.baseRadius + Math.sin(p.pulsePhase) * 1.5);

          if (hasMouse) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 0) {
              // Gentle attraction
              p.x -= (dx / dist) * 0.6;
              p.y -= (dy / dist) * 0.6;
            }
          }

          p.x += p.vx * speedMult * dt;
          p.y += p.vy * speedMult * dt;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // Outer glowing halo
          const haloGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius * 4.0
          );
          haloGrad.addColorStop(0, `${p.color}, ${p.alpha * 0.65 * opacityMult})`);
          haloGrad.addColorStop(0.5, `${p.color}, ${p.alpha * 0.25 * opacityMult})`);
          haloGrad.addColorStop(1, `${p.color}, 0)`);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4.0, 0, Math.PI * 2);
          ctx.fillStyle = haloGrad;
          ctx.fill();

          // Core bright orb
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}, ${Math.min(1, p.alpha * opacityMult)})`;
          ctx.fill();
        });
      }

      animFrameId = requestAnimationFrame(render);
    };

    // Tab visibility handling: pause when tab hidden to save CPU/battery
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
  }, [settings]);

  return (
    <>
      {/* 
        BACKGROUND CANVAS LAYER:
        Nằm ở lớp z-0, cố định toàn màn hình, pointer-events-none để tuyệt đối không cản trở click.
      */}
      {settings.enabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0 will-change-transform"
        />
      )}

      {/* 
        FLOATING CUSTOMIZER BUTTON:
        Góc trái phía dưới màn hình, thiết kế thanh lịch học thuật.
      */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full border shadow-lg backdrop-blur-md text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
            settings.enabled
              ? 'bg-[#FAFAF9]/90 text-[#064E3B] border-amber-500/40 hover:border-amber-500 shadow-amber-900/10'
              : 'bg-stone-100/90 text-stone-500 border-stone-300 hover:text-stone-800'
          }`}
          title="Tùy biến hiệu ứng nền Soft Atmosphere"
        >
          <Sparkles
            className={`w-4 h-4 transition-transform duration-500 ${
              settings.enabled
                ? 'text-[#D97706] group-hover:rotate-180'
                : 'text-stone-400'
            }`}
          />
          <span className="hidden sm:inline">Nền Sống Động</span>
          {settings.enabled ? (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-400/40" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-stone-300" />
          )}
        </button>
      </div>

      {/* 
        CUSTOMIZATION CONTROL PANEL (POPUP DRAWER):
        Thiết kế kính mờ phong cách Academic sang trọng.
      */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-[340px] sm:w-[380px] p-5 rounded-3xl bg-[#FAFAF9]/95 backdrop-blur-2xl border border-stone-200/90 shadow-2xl text-stone-800 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#D97706] border border-amber-200/60 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#064E3B] tracking-tight">
                  Tùy Biến Nền Sống Động
                </h4>
                <p className="text-[11px] text-stone-500">Soft Academic Atmosphere</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Master Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#064E3B]" />
              <span className="text-xs font-bold text-stone-800">Hiệu ứng chuyển động</span>
            </div>

            <button
              onClick={() => updateSettings({ enabled: !settings.enabled })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                settings.enabled ? 'bg-[#064E3B]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {settings.enabled && (
            <>
              {/* 1. Animation Mode Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-700" /> Chủ Đề Ánh Sáng
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: 'golden-stardust' as AnimationMode,
                      label: 'Bụi Vàng Tri Thức',
                      desc: 'Hạt kết nối mạng lưới',
                      icon: <Sparkles className="w-3.5 h-3.5 text-amber-600" />,
                    },
                    {
                      id: 'forest-aurora' as AnimationMode,
                      label: 'Cực Quang Rừng Già',
                      desc: 'Mây Gradient chuyển sắc',
                      icon: <Flame className="w-3.5 h-3.5 text-emerald-600" />,
                    },
                    {
                      id: 'acoustic-waves' as AnimationMode,
                      label: 'Sóng Âm Ngôn Ngữ',
                      desc: 'Đường phổ âm vị học',
                      icon: <Activity className="w-3.5 h-3.5 text-blue-600" />,
                    },
                    {
                      id: 'fireflies' as AnimationMode,
                      label: 'Đom Đóm Tinh Vân',
                      desc: 'Đốm sáng Bokeh thở nhẹ',
                      icon: <Radio className="w-3.5 h-3.5 text-amber-500" />,
                    },
                  ].map((mode) => {
                    const isSelected = settings.mode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => updateSettings({ mode: mode.id })}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-sm'
                            : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {mode.icon}
                          <span className="text-xs font-bold truncate">{mode.label}</span>
                        </div>
                        <div
                          className={`text-[10px] truncate ${
                            isSelected ? 'text-emerald-200' : 'text-stone-400'
                          }`}
                        >
                          {mode.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Speed Control */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-700" /> Tốc Độ Chuyển Động
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'slow' as SpeedLevel, label: 'Thong thả (0.5x)' },
                    { id: 'normal' as SpeedLevel, label: 'Chuẩn (1.0x)' },
                    { id: 'fast' as SpeedLevel, label: 'Sinh động (1.8x)' },
                  ].map((spd) => (
                    <button
                      key={spd.id}
                      onClick={() => updateSettings({ speed: spd.id })}
                      className={`py-1.5 px-2 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                        settings.speed === spd.id
                          ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {spd.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Opacity Control */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-700" /> Độ Đậm Nhạt (Opacity)
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'soft' as OpacityLevel, label: 'Mờ Dịu (65%)' },
                    { id: 'medium' as OpacityLevel, label: 'Đậm Đà (100%)' },
                    { id: 'vivid' as OpacityLevel, label: 'Rực Rỡ (145%)' },
                  ].map((op) => (
                    <button
                      key={op.id}
                      onClick={() => updateSettings({ opacity: op.id })}
                      className={`py-1.5 px-2 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                        settings.opacity === op.id
                          ? 'bg-[#064E3B] text-white border-[#064E3B] font-bold'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Mouse Physics Toggle */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <MousePointer className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-xs font-semibold text-stone-700">
                    Phản ứng theo trỏ chuột
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={settings.mouseInteraction}
                  onChange={(e) => updateSettings({ mouseInteraction: e.target.checked })}
                  className="w-4 h-4 accent-[#064E3B] rounded cursor-pointer"
                />
              </div>
            </>
          )}

          {/* Footer with Reset Button */}
          <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px]">
            <span className="text-stone-400 font-mono">Lưu cấu hình tự động</span>

            <button
              onClick={resetSettings}
              className="inline-flex items-center gap-1.5 text-[#D97706] hover:text-[#B45309] font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Khôi phục mặc định</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SoftAtmosphereBackground;
