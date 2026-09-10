import { Award, CheckCircle2, XCircle, Clock, ArrowRight, BookmarkCheck, RotateCcw } from 'lucide-react';
import { ExamResultData } from '../../store/useExamStore';
import { useExamStore } from '../../store/useExamStore';

interface ExamResultModalProps {
  result: ExamResultData;
  onNavigateMistakeVault: () => void;
  onReviewTest: () => void;
  onBackToLibrary: () => void;
}

export const ExamResultModal = ({
  result,
  onNavigateMistakeVault,
  onReviewTest,
  onBackToLibrary,
}: ExamResultModalProps) => {
  const { contrastMode } = useExamStore();

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} phút ${s} giây`;
  };

  const accuracyPct = Math.round((result.correctCount / (result.totalQuestions || 40)) * 100);
  const mistakesCount = result.totalQuestions - result.correctCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in">
      <div
        className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 font-sans border shadow-2xl space-y-6 ${
          isHighContrast
            ? 'bg-black text-yellow-300 border-2 border-yellow-400'
            : isInverted
            ? 'bg-[#022C22] text-slate-100 border border-emerald-600'
            : 'bg-white text-stone-900 border border-stone-200'
        }`}
      >
        {/* Header Title & Band Score Showcase */}
        <div className="text-center space-y-2 pb-4 border-b border-stone-200/40">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B] text-amber-300 text-xs font-mono font-bold tracking-wide">
            <Award size={14} className="text-amber-300" />
            <span>Kết Quả Thi Thử IELTS on Computer</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            {result.testTitle || 'Cambridge Reading Test'}
          </h2>

          <p className="text-xs opacity-75 font-mono">
            Mã thí sinh: <strong>{result.candidateNumber}</strong> • Ngày làm bài:{' '}
            {new Date(result.date).toLocaleDateString('vi-VN')}
          </p>
        </div>

        {/* Band Score & Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Main Band Score */}
          <div
            className={`p-5 rounded-2xl flex flex-col items-center justify-center text-center ${
              isHighContrast
                ? 'bg-yellow-400 text-black'
                : isInverted
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-br from-[#064E3B] to-[#043d2e] text-white shadow-md'
            }`}
          >
            <span className="text-xs font-mono uppercase font-bold tracking-wider opacity-80 mb-1">
              Estimated Band Score
            </span>
            <span className="text-5xl sm:text-6xl font-serif font-bold tracking-tight text-amber-300">
              {result.bandScore.toFixed(1)}
            </span>
            <span className="text-[11px] font-sans opacity-80 mt-1">
              {result.bandScore >= 8.0
                ? 'Xuất sắc (Very Good User)'
                : result.bandScore >= 7.0
                ? 'Giỏi (Good User)'
                : result.bandScore >= 6.0
                ? 'Khá (Competent User)'
                : 'Cần Luyện Tập Thêm'}
            </span>
          </div>

          {/* Correct / Incorrect stats */}
          <div
            className={`p-4 rounded-2xl flex flex-col justify-between space-y-2 border ${
              isHighContrast
                ? 'bg-stone-950 border-yellow-400/40'
                : isInverted
                ? 'bg-[#03372b] border-emerald-700'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 size={15} />
                Số câu đúng:
              </span>
              <strong className="font-mono text-sm">
                {result.correctCount} / {result.totalQuestions}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-red-500 font-semibold">
                <XCircle size={15} />
                Số câu sai:
              </span>
              <strong className="font-mono text-sm">{result.incorrectCount}</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Chưa làm:</span>
              <strong className="font-mono text-sm">{result.unansweredCount}</strong>
            </div>

            <div className="pt-1 border-t border-stone-200/50 flex items-center justify-between text-xs">
              <span>Độ chính xác:</span>
              <strong className="font-mono text-amber-600 font-bold">{accuracyPct}%</strong>
            </div>
          </div>

          {/* Time & Mistakes notification */}
          <div
            className={`p-4 rounded-2xl flex flex-col justify-between space-y-2 border ${
              isHighContrast
                ? 'bg-stone-950 border-yellow-400/40'
                : isInverted
                ? 'bg-[#03372b] border-emerald-700'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs">
              <Clock size={15} className="text-stone-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] opacity-70 uppercase font-mono">Thời gian làm bài:</div>
                <div className="font-mono font-bold text-xs truncate">
                  {formatTime(result.timeSpentSeconds)}
                </div>
              </div>
            </div>

            <div
              className={`p-2.5 rounded-xl text-xs space-y-1 ${
                isHighContrast
                  ? 'bg-yellow-400/20 text-yellow-300'
                  : isInverted
                  ? 'bg-emerald-900/60 text-emerald-200'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              <div className="font-bold flex items-center gap-1">
                <BookmarkCheck size={14} />
                <span>Sổ Tay Câu Sai:</span>
              </div>
              <p className="text-[11px] leading-snug">
                Đã tự động lưu <strong>{mistakesCount} câu sai / bỏ trống</strong> kèm lời giải chi tiết.
              </p>
            </div>
          </div>
        </div>

        {/* Passage Breakdowns */}
        {result.passageBreakdowns && result.passageBreakdowns.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider opacity-70">
              Chi Tiết Từng Passage:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {result.passageBreakdowns.map((pb) => (
                <div
                  key={pb.passageNumber}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    isHighContrast
                      ? 'border-yellow-400/30 bg-stone-950'
                      : isInverted
                      ? 'border-emerald-700 bg-[#03372b]'
                      : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <span className="font-serif font-bold">Passage {pb.passageNumber}</span>
                  <span className="font-mono font-bold text-amber-600">
                    {pb.correct} / {pb.total} câu
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onReviewTest}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Xem lại bài làm</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onBackToLibrary}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl hover:bg-stone-500/10 text-xs font-semibold transition-colors cursor-pointer"
            >
              Thư viện đề thi
            </button>

            <button
              type="button"
              onClick={onNavigateMistakeVault}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer ${
                isHighContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : isInverted
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                  : 'bg-[#064E3B] text-white hover:bg-[#022C22]'
              }`}
            >
              <BookmarkCheck size={16} className="text-amber-400" />
              <span>Mở Sổ Tay Câu Sai ({mistakesCount})</span>
              <ArrowRight size={14} className="text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
