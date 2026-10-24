// frontend/src/modules/writing/WritingEvaluationModal.tsx
// Modal hiển thị kết quả chấm điểm Writing của Giám khảo AI Senior Examiner chuẩn quốc tế
// Tích hợp: 4 tiêu chí 25%, Đối chiếu số liệu gốc Task 1, Phân tích lập luận & Thesis Task 2, và Bộ tính điểm Writing tổng hợp

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  AlertTriangle,
  BookOpen,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  Calculator,
  ShieldCheck,
  FileText,
  Sparkles,
} from 'lucide-react';

export interface WritingEvaluationResult {
  overallBand: number;
  criteria: {
    taskAchievement: { band: number; feedback: string };
    coherenceCohesion: { band: number; feedback: string };
    lexicalResource: { band: number; feedback: string };
    grammaticalRange: { band: number; feedback: string };
  };
  dataAccuracyCheck?: {
    status: 'PASS' | 'WARNING' | 'FAIL';
    accuracyScore: number;
    hasFactualErrors: boolean;
    summary: string;
    verifications: {
      claimInEssay: string;
      chartDataRef: string;
      isAccurate: boolean;
      comment: string;
    }[];
  };
  essayStructureCheck?: {
    detectedSubtype: string;
    hasClearThesis: boolean;
    thesisConsistency: string;
    argumentProgression: string;
    feedback: string;
  };
  compositeScore?: {
    task1Band: number;
    task2Band: number;
    compositeBand: number;
    formula: string;
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
  taskType: 'task1' | 'task2';
  taskTitle: string;
  wordCount: number;
  timeSpentSeconds: number;
  chartType?: string;
  questionType?: string;
}

// Hàm tính điểm tổng hợp Writing chuẩn IELTS
function roundIeltsBand(rawScore: number): number {
  if (isNaN(rawScore)) return 6.0;
  const clamped = Math.max(0, Math.min(9.0, rawScore));
  const floorVal = Math.floor(clamped);
  const decimal = Number((clamped - floorVal).toFixed(3));
  if (decimal < 0.25) return floorVal;
  if (decimal < 0.75) return floorVal + 0.5;
  return floorVal + 1.0;
}

export const WritingEvaluationModal: React.FC<WritingEvaluationModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  taskType,
  taskTitle,
  wordCount,
  timeSpentSeconds,
  chartType,
  questionType,
}) => {
  const [copiedModel, setCopiedModel] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'criteria' | 'dataCheck' | 'corrections' | 'model' | 'calculator'>('criteria');

  // Interactive Composite Calculator State
  const [calcT1, setCalcT1] = useState<number>(() => (taskType === 'task1' && evaluation ? evaluation.overallBand : 6.5));
  const [calcT2, setCalcT2] = useState<number>(() => (taskType === 'task2' && evaluation ? evaluation.overallBand : 6.5));

  if (!isOpen || !evaluation) return null;

  const isTask1 = taskType === 'task1';
  const rawWeighted = ((calcT1 + 2 * calcT2) / 3);
  const calculatedComposite = roundIeltsBand(rawWeighted);

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
                <Award size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                    Kết Quả Đánh Giá IELTS Writing
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900">
                    Senior Examiner 9.0
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-700/60 text-emerald-100 border border-emerald-500/30">
                    {isTask1 ? `Task 1 • ${chartType?.toUpperCase() || 'REPORT'}` : `Task 2 • ${questionType || 'ESSAY'}`}
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
                  {isTask1 ? 'Task 1 Band:' : 'Task 2 Band:'}
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
            <div className="flex flex-wrap items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('criteria')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'criteria'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                4 Tiêu Chí (25%)
              </button>

              <button
                onClick={() => setActiveTab('dataCheck')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'dataCheck'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isTask1 ? (
                  <>
                    <ShieldCheck size={13} className="text-emerald-700" />
                    <span>Đối Chiếu Số Liệu</span>
                    {evaluation.dataAccuracyCheck?.hasFactualErrors && (
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </>
                ) : (
                  <>
                    <FileText size={13} className="text-indigo-700" />
                    <span>Cấu Trúc &amp; Lập Luận</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveTab('corrections')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'corrections'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Sửa Lỗi Câu</span>
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
                Bài Mẫu 8.5+
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'calculator'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Calculator size={13} className="text-amber-700" />
                <span>Tính Điểm Writing Tổng</span>
              </button>
            </div>
          </div>

          {/* Body Content - Scrollable */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Tab 1: 4 Core Criteria (Each 25%) */}
            {activeTab === 'criteria' && (
              <div className="space-y-6">
                {/* Overview Card */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-stone-800">
                  <div className="flex items-center gap-2 text-[#064E3B] font-bold text-sm mb-1.5">
                    <TrendingUp size={16} />
                    <span>Nhận xét tổng quan của Giám khảo IELTS</span>
                  </div>
                  <p className="text-sm leading-relaxed text-stone-700">
                    {evaluation.overview}
                  </p>
                </div>

                {/* 4 Criteria Grid - 25% each */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Criterion 1: Task Achievement / Task Response */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                          {isTask1 ? '1. Task Achievement' : '1. Task Response'}
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          25%
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getBandBadgeColor(evaluation.criteria.taskAchievement.band)}`}>
                        Band {evaluation.criteria.taskAchievement.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {evaluation.criteria.taskAchievement.feedback}
                    </p>
                  </div>

                  {/* Criterion 2: Coherence & Cohesion */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                          2. Coherence &amp; Cohesion
                        </h4>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                          25%
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getBandBadgeColor(evaluation.criteria.coherenceCohesion.band)}`}>
                        Band {evaluation.criteria.coherenceCohesion.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {evaluation.criteria.coherenceCohesion.feedback}
                    </p>
                  </div>

                  {/* Criterion 3: Lexical Resource */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                          3. Lexical Resource (Từ Vựng)
                        </h4>
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                          25%
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getBandBadgeColor(evaluation.criteria.lexicalResource.band)}`}>
                        Band {evaluation.criteria.lexicalResource.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {evaluation.criteria.lexicalResource.feedback}
                    </p>
                  </div>

                  {/* Criterion 4: Grammatical Range & Accuracy */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-600" />
                        <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                          4. Grammatical Range &amp; Accuracy
                        </h4>
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                          25%
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getBandBadgeColor(evaluation.criteria.grammaticalRange.band)}`}>
                        Band {evaluation.criteria.grammaticalRange.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {evaluation.criteria.grammaticalRange.feedback}
                    </p>
                  </div>
                </div>

                {/* Score Formula Footnote */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-600 flex items-center justify-between">
                  <span>
                    Công thức tính điểm Task: <strong className="text-stone-800 font-mono">round0.5((TA + CC + LR + GRA) / 4)</strong>
                  </span>
                  <span className="text-stone-500">Mỗi tiêu chí có trọng số 25%</span>
                </div>
              </div>
            )}

            {/* Tab 2: Specific Check (Task 1: Data Accuracy Check | Task 2: Structure & Argument Audit) */}
            {activeTab === 'dataCheck' && (
              <div className="space-y-5">
                {isTask1 ? (
                  /* Task 1: Data Accuracy Audit */
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          evaluation.dataAccuracyCheck?.status === 'PASS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : evaluation.dataAccuracyCheck?.status === 'WARNING'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <ShieldCheck size={22} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                            <span>Đối Chiếu Số Liệu Bài Viết Với Biểu Đồ Gốc</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              evaluation.dataAccuracyCheck?.status === 'PASS'
                                ? 'bg-emerald-100 text-emerald-800'
                                : evaluation.dataAccuracyCheck?.status === 'WARNING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {evaluation.dataAccuracyCheck?.status === 'PASS'
                                ? 'CHÍNH XÁC (PASS)'
                                : evaluation.dataAccuracyCheck?.status === 'WARNING'
                                ? 'CÓ CHI TIẾT CẦN LƯU Ý (WARNING)'
                                : 'SAI LỆCH SỐ LIỆU (FAIL)'}
                            </span>
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">
                            Dạng biểu đồ: <strong className="text-stone-800 capitalize">{chartType || 'Standard Chart'}</strong> • AI đối chiếu từng số liệu trích xuất so với dữ liệu thực tế
                          </p>
                        </div>
                      </div>

                      {evaluation.dataAccuracyCheck?.accuracyScore !== undefined && (
                        <div className="flex items-baseline gap-1 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
                          <span className="text-[10px] text-stone-500 font-semibold uppercase">Độ chuẩn xác:</span>
                          <span className="text-base font-bold text-[#064E3B]">
                            {evaluation.dataAccuracyCheck.accuracyScore.toFixed(1)}
                          </span>
                          <span className="text-[10px] text-stone-400">/ 9.0</span>
                        </div>
                      )}
                    </div>

                    {/* Summary notice */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                      <strong>Tổng kết đối chiếu:</strong> {evaluation.dataAccuracyCheck?.summary || 'AI đã rà soát toàn bộ các mốc số liệu, tỷ lệ phần trăm và đối chiếu với bảng số liệu gốc của đề.'}
                    </div>

                    {/* Verifications table */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                        Chi Tiết Các Mốc Số Liệu Đã Được Xác Minh:
                      </h5>

                      {evaluation.dataAccuracyCheck?.verifications && evaluation.dataAccuracyCheck.verifications.length > 0 ? (
                        evaluation.dataAccuracyCheck.verifications.map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border shadow-xs space-y-2 bg-white ${
                              item.isAccurate ? 'border-emerald-200' : 'border-red-200 bg-red-50/20'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-stone-700">Mốc kiểm tra #{idx + 1}</span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.isAccurate
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {item.isAccurate ? (
                                  <>
                                    <CheckCircle2 size={12} />
                                    <span>Khớp số liệu gốc</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle size={12} />
                                    <span>Sai lệch số liệu</span>
                                  </>
                                )}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                                <span className="text-[10px] text-stone-500 font-bold block mb-0.5">Số liệu bạn viết trong bài:</span>
                                <span className="text-stone-900 font-medium italic">"{item.claimInEssay}"</span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200">
                                <span className="text-[10px] text-emerald-800 font-bold block mb-0.5">Số liệu thực tế trong đề:</span>
                                <span className="text-emerald-950 font-medium">"{item.chartDataRef}"</span>
                              </div>
                            </div>

                            <p className="text-xs text-stone-600 pl-1">
                              <strong>Nhận xét:</strong> {item.comment}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs text-stone-500 text-center">
                          Không phát hiện số liệu nào bị sai lệch nghiêm trọng.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Task 2: Essay Structure & Argument Audit */
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-[#064E3B]" />
                          <h4 className="text-sm font-bold text-stone-900">
                            Phân Tích Cấu Trúc Lập Luận &amp; Luận Điểm (Thesis Statement)
                          </h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Dạng bài: {evaluation.essayStructureCheck?.detectedSubtype || questionType || 'Opinion / Discussion'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                          <span className="text-stone-500 font-bold block text-[11px]">Luận điểm xuyên suốt (Thesis Consistency):</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                            evaluation.essayStructureCheck?.hasClearThesis
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {evaluation.essayStructureCheck?.hasClearThesis ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
                            {evaluation.essayStructureCheck?.thesisConsistency || 'Nhất quán từ Mở bài đến Kết bài'}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                          <span className="text-stone-500 font-bold block text-[11px]">Mạch tiến triển ý (Argument Progression):</span>
                          <span className="text-stone-800 font-medium block">
                            {evaluation.essayStructureCheck?.argumentProgression || 'Ý tưởng phát triển logic, có phân chia luận điểm rõ ràng'}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-stone-700 leading-relaxed">
                        <strong className="text-[#064E3B] block mb-1">Đánh giá chuyên sâu từ Giám khảo:</strong>
                        {evaluation.essayStructureCheck?.feedback || 'Bài viết đã đáp ứng tốt cấu trúc lập luận đặc trưng của dạng bài này, đưa ra được quan điểm rõ ràng và phát triển các nhánh ý phụ hợp lý.'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Sentence Corrections */}
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

            {/* Tab 4: Model Answer */}
            {activeTab === 'model' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#064E3B]" />
                    <h4 className="text-sm font-bold text-stone-900">
                      Bài Viết Tham Khảo Band 8.5+ Chuẩn Học Thuật
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

            {/* Tab 5: IELTS Composite Writing Band Calculator */}
            {activeTab === 'calculator' && (
              <div className="space-y-5">
                {/* Official Formula Card */}
                <div className="bg-[#064E3B] text-white p-5 rounded-2xl border border-emerald-800 shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-amber-400" />
                      <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                        Công Thức Tính Điểm Tổng Hợp IELTS Writing Chính Thức
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900">
                      IELTS Official Rules
                    </span>
                  </div>

                  {/* Math Formula Display */}
                  <div className="p-4 rounded-xl bg-black/25 border border-emerald-700/50 text-center font-serif text-lg sm:text-xl tracking-wider text-amber-200">
                    Writing Band = round<sub>0.5</sub> <span className="text-xl sm:text-2xl font-bold">( (T1 + 2 &times; T2) / 3 )</span>
                  </div>

                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Theo quy chuẩn khảo thí IELTS chính thức của Cambridge &amp; IDP: <strong>Điểm Task 2 chiếm 2/3 tổng điểm (gấp đôi trọng số Task 1)</strong>. Sau khi tính trung bình theo trọng số, điểm được làm tròn đến mốc 0.5 gần nhất (phần thập phân &lt; .25 làm tròn xuống, từ .25 đến .74 thành .5, và &ge; .75 làm tròn lên).
                  </p>
                </div>

                {/* Interactive Simulator */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-5">
                  <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Mô Phỏng Tính Điểm Tổng Hợp Trực Tuyến:
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Task 1 Slider */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-700">Task 1 Band (Trọng số 1x):</span>
                        <span className="text-base font-bold text-[#064E3B]">{calcT1.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="4.0"
                        max="9.0"
                        step="0.5"
                        value={calcT1}
                        onChange={(e) => setCalcT1(parseFloat(e.target.value))}
                        className="w-full accent-[#064E3B] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-stone-400">
                        <span>Band 4.0</span>
                        <span>Band 6.5</span>
                        <span>Band 9.0</span>
                      </div>
                    </div>

                    {/* Task 2 Slider */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-700">Task 2 Band (Trọng số 2x):</span>
                        <span className="text-base font-bold text-[#D97706]">{calcT2.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="4.0"
                        max="9.0"
                        step="0.5"
                        value={calcT2}
                        onChange={(e) => setCalcT2(parseFloat(e.target.value))}
                        className="w-full accent-[#D97706] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-stone-400">
                        <span>Band 4.0</span>
                        <span>Band 6.5</span>
                        <span>Band 9.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculated Outcome */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-stone-600 block">
                        Phép tính: ({calcT1} + 2 &times; {calcT2}) / 3 = <strong className="text-stone-900 font-mono">{rawWeighted.toFixed(3)}</strong>
                      </span>
                      <span className="text-xs text-stone-500">
                        Làm tròn theo quy tắc khảo thí 0.5 gần nhất
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-stone-600 uppercase">Writing Band Tổng:</span>
                      <span className="text-3xl font-serif font-bold text-[#064E3B]">
                        {calculatedComposite.toFixed(1)}
                      </span>
                      <span className="text-xs text-stone-400">/ 9.0</span>
                    </div>
                  </div>
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
