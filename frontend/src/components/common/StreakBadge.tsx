import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { flamePulseVariants } from '../../styles/motion';

interface StreakBadgeProps {
  days: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  days,
  className = '',
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5',
  };

  const iconSizes = {
    sm: 14,
    md: 17,
    lg: 20,
  };

  return (
    <div
      className={`inline-flex items-center font-medium rounded-full bg-amber-50 text-amber-900 border border-amber-200/90 shadow-xs select-none ${sizeStyles[size]} ${className}`}
      title={`Bạn đã duy trì học liên tục ${days} ngày!`}
    >
      {/* Floating / Pulsing Flame Icon */}
      <motion.div
        variants={flamePulseVariants}
        animate="pulse"
        className="flex items-center justify-center text-amber-500 drop-shadow-[0_2px_6px_rgba(245,158,11,0.4)]"
      >
        <Flame size={iconSizes[size]} className="fill-amber-500 text-amber-600" />
      </motion.div>

      <span className="font-bold text-amber-950 font-mono tracking-tight">
        {days} ngày streak
      </span>
    </div>
  );
};
