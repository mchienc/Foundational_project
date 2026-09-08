import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Layers,
  Mic,
  Headphones,
  FileText,
  PenTool,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { Screen } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollyFeaturesProps {
  onNavigateScreen?: (screen: Screen) => void;
}

interface FeatureItem {
  id: number;
  chapterLabel: string;
  screen: Screen;
  badge: string;
  badgeColor: string;
  title: string;
  headline: string;
  description: string;
  highlights: string[];
  gradient: string;
  iconBg: string;
  icon: React.ReactNode;
  btnText: string;
  btnColor: string;
  previewGraphic: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 1,
    chapterLabel: '[CHƯƠNG I: PHẢN XẠ 3D]',
    screen: 'vocab-srs',
    badge: 'Spaced Repetition System',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200/80',
    title: 'Thẻ Từ Vựng Thông Minh 3D',
    headline: 'Ghi Nhớ Dài Hạn Qua Thuật Toán Lặp Lại Ngắt Quãng',
    description:
      'Trải nghiệm lật thẻ 3D 180° mượt mà, phát âm chuẩn Oxford UK/US, tra từ điển popup nhanh trong ngữ cảnh và thuật toán SRS tự động lên lịch ôn tập tối ưu.',
    highlights: [
      'Lật thẻ 3D 180° mô phỏng chuyển động thực tế',
      'Âm thanh bản xứ chuẩn Anh - Anh & Anh - Mỹ',
      '4 cấp độ ghi nhớ: Again • Hard • Good • Easy',
    ],
    gradient: 'from-[#064E3B] to-[#022C22]',
    iconBg: 'bg-[#064E3B]',
    icon: <Layers className="w-6 h-6 text-amber-300" />,
    btnText: 'Luyện Thẻ 3D Ngay',
    btnColor: 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-amber-600/20',
    previewGraphic: 'Thẻ 3D • Oxford 3000 • Tự Động Lưu MySQL',
  },
  {
    id: 2,
    chapterLabel: '[CHƯƠNG II: PHỔ ÂM VỊ]',
    screen: 'speaking',
    badge: 'Phoneme AI Speech',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
    title: 'Phát Âm & Ghi Âm AI Studio',
    headline: 'Bóc Tách Âm Vị IPA & So Sánh Đồ Thị Sóng Âm',
    description:
      'Ghi âm tương tác với mic ripple rings trực quan, phân tích chi tiết điểm số từng âm vị IPA, phát hiện lỗi phát âm sai và đối chiếu trực quan đồ thị sóng âm Waveform với người bản xứ.',
    highlights: [
      'Bóc tách từng âm tiết và phiên âm quốc tế IPA',
      'Đồ thị sóng âm Waveform đối chiếu thời gian thực',
      'Chấm điểm độ chính xác chuẩn bản xứ 0 - 100%',
    ],
    gradient: 'from-[#064E3B] to-[#022C22]',
    iconBg: 'bg-[#064E3B]',
    icon: <Mic className="w-6 h-6 text-amber-300" />,
    btnText: 'Bắt Đầu Thu Âm Ngay',
    btnColor: 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-amber-600/20',
    previewGraphic: 'Waveform • Real-time Speech Analysis',
  },
  {
    id: 3,
    chapterLabel: '[CHƯƠNG III: THÍNH GIÁC A-B]',
    screen: 'listening',
    badge: 'Smart Audio & Dictation',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-200',
    title: 'Luyện Nghe Karaoke & Dictation',
    headline: 'Nghe Chép Chính Tả & Lặp Đoạn Chuyên Sâu A-B Loop',
    description:
      'Trình phát audio thông minh tua ±5s, lặp đoạn A-B loop chuyên sâu, lời thoại song ngữ chạy karaoke theo từng mili-giây và chế độ điền từ khuyết thử thách phản xạ tai nghe.',
    highlights: [
      'Karaoke transcript tự động cuộn theo giọng nói',
      'Công cụ đánh dấu đoạn lặp vô tận A-B Loop',
      'Chế độ Dictation điền từ khuyết tăng phản xạ',
    ],
    gradient: 'from-[#064E3B] to-[#022C22]',
    iconBg: 'bg-[#064E3B]',
    icon: <Headphones className="w-6 h-6 text-amber-300" />,
    btnText: 'Mở Trình Luyện Nghe',
    btnColor: 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-amber-600/20',
    previewGraphic: 'Karaoke Sync • Lặp A-B • Chép Chính Tả',
  },
  {
    id: 4,
    chapterLabel: '[CHƯƠNG IV: CÚ PHÁP CẤU TRÚC]',
    screen: 'sentence-builder',
    badge: 'Grammar Architecture',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200/80',
    title: 'Ghép Câu Ngữ Pháp Tương Tác',
    headline: 'Lắp Ghép Trật Tự Câu Với Phản Hồi Xúc Giác',
    description:
      'Rèn luyện tư duy cấu trúc câu tiếng Anh tự nhiên qua thao tác chạm kéo word pill chips, phản hồi rung lắc khi sai vị trí và hiệu ứng âm thanh pop + confetti khi hoàn thành chính xác.',
    highlights: [
      'Học trật tự từ tự nhiên qua thao tác xúc giác tương tác',
      'Hiệu ứng rung lắc (shake) cảnh báo lỗi sai vị trí',
      'Giải thích ngữ pháp chi tiết & phát âm toàn câu',
    ],
    gradient: 'from-[#064E3B] to-[#022C22]',
    iconBg: 'bg-[#064E3B]',
    icon: <FileText className="w-6 h-6 text-amber-300" />,
    btnText: 'Thử Thách Ghép Câu',
    btnColor: 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-amber-600/20',
    previewGraphic: 'Word Chips • Rung Lắc Haptic • Confetti',
  },
  {
    id: 5,
    chapterLabel: '[CHƯƠNG V: KHẢO THÍ VIẾT LUẬN]',
    screen: 'writing',
    badge: 'Cambridge IELTS 4 Rubrics',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
    title: 'Chấm Viết Luận Học Thuật AI',
    headline: 'Phân Tích Bài Luận Chuẩn Quốc Tế Band 1.0 - 9.0',
    description:
      'Môi trường mô phỏng phòng thi IELTS Task 1 & 2 với live word count, đồng hồ đếm ngược, phân tích danh mục từ vựng học thuật Academic Word List (AWL), gợi ý Collocations và lời phê giám khảo.',
    highlights: [
      'Chấm điểm 4 tiêu chí: Task Response • CC • Lexical • Grammar',
      'Tự động bóc tách từ vựng Academic Word List (AWL/C1)',
      'Gợi ý nâng cấp Collocations & Bài luận mẫu Band 8.5+',
    ],
    gradient: 'from-[#064E3B] to-[#022C22]',
    iconBg: 'bg-[#064E3B]',
    icon: <PenTool className="w-6 h-6 text-amber-300" />,
    btnText: 'Vào Phòng Viết Luận',
    btnColor: 'bg-[#D97706] hover:bg-[#B45309] text-white shadow-amber-600/20',
    previewGraphic: 'Cambridge IELTS • AWL Vocabulary • Band 8.5',
  },
];

