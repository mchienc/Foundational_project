// frontend/src/modules/speaking/SpeakingRandomStudio.tsx
// Phòng Luyện Nói ngẫu nhiên (Speaking Studio) tích hợp Web Speech API & AI Examiner

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Dices,
  Clock,
  
  RotateCcw,
  FileEdit,
  Volume2,
} from 'lucide-react';
import { mockSpeakingPrompts, SpeakingPrompt } from '../../data/mockWritingSpeakingPrompts';
import { useProStore } from '../pro/useProStore';
import { SpeakingFeedbackDrawer, SpeakingFeedbackData } from './SpeakingFeedbackDrawer';

interface SpeakingRandomStudioProps {
  onNotify?: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const SpeakingRandomStudio: React.FC<SpeakingRandomStudioProps> = ({ onNotify }) => {
  // Pro Store
  const isPro = useProStore((state) => state.isPro);
  const speakingQuotaLeft = useProStore((state) => state.speakingQuotaLeft);
  const consumeSpeakingQuota = useProStore((state) => state.consumeSpeakingQuota);
  const openUpgradeModal = useProStore((state) => state.openUpgradeModal);

  // Mode Selection: Part 1, Part 2 (Cue Card), Part 3
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3>(1);
  const [currentPrompt, setCurrentPrompt] = useState<SpeakingPrompt>(() => {
    return mockSpeakingPrompts.find((p) => p.part === 1) || mockSpeakingPrompts[0];
  });

  // Recording State & Web Speech API
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef<boolean>(false);
  const timerIntervalRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  // Part 2 Preparation State
  const [prepSecondsLeft, setPrepSecondsLeft] = useState<number>(60);
  const [isPrepActive, setIsPrepActive] = useState<boolean>(false);
  const [scratchpadNote, setScratchpadNote] = useState<string>('');

  // AI Evaluation State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [feedbackResult, setFeedbackResult] = useState<SpeakingFeedbackData | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript.trim());
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          if (onNotify) onNotify('Trình duyệt chưa được cấp quyền micro. Bạn có thể tự gõ văn bản để thử nghiệm.', 'error');
          isRecordingRef.current = false;
    setIsRecording(false);
        }
      };

      recognition.onend = () => {
        // Nếu user vẫn đang ở trạng thái recording, tự động khởi động lại (tránh ngắt kết nối trình duyệt)
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (e) {
            // Ignore
          }
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech API init error:', err);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, []);

  // Duration Timer Effect
  useEffect(() => {
    isRecordingRef.current = isRecording;
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setDurationSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isRecording]);

  // Part 2 Prep Countdown
  useEffect(() => {
    let prepInterval: any = null;
    if (isPrepActive && prepSecondsLeft > 0) {
      prepInterval = setInterval(() => {
        setPrepSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPrepActive && prepSecondsLeft === 0) {
      setIsPrepActive(false);
      if (onNotify) onNotify('Đã hết 1 phút chuẩn bị! Bắt đầu bấm micro để trả lời bài nói.', 'info');
    }
    return () => clearInterval(prepInterval);
  }, [isPrepActive, prepSecondsLeft, onNotify]);

  // Change Part Mode
  const handleSelectPart = (part: 1 | 2 | 3) => {
    setSelectedPart(part);
    const candidates = mockSpeakingPrompts.filter((p) => p.part === part);
    const randomPick = candidates[Math.floor(Math.random() * candidates.length)] || candidates[0];
    setCurrentPrompt(randomPick);
    resetSession();
  };

  // Random Topic Generator
  const handleRandomTopic = () => {
    const candidates = mockSpeakingPrompts.filter((p) => p.part === selectedPart);
    const currentId = currentPrompt.id;
    const available = candidates.filter((p) => p.id !== currentId);
    const pool = available.length > 0 ? available : candidates;
    const nextPick = pool[Math.floor(Math.random() * pool.length)];
    setCurrentPrompt(nextPick);
    resetSession();
  };

  // Reset Session
  const resetSession = () => {
    stopRecording();
    setTranscript('');
    setDurationSeconds(0);
    setPrepSecondsLeft(60);
    setIsPrepActive(false);
    setScratchpadNote('');
  };

  // Toggle Recording with MediaRecorder & SpeechRecognition (P1-12)
  const startRecording = async () => {
    // 1. Capture real audio via MediaRecorder
    audioChunksRef.current = [];
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };
        recorder.onstop = () => {
          if (audioChunksRef.current.length > 0) {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            setRecordedAudioUrl(url);
          }
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
          }
        };
        recorder.start(100);
        mediaRecorderRef.current = recorder;
      } catch (micErr) {
        console.warn('MediaRecorder initialization warning:', micErr);
      }
    }

    // 2. Web Speech API live transcription
    if (!speechSupported) {
      if (onNotify) onNotify('Trình duyệt không hỗ trợ Web Speech API. Bạn có thể tự gõ văn bản câu trả lời.', 'info');
      isRecordingRef.current = true;
      setIsRecording(true);
      return;
    }

    try {
      recognitionRef.current?.start();
      isRecordingRef.current = true;
      setIsRecording(true);
    } catch (e) {
      isRecordingRef.current = true;
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    try {
      recognitionRef.current?.stop();
    } catch (e) {}

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
  };

  // Submit to Gemini AI Grading
  const handleSubmitSpeaking = async () => {
    stopRecording();

    if (!transcript.trim() || transcript.trim().length < 10) {
      if (onNotify) onNotify('Nội dung bài nói quá ngắn. Vui lòng nói hoặc nhập ít nhất một câu hoàn chỉnh.', 'error');
      return;
    }

    // Check Freemium Quota
    const hasQuota = consumeSpeakingQuota();
    if (!hasQuota) return;

    setIsEvaluating(true);
    try {
      const response = await fetch('/api/ai/grade-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          part: selectedPart,
          topic: currentPrompt.topic,
          question: currentPrompt.question,
          cueCardBullets: selectedPart === 2 ? currentPrompt.cueCardPoints || [] : [],
          transcript: transcript,
          durationSeconds: durationSeconds,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setFeedbackResult(resData.data);
        setIsFeedbackOpen(true);
        if (onNotify) {
          if (resData.data.estimatedBand != null) {
            onNotify(`Đã chấm xong! Band ước lượng: ${resData.data.estimatedBand}`, 'success');
          } else {
            onNotify('Đã phân tích ngôn ngữ từ transcript bài nói (Pronunciation: N/A).', 'success');
          }
        }
      } else {
        throw new Error(resData.message || 'Không thể chấm bài');
      }
    } catch (err) {
      console.error('Speaking grade error:', err);
      if (onNotify) onNotify('Không thể kết nối đến máy chủ chấm điểm Speaking.', 'error');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 pb-16">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0">
              <Mic size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-serif font-bold text-[#064E3B] tracking-tight">
                  Phòng Luyện Nói (Speaking Studio)
                </h1>
                {isPro ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    <Mic size={11} />
                    PRO Không giới hạn
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-700 border border-stone-300">
                    Lượt chấm hôm nay: <strong className="text-stone-900">{speakingQuotaLeft}/1</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center: Part 1 / 2 / 3 Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => handleSelectPart(1)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPart === 1
                  ? 'bg-white text-[#064E3B] font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Part 1 (Phản xạ ngắn)
            </button>
            <button
              onClick={() => handleSelectPart(2)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPart === 2
                  ? 'bg-white text-[#064E3B] font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Part 2 (Cue Card 2 phút)
            </button>
            <button
              onClick={() => handleSelectPart(3)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPart === 3
                  ? 'bg-white text-[#064E3B] font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Part 3 (Phản biện sâu)
            </button>
          </div>

          {/* Right: Random Button & Upgrade CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomTopic}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
            >
              <Dices size={15} className="text-[#064E3B]" />
              <span>🎲 Đổi đề ngẫu nhiên</span>
            </button>

            {!isPro && (
              <button
                onClick={openUpgradeModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors cursor-pointer"
              >
                <Mic size={13} />
                <span>Nâng cấp Pro</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Topic & Cue Card Card */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-[#064E3B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              IELTS Speaking Part {selectedPart}: {currentPrompt.topic}
            </span>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Clock size={14} />
              <span>
                {selectedPart === 2 ? '1 phút chuẩn bị + 2 phút nói' : 'Trả lời từ 30s - 45s'}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 leading-snug">
              {currentPrompt.question}
            </h2>
          </div>

          {/* Part 2 Cue Card Box with 1-min Countdown */}
          {selectedPart === 2 && currentPrompt.cueCardPoints && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Thẻ Gợi Ý (You should say):
                </span>

                {/* 1m Preparation Timer Controller */}
                <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-amber-200 shadow-2xs">
                  <span className="text-xs font-mono font-bold text-amber-800">
                    Chuẩn bị: {prepSecondsLeft}s
                  </span>
                  <button
                    onClick={() => setIsPrepActive(!isPrepActive)}
                    className="text-[11px] font-semibold text-[#064E3B] hover:underline cursor-pointer"
                  >
                    {isPrepActive ? 'Tạm dừng' : 'Bắt đầu 1p'}
                  </button>
                  <button
                    onClick={() => {
                      setIsPrepActive(false);
                      setPrepSecondsLeft(60);
                    }}
                    className="p-1 hover:bg-stone-100 rounded text-stone-500 cursor-pointer"
                    title="Đặt lại"
                  >
                    <RotateCcw size={11} />
                  </button>
                </div>
              </div>

              <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-5 leading-relaxed">
                {currentPrompt.cueCardPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>

              {/* Quick Scratchpad for Part 2 */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-stone-500 block mb-1">
                  Sổ ghi chú nhanh (Keywords note trong 1 phút):
                </span>
                <input
                  type="text"
                  value={scratchpadNote}
                  onChange={(e) => setScratchpadNote(e.target.value)}
                  placeholder="Ghi nhanh từ khóa hoặc ý tưởng (ví dụ: in 2022, unforgettable trip, mountain view...)"
                  className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
                />
              </div>
            </div>
          )}

          {/* Follow-up Questions for Part 1 & Part 3 */}
          {(selectedPart === 1 || selectedPart === 3) && currentPrompt.followUpQuestions && (
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
              <span className="font-bold text-stone-700 block">Câu hỏi phát triển thêm:</span>
              <ul className="text-stone-600 space-y-1 list-disc pl-4 text-[11px]">
                {currentPrompt.followUpQuestions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Hint Vocabulary */}
          {currentPrompt.hintVocabulary && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="font-semibold text-stone-500 shrink-0">Từ gợi ý đắt giá:</span>
              {currentPrompt.hintVocabulary.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#064E3B] border border-emerald-200/80 font-medium"
                >
                  <strong>{v.word}</strong>: {v.meaning}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Live Recording Studio Card */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          {/* Waveform & Mic Button Center */}
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            {/* Animated Waveform when recording */}
            <div className="h-12 flex items-center justify-center gap-1.5">
              {[40, 70, 30, 90, 50, 80, 20, 60, 95, 45, 75, 35].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                    isRecording ? 'bg-[#064E3B] animate-pulse' : 'bg-stone-200 h-2'
                  }`}
                  style={{
                    height: isRecording ? `${Math.max(8, height * (0.5 + Math.random() * 0.5))}%` : '8px',
                  }}
                />
              ))}
            </div>

            {/* Big Mic Button */}
            <div className="relative">
              {isRecording && (
                <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
              )}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-[#064E3B] hover:bg-[#043327] text-white'
                }`}
              >
                {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
                <span className="text-[10px] font-bold mt-1">
                  {isRecording ? 'Dừng' : 'Bật Mic'}
                </span>
              </button>
            </div>

            {/* Live Duration Counter */}
            <div className="text-center">
              <span className={`text-base font-mono font-bold ${isRecording ? 'text-emerald-700' : 'text-stone-500'}`}>
                {durationSeconds} giây
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                {isRecording ? 'Đang nhận diện giọng nói tiếng Anh thời gian thực...' : 'Bấm micro để bắt đầu trả lời'}
              </p>
            </div>
          </div>

          {/* Audio Playback Preview (P1-12) */}
            {recordedAudioUrl && (
              <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                  <Volume2 size={16} className="text-[#064E3B]" />
                  <span>Bản thu âm của bạn ({durationSeconds}s):</span>
                </div>
                <audio controls src={recordedAudioUrl} className="h-8 w-full sm:max-w-xs" />
              </div>
            )}

            {/* Real-time Transcribed Speech Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 uppercase tracking-wide flex items-center gap-1.5">
                <FileEdit size={14} className="text-[#064E3B]" />
                <span>Nội dung học viên đang nói (Live Transcript):</span>
              </span>

              {transcript && (
                <button
                  onClick={() => setTranscript('')}
                  className="text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  Xóa văn bản
                </button>
              )}
            </div>

            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Lời nói của bạn qua microphone sẽ hiển thị trực tiếp tại đây... Bạn cũng có thể chỉnh sửa lại các từ nhận diện nhầm trước khi gửi chấm điểm."
              className="w-full h-32 p-4 text-sm font-sans leading-relaxed text-stone-800 bg-[#FAFAF9] border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#064E3B] resize-y"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
            <div className="text-xs text-stone-500">
              Độ dài bài nói: <strong className="text-stone-800">{transcript.trim() ? transcript.trim().split(/\s+/).filter(Boolean).length : 0} từ</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetSession}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Đặt lại
              </button>

              <button
                onClick={handleSubmitSpeaking}
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
                    <span>Giám khảo AI đang chấm...</span>
                  </>
                ) : (
                  <>
                    <Mic size={16} className="text-amber-300" />
                    <span>Dừng &amp; Gửi chấm AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Speaking Feedback Drawer / Modal */}
      <SpeakingFeedbackDrawer
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        feedback={feedbackResult}
        topicTitle={currentPrompt.topic}
        spokenText={transcript}
        durationSeconds={durationSeconds}
      />
    </div>
  );
};
