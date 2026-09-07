import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  RotateCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Shuffle,
  X,
} from 'lucide-react';
import { Flashcard, SrsRating, QuickWordLookup } from '../../types';
import { playSpeech, soundEffects, triggerConfetti } from '../../utils/audioUtils';
import { quickDictionary } from '../../data/englishMockData';
import { DURATION, EASE_OUT } from '../../styles/motion';

interface FlashcardPlayerProps {
  cards: Flashcard[];
  onEarnXp: (amount: number, reason: string) => void;
  onBackToDashboard?: () => void;
}

export const FlashcardPlayer: React.FC<FlashcardPlayerProps> = ({
  cards: initialCards,
  onEarnXp,
  onBackToDashboard,
}) => {
  const [deck, setDeck] = useState<Flashcard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<'us' | 'uk' | null>(null);

  // Quick Dictionary Popover State
  const [activeLookup, setActiveLookup] = useState<{
    word: QuickWordLookup;
    x: number;
    y: number;
  } | null>(null);

  // Deck completion state
  const [isDeckFinished, setIsDeckFinished] = useState<boolean>(false);
  const [masteredCount, setMasteredCount] = useState<number>(0);

  const currentCard = deck[currentIndex] || deck[0];

  // Flip handler with sound
  const handleFlip = useCallback(() => {
    soundEffects.playClick();
    setIsFlipped((prev) => !prev);
    setActiveLookup(null);
  }, []);

  // Audio speech playback
  const handleSpeak = async (
    e: React.MouseEvent,
    text: string,
    lang: 'en-US' | 'en-GB'
  ) => {
    e.stopPropagation();
    setIsPlayingAudio(lang === 'en-US' ? 'us' : 'uk');
    await playSpeech(text, lang);
    setIsPlayingAudio(null);
  };

  // SRS Rating response
  const handleSrsRate = (rating: SrsRating) => {
    soundEffects.playPop();

    let xpGained = 10;
    let feedback = 'Tiếp tục luyện tập!';
    if (rating === 'again') {
      xpGained = 5;
      feedback = 'Sẽ ôn lại thẻ này sớm!';
    } else if (rating === 'hard') {
      xpGained = 10;
      feedback = 'Khá tốt! Lặp lại sau 10 phút.';
    } else if (rating === 'good') {
      xpGained = 15;
      feedback = 'Rất tốt! Nhớ từ thành công.';
    } else if (rating === 'easy') {
      xpGained = 20;
      feedback = 'Tuyệt vời! Đã thuộc từ vựng này.';
      setMasteredCount((prev) => prev + 1);
    }

    onEarnXp(xpGained, `${feedback} (+${xpGained} XP)`);

    // Advance to next card
    if (currentIndex < deck.length - 1) {
      setIsFlipped(false);
      setActiveLookup(null);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsDeckFinished(true);
      triggerConfetti();
      soundEffects.playSuccess();
    }
  };

  // Restart deck
  const handleRestart = () => {
    setIsDeckFinished(false);
    setCurrentIndex(0);
    setIsFlipped(false);
    setActiveLookup(null);
  };

  // Shuffle deck
  const handleShuffle = () => {
    soundEffects.playClick();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setActiveLookup(null);
  };

  // Word click for Quick Popover
  const handleWordClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    rawWord: string
  ) => {
    e.stopPropagation();
    const clean = rawWord.toLowerCase().replace(/[^a-z]/g, '');
    const lookup =
      quickDictionary[clean] ||
      (clean === currentCard.word.toLowerCase()
        ? {
            word: currentCard.word,
            pos: currentCard.partOfSpeech,
            ipa: currentCard.ipaUk,
            meaningVi: currentCard.meaningVi,
            meaningEn: currentCard.meaningEn,
          }
        : {
            word: clean,
            pos: 'word',
            ipa: `/${clean}/`,
            meaningVi: 'Tra từ điển thông minh bằng giọng đọc bên dưới',
            meaningEn: `Contextual token: "${clean}"`,
          });

    const rect = e.currentTarget.getBoundingClientRect();
    setActiveLookup({
      word: lookup,
      x: Math.min(Math.max(16, rect.left), window.innerWidth - 300),
      y: rect.bottom + 8,
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDeckFinished) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === '1') {
        handleSrsRate('again');
      } else if (e.key === '2') {
        handleSrsRate('hard');
      } else if (e.key === '3') {
        handleSrsRate('good');
      } else if (e.key === '4') {
        handleSrsRate('easy');
      } else if (e.key === 'ArrowRight' && currentIndex < deck.length - 1) {
        setIsFlipped(false);
        setActiveLookup(null);
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setIsFlipped(false);
        setActiveLookup(null);
        setCurrentIndex((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, deck.length, isDeckFinished, handleFlip]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      {/* Header controls & stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary">
              SRS Spaced Repetition
            </span>
            <span className="text-xs text-slate-500 font-medium">
              IELTS Band 7.5+ Vocabulary Deck
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Thẻ Từ Vựng Thông Minh 3D
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            title="Xáo trộn thứ tự thẻ"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-500" />
            Xáo trộn
          </button>
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm text-xs font-semibold text-slate-700">
            Thẻ <span className="text-brand-primary">{currentIndex + 1}</span> / {deck.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-8 shadow-inner">
        <motion.div
          className="bg-brand-primary h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
          transition={{ duration: DURATION.component, ease: EASE_OUT }}
        />
      </div>

      {!isDeckFinished ? (
        <div className="flex flex-col items-center">
          {/* 3D Flip Card Container */}
          <div
            className="w-full max-w-2xl h-[440px] perspective-1000 cursor-pointer select-none"
            onClick={handleFlip}
          >
            <motion.div
              className="w-full h-full relative transform-style-3d shadow-xl rounded-2xl"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* FRONT OF CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Background decorative watermark */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50/50 rounded-full blur-2xl pointer-events-none" />

                {/* Card Top Row */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      {currentCard.partOfSpeech}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Streak: {currentCard.streak} ngày
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    Chạm thẻ để lật
                  </div>
                </div>

                {/* Card Middle: Image & Word */}
                <div className="my-auto text-center flex flex-col items-center z-10">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4 rounded-2xl overflow-hidden shadow-md border-2 border-white ring-2 ring-slate-100">
                    <img
                      src={currentCard.image}
                      alt={currentCard.word}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                    {currentCard.word}
                  </h2>

                  {/* Audio Buttons with Phonetic IPA */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    {/* UK Audio */}
                    <button
                      onClick={(e) => handleSpeak(e, currentCard.word, 'en-GB')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        isPlayingAudio === 'uk'
                          ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-red-700'
                      }`}
                      title="Phát âm giọng Anh - Anh (UK)"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="font-bold">UK</span>
                      <span className="font-ipa font-normal text-slate-600">
                        {currentCard.ipaUk}
                      </span>
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* US Audio */}
                    <button
                      onClick={(e) => handleSpeak(e, currentCard.word, 'en-US')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        isPlayingAudio === 'us'
                          ? 'bg-blue-50 text-brand-primary border-blue-300 ring-2 ring-blue-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-brand-primary'
                      }`}
                      title="Phát âm giọng Anh - Mỹ (US)"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="font-bold">US</span>
                      <span className="font-ipa font-normal text-slate-600">
                        {currentCard.ipaUs}
                      </span>
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Bottom Hint */}
                <div className="text-center text-xs text-slate-400 z-10">
                  Nhấn phím <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-600 font-mono">Space</kbd> hoặc click để xem định nghĩa & ví dụ
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-lg">
                {/* Header Back */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">
                      {currentCard.word}
                    </span>
                    <span className="font-ipa text-xs text-slate-500">
                      {currentCard.ipaUk}
                    </span>
                  </div>
                  <span className="text-xs text-brand-primary font-medium flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" /> Lật về mặt trước
                  </span>
                </div>

                {/* Meanings */}
                <div className="my-2 space-y-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Định nghĩa tiếng Anh
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      {currentCard.meaningEn}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-1">
                      Ý nghĩa & Ngữ cảnh tiếng Việt
                    </div>
                    <p className="text-sm font-semibold text-slate-900 bg-amber-50/70 border-l-4 border-amber-500 px-3 py-1.5 rounded-r">
                      {currentCard.meaningVi}
                    </p>
                  </div>

                  {/* Examples with clickable word lookup */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                      <span>Ví dụ song ngữ thực tế</span>
                      <span className="text-[11px] text-slate-400 normal-case">
                        (Nhấn vào từ bất kỳ để tra cứu nhanh)
                      </span>
                    </div>
                    <div className="space-y-2">
                      {currentCard.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                        >
                          <p className="text-slate-800 font-medium leading-relaxed">
                            {ex.en.split(' ').map((word, wIdx) => (
                              <span
                                key={wIdx}
                                onClick={(e) => handleWordClick(e, word)}
                                className="cursor-pointer hover:bg-blue-100 hover:text-brand-primary hover:underline rounded px-0.5 transition-colors"
                              >
                                {word}{' '}
                              </span>
                            ))}
                          </p>
                          <p className="text-slate-500 text-[11px] mt-1 italic">
                            {ex.vi}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Collocations */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Cụm từ thường gặp (Collocations)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentCard.collocations.map((col, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-indigo-50/80 text-indigo-700 border border-indigo-200/50 rounded-md text-[11px] font-medium"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer hint */}
                <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  Chọn mức độ nhớ bên dưới để hệ thống thuật toán SRS tính toán lịch ôn tập
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Dictionary Popover */}
          <AnimatePresence>
            {activeLookup && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed',
                  left: activeLookup.x,
                  top: activeLookup.y,
                  zIndex: 60,
                }}
                className="w-72 bg-slate-900 text-white rounded-xl shadow-2xl p-4 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">
                      {activeLookup.word.word}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 uppercase font-mono">
                      {activeLookup.word.pos}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveLookup(null)}
                    className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-ipa text-xs text-amber-300">
                    {activeLookup.word.ipa}
                  </span>
                  <button
                    onClick={(e) => handleSpeak(e, activeLookup.word.word, 'en-US')}
                    className="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white"
                    title="Phát âm từ"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-xs text-slate-200 font-medium mb-1">
                  {activeLookup.word.meaningVi}
                </p>
                {activeLookup.word.meaningEn && (
                  <p className="text-[11px] text-slate-400 italic">
                    {activeLookup.word.meaningEn}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spaced Repetition Feedback Action Bar */}
          <div className="w-full max-w-2xl mt-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-md">
            <div className="text-xs font-semibold text-slate-500 mb-3 flex items-center justify-between">
              <span>ĐÁNH GIÁ MỨC ĐỘ GHI NHỚ (SPACED REPETITION)</span>
              <span className="text-[11px] text-slate-400">
                Phím tắt: 1 - 2 - 3 - 4
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Again (Red) */}
              <button
                onClick={() => handleSrsRate('again')}
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-red-200 bg-red-50 hover:bg-red-100 text-red-800 hover:border-red-400 transition-all font-semibold active:scale-95"
              >
                <span className="text-sm font-bold flex items-center gap-1">
                  <span className="text-xs text-red-500 font-mono">1.</span> Again
                </span>
                <span className="text-[11px] text-red-600 font-normal mt-0.5">
                  Ôn lại ngay (&lt;1m)
                </span>
                <span className="text-[10px] text-red-500 mt-1 font-bold">+5 XP</span>
              </button>

              {/* Hard (Orange) */}
              <button
                onClick={() => handleSrsRate('hard')}
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 hover:border-amber-400 transition-all font-semibold active:scale-95"
              >
                <span className="text-sm font-bold flex items-center gap-1">
                  <span className="text-xs text-amber-500 font-mono">2.</span> Hard
                </span>
                <span className="text-[11px] text-amber-600 font-normal mt-0.5">
                  Khó nhớ (10m)
                </span>
                <span className="text-[10px] text-amber-600 mt-1 font-bold">+10 XP</span>
              </button>

              {/* Good (Blue) */}
              <button
                onClick={() => handleSrsRate('good')}
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-brand-primary hover:border-blue-400 transition-all font-semibold active:scale-95"
              >
                <span className="text-sm font-bold flex items-center gap-1">
                  <span className="text-xs text-blue-500 font-mono">3.</span> Good
                </span>
                <span className="text-[11px] text-blue-600 font-normal mt-0.5">
                  Nhớ được (1 ngày)
                </span>
                <span className="text-[10px] text-blue-600 mt-1 font-bold">+15 XP</span>
              </button>

              {/* Easy (Green) */}
              <button
                onClick={() => handleSrsRate('easy')}
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 hover:border-emerald-400 transition-all font-semibold active:scale-95"
              >
                <span className="text-sm font-bold flex items-center gap-1">
                  <span className="text-xs text-emerald-500 font-mono">4.</span> Easy
                </span>
                <span className="text-[11px] text-emerald-600 font-normal mt-0.5">
                  Rất dễ (4 ngày)
                </span>
                <span className="text-[10px] text-emerald-600 mt-1 font-bold">+20 XP</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full max-w-2xl mt-4 px-2">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setIsFlipped(false);
                  setActiveLookup(null);
                  setCurrentIndex((prev) => prev - 1);
                }
              }}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                currentIndex === 0
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Thẻ trước
            </button>

            <button
              onClick={handleFlip}
              className="px-5 py-2 text-xs font-semibold text-brand-primary bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all"
            >
              {isFlipped ? 'Xem mặt trước' : 'Lật xem giải nghĩa'}
            </button>

            <button
              onClick={() => {
                if (currentIndex < deck.length - 1) {
                  setIsFlipped(false);
                  setActiveLookup(null);
                  setCurrentIndex((prev) => prev + 1);
                } else {
                  setIsDeckFinished(true);
                  triggerConfetti();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border bg-white text-slate-700 border-slate-200 hover:bg-slate-50 transition-all"
            >
              Thẻ sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completion Summary Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
            HOÀN THÀNH PHIÊN ÔN TẬP
          </span>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            Tuyệt Vời! Bạn Đã Ôn Xong Toàn Bộ Thẻ
          </h2>

          <p className="text-slate-600 text-sm max-w-md mx-auto mb-8">
            Hệ thống Spaced Repetition đã ghi nhận tiến độ ghi nhớ. Các từ cần củng cố sẽ xuất hiện trong phiên học tiếp theo.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-2xl font-extrabold text-slate-900">
                {deck.length}
              </div>
              <div className="text-xs text-slate-500 mt-1">Từ đã ôn</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="text-2xl font-extrabold text-emerald-600">
                {masteredCount}
              </div>
              <div className="text-xs text-emerald-700 mt-1">Ghi nhớ tốt</div>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="text-2xl font-extrabold text-amber-600">
                +120
              </div>
              <div className="text-xs text-amber-700 mt-1">XP Nhận được</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-lg shadow-blue-500/25 hover:bg-brand-primary-hover active:scale-95 transition-all text-sm"
            >
              <RotateCw className="w-4 h-4" />
              Ôn lại từ đầu
            </button>
            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 active:scale-95 transition-all text-sm"
              >
                Về trang chủ lộ trình
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
