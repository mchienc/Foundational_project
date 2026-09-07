import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Repeat,
  FileText,
  Edit3,
  CheckCircle2,
  RefreshCw,
  Languages,
  ChevronLeft,
} from 'lucide-react';
import { ListeningLesson, TranscriptSegment } from '../../types';
import { sampleListeningLessons } from '../../data/englishMockData';
import { playSpeech, soundEffects, triggerConfetti } from '../../utils/audioUtils';

interface ListeningPlayerProps {
  onEarnXp: (amount: number, reason: string) => void;
  onBackToDashboard?: () => void;
}

export const ListeningPlayer: React.FC<ListeningPlayerProps> = ({
  onEarnXp,
  onBackToDashboard,
}) => {
  const [lessons] = useState<ListeningLesson[]>(sampleListeningLessons);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const currentLesson = lessons[currentLessonIndex];

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeMs, setCurrentTimeMs] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // A-B Loop feature
  const [loopA, setLoopA] = useState<number | null>(null);
  const [loopB, setLoopB] = useState<number | null>(null);
  const [isLoopActive, setIsLoopActive] = useState<boolean>(false);

  // Mode: Normal Transcript vs Dictation Mode
  const [isDictationMode, setIsDictationMode] = useState<boolean>(false);
  const [showBilingual, setShowBilingual] = useState<boolean>(true);

  // Dictation user inputs: segmentId_wordIndex -> userTypedString
  const [dictationAnswers, setDictationAnswers] = useState<Record<string, string>>({});
  const [dictationChecked, setDictationChecked] = useState<boolean>(false);
  const [dictationScore, setDictationScore] = useState<{ correct: number; total: number } | null>(null);

  const transcriptScrollRef = useRef<HTMLDivElement>(null);
  const activeSegmentRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine which segment is currently playing
  const activeSegment = currentLesson.segments.find(
    (seg) => currentTimeMs >= seg.startMs && currentTimeMs <= seg.endMs
  ) || currentLesson.segments[0];

  // Auto-scroll transcript to active segment
  useEffect(() => {
    if (activeSegmentRef.current && isPlaying) {
      activeSegmentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSegment?.id, isPlaying]);

  // Playback timer engine
  useEffect(() => {
    if (isPlaying) {
      const stepInterval = 100;
      intervalRef.current = setInterval(() => {
        setCurrentTimeMs((prev) => {
          const next = prev + stepInterval * playbackSpeed;

          // Handle A-B Loop
          if (isLoopActive && loopA !== null && loopB !== null) {
            if (next >= loopB) {
              return loopA;
            }
          }

          // Handle audio end
          if (next >= currentLesson.audioDurationMs) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, stepInterval);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playbackSpeed, isLoopActive, loopA, loopB, currentLesson.audioDurationMs]);

  // Reset when lesson changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTimeMs(0);
    setLoopA(null);
    setLoopB(null);
    setIsLoopActive(false);
    setDictationAnswers({});
    setDictationChecked(false);
    setDictationScore(null);
  }, [currentLessonIndex]);

  // Controls: Play / Pause
  const handleTogglePlay = () => {
    soundEffects.playClick();
    if (!isPlaying) {
      // Voice synthesis for current segment if starting
      const segmentText = activeSegment ? activeSegment.textEn : currentLesson.segments[0].textEn;
      playSpeech(segmentText, 'en-US', playbackSpeed);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  // Rewind 5s
  const handleRewind5s = () => {
    soundEffects.playClick();
    setCurrentTimeMs((prev) => Math.max(0, prev - 5000));
  };

  // Fast forward 5s
  const handleForward5s = () => {
    soundEffects.playClick();
    setCurrentTimeMs((prev) => Math.min(currentLesson.audioDurationMs, prev + 5000));
  };

  // Click on a segment to seek and play
  const handleSeekToSegment = (seg: TranscriptSegment) => {
    soundEffects.playClick();
    setCurrentTimeMs(seg.startMs);
    setIsPlaying(true);
    playSpeech(seg.textEn, 'en-US', playbackSpeed);
  };

  // Toggle A-B Loop
  const handleToggleABLoop = () => {
    soundEffects.playClick();
    if (!isLoopActive) {
      // Set A at current segment start, B at segment end
      const start = activeSegment ? activeSegment.startMs : 0;
      const end = activeSegment ? activeSegment.endMs : 5000;
      setLoopA(start);
      setLoopB(end);
      setIsLoopActive(true);
    } else {
      setLoopA(null);
      setLoopB(null);
      setIsLoopActive(false);
    }
  };

  // Handle Dictation Answer Check
  const handleCheckDictation = () => {
    let correct = 0;
    let total = 0;

    currentLesson.segments.forEach((seg) => {
      if (seg.dictationBlanks) {
        seg.dictationBlanks.forEach((blank) => {
          total += 1;
          const key = `${seg.id}_${blank.wordIndex}`;
          const userAns = (dictationAnswers[key] || '').trim().toLowerCase();
          if (userAns === blank.correctWord.toLowerCase()) {
            correct += 1;
          }
        });
      }
    });

    setDictationScore({ correct, total });
    setDictationChecked(true);

    if (correct === total && total > 0) {
      soundEffects.playSuccess();
      triggerConfetti();
      onEarnXp(40, `Xuất sắc! Chép chính tả đúng 100% (+40 XP)`);
    } else {
      soundEffects.playPop();
      onEarnXp(15, `Đã hoàn thành bài kiểm tra Dictation (+15 XP)`);
    }
  };

  // Format millisecond to MM:SS
  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-brand-primary">
              Smart Audio &amp; Interactive Transcript
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Luyện nghe chuyên sâu &amp; Chép chính tả
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Trình Luyện Nghe Karaoke &amp; Dictation
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Lộ trình
            </button>
          )}
          {/* Lesson Switcher */}
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
                Chủ đề {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Player Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
        {/* Lesson Metadata Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                {currentLesson.topic}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {currentLesson.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Diễn giả: <span className="font-semibold text-white">{currentLesson.speakerName}</span> ({currentLesson.speakerRole})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-amber-300 border border-slate-700">
                {currentLesson.level}
              </span>
            </div>
          </div>

          {/* Scrubbable Progress Bar */}
          <div className="mt-8">
            <div className="relative w-full h-2.5 bg-slate-700 rounded-full cursor-pointer overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                setCurrentTimeMs(ratio * currentLesson.audioDurationMs);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full relative"
                style={{
                  width: `${(currentTimeMs / currentLesson.audioDurationMs) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-mono">
              <span>{formatTime(currentTimeMs)}</span>
              {isLoopActive && loopA !== null && loopB !== null && (
                <span className="text-amber-400 font-bold">
                  Lặp A-B: {formatTime(loopA)} - {formatTime(loopB)}
                </span>
              )}
              <span>{formatTime(currentLesson.audioDurationMs)}</span>
            </div>
          </div>

          {/* Audio Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800">
            {/* Speed selection */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 mr-1">Tốc độ:</span>
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => {
                    soundEffects.playClick();
                    setPlaybackSpeed(speed);
                  }}
                  className={`px-2 py-1 rounded-md text-xs font-bold transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Main Center Controls */}
            <div className="flex items-center gap-3">
              {/* Rewind 5s */}
              <button
                onClick={handleRewind5s}
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all active:scale-95"
                title="Lùi lại 5 giây"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Play / Pause */}
              <button
                onClick={handleTogglePlay}
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              {/* Forward 5s */}
              <button
                onClick={handleForward5s}
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all active:scale-95"
                title="Tiến lên 5 giây"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* A-B Loop & Bilingual Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleABLoop}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isLoopActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
                title="Lặp đoạn hiện tại liên tục"
              >
                <Repeat className="w-3.5 h-3.5" />
                A-B Loop {isLoopActive && 'ON'}
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Toolbar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDictationMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !isDictationMode
                  ? 'bg-white text-brand-primary shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Chế độ Karaoke Highlight
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsDictationMode(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isDictationMode
                  ? 'bg-white text-brand-primary shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Chế độ Chép chính tả (Dictation)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBilingual((prev) => !prev)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-sm"
            >
              <Languages className="w-3.5 h-3.5 text-slate-500" />
              {showBilingual ? 'Ẩn tiếng Việt' : 'Hiện tiếng Việt'}
            </button>
          </div>
        </div>

        {/* Transcript / Dictation Content Area */}
        <div
          ref={transcriptScrollRef}
          className="p-6 sm:p-8 max-h-[480px] overflow-y-auto transcript-scroll space-y-4"
        >
          {currentLesson.segments.map((seg) => {
            const isActive =
              currentTimeMs >= seg.startMs && currentTimeMs <= seg.endMs;

            return (
              <motion.div
                key={seg.id}
                ref={isActive ? activeSegmentRef : null}
                onClick={() => handleSeekToSegment(seg)}
                whileHover={{ scale: 1.005 }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50/90 border-brand-primary ring-2 ring-blue-200 shadow-md'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50/80 shadow-sm'
                }`}
              >
                {/* Speaker & Timestamp tag */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-xs font-bold text-slate-900">
                      {seg.speaker}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formatTime(seg.startMs)}
                  </span>
                </div>

                {/* English Text Content */}
                {!isDictationMode ? (
                  /* Standard Karaoke Highlight mode */
                  <p
                    className={`text-base font-semibold leading-relaxed ${
                      isActive ? 'text-brand-navy' : 'text-slate-700'
                    }`}
                  >
                    {seg.textEn}
                  </p>
                ) : (
                  /* Dictation Mode: Fill in the blank inputs */
                  <div className="text-base font-medium text-slate-800 leading-loose flex flex-wrap items-center gap-1.5">
                    {seg.textEn.split(' ').map((word, wIdx) => {
                      const blank = seg.dictationBlanks?.find(
                        (b) => b.wordIndex === wIdx
                      );

                      if (!blank) {
                        return <span key={wIdx}>{word} </span>;
                      }

                      const answerKey = `${seg.id}_${wIdx}`;
                      const userVal = dictationAnswers[answerKey] || '';
                      const isCorrect =
                        dictationChecked &&
                        userVal.trim().toLowerCase() ===
                          blank.correctWord.toLowerCase();
                      const isWrong = dictationChecked && !isCorrect;

                      return (
                        <span key={wIdx} className="inline-flex items-center mx-1">
                          <input
                            type="text"
                            value={userVal}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setDictationAnswers((prev) => ({
                                ...prev,
                                [answerKey]: e.target.value,
                              }));
                            }}
                            placeholder={blank.hint || 'Điền từ...'}
                            className={`px-2.5 py-1 text-sm font-semibold rounded-lg border outline-none transition-all w-28 sm:w-36 text-center ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                                : isWrong
                                ? 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200'
                                : 'bg-white border-blue-300 focus:border-brand-primary focus:ring-2 focus:ring-blue-100 text-slate-900'
                            }`}
                          />
                          {dictationChecked && (
                            <span className="ml-1 text-xs">
                              {isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                              ) : (
                                <span className="text-rose-600 font-bold underline">
                                  ({blank.correctWord})
                                </span>
                              )}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Bilingual Vietnamese Translation */}
                {showBilingual && (
                  <p className="text-xs text-slate-500 mt-2 italic border-t border-slate-100 pt-2">
                    {seg.textVi}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Dictation Check Bottom Bar */}
        {isDictationMode && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              {dictationScore ? (
                <span className="font-bold text-sm text-slate-900">
                  Kết quả: {dictationScore.correct} / {dictationScore.total} từ chính xác (
                  {Math.round((dictationScore.correct / dictationScore.total) * 100)}%)
                </span>
              ) : (
                'Hãy nghe kỹ từng đoạn và điền từ vựng còn khuyết vào ô trống'
              )}
            </div>

            <div className="flex items-center gap-3">
              {dictationChecked && (
                <button
                  onClick={() => {
                    setDictationAnswers({});
                    setDictationChecked(false);
                    setDictationScore(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" /> Làm lại
                </button>
              )}
              <button
                onClick={handleCheckDictation}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-primary text-white hover:bg-brand-primary-hover shadow-md active:scale-95 transition-all"
              >
                Kiểm tra câu trả lời
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
