import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  BookmarkCheck,
  Compass,
  X,
  CheckCircle2,
  Layers,
  Laptop,
  Lock,
  Award,
} from 'lucide-react';
import { mockReadingPassages } from '../../data/cambridgeMockData';
import { getReadingPassages } from '../../services/cambridgeApi';
import { CambridgeReadingPassage, ReadingSessionConfig } from '../../types';
import { useCardEntrance } from '../../hooks/useCardEntrance';
import { useSmoothScroll } from '../../context/SmoothScrollProvider';

export interface CambridgeTestGroup {
  id: string;
  source: string;
  bookTitle: string;
  testNumber: string;
  sourceType: 'cambridge' | 'actual_test';
  passages: CambridgeReadingPassage[];
  totalQuestions: number;
  totalWords: number;
  topics: string[];
}

interface ReadingLibraryProps {
  onSelectPassage?: (passageId: string) => void;
  onStartSession?: (config: ReadingSessionConfig) => void;
  onNavigateAnki?: () => void;
  onStartComputerExam?: (group: CambridgeTestGroup) => void;
}

export const ReadingLibrary: React.FC<ReadingLibraryProps> = ({
  onSelectPassage,
  onStartSession,
  onNavigateAnki,
  onStartComputerExam,
}) => {
  const [passages, setPassages] = useState<CambridgeReadingPassage[]>(mockReadingPassages);

  useEffect(() => {
    getReadingPassages().then((data) => {
      if (data && data.length > 0) {
        setPassages(data);
      }
    });
  }, []);

  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTestForModal, setSelectedTestForModal] = useState<CambridgeTestGroup | null>(null);

  const testGroups = useMemo<CambridgeTestGroup[]>(() => {
    const map = new Map<string, CambridgeTestGroup>();
    passages.forEach((p) => {
      const key = p.source;
      if (!map.has(key)) {
        let bookTitle = p.source;
        let testNumber = 'Full Test';
        const match = p.source.match(/^(.*?)\s*-\s*(Test\s*\d+)/i);
        if (match) {
          bookTitle = match[1];
          testNumber = match[2];
        } else {
          const camOnly = p.source.match(/Cambridge\s*(\d+)/i);
          if (camOnly) {
            bookTitle = `Cambridge IELTS ${camOnly[1]}`;
            testNumber = `Test ${Math.ceil(p.passageNumber / 3) || 1}`;
          }
        }

        map.set(key, {
          id: key.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          source: key,
          bookTitle,
          testNumber,
          sourceType: p.sourceType,
          passages: [],
          totalQuestions: 0,
          totalWords: 0,
          topics: [],
        });
      }

      const group = map.get(key)!;
      group.passages.push(p);
    });

    const groups = Array.from(map.values()).map((g) => {
      g.passages.sort((a, b) => a.passageNumber - b.passageNumber);
      g.totalQuestions = g.passages.reduce((sum, p) => sum + (p.questions?.length || 13), 0);
      g.totalWords = g.passages.reduce((sum, p) => sum + (p.wordCount || 850), 0);
      g.topics = Array.from(new Set(g.passages.map((p) => p.topic).filter(Boolean)));
      return g;
    });

    groups.sort((a, b) => {
      const matchA = a.source.match(/Cambridge\s*(\d+)\s*-\s*Test\s*(\d+)/i);
      const matchB = b.source.match(/Cambridge\s*(\d+)\s*-\s*Test\s*(\d+)/i);
      if (matchA && matchB) {
        const bookA = parseInt(matchA[1], 10);
        const bookB = parseInt(matchB[1], 10);
        if (bookA !== bookB) {
          return bookB - bookA;
        }
        const testA = parseInt(matchA[2], 10);
        const testB = parseInt(matchB[2], 10);
        return testA - testB;
      }
      return a.source.localeCompare(b.source);
    });

    return groups;
  }, [passages]);

  const handleStartSession = (config: ReadingSessionConfig) => {
    setSelectedTestForModal(null);
    if (onStartSession) {
      onStartSession(config);
    } else if (onSelectPassage) {
      onSelectPassage(config.passageId);
    }
  };

  const sources = [
    { id: 'all', label: 'Tất Cả Bộ Đề' },
    { id: 'cambridge-20', label: 'Cambridge 20' },
    { id: 'cambridge-19', label: 'Cambridge 19' },
    { id: 'cambridge-18', label: 'Cambridge 18' },
    { id: 'cambridge-16', label: 'Cambridge 16' },
    { id: 'cambridge-15', label: 'Cambridge 15' },
    { id: 'cambridge-14', label: 'Cambridge 14' },
    { id: 'cambridge-13', label: 'Cambridge 13' },
    { id: 'actual_test', label: 'Actual Tests Vol' },
  ];

  const filteredTests = useMemo(() => {
    return testGroups.filter((group) => {
      if (selectedSource !== 'all') {
        const camMatch = selectedSource.match(/^cambridge-(\d+)$/);
        if (camMatch) {
          const num = camMatch[1];
          if (!group.source.includes(`Cambridge ${num}`)) return false;
        } else if (group.sourceType !== selectedSource) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSource = group.source.toLowerCase().includes(q);
        const matchBook = group.bookTitle.toLowerCase().includes(q);
        const matchPassageTitle = group.passages.some(
          (p) => p.title.toLowerCase().includes(q) || p.subtitle?.toLowerCase().includes(q)
        );
        if (!matchSource && !matchBook && !matchPassageTitle) return false;
      }
      return true;
    });
  }, [testGroups, selectedSource, searchQuery]);

  const gridContainerRef = useRef<HTMLDivElement>(null);
  useCardEntrance(gridContainerRef, [filteredTests]);

  const { resize: resizeScroll } = useSmoothScroll();

  useEffect(() => {
    resizeScroll();
    const t = setTimeout(() => {
      resizeScroll();
    }, 250);
    return () => clearTimeout(t);
  }, [filteredTests.length, resizeScroll]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B] text-amber-300 text-xs font-sans font-bold tracking-normal shadow-xs">
            <BookOpen size={13} className="text-amber-300" />
            <span>Thư Viện Đề Thi Cambridge IELTS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
            Luyện Thi Reading Cambridge
          </h1>
          <p className="text-sm text-stone-600 font-sans max-w-2xl leading-relaxed">
            Mỗi bộ đề hỗ trợ <strong>2 nhánh làm bài</strong>: <strong>Phòng Thi Thật (60 Phút - IDP Computer Exam)</strong> đếm giờ nghiêm ngặt và khoá từ điển, hoặc <strong>Phòng Luyện Tập &amp; Tra Từ Điển</strong> không giới hạn thời gian, quét chữ tra nghĩa tiếng Việt + phiên âm IPA và kiểm tra đáp án ngay.
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-stone-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              <CheckCircle2 size={13} className="text-emerald-700" />
              <span>Cambridge 13, 14, 15, 16, 18, 19, 20</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              <Layers size={13} className="text-amber-700" />
              <span>28 Full Tests • 84 Passages • ~1,140 Câu Hỏi</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
              <Award size={13} className="text-amber-700" />
              <span>Từ Điển Anh–Việt &amp; Đồng Bộ Anki SRS</span>
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onNavigateAnki && (
            <button
              onClick={onNavigateAnki}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-sans font-bold shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <BookmarkCheck size={16} className="text-amber-700" />
              <span>Mở Anki Flashcard SRS</span>
              <ArrowRight size={14} className="text-amber-700" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="w-full lg:w-80 relative shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bộ đề (VD: Cambridge 20, Test 1, Cambridge 18...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAFAF9] text-xs font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-stone-400 uppercase mr-1">
              Bộ Đề:
            </span>
            {sources.map((src) => (
              <button
                key={src.id}
                onClick={() => setSelectedSource(src.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-sans transition-all cursor-pointer ${
                  selectedSource === src.id
                    ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {src.label}
              </button>
            ))}
          </div>

          <span className="shrink-0 text-[11px] font-mono text-stone-500 self-end lg:self-center">
            Hiển thị <strong className="text-[#064E3B]">{filteredTests.length}</strong> bộ đề thi
          </span>
        </div>
      </div>

      {/* Tests Grid */}
      {filteredTests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
          <Compass className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold font-sans text-stone-800">
            Không tìm thấy bộ đề thi phù hợp với bộ lọc
          </h3>
          <p className="text-xs text-stone-500 font-sans">
            Vui lòng thử điều chỉnh lại từ khóa tìm kiếm hoặc chọn "Tất Cả Bộ Đề".
          </p>
        </div>
      ) : (
        <div ref={gridContainerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTests.map((group) => {
            const isFull3Passages = group.passages.length >= 3;
            return (
              <div
                key={group.id}
                onClick={() => setSelectedTestForModal(group)}
                className="test-card bg-white rounded-3xl border border-stone-200 hover:border-[#064E3B]/50 p-6 sm:p-7 shadow-xs hover:shadow-md flex flex-col justify-between space-y-5 group will-change-transform transition-all cursor-pointer"
              >
                {/* Header Badges */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-[#064E3B] text-amber-300 text-xs font-mono font-bold tracking-normal uppercase shadow-xs">
                        {group.bookTitle}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold">
                        {group.testNumber}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-stone-600 bg-stone-100 px-3 py-1 rounded-lg flex items-center gap-1.5">
                      <Clock size={12} className="text-stone-500" />
                      {isFull3Passages
                        ? '3 Passages • 40 Câu'
                        : `${group.passages.length} Passages • ${group.totalQuestions} Câu`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#064E3B] group-hover:text-amber-800 transition-colors leading-snug">
                      {group.source}
                    </h3>
                    <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
                      Bấm vào đề để chọn <strong>Phòng Thi Thật (60 phút)</strong> hoặc <strong>Phòng Luyện Tập (Không giới hạn giờ &amp; Hỗ trợ tra từ điển Anh–Việt)</strong>.
                    </p>
                  </div>
                </div>

                {/* Nested Passages Preview inside the Test Card */}
                <div className="bg-[#FAFAF9] rounded-2xl border border-stone-200/80 p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200/60 pb-2">
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <Layers size={13} className="text-[#064E3B]" />
                      Các Bài Đọc (Passages) Trong Đề:
                    </span>
                    <span>{group.totalWords.toLocaleString()} Từ Vựng</span>
                  </div>

                  <div className="space-y-2">
                    {group.passages.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between gap-3 text-xs py-2 px-3 rounded-xl bg-white border border-stone-100 hover:border-amber-300/80 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="shrink-0 px-2 py-0.5 rounded bg-[#064E3B] text-amber-300 font-mono font-bold text-[10px]">
                            P{p.passageNumber}
                          </span>
                          <span
                            className="font-sans font-semibold text-stone-800 truncate"
                            title={p.title}
                          >
                            {p.title}
                          </span>
                        </div>
                        <div className="shrink-0 flex items-center gap-2 text-[11px] font-mono text-stone-500">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 hidden sm:inline">
                            {p.topic}
                          </span>
                          <span>{p.questions?.length || 13} câu</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2-Branch Mode Action Buttons */}
                <div
                  className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {onStartComputerExam && (
                    <button
                      onClick={() => onStartComputerExam(group)}
                      className="py-2.5 px-3.5 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-white font-sans font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
                      title="Giao diện Thi Máy IDP (60 phút): Đếm ngược nghiêm ngặt, 3 chế độ tương phản & Highlight/Note"
                    >
                      <Laptop size={14} className="text-amber-300 shrink-0" />
                      <span>Thi Thật (60p - IDP Exam)</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedTestForModal(group)}
                    className="py-2.5 px-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                    title="Chế độ Luyện Tập: Không giới hạn thời gian, quét chữ tra từ điển Anh-Việt & xem đáp án ngay"
                  >
                    <Award size={14} className="text-amber-700 shrink-0" />
                    <span>Luyện Tập &amp; Tra Từ Điển</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Test Mode Selection Modal (2 Branches: Thi Thật vs Luyện Tập) */}
      {selectedTestForModal && (
        <div
          onClick={() => setSelectedTestForModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#064E3B] text-white flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-sans font-bold tracking-normal">
                  <BookOpen size={12} className="text-amber-300" />
                  <span>Chọn Chế Độ Làm Bài (2 Nhánh)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  {selectedTestForModal.source}
                </h3>
                <p className="text-xs text-stone-200 font-sans">
                  Bộ đề thi chuẩn Cambridge IELTS Academic • Tổng cộng{' '}
                  {selectedTestForModal.passages.length} bài đọc (
                  {selectedTestForModal.totalQuestions} câu hỏi)
                </p>
              </div>
              <button
                onClick={() => setSelectedTestForModal(null)}
                className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div data-lenis-prevent="true" className="p-6 overflow-y-auto space-y-6 overscroll-contain">
              {/* 2-Branch Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Branch 1: Real Exam Simulation */}
                <div className="p-5 rounded-2xl border-2 border-[#064E3B] bg-emerald-50/40 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#064E3B] text-amber-300 text-[10px] font-mono font-bold uppercase">
                        Nhánh 1 • Thi Máy IDP
                      </span>
                      <Lock size={15} className="text-[#064E3B]" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-[#064E3B]">
                      Phòng Thi Thật (60 Phút)
                    </h4>
                    <ul className="space-y-1.5 text-xs text-stone-700 font-sans">
                      <li>
                        • Đếm ngược <strong>60 phút nghiêm ngặt</strong> (3 Passages • 40 câu).
                      </li>
                      <li>
                        • Màn hình chia đôi kéo thả, 3 chế độ tương phản màu &amp; Fullscreen.
                      </li>
                      <li>
                        • Hỗ trợ Highlight Vàng/Xanh &amp; Ghi chú Sticky Note chuẩn thi thật.
                      </li>
                      <li>
                        • <strong>Khoá từ điển &amp; khoá gợi ý</strong> cho tới khi nộp bài.
                      </li>
                    </ul>
                  </div>

                  {onStartComputerExam && (
                    <button
                      onClick={() => {
                        const targetGroup = selectedTestForModal;
                        setSelectedTestForModal(null);
                        onStartComputerExam(targetGroup);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Vào Phòng Thi Thật (60')</span>
                      <ArrowRight size={14} className="text-amber-300" />
                    </button>
                  )}
                </div>

                {/* Branch 2: Untimed Practice & Dictionary Studio */}
                <div className="p-5 rounded-2xl border-2 border-amber-400 bg-amber-50/40 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-stone-950 text-[10px] font-mono font-bold uppercase">
                        Nhánh 2 • Không Giới Hạn Giờ
                      </span>
                      <Award size={16} className="text-amber-700" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-amber-950">
                      Phòng Luyện Tập &amp; Tra Từ
                    </h4>
                    <ul className="space-y-1.5 text-xs text-stone-700 font-sans">
                      <li>
                        • <strong>Không giới hạn thời gian (∞ Untimed)</strong> hoặc tự bật hẹn giờ.
                      </li>
                      <li>
                        • <strong>Tích hợp Từ điển Anh–Việt &amp; IPA:</strong> Bôi đen bất kỳ từ mới nào để xem nghĩa, nghe phát âm &amp; lưu vào Anki.
                      </li>
                      <li>
                        • Nút <strong>Check đáp án &amp; giải thích ngay</strong> sau từng câu hỏi.
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      const config: ReadingSessionConfig = {
                        mode: 'full',
                        passageId: selectedTestForModal.passages[0].id,
                        passageIds: selectedTestForModal.passages.map((p) => p.id),
                        testTitle: selectedTestForModal.source,
                        practiceMode: 'practice',
                        untimed: true,
                      };
                      handleStartSession(config);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#D97706] hover:bg-amber-700 text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Luyện Tập Cả 3 Passages (Kèm Tra Từ)</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Option 2: Individual Passages in Practice Mode */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <h4 className="text-sm font-serif font-bold text-stone-800">
                      Hoặc Luyện Lẻ Từng Passage (Không giới hạn giờ + Tra từ điển Anh–Việt)
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">
                    Tập trung đọc hiểu sâu
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedTestForModal.passages.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-amber-400 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#064E3B] text-amber-300 text-[10px] font-mono font-bold uppercase">
                            Passage {p.passageNumber}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500">{p.level}</span>
                          <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            {p.topic}
                          </span>
                        </div>
                        <h5 className="text-sm font-sans font-bold text-stone-900 line-clamp-1">
                          {p.title}
                        </h5>
                        <p className="text-[11px] text-stone-500 font-mono">
                          {p.questions?.length || 13} câu hỏi • ~{p.wordCount || 900} từ • Hỗ trợ tra từ &amp; lưu Anki
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const config: ReadingSessionConfig = {
                            mode: 'single',
                            passageId: p.id,
                            testTitle: selectedTestForModal.source,
                            passageNumber: p.passageNumber,
                            practiceMode: 'practice',
                            untimed: true,
                          };
                          handleStartSession(config);
                        }}
                        className="py-2 px-3.5 rounded-xl bg-amber-50 hover:bg-[#064E3B] text-amber-950 hover:text-amber-300 border border-amber-300 font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                      >
                        <span>Luyện Passage {p.passageNumber}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-sans">
                💡 Bạn có thể chuyển đổi linh hoạt giữa chế độ Không giới hạn giờ và Đếm giờ ngay trong phòng luyện tập.
              </span>
              <button
                onClick={() => setSelectedTestForModal(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-sans font-semibold text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
