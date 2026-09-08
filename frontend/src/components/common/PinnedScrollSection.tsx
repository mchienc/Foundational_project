import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, BookOpen, Award, Zap, CheckCircle2, ArrowDown } from 'lucide-react';

// Đăng ký plugin đúng quy chuẩn GSAP trước khi sử dụng
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StepData {
  id: number;
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  gradient: string;
  metric: string;
  metricLabel: string;
}

const STEPS: StepData[] = [
  {
    id: 1,
    step: 'GIAI ĐOẠN 01',
    title: 'Học tập tương tác & Lộ trình thông minh',
    description: 'Hệ thống tự động đề xuất lộ trình cá nhân hóa theo trình độ hiện tại của bạn với các bài giảng tương tác đa giác quan.',
    icon: BookOpen,
    tag: 'Adaptive Learning',
    gradient: 'from-blue-500 to-indigo-600',
    metric: '98%',
    metricLabel: 'Tỷ lệ hiểu bài ngay sau bài học',
  },
  {
    id: 2,
    step: 'GIAI ĐOẠN 02',
    title: 'Phản hồi tức thì cùng Trợ lý AI',
    description: 'Chấm điểm phát âm chuẩn bản xứ, sửa lỗi ngữ pháp văn cảnh và phân tích chuyên sâu lỗi sai trong thời gian thực.',
    icon: Zap,
    tag: 'Real-time AI Feedback',
    gradient: 'from-indigo-500 to-purple-600',
    metric: '3.5x',
    metricLabel: 'Tốc độ tiến bộ vượt trội',
  },
  {
    id: 3,
    step: 'GIAI ĐOẠN 03',
    title: 'Làm chủ kỹ năng & Nhận chứng chỉ',
    description: 'Hoàn thành các mốc đánh giá năng lực toàn diện, mở khóa chứng chỉ chuẩn quốc tế và tự tin ứng dụng vào thực tế.',
    icon: Award,
    tag: 'Certified Mastery',
    gradient: 'from-emerald-500 to-teal-600',
    metric: '100%',
    metricLabel: 'Được công nhận trong hệ sinh thái',
  },
];

