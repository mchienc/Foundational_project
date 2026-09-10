import React, { useState, useRef } from 'react';
import { Bookmark, Check, X, Sparkles } from 'lucide-react';
import { AudioPlayButton } from './AudioPlayButton';
import { useAnki } from '../../context/AnkiContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SelectionPopoverProps {
  selectedText: string;
  contextSentence: string;
  source: string;
  position: { x: number; y: number };
  onClose: () => void;
  onNotify?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const SelectionPopover: React.FC<SelectionPopoverProps> = ({
  selectedText,
  contextSentence,
  source,
  position,
  onClose,
  onNotify,
}) => {
  const { addCardToPersonalDeck, isWordSavedInAnki } = useAnki();
  const [isSaved, setIsSaved] = useState<boolean>(() => isWordSavedInAnki(selectedText));
  const popoverRef = useRef<HTMLDivElement>(null);

  // Hiệu ứng mở popover đàn hồi mượt mà bằng GSAP
  useGSAP(
    () => {
      if (popoverRef.current) {
        gsap.fromTo(
          popoverRef.current,
          { scale: 0.9, autoAlpha: 0, y: 8 },
          { scale: 1, autoAlpha: 1, y: 0, duration: 0.25, ease: 'back.out(1.5)', force3D: true }
        );
      }
    },
    { scope: popoverRef }
  );

  const cleanWord = selectedText.trim().replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'“”]+|[.,/#!$%^&*;:{}=\-_`~()?"'“”]+$/g, '');

  const handleSaveToAnki = () => {
    const success = addCardToPersonalDeck({
      word: cleanWord,
      definitionVi: `Từ vựng học thuật tra cứu trong ${source}`,
      definitionEn: cleanWord,
      contextSentence: contextSentence || `... ${cleanWord} ...`,
      source,
    });

    if (success) {
      setIsSaved(true);
      onNotify?.(`Đã lưu "${cleanWord}" vào Deck Cá Nhân trong Anki Flashcard!`, 'success');
    } else {
      setIsSaved(true);
      onNotify?.(`"${cleanWord}" đã có sẵn trong Deck của bạn.`, 'info');
    }
  };

  return (
    <div
      ref={popoverRef}
      style={{
        position: 'fixed',
        left: `${Math.min(Math.max(position.x - 140, 16), window.innerWidth - 320)}px`,
        top: `${Math.max(position.y - 120, 70)}px`,
        zIndex: 50,
      }}
      className="w-72 bg-white rounded-2xl shadow-xl border border-stone-300 p-3.5 space-y-2.5 text-stone-900 will-change-transform"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-amber-800 font-mono font-bold uppercase">
          <Sparkles size={13} className="text-amber-600" />
          <span>Tra Cứu Nhanh</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Word & Pronounce */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="text-base font-bold font-sans text-[#064E3B] leading-tight">
            {cleanWord}
          </h4>
          <span className="text-[11px] font-mono text-stone-500">
            Học thuật Cambridge
          </span>
        </div>

        <AudioPlayButton text={cleanWord} variant="icon" />
      </div>

      {/* Context Sentence Preview */}
      {contextSentence && (
        <p className="text-[11px] font-serif text-stone-600 italic border-l-2 border-amber-500 pl-2 line-clamp-2 leading-relaxed bg-stone-50 py-1 rounded-r">
          "{contextSentence}"
        </p>
      )}

      {/* Action Button: Save to Anki */}
      <button
        onClick={handleSaveToAnki}
        disabled={isSaved}
        className={`w-full py-2 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
          isSaved
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
            : 'bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white border border-emerald-800 active:scale-95'
        }`}
      >
        {isSaved ? (
          <>
            <Check size={14} className="text-emerald-700" />
            <span>Đã lưu vào Deck Anki</span>
          </>
        ) : (
          <>
            <Bookmark size={14} className="text-amber-400" />
            <span>Lưu vào Deck Anki</span>
          </>
        )}
      </button>
    </div>
  );
};

