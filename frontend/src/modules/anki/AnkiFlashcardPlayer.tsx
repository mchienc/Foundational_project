import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useAnki } from '../../context/AnkiContext';
import { AnkiCard, AnkiRating } from '../../types';
import { getButtonIntervalLabels } from '../../store/ankiStore';
import { AnkiCard3D } from './AnkiCard3D';

interface AnkiFlashcardPlayerProps {
  deckId?: string | null;
  onBackToWorkspace: () => void;
  onEarnXp?: (amount: number, reason: string) => void;
  onNotify?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const AnkiFlashcardPlayer: React.FC<AnkiFlashcardPlayerProps> = ({
  deckId,
  onBackToWorkspace,
  onEarnXp,
  onNotify,
}) => {
  const { cards, decks, rateCard, getDueCardsForDeck, getCardsForDeck } = useAnki();

  // Pick deck title
  const currentDeck = decks.find((d) => d.id === deckId);
  const deckTitle = currentDeck ? currentDeck.title : 'Tất Cả Thẻ Đến Hạn';

  // Session cards: prefer due cards for this deck; if none due, load all cards for practice
  const [studyCards, setStudyCards] = useState<AnkiCard[]>(() => {
    const due = getDueCardsForDeck(deckId || undefined);
    if (due.length > 0) return due;
    if (deckId) return getCardsForDeck(deckId);
    return cards;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [reviewedCount, setReviewedCount] = useState<number>(0);
  const [isSessionCompleted, setIsSessionCompleted] = useState<boolean>(false);
  const [ratingAction, setRatingAction] = useState<{ rating: AnkiRating; timestamp: number } | null>(null);

  const currentCard: AnkiCard | undefined = studyCards[currentIndex];

  // Calculate next interval labels for 4 SM-2 buttons
  const buttonLabels = currentCard ? getButtonIntervalLabels(currentCard) : null;

  // Keyboard shortcut listener: Space to flip, 1-4 to rate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSessionCompleted || !currentCard) return;

      // Space: Flip to answer
      if (e.code === 'Space') {
        e.preventDefault();
        if (!isFlipped) {
          setIsFlipped(true);
        }
        return;
      }

      // If flipped, handle ratings 1, 2, 3, 4
      if (isFlipped) {
        if (e.key === '1') {
          e.preventDefault();
          handleRate('again');
        } else if (e.key === '2') {
          e.preventDefault();
          handleRate('hard');
        } else if (e.key === '3') {
          e.preventDefault();
          handleRate('good');
        } else if (e.key === '4') {
          e.preventDefault();
          handleRate('easy');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentCard, isSessionCompleted]);

  const handleRate = (rating: AnkiRating) => {
    if (!currentCard) return;

    rateCard(currentCard.id, rating);
    setReviewedCount((prev) => prev + 1);

    // Kích hoạt animation Swipe trên thẻ 3D
    setRatingAction({ rating, timestamp: Date.now() });

    // Give feedback based on effort
    if (rating === 'good' || rating === 'easy') {
      onEarnXp?.(10, `Ghi nhớ tốt thẻ từ vựng Anki`);
    } else {
      onEarnXp?.(5, `Củng cố lại thẻ từ vựng Anki`);
    }
  };

  const handleSwipeComplete = () => {
    setRatingAction(null);
    if (currentIndex < studyCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setIsSessionCompleted(true);
      onEarnXp?.(30, 'Hoàn thành phiên ôn tập Anki!');
      onNotify?.('Xuất sắc! Bạn đã hoàn thành toàn bộ các thẻ trong phiên này.', 'success');
    }
  };

  const handleRestartSession = () => {
    const refreshed = deckId ? getCardsForDeck(deckId) : cards;
    setStudyCards(refreshed);
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewedCount(0);
    setIsSessionCompleted(false);
  };

  // When no cards exist at all
  if (!currentCard && !isSessionCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-[#064E3B]">
            Không có thẻ nào cần ôn tập lúc này!
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
            Tuyệt vời! Bạn đã hoàn thành toàn bộ mục tiêu Spaced Repetition hôm nay.
            Hãy tiếp tục luyện đọc và luyện nghe đề Cambridge để tích lũy thêm từ vựng mới.
          </p>
        </div>
        <button
          onClick={onBackToWorkspace}
          className="px-6 py-3 rounded-2xl bg-[#064E3B] text-amber-300 font-sans font-bold text-xs uppercase tracking-wide cursor-pointer hover:bg-[#022C22] transition-colors"
        >
          Trở về Bộ Bài Anki
        </button>
      </div>
    );
  }

  // When session is finished
  if (isSessionCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-3xl bg-[#064E3B] text-amber-300 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/20">
          <Sparkles size={36} className="animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-amber-700 tracking-normal">
            Phiên Ôn Tập Hoàn Thành
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#064E3B]">
            Bộ Nhớ Dài Hạn Đã Được Kích Hoạt!
          </h2>
          <p className="text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
            Bạn đã ôn tập thành công <strong>{reviewedCount} thẻ từ vựng</strong> theo thuật toán Anki SM-2.
            Các thẻ này đã được tự động tính toán chu kỳ giãn cách tiếp theo.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={onBackToWorkspace}
            className="px-6 py-3 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 font-sans font-bold text-xs uppercase tracking-wide cursor-pointer transition-colors shadow-xs"
          >
            Quay Về Sổ Tay Anki
          </button>

          <button
            onClick={handleRestartSession}
            className="px-5 py-3 rounded-2xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-sans font-semibold text-xs transition-colors cursor-pointer"
          >
            Ôn Luyện Lại Lần Nữa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 selection:bg-amber-400/40">
      {/* Top Navigation Toolbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-stone-300 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWorkspace}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Quay lại danh mục bộ bài"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span className="text-[10px] font-mono text-amber-800 font-bold uppercase tracking-normal">
                {deckTitle}
              </span>
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#064E3B]">
                Trình Học Thẻ Anki SM-2
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
            <span>{currentIndex + 1}</span>
            <span className="text-stone-400">/</span>
            <span>{studyCards.length}</span>
          </div>
        </div>
      </header>

      {/* Main Flashcard Viewport */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center space-y-6">
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            style={{ width: `${((currentIndex + 1) / studyCards.length) * 100}%` }}
            className="h-full bg-amber-500 transition-all duration-300 ease-out"
          />
        </div>

        {/* The 3D Flashcard Container */}
        <AnkiCard3D
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(true)}
          ratingAction={ratingAction}
          onActionComplete={handleSwipeComplete}
        />

        {/* 4 Anki SM-2 Action Buttons (Only visible when flipped) */}
        {isFlipped && buttonLabels && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* 1. Again */}
              <button
                type="button"
                onClick={() => handleRate('again')}
                className="p-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-sans text-center transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer flex flex-col items-center justify-center"
              >
                <span className="text-xs font-bold uppercase tracking-wider block">1. Again</span>
                <span className="text-[11px] font-mono opacity-90 block">
                  ({buttonLabels.again})
                </span>
              </button>

              {/* 2. Hard */}
              <button
                type="button"
                onClick={() => handleRate('hard')}
                className="p-3.5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-sans text-center transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer flex flex-col items-center justify-center"
              >
                <span className="text-xs font-bold uppercase tracking-wider block">2. Hard</span>
                <span className="text-[11px] font-mono opacity-90 block">
                  ({buttonLabels.hard})
                </span>
              </button>

              {/* 3. Good */}
              <button
                type="button"
                onClick={() => handleRate('good')}
                className="p-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-center transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer flex flex-col items-center justify-center"
              >
                <span className="text-xs font-bold uppercase tracking-wider block">3. Good</span>
                <span className="text-[11px] font-mono opacity-90 block">
                  ({buttonLabels.good})
                </span>
              </button>

              {/* 4. Easy */}
              <button
                type="button"
                onClick={() => handleRate('easy')}
                className="p-3.5 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white font-sans text-center transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer border border-emerald-800 flex flex-col items-center justify-center"
              >
                <span className="text-xs font-bold uppercase tracking-wider block">4. Easy</span>
                <span className="text-[11px] font-mono opacity-90 block">
                  ({buttonLabels.easy})
                </span>
              </button>
            </div>

            <p className="text-center text-[11px] font-mono text-stone-400">
              Phím tắt nhanh: <kbd className="font-bold text-stone-600">1</kbd> (Again),{' '}
              <kbd className="font-bold text-stone-600">2</kbd> (Hard),{' '}
              <kbd className="font-bold text-stone-600">3</kbd> (Good),{' '}
              <kbd className="font-bold text-stone-600">4</kbd> (Easy)
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