export const ScrollyFeatures: React.FC<ScrollyFeaturesProps> = ({ onNavigateScreen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // DESKTOP: >= 1024px -> Kích hoạt Pinned Showcase Scrollytelling
      mm.add('(min-width: 1024px)', () => {
        // Tạo timeline gắn liền với ScrollTrigger ghim trong 2500px
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinTargetRef.current,
            start: 'top top',
            end: '+=2500',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Cập nhật bước active tương ứng với tiến độ cuộn (0 -> 4)
              const stepIndex = Math.min(4, Math.floor(self.progress * 5));
              setActiveStep(stepIndex);
            },
          },
        });

        // Thanh tiến trình cuộn trên đỉnh (scaleX 0 -> 1)
        tl.to(
          '.features-progress-bar',
          {
            scaleY: 1,
            ease: 'none',
            duration: 4,
          },
          0
        );

        // Chuyển động tuần tự giữa 5 Cards trong không gian 3D
        // Card 0 -> Card 1
        tl.to(
          '.scrolly-card-0',
          {
            yPercent: -35,
            scale: 0.9,
            autoAlpha: 0,
            rotateX: 6,
            ease: 'power1.inOut',
            duration: 1,
          },
          0.8
        );
        tl.fromTo(
          '.scrolly-card-1',
          { yPercent: 40, scale: 0.9, autoAlpha: 0, rotateX: -6 },
          { yPercent: 0, scale: 1, autoAlpha: 1, rotateX: 0, ease: 'power1.out', duration: 1 },
          1.0
        );

        // Card 1 -> Card 2
        tl.to(
          '.scrolly-card-1',
          {
            yPercent: -35,
            scale: 0.9,
            autoAlpha: 0,
            rotateX: 6,
            ease: 'power1.inOut',
            duration: 1,
          },
          1.8
        );
        tl.fromTo(
          '.scrolly-card-2',
          { yPercent: 40, scale: 0.9, autoAlpha: 0, rotateX: -6 },
          { yPercent: 0, scale: 1, autoAlpha: 1, rotateX: 0, ease: 'power1.out', duration: 1 },
          2.0
        );

        // Card 2 -> Card 3
        tl.to(
          '.scrolly-card-2',
          {
            yPercent: -35,
            scale: 0.9,
            autoAlpha: 0,
            rotateX: 6,
            ease: 'power1.inOut',
            duration: 1,
          },
          2.8
        );
        tl.fromTo(
          '.scrolly-card-3',
          { yPercent: 40, scale: 0.9, autoAlpha: 0, rotateX: -6 },
          { yPercent: 0, scale: 1, autoAlpha: 1, rotateX: 0, ease: 'power1.out', duration: 1 },
          3.0
        );

        // Card 3 -> Card 4
        tl.to(
          '.scrolly-card-3',
          {
            yPercent: -35,
            scale: 0.9,
            autoAlpha: 0,
            rotateX: 6,
            ease: 'power1.inOut',
            duration: 1,
          },
          3.8
        );
        tl.fromTo(
          '.scrolly-card-4',
          { yPercent: 40, scale: 0.9, autoAlpha: 1, rotateX: -6 },
          { yPercent: 0, scale: 1, autoAlpha: 1, rotateX: 0, ease: 'power1.out', duration: 1 },
          4.0
        );
      });

      // MOBILE: < 1024px -> Không ghim, hiển thị dạng cuộn dọc có stagger fade-in
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          '.mobile-card-item',
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full relative">
      {/* 
        DESKTOP PINNED SHOWCASE:
        Ghim toàn màn hình trong 2500px cuộn.
      */}
      <div
        ref={pinTargetRef}
        className="hidden lg:flex h-screen w-full flex-col justify-center items-center relative overflow-hidden bg-[#022C22] rounded-3xl border border-amber-600/30 shadow-2xl p-8 sm:p-12 text-white select-none"
      >
        {/* Background subtle radial pattern and ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.12),rgba(6,78,59,0.4))] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

        {/* Scroll indicator text */}
        <div className="absolute top-6 right-8 flex items-center gap-2 text-xs text-amber-400/80 font-mono tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>CHƯƠNG MỤC HỌC THUẬT: 5 PHÂN HỆ</span>
        </div>

        {/* 2-Column Scrollytelling Container */}
        <div className="relative z-10 w-full max-w-6xl grid grid-cols-12 gap-8 items-center">
          {/* LEFT COLUMN: Fixed Header & 5-Step Progress Bar (5 cols) */}
          <div className="col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                <span>Không Gian Luyện Tập Học Thuật</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight leading-tight">
                Chinh Phục Toàn Diện 4 Kỹ Năng Cùng AI
              </h2>
              <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                Cuộn chuột để trải nghiệm lần lượt 5 phân hệ chuyên khảo với phản hồi tức thì và chuẩn hóa năng lực ngôn ngữ.
              </p>
            </div>

            {/* 5-Step Vertical Progress Indicator */}
            <div className="relative pl-6 space-y-4 pt-2">
              {/* Vertical connecting line */}
              <div className="absolute left-[9px] top-3 bottom-3 w-[2px] bg-[#064E3B] rounded-full overflow-hidden">
                <div
                  className="features-progress-bar w-full h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 origin-top will-change-transform"
                  style={{ transform: 'scaleY(0)' }}
                />
              </div>

              {FEATURES.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      isActive ? 'translate-x-2' : 'opacity-60'
                    }`}
                  >
                    {/* Glowing step dot */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 z-10 ${
                        isActive
                          ? 'bg-[#D97706] text-white ring-4 ring-amber-500/30 shadow-lg shadow-amber-500/50 scale-125'
                          : 'bg-[#064E3B]/80 text-stone-300 border border-emerald-800/80'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    {/* Step label */}
                    <div>
                      <div
                        className={`text-xs font-bold transition-colors ${
                          isActive ? 'text-amber-300' : 'text-stone-300'
                        }`}
                      >
                        {item.title}
                      </div>
                      <div className="text-[10px] text-amber-200/70 font-medium">{item.chapterLabel}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: 5 Staked 3D Cards Viewport (7 cols) */}
          <div className="col-span-7 relative h-[480px] flex items-center justify-center [perspective:1200px]">
            {FEATURES.map((feat, idx) => {
              return (
                <div
                  key={feat.id}
                  className={`scrolly-card-${idx} absolute inset-x-0 mx-auto max-w-lg p-8 rounded-3xl bg-[#FAFAF9] border border-stone-200/90 shadow-2xl backdrop-blur-xl will-change-transform flex flex-col justify-between h-[455px]`}
                  style={{
                    transform:
                      idx === 0
                        ? 'translate3d(0, 0%, 0) scale(1)'
                        : 'translate3d(0, 40%, 0) scale(0.9)',
                    opacity: idx === 0 ? 1 : 0,
                  }}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase">
                          {feat.chapterLabel}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${feat.badgeColor}`}>
                          {feat.badge}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                        {feat.previewGraphic}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-3 mt-3">
                      <div className={`p-3 rounded-2xl ${feat.iconBg} text-amber-300 shadow-md shrink-0`}>
                        {feat.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#064E3B] leading-tight">
                          {feat.title}
                        </h3>
                        <p className="text-xs text-amber-800 font-medium mt-0.5">{feat.headline}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2 mb-4">
                      {feat.description}
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-200/80">
                      {feat.highlights.map((high, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{high}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <div className="text-xs text-stone-500 font-mono">
                      Chuyên khảo <strong className="text-[#064E3B]">{feat.id}</strong> / 5
                    </div>

                    <button
                      onClick={() => onNavigateScreen && onNavigateScreen(feat.screen)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-md cursor-pointer group ${feat.btnColor}`}
                    >
                      <span>{feat.btnText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 
        MOBILE RESPONSIVE SHOWCASE (< 1024px):
        Tự động chuyển thành danh sách cuộn dọc mượt mà có stagger fade-in.
      */}
      <div className="lg:hidden space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-700" /> 5 Không Gian Luyện Tập
          </span>
          <h2 className="text-2xl font-black text-[#064E3B] tracking-tight">
            Trải Nghiệm Toàn Diện Cùng EduFlow
          </h2>
        </div>

        <div className="space-y-4">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="mobile-card-item p-6 rounded-3xl bg-white border border-stone-200/90 shadow-md space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                    {feat.chapterLabel}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${feat.badgeColor}`}>
                    {feat.badge}
                  </span>
                </div>
                <span className="text-xs text-stone-400 font-mono">#0{feat.id}</span>
              </div>

              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${feat.iconBg} text-amber-300 shrink-0`}>
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#064E3B]">{feat.title}</h3>
                  <p className="text-xs text-amber-800 font-medium">{feat.headline}</p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{feat.description}</p>

              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                {feat.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateScreen && onNavigateScreen(feat.screen)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs shadow-sm cursor-pointer group ${feat.btnColor}`}
              >
                <span>{feat.btnText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
