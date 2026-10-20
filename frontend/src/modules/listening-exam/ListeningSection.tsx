import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, CheckCircle2, XCircle, Highlighter, Eraser, HelpCircle } from 'lucide-react';
import {
  ListeningSection as IListeningSection,
  ListeningQuestion,
  ContrastMode,
} from '../../types';

interface ListeningSectionProps {
  section: IListeningSection;
  userAnswers: Record<string, string>;
  reviewFlags: Set<string>;
  onAnswer: (questionId: string, value: string) => void;
  onToggleFlag: (questionId: string) => void;
  activeQuestionNumber?: number | null;
  onFocusQuestion?: (questionNumber: number) => void;
  contrastMode?: ContrastMode;
  showInstantAnswers?: boolean;
}

interface HighlightMap {
  [key: string]: { text: string; color: 'yellow' | 'green' }[];
}

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  section,
  userAnswers,
  reviewFlags,
  onAnswer,
  onToggleFlag,
  activeQuestionNumber,
  onFocusQuestion,
  contrastMode = 'standard',
  showInstantAnswers = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlights, setHighlights] = useState<HighlightMap>({});
  const [selectionPopup, setSelectionPopup] = useState<{
    x: number;
    y: number;
    text: string;
    questionId: string;
  } | null>(null);

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  // Close highlight popup when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setSelectionPopup(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseUp = (questionId: string, e: React.MouseEvent) => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const selectedText = sel.toString().trim();
    if (selectedText.length < 2 || selectedText.length > 120) return;

    setSelectionPopup({
      x: e.clientX,
      y: e.clientY - 44,
      text: selectedText,
      questionId,
    });
  };

  const applyHighlight = (color: 'yellow' | 'green') => {
    if (!selectionPopup) return;
    const { questionId, text } = selectionPopup;
    setHighlights((prev) => {
      const current = prev[questionId] || [];
      if (current.some((h) => h.text.toLowerCase() === text.toLowerCase())) return prev;
      return {
        ...prev,
        [questionId]: [...current, { text, color }],
      };
    });
    window.getSelection()?.removeAllRanges();
    setSelectionPopup(null);
  };

  const clearHighlightsForQuestion = (questionId: string) => {
    setHighlights((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setSelectionPopup(null);
  };

  // Helper to render text with user-applied keyword highlights
  const renderHighlightedText = (text: string, questionId: string) => {
    const qHighlights = highlights[questionId];
    if (!qHighlights || qHighlights.length === 0) return text;

    let parts: React.ReactNode[] = [text];
    qHighlights.forEach((h, hIdx) => {
      const escaped = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      const nextParts: React.ReactNode[] = [];

      parts.forEach((part, pIdx) => {
        if (typeof part !== 'string') {
          nextParts.push(part);
          return;
        }
        const split = part.split(regex);
        split.forEach((chunk, cIdx) => {
          if (chunk.toLowerCase() === h.text.toLowerCase()) {
            nextParts.push(
              <mark
                key={`hl-${hIdx}-${pIdx}-${cIdx}`}
                className={`px-1 rounded font-semibold ${
                  h.color === 'yellow'
                    ? 'bg-amber-300/80 text-stone-950'
                    : 'bg-emerald-300/80 text-stone-950'
                }`}
              >
                {chunk}
              </mark>
            );
          } else if (chunk) {
            nextParts.push(chunk);
          }
        });
      });
      parts = nextParts;
    });

    return <>{parts}</>;
  };

  const checkIsCorrect = (q: ListeningQuestion, val: string) => {
    const clean = val.trim().toLowerCase();
    if (!clean) return false;
    if (clean === q.correctAnswer.toLowerCase()) return true;
    return (q.acceptableAnswers || []).some((a) => a.toLowerCase() === clean);
  };

  const renderInlineBlankQuestion = (q: ListeningQuestion) => {
    const value = userAnswers[q.id] || '';
    const isCorrect = checkIsCorrect(q, value);
    const parts = q.prompt.split('___');

    const inputEl = (
      <span className="inline-flex items-center mx-1.5 align-baseline">
        <span
          className={`inline-flex items-center rounded-lg border-2 px-2 py-1 transition-all ${
            showInstantAnswers
              ? isCorrect
                ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                : 'border-red-500 bg-red-50 text-red-900'
              : isHighContrast
              ? 'border-yellow-400 bg-stone-900 text-yellow-300 focus-within:ring-2 focus-within:ring-yellow-400'
              : isInverted
              ? 'border-emerald-500 bg-[#064E3B] text-white focus-within:ring-2 focus-within:ring-amber-400'
              : 'border-[#064E3B]/70 bg-[#FAFAF9] text-stone-900 focus-within:border-[#D97706] focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400/30'
          }`}
        >
          <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#064E3B] text-amber-300 mr-2 select-none">
            {q.number}
          </span>
          <input
            type="text"
            value={value}
            onFocus={() => onFocusQuestion?.(q.number)}
            onChange={(e) => onAnswer(q.id, e.target.value)}
            placeholder="Nhập đáp án..."
            autoComplete="off"
            spellCheck={false}
            className="bg-transparent font-sans font-semibold text-sm focus:outline-none w-36 sm:w-44"
          />
        </span>
      </span>
    );

    if (parts.length > 1) {
      return (
        <div className="text-sm sm:text-base leading-relaxed font-sans">
          <span>{renderHighlightedText(parts[0], q.id)}</span>
          {inputEl}
          <span>{renderHighlightedText(parts.slice(1).join('___'), q.id)}</span>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="text-sm sm:text-base font-medium">
          {renderHighlightedText(q.prompt, q.id)}
        </div>
        {inputEl}
      </div>
    );
  };

  const renderMultipleChoice = (q: ListeningQuestion) => {
    const value = userAnswers[q.id] || '';
    const options = q.options || [
      { id: 'A', label: 'A', text: 'Option A' },
      { id: 'B', label: 'B', text: 'Option B' },
      { id: 'C', label: 'C', text: 'Option C' },
    ];

    return (
      <div className="space-y-3">
        <p className="text-sm sm:text-base font-semibold leading-snug">
          {renderHighlightedText(q.prompt, q.id)}
        </p>
        <div className="space-y-2 pt-1">
          {options.map((opt) => {
            const isSelected = value === opt.label;
            const isRightOption =
              showInstantAnswers && opt.label.toLowerCase() === q.correctAnswer.toLowerCase();
            const isWrongSelected = showInstantAnswers && isSelected && !isRightOption;

            return (
              <label
                key={opt.id}
                onClick={() => onFocusQuestion?.(q.number)}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-text ${
                  isRightOption
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950'
                    : isWrongSelected
                    ? 'border-red-500 bg-red-50/80 text-red-950'
                    : isSelected
                    ? isHighContrast
                      ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                      : isInverted
                      ? 'border-amber-400 bg-emerald-900/80 text-white'
                      : 'border-[#064E3B] bg-emerald-50/60 text-stone-900 shadow-2xs'
                    : isHighContrast
                    ? 'border-stone-700 hover:border-yellow-400/60'
                    : isInverted
                    ? 'border-emerald-800 hover:bg-emerald-900/40'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/70'
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={opt.label}
                  checked={isSelected}
                  onChange={(e) => onAnswer(q.id, e.target.value)}
                  className="hidden"
                />
                <span
                  className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black'
                        : 'bg-[#064E3B] text-amber-300'
                      : 'bg-stone-100 text-stone-700 border border-stone-300'
                  }`}
                >
                  {opt.label}
                </span>
                <span className="text-sm font-sans leading-relaxed pt-0.5">
                  {renderHighlightedText(opt.text, q.id)}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMatching = (q: ListeningQuestion) => {
    const value = userAnswers[q.id] || '';
    const letters = (q.options || []).map((o) => o.label);
    const choiceList = letters.length > 0 ? letters : ['A', 'B', 'C', 'D', 'E'];

    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
        <div className="text-sm sm:text-base font-medium">
          {renderHighlightedText(q.prompt, q.id)}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {choiceList.map((letter) => {
            const isSelected = value === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => {
                  onFocusQuestion?.(q.number);
                  onAnswer(q.id, letter);
                }}
                className={`w-8 h-8 rounded-lg font-mono text-xs font-bold border-2 transition-all cursor-pointer ${
                  isSelected
                    ? isHighContrast
                      ? 'bg-yellow-400 text-black border-yellow-400'
                      : 'bg-[#064E3B] text-amber-300 border-[#064E3B] scale-105 shadow-xs'
                    : isHighContrast
                    ? 'border-stone-700 text-yellow-400 hover:border-yellow-400'
                    : isInverted
                    ? 'border-emerald-700 text-emerald-200 hover:bg-emerald-800'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-[#064E3B]'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const groups = section.questions.reduce(
    (acc: Record<string, ListeningQuestion[]>, q: ListeningQuestion) => {
      const key = q.groupHeader || 'default';
      if (!acc[key]) acc[key] = [];
      acc[key].push(q);
      return acc;
    },
    {}
  );

  const cardClasses = isHighContrast
    ? 'bg-black border-yellow-400 text-yellow-300'
    : isInverted
    ? 'bg-[#022C22] border-emerald-700 text-slate-100'
    : 'bg-white border-stone-200 text-stone-800';

  return (
    <div ref={containerRef} className="w-full space-y-6 relative">
      {/* Floating Keyword Highlight Popup */}
      {selectionPopup && (
        <div
          style={{
            position: 'fixed',
            left: Math.max(16, Math.min(window.innerWidth - 220, selectionPopup.x - 80)),
            top: Math.max(16, selectionPopup.y),
          }}
          className="z-50 flex items-center gap-1.5 bg-stone-900 text-white px-2.5 py-1.5 rounded-xl shadow-xl border border-stone-700 text-xs font-sans animate-in fade-in zoom-in-95 duration-150"
        >
          <Highlighter size={13} className="text-amber-400 mr-0.5" />
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              applyHighlight('yellow');
            }}
            className="px-2 py-0.5 rounded bg-amber-400 text-stone-950 font-bold hover:bg-amber-300 cursor-pointer"
          >
            Vàng
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              applyHighlight('green');
            }}
            className="px-2 py-0.5 rounded bg-emerald-400 text-stone-950 font-bold hover:bg-emerald-300 cursor-pointer"
          >
            Xanh
          </button>
          {highlights[selectionPopup.questionId]?.length ? (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                clearHighlightsForQuestion(selectionPopup.questionId);
              }}
              className="p-1 rounded hover:bg-stone-700 text-stone-300 cursor-pointer"
              title="Xoá highlight câu này"
            >
              <Eraser size={13} />
            </button>
          ) : null}
        </div>
      )}

      {Object.entries(groups).map(([header, questions], gIndex) => {
        const firstQ = questions[0];
        const isMatchingGroup =
          firstQ?.type === 'matching' && firstQ.options && firstQ.options.length > 0;

        return (
          <div
            key={gIndex}
            className={`rounded-2xl border p-6 sm:p-8 shadow-xs transition-colors ${cardClasses}`}
          >
            {/* Group Header & Official Instructions */}
            <div className="border-b border-stone-200/70 pb-4 mb-6">
              {header !== 'default' && (
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#064E3B] dark:text-amber-300 mb-1">
                  {header}
                </h3>
              )}
              {firstQ?.groupInstruction && (
                <p className="text-xs sm:text-sm font-sans font-semibold text-amber-800 bg-amber-50/90 border border-amber-200 px-3 py-2 rounded-xl inline-block mt-1">
                  {firstQ.groupInstruction}
                </p>
              )}
            </div>

            {/* Reference Box for Matching Questions */}
            {isMatchingGroup && (
              <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#064E3B] block">
                  List of Findings / Options (A–E):
                </span>
                <div className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm font-sans">
                  {firstQ.options!.map((opt) => (
                    <div key={opt.id} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-[#064E3B] bg-white px-2 py-0.5 rounded border border-stone-200">
                        {opt.label}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-5">
              {questions.map((q) => {
                const isFlagged = reviewFlags.has(q.id);
                const isActive = activeQuestionNumber === q.number;
                const userAnswer = userAnswers[q.id] || '';
                const isCorrect = checkIsCorrect(q, userAnswer);
                const hasHighlights = Boolean(highlights[q.id]?.length);

                return (
                  <div
                    key={q.id}
                    id={`question-${q.number}`}
                    onMouseUp={(e) => handleMouseUp(q.id, e)}
                    className={`relative rounded-xl p-4 transition-all border-l-4 ${
                      isActive
                        ? 'border-l-[#D97706] bg-amber-50/30 ring-1 ring-amber-300/60'
                        : 'border-l-transparent hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Question Number Badge (for MCQ & Matching; Inline Blank already shows number inside input) */}
                        {q.type === 'multiple_choice' || q.type === 'matching' ? (
                          <div
                            onClick={() => onFocusQuestion?.(q.number)}
                            className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 cursor-pointer border ${
                              userAnswer
                                ? 'bg-[#064E3B] text-amber-300 border-[#064E3B]'
                                : 'bg-stone-100 text-stone-700 border-stone-300'
                            }`}
                          >
                            {q.number}
                          </div>
                        ) : null}

                        <div className="flex-1 min-w-0">
                          {q.type === 'multiple_choice'
                            ? renderMultipleChoice(q)
                            : q.type === 'matching'
                            ? renderMatching(q)
                            : renderInlineBlankQuestion(q)}

                          {/* Instant Answer Check Feedback (Practice Mode) */}
                          {showInstantAnswers && (
                            <div
                              className={`mt-3 p-3 rounded-xl border text-xs font-sans flex flex-col gap-1.5 animate-in fade-in duration-150 ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                  : 'bg-red-50 border-red-200 text-red-900'
                              }`}
                            >
                              <div className="flex items-center gap-2 font-bold">
                                {isCorrect ? (
                                  <>
                                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                                    <span>Chính xác! ({q.correctAnswer})</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle size={15} className="text-red-600 shrink-0" />
                                    <span>
                                      Đáp án đúng:{' '}
                                      <strong className="underline font-mono text-sm">
                                        {q.correctAnswer}
                                      </strong>
                                      {q.acceptableAnswers && q.acceptableAnswers.length > 0
                                        ? ` (Chấp nhận: ${q.acceptableAnswers.join(', ')})`
                                        : ''}
                                    </span>
                                  </>
                                )}
                              </div>
                              {q.explanation && (
                                <p className="text-stone-700 flex items-start gap-1.5 leading-relaxed">
                                  <HelpCircle size={13} className="text-amber-700 shrink-0 mt-0.5" />
                                  <span>{q.explanation}</span>
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Actions: Clear Highlight & Review Flag */}
                      <div className="flex items-center gap-1 shrink-0">
                        {hasHighlights && (
                          <button
                            type="button"
                            onClick={() => clearHighlightsForQuestion(q.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                            title="Xoá highlight câu này"
                          >
                            <Eraser size={15} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onToggleFlag(q.id)}
                          className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono ${
                            isFlagged
                              ? 'text-[#D97706] bg-amber-100/80 font-bold'
                              : 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                          }`}
                          title={isFlagged ? 'Bỏ đánh dấu Review' : 'Đánh dấu Review để kiểm tra lại'}
                        >
                          <Bookmark size={17} fill={isFlagged ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
