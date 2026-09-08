import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  PenTool,
  Clock,
  Sparkles,
  ChevronLeft,
  BookOpen,
  Award,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  FileText,
  History,
  Copy,
  Check,
  Zap,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  WritingPrompt,
  WritingEvaluationResult,
  WritingSubmissionHistory,
} from '../../types';
import { englishApi } from '../../services/englishApi';
import { soundEffects, triggerConfetti } from '../../utils/audioUtils';

interface AcademicWritingStudioProps {
  onEarnXp: (amount: number, reason: string) => void;
  onBackToDashboard?: () => void;
}

export const AcademicWritingStudio: React.FC<AcademicWritingStudioProps> = ({
  onEarnXp,
  onBackToDashboard,
}) => {
  // Prompts & Selection
  const [prompts, setPrompts] = useState<WritingPrompt[]>([]);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number>(0);
  const currentPrompt = prompts[selectedPromptIndex];

  // Editor State
  const [essayText, setEssayText] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<WritingEvaluationResult | null>(null);

  // Active View Tab: 'editor' | 'ideas' | 'model' | 'history'
  const [activeTab, setActiveTab] = useState<'editor' | 'ideas' | 'model' | 'history'>('editor');

  // History State
  const [history, setHistory] = useState<WritingSubmissionHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  // Timer State (in seconds)
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Copy indicator for model essay
  const [copiedModel, setCopiedModel] = useState<boolean>(false);

  // 1. Fetch prompts on mount
  useEffect(() => {
    let isMounted = true;
    englishApi.getWritingPrompts()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setPrompts(data);
        }
      })
      .catch((err) => console.warn('Could not load prompts:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch history when history tab is activated
  useEffect(() => {
    if (activeTab === 'history') {
      setLoadingHistory(true);
      englishApi.getWritingHistory(3)
        .then((data) => setHistory(data))
        .catch((err) => console.warn('Could not load history:', err))
        .finally(() => setLoadingHistory(false));
    }
  }, [activeTab]);

  // 3. Timer Engine
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Reset editor when switching prompt
  const handleSelectPrompt = (index: number) => {
    setSelectedPromptIndex(index);
    setEssayText('');
    setEvaluationResult(null);
    setSecondsElapsed(0);
    setIsTimerRunning(false);
    setActiveTab('editor');
  };

  // Word count helper
  const wordCount = (essayText.trim().match(/\b[a-zA-Z'-]+\b/g) || []).length;
  const targetMinWords = currentPrompt?.minWords || 250;
  const isWordCountMet = wordCount >= targetMinWords;

  // Format timer seconds to MM:SS
  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  };

  // Insert Cohesive Device helper
  const handleInsertPhrase = (phrase: string) => {
    soundEffects.playClick();
    if (!isTimerRunning && essayText.length === 0) {
      setIsTimerRunning(true);
    }
    setEssayText((prev) => (prev ? `${prev.trimEnd()} ${phrase} ` : `${phrase} `));
  };

  // Paste sample essay for quick trial
  const handlePasteSample = () => {
    if (!currentPrompt?.sampleBand8Essay) return;
    soundEffects.playPop();
    setEssayText(currentPrompt.sampleBand8Essay);
    setIsTimerRunning(true);
  };

  // Submit Essay for Evaluation
  const handleEvaluate = async () => {
    if (!essayText.trim() || wordCount < 20) {
      alert('Vui lòng viết ít nhất 20 từ trước khi yêu cầu chấm điểm học thuật.');
      return;
    }

    soundEffects.playClick();
    setIsEvaluating(true);
    setIsTimerRunning(false);

    try {
      const result = await englishApi.evaluateWritingEssay(
        currentPrompt.id,
        essayText,
        secondsElapsed || 600,
        3
      );

      setEvaluationResult(result);
      soundEffects.playSuccess();
      triggerConfetti();

      onEarnXp(
        result.xpGained || 50,
        `Xuất sắc! Bài viết đạt Band ${result.bandOverall} (${result.cefrLevel}) (+${result.xpGained || 50} XP)`
      );
    } catch (err) {
      console.error('Lỗi khi chấm điểm bài viết:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Helper for Band Score Badge Color
  const getBandBadgeClass = (band: number) => {
    if (band >= 8.0) return 'bg-emerald-500 text-white border-emerald-400';
    if (band >= 7.0) return 'bg-blue-600 text-white border-blue-500';
    if (band >= 6.0) return 'bg-amber-500 text-white border-amber-400';
    return 'bg-rose-500 text-white border-rose-400';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Lộ trình
              </button>
            )}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              <PenTool className="w-3 h-3 mr-1" /> AI Academic Writing Studio
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Chuẩn Cambridge IELTS Writing Task 1 &amp; 2
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            Chấm &amp; Phân Tích Bài Luận Học Thuật AI
          </h1>
        </div>

        {/* Live Metrics: Timer & Word Count */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Word Counter Pill */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              isWordCountMet
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {isWordCountMet ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <FileText className="w-4 h-4 text-slate-500" />
            )}
            <span>
              {wordCount} / {targetMinWords} từ
            </span>
          </div>

          {/* Exam Timer */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold text-slate-700 shadow-xs">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{formatTimer(secondsElapsed)}</span>
            <button
              onClick={() => setIsTimerRunning((prev) => !prev)}
              className="text-[10px] uppercase font-bold text-indigo-600 hover:text-indigo-800 ml-1 underline cursor-pointer"
            >
              {isTimerRunning ? 'Dừng' : 'Bắt đầu'}
            </button>
          </div>

          {/* Evaluate Action Button */}
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-brand-navy via-brand-primary to-indigo-600 hover:from-blue-900 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
            {isEvaluating ? 'Đang chấm điểm AI...' : 'Chấm Điểm & Phân Tích'}
          </button>
        </div>
      </div>

      {/* Prompts Horizontal Pill Selector */}
      {prompts.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
            Chọn Đề Thi:
          </span>
          {prompts.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleSelectPrompt(idx)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                selectedPromptIndex === idx
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="font-bold mr-1.5 opacity-80 uppercase">
                [{p.taskType === 'task_1' ? 'Task 1' : 'Task 2'}]
              </span>
              {p.title}
            </button>
          ))}
        </div>
      )}

      {/* Main Studio Grid: Left (Prompt & Editor) vs Right (Analysis & Rubrics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Prompt Details & Academic Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Prompt Information Card */}
          {currentPrompt && (
            <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-700">
                    {currentPrompt.taskType === 'task_1' ? 'IELTS Task 1 (Report)' : 'IELTS Task 2 (Essay)'}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Chủ đề: <strong className="text-slate-700">{currentPrompt.category}</strong>
                  </span>
                </div>
                <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {currentPrompt.targetBand}
                </span>
              </div>

              <p className="text-sm text-slate-800 leading-relaxed font-sans font-medium bg-slate-50/90 p-3.5 rounded-2xl border border-slate-100">
                "{currentPrompt.promptText}"
              </p>

              {/* Chart Image for Task 1 */}
              {currentPrompt.chartImageUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-52">
                  <img
                    src={currentPrompt.chartImageUrl}
                    alt="Chart Data"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Navigation Tabs for Left Panel */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'editor'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <PenTool className="w-3 h-3 inline mr-1" /> Soạn thảo
                </button>
                <button
                  onClick={() => setActiveTab('ideas')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'ideas'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Lightbulb className="w-3 h-3 inline mr-1 text-amber-400" /> Dàn bài gợi ý
                </button>
                <button
                  onClick={() => setActiveTab('model')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'model'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3 h-3 inline mr-1 text-emerald-400" /> Bài mẫu Band 8.5
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'history'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <History className="w-3 h-3 inline mr-1 text-blue-400" /> Lịch sử nộp bài
                </button>
              </div>
            </div>
          )}

          {/* Conditional View by activeTab */}
          {activeTab === 'editor' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-3">
              {/* Quick Cohesive Devices Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
                  Chèn liên từ:
                </span>
                {[
                  'Furthermore,',
                  'Consequently,',
                  'In contrast,',
                  'On the other hand,',
                  'Specifically,',
                  'To summarize,',
                ].map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => handleInsertPhrase(phrase)}
                    className="flex-shrink-0 px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 text-[11px] font-semibold text-slate-600 transition-colors cursor-pointer"
                  >
                    + {phrase}
                  </button>
                ))}
              </div>

              {/* Textarea Editor */}
              <div className="relative">
                <textarea
                  rows={14}
                  value={essayText}
                  onChange={(e) => {
                    setEssayText(e.target.value);
                    if (!isTimerRunning && e.target.value.length > 0) {
                      setIsTimerRunning(true);
                    }
                  }}
                  placeholder="Bắt đầu viết bài luận học thuật của bạn tại đây... (Ví dụ: In recent years, the rapid proliferation of artificial intelligence has sparked a fierce debate...)"
                  className="w-full p-4 rounded-2xl border border-slate-200 text-slate-900 text-sm leading-relaxed font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-y min-h-[320px]"
                />
              </div>

              {/* Footer Actions inside Editor */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span>
                    Số đoạn văn:{' '}
                    <strong className="text-slate-800">
                      {essayText.trim().split(/\n+/).filter((p) => p.trim().length > 0).length}
                    </strong>
                  </span>
                  <span>•</span>
                  <button
                    onClick={() => setEssayText('')}
                    className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Xóa văn bản
                  </button>
                </div>

                <button
                  onClick={handlePasteSample}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" /> Dán bài luận mẫu thử nghiệm
                </button>
              </div>
            </div>
          )}

          {/* Dàn bài gợi ý View */}
          {activeTab === 'ideas' && currentPrompt && (
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Dàn Bài Ý Tưởng Học Thuật (Brainstorming Blueprint)
                </h3>
              </div>
              <div className="space-y-3">
                {currentPrompt.suggestedIdeas?.map((idea, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-extrabold uppercase text-indigo-700 tracking-wide mb-2">
                      {idx + 1}. {idea.perspective}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                      {idea.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Model Essay View */}
          {activeTab === 'model' && currentPrompt && (
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    Bài Luận Mẫu Đạt Band 8.5+ (Cambridge Standard)
                  </h3>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentPrompt.sampleBand8Essay || '');
                    setCopiedModel(true);
                    setTimeout(() => setCopiedModel(false), 2000);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                >
                  {copiedModel ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedModel ? 'Đã sao chép' : 'Sao chép'}
                </button>
              </div>

              <div className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-100 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                {currentPrompt.sampleBand8Essay}
              </div>
            </div>
          )}

          {/* History View */}
          {activeTab === 'history' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Lịch Sử Các Bài Viết Đã Nộp Của Bạn
                </h3>
              </div>

              {loadingHistory ? (
                <div className="text-center py-8 text-xs text-slate-500">Đang tải lịch sử bài viết...</div>
              ) : history.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  Bạn chưa nộp bài viết nào. Hãy hoàn thành một bài luận bên trên!
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.promptTitle}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.wordCount} từ • {Math.round(item.timeSpentSeconds / 60)} phút làm bài •{' '}
                          {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${getBandBadgeClass(
                            item.bandOverall
                          )}`}
                        >
                          Band {item.bandOverall}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1 font-semibold">{item.cefrLevel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Real-Time Academic Evaluation Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {evaluationResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Overall Band Card */}
              <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-brand-navy via-slate-900 to-indigo-950 text-white shadow-xl">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                      Kết Quả Đánh Giá Tổng Thể
                    </span>
                    <h3 className="text-lg font-extrabold mt-1">Cambridge IELTS Band</h3>
                    <p className="text-xs text-blue-200/80 mt-0.5">
                      Khung tham chiếu: <strong className="text-amber-300">{evaluationResult.cefrLevel}</strong>
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-black text-amber-300 tracking-tight">
                      {evaluationResult.bandOverall}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-slate-300">/ 9.0</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-blue-200">
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Zap className="w-3.5 h-3.5 fill-current" /> +{evaluationResult.xpGained} XP Thưởng
                  </span>
                  <span>Đã lưu vào CSDL MySQL</span>
                </div>
              </div>

              {/* 4 Cambridge Criteria Scores */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-brand-primary" /> 4 Tiêu Chí Chấm Thi Cambridge
                </h4>

                <div className="space-y-2.5 text-xs">
                  {[
                    { label: 'Task Response (TR)', score: evaluationResult.bandTR, desc: 'Mức độ phát triển luận điểm & trả lời trọng tâm' },
                    { label: 'Coherence & Cohesion (CC)', score: evaluationResult.bandCC, desc: 'Tính mạch lạc & sự đa dạng của từ nối' },
                    { label: 'Lexical Resource (LR)', score: evaluationResult.bandLR, desc: 'Vốn từ vựng học thuật AWL & C1/C2' },
                    { label: 'Grammatical Range (GRA)', score: evaluationResult.bandGRA, desc: 'Độ đa dạng mẫu câu & độ chính xác ngữ pháp' },
                  ].map((crit, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-slate-800">{crit.label}</span>
                        <span className="text-brand-primary font-mono text-sm">{crit.score} / 9.0</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{crit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Word List (AWL) Showcase */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Academic Words (AWL &amp; C1)
                  </h4>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {evaluationResult.evaluationDetails.awlWordsUsed.length} từ
                  </span>
                </div>

                {evaluationResult.evaluationDetails.awlWordsUsed.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {evaluationResult.evaluationDetails.awlWordsUsed.map((w, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Chưa phát hiện từ vựng thuộc Academic Word List.</p>
                )}
              </div>

              {/* Collocation Suggestions */}
              {evaluationResult.evaluationDetails.collocationSuggestions.length > 0 && (
                <div className="p-5 bg-amber-50/70 rounded-3xl border border-amber-200 shadow-sm space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" /> Gợi Ý Nâng Cấp Collocations (Band 8.0+)
                  </h4>
                  <div className="space-y-2">
                    {evaluationResult.evaluationDetails.collocationSuggestions.map((sug, idx) => (
                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs space-y-1">
                        <div className="flex items-center gap-1 text-slate-500">
                          <span className="line-through text-rose-500">{sug.matched}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <strong className="text-emerald-700">{sug.suggestion}</strong>
                        </div>
                        <p className="text-[11px] text-slate-500">{sug.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Examiner's Feedback */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
                <h4 className="font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> Nhận Xét Của Giám Khảo AI
                </h4>

                <div className="space-y-2">
                  <div className="font-bold text-emerald-700">Điểm mạnh:</div>
                  <ul className="space-y-1 list-disc list-inside text-slate-600">
                    {evaluationResult.evaluationDetails.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>

                  <div className="font-bold text-amber-700 pt-2">Cần cải thiện:</div>
                  <ul className="space-y-1 list-disc list-inside text-slate-600">
                    {evaluationResult.evaluationDetails.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Idle Academic Writing Guidance Panel */
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Hướng Dẫn Tiêu Chuẩn Chấm Thi Cambridge
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="font-bold text-slate-900 mb-0.5">1. Task Response (TR)</div>
                  <p className="text-[11px] text-slate-500">
                    Viết tối thiểu 250 từ (Task 2) hoặc 150 từ (Task 1). Phát triển đầy đủ luận điểm cho các vế câu hỏi.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="font-bold text-slate-900 mb-0.5">2. Coherence &amp; Cohesion (CC)</div>
                  <p className="text-[11px] text-slate-500">
                    Chia đoạn văn rõ ràng (Mở bài, 2 Thân bài, Kết bài). Sử dụng phong phú các liên từ nối học thuật.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="font-bold text-slate-900 mb-0.5">3. Lexical Resource (LR)</div>
                  <p className="text-[11px] text-slate-500">
                    Sử dụng các từ vựng thuộc danh mục Academic Word List (AWL) và Collocations nâng cao Band 7.5+.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="font-bold text-slate-900 mb-0.5">4. Grammatical Range &amp; Accuracy (GRA)</div>
                  <p className="text-[11px] text-slate-500">
                    Kết hợp linh hoạt các mẫu câu đơn, câu ghép, câu phức và câu bị động.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-blue-900">
                <p className="text-[11px] leading-relaxed">
                  💡 <strong>Mẹo làm bài:</strong> Bạn có thể bấm nút <em>"Dán bài luận mẫu thử nghiệm"</em> ở góc dưới trình soạn thảo để trải nghiệm nhanh bảng phân tích AI!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
