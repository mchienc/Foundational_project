import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ListeningFullTest, ListeningExamResult, ContrastMode } from '../../types';
import { useListeningStore } from '../../store/useListeningStore';
import { SoundCheckScreen } from './SoundCheckScreen';
import { ListeningAudioPlayer } from './ListeningAudioPlayer';
import { ListeningSection } from './ListeningSection';
import { ListeningFooterNav } from './ListeningFooterNav';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  EyeOff,
  Sun,
  Contrast,
  Moon,
  Maximize2,
  Minimize2,
  X,
  FileText,
  Sparkles,
  Highlighter,
  Info,
} from 'lucide-react';
import { useSmoothScroll } from '../../context/SmoothScrollProvider';

interface IELTSListeningExamRoomProps {
  test: ListeningFullTest;
  examMode?: 'exam' | 'practice';
  onExit: () => void;
  onSubmitComplete: (result: ListeningExamResult) => void;
  onNotify?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const IELTSListeningExamRoom: React.FC<IELTSListeningExamRoomProps> = ({
  test,
  examMode = 'exam',
  onExit,
  onSubmitComplete,
  onNotify,
}) => {
  const { stop, start } = useSmoothScroll();

  // In 'exam' mode, start with soundcheck; in 'practice' mode, go straight to workspace
  const [phase, setPhase] = useState<'soundcheck' | 'exam' | 'confirming-submit' | 'submitted'>(
    examMode === 'exam' ? 'soundcheck' : 'exam'
  );
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes
  const [isFinalReviewPhase, setIsFinalReviewPhase] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number | null>(1);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [seekRequest, setSeekRequest] = useState<{ time: number; timestamp: number } | null>(null);

  // Practice mode extras: Instant answer check & Side-by-side Transcript
  const [showInstantAnswers, setShowInstantAnswers] = useState<boolean>(false);
  const [showPracticeTranscript, setShowPracticeTranscript] = useState<boolean>(false);

  // Authentic Computer Exam visual settings
  const [contrastMode, setContrastMode] = useState<ContrastMode>('standard');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const {
    userAnswers,
    reviewFlags,
    setAnswer,
    toggleReviewFlag,
    submitExam,
    examResult,
    resetExam,
  } = useListeningStore();

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset store when mounting a new test session
  useEffect(() => {
    resetExam();
  }, [test.id, examMode, resetExam]);

  useEffect(() => {
    stop();
    return () => start();
  }, [stop, start]);

  const performSubmit = useCallback(() => {
    setIsPlaying(false);
    setPhase('submitted');
    submitExam(test);
  }, [submitExam, test]);

  const onNotifyRef = useRef(onNotify);
  onNotifyRef.current = onNotify;
  const performSubmitRef = useRef(performSubmit);
  performSubmitRef.current = performSubmit;

  // Countdown timer
  useEffect(() => {
    if (phase !== 'exam') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (examMode === 'exam') {
            onNotifyRef.current?.(
              'Hết thời gian làm bài! Hệ thống đã tự động thu bài của bạn.',
              'info'
            );
            performSubmitRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, examMode]);

  useEffect(() => {
    if (phase === 'submitted' && examResult) {
      onSubmitComplete(examResult);
    }
  }, [phase, examResult, onSubmitComplete]);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectSection = (sectionNum: number) => {
    setCurrentSection(sectionNum);
    const firstQ = (sectionNum - 1) * 10 + 1;
    setActiveQuestionNumber(firstQ);
  };

  const handleScrollToQuestion = (qNum: number, sectionNum: number) => {
    if (currentSection !== sectionNum) {
      setCurrentSection(sectionNum);
    }
    setActiveQuestionNumber(qNum);
    setTimeout(() => {
      const el = document.getElementById(`question-${qNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
  };

  const handleAudioEnd = () => {
    if (currentSection < 4) {
      setCurrentSection((prev) => prev + 1);
      if (examMode === 'exam') {
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(false);
      if (examMode === 'exam' && !isFinalReviewPhase) {
        setIsFinalReviewPhase(true);
        setTimeLeft(120); // 2 minutes final check time on computer-delivered IELTS
        onNotify?.(
          'Băng nghe đã kết thúc. Bạn có 2 phút cuối để kiểm tra lại đáp án trước khi nộp bài.',
          'info'
        );
      } else {
        onNotify?.('Đã phát xong phần nghe.', 'info');
      }
    }
  };

  const getTotalAnswered = () =>
    Object.values(userAnswers || {}).filter((v) => v && v.trim().length > 0).length;
  const getTotalFlagged = () => reviewFlags?.size || 0;
  const totalQuestions = 40;

  if (phase === 'soundcheck') {
    return (
      <SoundCheckScreen
        testSource={test.source}
        onStartTest={() => {
          setPhase('exam');
          setIsPlaying(true); // Auto-start audio immediately in Real Exam mode
        }}
        onBack={onExit}
      />
    );
  }

  const activeSection =
    test.sections.find((s) => s.sectionNumber === currentSection) || test.sections[0];
  const transcriptLines = test.transcript || [];

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const topbarClasses = isHighContrast
    ? 'bg-black text-yellow-400 border-b-2 border-yellow-400'
    : isInverted
    ? 'bg-[#022C22] text-slate-100 border-b border-emerald-700'
    : 'bg-[#064E3B] text-white border-b border-[#043d2e] shadow-sm';

  const mainBgClasses = isHighContrast
    ? 'bg-stone-950 text-yellow-300'
    : isInverted
    ? 'bg-[#011c16] text-slate-100'
    : 'bg-[#FAFAF9] text-stone-900';

  const contrastOptions: { mode: ContrastMode; label: string; icon: typeof Sun }[] = [
    { mode: 'standard', label: 'Chuẩn', icon: Sun },
    { mode: 'high-contrast', label: 'Tương phản cao', icon: Contrast },
    { mode: 'inverted', label: 'Đảo màu', icon: Moon },
  ];

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-screen font-sans overflow-hidden transition-colors ${mainBgClasses}`}
    >
      {/* Topbar (IDP Inspera Style) */}
      <header
        className={`w-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 select-none shrink-0 z-30 transition-colors ${topbarClasses}`}
      >
        {/* Left: Exit & Candidate Info */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Thoát phòng thi"
          >
            <X size={18} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base truncate">
                {test.source}
              </span>
              {examMode === 'exam' ? (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    isHighContrast
                      ? 'bg-yellow-400 text-black'
                      : 'bg-amber-400 text-stone-950'
                  }`}
                >
                  IDP Official Simulation
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-emerald-400 text-stone-950">
                  Practice &amp; Speed Studio
                </span>
              )}
            </div>
            <div className="text-[11px] font-mono opacity-80 truncate">
              {examMode === 'exam' ? (
                <>
                  Candidate: <span className="font-semibold">VN-002-894120</span> • Không cho phép dừng/tua băng
                </>
              ) : (
                <>Chế độ Luyện tập: Tự do chỉnh tốc độ 0.75x–1.5x, tua ±5s &amp; kiểm tra đáp án</>
              )}
            </div>
          </div>
        </div>

        {/* Center: Timer & 2-Minute Final Check Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isFinalReviewPhase && (
            <span className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 text-xs font-mono font-bold animate-pulse">
              2 Phút Kiểm Tra Cuối Giờ
            </span>
          )}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold tracking-wider transition-all ${
              timeLeft <= 180
                ? 'bg-red-600 text-white animate-pulse ring-2 ring-red-400'
                : isHighContrast
                ? 'bg-stone-900 text-yellow-400 border border-yellow-400'
                : 'bg-white/10 text-white border border-white/20'
            }`}
          >
            <Clock size={15} />
            <span>{showTimer ? formatTime(timeLeft) : '••:••'}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowTimer(!showTimer)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
            title={showTimer ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          >
            {showTimer ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>

        {/* Right: Practice Tools, Contrast Mode, Fullscreen & Finish */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {examMode === 'practice' && (
            <>
              <button
                type="button"
                onClick={() => setShowInstantAnswers(!showInstantAnswers)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  showInstantAnswers
                    ? 'bg-emerald-400 text-stone-950 border-emerald-300 shadow-xs'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
                title="Đổi trạng thái kiểm tra đáp án & giải thích ngay lập tức"
              >
                <Sparkles size={13} />
                <span className="hidden md:inline">
                  {showInstantAnswers ? 'Đang hiện Đáp Án' : 'Check Đáp Án Ngay'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowPracticeTranscript(!showPracticeTranscript)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  showPracticeTranscript
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-xs'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
                title="Mở Transcript song song để vừa nghe vừa dò chữ"
              >
                <FileText size={13} />
                <span className="hidden md:inline">Transcript</span>
              </button>
            </>
          )}

          {/* Contrast Mode Selector */}
          <div className="hidden lg:flex items-center p-0.5 rounded-lg bg-black/20">
            {contrastOptions.map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setContrastMode(mode)}
                title={`Chế độ hiển thị: ${label}`}
                className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  contrastMode === mode
                    ? isHighContrast
                      ? 'bg-yellow-400 text-black'
                      : isInverted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Icon size={13} />
              </button>
            ))}
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="p-2 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Finish Test Button */}
          <button
            type="button"
            onClick={() => setPhase('confirming-submit')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer ${
              isHighContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
            }`}
          >
            <CheckCircle2 size={15} />
            <span>Nộp Bài</span>
          </button>
        </div>
      </header>

      {/* Audio Control Bar + Part Switcher Tabs */}
      <div
        className={`border-b px-4 sm:px-6 py-3 shrink-0 z-20 transition-colors ${
          isHighContrast
            ? 'bg-stone-950 border-yellow-400/50'
            : isInverted
            ? 'bg-[#022C22] border-emerald-800'
            : 'bg-stone-100/80 border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
          <div className="flex-1">
            <ListeningAudioPlayer
              audioFile={activeSection?.audioFile || ''}
              mode={examMode}
              contrastMode={contrastMode}
              sectionNumber={currentSection}
              sectionTitle={activeSection?.title || ''}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              volume={volume}
              onVolumeChange={setVolume}
              playbackSpeed={playbackSpeed}
              onSpeedChange={setPlaybackSpeed}
              onTimeChange={setAudioCurrentTime}
              seekRequest={seekRequest}
              onEnded={handleAudioEnd}
            />
          </div>

          {/* Part 1 - 4 Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-white/80 dark:bg-stone-900 p-1.5 rounded-2xl border border-stone-200 shrink-0 self-start xl:self-center">
            {[1, 2, 3, 4].map((num) => {
              const secQuestions =
                test.sections.find((s) => s.sectionNumber === num)?.questions || [];
              const answeredInSec = secQuestions.filter((q) =>
                Boolean(userAnswers[q.id]?.trim())
              ).length;

              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleSelectSection(num)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentSection === num
                      ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>Part {num}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                      currentSection === num
                        ? 'bg-emerald-900 text-emerald-200'
                        : 'bg-stone-200/80 text-stone-600'
                    }`}
                  >
                    {answeredInSec}/10
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Workspace (Single View or Split with Interactive Transcript in Practice Mode) */}
      <div className="flex-1 flex min-h-0 overflow-hidden" data-lenis-prevent="true">
        {/* Left / Center: Active Part Questions */}
        <div
          className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${
            showPracticeTranscript ? 'border-r border-stone-200' : ''
          }`}
          data-lenis-prevent="true"
        >
          <div className="max-w-4xl mx-auto space-y-5 pb-16">
            {/* Official Part Context & Highlight Instruction Banner */}
            <div
              className={`rounded-2xl p-4 sm:p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isHighContrast
                  ? 'bg-stone-900 border-yellow-400 text-yellow-300'
                  : isInverted
                  ? 'bg-[#064E3B]/60 border-emerald-700 text-emerald-100'
                  : 'bg-emerald-950 text-white border-emerald-800 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-stone-950 font-mono text-[10px] font-bold uppercase">
                    Part {activeSection.sectionNumber} (Questions {(activeSection.sectionNumber - 1) * 10 + 1}–{activeSection.sectionNumber * 10})
                  </span>
                  <h2 className="font-serif font-bold text-base sm:text-lg text-amber-300">
                    {activeSection.title}
                  </h2>
                </div>
                <p className="text-xs text-stone-200 mt-1">{activeSection.context}</p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-[11px] font-sans text-amber-200 shrink-0">
                <Highlighter size={13} className="text-amber-400 shrink-0" />
                <span>Bôi đen chữ trong câu hỏi để Highlight từ khóa</span>
              </div>
            </div>

            {/* Active Part Questions Component */}
            <ListeningSection
              section={activeSection}
              userAnswers={userAnswers}
              reviewFlags={reviewFlags}
              onAnswer={setAnswer}
              onToggleFlag={toggleReviewFlag}
              activeQuestionNumber={activeQuestionNumber}
              onFocusQuestion={setActiveQuestionNumber}
              contrastMode={contrastMode}
              showInstantAnswers={showInstantAnswers}
            />
          </div>
        </div>

        {/* Right Side Panel (Only when Practice Mode Transcript is toggled on) */}
        {examMode === 'practice' && showPracticeTranscript && (
          <div
            className="w-full md:w-[40%] lg:w-[38%] flex flex-col bg-white border-l border-stone-200 overflow-hidden shrink-0"
            data-lenis-prevent="true"
          >
            <div className="p-4 border-b border-stone-200 bg-[#FAFAF9] flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-[#064E3B] flex items-center gap-1.5">
                  <FileText size={15} className="text-amber-600" />
                  <span>Transcript Tương Tác (Karaoke Sync)</span>
                </h3>
                <p className="text-[11px] text-stone-500">
                  Bấm vào bất kỳ lời thoại nào để tua audio tới đúng câu đó
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPracticeTranscript(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3" data-lenis-prevent="true">
              {transcriptLines.map((line) => {
                const isCurrentLine =
                  audioCurrentTime >= line.start && audioCurrentTime <= line.end;

                return (
                  <div
                    key={line.id}
                    onClick={() => {
                      setSeekRequest({ time: line.start, timestamp: Date.now() });
                      if (!isPlaying) setIsPlaying(true);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isCurrentLine
                        ? 'bg-emerald-50 border-[#064E3B] shadow-2xs'
                        : 'bg-[#FAFAF9] border-stone-200/80 hover:border-amber-400 hover:bg-amber-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#064E3B] text-amber-300">
                        {line.speaker || 'Speaker'}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        {formatTime(Math.floor(line.start))} – {formatTime(Math.floor(line.end))}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                      {line.text}
                    </p>
                    {line.answerForQuestion && (
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-mono font-bold">
                        <Info size={11} />
                        <span>Dẫn chứng Câu {line.answerForQuestion}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom 40-Question Palette Footer */}
      <ListeningFooterNav
        sections={test.sections}
        currentSection={currentSection}
        activeQuestionNumber={activeQuestionNumber}
        onSelectSection={handleSelectSection}
        onScrollToQuestion={handleScrollToQuestion}
        contrastMode={contrastMode}
      />

      {/* Submit Confirmation Modal */}
      {phase === 'confirming-submit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-stone-200 text-stone-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-emerald-50 px-6 py-5 border-b border-emerald-100 flex items-start gap-4">
              <div className="bg-white p-2 rounded-xl shadow-xs">
                <AlertTriangle className="w-6 h-6 text-[#D97706]" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-[#064E3B]">
                  Xác Nhận Nộp Bài Listening?
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Hệ thống sẽ chấm điểm Band Score (thang 9.0) và mở phòng giải thích chi tiết kèm Transcript.
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-center">
                  <span className="block text-2xl font-bold font-mono text-[#064E3B]">
                    {getTotalAnswered()} / {totalQuestions}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Đã trả lời</span>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-center">
                  <span className="block text-2xl font-bold font-mono text-[#D97706]">
                    {getTotalFlagged()}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Đánh dấu Review</span>
                </div>
              </div>

              {getTotalAnswered() < totalQuestions && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-[#D97706]" />
                  <span>
                    Bạn còn <strong>{totalQuestions - getTotalAnswered()} câu</strong> chưa điền đáp án.
                  </span>
                </div>
              )}
            </div>

            <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setPhase('exam')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200/60 transition-colors cursor-pointer"
              >
                Quay lại làm tiếp
              </button>
              <button
                type="button"
                onClick={performSubmit}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#064E3B] hover:bg-[#022C22] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                Nộp Bài &amp; Xem Điểm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-stone-200 text-stone-900 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold font-serif text-[#064E3B] mb-2">
              Thoát khỏi phòng nghe?
            </h3>
            <p className="text-xs text-stone-600 mb-5 leading-relaxed">
              Tiến độ làm bài hiện tại sẽ bị huỷ nếu bạn thoát trước khi nộp bài.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Ở lại
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setShowExitConfirm(false);
                  onExit();
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Thoát ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
