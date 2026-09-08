import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Layers, Mic, Headphones, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollyMetricsProps {
  streakDays: number;
}

export const ScrollyMetrics: React.FC<ScrollyMetricsProps> = ({ streakDays }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Timeline kích hoạt khi vùng metrics chạm vào 85% màn hình
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Fade-in và trồi nhẹ các metric cards
      tl.fromTo(
        '.metric-card',
        { y: 40, autoAlpha: 0, scale: 0.95 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
        }
      );

      // 2. Count-up effect cho 4 con số bằng dummy object tweening
      const targets = {
        n1: 0,
        n2: 0,
        n3: 0,
        n4: 0,
      };

      tl.to(
        targets,
        {
          n1: 148,
          n2: 94,
          n3: 32,
          n4: streakDays || 14,
          duration: 1.6,
          ease: 'power1.out',
          onUpdate: () => {
            if (num1Ref.current) num1Ref.current.innerText = Math.floor(targets.n1).toString();
            if (num2Ref.current) num2Ref.current.innerText = Math.floor(targets.n2).toString();
            if (num3Ref.current) num3Ref.current.innerText = Math.floor(targets.n3).toString();
            if (num4Ref.current) num4Ref.current.innerText = Math.floor(targets.n4).toString();
          },
        },
        '-=0.4'
      );
    },
    { scope: containerRef, dependencies: [streakDays] }
  );

  const metrics = [
    {
      label: 'Đơn Vị Từ Vựng',
      ref: num1Ref,
      initial: '148',
      unit: 'từ vựng',
      sub: 'Chuẩn Oxford 3000 & IELTS Academic',
      icon: <Layers className="text-amber-800" size={20} />,
    },
    {
      label: 'Chuẩn Xác Âm Vị',
      ref: num2Ref,
      initial: '94',
      unit: '% điểm AI',
      sub: 'Độ chuẩn xác âm vị (Waveform Match)',
      icon: <Mic className="text-amber-800" size={20} />,
    },
    {
      label: 'Khung Bài Ngữ Âm',
      ref: num3Ref,
      initial: '32',
      unit: 'bài nghe',
      sub: 'A-B Loop & Chép chính tả Dictation',
      icon: <Headphones className="text-amber-800" size={20} />,
    },
    {
      label: 'Chuỗi Nghiên Cứu',
      ref: num4Ref,
      initial: streakDays ? streakDays.toString() : '14',
      unit: 'ngày liên tục',
      sub: 'Kỷ luật 14 ngày đạt chuẩn Bạch Kim',
      icon: <Flame className="text-amber-700 fill-amber-600" size={20} />,
    },
  ];

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="metric-card p-6 bg-white border border-stone-200/90 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 will-change-transform group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
                {item.label}
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                {item.icon}
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span
                  ref={item.ref}
                  className="text-3xl sm:text-4xl font-bold text-[#064E3B] tracking-tight font-mono"
                >
                  {item.initial}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-600 ml-1">
                  {item.unit}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-sans mt-1">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
