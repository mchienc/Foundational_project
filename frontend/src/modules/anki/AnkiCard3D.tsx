// frontend/src/modules/anki/AnkiCard3D.tsx
// Component Thẻ Anki Flashcard 3D với GSAP: Lật 180 độ 3D, CSS Grid Tự Giãn Chiều Cao Tránh Trùng Chữ, Chuẩn Cloze Deletion & Back Extra

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnkiCard, AnkiRating } from '../../types';
import { AudioPlayButton } from '../../components/shared/AudioPlayButton';
import { Sparkles, Tag } from 'lucide-react';

export interface AnkiCard3DProps {
  card: AnkiCard;
  isFlipped: boolean;
  onFlip: () => void;
  ratingAction?: { rating: AnkiRating; timestamp: number } | null;
  onActionComplete?: () => void;
}

// 1. Phân tích & Render mặt trước (Ẩn cụm từ cần học, hiển thị chỗ trống kèm gợi ý tiếng Việt)
const renderFrontCloze = (rawText: string) => {
  if (!rawText) return null;

  const regex = /\{\{c\d+::(.*?)(?:::([^}]*))?\}\}/g;
  if (!regex.test(rawText)) {
    if (rawText.includes('[ ________ ]')) {
      const parts = rawText.split('[ ________ ]');
      return (
        <span>
          {parts.map((p, i) => (
            <React.Fragment key={i}>
              {p}
              {i < parts.length - 1 && (
                <span className="inline-block px-3 py-1 mx-1.5 rounded-xl bg-amber-100 text-amber-950 font-sans font-bold border-2 border-dashed border-amber-400 shadow-2xs">
                  [ . . . ]
                </span>
              )}
            </React.Fragment>
          ))}
        </span>
      );
    }
    return rawText;
  }

  regex.lastIndex = 0;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(rawText)) !== null) {
    if (match.index > lastIdx) {
      parts.push(rawText.substring(lastIdx, match.index));
    }
    const hint = match[2];
    parts.push(
      <span
        key={match.index}
        className="inline-flex items-baseline px-3 py-1 rounded-xl bg-amber-100 text-amber-950 font-sans font-bold border-2 border-dashed border-amber-400 mx-1.5 shadow-xs transition-all hover:bg-amber-200"
      >
        <span>[ ... ]</span>
        {hint && (
          <span className="ml-1.5 text-xs font-normal text-amber-900 italic">
            ({hint})
          </span>
        )}
      </span>
    );
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < rawText.length) {
    parts.push(rawText.substring(lastIdx));
  }

  return parts;
};

