import React from 'react';
import { Activity } from 'lucide-react';

interface AudioWaveformProps {
  isPlaying: boolean;
  speed?: number;
  className?: string;
  barCount?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isPlaying,
  speed = 1.0,
  className = '',
  barCount = 14,
}) => {
  // Pre-determined heights for visual aesthetic
  const heights = [35, 60, 90, 45, 75, 100, 55, 80, 40, 95, 65, 85, 50, 70];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-950 text-white border border-emerald-800/80 shadow-xs ${className}`}
    >
      <div className="flex items-center gap-1.5 text-xs text-teal-400 font-mono">
        <Activity className={`w-3.5 h-3.5 text-[#0D9488] ${isPlaying ? 'animate-pulse' : ''}`} />
        <span>Waveform:</span>
      </div>

      <div className="flex items-center gap-1 h-5 px-1">
        {Array.from({ length: barCount }).map((_, i) => {
          const heightPct = isPlaying ? heights[i % heights.length] : 20;
          return (
            <span
              key={i}
              style={{
                height: `${heightPct}%`,
                transition: 'height 0.2s ease-in-out',
                animation: isPlaying
                  ? `pulse 0.6s ease-in-out infinite alternate ${i * 0.05}s`
                  : 'none',
              }}
              className="w-1 bg-[#0D9488] rounded-full inline-block origin-bottom"
            />
          );
        })}
      </div>

      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-950/80 text-teal-300 border border-teal-500/30">
        {speed.toFixed(1)}x
      </span>
    </div>
  );
};

