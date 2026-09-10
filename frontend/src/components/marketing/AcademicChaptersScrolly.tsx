import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Headphones,
  Layers,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface AcademicChaptersScrollyProps {
  onRequireAuth: (chapterTitle: string) => void;
}

export const AcademicChaptersScrolly: React.FC<AcademicChaptersScrollyProps> = ({
  onRequireAuth,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const chapters = [
    {
      id: 'chapter-1',
      number: 'Tính Năng 1',
      title: 'Luyện Đọc Cambridge IELTS (Cam 10 - 20)',
      subtitle: 'Trọn bộ 28 đề Full Tests và 84 bài đọc Passage',
      discipline: 'Luyện Đọc Thực Chiến',
      icon: <BookOpen className="w-5 h-5 text-amber-300" />,
      tag: 'Cambridge 10 - 20 • Full Test 60 Phút • Tra Từ Popover',
      description:
        'Luyện giải đề thi Cambridge thật. Bạn có thể làm trọn vẹn đề Full Test 60 phút có tính giờ hoặc làm riêng từng Passage theo thời gian rảnh, tra cứu từ điển trực tiếp trên bài đọc và lưu ngay vào thẻ Anki chỉ với 1-click.',
      features: [
        'Lựa chọn linh hoạt: Làm Full Test 40 câu có đồng hồ đếm ngược hoặc luyện riêng từng bài đọc',
        'Tra từ điển tức thời: Xem phiên âm IPA, nghĩa tiếng Việt, câu ví dụ và lưu Anki 1 chạm',
        'Chấm điểm tự động và có lời giải chi tiết kèm vị trí câu trả lời trong đoạn văn',
      ],
      previewBadge: '28 Đề Full Test • 84 Passages Cambridge',
      mockVisual: {
        articleTitle: 'Cambridge IELTS 18 - Test 1 - Reading Passage 1',
        targetWord: 'subterranean /ˌsʌb.təˈreɪ.ni.ən/ (adj)',
        meaning: 'Nằm dưới mặt đất, ngầm',
        sentence: '"The planning of a subterranean railway system beneath central London."',
        collocation: 'subterranean railway • subterranean tunnel',
      },
    },
    {
      id: 'chapter-2',
      number: 'Tính Năng 2',
      title: 'Luyện Nghe Chép Chính Tả (Dictation)',
      subtitle: 'Luyện tai nhạy từng câu với thanh sóng âm và đối soát từng từ',
      discipline: 'Luyện Tai & Sửa Lỗi Chính Tả',
      icon: <Headphones className="w-5 h-5 text-amber-300" />,
      tag: 'Nghe Chép Từng Câu • Sửa Lỗi Tức Thì',
      description:
        'Chấm dứt lối nghe thụ động trôi tuột. Hệ thống phát âm thanh từng câu ngắn, bạn gõ lại và hệ thống sẽ đối soát từng ký tự: từ đúng hiện màu xanh, từ sai hiện màu đỏ để sửa lỗi ngay tại chỗ.',
      features: [
        'Nghe từng câu ngắn với tốc độ tùy chỉnh 0.8x đến 1.2x dễ nghe',
        'Tự động so khớp từng từ gõ: báo từ đúng, từ sai rõ ràng',
        'Phím tắt tiện lợi, nút gợi ý ký tự tiếp theo và xem bản dịch tiếng Việt',
      ],
      previewBadge: 'Độ chính xác Dictation đạt 96%',
      mockVisual: {
        audioSentence: '"Modern architectures employ stochastic mechanisms to approximate reasoning."',
        userTyped: 'Modern architectures employ stocastic mechanisms...',
        diffResult: 'stocastic ➔ stochastic (Lỗi chính tả thiếu ký tự \'h\')',
        xpBadge: 'Độ chính xác 100%',
      },
    },
    {
      id: 'chapter-3',
      number: 'Tính Năng 3',
      title: 'Thẻ 3D Anki Flashcard (Spaced Repetition)',
      subtitle: 'Thẻ lật 3D trực quan & Thuật toán lặp lại ngắt quãng SM-2',
      discipline: 'Ghi Nhớ Lâu Dài',
      icon: <Layers className="w-5 h-5 text-amber-300" />,
      tag: 'Thẻ 3D Flip • Thuật toán SM-2 • Again/Hard/Good/Easy',
      description:
        'Tự động đồng bộ toàn bộ từ vựng đã lưu từ bài Đọc và bài Nghe vào bộ thẻ cá nhân. Ứng dụng mô phỏng thẻ 3D lật mặt trước - mặt sau trực quan và thuật toán ngắt quãng SM-2 giúp ghi nhớ lâu dài.',
      features: [
        'Thẻ lật 3D sinh động, lật mặt trước - mặt sau như cầm thẻ giấy trên tay',
        'Thuật toán SM-2 tự tính ngày ôn tập tối ưu: Again, Hard, Good, Easy',
        'Tự động đồng bộ từ mới đã lưu từ bài Đọc Cambridge và bài Nghe Dictation',
      ],
      previewBadge: 'Nhớ lâu gấp 3 lần sau 30 ngày',
      mockVisual: {
        word: 'subterranean /ˌsʌb.təˈreɪ.ni.ən/',
        prompt: 'Nghĩa tiếng Việt & Câu ví dụ:',
        clozeSentence: '"The planning of a subterranean railway system beneath central London."',
        nextReview: 'Thuật toán SM-2: Ôn lại sau 3 ngày (Good)',
      },
    },
  ];

  // Auto rotate chapters every 7s unless user is hovering/interacting
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveChapterIndex((prev) => (prev + 1) % chapters.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, chapters.length]);

  const handlePrev = () => {
    setActiveChapterIndex((prev) => (prev === 0 ? chapters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveChapterIndex((prev) => (prev + 1) % chapters.length);
  };

  const currentChapter = chapters[activeChapterIndex];

  return (
    <section
      id="chapters"
      className="py-20 bg-transparent border-b border-stone-200/60 relative text-stone-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-stone-200">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-amber-800 text-xs font-sans font-bold tracking-normal">
              <Bookmark className="w-3.5 h-3.5 text-amber-700" />
              <span>3 Tính Năng Chính</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-tight leading-tight">
              Tính Năng Học Tập Toàn Diện
            </h2>
          </div>
          <p className="text-xs text-stone-600 font-sans max-w-md leading-relaxed">
            Kết hợp trọn vẹn Luyện đọc đề thật Cambridge, Luyện nghe chép chính tả Dictation và Ôn tập từ vựng bằng Thẻ 3D Anki.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Interactive Chapters Navigation (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-sans font-bold uppercase tracking-normal text-stone-500">
                — Chọn Tính Năng Để Xem —
              </p>
              {/* Prev / Next Chevrons and Counter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-stone-600">
                  {activeChapterIndex + 1} / {chapters.length}
                </span>
                <div className="inline-flex rounded-lg border border-stone-200 bg-white p-0.5 shadow-2xs">
                  <button
                    onClick={handlePrev}
                    aria-label="Phân hệ trước"
                    className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Phân hệ kế tiếp"
                    className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Chapter Selection Tabs */}
            <div className="space-y-3">
              {chapters.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? 'bg-[#064E3B] text-white border-amber-500 shadow-lg translate-x-1 sm:translate-x-2 ring-2 ring-amber-400/20'
                        : 'bg-white/85 backdrop-blur-md border-stone-200 hover:border-stone-300 hover:bg-white text-stone-800 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`text-xs font-mono font-bold uppercase tracking-normal ${
                          isActive ? 'text-amber-300' : 'text-stone-500'
                        }`}
                      >
                        {ch.number}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                          isActive
                            ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
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
                  </button>
                );
              })}
            </div>

            {/* Micro Citation Badge */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5 shadow-2xs">
              <span className="font-bold flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Vòng Lặp Học Sâu Khép Kín:
              </span>
              <p className="text-[11px] text-stone-700 leading-relaxed font-sans">
                Đọc hiểu nạp từ trong ngữ cảnh ➔ Thử thách thính giác gõ lại nguyên văn câu ➔ Ôn tập ngắt quãng 5 chu kỳ.
                Loại bỏ 100% thói quen dịch thô word-by-word.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Depth Dossier Card with AnimatePresence (7 Cols on Desktop) */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6"
              >
                {/* Header of Dossier Card */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#064E3B] text-amber-300 flex items-center justify-center shadow-xs shrink-0">
                        {currentChapter.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-700 tracking-normal">
                          {currentChapter.number} • {currentChapter.discipline}
                        </span>
                        <h4 className="text-lg sm:text-xl font-sans font-bold text-[#064E3B] leading-snug tracking-normal">
                          {currentChapter.title}
                        </h4>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] font-bold text-amber-800 shrink-0 self-start sm:self-auto">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Tương tác thực tế</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-1">
                    {currentChapter.description}
                  </p>
                </div>

                {/* Simulated Scientific Experiment Mockup Visual */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAF9] border border-stone-200 text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 border-b border-stone-200 pb-2 uppercase tracking-normal">
                    <span>Xem trước giao diện học tập</span>
                    <span className="text-emerald-900 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {currentChapter.previewBadge}
                    </span>
                  </div>

                  {/* Chapter 1: Deep Reading Mockup */}
                  {activeChapterIndex === 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs text-stone-500 font-mono italic">
                        Bài đọc: {currentChapter.mockVisual.articleTitle}
                      </div>
                      <div className="text-sm font-sans font-bold text-[#064E3B] flex items-center gap-2">
                        <span>{currentChapter.mockVisual.targetWord}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                          Đã lưu Anki
                        </span>
                      </div>
                      <p className="text-xs text-stone-800 italic font-serif border-l-2 border-amber-500 pl-3 py-0.5 bg-amber-50/40 rounded-r">
                        {currentChapter.mockVisual.sentence}
                      </p>
                      <div className="text-[11px] text-amber-800 font-mono pt-0.5">
                        Collocations: {currentChapter.mockVisual.collocation}
                      </div>
                    </div>
                  )}

                  {/* Chapter 2: Dictation Studio Mockup */}
                  {activeChapterIndex === 1 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs text-stone-700 font-serif italic">
                        {currentChapter.mockVisual.audioSentence}
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#064E3B] text-white flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs text-teal-300 font-mono">
                          <Activity className="w-4 h-4 text-[#0D9488]" />
                          <span>Waveform: 1.0x</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300 font-bold">
                          {currentChapter.mockVisual.xpBadge}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-900 font-mono flex items-center gap-1.5">
                        <span className="font-bold">Diff:</span>
                        <span>{currentChapter.mockVisual.diffResult}</span>
                      </div>
                    </div>
                  )}

                  {/* Chapter 3: SRS Cloze Test Mockup */}
                  {activeChapterIndex === 2 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-bold text-[#064E3B]">
                        {currentChapter.mockVisual.word}
                      </div>
                      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs font-serif text-stone-900 leading-relaxed">
                        {currentChapter.mockVisual.clozeSentence}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-stone-500">
                        <span className="text-amber-800 font-bold">{currentChapter.mockVisual.nextReview}</span>
                        <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Độ nhớ: 95%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Features checklist */}
                <ul className="space-y-2 text-xs text-stone-700">
                  {currentChapter.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button: Intercepts & triggers Auth Modal */}
                <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-stone-500">
                    Đăng ký miễn phí để lưu toàn bộ tiến độ làm bài
                  </span>

                  <button
                    onClick={() => onRequireAuth(currentChapter.title)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] font-sans font-semibold text-white tracking-wide border border-emerald-800 text-xs uppercase shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Vào Không Gian Học</span>
                    <ArrowRight size={14} className="text-amber-400" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
