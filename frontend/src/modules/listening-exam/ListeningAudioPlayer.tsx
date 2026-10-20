import React, { useRef, useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Lock,
  Gauge,
  Repeat,
  Radio,
} from 'lucide-react';
import { ContrastMode } from '../../types';

export interface ListeningAudioPlayerProps {
  audioFile: string;
  mode: 'exam' | 'practice';
  contrastMode?: ContrastMode;
  isPlaying: boolean;
  onPlayPause: () => void;
  onEnded: () => void;
  volume: number; // 0-1
  onVolumeChange: (v: number) => void;
  sectionNumber: number;
  sectionTitle: string;
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
  onTimeChange?: (currentTime: number) => void;
  seekRequest?: { time: number; timestamp: number } | null;
}

const AUDIO_BASE_URL =
  (import.meta as any).env?.VITE_AUDIO_URL ||
  'https://pub-4dafa50b652e4874b46d808673d49f67.r2.dev/';

const SPEED_OPTIONS = [0.75, 0.85, 1.0, 1.15, 1.25, 1.5];

export const ListeningAudioPlayer: React.FC<ListeningAudioPlayerProps> = ({
  audioFile,
  mode,
  contrastMode = 'standard',
  isPlaying,
  onPlayPause,
  onEnded,
  volume,
  onVolumeChange,
  sectionNumber,
  sectionTitle,
  playbackSpeed = 1.0,
  onSpeedChange,
  onTimeChange,
  seekRequest,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loopStart, setLoopStart] = useState<number | null>(null);
  const [loopEnd, setLoopEnd] = useState<number | null>(null);

  const effectiveSpeed = mode === 'exam' ? 1.0 : playbackSpeed;

  // Reset loop when section audio changes
  useEffect(() => {
    setLoopStart(null);
    setLoopEnd(null);
    setCurrentTime(0);
  }, [audioFile]);

  // Sync play/pause & speed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = effectiveSpeed;
    if (isPlaying) {
      audio.play().catch((e) => console.error('Playback error:', e));
    } else {
      audio.pause();
    }
  }, [isPlaying, audioFile, effectiveSpeed]);

  // Sync playbackRate immediately when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = effectiveSpeed;
    }
  }, [effectiveSpeed]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle external seek request (e.g., clicking a transcript line in practice mode)
  useEffect(() => {
    if (mode === 'practice' && seekRequest && audioRef.current) {
      audioRef.current.currentTime = seekRequest.time;
      setCurrentTime(seekRequest.time);
    }
  }, [seekRequest, mode]);

  // Keyboard shortcuts for practice mode (ArrowLeft / ArrowRight when not focused inside an input)
  useEffect(() => {
    if (mode !== 'practice') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skipSeconds(-5);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skipSeconds(5);
      } else if (e.code === 'Space') {
        e.preventDefault();
        onPlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isPlaying, onPlayPause]);

  const skipSeconds = (delta: number) => {
    if (mode !== 'practice' || !audioRef.current) return;
    const nextTime = Math.max(
      0,
      Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + delta)
    );
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Handle A-B loop in practice mode
    if (
      mode === 'practice' &&
      loopStart !== null &&
      loopEnd !== null &&
      audio.currentTime >= loopEnd
    ) {
      audio.currentTime = loopStart;
    }

    setCurrentTime(audio.currentTime);
    onTimeChange?.(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.playbackRate = effectiveSpeed;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mode !== 'practice') return;
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleToggleLoop = () => {
    if (loopStart === null) {
      setLoopStart(currentTime);
    } else if (loopEnd === null) {
      if (currentTime > loopStart + 1) {
        setLoopEnd(currentTime);
      } else {
        setLoopStart(null);
      }
    } else {
      setLoopStart(null);
      setLoopEnd(null);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isHighContrast = contrastMode === 'high-contrast';
  const isInverted = contrastMode === 'inverted';

  const barBg = isHighContrast
    ? 'bg-black border-yellow-400 text-yellow-400'
    : isInverted
    ? 'bg-[#022C22] border-emerald-700 text-slate-100'
    : 'bg-white border-stone-200 text-stone-800';

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      className={`border rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xs font-sans w-full transition-colors ${barBg}`}
    >
      <audio
        ref={audioRef}
        src={`${AUDIO_BASE_URL.replace(/\/$/, '')}/${encodeURIComponent(audioFile)}`}
        onEnded={onEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      {/* Left: Section Info & Mode Status */}
      <div className="flex items-center gap-3 min-w-[180px]">
        {mode === 'exam' ? (
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isHighContrast
                ? 'bg-yellow-400 text-black'
                : isInverted
                ? 'bg-emerald-800 text-amber-300'
                : 'bg-[#064E3B] text-amber-300'
            }`}
            title="Chế độ Thi Thật: Băng nghe phát tự động 1 lần duy nhất"
          >
            <Radio size={18} className={isPlaying ? 'animate-pulse' : ''} />
          </div>
        ) : (
          <button
            type="button"
            onClick={onPlayPause}
            className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-[#064E3B] text-amber-300 hover:bg-[#022C22] transition-colors cursor-pointer shadow-xs"
            title={isPlaying ? 'Tạm dừng (Space)' : 'Phát tiếp (Space)'}
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600">
              Part {sectionNumber} / 4
            </span>
            {mode === 'exam' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                <Lock size={10} />
                Khoá dừng &amp; tua
              </span>
            )}
          </div>
          <p className="font-serif font-bold text-sm truncate max-w-[220px] mt-0.5">
            {sectionTitle}
          </p>
        </div>
      </div>

      {/* Center: Timeline & Controls */}
      {mode === 'exam' ? (
        /* Official Exam Read-Only Timeline */
        <div className="flex-1 min-w-[220px] flex items-center gap-3">
          <span className="text-xs font-mono font-bold w-11 text-right opacity-80">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 h-2.5 bg-stone-200/80 rounded-full overflow-hidden relative">
            <div
              className={`h-full transition-all duration-300 ${
                isHighContrast ? 'bg-yellow-400' : 'bg-[#064E3B]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold w-11 opacity-80">
            {formatTime(duration)}
          </span>
        </div>
      ) : (
        /* Practice Mode Interactive Controls (Seek, ±5s, A-B Loop, Speed) */
        <div className="flex-1 min-w-[260px] flex flex-wrap items-center gap-3">
          {/* -5s / +5s buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => skipSeconds(-5)}
              className="px-2 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
              title="Lùi 5 giây (Phím mũi tên trái ←)"
            >
              <RotateCcw size={13} />
              <span>-5s</span>
            </button>
            <button
              type="button"
              onClick={() => skipSeconds(5)}
              className="px-2 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
              title="Tua tới 5 giây (Phím mũi tên phải →)"
            >
              <span>+5s</span>
              <RotateCw size={13} />
            </button>
          </div>

          {/* Interactive Scrubber */}
          <div className="flex-1 min-w-[160px] flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-stone-600 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.5}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064E3B]"
              />
            </div>
            <span className="text-xs font-mono font-bold text-stone-600 w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* A-B Loop Button */}
          <button
            type="button"
            onClick={handleToggleLoop}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all ${
              loopStart !== null
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
            title="Lặp đoạn A-B: Bấm lần 1 chọn điểm A, bấm lần 2 chọn điểm B, bấm lần 3 để huỷ"
          >
            <Repeat size={13} />
            <span>
              {loopStart === null
                ? 'A-B Loop'
                : loopEnd === null
                ? `A: ${formatTime(loopStart)} → ?`
                : `${formatTime(loopStart)}–${formatTime(loopEnd)}`}
            </span>
          </button>

          {/* Playback Speed Selector */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
            <Gauge size={13} className="text-amber-600 ml-1.5 mr-0.5 shrink-0" />
            {SPEED_OPTIONS.map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => onSpeedChange?.(spd)}
                className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-[#064E3B] text-amber-300 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                }`}
                title={`Tốc độ phát ${spd}x`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Right: Volume Control */}
      <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-stone-200">
        <button
          type="button"
          onClick={() => onVolumeChange(volume === 0 ? 0.85 : 0)}
          className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          title={volume === 0 ? 'Bật âm thanh' : 'Tắt tiếng'}
        >
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-20 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064E3B]"
          title={`Âm lượng: ${Math.round(volume * 100)}%`}
        />
      </div>
    </div>
  );
};
