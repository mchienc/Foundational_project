import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  Volume2,
  ChevronLeft,
} from 'lucide-react';
import { SentenceBuilderItem, SentenceBuilderWord } from '../../types';
import { sampleSentenceBuilders } from '../../data/englishMockData';
import { playSpeech, soundEffects, triggerConfetti } from '../../utils/audioUtils';
import { englishApi } from '../../services/englishApi';

interface SentenceBuilderProps {
  onEarnXp: (amount: number, reason: string) => void;
  onBackToDashboard?: () => void;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  onEarnXp,
  onBackToDashboard,
}) => {
  const [exercises, setExercises] = useState<SentenceBuilderItem[]>(sampleSentenceBuilders);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentExercise = exercises[currentIndex] || sampleSentenceBuilders[0];

  // Selected words in tray
  const [trayWords, setTrayWords] = useState<SentenceBuilderWord[]>([]);
  // Remaining words in bank
  const [bankWords, setBankWords] = useState<SentenceBuilderWord[]>(
    currentExercise.shuffledWords
  );

  // Fetch exercises from MySQL API on mount
  useEffect(() => {
    let isMounted = true;
    englishApi.getSentenceBuilders()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setExercises(data);
          setBankWords(data[0].shuffledWords);
        }
      })
      .catch((err) => console.warn('Could not load sentence builders from MySQL:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Status: 'idle' | 'correct' | 'wrong'
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [shakeKey, setShakeKey] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Add word from bank to tray
  const handleSelectWord = (word: SentenceBuilderWord) => {
    soundEffects.playClick();
    setTrayWords((prev) => [...prev, word]);
    setBankWords((prev) => prev.filter((w) => w.id !== word.id));
    setStatus('idle');
  };

  // Remove word from tray back to bank
  const handleRemoveWord = (word: SentenceBuilderWord) => {
    soundEffects.playPop();
    setTrayWords((prev) => prev.filter((w) => w.id !== word.id));
    setBankWords((prev) => [...prev, word]);
    setStatus('idle');
  };

  // Clear tray
  const handleReset = () => {
    soundEffects.playClick();
    setTrayWords([]);
    setBankWords(currentExercise.shuffledWords);
    setStatus('idle');
    setShowHint(false);
  };

  // Check correctness
  const handleCheck = () => {
    const constructed = trayWords.map((w) => w.text).join(' ').trim();
    const target = currentExercise.correctWords.join(' ').trim();

    if (constructed.toLowerCase() === target.toLowerCase()) {
      setStatus('correct');
      soundEffects.playSuccess();
      triggerConfetti();
      playSpeech(target, 'en-US', 0.9);

      // Persist completed sentence exercise in MySQL via REST API
      if (currentExercise?.id) {
        englishApi.submitSentenceResult(currentExercise.id, currentExercise.points)
          .catch((err) => console.warn('Could not sync sentence builder with MySQL:', err));
      }

      onEarnXp(
        currentExercise.points,
        `Ghép câu chính xác "${currentExercise.grammarTopic}"`
      );
    } else {
      setStatus('wrong');
      soundEffects.playError();
      setShakeKey((prev) => prev + 1);
    }
  };

  // Next exercise
  const handleNext = () => {
    soundEffects.playClick();
    if (currentIndex < exercises.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setTrayWords([]);
      setBankWords(exercises[nextIdx].shuffledWords);
      setStatus('idle');
      setShowHint(false);
    } else {
      // Completed all
      setCurrentIndex(0);
      setTrayWords([]);
      setBankWords(exercises[0].shuffledWords);
      setStatus('idle');
      setShowHint(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              Grammar &amp; Sentence Architect
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Luyện phản xạ cấu trúc câu ngữ pháp
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Luyện Ngữ Pháp &amp; Ghép Câu (Sentence Builder)
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Quay lại
            </button>
          )}
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm">
            Câu hỏi: <span className="text-brand-primary">{currentIndex + 1}</span> / {exercises.length}
          </div>
        </div>
      </div>

      {/* Main Game Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
        {/* Topic Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {currentExercise.grammarTopic}
            </span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
            Câu {currentIndex + 1} / {exercises.length}
          </span>
        </div>

        <div className="p-6 sm:p-10">
          {/* Vietnamese Target Prompt */}
          <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Dịch nghĩa câu tiếng Việt mục tiêu:
            </div>
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
              "{currentExercise.targetSentenceVi}"
            </p>
          </div>

          {/* Sentence Answer Tray (Droppable / Clickable) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Khay ghép câu của bạn (Sentence Tray):
              </span>
              <span className="text-[11px] text-slate-400">
                (Nhấn vào từ trong khay để gỡ bỏ)
              </span>
            </div>

            {/* Tray Box with Shake Animation on Wrong, Scale Pop on Correct */}
            <motion.div
              key={shakeKey}
              animate={
                status === 'wrong'
                  ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                  : status === 'correct'
                  ? { scale: [1, 1.02, 1] }
                  : {}
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`min-h-[110px] p-4 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2 ${
                status === 'correct'
                  ? 'bg-emerald-50/70 border-emerald-500 ring-4 ring-emerald-100'
                  : status === 'wrong'
                  ? 'bg-rose-50/70 border-rose-500 ring-4 ring-rose-100'
                  : 'bg-slate-50 border-dashed border-slate-300'
              }`}
            >
              {trayWords.length === 0 ? (
                <div className="w-full text-center text-slate-400 text-xs py-6 italic select-none">
                  Chọn các từ vựng bên dưới theo đúng thứ tự ngữ pháp để ghép vào đây...
                </div>
              ) : (
                <AnimatePresence>
                  {trayWords.map((word) => (
                    <motion.button
                      key={word.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={() => handleRemoveWord(word)}
                      className={`px-3.5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5 ${
                        status === 'correct'
                          ? 'bg-emerald-600 text-white'
                          : status === 'wrong'
                          ? 'bg-rose-600 text-white'
                          : 'bg-brand-primary text-white hover:bg-brand-primary-hover'
                      }`}
                    >
                      {word.text}
                    </motion.button>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          </div>

          {/* Word Bank (Pill Chips) */}
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Ngân hàng từ vựng (Word Bank):
            </div>
            <div className="flex flex-wrap gap-2.5 min-h-[60px] p-4 bg-slate-100/70 rounded-2xl border border-slate-200">
              {bankWords.map((word) => (
                <motion.button
                  key={word.id}
                  layout
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectWord(word)}
                  className="px-4 py-2 bg-white text-slate-800 rounded-xl text-sm font-semibold border border-slate-200 shadow-sm hover:border-brand-primary hover:text-brand-primary hover:shadow-md transition-all cursor-pointer"
                >
                  {word.text}
                </motion.button>
              ))}

              {bankWords.length === 0 && (
                <div className="w-full text-center text-xs text-slate-400 py-2 select-none">
                  Tất cả các từ đã được đưa vào khay câu trả lời
                </div>
              )}
            </div>
          </div>

          {/* Explanation Banner when Verified */}
          <AnimatePresence>
            {status === 'correct' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 mb-6 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm text-emerald-900">
                      Chính xác hoàn hảo!
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      playSpeech(currentExercise.targetSentenceEn, 'en-US', 0.9)
                    }
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 hover:bg-emerald-100"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm
                  </button>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <span className="font-bold">Giải thích ngữ pháp: </span>
                  {currentExercise.explanationVi}
                </p>
              </motion.div>
            )}

            {status === 'wrong' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-900 mb-6 flex items-start justify-between gap-3 shadow-sm"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-rose-800">
                      Thứ tự các từ chưa hoàn toàn chính xác!
                    </div>
                    <div className="text-xs text-rose-700 mt-0.5">
                      Hãy chú ý vị trí của trợ động từ và chủ ngữ trong cấu trúc này.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-rose-300 hover:bg-rose-100"
                >
                  <Lightbulb className="w-3.5 h-3.5" /> Xem gợi ý
                </button>
              </motion.div>
            )}

            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 mb-6"
              >
                <span className="font-bold">Gợi ý từ đầu tiên:</span> Bắt đầu bằng từ "
                {currentExercise.correctWords[0]}".
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Làm lại từ đầu
            </button>

            <div className="flex items-center gap-3">
              {status === 'correct' ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md transition-all active:scale-95"
                >
                  Câu tiếp theo <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleCheck}
                  disabled={trayWords.length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover shadow-md disabled:opacity-50 transition-all active:scale-95"
                >
                  Kiểm tra đáp án
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
