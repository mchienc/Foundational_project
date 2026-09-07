import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Printer, X, ShieldCheck, Star } from 'lucide-react';
import { modalScaleVariants } from '../../styles/motion';
import { Button } from './Button';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  studentName?: string;
  studentEmail?: string;
  issueDate?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  studentName = 'Đặng Minh Chiến',
  studentEmail = 'dangchien2005@gmail.com',
  issueDate = new Date().toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs print:hidden"
          />

          {/* Modal Card */}
          <motion.div
            variants={modalScaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-2xl z-10 overflow-hidden print:border-none print:shadow-none print:w-full print:max-w-none"
          >
            {/* Action Bar (hidden on print) */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-slate-50/80 print:hidden">
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                <Award size={14} className="text-blue-600" />
                Chứng chỉ điện tử chính thức
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Printer size={14} />}
                  onClick={() => window.print()}
                >
                  In / Lưu PDF
                </Button>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Certificate Decorative Header (Dark Inverted Band with macOS dots) */}
            <div className="bg-slate-950 px-8 py-6 text-center relative text-white">
              {/* Traffic dots */}
              <div className="absolute top-4 left-5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>

              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-2 text-amber-300">
                <Award size={24} />
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                Certificate of Completion
              </div>
              <div className="text-white font-bold text-base tracking-tight">
                EduFlow Learning Management Platform
              </div>
            </div>

            {/* Certificate Body */}
            <div className="p-8 sm:p-10 text-center space-y-6">
              <div className="space-y-1.5">
                <p className="text-xs text-slate-400 font-mono">Chứng nhận học viên</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {studentName}
                </h2>
                <p className="text-xs text-slate-400 font-mono">{studentEmail}</p>
              </div>

              {/* Seal divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200" />
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center text-xs">
                  <Star size={14} className="fill-amber-400" />
                </div>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-mono">
                  Đã hoàn thành xuất sắc toàn bộ bài giảng và các kỳ kiểm tra trong khóa học
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-blue-600 px-4">
                  {courseTitle}
                </h3>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900 font-mono">100%</div>
                  <div className="text-[10px] font-mono text-slate-400">Hoàn thành</div>
                </div>
                <div className="text-center border-x border-slate-200/80">
                  <div className="text-xl font-bold text-emerald-600 font-mono">Xuất sắc</div>
                  <div className="text-[10px] font-mono text-slate-400">Xếp loại</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600 font-mono">Đạt chuẩn</div>
                  <div className="text-[10px] font-mono text-slate-400">Đánh giá</div>
                </div>
              </div>

              {/* Signature & Verification Seal */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-left text-xs text-slate-500 font-mono">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Ngày cấp chứng chỉ</span>
                  <span className="font-semibold text-slate-800">{issueDate}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-emerald-400/80 bg-emerald-50 text-emerald-600 flex flex-col items-center justify-center">
                    <ShieldCheck size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">Verified</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 block">Mã số chứng chỉ</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    EF-2026-{studentName.replace(/\s+/g, '').substring(0, 4).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 text-center text-[11px] font-mono text-slate-400 print:hidden">
              Chứng chỉ có giá trị xác thực trực tuyến tại eduflow.local • Lưu hoặc in định dạng PDF
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
