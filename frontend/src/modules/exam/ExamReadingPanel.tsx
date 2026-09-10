import { useState, useRef, useEffect, useCallback } from 'react';
import { BookOpen, StickyNote, Trash2, X } from 'lucide-react';
import { useExamStore } from '../../store/useExamStore';
import { ExamFloatingToolbar } from './ExamFloatingToolbar';
import { ExamNote } from '../../types';

export const ExamReadingPanel = () => {
  const {
    passages,
    activePassageIndex,
    setActivePassage,
    contrastMode,
    highlights,
    notes,
    removeNote,
  } = useExamStore();

  const passage = passages[activePassageIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  // Floating toolbar state
  const [toolbarPosition, setToolbarPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  // Note popover display state
  const [selectedNote, setSelectedNote] = useState<ExamNote | null>(null);

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setToolbarPosition(null);
      setSelectedText('');
      return;
    }

    const text = selection.toString().trim();
    if (text.length < 2) {
      setToolbarPosition(null);
      setSelectedText('');
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setToolbarPosition({
      top: rect.top - 10,
      left: rect.left + rect.width / 2,
    });
    setSelectedText(text);
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setToolbarPosition(null);
        setSelectedText('');
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const panelBg = isHighContrast
    ? 'bg-black text-yellow-300'
    : isInverted
    ? 'bg-[#022C22] text-slate-100'
    : 'bg-[#FAFAF9] text-stone-900';

  const activeHighlights = highlights.filter((h) => h.passageIndex === activePassageIndex);
  const activeNotes = notes.filter((n) => n.passageIndex === activePassageIndex);

  // Highlight replacement helper
  const renderParagraphContent = (text: string) => {
    if (!activeHighlights || activeHighlights.length === 0) {
      return text;
    }

    let modifiedText = text;
    // We can do keyword highlighting if exact match
    // For robust rendering, split text around matched highlight texts
    activeHighlights.forEach((hl) => {
      if (modifiedText.includes(hl.text)) {
        const regex = new RegExp(`(${hl.text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        modifiedText = modifiedText.replace(
          regex,
          `___HL_START___$1___HL_END___`
        );
      }
    });

    const parts = modifiedText.split(/(___HL_START___.*?___HL_END___)/g);
    return parts.map((part, i) => {
      if (part.startsWith('___HL_START___') && part.endsWith('___HL_END___')) {
        const cleanContent = part.replace('___HL_START___', '').replace('___HL_END___', '');
        return (
          <mark
            key={i}
            className={
              isHighContrast
                ? 'bg-yellow-400 text-black px-0.5 rounded font-semibold'
                : isInverted
                ? 'bg-emerald-600 text-white px-0.5 rounded'
                : 'bg-amber-200 text-stone-950 px-0.5 rounded'
            }
          >
            {cleanContent}
          </mark>
        );
      }
      return part;
    });
  };

  if (!passage) {
    return (
      <div className={`h-full flex items-center justify-center p-8 ${panelBg}`}>
        <p className="text-stone-400 font-sans text-sm">Chưa có dữ liệu bài đọc.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseUp={handleMouseUp}
      data-lenis-prevent="true"
      className={`h-full w-full flex flex-col overflow-hidden relative min-h-0 ${panelBg}`}
    >
      {/* Passage Navigation Tabs */}
      <div
        className={`px-4 sm:px-6 pt-3 pb-2.5 flex items-center gap-2 border-b shrink-0 ${
          isHighContrast
            ? 'border-yellow-400/30 bg-stone-950'
            : isInverted
            ? 'border-emerald-700 bg-[#03372b]'
            : 'border-stone-200 bg-white shadow-2xs'
        }`}
      >
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-60 mr-1 flex items-center gap-1">
          <BookOpen size={12} />
          Passage:
        </span>
        {passages.map((p, idx) => {
          const isActive = activePassageIndex === idx;
          return (
            <button
              key={p.id || idx}
              type="button"
              onClick={() => setActivePassage(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                isActive
                  ? isHighContrast
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : isInverted
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-[#064E3B] text-white shadow-xs'
                  : isHighContrast
                  ? 'text-yellow-400/70 hover:bg-yellow-400/10'
                  : isInverted
                  ? 'text-emerald-300 hover:bg-emerald-800'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>Passage {idx + 1}</span>
              <span className="ml-1.5 opacity-70 font-mono text-[10px]">
                {idx === 0 ? '(Q1–13)' : idx === 1 ? '(Q14–26)' : '(Q27–40)'}
              </span>
            </button>
          );
        })}

        {/* Note indicators counter */}
        {activeNotes.length > 0 && (
          <span
            className={`ml-auto text-[11px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-full ${
              isHighContrast
                ? 'bg-yellow-400/20 text-yellow-400'
                : isInverted
                ? 'bg-emerald-800 text-emerald-200'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            <StickyNote size={12} />
            {activeNotes.length} notes
          </span>
        )}
      </div>

      {/* Passage Content - Scrollable */}
      <div
        data-lenis-prevent="true"
        className="flex-1 overflow-y-auto min-h-0 px-6 sm:px-8 py-6 space-y-6 select-text text-justify leading-relaxed overscroll-contain"
      >
        {/* Header Title */}
        <div className="space-y-2 border-b pb-4 border-stone-200/40">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                isHighContrast
                  ? 'border border-yellow-400 text-yellow-400'
                  : isInverted
                  ? 'bg-emerald-800 text-emerald-200'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              Passage {passage.passageNumber || activePassageIndex + 1}
            </span>
            {passage.topic && (
              <span
                className={`text-[10px] font-sans px-2 py-0.5 rounded ${
                  isHighContrast
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : isInverted
                    ? 'bg-emerald-900/60 text-emerald-300'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {passage.topic}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-snug">
            {passage.title}
          </h2>

          {passage.subtitle && (
            <p className="text-xs sm:text-sm font-sans opacity-80 italic leading-normal">
              {passage.subtitle}
            </p>
          )}
        </div>

        {/* Notes list pinned in passage */}
        {activeNotes.length > 0 && (
          <div
            className={`p-3 rounded-xl text-xs space-y-2 font-sans ${
              isHighContrast
                ? 'bg-stone-900 border border-yellow-400/40'
                : isInverted
                ? 'bg-emerald-950/60 border border-emerald-700'
                : 'bg-amber-50/80 border border-amber-200 text-stone-800'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-amber-700">
              <StickyNote size={12} />
              <span>Ghi chú của bạn trên Passage {activePassageIndex + 1}:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeNotes.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setSelectedNote(note)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                    isHighContrast
                      ? 'bg-stone-800 text-yellow-400 hover:bg-stone-700 border border-yellow-400/50'
                      : isInverted
                      ? 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
                      : 'bg-white text-stone-800 hover:bg-amber-100 border border-stone-200 shadow-2xs'
                  }`}
                >
                  <span className="font-bold max-w-[120px] truncate">{note.note}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Paragraphs with Letter Indicators */}
        <div className="space-y-5 font-serif text-base sm:text-[17px] leading-8">
          {passage.paragraphs && passage.paragraphs.length > 0 ? (
            passage.paragraphs.map((p, pIdx) => (
              <div key={p.letter || pIdx} className="space-y-1 relative group">
                <div className="flex items-start gap-3">
                  <span
                    className={`font-mono font-bold text-sm px-2 py-0.5 rounded shrink-0 select-none ${
                      isHighContrast
                        ? 'bg-yellow-400 text-black'
                        : isInverted
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#064E3B] text-amber-300'
                    }`}
                  >
                    {p.letter}
                  </span>
                  <div className="flex-1">{renderParagraphContent(p.text)}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm font-sans opacity-70">Nội dung đoạn văn đang được cập nhật...</p>
          )}
        </div>
      </div>

      {/* Floating Toolbar on text selection */}
      <ExamFloatingToolbar
        position={toolbarPosition}
        selectedText={selectedText}
        passageIndex={activePassageIndex}
        onClose={() => {
          setToolbarPosition(null);
          setSelectedText('');
        }}
      />

      {/* Note view/delete popover */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs animate-in fade-in">
          <div
            className={`w-full max-w-sm rounded-2xl p-5 font-sans border shadow-xl space-y-3 ${
              isHighContrast
                ? 'bg-black text-yellow-400 border-yellow-400'
                : isInverted
                ? 'bg-[#022C22] text-slate-100 border-emerald-600'
                : 'bg-white text-stone-900 border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-stone-200/40">
              <span className="font-bold text-xs uppercase flex items-center gap-1">
                <StickyNote size={13} />
                Ghi chú đoạn văn
              </span>
              <button
                type="button"
                onClick={() => setSelectedNote(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X size={14} />
              </button>
            </div>

            <div className="text-xs italic opacity-75 bg-black/5 p-2 rounded-lg border border-black/5">
              "{selectedNote.text}"
            </div>

            <div className="text-sm font-medium py-1">{selectedNote.note}</div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200/40">
              <button
                type="button"
                onClick={() => {
                  removeNote(selectedNote.id);
                  setSelectedNote(null);
                }}
                className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
              >
                <Trash2 size={13} />
                <span>Xóa ghi chú</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedNote(null)}
                className="px-3 py-1 text-xs rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
