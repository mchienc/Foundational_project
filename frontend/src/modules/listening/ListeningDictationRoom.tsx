import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Volume2,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  Lightbulb,
  Check,
  BookmarkCheck,
  Activity,
} from 'lucide-react';
import { mockListeningTests } from '../../data/cambridgeMockData';
import { CambridgeListeningTest, ListeningSlice } from '../../types';
import { AudioWaveform } from '../../components/shared/AudioWaveform';
import { DiffViewer } from '../../components/shared/DiffViewer';
import { useAnki } from '../../context/AnkiContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';

interface ListeningDictationRoomProps {
  testId: string;
  onBackToLibrary: () => void;
  onNavigateAnki?: () => void;
  onEarnXp?: (amount: number, reason: string) => void;
  onNotify?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ListeningDictationRoom: React.FC<ListeningDictationRoomProps> = ({
  testId,
  onBackToLibrary,
  onNavigateAnki,
  onEarnXp,
  onNotify,
}) => {
  const { addCardToPersonalDeck } = useAnki();

  const test: CambridgeListeningTest =
    mockListeningTests.find((t) => t.id === testId) || mockListeningTests[0];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [currentAccuracy, setCurrentAccuracy] = useState<number>(0);
  const [completedSentences, setCompletedSentences] = useState<Record<number, boolean>>({});

  const currentSlice: ListeningSlice = test.sentences[currentSentenceIndex];
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sentenceCardRef = useRef<HTMLDivElement>(null);

  // Active Sentence Tracking & Audio Wave Pulse bằng GSAP
  useGSAP(
    () => {
      if (!sentenceCardRef.current) return;

      // Card câu hiện tại chuyển đổi mượt sang viền xanh rừng sâu (#064E3B)
      gsap.fromTo(
        sentenceCardRef.current,
        { borderColor: '#E7E5E4' },
        {
          borderColor: '#064E3B',
          boxShadow: '0 8px 24px -4px rgba(6, 78, 59, 0.12)',
          duration: 0.4,
          ease: 'power2.out',
        }
      );

      // Biểu tượng sóng âm nhỏ đập nhẹ theo chu kỳ tuần hoàn (yoyo pulse)
      gsap.to('.audio-pulse-icon', {
        scale: 1.2,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        force3D: true,
      });
    },
    { scope: sentenceCardRef, dependencies: [currentSentenceIndex] }
  );

  // Auto focus input when sentence changes
  useEffect(() => {
    setUserInput('');
    setShowFeedback(false);
    setCurrentAccuracy(0);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }, [currentSentenceIndex]);

  // Audio speech synthesis helper
  const playCurrentAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentSlice.text);
    utterance.rate = playbackSpeed;
    utterance.lang = 'en-GB';

    const voices = window.speechSynthesis.getVoices();
    const britishVoice =
      voices.find((v) => v.lang === 'en-GB' || v.name.includes('British') || v.name.includes('Daniel')) ||
      voices.find((v) => v.lang.startsWith('en'));

    if (britishVoice) {
      utterance.voice = britishVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  // Keyboard Shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger space shortcut if user is typing in textarea normally, UNLESS Ctrl/Cmd is held OR textarea is empty
      const isTargetInput = e.target === inputRef.current;

      // Space: Play / Pause audio (when not typing a word or when pressing Ctrl+Space)
      if (e.code === 'Space' && (e.ctrlKey || !isTargetInput)) {
        e.preventDefault();
        playCurrentAudio();
        return;
      }

      // Tab or Ctrl+R: Replay sentence
      if (e.key === 'Tab' || (e.ctrlKey && (e.key === 'r' || e.key === 'R'))) {
        e.preventDefault();
        playCurrentAudio();
        return;
      }

      // Ctrl + H: Reveal 1 next character
      if (e.ctrlKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        handleProvideHint();
        return;
      }

      // Enter: Submit & Check
      if (e.key === 'Enter' && !e.shiftKey && isTargetInput) {
        e.preventDefault();
        handleCheckSentence();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlice.text, userInput, playbackSpeed]);

  const handleProvideHint = () => {
    const target = currentSlice.text;
    const currentLen = userInput.length;
    if (currentLen < target.length) {
      const nextChar = target[currentLen];
      setUserInput((prev) => prev + nextChar);
      onNotify?.(`Gợi ý ký tự tiếp theo: "${nextChar}"`, 'info');
    }
  };

  const handleCheckSentence = () => {
    setShowFeedback(true);
  };

