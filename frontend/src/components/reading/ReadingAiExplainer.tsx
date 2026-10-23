import React, { useState } from 'react';
import {
  BookOpen,
  Target,
  ArrowRight,
  AlertTriangle,
  BookmarkPlus,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import {
  fetchReadingQuestionAiExplanation,
  ReadingAiExplainResponse,
} from '../../services/cambridgeApi';
import { useAnki } from '../../context/AnkiContext';

interface ReadingAiExplainerProps {
  passageTitle: string;
  paragraphLetter?: string;
  paragraphText: string;
  questionNumber: number;
  questionType: string;
  questionText: string;
  options?: Array<{ id?: string; label?: string; text: string }>;
  userAnswer?: string;
  correctAnswer: string;
  explanation?: string;
  onLocateEvidence?: (quote: string, letter: string) => void;
  onNotify?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ReadingAiExplainer: React.FC<ReadingAiExplainerProps> = ({
  passageTitle,
  paragraphLetter = 'A',
  paragraphText,
  questionNumber,
  questionType,
  questionText,
  options,
  userAnswer,
  correctAnswer,
  explanation,
  onLocateEvidence,
  onNotify,
}) => {
  const { addCardToPersonalDeck, isWordSavedInAnki } = useAnki();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiData, setAiData] = useState<ReadingAiExplainResponse | null>(null);
  const [sourceTag, setSourceTag] = useState<string>('');
  const [isSavedAnki, setIsSavedAnki] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const handleFetchExplanation = async () => {
    if (aiData) {
      setIsOpen((prev) => !prev);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    try {
      const res = await fetchReadingQuestionAiExplanation({
        passageTitle,
        paragraphLetter,
        paragraphText,
        questionNumber,
        questionType,
        questionText,
        options,
        userAnswer,
        correctAnswer,
        explanation,
      });

      if (res.success && res.data) {
        setAiData(res.data);
        setSourceTag(res.source || 'AI Giải Thích');
        if (res.data.keyVocabulary?.collocation) {
          setIsSavedAnki(isWordSavedInAnki(res.data.keyVocabulary.collocation));
        }
      } else {
        onNotify?.(res.message || 'Không thể lấy phân tích AI lúc này.', 'error');
      }
    } catch (err: any) {
      console.error('Error fetching AI explanation:', err);
      onNotify?.('Lỗi kết nối khi gọi AI.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocateClick = () => {
    if (!aiData) return;
    const letter = aiData.paragraphLetter || paragraphLetter || 'A';
    const quote = aiData.evidenceQuote || '';
    setIsLocating(true);
    onLocateEvidence?.(quote, letter);
    onNotify?.(`Đã định vị dẫn chứng tại Đoạn [${letter}] trên bài đọc!`, 'success');
    setTimeout(() => setIsLocating(false), 2000);
  };

  const handleSaveToAnki = () => {
    if (!aiData?.keyVocabulary) return;
    const { collocation, vietnameseHint, clozeSentence } = aiData.keyVocabulary;

    const success = addCardToPersonalDeck({
      word: collocation,
      definitionVi: vietnameseHint || 'Từ vựng trích xuất từ câu dẫn chứng IELTS Reading',
      contextSentence: aiData.evidenceQuote || paragraphText.slice(0, 150),
      customCloze: clozeSentence,
      source: `Reading Q${questionNumber} (${passageTitle})`,
      tags: `Reading_Evidence Cambridge_9.0`,
    });

    if (success) {
      setIsSavedAnki(true);
      onNotify?.(`Đã lưu "${collocation}" vào Flashcard!`, 'success');
    } else {
      setIsSavedAnki(true);
      onNotify?.(`"${collocation}" đã có trong danh sách Flashcard.`, 'info');
    }
  };

  return (
    <div className="mt-2.5 rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/30 overflow-hidden shadow-xs transition-all">
      {/* Trigger Header Button */}
      <button
        type="button"
        onClick={handleFetchExplanation}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-amber-100/40 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <BookOpen size={15} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-sans text-stone-900">
                AI Giải Thích &amp; Định Vị Dẫn Chứng
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200/80 text-amber-900 border border-amber-300">
                AI
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-sans">
              Giải thích chi tiết câu hỏi &amp; định vị dẫn chứng trong bài đọc
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-stone-500 text-xs">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-4 pt-1 border-t border-amber-200/60 space-y-4">
          {isLoading && (
            <div className="py-6 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 size={24} className="animate-spin text-amber-600" />
              <div className="space-y-1">
                <p className="text-xs font-bold font-sans text-stone-800">
                  Gemini AI đang bóc tách bẫy đề và đối chiếu đoạn văn...
                </p>
                <p className="text-[11px] text-stone-500 font-sans">
                  Trích xuất câu chứa bằng chứng, phân tích paraphrase và tư duy giải đề
                </p>
              </div>
            </div>
          )}

          {!isLoading && aiData && (
            <>
              {/* Source Badge */}
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pb-1">
                <span className="flex items-center gap-1 text-emerald-800 font-medium">
                  <BookOpen size={12} /> Nguồn: {sourceTag}
                </span>
                <span className="bg-emerald-100 text-[#064E3B] px-2 py-0.5 rounded-md font-bold">
                  Đoạn [{aiData.paragraphLetter || paragraphLetter}]
                </span>
              </div>

              {/* 1. Evidence Quote & Fast Locator Button */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-300 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1">
                    <Target size={13} className="text-amber-700" /> Câu Dẫn Chứng Xác Thực:
                  </span>
                  <button
                    type="button"
                    onClick={handleLocateClick}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                      isLocating
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-2xs'
                    }`}
                  >
                    <Target size={12} />
                    <span>{isLocating ? 'Đã định vị!' : `Định vị đoạn [${aiData.paragraphLetter || paragraphLetter}]`}</span>
                  </button>
                </div>
                <blockquote className="text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed pl-3 border-l-2 border-amber-600 bg-white/70 py-1.5 rounded-r">
                  "{aiData.evidenceQuote}"
                </blockquote>
              </div>

              {/* 2. Paraphrase Matching Table */}
              {aiData.paraphraseAnalysis && aiData.paraphraseAnalysis.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600 block">
                    Bẫy Paraphrase Cambridge (Từ khóa ↔ Bài đọc):
                  </span>
                  <div className="rounded-xl border border-stone-200 overflow-hidden bg-white text-xs divide-y divide-stone-100">
                    {aiData.paraphraseAnalysis.map((item, idx) => (
                      <div key={idx} className="p-2.5 flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className="flex-1 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-mono font-bold text-[11px]">
                            {item.questionKeyword}
                          </span>
                          <ArrowRight size={13} className="text-stone-400 shrink-0" />
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono font-bold text-[11px]">
                            {item.passageMatch}
                          </span>
                        </div>
                        {item.note && (
                          <div className="text-[11px] font-sans text-stone-600 italic">
                            ({item.note})
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Core Reason */}
              <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                  <Check size={13} className="text-emerald-700" /> Tư Duy Chọn Đáp Án:
                </span>
                <p className="text-xs font-sans text-stone-800 leading-relaxed">
                  {aiData.coreReason}
                </p>
              </div>

              {/* 4. Trap Explanation */}
              {aiData.trapExplanation && (
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1">
                    <AlertTriangle size={13} className="text-rose-600" /> Giải Mã Bẫy Đề Cambridge:
                  </span>
                  <p className="text-xs font-sans text-stone-800 leading-relaxed">
                    {aiData.trapExplanation}
                  </p>
                </div>
              )}

              {/* 5. 1-Click Anki Cloze Card from Evidence */}
              {aiData.keyVocabulary && aiData.keyVocabulary.collocation && (
                <div className="p-3 rounded-xl bg-emerald-950 text-white space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                      <BookOpen size={12} /> Thẻ Anki Từ Cụm Dẫn Chứng:
                    </span>
                    <button
                      type="button"
                      onClick={handleSaveToAnki}
                      disabled={isSavedAnki}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                        isSavedAnki
                          ? 'bg-emerald-800 text-emerald-200 cursor-default'
                          : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-xs'
                      }`}
                    >
                      {isSavedAnki ? <Check size={12} /> : <BookmarkPlus size={12} />}
                      <span>{isSavedAnki ? 'Đã lưu trong Anki' : 'Lưu thẻ Anki 3D'}</span>
                    </button>
                  </div>

                  <div className="text-xs font-sans space-y-1 bg-white/10 p-2.5 rounded-lg border border-white/10">
                    <div className="flex items-baseline gap-2">
                      <strong className="text-amber-300 font-mono text-sm">
                        {aiData.keyVocabulary.collocation}
                      </strong>
                      <span className="text-[11px] text-emerald-200 italic">
                        {aiData.keyVocabulary.vietnameseHint}
                      </span>
                    </div>
                    {aiData.keyVocabulary.clozeSentence && (
                      <p className="text-[11px] font-mono text-stone-200/90 pt-1">
                        Format Cloze: <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-200">{aiData.keyVocabulary.clozeSentence}</code>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
