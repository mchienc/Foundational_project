import { useState } from 'react';
import { Highlighter, MessageSquarePlus, X, Check } from 'lucide-react';
import { useExamStore } from '../../store/useExamStore';

interface ExamFloatingToolbarProps {
  position: { top: number; left: number } | null;
  selectedText: string;
  passageIndex: number;
  onClose: () => void;
}

export const ExamFloatingToolbar = ({
  position,
  selectedText,
  passageIndex,
  onClose,
}: ExamFloatingToolbarProps) => {
  const { addHighlight, addNote, contrastMode } = useExamStore();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  if (!position || !selectedText.trim()) return null;

  const handleHighlight = () => {
    addHighlight(passageIndex, selectedText);
    window.getSelection()?.removeAllRanges();
    onClose();
  };

  const handleSaveNote = () => {
    if (noteContent.trim()) {
      addNote(passageIndex, selectedText, noteContent.trim(), position.top, position.left);
    }
    window.getSelection()?.removeAllRanges();
    setNoteContent('');
    setIsAddingNote(false);
    onClose();
  };

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const bgClasses = isHighContrast
    ? 'bg-black text-yellow-400 border-2 border-yellow-400 shadow-2xl'
    : isInverted
    ? 'bg-[#022C22] text-emerald-100 border border-emerald-500 shadow-2xl'
    : 'bg-white text-stone-900 border border-stone-300 shadow-xl';

  return (
    <div
      className={`fixed z-50 rounded-xl p-1.5 flex flex-col font-sans transition-all animate-in fade-in zoom-in-95 duration-150 ${bgClasses}`}
      style={{
        top: `${Math.max(10, position.top - (isAddingNote ? 140 : 50))}px`,
        left: `${Math.max(10, Math.min(window.innerWidth - 280, position.left - 40))}px`,
      }}
    >
      {!isAddingNote ? (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleHighlight}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              isHighContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : isInverted
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
            }`}
          >
            <Highlighter size={13} />
            <span>Highlight</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddingNote(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              isHighContrast
                ? 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
                : isInverted
                ? 'border border-emerald-500 text-emerald-200 hover:bg-emerald-900/50'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-300'
            }`}
          >
            <MessageSquarePlus size={13} />
            <span>Take Note</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/10 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="p-2 w-72 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="truncate max-w-[200px] italic">"{selectedText.slice(0, 30)}..."</span>
            <button
              type="button"
              onClick={() => setIsAddingNote(false)}
              className="text-stone-400 hover:text-stone-700"
            >
              <X size={12} />
            </button>
          </div>

          <textarea
            autoFocus
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Nhập ghi chú của bạn cho đoạn này..."
            rows={3}
            className={`w-full p-2 text-xs rounded-lg outline-none resize-none ${
              isHighContrast
                ? 'bg-stone-900 text-yellow-300 border border-yellow-400 placeholder:text-stone-600'
                : isInverted
                ? 'bg-[#064E3B] text-white border border-emerald-600 placeholder:text-emerald-300'
                : 'bg-stone-50 text-stone-900 border border-stone-300 placeholder:text-stone-400'
            }`}
          />

          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => setIsAddingNote(false)}
              className="px-2.5 py-1 text-xs rounded-md text-stone-500 hover:bg-black/5"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSaveNote}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-md shadow-xs ${
                isHighContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : isInverted
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                  : 'bg-[#064E3B] text-white hover:bg-[#022C22]'
              }`}
            >
              <Check size={12} />
              <span>Lưu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
