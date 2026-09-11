import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';

interface SoundCheckScreenProps {
  testSource: string;
  onStartTest: () => void;
  onBack: () => void;
}

export const SoundCheckScreen: React.FC<SoundCheckScreenProps> = ({
  testSource,
  onStartTest,
  onBack,
}) => {
  const [volume, setVolume] = useState<number>(80);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const playTestTone = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = 440; // 440Hz
    
    gainNode.gain.value = volume / 100;
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5); // Play for 0.5 seconds
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6 text-[#064E3B] font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-10 shadow-sm border border-stone-200 flex flex-col items-center">
        <h1 className="text-3xl font-serif font-semibold mb-2">{testSource}</h1>
        <p className="text-stone-500 mb-8">IELTS Listening Practice Test</p>

        <div className="w-full bg-[#FAFAF9] rounded-2xl p-8 mb-8 border border-stone-200">
          <h2 className="text-xl font-serif font-medium mb-6 flex items-center gap-2">
            <Volume2 className="text-[#D97706]" size={24} />
            Sound Check
          </h2>
          <p className="text-stone-600 mb-6">
            Please adjust your headphone volume using the slider above. When you are ready, click Start Test.
          </p>
          
          <div className="flex flex-col items-center mb-8 gap-6">
            <button
              onClick={playTestTone}
              className="px-6 py-3 bg-[#064E3B] text-white rounded-xl hover:bg-[#064E3B]/90 transition-colors font-medium flex items-center gap-2"
            >
              <Volume2 size={20} />
              Play Sample Tone
            </button>
            
            <div className="flex items-center gap-4 w-full max-w-md">
              <VolumeX size={20} className="text-stone-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064E3B]"
              />
              <Volume2 size={20} className="text-stone-400" />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="appearance-none w-6 h-6 border-2 border-stone-300 rounded-md checked:border-[#D97706] checked:bg-[#D97706] transition-colors peer"
              />
              <svg
                className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-stone-700 font-medium group-hover:text-[#064E3B] transition-colors">
              I can hear the audio clearly
            </span>
          </label>
        </div>

        <div className="flex w-full justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-500 hover:text-[#064E3B] transition-colors font-medium px-4 py-2"
          >
            <ArrowLeft size={18} />
            Back to Library
          </button>
          
          <button
            onClick={onStartTest}
            disabled={!isChecked}
            className="px-8 py-3 bg-[#D97706] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D97706]/90 active:scale-95"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
