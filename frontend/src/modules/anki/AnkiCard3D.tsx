// frontend/src/modules/anki/AnkiCard3D.tsx
// Component Thẻ Anki Flashcard 3D với GSAP: Lật 180 độ 3D, SRS Rating Swipe, 60FPS GPU Accelerated

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnkiCard, AnkiRating } from '../../types';
import { AudioPlayButton } from '../../components/shared/AudioPlayButton';
import { Sparkles } from 'lucide-react';

export interface AnkiCard3DProps {
  card: AnkiCard;
  isFlipped: boolean;
  onFlip: () => void;
  ratingAction?: { rating: AnkiRating; timestamp: number } | null;
  onActionComplete?: () => void;
}

export const AnkiCard3D: React.FC<AnkiCard3DProps> = ({
  card,
  isFlipped,
  onFlip,
  ratingAction,
  onActionComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef<boolean>(true);

  // 1. Quản lý xoay lật True 3D Flip bằng useGSAP
  useGSAP(
    () => {
      if (!flipperRef.current) return;

      // Không animate lật trong lần mount đầu tiên nếu thẻ chưa lật
      if (isInitialMount.current) {
        isInitialMount.current = false;
        gsap.set(flipperRef.current, {
          rotateY: isFlipped ? 180 : 0,
          transformStyle: 'preserve-3d',
          force3D: true,
        });
        return;
      }

      gsap.to(flipperRef.current, {
        rotateY: isFlipped ? 180 : 0,
        duration: 0.55,
        ease: 'power2.inOut',
        transformStyle: 'preserve-3d',
        force3D: true,
      });
    },
    { scope: containerRef, dependencies: [isFlipped] }
  );

  // 2. Hiệu ứng đánh giá độ nhớ SRS Swipe (Easy/Good/Again/Hard)
  useEffect(() => {
    if (!ratingAction || !flipperRef.current) return;

    const { rating } = ratingAction;
    const cardEl = flipperRef.current;

    if (rating === 'easy' || rating === 'good') {
      // Swipe phải và bay nhẹ lên trên
      gsap.to(cardEl, {
        x: 120,
        y: -25,
        rotateZ: 6,
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power2.inOut',
        force3D: true,
        onComplete: () => {
          onActionComplete?.();
        },
      });
    } else if (rating === 'again') {
      // Rung lắc ngang phản hồi lỗi rồi trượt xuống đáy
      const tl = gsap.timeline({
        onComplete: () => {
          onActionComplete?.();
        },
      });

      tl.to(cardEl, {
        x: 8,
        duration: 0.05,
        repeat: 4,
        yoyo: true,
        ease: 'power1.inOut',
        force3D: true,
      }).to(cardEl, {
        y: 60,
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
        force3D: true,
      });
    } else if (rating === 'hard') {
      // Trượt nhẹ sang trái
      gsap.to(cardEl, {
        x: -100,
        y: 15,
        rotateZ: -5,
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power2.inOut',
        force3D: true,
        onComplete: () => {
          onActionComplete?.();
        },
      });
    }
  }, [ratingAction]);

  // 3. Hiệu ứng trượt vào trung tâm khi đổi thẻ bài mới
  useEffect(() => {
    if (!flipperRef.current) return;

    gsap.fromTo(
      flipperRef.current,
      {
        scale: 0.94,
        autoAlpha: 0,
        x: 0,
        y: 0,
        rotateZ: 0,
        rotateY: isFlipped ? 180 : 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      }
    );
  }, [card.id]);

  return (
    <div
      ref={containerRef}
      className="w-full relative min-h-[420px]"
      style={{ perspective: 1000 }}
    >
      <div
        ref={flipperRef}
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {/* ================== MẶT TRƯỚC (FRONT FACE): CÂU ĐỤC LỖ ================== */}
        <div
          className="w-full h-full bg-white rounded-3xl border border-stone-300 shadow-md p-6 sm:p-10 flex flex-col justify-between space-y-6 min-h-[420px]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Top Metadata */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <span className="text-[10px] font-mono text-stone-400 uppercase font-bold tracking-normal">
              Trích từ: {card.source}
            </span>

            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                card.status === 'mastered'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : card.status === 'review'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              Cấp độ: {card.status}
            </span>
          </div>

          {/* Cloze Sentence Content */}
          <div className="space-y-4 text-center my-auto">
            <span className="text-xs font-sans font-bold text-amber-800 tracking-normal block">
              — Điền từ còn thiếu vào chỗ trống —
            </span>

            <p className="text-lg sm:text-2xl font-serif text-stone-900 leading-relaxed max-w-xl mx-auto">
              "{card.clozeSentence}"
            </p>

            <div className="pt-2">
              <AudioPlayButton
                text={card.fullSentence}
                variant="pill"
                label="Nghe câu mẫu"
                className="mx-auto"
              />
            </div>
          </div>

          {/* Button Flip to Answer */}
          <div className="pt-4 flex flex-col items-center gap-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onFlip}
              className="w-full sm:w-64 py-3 px-4 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95 border border-emerald-800"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>Hiện Đáp Án (Space)</span>
            </button>
            <span className="text-[11px] font-mono text-stone-400">
              Nhấn phím cách (Space) để lật thẻ 3D
            </span>
          </div>
        </div>

        {/* ================== MẶT SAU (BACK FACE): ĐÁP ÁN & ĐỊNH NGHĨA ================== */}
        <div
          className="w-full h-full bg-white rounded-3xl border-2 border-emerald-700/30 shadow-lg p-6 sm:p-10 flex flex-col justify-between space-y-6 absolute inset-0 min-h-[420px]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top Metadata */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold tracking-normal">
              Đáp Án Chuẩn Xác • Cambridge IELTS
            </span>
            <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
              {card.source}
            </span>
          </div>

          {/* Word, IPA & Audio */}
          <div className="space-y-4 my-auto">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#064E3B] tracking-tight">
                  {card.word}
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold border border-stone-200">
                  {card.pos}
                </span>
                <AudioPlayButton text={card.word} variant="icon" />
              </div>
              <span className="text-sm font-mono text-stone-500 font-ipa block">
                {card.ipa}
              </span>
            </div>

            {/* Definitions */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm space-y-2 max-w-lg mx-auto">
              <p className="font-sans font-bold text-amber-950 leading-snug">
                {card.definitionVi}
              </p>
              <p className="font-sans text-stone-600 italic leading-relaxed">
                {card.definitionEn}
              </p>
            </div>

            {/* Context Sentence with Highlighted Word */}
            <p className="text-center text-xs sm:text-sm font-serif text-stone-700 italic max-w-lg mx-auto bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
              "{card.fullSentence}"
            </p>
          </div>

          {/* Prompt at bottom of back face */}
          <div className="pt-3 border-t border-stone-100 text-center">
            <span className="text-[11px] font-mono text-stone-500">
              Chọn mức độ ghi nhớ (1-4) bên dưới để thuật toán SM-2 lên lịch ôn tập
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
