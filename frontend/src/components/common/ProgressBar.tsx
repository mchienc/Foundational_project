import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '../../styles/motion';

interface ProgressBarProps {
  progress: number; // 0 to 100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = false,
  size = 'md',
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const isComplete = clampedProgress === 100;

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">Tiến độ hoàn thành</span>
          <span className={`font-semibold ${isComplete ? 'text-emerald-600' : 'text-slate-800'}`}>
            {clampedProgress}%
          </span>
        </div>
      )}

      <div
        className={`w-full bg-slate-100 border border-slate-200/80 rounded-full overflow-hidden p-[2px] ${heightStyles[size]}`}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden">
          {/* Animated Fill Bar */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${clampedProgress}%` }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className={`h-full rounded-full transition-colors ${
              isComplete ? 'bg-emerald-500 shadow-sm shadow-emerald-500/40' : 'bg-blue-600'
            }`}
          >
            {/* Shimmer / Glow wave when reaching 100% */}
            {isComplete && (
              <div className="absolute inset-0 progress-glow-wave opacity-75" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
