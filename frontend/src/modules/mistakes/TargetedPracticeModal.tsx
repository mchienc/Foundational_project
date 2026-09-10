import { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  HelpCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MistakeRecord } from '../../types';
import { useMistakeStore } from '../../store/useMistakeStore';

interface TargetedPracticeModalProps {
  mistake: MistakeRecord;
  onClose: () => void;
}

export const TargetedPracticeModal = ({
  mistake,
  onClose,
}: TargetedPracticeModalProps) => {
  const { resolveMistake } = useMistakeStore();
  const [userAttempt, setUserAttempt] = useState<string>('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const checkAnswer = () => {
    if (!userAttempt.trim()) return;

    const normalizedAttempt = userAttempt.trim().toLowerCase().replace(/\s+/g, ' ');
    const normalizedCorrect = (mistake.correctAnswer || '').trim().toLowerCase().replace(/\s+/g, ' ');

    let isCorrect = normalizedAttempt === normalizedCorrect;
    if (!isCorrect && mistake.acceptableAnswers) {
      isCorrect = mistake.acceptableAnswers.some(
        (ans) => ans.trim().toLowerCase().replace(/\s+/g, ' ') === normalizedAttempt
      );
    }

    if (isCorrect) {
      setFeedbackState('correct');
      resolveMistake(mistake.id, true);
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (_e) {}
    } else {
      setFeedbackState('incorrect');
      resolveMistake(mistake.id, false);
    }
  };

  const handleResetAttempt = () => {
    setUserAttempt('');
    setFeedbackState('idle');
  };

  // Render inputs based on question type
  const renderInputArea = () => {
    if (mistake.options && mistake.options.length > 0) {
      return (
        <div className="space-y-2 pt-1">
          {mistake.options.map((opt) => {
            const isSelected =
              userAttempt.toUpperCase() === opt.label.toUpperCase() ||
              userAttempt.toUpperCase() === opt.id.toUpperCase();

            return (
              <label
                key={opt.id || opt.label}
                onClick={() => {
                  if (feedbackState !== 'correct') {
                    setUserAttempt(opt.label);
                  }
                }}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border text-xs sm:text-sm font-sans transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#064E3B] bg-emerald-50 text-[#064E3B] font-semibold shadow-xs'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                } ${feedbackState === 'correct' ? 'pointer-events-none opacity-80' : ''}`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-[#064E3B] text-white'
                      : 'border border-stone-300 text-stone-500'
                  }`}
                >
                  {opt.label}
                </div>
                <span className="flex-1 leading-snug">{opt.text}</span>
              </label>
            );
          })}
        </div>
      );
    }

    // Text Input for Fill in the Blank / Summary
    return (
      <div className="space-y-2 pt-1">
        <label className="text-xs font-mono text-stone-500 block">
          Nhập câu trả lời sửa lại của bạn:
        </label>
        <input
          type="text"
          value={userAttempt}
          disabled={feedbackState === 'correct'}
          onChange={(e) => setUserAttempt(e.target.value)}
          placeholder="Type your revised answer here..."
          className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] text-sm font-mono font-semibold text-stone-900 outline-none transition-all"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#064E3B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
              <Sparkles size={16} />
            </span>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                Luyện Tập Tháo Gỡ Câu Sai
              </h3>
              <p className="text-[11px] text-stone-200 font-mono">
                {mistake.source} • Passage {mistake.passage} • Câu {mistake.questionNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Question Meta Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#064E3B] text-amber-300 text-xs font-mono font-bold">
              Dạng: {mistake.questionType}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                mistake.status === 'RESOLVED'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              {mistake.status === 'RESOLVED' ? 'Đã Tháo Gỡ (Resolved)' : 'Cần Luyện Tập (Needs Practice)'}
            </span>
            <span className="text-xs text-stone-500 font-mono">
              Lần thử: {mistake.attemptsCount}
            </span>
          </div>

          {/* Question Text */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[11px] font-mono font-bold uppercase text-stone-400 block mb-1">
              Câu Hỏi {mistake.questionNumber}:
            </span>
            <p className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-relaxed">
              {mistake.questionText}
            </p>
          </div>

          {/* Previous Incorrect Answer */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50/70 border border-red-200 text-xs text-red-900">
            <XCircle size={15} className="text-red-500 shrink-0" />
            <span>
              Đáp án sai bạn từng chọn:{' '}
              <strong className="font-mono text-red-700 underline">{mistake.userAnswer}</strong>
            </span>
          </div>

          {/* Interactive Input Form */}
          {renderInputArea()}

          {/* Check Button */}
          {feedbackState !== 'correct' && (
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={checkAnswer}
                disabled={!userAttempt.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
              >
                <span>Kiểm Tra Đáp Án</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Feedback Section: Correct or Incorrect */}
          {feedbackState === 'correct' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>Chính xác tuyệt vời! Bạn đã tháo gỡ thành công câu này.</span>
              </div>
              <p className="text-xs text-emerald-900">
                Trạng thái câu hỏi đã được cập nhật thành <strong>RESOLVED</strong> trong Sổ tay câu sai.
              </p>
            </div>
          )}

          {feedbackState === 'incorrect' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                  <HelpCircle size={16} className="text-amber-600" />
                  <span>Chưa chính xác. Đọc gợi ý đoạn văn bên dưới và thử lại!</span>
                </div>
                <button
                  type="button"
                  onClick={handleResetAttempt}
                  className="flex items-center gap-1 text-[11px] font-bold text-stone-700 hover:text-stone-900 underline"
                >
                  <RotateCcw size={12} />
                  Thử lại
                </button>
              </div>
            </div>
          )}

          {/* Evidence Snippet & Explanation (Always visible or revealed on correct) */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            {mistake.evidenceSnippet && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#064E3B]">
                  <BookOpen size={13} />
                  <span>Trích đoạn văn bản đối soát (Evidence Snippet):</span>
                </div>
                <blockquote className="text-xs sm:text-sm font-serif italic text-stone-700 border-l-2 border-[#064E3B] pl-3 py-1">
                  "{mistake.evidenceSnippet}"
                </blockquote>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-1.5">
              <div className="text-xs font-mono font-bold uppercase text-amber-800">
                Lời Giải Thích Chi Tiết (Explanation):
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                {mistake.explanation}
              </p>
              <div className="text-xs font-mono pt-1 text-stone-600">
                Đáp án chuẩn:{' '}
                <strong className="text-emerald-700">{mistake.correctAnswer}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
