import { useState, useMemo } from 'react';
import {
  BookmarkCheck,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Trash2,
  AlertCircle,
  HelpCircle,
  Filter,
} from 'lucide-react';
import { useMistakeStore } from '../../store/useMistakeStore';
import { MistakeRecord, MistakeQuestionType } from '../../types';
import { MistakeAnalyticsChart } from './MistakeAnalyticsChart';
import { TargetedPracticeModal } from './TargetedPracticeModal';

interface MistakeVaultViewProps {
  onBackToLibrary: () => void;
  onNavigateExam?: () => void;
}

export const MistakeVaultView = ({
  onBackToLibrary,
  onNavigateExam,
}: MistakeVaultViewProps) => {
  const {
    mistakes,
    activeFilterType,
    setFilterType,
    activeFilterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    deleteMistake,
    clearAll,
  } = useMistakeStore();

  const [activePracticeMistake, setActivePracticeMistake] = useState<MistakeRecord | null>(null);

  // Question Types for filtering
  const questionTypes: { id: MistakeQuestionType | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'Tất cả dạng bài' },
    { id: 'TFNG', label: 'True / False / NG' },
    { id: 'MATCHING_HEADINGS', label: 'Matching Headings' },
    { id: 'SUMMARY_COMPLETION', label: 'Summary Completion' },
    { id: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
    { id: 'MATCHING_INFO', label: 'Matching Information' },
  ];

  // Filtered mistake list
  const filteredMistakes = useMemo(() => {
    return mistakes.filter((item) => {
      // Filter Type
      if (activeFilterType !== 'ALL' && item.questionType !== activeFilterType) {
        return false;
      }
      // Filter Status
      if (activeFilterStatus !== 'ALL' && item.status !== activeFilterStatus) {
        return false;
      }
      // Filter Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchText = item.questionText.toLowerCase().includes(q);
        const matchSource = item.source.toLowerCase().includes(q);
        const matchExpl = (item.explanation || '').toLowerCase().includes(q);
        const matchAns = (item.userAnswer || '').toLowerCase().includes(q);
        if (!matchText && !matchSource && !matchExpl && !matchAns) {
          return false;
        }
      }
      return true;
    });
  }, [mistakes, activeFilterType, activeFilterStatus, searchQuery]);

  // High-level statistics
  const totalMistakes = mistakes.length;
  const resolvedMistakes = mistakes.filter((m) => m.status === 'RESOLVED').length;
  const needsPracticeMistakes = totalMistakes - resolvedMistakes;
  const resolutionRate = totalMistakes > 0 ? Math.round((resolvedMistakes / totalMistakes) * 100) : 0;

  return (
    <div className="min-h-screen bg-transparent text-stone-900 pb-20 pt-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ================= HERO HEADER ================= */}
        <div className="bg-gradient-to-br from-[#064E3B] to-[#022C22] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>IELTS Error Tracking &amp; Analysis System</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Sổ Tay Câu Sai (Mistake Vault)
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-sans">
              Hệ thống tự động lưu trữ mọi câu sai và bỏ trống từ các phòng thi máy tính. Phân loại theo 5 dạng bài trọng tâm, đối soát trực tiếp với trích đoạn bằng chứng (Evidence Snippet) và luyện tập tháo gỡ triệt để.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onBackToLibrary}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
              >
                ← Quay lại thư viện bài thi
              </button>

              {onNavigateExam && (
                <button
                  type="button"
                  onClick={onNavigateExam}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen size={14} />
                  <span>Vào Phòng Thi Máy Tính</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= SUMMARY STATS METRICS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center font-bold">
              <AlertCircle size={22} className="text-stone-600" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-stone-400 block">Tổng câu sai</span>
              <strong className="text-2xl font-serif font-bold text-stone-900">{totalMistakes}</strong>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <HelpCircle size={22} className="text-amber-600" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-stone-400 block">Cần luyện tập</span>
              <strong className="text-2xl font-serif font-bold text-amber-600">{needsPracticeMistakes}</strong>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 size={22} className="text-emerald-600" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-stone-400 block">Đã tháo gỡ</span>
              <strong className="text-2xl font-serif font-bold text-emerald-700">{resolvedMistakes}</strong>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center font-bold">
              <BookmarkCheck size={22} className="text-[#064E3B]" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-stone-400 block">Tỷ lệ tháo gỡ</span>
              <strong className="text-2xl font-serif font-bold text-[#064E3B]">{resolutionRate}%</strong>
            </div>
          </div>
        </div>

        {/* ================= RECHARTS ANALYTICS ================= */}
        <MistakeAnalyticsChart />

        {/* ================= FILTER TOOLBAR ================= */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo câu hỏi, nguồn (Cam 18), đáp án hoặc lời giải thích..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAFAF9] text-xs font-sans text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 shrink-0 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => setFilterStatus('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilterStatus === 'ALL'
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Tất cả ({mistakes.length})
              </button>

              <button
                type="button"
                onClick={() => setFilterStatus('NEEDS_PRACTICE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilterStatus === 'NEEDS_PRACTICE'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cần luyện tập ({needsPracticeMistakes})
              </button>

              <button
                type="button"
                onClick={() => setFilterStatus('RESOLVED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilterStatus === 'RESOLVED'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Đã tháo gỡ ({resolvedMistakes})
              </button>
            </div>
          </div>

          {/* Question Type Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
            <span className="text-[11px] font-mono uppercase font-bold text-stone-400 mr-2 flex items-center gap-1">
              <Filter size={12} />
              Dạng bài:
            </span>
            {questionTypes.map((qt) => (
              <button
                key={qt.id}
                type="button"
                onClick={() => setFilterType(qt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium font-sans transition-all cursor-pointer ${
                  activeFilterType === qt.id
                    ? 'bg-[#064E3B] text-amber-300 shadow-xs font-bold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {qt.label}
              </button>
            ))}

            {mistakes.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử câu sai?')) {
                    clearAll();
                  }
                }}
                className="ml-auto text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 size={12} />
                <span>Xóa toàn bộ</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= MISTAKE CARDS LIST ================= */}
        {filteredMistakes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <BookmarkCheck className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold font-sans text-stone-800">
              Không có câu sai nào trong mục này
            </h3>
            <p className="text-xs text-stone-500 font-sans max-w-md mx-auto">
              Bạn đang làm rất tốt! Hãy tiếp tục luyện thi các bộ đề Cambridge trong thư viện để ghi nhận thêm các điểm cần cải thiện.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMistakes.map((m) => {
              const isResolved = m.status === 'RESOLVED';

              return (
                <div
                  key={m.id}
                  className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  {/* Card Header Badges */}
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#064E3B] text-amber-300 text-xs font-mono font-bold">
                          {m.source}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-mono">
                          P{m.passage} • Câu {m.questionNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isResolved
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-amber-50 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {isResolved ? 'Resolved' : 'Needs Practice'}
                        </span>

                        <button
                          type="button"
                          onClick={() => deleteMistake(m.id)}
                          className="text-stone-300 hover:text-red-600 p-1 transition-colors"
                          title="Xóa câu này"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-amber-700 font-bold uppercase tracking-wider">
                      Dạng bài: {m.questionType}
                    </div>

                    {/* Question Content */}
                    <h4 className="font-serif text-base font-bold text-stone-900 leading-snug">
                      {m.questionText}
                    </h4>
                  </div>

                  {/* Answer Comparison Box */}
                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-stone-50 border border-stone-200/80 font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-red-500 uppercase font-bold block">
                        Đáp án bạn đã chọn:
                      </span>
                      <strong className="text-red-700 block truncate">{m.userAnswer}</strong>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-emerald-600 uppercase font-bold block">
                        Đáp án chính xác:
                      </span>
                      <strong className="text-emerald-800 block truncate">{m.correctAnswer}</strong>
                    </div>
                  </div>

                  {/* Evidence Snippet */}
                  {m.evidenceSnippet && (
                    <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/60 text-xs space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-800 block">
                        Trích đoạn bằng chứng (Evidence):
                      </span>
                      <p className="font-serif italic text-stone-700 line-clamp-2">
                        "{m.evidenceSnippet}"
                      </p>
                    </div>
                  )}

                  {/* Action CTA: Practice This Mistake */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-stone-500">
                      Đã thử: <strong>{m.attemptsCount} lần</strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => setActivePracticeMistake(m)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                        isResolved
                          ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          : 'bg-[#064E3B] hover:bg-[#022C22] text-amber-300'
                      }`}
                    >
                      <span>{isResolved ? 'Xem lại bài tập' : 'Luyện lại câu này'}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Targeted Practice Modal */}
      {activePracticeMistake && (
        <TargetedPracticeModal
          mistake={activePracticeMistake}
          onClose={() => setActivePracticeMistake(null)}
        />
      )}
    </div>
  );
};
