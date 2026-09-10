import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface AudioPlayButtonProps {
  text: string;
  rate?: number; // 0.8 or 1.0
  lang?: string; // 'en-GB' or 'en-US'
  variant?: 'icon' | 'button' | 'pill';
  label?: string;
  className?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  text,
  rate = 1.0,
  lang = 'en-GB',
  variant = 'icon',
  label,
  className = '',
  onPlayStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isSupported) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng phát âm thanh tự động (SpeechSynthesis).');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      onPlayStateChange?.(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.lang = lang;

    // Try to pick a natural British or American English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find((v) => v.lang === lang || v.lang.startsWith('en')) ||
      voices.find((v) => v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Daniel'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) {
    return (
      <span className="text-stone-400 cursor-not-allowed" title="Trình duyệt không hỗ trợ">
        <VolumeX size={16} />
      </span>
    );
  }

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handlePlay}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95 ${
          isPlaying
            ? 'bg-amber-600 text-white animate-pulse shadow-amber-600/30'
            : 'bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white border border-emerald-800'
        } ${className}`}
        title="Nghe phát âm chuẩn bản xứ"
      >
        {isPlaying ? <Loader2 size={14} className="animate-spin text-white" /> : <Volume2 size={14} />}
        <span>{isPlaying ? 'Đang phát...' : label || 'Nghe âm thanh'}</span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handlePlay}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer active:scale-95 ${
          isPlaying
            ? 'bg-amber-500 text-white shadow-xs'
            : 'bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] border border-emerald-200/80'
        } ${className}`}
        title="Nghe phát âm"
      >
        <Volume2 size={12} className={isPlaying ? 'animate-bounce' : 'text-amber-600'} />
        <span>{label || 'Nghe'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`p-1.5 rounded-lg transition-colors cursor-pointer active:scale-90 ${
        isPlaying
          ? 'bg-amber-500 text-white'
          : 'text-stone-500 hover:text-[#064E3B] hover:bg-stone-100'
      } ${className}`}
      title="Nghe phát âm"
    >
      <Volume2 size={16} className={isPlaying ? 'animate-pulse text-white' : ''} />
    </button>
  );
};

