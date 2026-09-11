import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle } from 'lucide-react';

interface SentenceUpgraderPopoverProps {
  selectedText: string;
  position: { x: number; y: number } | null;
  onApply: (replacement: string) => void;
  onClose: () => void;
  upgrades?: {
    original: string;
    band65: string;
    band75: string;
    band85: string;
  };
}

export const SentenceUpgraderPopover: React.FC<SentenceUpgraderPopoverProps> = ({
  selectedText,
  position,
  onApply,
  onClose,
  upgrades,
}) => {
  if (!position) return null;

  const wordCount = selectedText.trim() ? selectedText.trim().split(/\s+/).length : 0;
  
  // Ensure the popover stays within viewport bounds safely (prevent overflow)
  const x = Math.min(position.x, typeof window !== 'undefined' ? window.innerWidth - 460 : position.x);
  const y = Math.min(position.y, typeof window !== 'undefined' ? window.innerHeight - 400 : position.y);

  const content = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50 w-[440px] bg-white rounded-2xl shadow-2xl border border-stone-200 font-sans flex flex-col"
        style={{ left: Math.max(10, x), top: Math.max(10, y) }}
      >
        <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-[#FAFAF9] rounded-t-2xl">
          <div className="flex items-center gap-2 text-[#064E3B] font-semibold">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>✨ Sentence Upgrader</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {wordCount < 5 ? (
            <div className="text-sm text-stone-600 text-center py-6">
              Select a longer sentence for best results.
            </div>
          ) : !upgrades ? (
            <div className="text-sm text-stone-600 text-center py-6">
              Select a complete sentence to see upgrade suggestions.
            </div>
          ) : (
            <>
              {/* Band 6.5 */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Band 6.5 — Clear</span>
                </div>
                <p className="text-sm text-blue-900 font-serif leading-relaxed">{upgrades.band65}</p>
                <button
                  onClick={() => onApply(upgrades.band65)}
                  className="self-end flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Apply
                </button>
              </div>

              {/* Band 7.5 */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Band 7.5 — Academic</span>
                </div>
                <p className="text-sm text-emerald-900 font-serif leading-relaxed">{upgrades.band75}</p>
                <button
                  onClick={() => onApply(upgrades.band75)}
                  className="self-end flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Apply
                </button>
              </div>

              {/* Band 8.5 */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Band 8.5 — Native-like</span>
                </div>
                <p className="text-sm text-amber-900 font-serif leading-relaxed">{upgrades.band85}</p>
                <button
                  onClick={() => onApply(upgrades.band85)}
                  className="self-end flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Apply
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

export default SentenceUpgraderPopover;