  const handleAccuracyCalculated = (acc: number) => {
    setCurrentAccuracy(acc);
    if (acc === 100) {
      if (!completedSentences[currentSentenceIndex]) {
        setCompletedSentences((prev) => ({ ...prev, [currentSentenceIndex]: true }));
        onEarnXp?.(20, 'Hoàn thành câu chép chính tả 100%!');
        onNotify?.('Chính xác tuyệt đối 100%! Bạn có thể chuyển sang câu tiếp theo.', 'success');
      }

      // Khung nhập liệu nháy viền xanh ngọc kèm scale nhẹ (scale: 1.02 rồi về 1 trong 0.2s)
      if (inputRef.current) {
        gsap.timeline()
          .to(inputRef.current, {
            scale: 1.02,
            borderColor: '#059669',
            boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.2)',
            duration: 0.1,
            ease: 'power1.out',
            force3D: true,
          })
          .to(inputRef.current, {
            scale: 1,
            duration: 0.1,
            ease: 'power1.in',
            force3D: true,
          });
      }

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#064E3B', '#D97706', '#10B981'],
      });
    } else {
      // Khi gõ sai: Khung nhập liệu rung lắc nhẹ theo trục ngang mô phỏng phản hồi lỗi
      if (inputRef.current) {
        gsap.to(inputRef.current, {
          x: 6,
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
          force3D: true,
          borderColor: '#EF4444',
          clearProps: 'x',
        });
      }
    }
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < test.sentences.length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    }
  };

  const handlePrevSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex((prev) => prev - 1);
    }
  };

  // Quick save target word from this sentence to Anki
  const handleSaveToAnki = (wordItem: string) => {
    const clean = wordItem.replace(/\s*\/.*?\/.*$/, '').trim();
    const success = addCardToPersonalDeck({
      word: clean,
      definitionVi: `Từ vựng nghe chép chính tả trong ${test.source} (${currentSlice.vietnameseMeaning})`,
      definitionEn: clean,
      contextSentence: currentSlice.text,
      source: `${test.source} Listening`,
    });

    if (success) {
      onEarnXp?.(10, `Đã lưu "${clean}" vào Anki Flashcard!`);
      onNotify?.(`Đã lưu "${clean}" vào Deck Cá Nhân trong Anki!`, 'success');
    } else {
      onNotify?.(`"${clean}" đã có sẵn trong Deck Anki của bạn.`, 'info');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 selection:bg-amber-400/40">
      {/* Top Test Header Toolbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-stone-300 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back button & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLibrary}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Quay lại danh sách bài nghe"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#064E3B] text-amber-300 text-[10px] font-mono font-bold uppercase">
                  {test.source}
                </span>
                <span className="text-[10px] font-mono text-stone-500 hidden sm:inline-block">
                  Part {test.part} • {test.accent}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-[#064E3B] truncate max-w-xs sm:max-w-md">
                {test.title}
              </h2>
            </div>
          </div>

          {/* Right Toolbar: Sentence Progress & Anki Quick Link */}
          <div className="flex items-center gap-3">
            {/* Sentence Counter */}
            <div className="px-3 py-1 rounded-xl bg-stone-100 border border-stone-300 text-xs font-mono font-bold text-stone-800">
              Câu {currentSentenceIndex + 1} / {test.sentences.length}
            </div>

            {/* Quick link to Anki */}
            {onNavigateAnki && (
              <button
                onClick={onNavigateAnki}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold font-sans cursor-pointer transition-colors"
                title="Mở không gian Flashcard Anki"
              >
                <BookmarkCheck size={14} className="text-amber-700" />
                <span>Anki SRS</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Sentence Progress Pills */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          <div className="flex items-center gap-2">
            {test.sentences.map((s, idx) => {
              const isCurrent = currentSentenceIndex === idx;
              const isDone = completedSentences[idx];
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSentenceIndex(idx)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#064E3B] text-amber-300 shadow-xs border border-amber-500/50'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {isDone && <Check size={12} className="text-emerald-700" />}
                  <span>Câu {idx + 1}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-stone-500 shrink-0">
            {test.wpm} WPM
          </span>
        </div>

        {/* Audio Player & Waveform Toolbar */}
        <div
          ref={sentenceCardRef}
          className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-300 shadow-xs space-y-4 will-change-transform transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Play Button & Waveform */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={playCurrentAudio}
                className="px-5 py-2.5 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer border border-emerald-800"
              >
                <Activity size={15} className="audio-pulse-icon text-amber-300" />
                <Volume2 size={16} className={isPlaying ? 'animate-bounce text-amber-400' : ''} />
                <span>{isPlaying ? 'Đang phát...' : 'Nghe câu này (Space)'}</span>
              </button>

              <button
                type="button"
                onClick={playCurrentAudio}
                className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200"
                title="Nghe lại từ đầu (Tab)"
              >
                <RotateCcw size={15} />
              </button>

              <AudioWaveform isPlaying={isPlaying} speed={playbackSpeed} />
            </div>

            {/* Playback Speed Switcher (0.8x / 1.0x) */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-stone-400 uppercase text-[10px] font-bold">Tốc độ:</span>
              <button
                onClick={() => setPlaybackSpeed(0.8)}
                className={`px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${
                  playbackSpeed === 0.8
                    ? 'bg-[#064E3B] text-amber-300 font-bold border-amber-500'
                    : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                }`}
              >
                0.8x (Chậm)
              </button>
              <button
                onClick={() => setPlaybackSpeed(1.0)}
                className={`px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${
                  playbackSpeed === 1.0
                    ? 'bg-[#064E3B] text-amber-300 font-bold border-amber-500'
                    : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                }`}
              >
                1.0x (Chuẩn)
              </button>
            </div>
          </div>

          {/* Keyboard Shortcuts Guide Banner */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-100">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-700 font-bold">
                Space
              </kbd>{' '}
              Phát/Dừng
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-700 font-bold">
                Tab
              </kbd>{' '}
              Nghe lại
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-700 font-bold">
                Ctrl + H
              </kbd>{' '}
              Gợi ý ký tự
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-700 font-bold">
                Enter
              </kbd>{' '}
              Kiểm tra
            </span>
          </div>
        </div>

        {/* Dictation Input Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-300 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase tracking-normal text-stone-500">
              Nhập chính tả những gì bạn nghe được:
            </label>
            <button
              type="button"
              onClick={handleProvideHint}
              className="text-xs text-amber-800 hover:text-amber-900 font-sans font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Lightbulb size={13} className="text-amber-600" />
              <span>Gợi ý 1 ký tự (Ctrl + H)</span>
            </button>
          </div>

          <textarea
            ref={inputRef}
            rows={3}
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (showFeedback) setShowFeedback(false);
            }}
            placeholder="Gõ toàn bộ câu bạn vừa nghe... (Nhấn Enter để kiểm tra từng từ)"
            className="w-full p-4 rounded-2xl border border-stone-300 bg-[#FAFAF9] font-sans text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none leading-relaxed"
          />

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-stone-500 font-sans italic">
              <span>{currentSlice.hint}</span>
              {showFeedback && (
                <span className="font-mono font-bold text-amber-800 not-italic px-2 py-0.5 rounded bg-amber-100 border border-amber-300">
                  Khớp: {currentAccuracy}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleCheckSentence}
                disabled={!userInput.trim()}
                className={`px-6 py-2.5 rounded-2xl font-sans font-bold text-xs uppercase tracking-wide transition-all shadow-xs active:scale-95 cursor-pointer ${
                  userInput.trim()
                    ? 'bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white border border-emerald-800'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                Kiểm Tra Đáp Án (Enter)
              </button>

              {currentSentenceIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrevSentence}
                  className="px-3 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-sans font-bold text-xs uppercase tracking-wide flex items-center gap-1 transition-all shadow-2xs cursor-pointer border border-stone-200"
                  title="Quay lại câu trước"
                >
                  <span>Câu Trước</span>
                </button>
              )}

              {currentSentenceIndex < test.sentences.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextSentence}
                  className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span>Câu Tiếp Theo</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onBackToLibrary}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <CheckCircle2 size={14} />
                  <span>Hoàn Thành Bài Nghe</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Word-by-Word Diff Viewer */}
        <DiffViewer
          userInput={userInput}
          targetSentence={currentSlice.text}
          showFeedback={showFeedback}
          onAccuracyCalculated={handleAccuracyCalculated}
        />

        {/* Sentence Phonetics & Anki Flashcard Extraction */}
        {showFeedback && (
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-4 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-800">
                Bản dịch ngữ cảnh tiếng Việt:
              </span>
              <p className="text-xs sm:text-sm font-serif italic text-stone-800">
                "{currentSlice.vietnameseMeaning}"
              </p>
            </div>

            {/* Phonetic Insight */}
            <div className="p-3 rounded-xl bg-white border border-amber-200/80 text-xs text-stone-700 space-y-1">
              <span className="font-bold text-amber-900 block font-mono text-[10px] uppercase">
                Phân tích hiện tượng ngữ âm thính giác:
              </span>
              <p className="font-sans leading-relaxed">{currentSlice.phoneticNotes}</p>
            </div>

            {/* Key Vocab to save in Anki */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-500">
                Từ vựng then chốt trong câu (Bấm để nạp vào Anki Flashcard):
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {currentSlice.keyVocab.map((kv, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSaveToAnki(kv)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-xs font-sans font-semibold text-stone-800 transition-colors shadow-2xs cursor-pointer active:scale-95"
                    title={`Lưu "${kv}" vào Deck Anki`}
                  >
                    <Bookmark size={12} className="text-amber-700" />
                    <span>{kv}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

