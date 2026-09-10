import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BookOpen, Activity, Headphones, CheckCircle2 } from 'lucide-react';

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
        { ref: val1Ref, target: 28, suffix: ' đề' },
        { ref: val2Ref, target: 96, suffix: '%' },
        { ref: val3Ref, target: 4, suffix: ' mức' },
        { ref: val4Ref, target: 100, suffix: '%' },
      ];

      // Smooth entrance of metric cells without ever hiding them on initial load
      gsap.from('.metric-column-cell', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });

      // Count up numbers
      counters.forEach((item) => {
        if (!item.ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.target,
          duration: 1.4,
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
      className="bg-transparent border-b border-stone-200/60 py-10 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Metric 1 */}
          <div className="metric-column-cell p-6 text-center space-y-3 bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-xs hover:shadow-md hover:border-amber-400/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
              <BookOpen className="w-5 h-5 text-amber-800" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-mono">
              <span ref={val1Ref}>28 đề</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Đề Thi Cambridge
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Trọn bộ đề thi thật từ Cambridge 10 đến 20
            </p>
          </div>

          {/* Metric 2 */}
          <div className="metric-column-cell p-6 text-center space-y-3 bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-xs hover:shadow-md hover:border-amber-400/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
              <Activity className="w-5 h-5 text-amber-800" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-mono">
              <span ref={val2Ref}>96%</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Chính Xác Dictation
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Nghe chép từng câu, phát hiện từ sai tức thì
            </p>
          </div>

          {/* Metric 3 */}
          <div className="metric-column-cell p-6 text-center space-y-3 bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-xs hover:shadow-md hover:border-amber-400/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
              <Headphones className="w-5 h-5 text-amber-800" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-mono">
              <span ref={val3Ref}>4 mức</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Đánh Giá Thẻ Anki
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Again, Hard, Good, Easy theo thuật toán SM-2
            </p>
          </div>

          {/* Metric 4 */}
          <div className="metric-column-cell p-6 text-center space-y-3 bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-xs hover:shadow-md hover:border-amber-400/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-amber-800" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-mono">
              <span ref={val4Ref}>100%</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Lời Giải Chi Tiết
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Giải thích đáp án học thuật cho từng câu hỏi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
