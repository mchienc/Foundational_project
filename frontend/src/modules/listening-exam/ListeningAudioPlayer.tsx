import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

interface ListeningAudioPlayerProps {
  audioFile: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onEnded: () => void;
  volume: number; // 0-1
  onVolumeChange: (v: number) => void;
  sectionNumber: number;
  sectionTitle: string;
}

const AUDIO_BASE_URL = (import.meta as any).env?.VITE_AUDIO_URL || ((import.meta as any).env?.DEV ? 'http://localhost:3000/audio/' : '/audio/');

export const ListeningAudioPlayer: React.FC<ListeningAudioPlayerProps> = ({
  audioFile,
  isPlaying,
  onPlayPause,
  onEnded,
  volume,
  onVolumeChange,
  sectionNumber,
  sectionTitle,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback error", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioFile]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        rewind5s();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const rewind5s = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-6 shadow-sm font-sans w-full max-w-5xl mx-auto">
      <audio
        ref={audioRef}
        src={`${AUDIO_BASE_URL}${audioFile}`}
        onEnded={onEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      <div className="flex flex-col">
        <span className="text-xs text-stone-500 font-medium tracking-wider uppercase mb-0.5">
          Section {sectionNumber}
        </span>
        <span className="text-[#064E3B] font-serif font-medium text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
          {sectionTitle}
        </span>
      </div>

      <div className="w-px h-10 bg-stone-200" />

      <button
        onClick={onPlayPause}
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[#064E3B] text-white hover:bg-[#064E3B]/90 transition-colors"
      >
        {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
      </button>

      <button
        onClick={rewind5s}
        className="text-[#064E3B] hover:text-[#D97706] transition-colors p-2 rounded-full hover:bg-stone-100"
        title="Rewind 5s (Arrow Left)"
      >
        <RotateCcw size={20} />
      </button>

      <div className="flex-1 flex items-center gap-3">
        <span className="text-sm font-medium text-stone-600 w-12 text-right">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#D97706]"
        />
        <span className="text-sm font-medium text-stone-600 w-12">
          {formatTime(duration)}
        </span>
      </div>

      <div className="w-px h-10 bg-stone-200" />

      <div className="flex items-center gap-2">
        <button
          onClick={() => onVolumeChange(volume === 0 ? 0.8 : 0)}
          className="text-stone-400 hover:text-[#064E3B] transition-colors"
        >
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-24 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064E3B]"
        />
      </div>
    </div>
  );
};
