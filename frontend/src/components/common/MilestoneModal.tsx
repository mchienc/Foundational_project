import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, Sparkles, X, Download } from 'lucide-react';
import { modalScaleVariants } from '../../styles/motion';
import { Button } from './Button';

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  studentName?: string;
  onViewCertificate?: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  studentName = 'Đặng Minh Chiến',
  onViewCertificate,
}) => {
  // Trigger Confetti Burst when modal opens
  useEffect(() => {
    if (isOpen) {
      // 1. Initial central burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#F59E0B', '#10B981', '#7C3AED', '#EC4899'],
      });

      // 2. Left and Right celebratory cannons
      const end = Date.now() + 1.2 * 1000;
      const interval: ReturnType<typeof setInterval> = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
          colors: ['#F59E0B', '#10B981', '#2563EB'],
        });
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
          colors: ['#7C3AED', '#F59E0B', '#10B981'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with fade in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Modal Card with Scale From Center 0.8 -> 1 */}
          <motion.div
            variants={modalScaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xl z-10 text-center space-y-6 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Glowing Trophy / Badge Circle */}
            <div className="relative inline-flex items-center justify-center mx-auto mt-2">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-500 opacity-30 blur-md"
              />

              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Award size={48} className="drop-shadow-sm" />
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-1 -right-1 text-emerald-500 bg-white rounded-full p-1 shadow-md"
                >
                  <Sparkles size={16} />
                </motion.span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 size={13} />
                100% Hoàn Thành Mục Tiêu
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Chúc Mừng, {studentName}!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Bạn đã nỗ lực xuất sắc hoàn thành trọn vẹn mục tiêu luyện tập:
              </p>
              <p className="text-base font-semibold text-blue-600 bg-blue-50/70 py-2 px-4 rounded-xl border border-blue-100">
                {courseTitle}
              </p>
            </div>

            {/* Reward Stats */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100">
              <div className="space-y-0.5">
                <div className="text-lg font-bold text-slate-900 font-mono">100%</div>
                <div className="text-xs text-slate-500">Tiến độ</div>
              </div>
              <div className="space-y-0.5 border-l border-slate-100">
                <div className="text-lg font-bold text-emerald-600 font-mono">Đạt chuẩn</div>
                <div className="text-xs text-slate-500">Chứng chỉ</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                icon={<Download size={16} />}
                onClick={() => {
                  onClose();
                  if (onViewCertificate) {
                    onViewCertificate();
                  }
                }}
              >
                Tải Chứng Chỉ (PDF)
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
                onClick={onClose}
              >
                Tiếp Tục Khám Phá
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
