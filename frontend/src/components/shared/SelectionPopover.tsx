import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, Check, X, Sparkles, Loader2, BookOpen } from 'lucide-react';
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
}) => {
  const { addCardToPersonalDeck, isWordSavedInAnki } = useAnki();
  const cleanWord = selectedText
    .trim()
    .replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'“”]+|[.,/#!$%^&*;:{}=\-_`~()?"'“”]+$/g, '');

  const [isSaved, setIsSaved] = useState<boolean>(() => isWordSavedInAnki(cleanWord));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lookup, setLookup] = useState<LookupResult>({
    ipa: '',
    pos: 'academic',
    definitionEn: '',
    definitionVi: '',
  });

  const { saveAiGeneratedWord } = useVocabularyVault();
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState<boolean>(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (popoverRef.current) {
        gsap.fromTo(
          popoverRef.current,
          { scale: 0.92, autoAlpha: 0, y: 8 },
          { scale: 1, autoAlpha: 1, y: 0, duration: 0.22, ease: 'back.out(1.5)', force3D: true }
        );
      }
    },
    { scope: popoverRef }
  );

  // Live Dictionary Lookup (Free Dictionary API + Vietnamese Translation API)
  useEffect(() => {
    let isMounted = true;
    if (!cleanWord) return;

    setIsLoading(true);
    setIsSaved(isWordSavedInAnki(cleanWord));

    const singleWord = cleanWord.split(/\s+/)[0].toLowerCase();

    const fetchDict = fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(singleWord)}`
    )
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);

    const fetchVi = fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanWord)}&langpair=en|vi`
    )
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);

    Promise.all([fetchDict, fetchVi]).then(([dictData, viData]) => {
      if (!isMounted) return;

      let ipa = '';
      let pos = 'vocab';
      let definitionEn = '';
      let definitionVi = '';

      if (Array.isArray(dictData) && dictData[0]) {
        const entry = dictData[0];
        ipa =
          entry.phonetic ||
          entry.phonetics?.find((p: any) => p.text)?.text ||
          '';
        const firstMeaning = entry.meanings?.[0];
        if (firstMeaning) {
          pos = firstMeaning.partOfSpeech || 'vocab';
          definitionEn = firstMeaning.definitions?.[0]?.definition || '';
        }
      }

      if (viData?.responseData?.translatedText) {
        definitionVi = viData.responseData.translatedText;
      }

      setLookup({
        ipa: ipa || `/${singleWord}/`,
        pos,
        definitionEn:
          definitionEn || `Academic term encountered in ${source}.`,
        definitionVi:
          definitionVi || `Từ vựng học thuật trong ${source}`,
      });
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [cleanWord, source, isWordSavedInAnki]);

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
        handleSaveToAnki();
      }
    } catch {
      handleSaveToAnki();
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleSaveToAnki = () => {
    const success = addCardToPersonalDeck({
      word: cleanWord,
      ipa: lookup.ipa,
      pos: lookup.pos,
      definitionVi: lookup.definitionVi || `Từ vựng học thuật tra cứu trong ${source}`,
      definitionEn: lookup.definitionEn || cleanWord,
      contextSentence: contextSentence || `... ${cleanWord} ...`,
      source,
    });

    if (success) {
      setIsSaved(true);
      onNotify?.(`Đã lưu "${cleanWord}" (${lookup.definitionVi}) vào Deck Anki!`, 'success');
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
        left: `${Math.min(Math.max(position.x - 160, 16), window.innerWidth - 340)}px`,
        top: `${Math.max(position.y - 190, 70)}px`,
        zIndex: 50,
      }}
      className="w-80 bg-white rounded-2xl shadow-2xl border border-stone-300 p-4 space-y-3 text-stone-900 will-change-transform"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-[#064E3B] font-mono font-bold uppercase">
          <BookOpen size={13} className="text-amber-600" />
          <span>Từ Điển Học Thuật Anh–Việt</span>
        </div>
        <button
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
            <span className="text-xs font-mono text-stone-500 block mt-0.5">
              {lookup.ipa}
            </span>
          )}
        </div>

        <AudioPlayButton text={cleanWord} variant="icon" />
      </div>

      {/* Meaning Section */}
      {isLoading ? (
        <div className="flex items-center gap-2 py-2 text-xs text-stone-500 font-sans">
          <Loader2 size={14} className="animate-spin text-[#064E3B]" />
          <span>Đang tra nghĩa tiếng Việt &amp; phiên âm...</span>
        </div>
      ) : (
        <div className="space-y-1.5 bg-[#FAFAF9] p-2.5 rounded-xl border border-stone-200/80">
          <div className="text-xs font-sans font-bold text-emerald-900 flex items-start gap-1.5">
            <Sparkles size={13} className="text-amber-600 shrink-0 mt-0.5" />
            <span>{lookup.definitionVi}</span>
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
              <Check size={14} className="text-emerald-700" />
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
            onClick={handleSaveToAnki}
            disabled={isSaved}
            className="w-full py-1.5 px-3 rounded-xl text-[11px] font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Bookmark size={12} className="text-stone-400" />
            <span>{isSaved ? 'Đã lưu trong Deck' : 'Lưu nhanh cơ bản'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