export const PinnedScrollSection: React.FC = () => {
  // Ref container đóng vai trò Scope cho useGSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Tuân thủ quy chuẩn gsap-react & gsap-scrolltrigger:
   * 1. Scope ref giúp giới hạn selector và tự động revert / cleanup sạch sẽ khi unmount.
   * 2. Pin màn hình trong đúng 2000px cuộn (end: "+=2000").
   * 3. Tuyệt đối không animate chính element được pin (pinWrapperRef), chỉ animate các phần tử con.
   * 4. Tuân thủ gsap-performance: Chỉ transform bằng GPU (x, y, scale, scaleX, opacity), không dùng layout props (top, left, width).
   */
  useGSAP(() => {
    // Tạo Timeline đồng bộ với ScrollTrigger gắn trên pinned container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinWrapperRef.current,
        start: 'top top',
        end: '+=2000', // Ghim màn hình cố định trong 2000px khoảng cách cuộn
        pin: true,     // Kích hoạt tính năng ghim
        pinSpacing: true, // Giữ khoảng cách layout không bị xô lệch
        scrub: 1,      // Scrub mượt mà (lag 1s giúp giảm tải CPU, tối ưu 60fps)
        anticipatePin: 1, // Ngăn hiện tượng nháy giật khi chạm điểm ghim
      },
    });

    // 1. Thanh tiến trình cuộn: Sử dụng GPU scaleX thay vì thay đổi width
    tl.to('.scroll-progress-indicator', {
      scaleX: 1,
      ease: 'none',
      duration: 3,
    }, 0);

    // 2. Chuyển đổi giữa Card 1 và Card 2
    // Card 1 thoát: dịch chuyển y lên trên, thu nhỏ scale, mờ dần opacity
    tl.to('.card-step-0', {
      y: -60,
      scale: 0.88,
      opacity: 0,
      ease: 'power1.inOut',
      duration: 1,
    }, 0.8);

    // Card 2 xuất hiện: đi từ dưới lên (y: 60), phóng to (scale 0.88 -> 1), tăng opacity
    tl.fromTo('.card-step-1',
      { y: 60, scale: 0.88, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, ease: 'power1.out', duration: 1 },
      1.0
    );

    // 3. Chuyển đổi giữa Card 2 và Card 3
    // Card 2 thoát
    tl.to('.card-step-1', {
      y: -60,
      scale: 0.88,
      opacity: 0,
      ease: 'power1.inOut',
      duration: 1,
    }, 1.8);

    // Card 3 xuất hiện
    tl.fromTo('.card-step-2',
      { y: 60, scale: 0.88, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, ease: 'power1.out', duration: 1 },
      2.0
    );

    // 4. Các badge trang trí lơ lửng: Tận dụng GPU translate (x, y) & rotation
    tl.to('.floating-badge-top', {
      y: -140,
      x: 30,
      rotation: 12,
      ease: 'none',
      duration: 3,
    }, 0);

    tl.to('.floating-badge-bottom', {
      y: -100,
      x: -40,
      rotation: -10,
      ease: 'none',
      duration: 3,
    }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {/* Header chỉ dẫn phía trên section để tạo đà cuộn */}
      <div className="py-24 px-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Quy chuẩn GSAP ScrollTrigger + GPU Performance
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Hành Trình Học Tập 3 Giai Đoạn
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400">
          Cuộn chuột xuống để trải nghiệm cơ chế Pin Section trong 2000px với chuyển động GPU Transform 60fps mượt mà.
        </p>
        <div className="mt-8 flex justify-center items-center gap-2 text-sm text-slate-500 animate-bounce">
          <span>Cuộn xuống</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>

      {/* 
        PINNED SECTION: Màn hình sẽ được ghim lại ở đây khi top chạm đỉnh viewport.
        Quan trọng: Không áp dụng animation transform trực tiếp lên thẻ pinWrapperRef!
      */}
      <section
        ref={pinWrapperRef}
        className="pin-container h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-slate-900 border-y border-slate-800"
      >
        {/* Lớp nền hiệu ứng Gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

        {/* Thanh tiến trình cuộn trên đỉnh (Tối ưu bằng transform scaleX, transform-origin: left) */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800 z-50 overflow-hidden">
          <div
            className="scroll-progress-indicator h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 origin-left will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Floating badge 1 (GPU accelerated x/y/rotation) */}
        <div className="floating-badge-top absolute top-20 right-8 sm:right-24 hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 backdrop-blur-md text-indigo-300 text-xs font-medium shadow-2xl pointer-events-none will-change-transform">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>GPU Compositor Active</span>
        </div>

        {/* Floating badge 2 (GPU accelerated x/y/rotation) */}
        <div className="floating-badge-bottom absolute bottom-20 left-8 sm:left-24 hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md text-emerald-300 text-xs font-medium shadow-2xl pointer-events-none will-change-transform">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>useGSAP Clean Reverted</span>
        </div>

        {/* Chỉ số khoảng cách cuộn còn lại */}
        <div className="absolute top-6 left-6 text-xs text-slate-500 font-mono tracking-wider">
          PIN DURATION: 2000PX
        </div>

        {/* Container chứa 3 Cards nằm đè lên nhau (Stack) */}
        <div className="relative w-full max-w-2xl px-4 h-[440px] flex items-center justify-center">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`card-step-${index} absolute inset-x-4 max-w-xl mx-auto p-8 rounded-3xl bg-slate-800/90 border border-slate-700/60 shadow-2xl backdrop-blur-xl will-change-transform`}
                style={{
                  // Khởi tạo trạng thái ban đầu: chỉ Card 0 hiển thị, các Card khác ẩn sẵn bằng GPU transform
                  transform: index === 0 ? 'translate3d(0, 0px, 0) scale(1)' : 'translate3d(0, 60px, 0) scale(0.88)',
                  opacity: index === 0 ? 1 : 0,
                }}
              >
                {/* Header Card */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    {step.step}
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
                    {step.tag}
                  </span>
                </div>

                {/* Biểu tượng & Tiêu đề */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Mô tả */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Thống kê / Kết quả */}
                <div className="pt-6 border-t border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {step.metric}
                    </div>
                    <div className="text-xs text-slate-400">
                      {step.metricLabel}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Bước {index + 1} / {STEPS.length}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section nội dung kế tiếp để chứng minh Pin Section nhả ra mượt mà sau 2000px */}
      <div className="py-32 px-4 text-center max-w-2xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Hoàn Thành Cuộn 2000px
        </h3>
        <p className="text-slate-400 text-base leading-relaxed">
          Pin Section đã nhả ghim thành công và nhường chỗ cho dòng nội dung tiếp theo mà không gây giật lag hay vỡ bố cục nhờ vào <code className="text-indigo-400 font-mono">pinSpacing: true</code> và cơ chế GPU Transform của GSAP.
        </p>
      </div>
    </div>
  );
};

export default PinnedScrollSection;
