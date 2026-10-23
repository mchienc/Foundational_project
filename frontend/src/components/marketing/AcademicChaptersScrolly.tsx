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
  ChevronLeft,
  ChevronRight,
  Youtube,
  Volume2,
  FileCheck,
} from 'lucide-react';
import { Screen, User } from '../../types';

interface AcademicChaptersScrollyProps {
  currentUser?: User | null;
  onRequireAuth: (chapterTitle: string) => void;
  onNavigateScreen?: (screen: Screen) => void;
}

export const AcademicChaptersScrolly: React.FC<AcademicChaptersScrollyProps> = ({
  currentUser,
  onRequireAuth,
  onNavigateScreen,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const chapters = [
    {
      id: 'chapter-1',
      number: 'Phần 1',
      title: 'Luyện Đọc Reading (Cam 10–20)',
      subtitle: '28 đề Full Test 60 phút & 84 bài đọc chi tiết',
      discipline: 'Luyện Reading',
      screen: 'reading' as Screen,
      ctaLabel: 'Làm bài đọc ngay',
      icon: <BookOpen className="w-5 h-5 text-amber-300" />,
      tag: 'Đề Cam 10–20 • Full Test 60 Phút • Tra Từ 1 Chạm',
      description:
        'Luyện giải đề thi Cambridge thật với giao diện như thi trên máy tính. Bạn có thể chọn làm bài thi 60 phút có bấm giờ hoặc luyện từng bài đọc ngắn, tra cứu từ điển trực tiếp và lưu ngay vào bộ thẻ Flashcard.',
      features: [
        'Lựa chọn linh hoạt: Làm Full Test 40 câu có tính giờ hoặc luyện từng bài đọc riêng',
        'Tra từ điển nhanh 1 chạm: Xem phiên âm IPA, nghĩa tiếng Việt và lưu vào Flashcard tức thì',
        'Chấm điểm tự động và chỉ rõ vị trí câu văn dẫn chứng đáp án trong bài đọc',
      ],
      previewBadge: '28 Đề Full Test • 84 Bài Đọc Cambridge',
      mockType: 'reading',
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
      number: 'Phần 2',
      title: 'Luyện Nghe Listening (Cam 13–20)',
      subtitle: '4 phần nghe liên tục, 40 câu hỏi & Transcript dẫn chứng',
      discipline: 'Luyện Listening',
      screen: 'listening-exam' as Screen,
      ctaLabel: 'Làm bài nghe ngay',
      icon: <Headphones className="w-5 h-5 text-amber-300" />,
      tag: 'Âm Thanh Chuẩn • 4 Phần • Xem Lại Transcript',
      description:
        'Luyện nghe như trong phòng thi thật với các bộ đề Cambridge từ 13 đến 20. Âm thanh rõ nét, đầy đủ các dạng bài (điền từ, trắc nghiệm, nối thông tin) và xem lại phụ đề kèm dẫn chứng đáp án sau khi nộp bài.',
      features: [
        'Âm thanh đề thi gốc chuyển tiếp tự động từ Phần 1 đến Phần 4 kèm thanh 40 câu hỏi',
        'Hỗ trợ đầy đủ các dạng câu hỏi: Điền thông tin vào form, trắc nghiệm A/B/C, nối đáp án',
        'Xem lại transcript có đánh dấu sẵn câu chứa đáp án để bạn hiểu lý do đúng/sai',
      ],
      previewBadge: 'Cam 13–20 • 40 Câu Chuẩn Format',
      mockType: 'listening-exam',
      mockVisual: {
        sectionTitle: 'Cambridge 18 Test 1 - Section 1: Community Garden Registration',
        audioTrack: 'Cambridge 18 Section 1 (03:45 / 05:20)',
        questionPrompt: 'Q1: Name of garden project: The [ Riverside ] Community Garden',
        reviewClue: 'Transcript: "It is called the Riverside Community Garden..." ➔ [Dẫn chứng Q1]',
      },
    },
    {
      id: 'chapter-3',
      number: 'Phần 3',
      title: 'Chép Chính Tả Video YouTube',
      subtitle: 'Luyện nghe câu ngắn, tự động lặp & kiểm tra từng từ',
      discipline: 'Chép chính tả',
      screen: 'dictation' as Screen,
      ctaLabel: 'Bắt đầu chép chính tả',
      icon: <Youtube className="w-5 h-5 text-rose-500" />,
      tag: 'Kho Video Hay • Tự Dán Link • So Khớp Từng Chữ',
      description:
        'Luyện nghe chép chính tả từng câu với video YouTube. Bạn có thể chọn ngay bài trong kho TED Talks, BBC hoặc dán link YouTube bất kỳ để hệ thống tự chia câu và phát lặp lại cho bạn gõ.',
      features: [
        'Chia video thành từng câu ngắn vừa nghe, hỗ trợ tự động lặp lại câu (Auto Loop)',
        'Kiểm tra từng từ bạn gõ: Báo từ đúng màu xanh, từ sai chính tả màu đỏ để bạn sửa ngay',
        'Đạt độ chính xác từ 90% trở lên để qua câu mới, có phím tắt tiện lợi khi luyện tập',
      ],
      previewBadge: 'Kho Video Chọn Lọc & Dán Link Tùy Ý',
      mockType: 'youtube-dictation',
      mockVisual: {
        videoTitle: 'Steve Jobs’ 2005 Stanford Commencement Address',
        audioSentence: '"You can’t connect the dots looking forward; you can only connect them looking backwards."',
        userTyped: 'You cant connect the dots looking forward...',
        diffResult: 'cant ➔ can’t (Thiếu dấu nháy đơn) • Độ chính xác: 95%',
        accuracyBadge: 'Đạt yêu cầu: 95% ≥ 90%',
      },
    },
    {
      id: 'chapter-4',
      number: 'Phần 4',
      title: 'Học Từ Vựng Flashcard Anki',
      subtitle: 'Thẻ lật thông minh, nhắc ôn đúng lúc & tạo thẻ với AI',
      discipline: 'Học từ vựng',
      screen: 'anki' as Screen,
      ctaLabel: 'Học từ vựng ngay',
      icon: <Layers className="w-5 h-5 text-amber-300" />,
      tag: 'Thẻ Flashcard • Nhắc Ôn Tập • Gợi Ý Cụm Từ • Xuất File .apkg',
      description:
        'Lưu từ vựng khi đang làm bài đọc hoặc bài nghe vào bộ thẻ cá nhân. Ứng dụng tự động tính ngày nhắc bạn ôn lại trước khi quên, kèm tính năng tạo câu ví dụ tự động và xuất file Anki ôn offline.',
      features: [
        'Thẻ lật trực quan, hiển thị câu ví dụ thực tế giúp bạn nhớ từ theo ngữ cảnh',
        'Tự động nhắc ôn tập khoa học (hôm nay, sau 1 ngày, 3 ngày, 5 ngày) để nhớ từ lâu hơn',
        'Tự động gợi ý cụm từ đi kèm (collocation) và hỗ trợ xuất trọn bộ ra file Anki (.apkg)',
      ],
      previewBadge: 'Ôn Tập Thông Minh & Xuất File Anki',
      mockType: 'anki-ai',
      mockVisual: {
        word: 'subterranean /ˌsʌb.təˈreɪ.ni.ən/ (adj)',
        clozeSentence: '"The planning of a {{c1::subterranean}} railway system beneath central London."',
        aiCollocations: 'Cụm từ hay: subterranean railway, subterranean tunnel, subterranean network',
        sm2Schedule: 'Lịch ôn tập: Hôm nay (1m) • Ngày mai (1d) • Sau 3 ngày (3d) • Sau 5 ngày (5d)',
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

  const handleAction = () => {
    if (currentUser && onNavigateScreen) {
      onNavigateScreen(currentChapter.screen);
    } else {
      onRequireAuth(currentChapter.title);
    }
  };

  return (
    <section
      id="chapters"
      className="py-20 bg-transparent border-b border-stone-200/60 relative text-stone-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-stone-200">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-amber-800 text-xs font-sans font-bold tracking-normal">
              <Bookmark className="w-3.5 h-3.5 text-amber-700" />
              <span>Tính Năng Nổi Bật</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-tight leading-tight">
              Luyện Tập Toàn Diện 4 Kỹ Năng
            </h2>
          </div>
          <p className="text-xs text-stone-600 font-sans max-w-md leading-relaxed">
            Kết hợp luyện đề Reading và Listening Cambridge, luyện nghe chép chính tả qua video YouTube
            và ghi nhớ từ vựng với Flashcard Anki.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Navigation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-sans font-bold uppercase tracking-normal text-stone-500">
                — Chọn Phần Luyện Tập —
              </p>
              {/* Prev / Next Chevrons and Counter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-stone-600">
                  {activeChapterIndex + 1} / {chapters.length}
                </span>
                <div className="inline-flex rounded-lg border border-stone-200 bg-white p-0.5 shadow-2xs">
                  <button
                    onClick={handlePrev}
                    aria-label="Phần trước"
                    className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Phần kế tiếp"
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
                Cách học hiệu quả tại EduFlow:
              </span>
              <p className="text-[11px] text-stone-700 leading-relaxed font-sans">
                Luyện đề đọc &amp; nghe ➔ Tra từ vựng và lưu vào Flashcard ➔ Luyện nghe chép chính tả qua video ➔ Ôn tập ngắt quãng để nhớ từ lâu hơn.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Detail Card */}
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
                {/* Header */}
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
                      <span>{currentChapter.tag}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-1">
                    {currentChapter.description}
                  </p>
                </div>

                {/* Simulated Mockup Visual */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAF9] border border-stone-200 text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 border-b border-stone-200 pb-2 uppercase tracking-normal">
                    <span>Xem trước màn hình luyện tập</span>
                    <span className="text-emerald-900 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {currentChapter.previewBadge}
                    </span>
                  </div>

                  {/* Chapter 1: Reading Mockup */}
                  {currentChapter.mockType === 'reading' && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs text-stone-500 font-mono italic">
                        Bài đọc: {currentChapter.mockVisual.articleTitle}
                      </div>
                      <div className="text-sm font-sans font-bold text-[#064E3B] flex items-center gap-2">
                        <span>{currentChapter.mockVisual.targetWord}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                          Đã lưu Flashcard 1 chạm
                        </span>
                      </div>
                      <p className="text-xs text-stone-800 italic font-serif border-l-2 border-amber-500 pl-3 py-0.5 bg-amber-50/40 rounded-r">
                        {currentChapter.mockVisual.sentence}
                      </p>
                      <div className="text-[11px] text-amber-800 font-mono pt-0.5">
                        Cụm từ đi kèm: {currentChapter.mockVisual.collocation}
                      </div>
                    </div>
                  )}

                  {/* Chapter 2: Listening Mockup */}
                  {currentChapter.mockType === 'listening-exam' && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs text-stone-700 font-serif font-bold text-[#064E3B]">
                        {currentChapter.mockVisual.sectionTitle}
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#064E3B] text-white flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs text-teal-300 font-mono">
                          <Volume2 className="w-4 h-4 text-amber-300" />
                          <span>{currentChapter.mockVisual.audioTrack}</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300 font-bold bg-emerald-900/80 px-2 py-0.5 rounded border border-amber-400/30">
                          Phần 1 / 4
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-800 font-sans">
                        {currentChapter.mockVisual.questionPrompt}
                      </div>
                      <div className="text-[11px] text-emerald-800 font-mono bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        {currentChapter.mockVisual.reviewClue}
                      </div>
                    </div>
                  )}

                  {/* Chapter 3: YouTube Dictation Mockup */}
                  {currentChapter.mockType === 'youtube-dictation' && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs text-stone-700 font-serif">
                        <span className="font-bold text-[#064E3B] flex items-center gap-1.5">
                          <Youtube className="w-4 h-4 text-rose-600" />
                          {currentChapter.mockVisual.videoTitle}
                        </span>
                        <span className="text-[10px] font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Lặp lại tự động: Bật
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-serif italic">
                        {currentChapter.mockVisual.audioSentence}
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-950 font-mono flex items-center justify-between">
                        <span>{currentChapter.mockVisual.diffResult}</span>
                        <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                          {currentChapter.mockVisual.accuracyBadge}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Chapter 4: Anki Flashcard Mockup */}
                  {currentChapter.mockType === 'anki-ai' && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#064E3B]">
                        <span>{currentChapter.mockVisual.word}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-950 px-2 py-0.5 rounded font-mono font-bold border border-amber-300">
                          Thẻ Flashcard
                        </span>
                      </div>
                      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs font-serif text-stone-900 leading-relaxed">
                        {currentChapter.mockVisual.clozeSentence}
                      </div>
                      <div className="text-[11px] text-[#064E3B] font-mono bg-stone-100 p-2 rounded-lg border border-stone-200">
                        {currentChapter.mockVisual.aiCollocations}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono pt-0.5 text-stone-500">
                        <span className="text-amber-800 font-bold">{currentChapter.mockVisual.sm2Schedule}</span>
                        <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <FileCheck className="w-3 h-3" /> Xuất file Anki (.apkg)
                        </span>
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

                {/* Action Button */}
                <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-stone-500">
                    Trải nghiệm trực tiếp không giới hạn lượt luyện
                  </span>

                  <button
                    onClick={handleAction}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] font-sans font-semibold text-white tracking-wide border border-emerald-800 text-xs uppercase shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{currentChapter.ctaLabel}</span>
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
