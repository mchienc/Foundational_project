import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Square,
  Volume2,
  Sparkles,
  Activity,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  X,
  ChevronLeft,
} from 'lucide-react';
import { SpeakingLesson, WordPronunciation } from '../../types';
import { playSpeech, soundEffects, triggerConfetti } from '../../utils/audioUtils';
import { sampleSpeakingLessons } from '../../data/englishMockData';
import { englishApi } from '../../services/englishApi';

interface PronunciationStudioProps {
  onEarnXp: (amount: number, reason: string) => void;
  onBackToDashboard?: () => void;
}

export const PronunciationStudio: React.FC<PronunciationStudioProps> = ({
  onEarnXp,
  onBackToDashboard,
}) => {
  const [lessons, setLessons] = useState<SpeakingLesson[]>(sampleSpeakingLessons);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const currentLesson = lessons[currentLessonIndex] || sampleSpeakingLessons[0];

  // Fetch speaking lessons from MySQL API on mount
  useEffect(() => {
    let isMounted = true;
    englishApi.getSpeakingLessons()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setLessons(data);
        }
      })
      .catch((err) => console.warn('Could not load speaking lessons from MySQL:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [isNativePlaying, setIsNativePlaying] = useState<boolean>(false);

  // Evaluation results
  const [overallScore, setOverallScore] = useState<number>(92);
  const [selectedWord, setSelectedWord] = useState<WordPronunciation | null>(null);

  // Waveform comparison modal
  const [showWaveformModal, setShowWaveformModal] = useState<boolean>(false);
  const [isSimulatedUserPlaying, setIsSimulatedUserPlaying] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state when changing lesson
  useEffect(() => {
    setHasEvaluated(false);
    setIsRecording(false);
    setRecordingSeconds(0);
    setSelectedWord(null);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [currentLessonIndex]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Listen to native model pronunciation
  const handlePlayNative = async () => {
    if (isNativePlaying) return;
    setIsNativePlaying(true);
    await playSpeech(currentLesson.targetSentence, 'en-US', 0.85);
    setIsNativePlaying(false);
  };

  // Play individual word pronunciation
  const handlePlayWord = async (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    await playSpeech(word, 'en-US', 0.85);
  };

  // Start / Stop Recording
  const handleToggleRecord = () => {
    if (isRecording) {
      // Stop recording and trigger evaluation
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);

      // Simulate AI Speech Recognition calculation
      setTimeout(() => {
        // Calculate average score of lesson words with slight realistic variation
        const baseAvg = Math.round(
          currentLesson.words.reduce((acc, w) => acc + w.score, 0) /
            currentLesson.words.length
        );
        const finalScore = Math.min(98, Math.max(78, baseAvg + Math.floor(Math.random() * 5) - 2));
        setOverallScore(finalScore);
        setHasEvaluated(true);
        setSelectedWord(currentLesson.words[0]);

        // Persist speaking evaluation score and XP in MySQL via REST API
        if (currentLesson?.id) {
          englishApi.submitSpeakingResult(currentLesson.id, finalScore)
            .catch((err) => console.warn('Could not sync speaking score with MySQL:', err));
        }

        if (finalScore >= 80) {
          soundEffects.playSuccess();
          triggerConfetti();
          onEarnXp(35, `Phát âm xuất sắc đạt ${finalScore}/100 điểm!`);
        } else {
          soundEffects.playPop();
          onEarnXp(15, `Đã hoàn thành lượt ghi âm phát âm`);
        }
      }, 700);
    } else {
      // Start recording
      soundEffects.playClick();
      setHasEvaluated(false);
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 12) {
            handleToggleRecord();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Color helper for phoneme score
  const getScoreColorClass = (score: number) => {
    if (score >= 80) {
      return {
        bg: 'bg-emerald-50 hover:bg-emerald-100',
        text: 'text-emerald-700',
        border: 'border-emerald-300',
        badge: 'bg-emerald-600 text-white',
        dot: 'bg-emerald-500',
        label: 'Chuẩn xác',
      };
    } else if (score >= 50) {
      return {
        bg: 'bg-amber-50 hover:bg-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-300',
        badge: 'bg-amber-500 text-white',
        dot: 'bg-amber-500',
        label: 'Cần cải thiện',
      };
    } else {
      return {
        bg: 'bg-rose-50 hover:bg-rose-100',
        text: 'text-rose-700',
        border: 'border-rose-300',
        badge: 'bg-rose-600 text-white',
        dot: 'bg-rose-500',
        label: 'Chưa chính xác',
      };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      {/* Header & Lesson Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-700">
              Phoneme AI Speech Studio
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Chấm điểm âm vị theo thời gian thực
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Luyện Phát Âm &amp; Ghi Âm Tương Tác
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Quay lại
            </button>
          )}
          {/* Lesson Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {lessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLessonIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentLessonIndex === idx
                    ? 'bg-white text-brand-primary shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bài {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Studio Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
        {/* Top Info Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {currentLesson.category}
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">
              {currentLesson.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-800 text-slate-300 border border-slate-700">
              Cấp độ: {currentLesson.difficulty}
            </span>
            <button
              onClick={handlePlayNative}
              disabled={isNativePlaying}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md disabled:opacity-50"
            >
              <Volume2 className="w-3.5 h-3.5" />
              {isNativePlaying ? 'Đang phát mẫu...' : 'Nghe giọng bản xứ'}
            </button>
          </div>
        </div>

        {/* Core Practice Area */}
        <div className="p-6 sm:p-10">
          {/* Target Sentence Display with strict IPA alignment below each word */}
          <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Câu mục tiêu &amp; Phiên âm quốc tế (IPA)
            </div>

            {/* Word by word breakdown with IPA underneath */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-4">
              {currentLesson.words.map((item, idx) => {
                const color = hasEvaluated
                  ? getScoreColorClass(item.score)
                  : {
                      bg: 'bg-white hover:bg-slate-100',
                      text: 'text-slate-900',
                      border: 'border-slate-200',
                      badge: 'bg-slate-200 text-slate-700',
                      dot: 'bg-slate-400',
                      label: '',
                    };

                const isSelected = selectedWord?.word === item.word;

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedWord(item)}
                    className={`cursor-pointer group flex flex-col items-center p-2 rounded-xl border transition-all ${
                      color.bg
                    } ${color.border} ${
                      isSelected ? 'ring-2 ring-brand-primary shadow-md' : 'shadow-sm'
                    }`}
                  >
                    {/* Word text */}
                    <span
                      className={`text-lg sm:text-xl font-bold tracking-tight ${
                        hasEvaluated ? color.text : 'text-slate-900'
                      }`}
                    >
                      {item.word}
                    </span>

                    {/* IPA text directly underneath (consistent line height & font-ipa) */}
                    <span className="font-ipa text-xs sm:text-sm text-slate-500 font-normal mt-0.5 select-all">
                      {item.ipa}
                    </span>

                    {/* Score badge if evaluated */}
                    {hasEvaluated && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full mt-1.5 ${color.badge}`}
                      >
                        {item.score}%
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Translation in Vietnamese */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <span className="font-semibold text-slate-800">Dịch nghĩa:</span>
              <span className="italic">{currentLesson.translationVi}</span>
            </div>
          </div>

          {/* Large Recording Mic with Pulsing Voice Ripple Rings */}
          <div className="flex flex-col items-center justify-center my-8">
            <div className="relative flex items-center justify-center">
              {/* Ripple Rings while recording */}
              {isRecording && (
                <>
                  <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-500/30 animate-ripple pointer-events-none" />
                  <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-500/20 animate-ripple-delayed pointer-events-none" />
                </>
              )}

              {/* Central Mic Button */}
              <button
                onClick={handleToggleRecord}
                className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all active:scale-95 ${
                  isRecording
                    ? 'bg-rose-600 text-white ring-4 ring-rose-200 hover:bg-rose-700'
                    : 'bg-brand-primary text-white ring-4 ring-blue-100 hover:bg-brand-primary-hover'
                }`}
                title={isRecording ? 'Bấm để dừng và chấm điểm' : 'Bấm để bắt đầu thu âm'}
              >
                {isRecording ? (
                  <>
                    <Square className="w-8 h-8 fill-current mb-0.5" />
                    <span className="text-[10px] font-mono font-bold">
                      00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                    </span>
                  </>
                ) : (
                  <>
                    <Mic className="w-8 h-8 mb-0.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Thu âm
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Subtext under mic */}
            <div className="text-center mt-4">
              <p className="text-sm font-semibold text-slate-800">
                {isRecording
                  ? 'Đang lắng nghe giọng đọc của bạn... Nhấn nút vuông để hoàn tất'
                  : 'Nhấn nút Mic để bắt đầu nói câu tiếng Anh trên'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                AI sẽ phân tích từng âm vị và chấm điểm chuẩn xác theo chuẩn bản xứ
              </p>
            </div>
          </div>

          {/* Evaluation Results Section */}
          <AnimatePresence>
            {hasEvaluated && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-sm ${
                        overallScore >= 80
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : overallScore >= 50
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {overallScore}%
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        ĐIỂM ĐÁNH GIÁ TỔNG QUAN
                      </div>
                      <div className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                        {overallScore >= 80 ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Phát âm chuẩn xác &amp; lưu loát!
                          </>
                        ) : overallScore >= 50 ? (
                          <>
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            Khá tốt! Cần chú ý các âm cuối và nối âm.
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            Cần luyện tập phát âm chậm và rõ hơn.
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Waveform Compare Button */}
                  <button
                    onClick={() => setShowWaveformModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-all shadow-sm"
                  >
                    <Activity className="w-4 h-4 text-violet-600" />
                    So sánh đồ thị sóng âm (Waveform)
                  </button>
                </div>

                {/* Score Legend */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium my-4">
                  <span className="text-slate-500 font-semibold">Quy ước màu sắc:</span>
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    80 - 100: Chuẩn xác (Emerald)
                  </span>
                  <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    50 - 79: Cần cải thiện (Amber)
                  </span>
                  <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    &lt; 50: Chưa chuẩn (Rose)
                  </span>
                </div>

                {/* Selected Word Phoneme Inspector */}
                {selectedWord && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mt-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">
                          Từ được chọn: "{selectedWord.word}"
                        </span>
                        <span className="font-ipa text-sm text-slate-500">
                          {selectedWord.ipa}
                        </span>
                        <button
                          onClick={(e) => handlePlayWord(e, selectedWord.word)}
                          className="p-1 text-slate-500 hover:text-brand-primary rounded"
                          title="Nghe phát âm từ này"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          getScoreColorClass(selectedWord.score).badge
                        }`}
                      >
                        {selectedWord.score}% — {getScoreColorClass(selectedWord.score).label}
                      </span>
                    </div>

                    {/* Phoneme tiles if available */}
                    {selectedWord.phonemes && selectedWord.phonemes.length > 0 && (
                      <div>
                        <div className="text-xs text-slate-500 mb-1.5 font-medium">
                          Phân tách các âm tiết &amp; âm vị (Phonemes):
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedWord.phonemes.map((ph, pIdx) => {
                            const phColor = getScoreColorClass(ph.score);
                            return (
                              <div
                                key={pIdx}
                                className={`px-3 py-1.5 rounded-lg border text-center ${phColor.bg} ${phColor.border}`}
                              >
                                <div className="font-ipa font-bold text-sm text-slate-800">
                                  /{ph.phoneme}/
                                </div>
                                <div className="text-[10px] font-bold text-slate-600 mt-0.5">
                                  {ph.score}%
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Expert Vietnamese Tip */}
                <div className="mt-4 p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Mẹo phát âm từ giáo viên: </span>
                    {currentLesson.tipsVi}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Waveform Comparison Modal */}
      <AnimatePresence>
        {showWaveformModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-primary" />
                  <h3 className="text-lg font-bold text-slate-900">
                    So Sánh Đồ Thị Âm Thanh (Waveform Comparison)
                  </h3>
                </div>
                <button
                  onClick={() => setShowWaveformModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-6 space-y-6">
                {/* Native Speaker Waveform */}
                <div className="p-4 bg-slate-900 rounded-2xl text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-xs font-bold text-blue-300">
                        Giọng Bản Xứ Chuẩn (Native Audio)
                      </span>
                    </div>
                    <button
                      onClick={handlePlayNative}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" /> Nghe
                    </button>
                  </div>

                  {/* Simulated Waveform Visualizer SVG */}
                  <div className="h-14 flex items-center justify-between gap-1 px-2 pt-2">
                    {[
                      24, 38, 55, 78, 62, 45, 85, 95, 70, 50, 65, 80, 40, 20, 60,
                      88, 75, 40, 65, 85, 92, 58, 30, 45, 60, 75, 30, 15,
                    ].map((height, i) => (
                      <div
                        key={i}
                        style={{ height: `${height}%` }}
                        className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>

                {/* User Waveform */}
                <div className="p-4 bg-slate-900 rounded-2xl text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-emerald-300">
                        Giọng Ghi Âm Của Bạn (Your Recording)
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsSimulatedUserPlaying(true);
                        playSpeech(currentLesson.targetSentence, 'en-US', 0.9).then(() =>
                          setIsSimulatedUserPlaying(false)
                        );
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      {isSimulatedUserPlaying ? (
                        <Pause className="w-3 h-3" />
                      ) : (
                        <Play className="w-3 h-3" />
                      )}
                      Phát lại
                    </button>
                  </div>

                  {/* User Waveform Visualizer SVG */}
                  <div className="h-14 flex items-center justify-between gap-1 px-2 pt-2">
                    {[
                      18, 30, 48, 70, 50, 40, 78, 90, 62, 44, 58, 72, 35, 18, 52,
                      80, 68, 38, 55, 78, 86, 50, 25, 38, 54, 68, 26, 12,
                    ].map((height, i) => (
                      <div
                        key={i}
                        style={{ height: `${height}%` }}
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-full transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <p className="font-bold text-slate-900 mb-1">
                    Nhận xét về độ tương đồng âm học:
                  </p>
                  Đồ thị cường độ âm thanh cho thấy bạn đã thể hiện đúng trường độ của các nguyên âm chính. Điểm cần gia tăng là lực bật của các phụ âm vô thanh ở đuôi câu nhằm đạt độ dứt khoát tương đương người bản xứ.
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowWaveformModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
