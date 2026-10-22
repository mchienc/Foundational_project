// frontend/src/components/common/UpgradeModal.tsx
// Modal giới thiệu gói EduFlow Pro & Nút Demo 1-Click kích hoạt tức thì

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Zap, Award, RefreshCw } from 'lucide-react';
import { useProStore } from '../../modules/pro/useProStore';

interface UpgradeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  onSuccess,
}) => {
  const isStoreOpen = useProStore((state) => state.isUpgradeModalOpen);
  const closeStoreModal = useProStore((state) => state.closeUpgradeModal);
  const isPro = useProStore((state) => state.isPro);
  const activateProDemo = useProStore((state) => state.activateProDemo);
  const resetToFree = useProStore((state) => state.resetToFree);

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isStoreOpen;
  const handleClose = propsOnClose || closeStoreModal;

  const handleActivateDemo = () => {
    activateProDemo();
    handleClose();
    if (onSuccess) onSuccess();
  };

  const handleResetFree = () => {
    resetToFree();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#FAFAF9] border border-amber-300/60 rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header Background Banner */}
          <div className="bg-gradient-to-r from-[#064E3B] via-[#043327] to-[#064E3B] px-6 py-6 text-white relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-stone-300 hover:text-white hover:bg-emerald-800/60 rounded-full transition-colors cursor-pointer"
              aria-label="Đóng modal"
            >
              <X size={18} />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles size={14} className="animate-pulse" />
              <span>GÓI NÂNG CẤP CAO CẤP</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              EduFlow Pro &bull; AI Tutor 9.0
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 leading-relaxed">
              Luyện Viết &amp; Luyện Nói không giới hạn với Giám khảo AI Cambridge thế hệ mới
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            {/* Features comparison */}
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Phòng Luyện Viết (Writing Studio) không giới hạn
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Chấm chi tiết 4 tiêu chí IELTS, bảng sửa lỗi từng câu và bài mẫu Band 8.0+.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Phòng Luyện Nói (Speaking Studio) nhận diện giọng nói
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Đổi đề ngẫu nhiên Part 1, 2 (Cue Card), 3. AI nhận xét trôi chảy, ngữ pháp và phát âm IPA.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Đồng bộ thẻ Anki Flashcard 1-Click
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Lưu các từ vựng đắt giá từ bài viết và bài nói thẳng vào kho thẻ để ôn tập ngắt quãng.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Demo Activation Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                <Zap size={18} />
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                Dành cho Giảng viên &amp; Bạn kiểm tra đánh giá: Kích hoạt trải nghiệm Pro ngay lập tức với 1 nút bấm bên dưới, không cần thẻ thanh toán.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-1">
              {!isPro ? (
                <button
                  onClick={handleActivateDemo}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Kích hoạt trải nghiệm Pro (Demo 1 Click)</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-2">
                    <Award size={18} className="text-emerald-700" />
                    <span>Tài khoản của bạn đã ở trạng thái EduFlow Pro!</span>
                  </div>
                  <button
                    onClick={handleResetFree}
                    className="w-full py-2 px-3 text-xs text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={12} />
                    <span>Chuyển lại gói Free để thử nghiệm hạn mức</span>
                  </button>
                </div>
              )}

              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-800 hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                Để sau, tiếp tục học tập
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
