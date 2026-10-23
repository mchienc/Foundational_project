import React, { useState, useMemo, useRef } from 'react';
import {
  Headphones,
  Search,
  ArrowRight,
  Gauge,
  Layers,
  FileCheck,
  ClipboardList,
  Lock,
  Sliders,
  X,
  CheckCircle2,
  
  Volume2,
} from 'lucide-react';
import { mockListeningTests } from '../../data/cambridgeMockData';
import { mockListeningFullTests } from '../../data/mockListeningTests';
import { ListeningFullTest, ListeningSection } from '../../types';
import { useCardEntrance } from '../../hooks/useCardEntrance';

interface ListeningLibraryProps {
  onSelectTest: (testId: string) => void;
  onSelectFullTest?: (testId: string, examMode: 'exam' | 'practice') => void;
  onNavigateAnki?: () => void;
}

export const ListeningLibrary: React.FC<ListeningLibraryProps> = ({
  onSelectTest,
  onSelectFullTest,
  onNavigateAnki,
}) => {
  const [mode, setMode] = useState<'fulltest' | 'dictation'>('fulltest');
  const [selectedBook, setSelectedBook] = useState<string>('all');
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalTest, setModalTest] = useState<ListeningFullTest | null>(null);

  const books = [
    'all',
    'Cambridge 20',
    'Cambridge 19',
    'Cambridge 18',
    'Cambridge 16',
    'Cambridge 15',
    'Cambridge 14',
    'Cambridge 13',
  ];

  const parts = [
    { id: 'all', label: 'Tất Cả Parts' },
    { id: '1', label: 'Part 1: Đối thoại hàng ngày' },
    { id: '2', label: 'Part 2: Độc thoại hướng dẫn' },
    { id: '3', label: 'Part 3: Thảo luận học thuật' },
    { id: '4', label: 'Part 4: Bài giảng học thuật' },
  ];

  const filteredDictationTests = useMemo(() => {
    return mockListeningTests.filter((test) => {
      if (selectedPart !== 'all' && test.part.toString() !== selectedPart) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !test.title.toLowerCase().includes(q) &&
          !test.source.toLowerCase().includes(q) &&
          !test.topic.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [selectedPart, searchQuery]);

  const filteredFullTests = useMemo(() => {
    return mockListeningFullTests.filter((test) => {
      if (selectedBook !== 'all' && test.book !== selectedBook) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !test.source.toLowerCase().includes(q) &&
          !test.book.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [selectedBook, searchQuery]);

  const gridRef = useRef<HTMLDivElement>(null);
  useCardEntrance(gridRef, [filteredDictationTests, filteredFullTests, mode, selectedBook]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B] text-amber-300 text-xs font-mono font-bold tracking-normal uppercase shadow-xs">
            <Headphones size={13} className="text-amber-300" />
            <span>Luyện Nghe Cambridge IELTS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
            Luyện Nghe IELTS
          </h1>
          <p className="text-sm text-stone-600 font-sans max-w-2xl leading-relaxed">
            Luyện nghe với 2 chế độ: <strong>Thi Thật</strong> (không tua/dừng) hoặc <strong>Luyện Tập</strong> (tua lại, lặp đoạn A–B và chỉnh tốc độ).
          </p>
        </div>
        {onNavigateAnki && (
          <button
            onClick={onNavigateAnki}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-sans font-bold shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <FileCheck size={16} className="text-amber-700" />
            <span>Mở Thẻ Flashcard</span>
            <ArrowRight size={14} className="text-amber-700" />
          </button>
        )}
      </div>

      {/* Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl p-1.5 w-fit shadow-xs">
          <button
            onClick={() => setMode('fulltest')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
              mode === 'fulltest'
                ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ClipboardList size={14} />
            Đề Thi Cambridge (Thi Thật &amp; Luyện Tập)
          </button>
          <button
            onClick={() => setMode('dictation')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
              mode === 'dictation'
                ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Headphones size={14} />
            Chép chính tả từng câu
          </button>
        </div>

        <span className="text-xs font-mono text-stone-500">
          {mode === 'fulltest'
            ? `Hiển thị ${filteredFullTests.length} bộ đề Full Test (40 câu/đề)`
            : `Hiển thị ${filteredDictationTests.length} bài luyện chép chính tả`}
        </span>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bộ đề Cambridge 13–20..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAFAF9] text-xs font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          {mode === 'fulltest' ? (
            <div className="md:col-span-8 flex flex-wrap items-center gap-1.5">
              {books.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBook(b)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-sans transition-all cursor-pointer ${
                    selectedBook === b
                      ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {b === 'all' ? 'Tất cả bộ Cam' : b}
                </button>
              ))}
            </div>
          ) : (
            <div className="md:col-span-8 flex flex-wrap items-center gap-2">
              {parts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPart(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-sans transition-all cursor-pointer ${
                    selectedPart === p.id
                      ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tests Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mode === 'fulltest' ? (
          filteredFullTests.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-stone-500 font-sans">
              Không tìm thấy đề thi phù hợp.
            </div>
          ) : (
            filteredFullTests.map((test) => (
              <div
                key={test.id}
                onClick={() => setModalTest(test)}
                className="test-card bg-white rounded-3xl border border-stone-200 hover:border-[#064E3B]/50 p-6 sm:p-7 shadow-xs hover:shadow-md flex flex-col justify-between space-y-5 group will-change-transform transition-all cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#064E3B] text-amber-300 text-[10px] font-mono font-bold tracking-normal uppercase">
                      {test.book}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                      4 Parts • 40 Câu • Audio R2
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#064E3B] group-hover:text-amber-800 transition-colors leading-snug">
                    {test.source}
                  </h3>

                  <div className="space-y-1.5 pt-1">
                    {test.sections.map((s: ListeningSection) => (
                      <div
                        key={s.sectionNumber}
                        className="flex items-center gap-2 text-xs text-stone-600 font-sans"
                      >
                        <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-[#064E3B] font-mono shrink-0">
                          {s.sectionNumber}
                        </span>
                        <span className="truncate">{s.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2-Branch Mode Action Buttons */}
                <div
                  className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onSelectFullTest?.(test.id, 'exam')}
                    className="py-2.5 px-3.5 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-white font-sans font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
                    title="Giao diện thi máy IDP: Khoá tua/dừng băng, 30 phút + 2 phút rà đáp án"
                  >
                    <Lock size={13} className="text-amber-300 shrink-0" />
                    <span>Thi Thật (Khoá Tua)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectFullTest?.(test.id, 'practice')}
                    className="py-2.5 px-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                    title="Giao diện Luyện tập: Tuỳ chỉnh tốc độ 0.75x-1.5x, tạm dừng, tua ±5s & xem đáp án ngay"
                  >
                    <Sliders size={13} className="text-amber-700 shrink-0" />
                    <span>Luyện Tập (Chỉnh Tốc Độ)</span>
                  </button>
                </div>
              </div>
            ))
          )
        ) : (
          filteredDictationTests.map((test) => (
            <div
              key={test.id}
              className="test-card bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5 group will-change-transform"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#064E3B] text-amber-300 text-[10px] font-mono font-bold tracking-normal uppercase">
                      {test.source}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-stone-100 text-stone-700 text-[10px] font-mono font-bold">
                      Part {test.part}
                    </span>
                  </div>
                  <span className="text-[11px] font-sans font-semibold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {test.accent} Accent
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#064E3B] group-hover:text-amber-800 transition-colors leading-snug">
                  {test.title}
                </h3>

                <p className="text-xs text-stone-500 font-sans">
                  Diễn giả: <strong className="text-stone-700">{test.speaker}</strong> • Chủ đề:{' '}
                  {test.topic}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-stone-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="inline-flex items-center gap-1.5 text-stone-600">
                    <Gauge size={14} className="text-amber-600" />
                    Tốc độ nói: <strong className="text-stone-900">{test.wpm} WPM</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-stone-600">
                    <Layers size={14} className="text-emerald-700" />
                    Số câu cần chép:{' '}
                    <strong className="text-[#064E3B]">{test.totalSentences} câu</strong>
                  </span>
                </div>
                <div className="pt-1 border-t border-stone-200 text-stone-700 leading-relaxed font-sans">
                  <span className="font-bold text-amber-800 block text-[10px] font-mono uppercase">
                    Trọng tâm ngữ âm &amp; biến âm:
                  </span>
                  <span className="text-xs">{test.phoneticFocus}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectTest(test.id)}
                className="w-full py-3 px-4 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-xs hover:shadow-md active:scale-98 transition-all cursor-pointer group-hover:border group-hover:border-amber-400/40"
              >
                <span>Bắt Đầu Chép Chính Tả (Dictation Studio)</span>
                <ArrowRight size={14} className="card-arrow text-amber-400" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal Chọn Nhánh Khi Bấm Vào 1 Đề (Thi Thật vs Luyện Tập) */}
      {modalTest && (
        <div
          onClick={() => setModalTest(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden"
          >
            <div className="bg-[#064E3B] text-white px-6 py-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-stone-950 font-bold">
                  {modalTest.book} • 40 Questions
                </span>
                <h3 className="text-xl font-serif font-bold mt-1">{modalTest.source}</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalTest(null)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Chọn chế độ phù hợp với mục tiêu của bạn hôm nay:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Branch 1: Real Exam */}
                <div className="rounded-2xl border-2 border-[#064E3B] bg-emerald-50/40 p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-[#064E3B] text-amber-300 font-mono text-[10px] font-bold uppercase">
                        Nhánh 1 • Chuẩn IDP Inspera
                      </span>
                      <Lock size={16} className="text-[#064E3B]" />
                    </div>
                    <h4 className="font-serif font-bold text-lg text-[#064E3B]">
                      Phòng Thi Thật
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-700 font-sans">
                      <li className="flex items-start gap-2">
                        <Volume2 size={14} className="text-[#064E3B] shrink-0 mt-0.5" />
                        <span>Kiểm tra tai nghe (Sound Check) trước giờ thi.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock size={14} className="text-red-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Khoá dừng &amp; khoá tua băng:</strong> Audio chạy 1 mạch tốc độ 1.0x đúng áp lực phòng thi.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-[#064E3B] shrink-0 mt-0.5" />
                        <span>
                          Bôi đen Highlight từ khóa trên đề, 3 chế độ tương phản &amp; 2 phút rà đáp án cuối giờ.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const id = modalTest.id;
                      setModalTest(null);
                      onSelectFullTest?.(id, 'exam');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Vào Phòng Thi Thật</span>
                    <ArrowRight size={14} className="text-amber-300" />
                  </button>
                </div>

                {/* Branch 2: Practice Studio */}
                <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/40 p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-mono text-[10px] font-bold uppercase">
                        Nhánh 2 • Luyện Nghe Chuyên Sâu
                      </span>
                      <Sliders size={16} className="text-amber-700" />
                    </div>
                    <h4 className="font-serif font-bold text-lg text-amber-950">
                      Phòng Luyện Tập
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-700 font-sans">
                      <li className="flex items-start gap-2">
                        <Gauge size={14} className="text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Tăng/giảm tốc độ (0.75x – 1.5x):</strong> Luyện bắt âm chậm hoặc luyện phản xạ tốc độ cao.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sliders size={14} className="text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          Cho phép <strong>Tạm dừng (Pause)</strong>, kéo thanh tua, lùi/tiến <code>±5s</code> &amp; lặp đoạn <strong>A–B Loop</strong>.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          Mở <strong>Transcript tương tác</strong> và bấm <strong>Check đáp án ngay</strong> từng Part.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const id = modalTest.id;
                      setModalTest(null);
                      onSelectFullTest?.(id, 'practice');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#D97706] hover:bg-amber-700 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Vào Phòng Luyện Tập</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
