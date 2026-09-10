import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface DiffViewerProps {
  userInput: string;
  targetSentence: string;
  showFeedback: boolean;
  className?: string;
  onAccuracyCalculated?: (accuracy: number) => void;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  userInput,
  targetSentence,
  showFeedback,
  className = '',
  onAccuracyCalculated,
}) => {
  // Normalize punctuation for comparison while preserving original text
  const cleanWord = (w: string) =>
    w.toLowerCase().replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'“”]+|[.,/#!$%^&*;:{}=\-_`~()?"'“”]+$/g, '');

  const targetTokens = targetSentence.trim().split(/\s+/);
  const userTokens = userInput.trim() ? userInput.trim().split(/\s+/) : [];

  let correctCount = 0;

  const comparison = targetTokens.map((targetWord, index) => {
    const userWord = userTokens[index] || '';
    const isPresent = Boolean(userWord);
    const isMatch = isPresent && cleanWord(userWord) === cleanWord(targetWord);

    if (isMatch) {
      correctCount += 1;
    }

    return {
      index,
      targetWord,
      userWord,
      isPresent,
      isMatch,
    };
  });

  const accuracy = targetTokens.length > 0 ? Math.round((correctCount / targetTokens.length) * 100) : 0;

  React.useEffect(() => {
    if (showFeedback && onAccuracyCalculated) {
      onAccuracyCalculated(accuracy);
    }
  }, [accuracy, showFeedback, onAccuracyCalculated]);

  if (!showFeedback) {
    return null;
  }

  return (
    <div className={`p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3 ${className}`}>
      {/* Accuracy Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
        <div className="flex items-center gap-2">
          {accuracy === 100 ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 font-sans">
              <CheckCircle2 size={16} className="text-emerald-600" />
              Chính xác tuyệt đối 100%!
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 font-sans">
              <AlertCircle size={16} className="text-amber-600" />
              Độ chính xác: {accuracy}% ({correctCount}/{targetTokens.length} từ)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="inline-flex items-center gap-1 text-[#064E3B] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" /> Từ đúng
          </span>
          <span className="inline-flex items-center gap-1 text-[#DC2626] font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Từ sai/thiếu
          </span>
        </div>
      </div>

      {/* Word-by-word visual comparison */}
      <div className="flex flex-wrap items-baseline gap-2 py-1 leading-relaxed text-sm">
        {comparison.map((item) => {
          if (!item.isPresent) {
            // Missing word
            return (
              <span
                key={item.index}
                className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-400 border border-dashed border-stone-300 font-sans text-xs"
                title={`Từ còn thiếu: ${item.targetWord}`}
              >
                [ {item.targetWord} ]
              </span>
            );
          }

          if (item.isMatch) {
            // Correct word: Deep Forest #064E3B
            return (
              <span
                key={item.index}
                className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#064E3B] font-bold border border-emerald-300/80 shadow-2xs font-sans"
              >
                {item.targetWord}
              </span>
            );
          }

          // Incorrect word: Red #DC2626 with correction
          return (
            <span
              key={item.index}
              className="inline-flex flex-col items-center px-2 py-0.5 rounded-md bg-red-50 border border-red-200 text-xs font-sans"
            >
              <span className="text-[#DC2626] line-through font-medium">{item.userWord}</span>
              <span className="text-[#064E3B] font-bold text-[11px]">➔ {item.targetWord}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

