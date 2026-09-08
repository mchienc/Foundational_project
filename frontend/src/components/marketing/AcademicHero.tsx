import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Award,
  Activity,
  Layers,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

interface AcademicHeroProps {
  onOpenAuth: (tab: 'login' | 'register', context?: string) => void;
  onExploreChapters: () => void;
}

export const AcademicHero: React.FC<AcademicHeroProps> = ({
  onOpenAuth,
  onExploreChapters,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate left column editorial elements
      tl.from('.hero-badge', { y: 20, autoAlpha: 0, duration: 0.6 })
        .from('.hero-headline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.hero-lead', { y: 25, autoAlpha: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-actions', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-footnote', { y: 15, autoAlpha: 0, duration: 0.5 }, '-=0.3')
        // Animate right column Bento Linguistic Dossier cards
        .from(
          '.bento-dossier-card',
          {
            y: 35,
            autoAlpha: 0,
            scale: 0.96,
            duration: 0.8,
            stagger: 0.15,
          },
          '-=0.8'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-12 pb-20 lg:pt-18 lg:pb-28 bg-[#F9F9F6]/85 backdrop-blur-[2px] border-b border-stone-300"
    >
      {/* Background subtle editorial paper grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Editorial Thesis & Academic Stance (7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Academic Discipline Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B] border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-normal uppercase shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Khoa Học Ngôn Ngữ Ứng Dụng</span>
            </div>

            {/* Academic Headline with guaranteed Vietnamese glyph kerning */}
            <h1 className="hero-headline text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#064E3B] tracking-normal leading-[1.25]">
              Kiến Tạo Năng Lực Ngôn Ngữ Bằng{' '}
              <span className="italic font-normal text-[#B45309] underline decoration-[#D97706]/40 underline-offset-8">
                Độ Chuẩn Xác
              </span>{' '}
              Của Trí Tuệ Nhân Tạo
            </h1>

            {/* Editorial Lead Essay */}
            <p className="hero-lead text-base sm:text-lg text-stone-700 leading-relaxed font-sans font-normal max-w-2xl">
              EduFlow Institute kết hợp lý thuyết ghi nhớ ngắt quãng Spaced Repetition cùng thuật toán
              nhận dạng âm vị thực nghiệm. Hệ thống loại bỏ hoàn toàn thói quen dịch thô word-by-word,
              thiết lập phản xạ tư duy mạch lạc và bảo chứng chuẩn đầu ra Cambridge &amp; Oxford.
            </p>

            {/* Action CTAs */}
            <div className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenAuth('register', 'Bắt đầu nghiên cứu lộ trình học thuật')}
                className="px-7 py-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold uppercase tracking-normal shadow-md shadow-amber-600/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Khởi Tạo Hồ Sơ Học Thuật</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onExploreChapters}
                className="px-7 py-4 rounded-xl bg-white/80 hover:bg-white text-stone-800 border border-stone-300 text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Xem 5 Chương Phương Pháp</span>
              </button>
            </div>

            {/* Scholarly Footnote & Evidence */}
            <div className="hero-footnote pt-4 border-t border-stone-200/90 flex items-center gap-3 text-xs text-stone-600">
              <Award className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>
                Nghiên cứu ứng dụng chuẩn quốc tế • Đạt chứng nhận phương pháp luận từ Cambridge &amp; Oxford
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Linguistic Dossier (Bento Grid) (5 Cols on desktop) */}
          <div className="lg:col-span-5 space-y-4">
            {/* BENTO CARD 1: Waveform Frequency Analysis (Academic Teal Accent #0D9488) */}
            <div className="bento-dossier-card rounded-2xl bg-white p-5 border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-[#0D9488] flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#064E3B] uppercase tracking-normal">
                      Phổ Âm Vị Thực Nghiệm (Waveform)
                    </h3>
                    <p className="text-[10px] text-stone-500 font-mono">
                      Cặp đối kháng: /θ/ (think) vs /s/ (sink)
                    </p>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] text-[11px] font-mono font-bold">
                  94.2% Chuẩn Xác
                </div>
              </div>

              {/* Synthetic Waveform Frequency Display with Academic Teal #0D9488 */}
              <div className="h-16 w-full rounded-xl bg-forest-950 p-2.5 flex items-end justify-between gap-1 overflow-hidden relative">
                {[45, 65, 30, 80, 95, 60, 40, 75, 90, 100, 70, 85, 55, 65, 80, 95, 60, 40, 50, 75, 60, 40].map(
                  (val, idx) => (
                    <div
                      key={idx}
                      className="w-full bg-gradient-to-t from-teal-700 via-[#0D9488] to-emerald-300 rounded-t-xs"
                      style={{ height: `${val}%` }}
                    />
                  )
                )}
                <div className="absolute top-2 right-3 font-mono text-[9px] text-teal-200">
                  Formant 1: 480Hz | Formant 2: 1920Hz
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-600 pt-2.5">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
                  Độ tròn vành &amp; vị trí đặt đầu lưỡi chuẩn
                </span>
                <span className="font-mono text-[10px] text-stone-500">AI Latency: 0.12s</span>
              </div>
            </div>

            {/* BENTO CARD 2: 3D Vocabulary Flashcard (Subtle 3D Tilt) */}
            <div className="bento-dossier-card rounded-2xl bg-white p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-[#B45309] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#B45309] uppercase font-bold tracking-normal">
                      Từ Vựng Học Thuật C1 • Spaced Repetition
                    </span>
                    <h4 className="text-sm font-sans font-bold text-[#064E3B]">
                      ubiquitous <span className="font-mono text-xs font-normal text-stone-500">/juːˈbɪk.wɪ.təs/</span>
                    </h4>
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded bg-[#064E3B] text-amber-300 font-mono font-bold">
                  Hộp Leitner 5
                </span>
              </div>

              <p className="text-xs text-stone-700 italic border-l-2 border-[#D97706] pl-2.5 my-2 font-sans">
                "Smartphones have become ubiquitous in contemporary daily life."
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-600">
                <span>Độ bền ghi nhớ: <strong>98% Vỏ não sâu</strong></span>
                <span className="text-[#B45309] font-mono text-[10px]">Chu kỳ kế tiếp: 30 ngày</span>
              </div>
            </div>

            {/* BENTO CARD 3: Cambridge IELTS 1.0 - 9.0 Rubric Dossier (High-Contrast Solid #064E3B) */}
            <div className="bento-dossier-card rounded-2xl bg-[#064E3B] text-white p-5 border border-emerald-800 shadow-md">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-sans font-bold text-stone-100">
                    Thang Điểm Khảo Thí Cambridge
                  </span>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded">
                  Academic IELTS 8.5
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center py-2 border-y border-emerald-800/80 text-xs">
                <div>
                  <div className="text-[10px] text-emerald-200">TR</div>
                  <div className="font-sans font-bold text-amber-300 text-sm">8.5</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-200">CC</div>
                  <div className="font-sans font-bold text-amber-300 text-sm">8.0</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-200">LR</div>
                  <div className="font-sans font-bold text-amber-300 text-sm">8.5</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-200">GRA</div>
                  <div className="font-sans font-bold text-amber-300 text-sm">8.0</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-200 pt-2.5">
                <span className="truncate">Chấm 4 trục Band Descriptors bằng AI</span>
                <span className="text-amber-300 font-mono text-[10px] shrink-0">Phê duyệt: 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
