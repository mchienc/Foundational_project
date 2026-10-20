// frontend/src/modules/dictation/YouTubeFocusRoom.tsx
// Không Gian Chép Chính Tả Tập Trung (/dictation/[id]) đồng bộ thời gian thực với YouTube IFrame API

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Repeat,
  Lightbulb,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Volume2,
  Award,
  Sparkles,
  Keyboard,
  FileText,
  HelpCircle,
  Check,
  AlertCircle,
} from 'lucide-react';
import { DictationLesson, DiffCheckResult } from './types';
import { evaluateDictationDiff, cleanSingleWord } from './diffEngine';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YouTubeFocusRoomProps {
  lesson: DictationLesson;
  onExit: () => void;
  onProgressUpdate?: (lessonId: string, completedCount: number, totalCount: number) => void;
}

const LOOP_PAUSE_DELAY_MS = 800;  // Nghỉ 0.8s giữa các lần lặp để học viên kịp gõ chữ

export const YouTubeFocusRoom: React.FC<YouTubeFocusRoomProps> = ({
  lesson,
  onExit,
  onProgressUpdate,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [diffResult, setDiffResult] = useState<DiffCheckResult | null>(null);
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});
  const [revealedMap, setRevealedMap] = useState<Record<number, boolean>>({});
  const [savedInputsMap, setSavedInputsMap] = useState<Record<number, string>>({});

  // Chế độ luyện: 'full' (Chép trắng cả câu) | 'cloze' (Gợi ý khung câu, chỉ ẩn từ khóa học thuật)
  const [practiceMode, setPracticeMode] = useState<'full' | 'cloze'>('full');

  // Trạng thái trình phát YouTube
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Chế độ lặp Auto A-B Loop: 1 (Không lặp), 2 (Lặp 2 lần), 3 (Lặp 3 lần), 99 (Lặp liên tục)
  const [loopLimit, setLoopLimit] = useState<1 | 2 | 3 | 99>(1);
  const [currentLoopCount, setCurrentLoopCount] = useState<number>(0);
  const [isWaitingNextLoop, setIsWaitingNextLoop] = useState<boolean>(false);

  // Mở toàn văn transcript
  const [showFullTranscript, setShowFullTranscript] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const playerContainerId = useRef<string>(`yt-dictation-player-${lesson.id}`);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const loopTimeoutRef = useRef<number | null>(null);

  const currentSentence = lesson.sentences[currentIdx] || lesson.sentences[0];
  const currentSentenceRef = useRef(currentSentence);
  useEffect(() => {
    currentSentenceRef.current = currentSentence;
  }, [currentSentence]);

  const isCurrentPassed =
    Boolean(completedMap[currentSentence?.id]) ||
    Boolean(revealedMap[currentSentence?.id]) ||
    Boolean(diffResult?.isPassed);

  // Khôi phục tiến độ của bài học từ localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`eduflow_dictation_prog_v2_${lesson.id}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.completedMap) setCompletedMap(parsed.completedMap);
        if (parsed.savedInputsMap) {
          setSavedInputsMap(parsed.savedInputsMap);
          const firstInput = parsed.savedInputsMap[lesson.sentences[0]?.id];
          if (firstInput) setUserInput(firstInput);
        }
      }
    } catch {
      // Bỏ qua lỗi đọc storage
    }
  }, [lesson.id, lesson.sentences]);

  // Lưu tiến độ vào localStorage mỗi khi hoàn thành câu
  const persistProgress = useCallback(
    (newCompleted: Record<number, boolean>, newInputs: Record<number, string>) => {
      try {
        localStorage.setItem(
          `eduflow_dictation_prog_v2_${lesson.id}`,
          JSON.stringify({
            completedMap: newCompleted,
            savedInputsMap: newInputs,
            updatedAt: Date.now(),
          })
        );
        const doneCount = Object.values(newCompleted).filter(Boolean).length;
        onProgressUpdate?.(lesson.id, doneCount, lesson.sentences.length);
      } catch {
        // Ignore
      }
    },
    [lesson.id, lesson.sentences.length, onProgressUpdate]
  );

  // Khởi tạo YouTube IFrame Player API
  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!isMounted || !window.YT || !window.YT.Player) return;

      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore
        }
      }

      playerRef.current = new window.YT.Player(playerContainerId.current, {
        videoId: lesson.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          cc_load_policy: 0, // Tắt phụ đề mặc định trên video để tránh lộ đáp án
          iv_load_policy: 3, // Tắt annotations
          playsinline: 1,
          start: Math.floor(lesson.sentences[0]?.start || 0),
        },
        events: {
          onReady: () => {
            if (!isMounted) return;
            setIsPlayerReady(true);
            setCurrentTime(lesson.sentences[0]?.start || 0);
          },
          onStateChange: (event: any) => {
            if (!isMounted) return;
            // YT.PlayerState.PLAYING === 1
            if (event.data === 1) {
              setIsPlaying(true);
              const sent = currentSentenceRef.current;
              const now = event.target?.getCurrentTime?.() || 0;
              // Nếu bấm Play trực tiếp trên khung YouTube khi kim thời gian nằm ngoài câu hiện tại, tự động nhảy đúng vào đầu câu hiện tại
              if (sent && (now < sent.start - 0.35 || now >= sent.end - 0.05)) {
                event.target.seekTo(sent.start, true);
              }
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.getElementById('youtube-iframe-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        initPlayer();
      };
    }

    return () => {
      isMounted = false;
      if (loopTimeoutRef.current) window.clearTimeout(loopTimeoutRef.current);
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore
        }
      }
    };
  }, [lesson.youtubeId, lesson.sentences]);

  // Phát câu hiện tại từ mốc start
  const playCurrentSentenceFromStart = useCallback(
    (resetLoopCounter = true) => {
      if (!playerRef.current || !isPlayerReady || !currentSentence) return;
      if (loopTimeoutRef.current) {
        window.clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
      setIsWaitingNextLoop(false);
      if (resetLoopCounter) {
        setCurrentLoopCount(1);
      }

      try {
        playerRef.current.seekTo(currentSentence.start, true);
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn('YouTube player seek error:', e);
      }
    },
    [currentSentence, isPlayerReady]
  );

  // Tạm dừng / Phát tiếp câu hiện tại
  const togglePlayPauseSentence = useCallback(() => {
    if (!playerRef.current || !isPlayerReady || !currentSentence) return;
    if (loopTimeoutRef.current) {
      window.clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
      setIsWaitingNextLoop(false);
    }

    try {
      const state = playerRef.current.getPlayerState?.();
      const nowTime = playerRef.current.getCurrentTime?.() || 0;

      if (state === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        // Nếu thời gian hiện tại nằm ngoài phạm vi câu, tự động tua về đầu câu
        if (nowTime < currentSentence.start - 0.5 || nowTime >= currentSentence.end) {
          playerRef.current.seekTo(currentSentence.start, true);
          setCurrentLoopCount(1);
        }
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn('YouTube toggle play error:', e);
    }
  }, [currentSentence, isPlayerReady]);

  // Bộ giám sát cắt lát âm thanh theo câu (Sentence-Slicing Audio Controller 50ms)
  useEffect(() => {
    if (!isPlayerReady || !currentSentence) return;

    const timer = window.setInterval(() => {
      if (!playerRef.current || typeof playerRef.current.getCurrentTime !== 'function') return;

      const state = playerRef.current.getPlayerState?.();
      const now = playerRef.current.getCurrentTime() || 0;
      setCurrentTime(now);

      // Chỉ kiểm tra cắt câu khi video đang phát (state === 1)
      if (state === 1) {
        if (now < currentSentence.start - 0.35) {
          playerRef.current.seekTo(currentSentence.start, true);
          return;
        }

        if (now >= currentSentence.end - 0.04) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);

          // Kiểm tra chế độ Auto A-B Loop
          setCurrentLoopCount((prevCount) => {
            const usedLoops = prevCount || 1;
            if (usedLoops < loopLimit) {
              setIsWaitingNextLoop(true);
              loopTimeoutRef.current = window.setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.seekTo(currentSentence.start, true);
                  playerRef.current.playVideo();
                  setIsPlaying(true);
                  setIsWaitingNextLoop(false);
                }
              }, LOOP_PAUSE_DELAY_MS);
              return usedLoops + 1;
            }
            return usedLoops;
          });
        }
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [isPlayerReady, currentSentence, loopLimit]);

  // Đổi tốc độ phát
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (playerRef.current?.setPlaybackRate) {
      playerRef.current.setPlaybackRate(rate);
    }
  };

  // Chuyển sang câu khác theo index
  const goToSentenceIndex = useCallback(
    (targetIdx: number, autoPlay = true) => {
      if (targetIdx < 0 || targetIdx >= lesson.sentences.length) return;
      if (loopTimeoutRef.current) {
        window.clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
      setIsWaitingNextLoop(false);

      const nextSentence = lesson.sentences[targetIdx];
      setCurrentIdx(targetIdx);

      const savedText = savedInputsMap[nextSentence.id] || '';
      setUserInput(savedText);

      if (savedText.trim()) {
        setDiffResult(evaluateDictationDiff(savedText, nextSentence.text));
      } else {
        setDiffResult(null);
      }

      setTimeout(() => {
        textareaRef.current?.focus();
        if (autoPlay && playerRef.current && isPlayerReady) {
          playerRef.current.seekTo(nextSentence.start, true);
          playerRef.current.playVideo();
          setIsPlaying(true);
          setCurrentLoopCount(1);
        }
      }, 60);
    },
    [lesson.sentences, savedInputsMap, isPlayerReady]
  );

  // Kiểm tra đáp án câu hiện tại
  const handleCheckAnswer = useCallback(() => {
    if (!currentSentence) return;
    const result = evaluateDictationDiff(userInput, currentSentence.text);
    setDiffResult(result);

    const updatedInputs = { ...savedInputsMap, [currentSentence.id]: userInput };
    setSavedInputsMap(updatedInputs);

    if (result.isPassed) {
      const updatedCompleted = { ...completedMap, [currentSentence.id]: true };
      setCompletedMap(updatedCompleted);
      persistProgress(updatedCompleted, updatedInputs);
    }
  }, [currentSentence, userInput, savedInputsMap, completedMap, persistProgress]);

  // Mở gợi ý 1 từ tiếp theo đang bị thiếu (Ctrl + H)
  const handleHintNextWord = useCallback(() => {
    if (!currentSentence) return;
    const currentEvaluation = evaluateDictationDiff(userInput, currentSentence.text);
    const firstMissingItem = currentEvaluation.items.find(
      (item) => item.status === 'missing' || item.status === 'typo'
    );

    if (!firstMissingItem || !firstMissingItem.targetWord) return;

    // Xây dựng chuỗi mới gồm các từ đúng tính tới từ gợi ý
    const reconstructedWords: string[] = [];
    let hintedAdded = false;

    for (const item of currentEvaluation.items) {
      if (item.status === 'correct') {
        reconstructedWords.push(item.targetWord || item.word);
      } else if (!hintedAdded) {
        reconstructedWords.push(item.targetWord || item.word);
        hintedAdded = true;
      } else {
        break;
      }
    }

    const updatedText = `${reconstructedWords.join(' ')} `;
    setUserInput(updatedText);
    setDiffResult(evaluateDictationDiff(updatedText, currentSentence.text));
    textareaRef.current?.focus();
  }, [currentSentence, userInput]);

  // Chấp nhận bỏ cuộc / Hiện đáp án câu hiện tại
  const handleRevealCurrentSentence = () => {
    if (!currentSentence) return;
    setRevealedMap((prev) => ({ ...prev, [currentSentence.id]: true }));
    setUserInput(currentSentence.text);
    const fullCheck = evaluateDictationDiff(currentSentence.text, currentSentence.text);
    setDiffResult(fullCheck);
  };

  // Lắng nghe bộ phím tắt thông minh (Không xung đột với phím Space / Arrow khi gõ chữ)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 1. Tab: Phát lại / Tạm dừng câu hiện tại
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      togglePlayPauseSentence();
      return;
    }

    // 2. Shift + Tab hoặc Ctrl + R: Tua lại từ đầu câu hiện tại
    if ((e.key === 'Tab' && e.shiftKey) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r')) {
      e.preventDefault();
      playCurrentSentenceFromStart(true);
      return;
    }

    // 3. Ctrl + H hoặc Alt + H: Gợi ý từ tiếp theo
    if ((e.ctrlKey || e.altKey) && e.key.toLowerCase() === 'h') {
      e.preventDefault();
      handleHintNextWord();
      return;
    }

    // 4. Alt + ArrowRight / Alt + ArrowLeft: Chuyển câu
    if (e.altKey && e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentIdx < lesson.sentences.length - 1) {
        goToSentenceIndex(currentIdx + 1, true);
      }
      return;
    }
    if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentIdx > 0) {
        goToSentenceIndex(currentIdx - 1, true);
      }
      return;
    }

    // 5. Enter: Kiểm tra đáp án (hoặc chuyển sang câu tiếp theo nếu đã đạt >= 90%)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isCurrentPassed && currentIdx < lesson.sentences.length - 1) {
        goToSentenceIndex(currentIdx + 1, true);
      } else {
        handleCheckAnswer();
      }
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Tạo khung gợi ý Cloze cho chế độ Keyword Cloze Mode
  const renderClozePreview = () => {
    if (!currentSentence) return null;
    const words = currentSentence.text.split(/\s+/);
    return (
      <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-sm font-sans leading-relaxed flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-950 mr-1">
          Khung Cloze:
        </span>
        {words.map((w, i) => {
          const clean = cleanSingleWord(w);
          const isKeyword = clean.length >= 5 && i % 2 === 1;
          if (isKeyword) {
            const firstChar = Array.from(clean)[0] || '';
            return (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-white border border-dashed border-amber-500 text-amber-900 font-mono text-xs font-bold"
              >
                {firstChar}
                {'_'.repeat(Math.min(6, clean.length - 1))}
              </span>
            );
          }
          return (
            <span key={i} className="text-stone-800 font-medium">
              {w}
            </span>
          );
        })}
      </div>
    );
  };

  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const sentenceDuration = Math.max(1, currentSentence.end - currentSentence.start);
  const sliceProgress = Math.min(
    100,
    Math.max(0, ((currentTime - currentSentence.start) / sentenceDuration) * 100)
  );

  return (
    <div
      data-lenis-prevent="true"
      className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 font-sans selection:bg-amber-300/50"
    >
      {/* 1. STUDIO TOPBAR & PROGRESS */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E7E5E4] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Back button & Lesson title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onExit}
              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft size={15} />
              <span>‹ Thoát về Kho Video</span>
            </button>

            <div className="min-w-0 hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#064E3B] text-amber-300 font-mono text-[10px] font-bold">
                  {lesson.level}
                </span>
                <span className="text-[11px] font-mono text-stone-500 truncate">
                  {lesson.channel}
                </span>
              </div>
              <h1 className="font-serif font-bold text-sm text-[#064E3B] truncate max-w-md">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Center: Sentence Progress Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-xs sm:max-w-md">
            {lesson.sentences.map((s, idx) => {
              const isCurrent = idx === currentIdx;
              const isDone = Boolean(completedMap[s.id]);
              const isRevealed = Boolean(revealedMap[s.id]);

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSentenceIndex(idx, true)}
                  title={`Câu ${idx + 1} (${formatTime(s.start)} - ${formatTime(s.end)})`}
                  className={`w-7 h-7 rounded-full font-mono text-[11px] font-bold flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                    isCurrent
                      ? 'bg-[#064E3B] text-amber-300 border-[#064E3B] ring-2 ring-amber-400/60 scale-105'
                      : isDone
                      ? 'bg-emerald-100 text-[#064E3B] border-emerald-300'
                      : isRevealed
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {isDone ? <Check size={12} /> : idx + 1}
                </button>
              );
            })}
          </div>

          {/* Right: Speed Selector & Full Transcript Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              {[0.75, 0.9, 1.0].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => handleSpeedChange(rate)}
                  className={`px-2 py-1 rounded-lg font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                    playbackRate === rate
                      ? 'bg-[#064E3B] text-amber-300 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowFullTranscript((prev) => !prev)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                showFullTranscript
                  ? 'bg-amber-100 text-amber-950 border-amber-300'
                  : 'bg-white text-stone-700 border-[#E7E5E4] hover:bg-stone-100'
              }`}
            >
              <FileText size={14} className="text-[#D97706]" />
              <span className="hidden sm:inline">Hiện Toàn Văn Transcript</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE: LEFT (YOUTUBE PLAYER) & RIGHT (DICTATION ENGINE) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (5 Cols): YouTube Video & Sentence Audio Controller */}
        <section className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-4 sm:p-5 shadow-xs space-y-4">
            {/* YouTube IFrame Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-950 border border-stone-200 shadow-inner">
              <div id={playerContainerId.current} className="w-full h-full" />
            </div>

            {/* Sentence Slicing Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-600">
                <span className="font-bold text-[#064E3B] flex items-center gap-1.5">
                  <Volume2 size={13} className="text-[#D97706]" />
                  Đoạn cắt Câu {currentIdx + 1}: {formatTime(currentSentence.start)} –{' '}
                  {formatTime(currentSentence.end)}
                </span>
                <span>
                  {isWaitingNextLoop
                    ? 'Đang nghỉ nhịp lặp...'
                    : isPlaying
                    ? 'Đang phát...'
                    : 'Đã tạm dừng'}
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className="h-full bg-[#064E3B] transition-all duration-100 rounded-full"
                  style={{ width: `${sliceProgress}%` }}
                />
              </div>
            </div>

            {/* Audio Slicing Controls & Auto A-B Loop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={togglePlayPauseSentence}
                className="col-span-1 py-2.5 px-3 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-amber-300 text-amber-300" />}
                <span>{isPlaying ? 'Tạm Dừng' : 'Phát Câu'}</span>
              </button>

              <button
                type="button"
                onClick={() => playCurrentSentenceFromStart(true)}
                className="col-span-1 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCcw size={14} className="text-[#064E3B]" />
                <span>Nghe Lại Từ Đầu</span>
              </button>

              {/* Auto A-B Loop Cycle Button */}
              <button
                type="button"
                onClick={() => {
                  const nextLoop = loopLimit === 1 ? 2 : loopLimit === 2 ? 3 : loopLimit === 3 ? 99 : 1;
                  setLoopLimit(nextLoop);
                }}
                className={`col-span-2 sm:col-span-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  loopLimit > 1
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
                title="Tự động phát lặp lại câu hiện tại"
              >
                <Repeat size={14} className={loopLimit > 1 ? 'text-[#D97706]' : 'text-stone-400'} />
                <span>
                  {loopLimit === 1
                    ? 'Auto Loop: Tắt'
                    : loopLimit === 99
                    ? 'Loop: Vô hạn'
                    : `Loop: ${currentLoopCount}/${loopLimit} lần`}
                </span>
              </button>
            </div>
          </div>

          {/* Keyboard Shortcuts Guide Card */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-[#064E3B] flex items-center gap-1.5">
                <Keyboard size={14} className="text-[#D97706]" />
                Phím Tắt Thao Tác Nhanh
              </span>
              <span className="text-[10px] font-mono text-stone-400">Tối ưu không rời bàn phím</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-[#FAFAF9] border border-stone-200/80 flex items-center justify-between">
                <span className="text-stone-600">Phát / Dừng câu</span>
                <kbd className="px-2 py-0.5 rounded bg-white border border-stone-300 font-mono text-[10px] font-bold text-stone-800 shadow-2xs">
                  Tab
                </kbd>
              </div>
              <div className="p-2 rounded-xl bg-[#FAFAF9] border border-stone-200/80 flex items-center justify-between">
                <span className="text-stone-600">Tua lại đầu câu</span>
                <kbd className="px-2 py-0.5 rounded bg-white border border-stone-300 font-mono text-[10px] font-bold text-stone-800 shadow-2xs">
                  Ctrl + R
                </kbd>
              </div>
              <div className="p-2 rounded-xl bg-[#FAFAF9] border border-stone-200/80 flex items-center justify-between">
                <span className="text-stone-600">Chấm đáp án</span>
                <kbd className="px-2 py-0.5 rounded bg-white border border-stone-300 font-mono text-[10px] font-bold text-stone-800 shadow-2xs">
                  Enter
                </kbd>
              </div>
              <div className="p-2 rounded-xl bg-[#FAFAF9] border border-stone-200/80 flex items-center justify-between">
                <span className="text-stone-600">Gợi ý 1 từ (Hint)</span>
                <kbd className="px-2 py-0.5 rounded bg-white border border-stone-300 font-mono text-[10px] font-bold text-stone-800 shadow-2xs">
                  Ctrl + H
                </kbd>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN (7 Cols): Dictation Input & Live Word-by-Word Diff Engine */}
        <section className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-5">
            {/* Sentence Header & Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-xl bg-[#064E3B] text-amber-300 font-mono text-xs font-bold">
                  Câu {currentIdx + 1} / {lesson.sentences.length}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  Tổng số từ cần nghe:{' '}
                  <strong className="text-stone-800">
                    {currentSentence.text.trim().split(/\s+/).length} từ
                  </strong>
                </span>
              </div>

              {/* Switch Full Dictation vs Keyword Cloze */}
              <div className="inline-flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
                <button
                  type="button"
                  onClick={() => setPracticeMode('full')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    practiceMode === 'full'
                      ? 'bg-white text-[#064E3B] shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Chép Toàn Câu
                </button>
                <button
                  type="button"
                  onClick={() => setPracticeMode('cloze')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    practiceMode === 'cloze'
                      ? 'bg-white text-[#064E3B] shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Gợi Ý Khung Cloze
                </button>
              </div>
            </div>

            {/* Optional Cloze Frame */}
            {practiceMode === 'cloze' && renderClozePreview()}

            {/* Large Auto-Focus Dictation Textarea (18px) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase text-stone-500">
                  Nhập nội dung bạn nghe được:
                </label>
                <button
                  type="button"
                  onClick={handleHintNextWord}
                  className="text-xs font-bold text-[#D97706] hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  title="Điền tự động 1 từ tiếp theo đang thiếu (Ctrl + H)"
                >
                  <Lightbulb size={13} />
                  <span>Gợi ý từ tiếp theo (Ctrl+H)</span>
                </button>
              </div>

              <textarea
                ref={textareaRef}
                autoFocus
                rows={3}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nghe câu thoại và gõ lại tại đây... (Nhấn Tab để phát/dừng, Enter để kiểm tra)"
                className="w-full p-4 rounded-2xl border-2 border-stone-300 focus:border-[#064E3B] focus:ring-4 focus:ring-emerald-900/5 bg-[#FAFAF9] text-[18px] leading-relaxed font-sans text-stone-900 placeholder:text-stone-400 outline-none transition-all resize-none"
              />
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  className="px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <CheckCircle2 size={15} className="text-amber-300" />
                  <span>Kiểm Tra Đáp Án (Enter)</span>
                </button>

                <button
                  type="button"
                  onClick={handleRevealCurrentSentence}
                  className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Eye size={14} />
                  <span>Hiện Đáp Án Câu Này</span>
                </button>
              </div>

              {/* Prev / Next Sentence Navigation */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => goToSentenceIndex(currentIdx - 1, true)}
                  className="p-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 disabled:opacity-40 cursor-pointer"
                  title="Câu trước đó (Alt + Left)"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  disabled={!isCurrentPassed || currentIdx >= lesson.sentences.length - 1}
                  onClick={() => goToSentenceIndex(currentIdx + 1, true)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCurrentPassed && currentIdx < lesson.sentences.length - 1
                      ? 'bg-[#D97706] hover:bg-amber-700 text-white shadow-sm'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                  title={
                    isCurrentPassed
                      ? 'Chuyển sang câu tiếp theo'
                      : 'Đạt độ chính xác >= 90% để mở khóa câu tiếp theo'
                  }
                >
                  <span>Câu Tiếp Theo</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* 3. WORD-BY-WORD DIFF CHECKER RESULT PANEL */}
            {diffResult && (
              <div className="pt-4 border-t border-stone-200 space-y-4 animate-in fade-in duration-150">
                {/* Accuracy Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-stone-600">
                      Độ Chính Xác Câu:
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold ${
                        diffResult.accuracy >= 90
                          ? 'bg-emerald-100 text-[#064E3B] border border-emerald-300'
                          : diffResult.accuracy >= 60
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      {diffResult.accuracy}% ({diffResult.correctCount}/{diffResult.totalWords} từ chuẩn)
                    </span>
                  </div>

                  {diffResult.isPassed ? (
                    <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1">
                      <Sparkles size={14} className="text-[#D97706]" />
                      Đã vượt mốc 90%! Nhấn Enter để sang câu kế tiếp.
                    </span>
                  ) : (
                    <span className="text-xs text-stone-500 flex items-center gap-1">
                      <HelpCircle size={13} className="text-amber-600" />
                      Cần đạt tối thiểu 90% để mở khóa câu tiếp theo.
                    </span>
                  )}
                </div>

                {/* Word-by-Word Visual Tokens */}
                <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
                  <div className="flex flex-wrap items-center gap-2 leading-relaxed">
                    {diffResult.items.map((item, idx) => {
                      if (item.status === 'correct') {
                        return (
                          <span
                            key={idx}
                            className="text-[#064E3B] font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg text-sm"
                          >
                            {item.word}
                          </span>
                        );
                      }

                      if (item.status === 'typo') {
                        return (
                          <span
                            key={idx}
                            className="text-[#D97706] font-semibold bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-lg text-sm inline-flex items-center gap-1"
                            title={`Sai chính tả nhẹ (Levenshtein <= 1). Chuẩn: "${item.targetWord}"`}
                          >
                            <span>{item.word}</span>
                            <span className="text-[11px] font-mono text-emerald-800">
                              → {item.targetWord}
                            </span>
                          </span>
                        );
                      }

                      // status === 'missing'
                      return (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-stone-200/70 border border-dashed border-stone-400 text-stone-500 font-mono text-xs select-none"
                          title="Từ còn thiếu chưa nghe được"
                        >
                          {'•'.repeat(Math.min(7, (item.targetWord || '').length))}
                        </span>
                      );
                    })}
                  </div>

                  {/* Extra wrong words typed by user */}
                  {diffResult.extraWrongWords.length > 0 && (
                    <div className="pt-2 border-t border-stone-200/70 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-stone-500 font-mono flex items-center gap-1">
                        <AlertCircle size={12} className="text-[#DC2626]" />
                        Từ gõ sai / thừa:
                      </span>
                      {diffResult.extraWrongWords.map((w, i) => (
                        <span
                          key={i}
                          className="text-[#DC2626] line-through decoration-red-400 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md font-medium"
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Show Original Sentence & Vietnamese Translation once Passed or Revealed */}
                {isCurrentPassed && (
                  <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1">
                        <Award size={12} /> Câu Nguyên Bản Chuẩn Học Thuật
                      </span>
                    </div>
                    <p className="font-serif text-base font-bold text-white leading-relaxed">
                      "{currentSentence.text}"
                    </p>
                    {currentSentence.translationVi && (
                      <p className="text-xs text-emerald-200 italic pt-0.5">
                        Nghĩa: {currentSentence.translationVi}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. FULL TRANSCRIPT DRAWER (Unlocked sentences or full review) */}
          {showFullTranscript && (
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#064E3B]">
                    Toàn Văn Kịch Bản Video (Transcript)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Các câu đã hoàn thành ({completedCount}/{lesson.sentences.length}) hoặc đã mở khóa sẽ hiển thị đầy đủ
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {lesson.sentences.map((s, idx) => {
                  const isUnlocked =
                    Boolean(completedMap[s.id]) ||
                    Boolean(revealedMap[s.id]) ||
                    completedCount === lesson.sentences.length;

                  return (
                    <div
                      key={s.id}
                      onClick={() => goToSentenceIndex(idx, true)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        idx === currentIdx
                          ? 'bg-emerald-50/60 border-[#064E3B]'
                          : 'bg-[#FAFAF9] border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <span className="px-2 py-0.5 rounded bg-[#064E3B] text-amber-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        #{idx + 1} • {formatTime(s.start)}
                      </span>

                      <div className="flex-1 space-y-1">
                        {isUnlocked ? (
                          <>
                            <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-relaxed">
                              {s.text}
                            </p>
                            {s.translationVi && (
                              <p className="text-xs text-stone-500 italic">{s.translationVi}</p>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-stone-400 italic">
                              [Câu này đang khóa — Hãy hoàn thành chép chính tả hoặc bấm Mở đáp án]
                            </span>
                            <button
                              type="button"
                              onClick={(ev) => {
                                ev.stopPropagation();
                                setRevealedMap((prev) => ({ ...prev, [s.id]: true }));
                              }}
                              className="text-[11px] font-bold text-[#D97706] hover:underline"
                            >
                              Mở khóa câu này
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
