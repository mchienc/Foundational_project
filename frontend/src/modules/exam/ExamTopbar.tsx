import { useState } from 'react';
import {
  Clock,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Bookmark,
  CheckCircle2,
  Sun,
  Moon,
  Contrast,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useExamStore } from '../../store/useExamStore';
import { ContrastMode } from '../../types';

interface ExamTopbarProps {
  onExit: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onFinishConfirm: () => void;
}

export const ExamTopbar = ({
  onExit,
  isFullscreen,
  onToggleFullscreen,
  onFinishConfirm,
}: ExamTopbarProps) => {
  const {
    testTitle,
    candidateNumber,
    timeRemainingSeconds,
    isTimeHidden,
    toggleTimeHidden,
    contrastMode,
    setContrastMode,
    flaggedQuestions,
    answers,
    passages,
  } = useExamStore();

  const [showExitModal, setShowExitModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Format time MM:SS
  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalQuestions = passages.reduce((acc, p) => acc + (p.questions?.length || 0), 0) || 40;
  const answeredCount = Object.values(answers).filter((v) => v && v.trim().length > 0).length;

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const containerClasses = isHighContrast
    ? 'bg-black text-yellow-400 border-b-2 border-yellow-400'
    : isInverted
    ? 'bg-[#022C22] text-slate-100 border-b border-emerald-700'
    : 'bg-[#064E3B] text-white border-b border-[#043d2e] shadow-sm';

  const contrastOptions: { mode: ContrastMode; label: string; icon: typeof Sun }[] = [
    { mode: 'standard', label: 'Chuẩn', icon: Sun },
    { mode: 'high-contrast', label: 'Tương phản cao', icon: Contrast },
    { mode: 'inverted', label: 'Đảo màu', icon: Moon },
  ];

  return (
    <>
      <header
        className={`w-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 font-sans select-none shrink-0 transition-colors ${containerClasses}`}
      >
        {/* Left: Test Info & Candidate Number */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setShowExitModal(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Thoát bài thi"
          >
            <X size={18} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base truncate">
                {testTitle || 'IELTS Reading on Computer'}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  isHighContrast
                    ? 'bg-yellow-400 text-black'
                    : isInverted
                    ? 'bg-emerald-800 text-emerald-200'
                    : 'bg-amber-400 text-stone-950'
                }`}
              >
                Official Simulation
              </span>
            </div>
            <div className="text-[11px] font-mono opacity-80 truncate">
              Thí sinh: <span className="font-semibold">{candidateNumber}</span>
            </div>
          </div>
        </div>

        {/* Center: Timer with Hide/Show Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold tracking-wider transition-all ${
              timeRemainingSeconds <= 300
                ? 'bg-red-600 text-white animate-pulse ring-2 ring-red-400'
                : isHighContrast
                ? 'bg-stone-900 text-yellow-400 border border-yellow-400'
                : isInverted
                ? 'bg-[#064E3B] text-emerald-200 border border-emerald-600'
                : 'bg-white/10 text-white border border-white/20'
            }`}
          >
            <Clock size={16} className={timeRemainingSeconds <= 300 ? 'text-white' : ''} />
            <span>{isTimeHidden ? '••:••' : formattedTime}</span>
          </div>

          <button
            type="button"
            onClick={toggleTimeHidden}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isHighContrast
                ? 'hover:bg-yellow-400/20 text-yellow-400'
                : isInverted
                ? 'hover:bg-emerald-800 text-emerald-200'
                : 'hover:bg-white/10 text-stone-200 hover:text-white'
            }`}
            title={isTimeHidden ? 'Hiện thời gian' : 'Ẩn thời gian'}
          >
            {isTimeHidden ? <Eye size={14} /> : <EyeOff size={14} />}
            <span className="hidden md:inline">{isTimeHidden ? 'Show Time' : 'Hide Time'}</span>
          </button>
        </div>

        {/* Right: Contrast Switch, Fullscreen, Review, Finish Test */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Contrast Selector */}
          <div className="hidden lg:flex items-center p-0.5 rounded-lg bg-black/20">
            {contrastOptions.map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setContrastMode(mode)}
                title={label}
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

          {/* Review badge */}
          {flaggedQuestions.length > 0 && (
            <div
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                isHighContrast
                  ? 'bg-yellow-400 text-black'
                  : isInverted
                  ? 'bg-amber-900 text-amber-200'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
              }`}
            >
              <Bookmark size={13} />
              <span>{flaggedQuestions.length} Review</span>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
              isHighContrast
                ? 'hover:bg-yellow-400/20 text-yellow-400'
                : isInverted
                ? 'hover:bg-emerald-800 text-emerald-200'
                : 'hover:bg-white/10 text-stone-200 hover:text-white'
            }`}
            title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình (F11)'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Finish Test Button */}
          <button
            type="button"
            onClick={() => setShowFinishModal(true)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer ${
              isHighContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : isInverted
                ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                : 'bg-amber-500 hover:bg-amber-600 text-stone-950'
            }`}
          >
            <CheckCircle2 size={15} />
            <span>Finish Test</span>
          </button>
        </div>
      </header>

      {/* Confirmation Modal for Finish Test */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className={`w-full max-w-md rounded-2xl p-6 font-sans border shadow-2xl ${
              isHighContrast
                ? 'bg-black text-yellow-400 border-yellow-400'
                : isInverted
                ? 'bg-[#022C22] text-slate-100 border-emerald-600'
                : 'bg-white text-stone-900 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif">Xác Nhận Nộp Bài Thi</h3>
                <p className="text-xs opacity-75">
                  Bạn có chắc chắn muốn kết thúc bài thi ngay bây giờ?
                </p>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl mb-4 text-xs font-mono space-y-1.5 ${
                isHighContrast
                  ? 'bg-stone-900 border border-yellow-400/50'
                  : isInverted
                  ? 'bg-[#064E3B]'
                  : 'bg-stone-50 border border-stone-200'
              }`}
            >
              <div className="flex justify-between">
                <span>Số câu đã trả lời:</span>
                <span className="font-bold">
                  {answeredCount} / {totalQuestions}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Số câu còn trống:</span>
                <span className="font-bold text-amber-600">
                  {totalQuestions - answeredCount} câu
                </span>
              </div>
              <div className="flex justify-between">
                <span>Số câu đánh dấu Review:</span>
                <span className="font-bold text-amber-500">{flaggedQuestions.length} câu</span>
              </div>
              <div className="flex justify-between">
                <span>Thời gian còn lại:</span>
                <span className="font-bold">{formattedTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-stone-500/10 cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowFinishModal(false);
                  onFinishConfirm();
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer ${
                  isHighContrast
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                    : isInverted
                    ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                    : 'bg-[#064E3B] text-white hover:bg-[#022C22]'
                }`}
              >
                Nộp bài &amp; Xem kết quả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Exit */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className={`w-full max-w-sm rounded-2xl p-6 font-sans border shadow-2xl ${
              isHighContrast
                ? 'bg-black text-yellow-400 border-yellow-400'
                : isInverted
                ? 'bg-[#022C22] text-slate-100 border-emerald-600'
                : 'bg-white text-stone-900 border-stone-200'
            }`}
          >
            <h3 className="text-base font-bold font-serif mb-2">Thoát khỏi phòng thi?</h3>
            <p className="text-xs opacity-80 mb-5 leading-relaxed">
              Các câu trả lời của bạn trong phiên thi này sẽ không được lưu vào kết quả nếu chưa nộp bài.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="px-3 py-1.5 text-xs rounded-xl hover:bg-stone-500/10 cursor-pointer"
              >
                Ở lại
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitModal(false);
                  onExit();
                }}
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Thoát phòng thi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
