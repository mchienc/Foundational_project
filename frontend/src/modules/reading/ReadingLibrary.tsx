import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  BookmarkCheck,
  Compass,
  Database,
  Award,
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  Laptop,
} from 'lucide-react';
import { mockReadingPassages } from '../../data/cambridgeMockData';
import { getReadingPassages, checkDatabaseHealth } from '../../services/cambridgeApi';
import { CambridgeReadingPassage, ReadingSessionConfig } from '../../types';
import { useCardEntrance } from '../../hooks/useCardEntrance';
import { useMistakeStore } from '../../store/useMistakeStore';
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
  onNavigateMistakeVault?: () => void;
}

export const ReadingLibrary: React.FC<ReadingLibraryProps> = ({
  onSelectPassage,
  onStartSession,
  onNavigateAnki,
  onStartComputerExam,
  onNavigateMistakeVault,
}) => {
  const { mistakes } = useMistakeStore();
  const [passages, setPassages] = useState<CambridgeReadingPassage[]>(mockReadingPassages);
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; message: string }>({
    connected: false,
    message: 'Đang kiểm tra kết nối...',
  });

  useEffect(() => {
    // Kiểm tra CSDL và tải bài thi từ MySQL
    checkDatabaseHealth().then(setDbStatus);
    getReadingPassages().then((data) => {
      if (data && data.length > 0) {
        setPassages(data);
      }
    });
  }, []);

  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State quản lý Modal chọn hình thức làm bài (Full Test vs Từng Passage)
  const [selectedTestForModal, setSelectedTestForModal] = useState<CambridgeTestGroup | null>(null);

  // Nhóm các passages thành từng Test hoàn chỉnh (Mỗi quyển Cam có 4 test)
  const testGroups = useMemo<CambridgeTestGroup[]>(() => {
    const map = new Map<string, CambridgeTestGroup>();
    // Nhóm các passages thành từng Test hoàn chỉnh (Mỗi quyển Cam có 4 test)
    passages.forEach((p) => {
      const key = p.source; // e.g. "Cambridge 13 - Test 1"
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

    // Sắp xếp các passages theo thứ tự Passage 1, 2, 3
    const groups = Array.from(map.values()).map((g) => {
      g.passages.sort((a, b) => a.passageNumber - b.passageNumber);
      g.totalQuestions = g.passages.reduce((sum, p) => sum + (p.questions?.length || 13), 0);
      g.totalWords = g.passages.reduce((sum, p) => sum + (p.wordCount || 850), 0);
      g.topics = Array.from(new Set(g.passages.map((p) => p.topic).filter(Boolean)));
      return g;
    });

    // Sắp xếp các bộ đề: Cambridge mới nhất lên đầu (Cam 20 -> 19 -> 18 -> 16 -> 15 -> 14 -> 13), mỗi quyển Test 1 -> Test 4
    groups.sort((a, b) => {
      const matchA = a.source.match(/Cambridge\s*(\d+)\s*-\s*Test\s*(\d+)/i);
      const matchB = b.source.match(/Cambridge\s*(\d+)\s*-\s*Test\s*(\d+)/i);
      if (matchA && matchB) {
        const bookA = parseInt(matchA[1], 10);
        const bookB = parseInt(matchB[1], 10);
        if (bookA !== bookB) {
          return bookB - bookA; // Sách mới nhất xếp trước
        }
        const testA = parseInt(matchA[2], 10);
        const testB = parseInt(matchB[2], 10);
        return testA - testB; // Test 1 -> 4
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
    // Tự động tính toán lại chiều cao cuộn khi danh sách đề thi hoàn tất render
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
            Hệ thống tổ chức theo từng Test hoàn chỉnh (4 Test mỗi quyển Cambridge IELTS).
            Bạn có thể làm trọn vẹn <strong>Full Test 60 phút (40 câu)</strong> để tính điểm Band Score thực tế, hoặc <strong>luyện riêng từng Passage (20 phút)</strong> để tập trung nâng cao kỹ năng.
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
              <Sparkles size={13} className="text-amber-700" />
              <span>Đồng Bộ Từ Vựng Anki Flashcard</span>
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Database Connection Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-mono font-medium shadow-xs transition-colors ${
              dbStatus.connected
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}
            title={dbStatus.message}
          >
            <span className={`w-2 h-2 rounded-full ${dbStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <Database size={13} className={dbStatus.connected ? 'text-emerald-700' : 'text-amber-700'} />
            <span className="font-sans font-semibold">
              {dbStatus.connected ? 'MySQL Database (28 Tests Cam 13–20)' : 'Offline / Local'}
            </span>
          </div>

          {/* Quick link to Mistake Vault */}
          {onNavigateMistakeVault && (
            <button
              onClick={onNavigateMistakeVault}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 text-xs font-sans font-bold shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer border border-amber-400/30"
            >
              <BookmarkCheck size={16} className="text-amber-300" />
              <span>Sổ Tay Câu Sai</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-mono font-bold text-[10px]">
                {mistakes.length}
              </span>
            </button>
          )}

          {/* Quick link to Anki SRS */}
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
          {/* Search Box */}
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

          {/* Source Tabs */}
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

          {/* Test Counter */}
          <span className="shrink-0 text-[11px] font-mono text-stone-500 self-end lg:self-center">
            Hiển thị <strong className="text-[#064E3B]">{filteredTests.length}</strong> bộ đề thi
          </span>
        </div>
      </div>

      {/* Tests Grid (Chỉ hiển thị các Test hoàn chỉnh, không hiển thị passage riêng lẻ) */}
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
                className="test-card bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5 group will-change-transform"
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
                      {isFull3Passages ? '60 Phút • 40 Câu Hỏi' : `${group.passages.length * 20} Phút • ${group.totalQuestions} Câu`}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#064E3B] group-hover:text-amber-800 transition-colors leading-snug">
                      {group.source}
                    </h3>
                    <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
                      {isFull3Passages
                        ? 'Đề thi IELTS Academic chuẩn Cambridge gồm trọn vẹn 3 Passages & 40 câu hỏi kèm đáp án giải thích chi tiết.'
                        : `Bộ đề thi IELTS Academic gồm ${group.passages.length} bài đọc và ${group.totalQuestions} câu hỏi chuyên sâu.`}
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
                          <span className="font-sans font-semibold text-stone-800 truncate" title={p.title}>
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

                {/* Card Action */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  {onStartComputerExam && (
                    <button
                      onClick={() => onStartComputerExam(group)}
                      className="w-full py-3 px-4 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs hover:shadow-md active:scale-98 transition-all cursor-pointer border border-amber-400/40"
                    >
                      <Laptop size={15} className="text-amber-400" />
                      <span>Thi Máy Tính IELTS on Computer (60')</span>
                      <ArrowRight size={14} className="card-arrow text-amber-400" />
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedTestForModal(group)}
                    className="w-full py-2.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Award size={15} className="text-stone-600" />
                    <span>Làm Bài Theo Chế Độ Cũ / Từng Passage</span>
                  </button>
                  <p className="text-center text-[11px] text-stone-500 font-sans">
                    Hỗ trợ phòng thi máy tính Split-Screen 60 phút hoặc luyện từng Passage 20 phút
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Test Mode Selection Modal */}
      {selectedTestForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#064E3B] text-white flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-sans font-bold tracking-normal">
                  <BookOpen size={12} className="text-amber-300" />
                  <span>Chọn Cách Làm Bài</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  {selectedTestForModal.source}
                </h3>
                <p className="text-xs text-stone-200 font-sans">
                  Bộ đề thi chuẩn Cambridge IELTS Academic • Tổng cộng {selectedTestForModal.passages.length} bài đọc ({selectedTestForModal.totalQuestions} câu hỏi)
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
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Option 1: Full Test */}
              <div className="p-5 rounded-2xl border-2 border-emerald-600/30 bg-emerald-50/40 hover:border-emerald-600 transition-all space-y-4 relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#064E3B] text-amber-300 flex items-center justify-center font-serif font-bold text-lg shadow-sm shrink-0">
                      <Award size={22} className="text-amber-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-serif font-bold text-[#064E3B]">
                          Làm Full Test 3 Passages
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold uppercase">
                          Chuẩn Phòng Thi
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-sans">
                        Mô phỏng 100% kỳ thi thật: 60 phút, 3 Passages, 40 câu hỏi, tính Band Score 0–9.0
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-emerald-200/60 text-center">
                  <div className="bg-white/80 rounded-xl p-2 border border-emerald-100">
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Thời Gian</span>
                    <strong className="text-xs font-mono text-[#064E3B]">60 Phút</strong>
                  </div>
                  <div className="bg-white/80 rounded-xl p-2 border border-emerald-100">
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Quy Mô</span>
                    <strong className="text-xs font-mono text-[#064E3B]">{selectedTestForModal.passages.length} Passages</strong>
                  </div>
                  <div className="bg-white/80 rounded-xl p-2 border border-emerald-100">
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Câu Hỏi</span>
                    <strong className="text-xs font-mono text-[#064E3B]">
                      {selectedTestForModal.totalQuestions} Câu
                    </strong>
                  </div>
                </div>

                {selectedTestForModal.passages.length >= 3 ? (
                  <div className="space-y-2">
                    {onStartComputerExam && (
                      <button
                        onClick={() => {
                          const targetGroup = selectedTestForModal;
                          setSelectedTestForModal(null);
                          onStartComputerExam(targetGroup);
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-98 transition-all cursor-pointer"
                      >
                        <Laptop size={15} />
                        <span>Vào Phòng Thi Máy Tính "IELTS on Computer" (Mới)</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        const config: ReadingSessionConfig = {
                          mode: 'full',
                          passageId: selectedTestForModal.passages[0].id,
                          passageIds: selectedTestForModal.passages.map((p) => p.id),
                          testTitle: selectedTestForModal.source,
                        };
                        handleStartSession(config);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-98 transition-all cursor-pointer"
                    >
                      <span>Bắt Đầu Thi Giao Diện Chuẩn (60 Phút)</span>
                      <ArrowRight size={14} className="text-amber-300" />
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-sans">
                    Bộ đề này hiện có {selectedTestForModal.passages.length} bài đọc trong hệ thống. Để thi Full Test 3 Passages (40 câu), bạn vui lòng chọn các bộ đề Cambridge 13–20 (Test 1–4).
                  </div>
                )}
              </div>

              {/* Option 2: Individual Passages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <h4 className="text-sm font-serif font-bold text-stone-800">
                      Luyện Từng Passage Riêng Lẻ (20 Phút / Bài)
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">
                    Luyện kỹ năng trọng tâm
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
                          <span className="text-[10px] font-mono text-stone-500">
                            {p.level}
                          </span>
                          <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            {p.topic}
                          </span>
                        </div>
                        <h5 className="text-sm font-sans font-bold text-stone-900 line-clamp-1">
                          {p.title}
                        </h5>
                        <p className="text-[11px] text-stone-500 font-mono">
                          {p.questions?.length || 13} câu hỏi • ~{p.wordCount || 900} từ • 20 phút
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const config: ReadingSessionConfig = {
                            mode: 'single',
                            passageId: p.id,
                            testTitle: selectedTestForModal.source,
                            passageNumber: p.passageNumber,
                          };
                          handleStartSession(config);
                        }}
                        className="py-2 px-3.5 rounded-xl bg-stone-100 hover:bg-[#064E3B] text-stone-700 hover:text-amber-300 border border-stone-200 font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
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
                💡 Bạn có thể làm lại nhiều lần để đối soát lời giải chi tiết và nạp từ vựng vào Anki.
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

