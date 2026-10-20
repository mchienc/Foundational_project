import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BookOpen, Youtube, Sparkles, Layers } from 'lucide-react';

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
        { ref: val2Ref, target: 100, suffix: '%' },
        { ref: val3Ref, target: 84, suffix: ' bài' },
        { ref: val4Ref, target: 4, suffix: ' mức' },
      ];

      // Smooth entrance of metric cells
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
              Trọn bộ đề thi thật từ Cambridge 10 đến 20 (Reading &amp; Listening)
            </p>
          </div>

          {/* Metric 2 */}
          <div className="metric-column-cell p-6 text-center space-y-3 bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-xs hover:shadow-md hover:border-amber-400/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-rose-600 flex items-center justify-center mx-auto shadow-2xs">
              <Youtube className="w-5 h-5 text-rose-600" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-mono">
              <span ref={val2Ref}>100%</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Chép Chính Tả Video
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Nghe chép theo từng câu ngắn có phụ đề chuẩn và sửa lỗi tức thì
            </p>
          </div>

          {/* Metric 3 */}
          <div className="metric-column-cell p-6 text-center space-y-3 bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-xs hover:shadow-md hover:border-amber-400/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
              <Sparkles className="w-5 h-5 text-amber-800" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-mono">
              <span ref={val3Ref}>84 bài</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Bài Đọc Reading
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Làm bài như thi thật trên máy tính kèm tra từ điển nhanh 1 chạm
            </p>
          </div>

          {/* Metric 4 */}
          <div className="metric-column-cell p-6 text-center space-y-3 bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-xs hover:shadow-md hover:border-amber-400/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
              <Layers className="w-5 h-5 text-amber-800" />
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-mono">
              <span ref={val4Ref}>4 mức</span>
            </div>
            <p className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
              Ghi Nhớ Flashcard
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Nhắc ôn tập ngắt quãng khoa học giúp nhớ từ lâu và xuất file Anki dễ dàng
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