// 2. Phân tích & Render mặt sau (Làm nổi bật cụm từ đáp án hoàn chỉnh)
const renderBackRevealedSentence = (rawText: string, fullSentenceFallback: string) => {
  const textToParse = rawText || fullSentenceFallback;
  if (!textToParse) return null;

  const regex = /\{\{c\d+::(.*?)(?:::([^}]*))?\}\}/g;
  if (!regex.test(textToParse)) {
    return textToParse;
  }

  regex.lastIndex = 0;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(textToParse)) !== null) {
    if (match.index > lastIdx) {
      parts.push(textToParse.substring(lastIdx, match.index));
    }
    const answer = match[1];
    parts.push(
      <span
        key={match.index}
        className="inline-flex items-baseline px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-950 font-bold border border-emerald-300 underline decoration-emerald-600 decoration-2 underline-offset-2 mx-1 shadow-2xs"
      >
        {answer}
      </span>
    );
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < textToParse.length) {
    parts.push(textToParse.substring(lastIdx));
  }

  return parts;
};

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

  // Câu đọc tự nhiên sạch sẽ để phát âm (loại bỏ cú pháp cloze)
  const cleanSpokenSentence = (card.clozeSentence || card.fullSentence)
    .replace(/\{\{c\d+::(.*?)(?:::.*?)?\}\}/g, '$1')
    .replace(/\[ ________ \]/g, card.word);

  // 1. Quản lý xoay lật True 3D Flip bằng useGSAP
  useGSAP(
    () => {
      if (!flipperRef.current) return;

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
        duration: 0.5,
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
  }, [ratingAction, onActionComplete]);

  // 3. Hiệu ứng trượt vào trung tâm CHỈ KHI ĐỔI SANG THẺ MỚI (không kích hoạt lại khi lật thẻ)
  useEffect(() => {
    if (!flipperRef.current) return;

    gsap.fromTo(
      flipperRef.current,
      {
        scale: 0.95,
        autoAlpha: 0,
        x: 0,
        y: 0,
        rotateZ: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.28,
        ease: 'power2.out',
        force3D: true,
      }
    );
  }, [card.id]);

  return (
    <div
      ref={containerRef}
      className="w-full relative"
      style={{ perspective: 1200 }}
    >
      <div
        ref={flipperRef}
        className="w-full relative grid grid-cols-1 grid-rows-1"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {/* ================== MẶT TRƯỚC (FRONT FACE): CÂU ĐỤC LỖ CLOZE ================== */}
        <div
          className="col-start-1 row-start-1 w-full bg-white rounded-3xl border border-stone-300 shadow-md p-6 sm:p-8 flex flex-col justify-between space-y-6 min-h-[420px]"
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

          {/* Cloze Sentence Content (Chuẩn Anki Cloze) */}
          <div className="space-y-4 text-center my-auto py-2">
            <span className="text-xs font-sans font-bold text-amber-800 tracking-normal block">
              — Điền cụm từ học thuật còn thiếu vào chỗ trống —
            </span>

            <div className="text-lg sm:text-2xl font-serif text-stone-900 leading-relaxed max-w-2xl mx-auto">
              "{renderFrontCloze(card.clozeSentence || card.fullSentence)}"
            </div>

            <div className="pt-2">
              <AudioPlayButton
                text={cleanSpokenSentence}
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

        {/* ================== MẶT SAU (BACK FACE): ĐÁP ÁN & BACK EXTRA 9.0 ================== */}
        <div
          className="col-start-1 row-start-1 w-full bg-white rounded-3xl border-2 border-emerald-700/30 shadow-lg p-6 sm:p-7 flex flex-col justify-between space-y-4 min-h-[420px]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top Metadata */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
            <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold tracking-normal">
              Đáp Án Chuẩn Xác • Anki Cloze Band 9.0
            </span>
            <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
              {card.source}
            </span>
          </div>

          {/* Word, IPA & Audio */}
          <div className="space-y-3.5 my-auto">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#064E3B] tracking-tight">
                  {card.word}
                </h2>
                {card.pos && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold border border-stone-200">
                    {card.pos}
                  </span>
                )}
                <AudioPlayButton text={card.word} variant="icon" />
              </div>
              {card.ipa && (
                <span className="text-xs font-mono text-stone-500 font-ipa block">
                  {card.ipa}
                </span>
              )}
            </div>

            {/* Back Extra Phân Tích Súc Tích Band 9.0 */}
            {card.backExtra ? (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs sm:text-[13px] space-y-1 max-w-xl mx-auto text-left shadow-2xs">
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  [Back Extra • Phân Tích Học Thuật IELTS 9.0]
                </span>
                <div className="font-sans text-stone-800 whitespace-pre-line leading-relaxed font-medium">
                  {card.backExtra}
                </div>
              </div>
            ) : (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm space-y-1 max-w-lg mx-auto">
                <p className="font-sans font-bold text-amber-950 leading-snug">
                  {card.definitionVi}
                </p>
                {card.definitionEn && (
                  <p className="font-sans text-stone-600 italic leading-relaxed">
                    {card.definitionEn}
                  </p>
                )}
              </div>
            )}

            {/* Context Sentence with Answer Highlighted */}
            <div className="text-center text-xs sm:text-[13px] font-serif text-stone-800 leading-relaxed max-w-xl mx-auto bg-stone-50 p-3 rounded-xl border border-stone-200/70 shadow-2xs">
              "{renderBackRevealedSentence(card.clozeSentence, card.fullSentence)}"
            </div>

            {/* Tags */}
            {card.tags && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                <Tag size={12} className="text-stone-400" />
                {card.tags
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200"
                    >
                      #{t}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
