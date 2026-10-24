// frontend/src/modules/writing/WritingEvaluationModal.tsx
// Modal hiển thị kết quả chấm điểm Writing của Giám khảo AI Senior Examiner chuẩn quốc tế
// Tích hợp: 
// 1. Chữa bài trực quan ngay trên văn bản (Inline Highlighting & 1-Click Replace)
// 2. Bảng phân tích chỉ số học thuật chuyên sâu (Sentence Complexity, Overused Words, Synonyms)
// 3. Bộ kiểm tra cấu trúc từng đoạn văn (Paragraph Structure Audit)
// 4. Bốn tiêu chí chuẩn IELTS 25% mỗi tiêu chí
// 5. Đối chiếu số liệu gốc Task 1 & Lập trường Thesis Task 2
// 6. Tính điểm Writing tổng hợp (Composite Band Calculator)
// 7. Chế độ Viết lại lần 2 (Rewrite v2 & Version Tracking)

import React, { useState, useEffect } from 'react';
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
  BarChart3,
  Layers,
  Edit3,
  Lightbulb,
  CheckCheck,
} from 'lucide-react';

export interface SentenceCorrectionItem {
  original: string;
  corrected: string;
  explanation: string;
  type?: 'grammar' | 'vocabulary' | 'cohesion';
  applied?: boolean;
}

