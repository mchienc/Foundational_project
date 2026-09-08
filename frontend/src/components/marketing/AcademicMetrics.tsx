import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BookOpen, Activity, Headphones, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const AcademicMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const val1Ref = useRef<HTMLSpanElement>(null);
  const val2Ref = useRef<HTMLSpanElement>(null);
  const val3Ref = useRef<HTMLSpanElement>(null);
  const val4Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const counters = [
        { ref: val1Ref, target: 148, suffix: '' },
        { ref: val2Ref, target: 94, suffix: '%' },
        { ref: val3Ref, target: 32, suffix: '' },
        { ref: val4Ref, target: 14, suffix: ' ngày' },
      ];

      // Stagger entrance of metric cells
      gsap.from('.metric-column-cell', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 25,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Count up numbers
      counters.forEach((item) => {
        if (!item.ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          val: item.target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            if (item.ref.current) {
              item.ref.current.innerText = `${Math.floor(obj.val)}${item.suffix}`;
            }
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#F9F9F6]/85 backdrop-blur-[2px] border-b border-stone-300 py-10 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-stone-300 border border-stone-300 rounded-2xl bg-white shadow-xs overflow-hidden">
          {/* Metric 1 */}
          <div className="metric-column-cell p-6 text-center space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-300/60 text-amber-900 flex items-center justify-center mx-auto mb-1.5 shadow-2xs">
              <BookOpen className="w-4 h-4 text-amber-900" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-normal">
              <span ref={val1Ref}>0</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Đơn Vị Từ Vựng
            </p>
            <p className="text-[11px] text-stone-600 font-sans">
              Chuẩn Oxford 3000 &amp; IELTS Academic C1
            </p>
          </div>

          {/* Metric 2 */}
          <div className="metric-column-cell p-6 text-center space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-300/60 text-amber-900 flex items-center justify-center mx-auto mb-1.5 shadow-2xs">
              <Activity className="w-4 h-4 text-amber-900" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-normal">
              <span ref={val2Ref}>0%</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Chuẩn Xác Âm Vị
            </p>
            <p className="text-[11px] text-stone-600 font-sans">
              Độ tương thích phổ sóng âm giọng bản xứ
            </p>
          </div>

          {/* Metric 3 */}
          <div className="metric-column-cell p-6 text-center space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-300/60 text-amber-900 flex items-center justify-center mx-auto mb-1.5 shadow-2xs">
              <Headphones className="w-4 h-4 text-amber-900" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-normal">
              <span ref={val3Ref}>0</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Khung Bài Ngữ Âm
            </p>
            <p className="text-[11px] text-stone-600 font-sans">
              A-B loop phân đoạn &amp; Chép chính tả
            </p>
          </div>

          {/* Metric 4 */}
          <div className="metric-column-cell p-6 text-center space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-300/60 text-amber-900 flex items-center justify-center mx-auto mb-1.5 shadow-2xs">
              <Flame className="w-4 h-4 text-amber-900 fill-amber-700" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-normal">
              <span ref={val4Ref}>0 ngày</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Chuỗi Nghiên Cứu
            </p>
            <p className="text-[11px] text-stone-600 font-sans">
              Kỷ luật 14 ngày kích hoạt trí nhớ dài hạn
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
