import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const colors = {
            success: 'bg-slate-900 text-white border-slate-700 shadow-xl shadow-slate-950/20',
            error: 'bg-rose-50 text-rose-900 border-rose-200 shadow-lg shadow-rose-500/10',
            info: 'bg-white text-slate-900 border-slate-200 shadow-lg shadow-slate-200/50',
          };

          const icons = {
            success: <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />,
            error: <AlertCircle size={16} className="text-rose-500 shrink-0" />,
            info: <Info size={16} className="text-blue-500 shrink-0" />,
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border text-xs font-medium max-w-sm backdrop-blur-md ${colors[toast.type]}`}
            >
              {icons[toast.type]}
              <span className="flex-1 leading-snug">{toast.message}</span>
              <button
                onClick={() => onDismiss(toast.id)}
                className="opacity-50 hover:opacity-100 transition-opacity p-0.5"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
