import React, { useState, useMemo, useRef } from 'react';
import {
  Headphones,
  Search,
  ArrowRight,
  Gauge,
  Layers,
  FileCheck,
  ClipboardList,
} from 'lucide-react';
import { mockListeningTests } from '../../data/cambridgeMockData';
import { mockListeningFullTests } from '../../data/mockListeningTests';
import { ListeningSection } from '../../types';
import { useCardEntrance } from '../../hooks/useCardEntrance';

interface ListeningLibraryProps {
  onSelectTest: (testId: string) => void;
  onSelectFullTest?: (testId: string) => void;
  onNavigateAnki?: () => void;
}

export const ListeningLibrary: React.FC<ListeningLibraryProps> = ({
  onSelectTest,
  onSelectFullTest,
  onNavigateAnki,
}) => {
  const [mode, setMode] = useState<'dictation' | 'fulltest'>('fulltest');
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
        if (!test.title.toLowerCase().includes(q) && !test.source.toLowerCase().includes(q) && !test.topic.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [selectedPart, searchQuery]);

  const filteredFullTests = useMemo(() => {
    return mockListeningFullTests.filter((test) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!test.source.toLowerCase().includes(q) && !test.book.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [searchQuery]);

  const gridRef = useRef<HTMLDivElement>(null);
  useCardEntrance(gridRef, [filteredDictationTests, filteredFullTests, mode]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B] text-amber-300 text-xs font-mono font-bold tracking-normal uppercase shadow-xs">
            <Headphones size={13} className="text-amber-300" />
            <span>Thư Viện Nghe Cambridge IELTS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
            Luyện Nghe IELTS
          </h1>
          <p className="text-sm text-stone-600 font-sans max-w-2xl leading-relaxed">
            Chọn <strong>Thi thử Full Test</strong> để mô phỏng đề thi thật với 40 câu hỏi chuẩn Cambridge, hoặc chọn <strong>Dictation Studio</strong> để luyện nghe chép chính tả từng câu chuyên sâu.
          </p>
        </div>
        {onNavigateAnki && (
          <button
            onClick={onNavigateAnki}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-sans font-bold shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <FileCheck size={16} className="text-amber-700" />
            <span>Mở Anki Flashcard SRS</span>
            <ArrowRight size={14} className="text-amber-700" />
          </button>
        )}
      </div>

      {/* Mode Toggle */}
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
          Thi thử Full Test (40 câu)
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
          Dictation Studio (Chép chính tả)
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài nghe, chủ đề..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAFAF9] text-xs font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          {mode === 'dictation' && (
            <div className="md:col-span-7 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-stone-400 uppercase mr-1">
                Phần nghe:
              </span>
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
                className="test-card bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5 group will-change-transform"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#064E3B] text-amber-300 text-[10px] font-mono font-bold tracking-normal uppercase">
                      {test.book}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                      4 Sections • 40 Câu
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#064E3B] group-hover:text-amber-800 transition-colors leading-snug">
                    {test.source}
                  </h3>

                  <div className="space-y-1">
                    {test.sections.map((s: ListeningSection) => (
                      <div key={s.sectionNumber} className="flex items-center gap-2 text-xs text-stone-600 font-sans">
                        <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-700 font-mono shrink-0">
                          {s.sectionNumber}
                        </span>
                        <span className="truncate">{s.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAFAF9] border border-stone-200 flex items-center gap-3 text-xs font-mono text-stone-600">
                  <Gauge size={13} className="text-amber-600 shrink-0" />
                  <span>~{test.estimatedMinutes} phút • Chuẩn Cambridge IELTS Academic</span>
                </div>

                <button
                  onClick={() => onSelectFullTest?.(test.id)}
                  className="w-full py-3 px-4 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-xs hover:shadow-md active:scale-98 transition-all cursor-pointer group-hover:border group-hover:border-amber-400/40"
                >
                  <span>Bắt Đầu Thi Thử Listening Full Test</span>
                  <ArrowRight size={14} className="card-arrow text-amber-400" />
                </button>
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
                  Diễn giả: <strong className="text-stone-700">{test.speaker}</strong> • Chủ đề: {test.topic}
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
                    Số câu cần chép: <strong className="text-[#064E3B]">{test.totalSentences} câu</strong>
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
    </div>
  );
};



