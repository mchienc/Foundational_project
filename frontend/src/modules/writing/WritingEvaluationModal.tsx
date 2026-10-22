// frontend/src/modules/writing/WritingEvaluationModal.tsx
// Modal hiển thị kết quả chấm điểm Writing của giáo viên AI (Gemini)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  AlertTriangle,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export interface WritingEvaluationResult {
  overallBand: number;
  criteria: {
    taskAchievement: { band: number; feedback: string };
    coherenceCohesion: { band: number; feedback: string };
    lexicalResource: { band: number; feedback: string };
    grammaticalRange: { band: number; feedback: string };
  };
  overview: string;
  sentenceCorrections: {
    original: string;
    corrected: string;
    explanation: string;
  }[];
  modelAnswer: string;
}

interface WritingEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: WritingEvaluationResult | null;
  taskTitle: string;
  wordCount: number;
  timeSpentSeconds: number;
}

export const WritingEvaluationModal: React.FC<WritingEvaluationModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  taskTitle,
  wordCount,
  timeSpentSeconds,
}) => {
  const [copiedModel, setCopiedModel] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'criteria' | 'corrections' | 'model'>('criteria');

  if (!isOpen || !evaluation) return null;

  const handleCopyModel = async () => {
    try {
      await navigator.clipboard.writeText(evaluation.modelAnswer);
      setCopiedModel(true);
      setTimeout(() => setCopiedModel(false), 2000);
    } catch (e) {
      console.warn('Không thể copy:', e);
    }
  };

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút ${secs < 10 ? '0' : ''}${secs} giây`;
  };

  const getBandBadgeColor = (band: number) => {
    if (band >= 8.0) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    if (band >= 7.0) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (band >= 6.0) return 'bg-blue-100 text-blue-900 border-blue-300';
    return 'bg-stone-100 text-stone-800 border-stone-300';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-4xl bg-[#FAFAF9] border border-stone-300 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-[#064E3B] text-white px-6 py-5 flex items-center justify-between shrink-0 border-b border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                    Kết Quả Đánh Giá Bài Viết AI
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900">
                    IELTS Examiner 9.0
                  </span>
                </div>
                <p className="text-xs text-emerald-200 truncate max-w-md mt-0.5">
                  Đề bài: {taskTitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-300 hover:text-white hover:bg-emerald-800/60 rounded-full transition-colors cursor-pointer"
              aria-label="Đóng bảng đánh giá"
            >
              <X size={20} />
            </button>
          </div>

          {/* Subheader: Score Ribbon */}
          <div className="bg-white border-b border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Band Điểm:
                </span>
                <span className="text-3xl font-serif font-bold text-[#064E3B]">
                  {evaluation.overallBand.toFixed(1)}
                </span>
                <span className="text-xs text-stone-400">/ 9.0</span>
              </div>

              <div className="h-6 w-px bg-stone-200 hidden sm:block" />

              <div className="text-xs text-stone-600 flex items-center gap-3">
                <span>Số từ: <strong className="text-stone-900">{wordCount} từ</strong></span>
                <span>Thời gian: <strong className="text-stone-900">{formatMinutes(timeSpentSeconds)}</strong></span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('criteria')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'criteria'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                4 Tiêu Chí IELTS
              </button>
              <button
                onClick={() => setActiveTab('corrections')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'corrections'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Sửa Lỗi Từng Câu</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">
                  {evaluation.sentenceCorrections?.length || 0}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('model')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'model'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Bài Viết Mẫu 8.0+
              </button>
            </div>
          </div>

          {/* Body Content - Scrollable */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Tab 1: Criteria */}
            {activeTab === 'criteria' && (
              <div className="space-y-6">
                {/* Overview Card */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-stone-800">
                  <div className="flex items-center gap-2 text-[#064E3B] font-bold text-sm mb-1.5">
                    <TrendingUp size={16} />
                    <span>Nhận xét tổng quan của Giám khảo</span>
                  </div>
                  <p className="text-sm leading-relaxed text-stone-700">
                    {evaluation.overview}
                  </p>
                </div>

                {/* 4 Criteria Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Task Achievement */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                        1. Task Achievement / Response
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getBandBadgeColor(evaluation.criteria.taskAchievement.band)}`}>
                        Band {evaluation.criteria.taskAchievement.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {evaluation.criteria.taskAchievement.feedback}
                    </p>
                  </div>

                  {/* Coherence & Cohesion */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                        2. Coherence &amp; Cohesion
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getBandBadgeColor(evaluation.criteria.coherenceCohesion.band)}`}>
                        Band {evaluation.criteria.coherenceCohesion.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {evaluation.criteria.coherenceCohesion.feedback}
                    </p>
                  </div>

                  {/* Lexical Resource */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                        3. Lexical Resource (Từ Vựng)
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getBandBadgeColor(evaluation.criteria.lexicalResource.band)}`}>
                        Band {evaluation.criteria.lexicalResource.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {evaluation.criteria.lexicalResource.feedback}
                    </p>
                  </div>

                  {/* Grammatical Range & Accuracy */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                        4. Grammatical Range &amp; Accuracy
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getBandBadgeColor(evaluation.criteria.grammaticalRange.band)}`}>
                        Band {evaluation.criteria.grammaticalRange.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {evaluation.criteria.grammaticalRange.feedback}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Sentence Corrections */}
            {activeTab === 'corrections' && (
              <div className="space-y-4">
                <div className="text-xs text-stone-600 bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2">
                  <AlertTriangle size={15} className="text-amber-700 shrink-0" />
                  <span>
                    Giáo viên AI đã đối chiếu bài viết của bạn và phát hiện các câu diễn đạt cần nâng cấp lên chuẩn Band 8.0+:
                  </span>
                </div>

                <div className="space-y-3">
                  {evaluation.sentenceCorrections && evaluation.sentenceCorrections.length > 0 ? (
                    evaluation.sentenceCorrections.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2.5"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase">
                          <span>Điểm sửa #{idx + 1}</span>
                        </div>

                        {/* Original sentence */}
                        <div className="p-2.5 rounded-xl bg-red-50/70 border border-red-200/80 text-xs">
                          <span className="font-bold text-red-800 block mb-0.5">Câu gốc của bạn:</span>
                          <span className="text-stone-800 italic">"{item.original}"</span>
                        </div>

                        {/* Corrected sentence */}
                        <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs">
                          <span className="font-bold text-[#064E3B] block mb-0.5">Gợi ý nâng cấp Band 8.0+:</span>
                          <span className="text-stone-900 font-medium">"{item.corrected}"</span>
                        </div>

                        {/* Explanation */}
                        <p className="text-xs text-stone-600 leading-relaxed pl-1">
                          <strong className="text-stone-800">Lý do:</strong> {item.explanation}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-stone-500 text-xs">
                      Không có câu nào bị lỗi ngữ pháp nghiêm trọng.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Model Answer */}
            {activeTab === 'model' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#064E3B]" />
                    <h4 className="text-sm font-bold text-stone-900">
                      Bài Viết Tham Khảo Band 8.0+
                    </h4>
                  </div>

                  <button
                    onClick={handleCopyModel}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                  >
                    {copiedModel ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Sao chép bài mẫu</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-inner font-sans text-stone-800 text-sm leading-relaxed whitespace-pre-line select-text">
                  {evaluation.modelAnswer}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#064E3B] hover:bg-[#043327] text-white shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Tiếp tục luyện viết</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
