// frontend/src/modules/writing/WritingWorkspace.tsx
// Phòng Luyện Viết tập trung (Split-Screen Writing Studio) tích hợp AI Examiner
// Tích hợp: 
// 1. Chữa bài trực quan ngay trên văn bản (Inline Highlighting & 1-Click Replace)
// 2. Bảng phân tích chỉ số học thuật chuyên sâu (Sentence Complexity, Overused Words, Synonyms)
// 3. Bộ kiểm tra cấu trúc từng đoạn văn (Paragraph Structure Audit)
// 4. Bốn tiêu chí chuẩn IELTS 25% mỗi tiêu chí
// 5. Đối chiếu số liệu gốc Task 1 & Lập trường Thesis Task 2
// 6. Tính điểm Writing tổng hợp (Composite Band Calculator)
// 7. Chế độ Viết lại lần 2 (Rewrite v2 & Version Tracking)
// 8. Lịch sử bài viết phân tách riêng biệt cho từng người dùng

import React, { useState, useEffect } from 'react';
import {
  PenTool,
  Clock,
  Play,
  Pause,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  PlusCircle,
  X,
  History,
  Sparkles,
  BookOpen,
  Trash2,
  Edit3,
} from 'lucide-react';
import { mockWritingPrompts, WritingPrompt } from '../../data/mockWritingSpeakingPrompts';
import { useProStore } from '../pro/useProStore';
import { useAuth } from '../../context/AuthContext';
import { WritingEvaluationModal, WritingEvaluationResult } from './WritingEvaluationModal';

export interface WritingHistoryEntry {
  id: string;
  timestamp: string;
  taskType: 'task1' | 'task2';
  promptTitle: string;
  promptText: string;
  promptId?: string;
  chartType?: 'line' | 'bar' | 'pie' | 'table' | 'map' | 'process' | 'mixed';
  chartDetails?: any;
  essayContent: string;
  overallBand: number;
  wordCount: number;
  version: number;
  evaluationData: WritingEvaluationResult;
}

interface WritingWorkspaceProps {
  onNotify?: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const WritingWorkspace: React.FC<WritingWorkspaceProps> = ({ onNotify }) => {
  const { user } = useAuth();

  // Pro Store
  const isPro = useProStore((state) => state.isPro);
  const writingQuotaLeft = useProStore((state) => state.writingQuotaLeft);
  const consumeWritingQuota = useProStore((state) => state.consumeWritingQuota);
  const openUpgradeModal = useProStore((state) => state.openUpgradeModal);

  // Task & Prompt Selection
  const [selectedTaskType, setSelectedTaskType] = useState<'task1' | 'task2'>('task1');
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<WritingPrompt | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [customPromptInput, setCustomPromptInput] = useState<string>('');

  // Editor State & Version Tracking
  const [essayContent, setEssayContent] = useState<string>('');
  const [essayVersion, setEssayVersion] = useState<number>(1);
  const [previousVersionBand, setPreviousVersionBand] = useState<number | null>(null);
  const [isRewriteMode, setIsRewriteMode] = useState<boolean>(false);

  // Evaluation & Band Memory
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<WritingEvaluationResult | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);