export interface WritingEvaluationResult {
  overallBand: number;
  criteria: {
    taskAchievement: { band: number; feedback: string };
    coherenceCohesion: { band: number; feedback: string };
    lexicalResource: { band: number; feedback: string };
    grammaticalRange: { band: number; feedback: string };
  };
  dataAccuracyCheck?: {
    status: 'PASS' | 'WARNING' | 'FAIL' | 'NOT_CHECKED';
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
  academicAnalytics?: {
    sentenceComplexity: {
      totalSentences: number;
      simpleCount: number;
      compoundCount: number;
      complexCount: number;
      simplePct: number;
      compoundPct: number;
      complexPct: number;
      feedback: string;
    };
    overusedWords: {
      word: string;
      count: number;
      suggestedSynonyms: string[];
    }[];
    paragraphAudit?: {
      paragraphIndex: number;
      paragraphType: string;
      wordCount: number;
      assessment: 'good' | 'warning';
      comment: string;
    }[];
  };
  paragraphAudit?: {
    paragraphIndex: number;
    paragraphType: string;
    wordCount: number;
    assessment: 'good' | 'warning';
    comment: string;
  }[];
  compositeScore?: {
    task1Band: number;
    task2Band: number;
    compositeBand: number;
    formula: string;
  };
  overview: string;
  sentenceCorrections: SentenceCorrectionItem[];
  modelAnswer: string;
}

interface WritingEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: WritingEvaluationResult | null;
  taskType: 'task1' | 'task2';
  taskTitle: string;
  initialEssayContent: string;
  wordCount: number;
  timeSpentSeconds: number;
  chartType?: string;
  questionType?: string;
  version?: number;
  previousVersionBand?: number | null;
  onApplyCorrection?: (originalText: string, replacementText: string) => void;
  onStartRewrite?: (revisedContent: string) => void;
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
  initialEssayContent,
  wordCount,
  timeSpentSeconds,
  chartType,
  questionType,
  version = 1,
  previousVersionBand,
  onApplyCorrection,
  onStartRewrite,
}) => {
  const [copiedModel, setCopiedModel] = useState<boolean>(false);
  const [copiedSynonym, setCopiedSynonym] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inline' | 'analytics' | 'structure' | 'criteria' | 'dataCheck' | 'model' | 'calculator'>('inline');

  // Live updated essay content as corrections are applied
  const [liveEssayContent, setLiveEssayContent] = useState<string>(initialEssayContent);
  const [appliedCorrections, setAppliedCorrections] = useState<Record<string, boolean>>({});
  const [selectedCorrection, setSelectedCorrection] = useState<SentenceCorrectionItem | null>(null);

  // W-04: Only sync when modal transitions to open (isOpen === true)
  // This prevents resetting appliedCorrections when parent state updates via onApplyCorrection
  useEffect(() => {
    if (isOpen) {
      setLiveEssayContent(initialEssayContent);
      setAppliedCorrections({});
      setSelectedCorrection(null);
    }
  }, [isOpen]);

  // Interactive Composite Calculator State
  const [calcT1, setCalcT1] = useState<number>(() => (taskType === 'task1' && evaluation ? evaluation.overallBand : 6.5));
  const [calcT2, setCalcT2] = useState<number>(() => (taskType === 'task2' && evaluation ? evaluation.overallBand : 6.5));

  if (!isOpen || !evaluation) return null;

  const isTask1 = taskType === 'task1';
  const rawWeighted = (calcT1 + 2 * calcT2) / 3;
  const calculatedComposite = roundIeltsBand(rawWeighted);

  // Apply a 1-click sentence correction
  const handleApplySingleCorrection = (item: SentenceCorrectionItem) => {
    if (!item.original || !item.corrected) return;

    if (liveEssayContent.includes(item.original)) {
      const newText = liveEssayContent.replace(item.original, item.corrected);
      setLiveEssayContent(newText);
      setAppliedCorrections((prev) => ({ ...prev, [item.original]: true }));
      if (onApplyCorrection) {
        onApplyCorrection(item.original, item.corrected);
      }
    } else {
      // Nếu không khớp chuỗi chính xác 100%, thử replace case-insensitive
      const re = new RegExp(item.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      if (re.test(liveEssayContent)) {
        const newText = liveEssayContent.replace(re, item.corrected);
        setLiveEssayContent(newText);
        setAppliedCorrections((prev) => ({ ...prev, [item.original]: true }));
        if (onApplyCorrection) {
          onApplyCorrection(item.original, item.corrected);
        }
      }
    }
  };

  const handleCopyModel = async () => {
    try {
      await navigator.clipboard.writeText(evaluation.modelAnswer);
      setCopiedModel(true);
      setTimeout(() => setCopiedModel(false), 2000);
    } catch (e) {
      console.warn('Không thể copy:', e);
    }
  };

  const handleCopyWord = async (w: string) => {
    try {
      await navigator.clipboard.writeText(w);
      setCopiedSynonym(w);
      setTimeout(() => setCopiedSynonym(null), 1500);
    } catch (e) {
      console.warn(e);
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

  // Rewrite V2 action
  const handleTriggerRewrite = () => {
    if (onStartRewrite) {
      onStartRewrite(liveEssayContent);
    }
    onClose();
  };

  const analytics = evaluation.academicAnalytics;
  const paragraphAudit = evaluation.paragraphAudit || analytics?.paragraphAudit || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-5xl bg-[#FAFAF9] border border-stone-300 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-[#064E3B] text-white px-6 py-4 sm:py-5 flex items-center justify-between shrink-0 border-b border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30 shrink-0">
                <Award size={20} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                    Kết Quả Đánh Giá IELTS Writing Senior Examiner
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900">
                    IELTS 9.0
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-700/60 text-emerald-100 border border-emerald-500/30">
                    {isTask1 ? `Task 1 • ${chartType?.toUpperCase() || 'REPORT'}` : `Task 2 • ${questionType || 'ESSAY'}`}
                  </span>
                  {version > 1 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-900">
                      Phiên bản V{version}
                    </span>
                  )}
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

          {/* Subheader: Score Ribbon & Rewrite Progress */}
          <div className="bg-white border-b border-stone-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  {isTask1 ? 'Task 1 Band:' : 'Task 2 Band:'}
                </span>
                <span className="text-3xl font-serif font-bold text-[#064E3B]">
                  {evaluation.overallBand.toFixed(1)}
                </span>
                <span className="text-xs text-stone-400">/ 9.0</span>
              </div>

              {previousVersionBand !== undefined && previousVersionBand !== null && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <TrendingUp size={14} className="text-emerald-700" />
                  <span className="text-stone-600">V1: Band {previousVersionBand.toFixed(1)}</span>
                  <ArrowRight size={12} className="text-stone-400" />
                  <span className="font-bold text-[#064E3B]">
                    V{version}: Band {evaluation.overallBand.toFixed(1)}
                  </span>
                  <span className="font-bold text-emerald-700">
                    ({evaluation.overallBand - previousVersionBand >= 0 ? `+${(evaluation.overallBand - previousVersionBand).toFixed(1)}` : (evaluation.overallBand - previousVersionBand).toFixed(1)})
                  </span>
                </div>
              )}

              <div className="h-6 w-px bg-stone-200 hidden sm:block" />

              <div className="text-xs text-stone-600 flex items-center gap-3">
                <span>Số từ: <strong className="text-stone-900">{wordCount} từ</strong></span>
                <span>Thời gian: <strong className="text-stone-900">{formatMinutes(timeSpentSeconds)}</strong></span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('inline')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'inline'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Edit3 size={13} className="text-[#064E3B]" />
                <span>Chữa Bài Trực Quan</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">
                  {evaluation.sentenceCorrections?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'analytics'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BarChart3 size={13} className="text-indigo-600" />
                <span>Chỉ Số Học Thuật</span>
              </button>

              <button
                onClick={() => setActiveTab('structure')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'structure'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers size={13} className="text-amber-700" />
                <span>Cấu Trúc Từng Đoạn</span>
              </button>

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
                  </>
                ) : (
                  <>
                    <FileText size={13} className="text-indigo-700" />
                    <span>Thesis &amp; Lập Luận</span>
                  </>
                )}
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
            {/* TAB 1: Chữa bài trực quan ngay trên văn bản (Inline Highlighting & 1-Click Replace) */}
            {activeTab === 'inline' && (
              <div className="space-y-5">
                {/* Instruction banner */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/90 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-amber-700 shrink-0" />
                    <span>
                      <strong>Chữa bài tương tác nhiều lớp:</strong> Bấm vào bất kỳ câu được gạch chân để xem lỗi và bấm <strong>"Áp dụng sửa ngay"</strong> để thay thế trực tiếp vào bài viết.
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Lỗi ngữ pháp
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Từ vựng / Collocation
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Liên kết ý Cohesion
                    </span>
                  </div>
                </div>

                {/* Two Column Layout: Left Essay Text with Highlights, Right Inspector Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Left Column: Interactive Essay Body */}
                  <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                      <span className="font-bold uppercase tracking-wider text-stone-700">
                        Văn Bản Bài Viết Của Bạn (Tương tác trực tiếp)
                      </span>
                      <span>{liveEssayContent.split(/\s+/).filter(Boolean).length} từ</span>
                    </div>

                    <div className="font-serif text-sm leading-relaxed text-stone-800 space-y-4 select-text">
                      {liveEssayContent.split(/\n+/).map((para, pIdx) => {
                        if (!para.trim()) return null;

                        // Check if paragraph contains any corrections
                        return (
                          <p key={pIdx} className="leading-7">
                            {(() => {
                              let segments: Array<{ text: string; correction?: SentenceCorrectionItem }> = [
                                { text: para },
                              ];

                              (evaluation.sentenceCorrections || []).forEach((sc) => {
                                const newSegments: typeof segments = [];
                                segments.forEach((seg) => {
                                  if (seg.correction) {
                                    newSegments.push(seg);
                                    return;
                                  }

                                  const searchTarget = appliedCorrections[sc.original] ? sc.corrected : sc.original;
                                  const idx = seg.text.indexOf(searchTarget);
                                  if (idx !== -1) {
                                    const before = seg.text.substring(0, idx);
                                    const match = seg.text.substring(idx, idx + searchTarget.length);
                                    const after = seg.text.substring(idx + searchTarget.length);

                                    if (before) newSegments.push({ text: before });
                                    newSegments.push({ text: match, correction: sc });
                                    if (after) newSegments.push({ text: after });
                                  } else {
                                    newSegments.push(seg);
                                  }
                                });
                                segments = newSegments;
                              });

                              return segments.map((seg, sIdx) => {
                                if (!seg.correction) {
                                  return <span key={sIdx}>{seg.text}</span>;
                                }

                                const sc = seg.correction;
                                const isApplied = appliedCorrections[sc.original];
                                const isSelected = selectedCorrection?.original === sc.original;

                                let highlightClasses = '';
                                if (isApplied) {
                                  highlightClasses = 'bg-emerald-100/90 text-emerald-950 border-b-2 border-emerald-500 font-medium';
                                } else if (sc.type === 'grammar') {
                                  highlightClasses = 'bg-red-100/90 text-red-950 border-b-2 border-red-500 hover:bg-red-200 cursor-pointer';
                                } else if (sc.type === 'vocabulary') {
                                  highlightClasses = 'bg-amber-100/90 text-amber-950 border-b-2 border-amber-500 hover:bg-amber-200 cursor-pointer';
                                } else {
                                  highlightClasses = 'bg-blue-100/90 text-blue-950 border-b-2 border-blue-500 hover:bg-blue-200 cursor-pointer';
                                }

                                return (
                                  <span
                                    key={sIdx}
                                    onClick={() => setSelectedCorrection(sc)}
                                    className={`px-1.5 py-0.5 rounded transition-all inline-block my-0.5 ${highlightClasses} ${
                                      isSelected ? 'ring-2 ring-emerald-600' : ''
                                    }`}
                                    title="Bấm để xem gợi ý sửa lỗi"
                                  >
                                    {seg.text}
                                    {isApplied && (
                                      <CheckCheck size={12} className="inline ml-1 text-emerald-700" />
                                    )}
                                  </span>
                                );
                              });
                            })()}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Inspector Card / Correction Details */}
                  <div className="lg:col-span-5 space-y-4">
                    {selectedCorrection ? (
                      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4 sticky top-4">
                        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              selectedCorrection.type === 'grammar'
                                ? 'bg-red-100 text-red-800'
                                : selectedCorrection.type === 'vocabulary'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {selectedCorrection.type === 'grammar'
                              ? '🔴 Lỗi Ngữ Pháp'
                              : selectedCorrection.type === 'vocabulary'
                              ? '🟡 Nâng Cấp Từ Vựng'
                              : '🔵 Liên Kết Ý Cohesion'}
                          </span>

                          {appliedCorrections[selectedCorrection.original] ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 size={13} />
                              Đã áp dụng
                            </span>
                          ) : (
                            <span className="text-[11px] text-stone-500">Chưa sửa</span>
                          )}
                        </div>

                        {/* Original clause */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider block">
                            Câu gốc của bạn:
                          </span>
                          <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/80 text-xs text-stone-800 italic">
                            "{selectedCorrection.original}"
                          </div>
                        </div>

                        {/* Corrected Band 8.0+ */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-[#064E3B] uppercase tracking-wider block">
                            Gợi ý nâng cấp Band 8.0+:
                          </span>
                          <div className="p-3 rounded-xl bg-emerald-50/90 border border-emerald-300 text-xs font-medium text-stone-900">
                            "{selectedCorrection.corrected}"
                          </div>
                        </div>

                        {/* Pedagogic Explanation */}
                        <div className="space-y-1 text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                          <strong className="text-stone-800 block mb-0.5">Lý do điều chỉnh:</strong>
                          {selectedCorrection.explanation}
                        </div>

                        {/* 1-Click Replace CTA Button */}
                        {!appliedCorrections[selectedCorrection.original] ? (
                          <button
                            onClick={() => handleApplySingleCorrection(selectedCorrection)}
                            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-[#064E3B] hover:bg-[#043327] text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <CheckCheck size={15} />
                            <span>Áp Dụng Sửa Ngay (1-Click Replace)</span>
                          </button>
                        ) : (
                          <div className="w-full py-2 px-3 rounded-xl text-center text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            ✓ Câu đã được thay thế vào bài viết
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white p-6 rounded-2xl border border-dashed border-stone-300 text-center text-xs text-stone-500 space-y-2">
                        <Lightbulb size={24} className="mx-auto text-amber-500/80" />
                        <p className="font-semibold text-stone-700">Chọn một câu gạch chân bên trái</p>
                        <p className="text-[11px] text-stone-500 leading-relaxed">
                          Bấm vào câu có gạch chân màu đỏ, vàng hoặc xanh để xem phân tích chi tiết và áp dụng sửa nhanh chỉ với 1 cú click.
                        </p>
                      </div>
                    )}

                    {/* Quick overview of all corrections */}
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2.5">
                      <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                        Danh Sách Điểm Sửa Trong Bài ({evaluation.sentenceCorrections?.length || 0}):
                      </h5>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs pr-1">
                        {(evaluation.sentenceCorrections || []).map((sc, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedCorrection(sc)}
                            className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 ${
                              selectedCorrection?.original === sc.original
                                ? 'bg-emerald-50 border-emerald-400'
                                : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            <span className="truncate text-stone-700 text-[11px] max-w-[200px]">
                              #{idx + 1}: {sc.original}
                            </span>
                            {appliedCorrections[sc.original] ? (
                              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            ) : (
                              <span className="text-[10px] text-stone-400 shrink-0">Xem</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Chỉ Số Học Thuật (Deep Academic Analytics) */}
            {activeTab === 'analytics' && analytics && (
              <div className="space-y-6">
                {/* 1. Sentence Complexity Meter */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={18} className="text-[#064E3B]" />
                      <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                        Đo Lường Cấu Trúc Câu (Sentence Complexity Meter)
                      </h4>
                    </div>
                    <span className="text-xs text-stone-500">
                      Tổng số câu: <strong className="text-stone-900">{analytics.sentenceComplexity.totalSentences} câu</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    {/* Simple sentences */}
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="text-[11px] font-bold text-stone-500 uppercase">Câu Đơn (Simple)</span>
                      <div className="text-xl font-bold font-mono text-stone-700">
                        {analytics.sentenceComplexity.simplePct}%
                      </div>
                      <span className="text-[10px] text-stone-400">{analytics.sentenceComplexity.simpleCount} câu</span>
                    </div>

                    {/* Compound sentences */}
                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                      <span className="text-[11px] font-bold text-blue-700 uppercase">Câu Ghép (Compound)</span>
                      <div className="text-xl font-bold font-mono text-blue-900">
                        {analytics.sentenceComplexity.compoundPct}%
                      </div>
                      <span className="text-[10px] text-blue-600">{analytics.sentenceComplexity.compoundCount} câu</span>
                    </div>

                    {/* Complex sentences */}
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase">Câu Phức (Complex)</span>
                      <div className="text-xl font-bold font-mono text-[#064E3B]">
                        {analytics.sentenceComplexity.complexPct}%
                      </div>
                      <span className="text-[10px] text-emerald-700">{analytics.sentenceComplexity.complexCount} câu</span>
                    </div>
                  </div>

                  {/* Multi-segmented Progress Bar */}
                  <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex shadow-inner">
                    <div style={{ width: `${analytics.sentenceComplexity.simplePct}%` }} className="bg-stone-400" title="Câu đơn" />
                    <div style={{ width: `${analytics.sentenceComplexity.compoundPct}%` }} className="bg-blue-500" title="Câu ghép" />
                    <div style={{ width: `${analytics.sentenceComplexity.complexPct}%` }} className="bg-emerald-600" title="Câu phức" />
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                    <strong>Đánh giá của Giám khảo:</strong> {analytics.sentenceComplexity.feedback}
                  </div>
                </div>

                {/* 2. Overused Words & Academic Synonyms */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-amber-600" />
                      <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                        Cảnh Báo Từ Bị Lặp &amp; Gợi Ý Từ Đồng Nghĩa Học Thuật C1/C2
                      </h4>
                    </div>
                    <span className="text-xs text-stone-500">
                      Phát hiện: <strong className="text-stone-900">{analytics.overusedWords?.length || 0} từ</strong>
                    </span>
                  </div>

                  {analytics.overusedWords && analytics.overusedWords.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-stone-200 text-stone-500 bg-stone-50">
                            <th className="py-2.5 px-3">Từ trong bài</th>
                            <th className="py-2.5 px-3 text-center">Tần suất dùng</th>
                            <th className="py-2.5 px-3">Gợi ý từ đồng nghĩa C1/C2 (Bấm để copy)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analytics.overusedWords.map((item, idx) => (
                            <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50/50">
                              <td className="py-2.5 px-3 font-bold text-red-700">
                                {item.word}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-stone-800">
                                {item.count} lần
                              </td>
                              <td className="py-2.5 px-3">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {item.suggestedSynonyms.map((syn, sIdx) => (
                                    <button
                                      key={sIdx}
                                      onClick={() => handleCopyWord(syn)}
                                      className="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] border border-emerald-200 text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                                      title="Bấm để sao chép từ này"
                                    >
                                      <span>{syn}</span>
                                      {copiedSynonym === syn && (
                                        <Check size={10} className="text-emerald-700" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 text-center font-medium">
                      ✓ Rất tốt! Bạn không bị lặp các từ vựng cơ bản quá nhiều lần.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: Cấu Trúc Từng Đoạn (Paragraph Structure Audit) */}
            {activeTab === 'structure' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                    <Layers size={18} className="text-[#064E3B]" />
                    <span>Kiểm Tra Cấu Trúc Chi Tiết Từng Đoạn Văn</span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Hệ thống phân tích từng khối đoạn văn ({paragraphAudit.length} đoạn) để đảm bảo đáp ứng tiêu chuẩn bố cục của IELTS {isTask1 ? 'Task 1' : 'Task 2'}.
                  </p>
                </div>

                <div className="space-y-3">
                  {paragraphAudit.map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border shadow-xs space-y-2 bg-white ${
                        p.assessment === 'good' ? 'border-emerald-200' : 'border-amber-200 bg-amber-50/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white flex items-center justify-center font-bold text-[10px]">
                            {p.paragraphIndex}
                          </span>
                          <strong className="text-stone-800 text-sm">{p.paragraphType}</strong>
                          <span className="text-stone-400">({p.wordCount} từ)</span>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.assessment === 'good'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.assessment === 'good' ? '✓ Đạt chuẩn' : '⚠ Cần cải thiện'}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed pl-7">
                        {p.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: 4 Core Criteria (Each 25%) */}
            {activeTab === 'criteria' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-stone-800">
                  <div className="flex items-center gap-2 text-[#064E3B] font-bold text-sm mb-1.5">
                    <TrendingUp size={16} />
                    <span>Nhận xét tổng quan của Giám khảo IELTS</span>
                  </div>
                  <p className="text-sm leading-relaxed text-stone-700">
                    {evaluation.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Task Achievement */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
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

                  {/* Coherence & Cohesion */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
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

                  {/* Lexical Resource */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
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

                  {/* Grammatical Range & Accuracy */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
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
              </div>
            )}

            {/* TAB 5: Task 1 Data Accuracy / Task 2 Structure Audit */}
            {activeTab === 'dataCheck' && (
              <div className="space-y-5">
                {isTask1 ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            evaluation.dataAccuracyCheck?.status === 'PASS'
                              ? 'bg-emerald-100 text-emerald-800'
                              : evaluation.dataAccuracyCheck?.status === 'WARNING'
                              ? 'bg-amber-100 text-amber-800'
                              : evaluation.dataAccuracyCheck?.status === 'NOT_CHECKED'
                              ? 'bg-stone-200 text-stone-700'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <ShieldCheck size={22} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                            <span>Đối Chiếu Số Liệu Bài Viết Với Biểu Đồ Gốc</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                evaluation.dataAccuracyCheck?.status === 'PASS'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : evaluation.dataAccuracyCheck?.status === 'WARNING'
                                  ? 'bg-amber-100 text-amber-800'
                                  : evaluation.dataAccuracyCheck?.status === 'NOT_CHECKED'
                                  ? 'bg-stone-200 text-stone-700'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {evaluation.dataAccuracyCheck?.status === 'PASS'
                                ? 'CHÍNH XÁC (PASS)'
                                : evaluation.dataAccuracyCheck?.status === 'WARNING'
                                ? 'CÓ CHI TIẾT CẦN LƯU Ý (WARNING)'
                                : evaluation.dataAccuracyCheck?.status === 'NOT_CHECKED'
                                ? 'CHƯA ĐỐI SOÁT (KHÔNG CÓ DỮ LIỆU BIỂU ĐỒ GỐC)'
                                : 'SAI LỆCH SỐ LIỆU (FAIL)'}
                            </span>
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">
                            Dạng biểu đồ: <strong className="text-stone-800 capitalize">{chartType || 'Standard Chart'}</strong>
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

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                      <strong>Tổng kết đối chiếu:</strong> {evaluation.dataAccuracyCheck?.summary}
                    </div>

                    <div className="space-y-3">
                      {(evaluation.dataAccuracyCheck?.verifications || []).map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border shadow-xs space-y-2 bg-white ${
                            item.isAccurate ? 'border-emerald-200' : 'border-red-200 bg-red-50/20'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-stone-700">Mốc kiểm tra #{idx + 1}</span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.isAccurate ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.isAccurate ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                              <span>{item.isAccurate ? 'Khớp số liệu gốc' : 'Sai lệch số liệu'}</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                              <span className="text-[10px] text-stone-500 font-bold block mb-0.5">Số liệu bạn viết:</span>
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
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-[#064E3B]" />
                          <h4 className="text-sm font-bold text-stone-900">
                            Phân Tích Cấu Trúc Lập Luận &amp; Thesis Statement
                          </h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {evaluation.essayStructureCheck?.detectedSubtype || questionType || 'Opinion / Discussion'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                          <span className="text-stone-500 font-bold block text-[11px]">Luận điểm xuyên suốt:</span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                              evaluation.essayStructureCheck?.hasClearThesis
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {evaluation.essayStructureCheck?.hasClearThesis ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
                            {evaluation.essayStructureCheck?.thesisConsistency || 'Nhất quán từ Mở bài đến Kết bài'}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                          <span className="text-stone-500 font-bold block text-[11px]">Mạch tiến triển ý:</span>
                          <span className="text-stone-800 font-medium block">
                            {evaluation.essayStructureCheck?.argumentProgression || 'Ý tưởng phát triển logic, có phân chia luận điểm rõ ràng'}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-stone-700 leading-relaxed">
                        <strong className="text-[#064E3B] block mb-1">Đánh giá chuyên sâu từ Giám khảo:</strong>
                        {evaluation.essayStructureCheck?.feedback}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: Model Answer */}
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

            {/* TAB 7: IELTS Composite Band Calculator */}
            {activeTab === 'calculator' && (
              <div className="space-y-5">
                <div className="bg-[#064E3B] text-white p-5 rounded-2xl border border-emerald-800 shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-amber-400" />
                      <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                        Công Thức Tính Điểm Tổng Hợp IELTS Writing Chính Thức
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900">
                      Official IELTS
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/25 border border-emerald-700/50 text-center font-serif text-lg sm:text-xl tracking-wider text-amber-200">
                    Writing Band = round<sub>0.5</sub> <span className="text-xl sm:text-2xl font-bold">( (T1 + 2 &times; T2) / 3 )</span>
                  </div>

                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Theo quy chuẩn khảo thí IELTS chính thức của Cambridge &amp; IDP: <strong>Điểm Task 2 chiếm 2/3 tổng điểm (gấp đôi trọng số Task 1)</strong>. Sau khi tính trung bình theo trọng số, điểm được làm tròn đến mốc 0.5 gần nhất.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-700">Task 1 Band (1x):</span>
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
                    </div>

                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-700">Task 2 Band (2x):</span>
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
                    </div>
                  </div>

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

          {/* Footer: Rewrite V2 Action & Close */}
          <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-stone-500 flex items-center gap-2">
              <span>Đã sửa <strong>{Object.keys(appliedCorrections).length}</strong> câu trực tiếp</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Rewrite V2 CTA */}
              <button
                onClick={handleTriggerRewrite}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-stone-900 shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                title="Tải bài viết đã sửa vào editor để viết lại lần 2 và nâng band"
              >
                <Edit3 size={14} />
                <span>✍️ Viết Lại Bài Này (Rewrite V{version + 1})</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#064E3B] hover:bg-[#043327] text-white shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Hoàn tất &amp; Đóng</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
