import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Layers,
  Activity,
  Headphones,
  FileText,
  PenTool,
  Lock,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AcademicChaptersScrollyProps {
  onRequireAuth: (chapterTitle: string) => void;
}

export const AcademicChaptersScrolly: React.FC<AcademicChaptersScrollyProps> = ({
  onRequireAuth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const chapters = [
    {
      id: 'chapter-1',
      number: 'Chương I',
      title: 'Thẻ Từ Vựng 3D & Thuật Toán Spaced Repetition',
      subtitle: 'Khai thác đường cong quên của Ebbinghaus và cơ chế 5 Hộp Leitner',
      discipline: 'Nhận Thức & Ghi Nhớ Ngữ Nghĩa',
      icon: <Layers className="w-5 h-5 text-forest-900" />,
      tag: 'Leitner Box 1-5 • Oxford 3000',
      description:
        'Cung cấp khả năng quan sát từ vựng đa chiều qua mô hình thẻ 3D lật 180 độ. Thuật toán tự động đo đạc ngưỡng phản xạ của não bộ, lập lịch ôn tập đúng thời điểm vàng trước khi ký ức bắt đầu phai nhạt.',
      features: [
        'Mô hình thẻ lật 3D hai mặt kèm phát âm bản xứ chuẩn ngữ âm IPA',
        'Phân loại 5 cấp độ trí nhớ từ vựng (Nhận biết sơ cấp đến Vỏ não sâu)',
        'Ngữ cảnh ví dụ học thuật trích xuất từ các tạp chí khoa học quốc tế',
      ],
      previewBadge: '148 Đơn vị từ vựng chuẩn hóa',
      mockVisual: {
        title: 'ephemeral',
        ipa: '/ɪˈfem.ər.əl/',
        type: 'adjective',
        def: 'Lasting for a very short time; transitory.',
        example: '"Fashions are ephemeral, but true academic style is timeless."',
        box: 'Hộp Leitner 4 (Nhớ vững 14 ngày)',
      },
    },
    {
      id: 'chapter-2',
      number: 'Chương II',
      title: 'Phòng Thu Âm Vị & Biểu Đồ Sóng Âm AI Waveform',
      subtitle: 'Bóc tách tần số Hertz và định vị chuẩn xác khẩu hình IPA',
      discipline: 'Âm Học Thực Nghiệm (Acoustic Phonetics)',
      icon: <Activity className="w-5 h-5 text-emerald-800" />,
      tag: 'Phoneme Recognition • Waveform AI',
      description:
        'Không đơn thuần ghi âm, hệ thống AI bóc tách tín hiệu giọng nói thành phổ tần số sóng âm (Spectrogram). Đối soát từng miligiây với phát âm mẫu của người bản ngữ để chỉ rõ điểm nuốt âm, trọng âm sai và vị trí đặt lưỡi.',
      features: [
        'Trực quan hóa đồ thị sóng âm thời gian thực khi học viên nói',
        'Phát hiện lỗi sai nguyên âm đôi, phụ âm cuối (/t/, /d/, /θ/, /ð/)',
        'Chấm điểm độ chuẩn xác âm vị theo thang phần trăm Cambridge',
      ],
      previewBadge: 'Độ chuẩn xác âm vị đạt 94.2%',
      mockVisual: {
        targetPhrase: '"Theory without practice is sterile."',
        phoneticTarget: '/ˈθɪə.ri wɪˈðaʊt ˈpræk.tɪs ɪz ˈster.aɪl/',
        detectedScore: '94% Match',
        feedback: 'Âm /θ/ đặt lưỡi chuẩn xác, lưu ý nối âm "without practice".',
      },
    },
    {
      id: 'chapter-3',
      number: 'Chương III',
      title: 'Khảo Thí Nghe & Chép Chính Tả A-B Loop & Dictation',
      subtitle: 'Chấm dứt lối nghe thụ động bằng cơ chế định vị micro-audio',
      discipline: 'Thính Giác & Phân Tích Cú Pháp Nghe',
      icon: <Headphones className="w-5 h-5 text-gold-700" />,
      tag: 'A-B Loop • Real-time Dictation',
      description:
        'Biến việc nghe tiếng Anh thành quá trình giải mã ký tự chủ động. Chế độ lặp phân đoạn A-B Loop cho phép tua chậm 0.75x - 1.0x kết hợp gõ chép chính tả tức thời từng từ, đồng bộ chữ chạy chính xác như phòng thu âm.',
      features: [
        'Tùy chỉnh điểm đầu và điểm cuối vòng lặp A-B loop tùy ý',
        'Bộ lọc nhận diện gõ đúng - gõ sai từng ký tự trong thời gian thực',
        'Phân đoạn hội thoại học thuật, bài giảng TED Talk và phỏng vấn quốc tế',
      ],
      previewBadge: '32 Khung bài nghe phân đoạn chuyên sâu',
      mockVisual: {
        audioSource: 'Lecture 04: The Evolution of Syntax (Dr. Harrison)',
        loopRange: '02:15 - 02:28 (A-B Loop)',
        dictationPrompt: 'Gõ chính xác những gì bạn nghe được trong đoạn trích trên:',
        transcriptStatus: 'Đã khớp 18/19 từ • Độ nhạy 95%',
      },
    },
    {
      id: 'chapter-4',
      number: 'Chương IV',
      title: 'Kiến Trúc Cú Pháp & Cây Ngữ Pháp Trực Quan',
      subtitle: 'Kéo thả Token cấu trúc câu, loại bỏ hoàn toàn lối dịch word-by-word',
      discipline: 'Cú Pháp Học Cấu Trúc (Generative Syntax)',
      icon: <FileText className="w-5 h-5 text-forest-900" />,
      tag: 'Sentence Builder • Token Architecture',
      description:
        'Thay thế việc học thuộc lòng các công thức ngữ pháp rời rạc bằng bảng lắp ghép cấu trúc câu logic. Người học kéo thả các khối từ (Subject, Verb, Object, Complement) để kiến tạo câu phức và câu ghép mạch lạc.',
      features: [
        'Hệ thống khối từ phân màu nhận diện từ loại (Danh từ, Động từ, Giới từ)',
        'Phát hiện lỗi sai thì, sự hòa hợp chủ - vị và trật tự bổ ngữ tức thì',
        'Giải thích bản chất ngữ pháp dưới góc nhìn ngôn ngữ học cấu trúc',
      ],
      previewBadge: 'Cấu trúc cú pháp đa tầng trực quan',
      mockVisual: {
        syntaxGoal: 'Kiến tạo câu điều kiện loại 3 đảo ngữ:',
        tokens: ['Had', 'the committee', 'analyzed', 'the empirical data', 'thoroughly,'],
        feedback: 'Cấu trúc đảo ngữ chuẩn xác 100%. Mức độ học thuật C2.',
      },
    },
    {
      id: 'chapter-5',
      number: 'Chương V',
      title: 'Đánh Giá & Hiệu Chỉnh Luận Văn Học Thuật AI',
      subtitle: 'Chấm 4 tiêu chí IELTS Band Descriptors và khuyến nghị nâng cấp C1-C2',
      discipline: 'Khảo Thí Văn Bản Học Thuật (Academic Discourse)',
      icon: <PenTool className="w-5 h-5 text-forest-900" />,
      tag: 'Task 1 & Task 2 • Rubric Evaluator',
      description:
        'Phòng thẩm định văn bản học thuật áp dụng đúng biểu điểm 4 tiêu chí chính thức: Task Response, Coherence & Cohesion, Lexical Resource và Grammatical Range & Accuracy. Đưa ra gợi ý viết lại câu nâng cao phong cách trang trọng.',
      features: [
        'Báo cáo chấm điểm chi tiết 4 tiêu chí theo thang điểm Band 1.0 - 9.0',
        'Gợi ý nâng cấp các từ vựng thông dụng sang thuật ngữ học thuật C1 - C2',
        'Phát hiện văn phong khẩu ngữ (informal) và sửa lỗi liên kết câu',
      ],
      previewBadge: 'Chấm 4 tiêu chuẩn IELTS Band trong 3 giây',
      mockVisual: {
        essayTopic: 'IELTS Writing Task 2: Artificial Intelligence in Education',
        currentScore: 'Overall Band 8.0 (TR: 8.0, CC: 8.0, LR: 8.5, GRA: 7.5)',
        suggestion: 'Thay "a lot of" bằng "a substantial volume of empirical research".',
      },
    },
  ];

  useGSAP(
    () => {
      // Create responsive ScrollTrigger using matchMedia
      const mm = gsap.matchMedia();

      // DESKTOP: Screen width >= 1024px -> Pin entire section and scroll through chapters
      mm.add('(min-width: 1024px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.chapter-dossier-card');
        if (cards.length === 0 || !pinSectionRef.current) return;

        // Set initial positions: first card visible, others stacked below
        gsap.set(cards, { autoAlpha: 0, yPercent: 40, scale: 0.95 });
        gsap.set(cards[0], { autoAlpha: 1, yPercent: 0, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: 'top top',
            end: '+=3200',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const chapterIndex = Math.min(
                Math.floor(progress * chapters.length),
                chapters.length - 1
              );
              setActiveChapterIndex(chapterIndex);
            },
          },
        });

        // Sequence through the 5 chapters
        cards.forEach((card, idx) => {
          if (idx === 0) return;
          const prevCard = cards[idx - 1];

          tl.to(
            prevCard,
            {
              yPercent: -30,
              autoAlpha: 0,
              scale: 0.92,
              duration: 1,
              ease: 'power2.inOut',
            },
            `step-${idx}`
          ).to(
            card,
            {
              yPercent: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1,
              ease: 'power2.inOut',
            },
            `step-${idx}`
          );
        });
      });

      // MOBILE: Screen width < 1024px -> Normal vertical stack with fade-in stagger
      mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.chapter-dossier-card');
        gsap.set(cards, { autoAlpha: 1, yPercent: 0, scale: 1 });

        cards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            y: 30,
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="chapters"
      ref={containerRef}
      className="bg-[#FAFAF9]/85 backdrop-blur-[2px] border-b border-stone-300 relative text-stone-900"
    >
      {/* Desktop Pin Wrapper */}
      <div
        ref={pinSectionRef}
        className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center"
      >
        {/* Section Header */}
        <div className="text-left mb-10 pb-6 border-b border-stone-300 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-mono uppercase font-bold tracking-normal">
              <Bookmark className="w-3.5 h-3.5 text-gold-600" />
              <span>Phương Pháp Luận Khoa Học</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-tight leading-tight">
              5 Chương Phương Pháp Luận Tương Tác
            </h2>
          </div>
          <p className="text-xs text-stone-600 font-sans max-w-md">
            Mỗi phân hệ học thuật được thiết kế như một phòng thí nghiệm ngôn ngữ chuyên biệt,
            giúp học viên biến kiến thức thụ động thành năng lực phản xạ vững vàng.
          </p>
        </div>

        {/* 2-Column Scrolly Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Fixed 5 Chapters Table of Contents (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="hidden lg:block space-y-2.5">
              <p className="text-[11px] font-mono font-bold uppercase tracking-normal text-stone-400 mb-2">
                — Mục Lục Chuyên Khảo —
              </p>

              {chapters.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <div
                    key={ch.id}
                    onClick={() => {
                      // Allow clicking chapter in desktop
                      setActiveChapterIndex(idx);
                    }}
                    className={`p-4 rounded-2xl transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? 'bg-[#064E3B] text-white border-amber-500/60 shadow-md translate-x-1.5'
                        : 'bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`text-[11px] font-mono font-bold uppercase tracking-normal ${
                          isActive ? 'text-amber-300' : 'text-stone-500'
                        }`}
                      >
                        {ch.number}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          isActive
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {ch.discipline}
                      </span>
                    </div>

                    <h3
                      className={`text-sm sm:text-base leading-snug tracking-normal ${
                        isActive
                          ? 'font-sans font-bold text-white'
                          : 'font-sans font-semibold text-stone-800'
                      }`}
                    >
                      {ch.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Micro citation badge */}
            <div className="p-4 rounded-xl bg-gold-50 border border-gold-200 text-xs text-gold-950 space-y-1 hidden lg:block">
              <span className="font-bold flex items-center gap-1 text-gold-800">
                <Sparkles className="w-3.5 h-3.5" />
                Nguyên Lý Micro-Feedback:
              </span>
              <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                Não bộ học ngôn ngữ nhanh hơn 400% khi được đối chiếu sai lệch phát âm và ngữ pháp
                ngay trong khoảnh khắc vừa tạo ra câu nói.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Depth Dossier Cards (7 Cols on Desktop) */}
          <div
            ref={rightColumnRef}
            className="lg:col-span-7 relative min-h-[460px] lg:h-[500px]"
          >
            {chapters.map((ch, idx) => (
              <div
                key={ch.id}
                className={`chapter-dossier-card rounded-3xl bg-white border border-stone-300 p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 lg:absolute lg:inset-0 ${
                  // On mobile, keep standard margin
                  'mb-6 lg:mb-0'
                }`}
              >
                {/* Header of Dossier Card */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-amber-300 flex items-center justify-center shadow-xs">
                        {ch.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-700 tracking-normal">
                          {ch.number} • {ch.discipline}
                        </span>
                        <h4 className="text-lg sm:text-xl font-sans font-bold text-[#064E3B] leading-snug tracking-normal">
                          {ch.title}
                        </h4>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-[11px] font-bold text-stone-600 shrink-0">
                      <Lock className="w-3 h-3 text-gold-700" />
                      <span>Cần xác thực</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed pt-1">
                    {ch.description}
                  </p>
                </div>

                {/* Simulated Scientific Experiment Mockup Visual */}
                <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-b border-stone-200 pb-1.5 uppercase tracking-normal">
                    <span>Mô phỏng dữ liệu phòng thí nghiệm</span>
                    <span className="text-forest-900 font-bold">{ch.previewBadge}</span>
                  </div>

                  {/* Chapter specific mock preview */}
                  {idx === 0 && (
                    <div className="space-y-1">
                      <div className="text-base font-sans font-bold text-forest-950">
                        {ch.mockVisual.title}{' '}
                        <span className="font-mono text-xs font-normal text-stone-500">
                          {ch.mockVisual.ipa}
                        </span>
                      </div>
                      <p className="text-stone-700 italic font-sans text-xs">
                        {ch.mockVisual.example}
                      </p>
                      <div className="text-[10px] text-gold-700 font-mono font-bold pt-1">
                        {ch.mockVisual.box}
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="space-y-1.5">
                      <div className="font-sans font-bold text-forest-950">
                        {ch.mockVisual.targetPhrase}
                      </div>
                      <div className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                        {ch.mockVisual.detectedScore} • {ch.mockVisual.phoneticTarget}
                      </div>
                      <p className="text-[11px] text-stone-600">{ch.mockVisual.feedback}</p>
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="space-y-1.5">
                      <div className="font-bold text-forest-950">{ch.mockVisual.audioSource}</div>
                      <div className="text-[11px] font-mono text-gold-800 bg-gold-50 px-2 py-0.5 rounded border border-gold-200 inline-block">
                        {ch.mockVisual.loopRange}
                      </div>
                      <p className="text-[11px] text-stone-600 font-sans">
                        {ch.mockVisual.transcriptStatus}
                      </p>
                    </div>
                  )}

                  {idx === 3 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-forest-950">
                        {ch.mockVisual.syntaxGoal}
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-1">
                        {ch.mockVisual.tokens?.map((tok, ti) => (
                          <span
                            key={ti}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-stone-800 text-xs font-sans font-medium shadow-sm"
                          >
                            {tok}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        {ch.mockVisual.feedback}
                      </p>
                    </div>
                  )}

                  {idx === 4 && (
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-forest-950">
                        {ch.mockVisual.essayTopic}
                      </div>
                      <div className="font-mono text-[11px] text-gold-800 bg-gold-50 px-2 py-0.5 rounded border border-gold-200 inline-block">
                        {ch.mockVisual.currentScore}
                      </div>
                      <p className="text-[11px] text-stone-600 italic">
                        Khuyến nghị: {ch.mockVisual.suggestion}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features checklist */}
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {ch.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button: Intercepts & triggers Auth Modal */}
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-500">
                    Phân hệ cần tài khoản học thuật
                  </span>

                  <button
                    onClick={() => onRequireAuth(ch.title)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] font-sans font-semibold text-white tracking-wide border border-emerald-800 text-xs uppercase shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Vào phòng thí nghiệm</span>
                    <ArrowRight size={14} className="text-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