  // Per-user Writing History
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<WritingHistoryEntry[]>([]);
  const historyStorageKey = user?.id ? `eng4u_writing_history_${user.id}` : 'eng4u_writing_history_guest';

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(historyStorageKey);
      if (stored) {
        setHistoryList(JSON.parse(stored));
      } else {
        setHistoryList([]);
      }
    } catch (e) {
      console.warn('Cannot parse history:', e);
    }
  }, [historyStorageKey]);

  // Timer State
  const defaultMinutes = selectedTaskType === 'task1' ? 20 : 40;
  const [secondsLeft, setSecondsLeft] = useState<number>(defaultMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Filtered prompts
  const currentPrompts = mockWritingPrompts.filter((p) => p.type === selectedTaskType);
  const currentPrompt = customPrompt || currentPrompts[activePromptIndex] || currentPrompts[0];

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (onNotify) onNotify('Hết thời gian làm bài quy định!', 'info');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft, onNotify]);

  // Reset timer & editor when switching task
  const handleTaskTypeChange = (type: 'task1' | 'task2') => {
    setSelectedTaskType(type);
    setActivePromptIndex(0);
    setCustomPrompt(null);
    setEssayVersion(1);
    setPreviousVersionBand(null);
    setIsRewriteMode(false);
    const newMins = type === 'task1' ? 20 : 40;
    setSecondsLeft(newMins * 60);
    setIsTimerRunning(false);
    setTimeSpent(0);
  };

  // Word Count Calculation
  const wordCount = essayContent.trim() ? essayContent.trim().split(/\s+/).filter(Boolean).length : 0;
  const targetWords = currentPrompt.minWords;
  const isWordCountMet = wordCount >= targetWords;

  // Formatting time display
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Handle Custom Prompt Submit
  const handleSaveCustomPrompt = () => {
    if (!customPromptInput.trim()) return;
    const newPrompt: WritingPrompt = {
      id: `custom-${Date.now()}`,
      type: selectedTaskType,
      title: 'Đề bài tùy chỉnh của bạn',
      prompt: customPromptInput.trim(),
      recommendedTimeMinutes: selectedTaskType === 'task1' ? 20 : 40,
      minWords: selectedTaskType === 'task1' ? 150 : 250,
    };
    setCustomPrompt(newPrompt);
    setIsCustomModalOpen(false);
    setCustomPromptInput('');
  };

  // 1-Click Apply Correction Handler
  const handleApplyCorrection = (original: string, replacement: string) => {
    setEssayContent((prev) => {
      if (prev.includes(original)) return prev.replace(original, replacement);
      const re = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      return prev.replace(re, replacement);
    });
    if (onNotify) onNotify('Đã áp dụng sửa câu vào bài viết!', 'success');
  };

  // Start Rewrite V2 Handler
  const handleStartRewrite = (revisedContent: string) => {
    setEssayContent(revisedContent);
    setPreviousVersionBand(evaluationResult?.overallBand || null);
    setEssayVersion((prev) => prev + 1);
    setIsRewriteMode(true);
    setIsTimerRunning(true);
    if (onNotify) {
      onNotify(`Đã nạp văn bản sửa! Bạn đang viết lại Phiên bản V${essayVersion + 1}.`, 'info');
    }
  };

  // Clear Writing History
  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm bài viết của tài khoản này?')) {
      localStorage.removeItem(historyStorageKey);
      setHistoryList([]);
      if (onNotify) onNotify('Đã xóa toàn bộ lịch sử viết bài.', 'info');
    }
  };

  // Load entry from history (W-05: Khôi phục đầy đủ prompt, chart và task)
  const handleLoadFromHistory = (entry: WritingHistoryEntry) => {
    setEssayContent(entry.essayContent);
    setSelectedTaskType(entry.taskType);
    setEvaluationResult(entry.evaluationData);
    setEssayVersion(entry.version || 1);

    // Phục hồi prompt gốc để chấm lại hoặc viết lại đúng ngữ cảnh
    if (entry.promptId) {
      const candidates = mockWritingPrompts.filter((p) => p.type === entry.taskType);
      const foundIdx = candidates.findIndex((p) => p.id === entry.promptId);
      if (foundIdx >= 0) {
        setActivePromptIndex(foundIdx);
        setCustomPrompt(null);
      } else {
        const restoredCustom: WritingPrompt = {
          id: entry.promptId || 'custom-loaded',
          type: entry.taskType,
          title: entry.promptTitle,
          prompt: entry.promptText,
          chartType: entry.chartType || 'bar',
          chartDetails: entry.chartDetails,
          recommendedTimeMinutes: entry.taskType === 'task1' ? 20 : 40,
          minWords: entry.taskType === 'task1' ? 150 : 250,
        };
        setCustomPrompt(restoredCustom);
      }
    }

    setIsHistoryDrawerOpen(false);
    setIsResultModalOpen(true);
    if (onNotify) onNotify(`Đã mở lại bài viết từ lịch sử (${entry.timestamp}).`, 'info');
  };

  // Submission to AI Grading Backend
  const handleSubmitForGrading = async () => {
    if (wordCount < 30) {
      if (onNotify) {
        onNotify('Bài viết quá ngắn. Vui lòng viết ít nhất 30 từ để AI có cơ sở đánh giá.', 'error');
      }
      return;
    }

    // Check Freemium Quota
    const hasQuota = consumeWritingQuota();
    if (!hasQuota) {
      return;
    }

    setIsEvaluating(true);
    try {
      const response = await fetch('/api/ai/grade-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: selectedTaskType,
          prompt: currentPrompt.prompt,
          essayContent: essayContent,
          chartType: currentPrompt.chartType,
          chartDetails: currentPrompt.chartDetails,
          essaySubtype: currentPrompt.questionType,
          promptId: currentPrompt.id,
          version: essayVersion,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setEvaluationResult(resData.data);
        if (selectedTaskType === 'task1') {
        } else {
        }

        // Save to Per-User Writing History
        const newHistoryEntry: WritingHistoryEntry = {
          id: `write-${Date.now()}`,
          timestamp: new Date().toLocaleString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          taskType: selectedTaskType,
          promptTitle: currentPrompt.title,
          promptText: currentPrompt.prompt,
          promptId: currentPrompt.id,
          chartType: currentPrompt.chartType,
          chartDetails: currentPrompt.chartDetails,
          essayContent: essayContent,
          overallBand: resData.data.overallBand,
          wordCount: wordCount,
          version: essayVersion,
          evaluationData: resData.data,
        };

        const updatedHistory = [newHistoryEntry, ...historyList];
        setHistoryList(updatedHistory);
        try {
          localStorage.setItem(historyStorageKey, JSON.stringify(updatedHistory));
        } catch (err) {
          console.warn('Storage save failed:', err);
        }

        setIsResultModalOpen(true);
        if (onNotify) {
          onNotify(`Đã chấm xong! Điểm ước lượng: Band ${resData.data.overallBand}`, 'success');
        }
      } else {
        throw new Error(resData.message || 'Không thể chấm bài');
      }
    } catch (err: any) {
      console.error('Grading error:', err);
      if (onNotify) {
        onNotify('Không thể kết nối đến máy chủ chấm điểm. Vui lòng thử lại sau.', 'error');
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Render Visual Diagrams for Task 1
  const renderTask1Diagram = () => {
    if (!currentPrompt.chartDetails) return null;
    const { chartType } = currentPrompt;

    if (chartType === 'bar') {
      const labels = currentPrompt.chartDetails.labels || [];
      const { series, unit } = currentPrompt.chartDetails;
      return (
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold text-stone-800">Biểu đồ cột so sánh ({unit})</span>
            <div className="flex items-center gap-3">
              {series?.map((s, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[11px] font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {labels.map((country, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1.5">
                <span className="text-xs font-bold text-stone-800 block truncate">{country}</span>
                <div className="flex items-center justify-center gap-2 text-xs font-mono">
                  {series?.map((s, sIdx) => (
                    <span key={sIdx} className="font-bold" style={{ color: s.color }}>
                      {s.values[idx]}%
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 italic text-center">
            {currentPrompt.chartDetails.notes || 'Số liệu mô phỏng chuẩn Cambridge IELTS Task 1'}
          </p>
        </div>
      );
    }

    if (chartType === 'line') {
      const labels = currentPrompt.chartDetails.labels || [];
      const { series, unit } = currentPrompt.chartDetails;
      return (
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold text-stone-800">Đồ thị đường xu hướng ({unit})</span>
            <div className="flex items-center gap-3">
              {series?.map((s, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[11px] font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500">
                  <th className="py-2 px-2">Thành phố</th>
                  {labels.map((y, i) => (
                    <th key={i} className="py-2 px-2 text-center">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {series?.map((s, idx) => (
                  <tr key={idx} className="border-b border-stone-100">
                    <td className="py-2 px-2 font-bold text-stone-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      {s.name}
                    </td>
                    {s.values.map((val, vIdx) => (
                      <td key={vIdx} className="py-2 px-2 text-center text-stone-700">
                        {val}m
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (chartType === 'table') {
      const { tableHeaders, tableRows } = currentPrompt.chartDetails;
      return (
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-stone-100 text-stone-700 border-b border-stone-200">
                {tableHeaders?.map((h, i) => (
                  <th key={i} className="py-2.5 px-3 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows?.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-stone-100 hover:bg-stone-50/50">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2.5 px-3 text-stone-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (chartType === 'pie') {
      const labels = currentPrompt.chartDetails.labels || [];
      const { series } = currentPrompt.chartDetails;
      return (
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <span className="text-xs font-semibold text-stone-700 block">
            Tỷ lệ chi tiêu hộ gia đình (%)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {series?.map((s, sIdx) => (
              <div key={sIdx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="font-bold text-xs text-[#064E3B]">{s.name}</span>
                <div className="space-y-1.5">
                  {labels.map((label, lIdx) => (
                    <div key={lIdx} className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-600 truncate max-w-[130px]">{label}</span>
                      <span className="font-bold text-stone-900">{s.values[lIdx]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (chartType === 'map') {
      const { mapComparison } = currentPrompt.chartDetails;
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
              Năm 2000 (Quá khứ)
            </span>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
              {mapComparison?.before.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
              Hiện tại (Đã quy hoạch)
            </span>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
              {mapComparison?.after.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (chartType === 'process') {
      const { steps } = currentPrompt.chartDetails;
      return (
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2.5">
          <span className="text-xs font-bold text-stone-700 block">Sơ đồ quy trình 5 bước:</span>
          <div className="space-y-2">
            {steps?.map((st) => (
              <div key={st.step} className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                  {st.step}
                </span>
                <div>
                  <strong className="text-stone-900">{st.title}: </strong>
                  <span className="text-stone-600">{st.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (chartType === 'mixed' && currentPrompt.chartDetails?.mixedCharts) {
      const { mixedCharts } = currentPrompt.chartDetails;
      return (
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#064E3B] block">
              Biểu đồ 1: {mixedCharts.chart1Title} ({mixedCharts.chart1Type})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {mixedCharts.labels.map((country, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <span className="font-bold text-xs text-stone-800 block">{country}</span>
                  <div className="text-[11px] text-stone-500 mt-1 space-y-0.5">
                    <div>2000: <strong className="text-stone-700">{mixedCharts.series[0].values[idx]}</strong></div>
                    <div>2020: <strong className="text-[#064E3B]">{mixedCharts.series[1].values[idx]}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-200 pt-3 space-y-2">
            <span className="text-xs font-bold text-[#D97706] block">
              Biểu đồ 2: {mixedCharts.chart2Title} ({mixedCharts.chart2Type})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {mixedCharts.pieLabels.map((item, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-amber-50/70 border border-amber-200 text-center text-xs">
                  <span className="font-semibold text-stone-800 text-[11px] block">{item}</span>
                  <span className="font-bold text-amber-900 text-xs">{mixedCharts.pieValues[idx]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 pb-16">
      {/* Top Bar: Title, Quota & History */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left Title & Task Switcher */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#064E3B] flex items-center justify-center shrink-0">
              <PenTool size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-serif font-bold text-[#064E3B] tracking-tight">
                  Phòng Luyện Viết (Writing Studio)
                </h1>
                {isPro ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    <PenTool size={11} />
                    PRO Không giới hạn
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-700 border border-stone-300">
                    Lượt chấm hôm nay: <strong className="text-stone-900">{writingQuotaLeft}/1</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center: Task 1 / Task 2 Selector */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => handleTaskTypeChange('task1')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedTaskType === 'task1'
                  ? 'bg-white text-[#064E3B] font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Task 1 (Báo cáo biểu đồ)
            </button>
            <button
              onClick={() => handleTaskTypeChange('task2')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedTaskType === 'task2'
                  ? 'bg-white text-[#064E3B] font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Task 2 (Nghị luận học thuật)
            </button>
          </div>

          {/* Right: History, Timer & Upgrade CTA */}
          <div className="flex items-center gap-2.5">
            {/* Writing History Button */}
            <button
              onClick={() => setIsHistoryDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
              title="Xem các bài viết đã nộp của tài khoản"
            >
              <History size={14} className="text-[#064E3B]" />
              <span className="hidden sm:inline">Lịch sử bài viết</span>
              {historyList.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#064E3B] text-white">
                  {historyList.length}
                </span>
              )}
            </button>

            {/* Timer Controller */}
            <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl">
              <Clock size={15} className={secondsLeft < 300 ? 'text-rose-600 animate-pulse' : 'text-stone-500'} />
              <span className={`text-sm font-mono font-bold ${secondsLeft < 300 ? 'text-rose-600' : 'text-stone-800'}`}>
                {formatTimer(secondsLeft)}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 hover:bg-stone-200 rounded text-stone-600 cursor-pointer"
                title={isTimerRunning ? 'Tạm dừng' : 'Bắt đầu đếm giờ'}
              >
                {isTimerRunning ? <Pause size={13} /> : <Play size={13} />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setSecondsLeft(defaultMinutes * 60);
                  setTimeSpent(0);
                }}
                className="p-1 hover:bg-stone-200 rounded text-stone-500 cursor-pointer"
                title="Đặt lại đồng hồ"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            {!isPro && (
              <button
                onClick={openUpgradeModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors cursor-pointer"
              >
                <PenTool size={13} />
                <span>Nâng cấp Pro</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Workspace (Split-Screen) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        {/* Prompt Selector Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0">
              Chọn đề bài:
            </span>
            {currentPrompts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setActivePromptIndex(idx);
                  setCustomPrompt(null);
                  setEssayVersion(1);
                  setPreviousVersionBand(null);
                  setIsRewriteMode(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                  !customPrompt && activePromptIndex === idx
                    ? 'bg-[#064E3B] text-white font-bold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Đề #{idx + 1}: {p.chartType ? p.chartType.toUpperCase() : p.category}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064E3B] hover:text-[#043327] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer shrink-0"
          >
            <PlusCircle size={14} />
            <span>Tự nhập đề bài của bạn</span>
          </button>
        </div>

        {/* Split-Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Prompt & Visuals (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {selectedTaskType === 'task1' ? 'Task 1: Academic Report' : 'Task 2: Academic Essay'}
                </span>
                <span className="text-xs text-stone-500">
                  Yêu cầu: <strong>{currentPrompt.minWords}+ từ</strong>
                </span>
              </div>

              <div>
                <h2 className="text-base font-serif font-bold text-stone-900 leading-snug">
                  {currentPrompt.title}
                </h2>
                <div className="mt-2 text-xs text-stone-700 leading-relaxed font-sans whitespace-pre-line bg-stone-50 p-3.5 rounded-2xl border border-stone-200 select-text">
                  {currentPrompt.prompt}
                </div>
              </div>

              {/* Task 1 Diagram / Visual Data */}
              {selectedTaskType === 'task1' && renderTask1Diagram()}

              {/* Academic Guidance Checklist */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
                <span className="font-bold text-[#064E3B] block">Quy chuẩn chấm Senior Examiner:</span>
                <ul className="text-stone-600 space-y-1 list-disc pl-4 text-[11px] leading-relaxed">
                  {selectedTaskType === 'task1' ? (
                    <>
                      <li><strong>4 Tiêu chí (25% mỗi tiêu chí)</strong>: Task Achievement, Coherence &amp; Cohesion, Lexical Resource, Grammatical Range.</li>
                      <li><strong>Đối chiếu số liệu gốc</strong>: AI kiểm tra độ chuẩn xác của số liệu trích xuất từ biểu đồ, tránh nhầm lẫn hoặc tự suy diễn.</li>
                      <li><strong>Cấu trúc chuẩn</strong>: Mở bài (Paraphrase) ➔ Overview (Đặc điểm nổi bật) ➔ 2 Thân bài phân tích và so sánh.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>4 Tiêu chí (25% mỗi tiêu chí)</strong>: Task Response, Coherence &amp; Cohesion, Lexical Resource, Grammatical Range.</li>
                      <li><strong>Kiểm tra Thesis Statement</strong>: Lập trường cá nhân phải rõ ràng và nhất quán từ Mở bài đến Kết bài.</li>
                      <li><strong>Phát triển ý có chiều sâu</strong>: Luận điểm cần đi kèm phân tích nguyên nhân - hệ quả và ví dụ thực tế.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Writing Editor & Submission (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col min-h-[580px]">
              {/* Rewrite V2 Banner */}
              {isRewriteMode && (
                <div className="mb-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Edit3 size={15} className="text-amber-700 shrink-0" />
                    <span>
                      <strong>Phiên bản V{essayVersion} (Viết lại):</strong> Bài viết đã nạp các gợi ý sửa. Hãy trau chuốt thêm để vượt mốc Band {previousVersionBand?.toFixed(1) || 'cũ'}!
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsRewriteMode(false);
                      setEssayVersion(1);
                      setPreviousVersionBand(null);
                    }}
                    className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 underline"
                  >
                    Hủy chế độ viết lại
                  </button>
                </div>
              )}

              {/* Editor Header: Word Count & Indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Số lượng từ:
                  </span>
                  <span className={`text-base font-bold font-mono ${isWordCountMet ? 'text-emerald-700' : 'text-amber-600'}`}>
                    {wordCount}
                  </span>
                  <span className="text-xs text-stone-400">/ tối thiểu {targetWords} từ</span>
                </div>

                <div className="flex items-center gap-2">
                  {isWordCountMet ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 size={12} />
                      Đạt yêu cầu độ dài
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <AlertCircle size={12} />
                      Còn thiếu {targetWords - wordCount} từ
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar towards target word count */}
              <div className="w-full h-1.5 bg-stone-100 rounded-full mt-2 overflow-hidden shrink-0">
                <div
                  className={`h-full transition-all duration-300 ${isWordCountMet ? 'bg-emerald-600' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(100, (wordCount / targetWords) * 100)}%` }}
                />
              </div>

              {/* Main Textarea */}
              <div className="flex-1 mt-3 flex flex-col">
                <textarea
                  value={essayContent}
                  onChange={(e) => setEssayContent(e.target.value)}
                  placeholder={
                    selectedTaskType === 'task1'
                      ? 'Bắt đầu bài viết Task 1 tại đây... (Ví dụ: The given chart provides a comparative breakdown of...)'
                      : 'Bắt đầu bài luận Task 2 tại đây... (Ví dụ: In recent years, the question of whether... has sparked fierce debate among...)'
                  }
                  className="w-full flex-1 min-h-[380px] p-4 text-sm sm:text-base font-sans leading-relaxed text-stone-800 bg-[#FAFAF9] border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent resize-y"
                  spellCheck={false}
                />
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0 mt-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>AI Senior Examiner chấm theo đúng thang điểm chuẩn Cambridge</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEssayContent('')}
                    disabled={!essayContent || isEvaluating}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    Xóa trắng
                  </button>

                  <button
                    onClick={handleSubmitForGrading}
                    disabled={isEvaluating || wordCount < 30}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#064E3B] hover:bg-[#043327] disabled:bg-stone-300 text-white shadow-sm transition-all cursor-pointer"
                  >
                    {isEvaluating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Giám khảo AI đang chấm...</span>
                      </>
                    ) : (
                      <>
                        <PenTool size={14} />
                        <span>Nộp bài &amp; Chấm điểm AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer: Lịch Sử Viết Bài (Tách riêng cho từng User) */}
      {isHistoryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FAFAF9] h-full shadow-2xl flex flex-col border-l border-stone-200">
            {/* Drawer Header */}
            <div className="bg-[#064E3B] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <History size={18} className="text-amber-300" />
                <h3 className="text-base font-serif font-bold">Lịch Sử Làm Bài Viết</h3>
              </div>
              <button
                onClick={() => setIsHistoryDrawerOpen(false)}
                className="p-1 hover:bg-emerald-800 rounded-lg text-stone-300 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* User identification badge */}
            <div className="px-5 py-2.5 bg-white border-b border-stone-200 flex items-center justify-between text-xs text-stone-600 shrink-0">
              <span>Tài khoản: <strong className="text-stone-900">{user?.full_name || user?.email || 'Khách'}</strong></span>
              {historyList.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                >
                  <Trash2 size={12} />
                  <span>Xóa lịch sử</span>
                </button>
              )}
            </div>

            {/* List of Entries */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {historyList.length > 0 ? (
                historyList.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2.5 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded-full font-bold uppercase text-[10px] bg-stone-100 text-stone-800">
                        {entry.taskType.toUpperCase()}
                      </span>
                      <span className="text-stone-400 text-[11px]">{entry.timestamp}</span>
                    </div>

                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                      {entry.promptTitle}
                    </h4>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] font-semibold text-stone-500 uppercase">Band:</span>
                        <span className="text-base font-bold text-[#064E3B]">
                          {entry.overallBand.toFixed(1)}
                        </span>
                        <span className="text-[10px] text-stone-400">({entry.wordCount} từ)</span>
                      </div>

                      <button
                        onClick={() => handleLoadFromHistory(entry)}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <BookOpen size={12} />
                        <span>Xem kết quả</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-stone-500 text-xs space-y-2">
                  <History size={32} className="mx-auto text-stone-300" />
                  <p className="font-semibold text-stone-700">Chưa có bài viết nào được lưu</p>
                  <p className="text-[11px] text-stone-400">
                    Mỗi khi bạn nộp bài và hoàn thành chấm điểm, bài viết sẽ tự động lưu vào đây để theo dõi tiến độ.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Prompt Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Nhập đề bài IELTS Writing tự chọn
              </h3>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="p-1 hover:bg-stone-100 rounded-lg text-stone-400"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Dán toàn bộ đề bài IELTS {selectedTaskType === 'task1' ? 'Task 1' : 'Task 2'} của bạn vào ô dưới đây:
            </p>

            <textarea
              value={customPromptInput}
              onChange={(e) => setCustomPromptInput(e.target.value)}
              placeholder="Ví dụ: Some people believe that universities should focus on providing job skills..."
              className="w-full h-36 p-3 text-xs font-sans text-stone-800 bg-[#FAFAF9] border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#064E3B] resize-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveCustomPrompt}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#064E3B] text-white hover:bg-[#043327]"
              >
                Bắt đầu viết đề này
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Writing Evaluation Modal */}
      <WritingEvaluationModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        evaluation={evaluationResult}
        taskType={selectedTaskType}
        taskTitle={currentPrompt.title}
        initialEssayContent={essayContent}
        wordCount={wordCount}
        timeSpentSeconds={timeSpent}
        chartType={currentPrompt.chartType}
        questionType={currentPrompt.questionType}
        version={essayVersion}
        previousVersionBand={previousVersionBand}
        onApplyCorrection={handleApplyCorrection}
        onStartRewrite={handleStartRewrite}
      />
    </div>
  );
};
