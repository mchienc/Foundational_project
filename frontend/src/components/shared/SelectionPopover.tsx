import React, { useState, useRef } from 'react';
import {
  Highlighter,
  StickyNote,
  BookmarkPlus,
  BookOpen,
  X,
  Sparkles,
  Loader2,
  Check,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import { AudioPlayButton } from './AudioPlayButton';
import { useAnki } from '../../context/AnkiContext';
import { useVocabularyVault } from '../../context/VocabularyVaultContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SelectionPopoverProps {
  selectedText: string;
  contextSentence: string;
  source: string;
  position: { x: number; y: number };
  onClose: () => void;
  onNotify?: (message: string, type?: 'success' | 'info' | 'error') => void;
  onHighlight?: (text: string) => void;
  onAddNote?: (text: string, note: string) => void;
  isHighlighted?: boolean;
}

interface LookupResult {
  ipa: string;
  pos: string;
  definitionEn: string;
  definitionVi: string;
}

export const SelectionPopover: React.FC<SelectionPopoverProps> = ({
  selectedText,
  contextSentence,
  source,
  position,
  onClose,
  onNotify,
  onHighlight,
  onAddNote,
  isHighlighted = false,
}) => {
  const { addCardToPersonalDeck, isWordSavedInAnki } = useAnki();
  const { saveAiGeneratedWord } = useVocabularyVault();

  const cleanWord = selectedText
    .trim()
    .replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'“”]+|[.,/#!$%^&*;:{}=\-_`~()?"'“”]+$/g, '');

  // Modes: 'toolbar' (compact bar) | 'note' (input note) | 'dictionary' (full lookup)
  const [mode, setMode] = useState<'toolbar' | 'note' | 'dictionary'>('toolbar');

  // Note state
  const [noteContent, setNoteContent] = useState<string>('');

  // Dictionary state (lazy-loaded ONLY when user clicks 'Tra nghĩa')
  const [lookup, setLookup] = useState<LookupResult>({
    ipa: '',
    pos: 'vocab',
    definitionEn: '',
    definitionVi: '',
  });
  const [isLoadingDict, setIsLoadingDict] = useState<boolean>(false);
  const [hasLoadedDict, setHasLoadedDict] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(() => isWordSavedInAnki(cleanWord));
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState<boolean>(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (popoverRef.current) {
        gsap.fromTo(
          popoverRef.current,
          { scale: 0.94, autoAlpha: 0, y: 6 },
          { scale: 1, autoAlpha: 1, y: 0, duration: 0.18, ease: 'power2.out', force3D: true }
        );
      }
    },
    { scope: popoverRef, dependencies: [mode] }
  );

  // Lazy dictionary fetch với Backend Gemini AI + Google Translate GTX dự phòng
  const triggerDictionaryLookup = async () => {
    if (hasLoadedDict || !cleanWord) return;

    setIsLoadingDict(true);

    try {
      // 1. Gọi Backend API Gemini AI 9.0 để phân tích sâu nghĩa học thuật, IPA, POS
      const res = await fetch('/api/anki/lookup-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: cleanWord,
          contextSentence,
          source,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json?.success && json?.data) {
          setLookup({
            ipa: json.data.ipa || `/${cleanWord}/`,
            pos: json.data.pos || 'vocab',
            definitionVi: json.data.definitionVi || `Từ vựng trong ${source}`,
            definitionEn: json.data.definitionEn || `Academic term in ${source}.`,
          });
          setIsLoadingDict(false);
          setHasLoadedDict(true);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend lookup failed, using client fallback:', err);
    }

    // 2. Client-side Fallback: Google Translate GTX siêu tốc trực tiếp từ trình duyệt
    try {
      const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(cleanWord)}`;
      const gtxRes = await fetch(gtxUrl);
      if (gtxRes.ok) {
        const gtxData = await gtxRes.json();
        const translated = gtxData?.[0]?.[0]?.[0];
        if (translated) {
          setLookup({
            ipa: `/${cleanWord}/`,
            pos: 'vocab',
            definitionVi: translated,
            definitionEn: `Academic term in ${source}.`,
          });
          setIsLoadingDict(false);
          setHasLoadedDict(true);
          return;
        }
      }
    } catch (e) {
      console.warn('Client GTX fallback failed:', e);
    }

    setIsLoadingDict(false);
    setHasLoadedDict(true);
  };

  const handleOpenDictionary = () => {
    setMode('dictionary');
    triggerDictionaryLookup();
  };

  const handleDirectSaveToAnki = () => {
    const success = addCardToPersonalDeck({
      word: cleanWord,
      definitionVi: lookup.definitionVi || `Từ vựng trích xuất từ bài đọc ${source}`,
      definitionEn: lookup.definitionEn || cleanWord,
      contextSentence: contextSentence || `... ${cleanWord} ...`,
      source,
    });

    if (success) {
      setIsSaved(true);
      onNotify?.(`Đã lưu "${cleanWord}" vào bộ thẻ Anki cá nhân!`, 'success');
    } else {
      setIsSaved(true);
      onNotify?.(`"${cleanWord}" đã có sẵn trong bộ thẻ Anki.`, 'info');
    }
    onClose();
  };

  const handleHighlightClick = () => {
    onHighlight?.(cleanWord);
    window.getSelection()?.removeAllRanges();
    onClose();
  };

  const handleSaveNote = () => {
    if (noteContent.trim()) {
      onAddNote?.(cleanWord, noteContent.trim());
      onNotify?.(`Đã lưu ghi chú cho "${cleanWord}"!`, 'success');
    }
    window.getSelection()?.removeAllRanges();
    onClose();
  };

  const handleGenerateAiCloze = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/anki/generate-cloze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: cleanWord,
          sentence: contextSentence,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.success && data?.data) {
        saveAiGeneratedWord({
          word: cleanWord,
          clozeText: data.data.text,
          backExtra: data.data.backExtra,
          tags: data.data.tags,
          contextSentence,
          sourceArticleTitle: source,
          ipa: lookup.ipa,
          pos: lookup.pos,
          contextMeaning: lookup.definitionVi,
        });

        addCardToPersonalDeck({
          word: cleanWord,
          ipa: lookup.ipa,
          pos: lookup.pos,
          definitionVi: lookup.definitionVi,
          definitionEn: lookup.definitionEn,
          contextSentence,
          source,
          customCloze: data.data.text,
          backExtra: data.data.backExtra,
          tags: data.data.tags,
        });

        setIsSaved(true);
        setAiGeneratedSuccess(true);
        onNotify?.(`✨ Đã tạo thẻ Anki Cloze 9.0 cho "${cleanWord}" bằng Gemini AI!`, 'success');
      } else {
        handleDirectSaveToAnki();
      }
    } catch {
      handleDirectSaveToAnki();
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Pos styling
  let popoverTop = position.y - 52;
  let popoverLeft = position.x - 190;
  let popoverWidth = 380;

  if (mode === 'note') {
    popoverTop = position.y - 170;
    popoverLeft = position.x - 160;
    popoverWidth = 320;
  } else if (mode === 'dictionary') {
    popoverTop = position.y - 320;
    popoverLeft = position.x - 170;
    popoverWidth = 340;
  }

  const clampedTop = Math.max(popoverTop, 70);
  const clampedLeft = Math.min(Math.max(popoverLeft, 16), window.innerWidth - (popoverWidth + 20));

  return (
    <div
      ref={popoverRef}
      style={{
        position: 'fixed',
        left: `${clampedLeft}px`,
        top: `${clampedTop}px`,
        zIndex: 50,
      }}
      className="will-change-transform font-sans"
    >
      {/* MODE 1: COMPACT FLOATING ACTION BAR */}
      {mode === 'toolbar' && (
        <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-[#064E3B] text-white shadow-2xl border border-emerald-700/80 backdrop-blur-md">
          {/* Highlight Button */}
          <button
            type="button"
            onClick={handleHighlightClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isHighlighted
                ? 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                : 'text-amber-300 hover:bg-white/10 hover:text-white'
            }`}
            title="Tô sáng đoạn văn bản này"
          >
            <Highlighter size={13} className={isHighlighted ? 'text-stone-950' : 'text-amber-400'} />
            <span>{isHighlighted ? 'Bỏ Highlight' : 'Highlight'}</span>
          </button>

          <span className="w-[1px] h-4 bg-emerald-700/80 my-auto" />

          {/* Note Button */}
          <button
            type="button"
            onClick={() => setMode('note')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            title="Thêm ghi chú cá nhân"
          >
            <StickyNote size={13} className="text-amber-400" />
            <span>Note</span>
          </button>

          <span className="w-[1px] h-4 bg-emerald-700/80 my-auto" />

          {/* Add to Anki Button */}
          <button
            type="button"
            onClick={handleDirectSaveToAnki}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            title="Thêm nhanh vào bộ thẻ Anki"
          >
            <BookmarkPlus size={13} />
            <span>Thêm thẻ</span>
          </button>

          <span className="w-[1px] h-4 bg-emerald-700/80 my-auto" />

          {/* Dictionary Lookup Button */}
          <button
            type="button"
            onClick={handleOpenDictionary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 hover:bg-amber-300 text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="Mở từ điển học thuật tra cứu IPA và nghĩa tiếng Việt"
          >
            <BookOpen size={13} />
            <span>Tra nghĩa</span>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors ml-0.5 cursor-pointer"
            title="Đóng thanh công cụ"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* MODE 2: NOTE COMPOSER */}
      {mode === 'note' && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-stone-300 p-4 space-y-3 text-stone-900 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-xs font-bold font-mono text-[#064E3B] flex items-center gap-1.5">
              <StickyNote size={13} className="text-amber-600" />
              Ghi Chú Cho Đoạn Đã Chọn:
            </span>
            <button
              type="button"
              onClick={() => setMode('toolbar')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>

          <p className="text-xs font-serif italic text-stone-600 truncate border-l-2 border-amber-500 pl-2 bg-stone-50 py-1 rounded-r">
            "{cleanWord}"
          </p>

          <textarea
            autoFocus
            rows={3}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Nhập ghi chú hoặc kiến thức cần nhớ cho câu này..."
            className="w-full p-2.5 text-xs rounded-xl border border-stone-300 focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] outline-none resize-none bg-[#FAFAF9]"
          />

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setMode('toolbar')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={handleSaveNote}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#064E3B] text-amber-300 hover:text-white hover:bg-[#022C22] shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Check size={13} />
              <span>Lưu Ghi Chú</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: FULL DICTIONARY & ANKI CLOZE AI */}
      {mode === 'dictionary' && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-stone-300 p-4 space-y-3 text-stone-900 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <button
              type="button"
              onClick={() => setMode('toolbar')}
              className="flex items-center gap-1 text-[11px] font-mono text-stone-600 hover:text-[#064E3B] font-bold cursor-pointer"
            >
              <ChevronLeft size={14} />
              <span>Quay lại</span>
            </button>

            <span className="text-[11px] text-[#064E3B] font-mono font-bold uppercase flex items-center gap-1">
              <BookOpen size={12} className="text-amber-600" /> Từ Điển Anh–Việt
            </span>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Word, IPA, POS & Pronounce */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold font-serif text-[#064E3B] leading-tight">
                  {cleanWord}
                </h4>
                {lookup.pos && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                    {lookup.pos}
                  </span>
                )}
              </div>
              {lookup.ipa && (
                <span className="text-xs font-mono text-stone-500 block mt-0.5 font-ipa">
                  {lookup.ipa}
                </span>
              )}
            </div>

            <AudioPlayButton text={cleanWord} variant="icon" />
          </div>

          {/* Meaning Section */}
          {isLoadingDict ? (
            <div className="flex items-center gap-2 py-3 text-xs text-stone-500 font-sans">
              <Loader2 size={14} className="animate-spin text-[#064E3B]" />
              <span>Đang tra nghĩa tiếng Việt &amp; phiên âm...</span>
            </div>
          ) : (
            <div className="space-y-1.5 bg-[#FAFAF9] p-2.5 rounded-xl border border-stone-200/80">
              <div className="text-xs font-sans font-bold text-emerald-900 flex items-start gap-1.5">
                <Sparkles size={13} className="text-amber-600 shrink-0 mt-0.5" />
                <span>{lookup.definitionVi || `Từ vựng học thuật trong ${source}`}</span>
              </div>
              {lookup.definitionEn && (
                <p className="text-[11px] font-sans text-stone-600 leading-relaxed line-clamp-2">
                  {lookup.definitionEn}
                </p>
              )}
            </div>
          )}

          {/* Context Sentence Preview */}
          {contextSentence && (
            <p className="text-[11px] font-serif text-stone-600 italic border-l-2 border-amber-500 pl-2 line-clamp-2 leading-relaxed bg-stone-50 py-1 rounded-r">
              "{contextSentence}"
            </p>
          )}

          {/* Action Buttons: AI 9.0 Cloze & Fast Save */}
          <div className="space-y-1.5 pt-1">
            <button
              type="button"
              onClick={handleGenerateAiCloze}
              disabled={isSaved || isGeneratingAi}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                aiGeneratedSuccess
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                  : 'bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white border border-emerald-800 active:scale-95'
              }`}
            >
              {isGeneratingAi ? (
                <>
                  <Loader2 size={14} className="animate-spin text-amber-300" />
                  <span>Gemini Đang Tạo Thẻ 9.0...</span>
                </>
              ) : aiGeneratedSuccess ? (
                <>
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <span>Đã Tạo Thẻ Cloze AI 9.0</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="text-amber-300" />
                  <span>✨ Tạo Thẻ Anki Cloze AI 9.0</span>
                </>
              )}
            </button>

            {!aiGeneratedSuccess && (
              <button
                type="button"
                onClick={handleDirectSaveToAnki}
                disabled={isSaved}
                className="w-full py-1.5 px-3 rounded-xl text-[11px] font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookmarkPlus size={12} className="text-stone-400" />
                <span>{isSaved ? 'Đã lưu trong Deck' : 'Lưu nhanh cơ bản'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
