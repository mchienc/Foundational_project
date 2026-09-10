import { useRef } from 'react';
import { Bookmark, HelpCircle } from 'lucide-react';
import { useExamStore } from '../../store/useExamStore';
import { CambridgeReadingQuestion } from '../../types';

interface ExamQuestionsPanelProps {
  focusedQuestionNumber?: number | null;
}

export const ExamQuestionsPanel = ({
  focusedQuestionNumber,
}: ExamQuestionsPanelProps) => {
  const {
    passages,
    activePassageIndex,
    answers,
    setAnswer,
    flaggedQuestions,
    toggleFlag,
    contrastMode,
  } = useExamStore();

  const passage = passages[activePassageIndex];
  const questions = passage?.questions || [];
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const panelBg = isHighContrast
    ? 'bg-stone-950 text-yellow-300'
    : isInverted
    ? 'bg-[#03372b] text-slate-100'
    : 'bg-white text-stone-900';

  const cardBg = isHighContrast
    ? 'bg-black border-2 border-yellow-400/40'
    : isInverted
    ? 'bg-[#022C22] border border-emerald-700'
    : 'bg-[#FAFAF9] border border-stone-200 shadow-2xs';

  const renderQuestionInput = (q: CambridgeReadingQuestion) => {
    const currentVal = answers[q.number] || '';
    const qType = (q.type || '').toLowerCase();

    // 1. True / False / Not Given
    if (qType.includes('tfng') || qType.includes('true')) {
      const options = ['TRUE', 'FALSE', 'NOT GIVEN'];
      return (
        <div className="grid grid-cols-3 gap-2 pt-2">
          {options.map((opt) => {
            const isSelected = currentVal.toUpperCase() === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setAnswer(q.number, opt)}
                className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? isHighContrast
                      ? 'bg-yellow-400 text-black shadow-xs'
                      : isInverted
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-[#064E3B] text-white shadow-xs'
                    : isHighContrast
                    ? 'border border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10'
                    : isInverted
                    ? 'border border-emerald-700 text-emerald-200 hover:bg-emerald-800'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      );
    }

    // 2. Multiple Choice
    if (q.options && q.options.length > 0) {
      return (
        <div className="space-y-2 pt-2">
          {q.options.map((opt) => {
            const isSelected =
              currentVal.toUpperCase() === opt.label.toUpperCase() ||
              currentVal.toUpperCase() === opt.id.toUpperCase();

            return (
              <label
                key={opt.id || opt.label}
                onClick={() => setAnswer(q.number, opt.label)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm font-sans transition-all cursor-pointer ${
                  isSelected
                    ? isHighContrast
                      ? 'border-2 border-yellow-400 bg-yellow-400/20 text-yellow-300 font-semibold'
                      : isInverted
                      ? 'border-2 border-emerald-400 bg-emerald-800/60 text-white font-semibold'
                      : 'border-2 border-[#064E3B] bg-emerald-50/50 text-[#064E3B] font-semibold shadow-2xs'
                    : isHighContrast
                    ? 'border-yellow-400/30 hover:bg-stone-900 text-yellow-200'
                    : isInverted
                    ? 'border-emerald-800 hover:bg-emerald-900/40 text-slate-200'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5 ${
                    isSelected
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black'
                        : isInverted
                        ? 'bg-emerald-400 text-[#022C22]'
                        : 'bg-[#064E3B] text-white'
                      : isHighContrast
                      ? 'border border-yellow-400 text-yellow-400'
                      : isInverted
                      ? 'border border-emerald-600 text-emerald-300'
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

    // 3. Matching Information / Headings (Dropdown or Letters)
    if (qType.includes('matching')) {
      const paragraphLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      return (
        <div className="pt-2 space-y-2">
          <label className="text-[11px] font-mono opacity-80 block">
            Chọn đoạn văn phù hợp:
          </label>
          <div className="flex flex-wrap gap-2">
            {paragraphLetters.map((letter) => {
              const isSelected = currentVal.toUpperCase() === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setAnswer(q.number, letter)}
                  className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black shadow-xs'
                        : isInverted
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-[#064E3B] text-white shadow-xs'
                      : isHighContrast
                      ? 'border border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10'
                      : isInverted
                      ? 'border border-emerald-700 text-emerald-200 hover:bg-emerald-800'
                      : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // 4. Default: Summary Completion / Fill-in-the-blank (Text Input)
    return (
      <div className="pt-2 space-y-1.5">
        <label className="text-[11px] font-mono opacity-80 block">
          Nhập từ / cụm từ cần điền:
        </label>
        <div className="relative">
          <input
            type="text"
            value={currentVal}
            onChange={(e) => setAnswer(q.number, e.target.value)}
            placeholder="Type your answer here..."
            className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold border transition-all outline-none ${
              isHighContrast
                ? 'bg-black text-yellow-300 border-yellow-400 focus:ring-2 focus:ring-yellow-400 placeholder:text-stone-700'
                : isInverted
                ? 'bg-[#022C22] text-white border-emerald-600 focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-500'
                : 'bg-white text-stone-900 border-stone-300 focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] placeholder:text-stone-400'
            }`}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      data-lenis-prevent="true"
      className={`h-full w-full flex flex-col overflow-hidden font-sans min-h-0 ${panelBg}`}
    >
      {/* Questions Header */}
      <div
        className={`px-6 py-3 border-b shrink-0 flex items-center justify-between ${
          isHighContrast
            ? 'border-yellow-400/30 bg-stone-950'
            : isInverted
            ? 'border-emerald-700 bg-[#03372b]'
            : 'border-stone-200 bg-white shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-sm sm:text-base">
            Bảng Câu Hỏi (Questions Panel)
          </span>
          <span className="text-xs font-mono opacity-70">
            Passage {activePassageIndex + 1}
          </span>
        </div>

        <div className="text-xs font-mono opacity-80">
          {questions.length} câu hỏi
        </div>
      </div>

      {/* Questions Scrollable Area */}
      <div
        data-lenis-prevent="true"
        className="flex-1 overflow-y-auto min-h-0 px-6 py-6 space-y-6 overscroll-contain"
      >
        {/* Instructions Header Box */}
        {questions.length > 0 && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              isHighContrast
                ? 'bg-stone-900 border-yellow-400/40 text-yellow-200'
                : isInverted
                ? 'bg-emerald-950/70 border-emerald-700 text-slate-200'
                : 'bg-amber-50/70 border-amber-200/80 text-stone-800'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 uppercase font-mono text-[11px] text-amber-700 mb-1">
              <HelpCircle size={13} />
              <span>Hướng Dẫn Làm Bài (Instructions):</span>
            </div>
            <p>
              {questions[0]?.groupInstruction ||
                'Đọc kỹ các câu hỏi bên dưới và đoạn văn tương ứng. Chọn hoặc điền câu trả lời chính xác nhất. Nhấn vào biểu tượng cờ Review để đánh dấu kiểm tra lại trước khi nộp bài.'}
            </p>
          </div>
        )}

        {/* Question Items */}
        {questions.map((q) => {
          const isFlagged = flaggedQuestions.includes(q.number);
          const isAnswered = Boolean(answers[q.number]?.trim());
          const isFocused = focusedQuestionNumber === q.number;

          return (
            <div
              key={q.id || q.number}
              ref={(el) => {
                questionRefs.current[q.number] = el;
              }}
              id={`question-${q.number}`}
              className={`p-4 sm:p-5 rounded-2xl transition-all ${cardBg} ${
                isFocused
                  ? isHighContrast
                    ? 'ring-2 ring-yellow-400'
                    : isInverted
                    ? 'ring-2 ring-emerald-400'
                    : 'ring-2 ring-amber-500'
                  : ''
              } ${isFlagged ? 'border-amber-400 ring-1 ring-amber-400/50' : ''}`}
            >
              {/* Question Header & Review Toggle */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs ${
                      isAnswered
                        ? isHighContrast
                          ? 'bg-yellow-400 text-black'
                          : isInverted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#064E3B] text-white'
                        : isHighContrast
                        ? 'border border-yellow-400 text-yellow-400'
                        : isInverted
                        ? 'border border-emerald-600 text-emerald-300'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    Câu {q.number}
                  </span>

                  {q.referenceParagraph && (
                    <span className="text-[10px] font-mono opacity-70">
                      ({q.referenceParagraph})
                    </span>
                  )}
                </div>

                {/* Review Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleFlag(q.number)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isFlagged
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black font-bold'
                        : isInverted
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-amber-500 text-stone-950 font-bold shadow-2xs'
                      : isHighContrast
                      ? 'text-stone-500 hover:text-yellow-400'
                      : isInverted
                      ? 'text-emerald-400 hover:text-white'
                      : 'text-stone-400 hover:text-stone-800'
                  }`}
                  title={isFlagged ? 'Bỏ đánh dấu xem lại' : 'Đánh dấu xem lại'}
                >
                  <Bookmark
                    size={13}
                    className={isFlagged ? 'fill-current' : ''}
                  />
                  <span className="hidden sm:inline">
                    {isFlagged ? 'Flagged' : 'Review'}
                  </span>
                </button>
              </div>

              {/* Question Text */}
              <p className="font-serif text-sm sm:text-base leading-relaxed mb-3">
                {q.question}
              </p>

              {/* Question Form Input */}
              {renderQuestionInput(q)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
