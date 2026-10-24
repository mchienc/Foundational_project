// frontend/src/modules/writing/WritingWorkspace.tsx
// Phòng Luyện Viết tập trung (Split-Screen Writing Studio) tích hợp AI Examiner

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
} from 'lucide-react';
import { mockWritingPrompts, WritingPrompt } from '../../data/mockWritingSpeakingPrompts';
import { useProStore } from '../pro/useProStore';
import { WritingEvaluationModal, WritingEvaluationResult } from './WritingEvaluationModal';

interface WritingWorkspaceProps {
  onNotify?: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const WritingWorkspace: React.FC<WritingWorkspaceProps> = ({ onNotify }) => {
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

  // Editor State
  const [essayContent, setEssayContent] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<WritingEvaluationResult | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);
  const [lastTask1Band, setLastTask1Band] = useState<number | null>(null);
  const [lastTask2Band, setLastTask2Band] = useState<number | null>(null);

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

  // Reset timer when switching task
  const handleTaskTypeChange = (type: 'task1' | 'task2') => {
    setSelectedTaskType(type);
    setActivePromptIndex(0);
    setCustomPrompt(null);
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

  // Submission to Gemini AI Grading Backend
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
      return; // Modal Upgrade already triggered by store
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
          previousTaskBand: selectedTaskType === 'task1' ? lastTask2Band : lastTask1Band,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setEvaluationResult(resData.data);
        if (selectedTaskType === 'task1') {
          setLastTask1Band(resData.data.overallBand);
        } else {
          setLastTask2Band(resData.data.overallBand);
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

  // Render SVG / Diagram previews for Task 1
  const renderTask1Diagram = () => {
    if (!currentPrompt.chartDetails) return null;
    const { chartType } = currentPrompt;

    if (chartType === 'bar') {
      const labels = currentPrompt.chartDetails.labels || [];
      const { series, unit } = currentPrompt.chartDetails;
      return (
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold text-stone-800">Biểu đồ cột: {unit}</span>
            <div className="flex items-center gap-3">
              {series?.map((s, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: s.color }} />
                  <span className="text-[11px] font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-44 w-full flex items-end justify-around gap-2 pt-4 px-2 border-b border-stone-200">
            {labels.map((label, lIdx) => (
              <div key={lIdx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="flex items-end gap-1.5 h-32 w-full justify-center">
                  {series?.map((s, sIdx) => {
                    const heightPercent = Math.min(100, (s.values[lIdx] / 50) * 100);
                    return (
                      <div
                        key={sIdx}
                        className="w-4 sm:w-6 rounded-t transition-all duration-300 relative group"
                        style={{ height: `${heightPercent}%`, backgroundColor: s.color }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-1 py-0.5 rounded whitespace-nowrap transition-opacity">
                          {s.values[lIdx]}%
                        </span>
                      </div>
                    );
                  })}
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-stone-600 truncate max-w-[80px] text-center">
                  {label}
                </span>
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

          {/* Simple Clean Table for Trend View */}
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
      {/* Top Bar: Title & Quota */}
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

          {/* Right: Timer & Upgrade CTA */}
          <div className="flex items-center gap-3">
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
                <span className="font-bold text-[#064E3B] block">Gợi ý triển khai bài viết:</span>
                <ul className="text-stone-600 space-y-1 list-disc pl-4 text-[11px] leading-relaxed">
                  {selectedTaskType === 'task1' ? (
                    <>
                      <li>Đoạn 1: Paraphrase đề bài (Introduction).</li>
                      <li>Đoạn 2: Overview nêu 2-3 đặc điểm nổi bật nhất (không đưa số liệu chi tiết vào đây).</li>
                      <li>Đoạn 3 &amp; 4: Chi tiết số liệu và so sánh cụ thể giữa các nhóm.</li>
                    </>
                  ) : (
                    <>
                      <li>Mở bài: Paraphrase chủ đề và nêu rõ lập trường (Thesis Statement).</li>
                      <li>Thân bài 1: Luận điểm thứ nhất + giải thích + ví dụ minh họa thực tế.</li>
                      <li>Thân bài 2: Luận điểm phản biện hoặc chiều hướng thứ hai + phân tích sâu.</li>
                      <li>Kết bài: Khẳng định lại quan điểm bằng cách diễn đạt mới.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Writing Editor & Submission (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col min-h-[560px]">
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
                <button
                  onClick={() => {
                    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ nội dung vừa viết không?')) {
                      setEssayContent('');
                    }
                  }}
                  className="text-xs text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Xóa nội dung làm lại
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSubmitForGrading}
                    disabled={isEvaluating}
                    className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isEvaluating
                        ? 'bg-stone-400 cursor-not-allowed'
                        : 'bg-[#064E3B] hover:bg-[#043327] hover:shadow-lg'
                    }`}
                  >
                    {isEvaluating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Giáo viên AI đang chấm bài...</span>
                      </>
                    ) : (
                      <>
                        <PenTool size={16} className="text-amber-300" />
                        <span>Nộp bài &amp; Chấm AI (Gemini)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Prompt Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                Nhập đề bài IELTS của bạn
              </h3>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Dán đề thi Writing thực tế từ sách Cambridge hoặc nguồn luyện thi khác để được AI chấm chữa chuyên sâu:
            </p>

            <textarea
              value={customPromptInput}
              onChange={(e) => setCustomPromptInput(e.target.value)}
              placeholder="Dán toàn bộ câu hỏi và yêu cầu đề bài vào đây..."
              className="w-full h-36 p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
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
        wordCount={wordCount}
        timeSpentSeconds={timeSpent}
        chartType={currentPrompt.chartType}
        questionType={currentPrompt.questionType}
      />
    </div>
  );
};
