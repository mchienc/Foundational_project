import React from 'react';
import { motion } from 'framer-motion';
import { checkboxPopVariants, checkmarkPathVariants } from '../../styles/motion';

interface CheckboxItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  sublabel?: string;
  disabled?: boolean;
  className?: string;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  checked,
  onChange,
  label,
  sublabel,
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center gap-3 select-none cursor-pointer group ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Native hidden input for accessibility */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />

        {/* Custom Animated Checkbox Box with Scale Pop */}
        <motion.div
          variants={checkboxPopVariants}
          animate={checked ? 'checked' : 'unchecked'}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors duration-150 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
            checked
              ? 'bg-emerald-500 border-emerald-500 shadow-xs shadow-emerald-500/30'
              : 'bg-white border-slate-300 group-hover:border-slate-400'
          }`}
        >
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Dynamic Stroke Dashoffset Checkmark Draw */}
              <motion.path
                d="M4 12l5 5L20 6"
                variants={checkmarkPathVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>
          )}
        </motion.div>
      </div>

      {(label || sublabel) && (
        <div className="min-w-0 flex-1">
          {label && (
            <div
              className={`text-sm font-medium transition-colors ${
                checked ? 'text-slate-500 line-through' : 'text-slate-800 group-hover:text-blue-600'
              }`}
            >
              {label}
            </div>
          )}
          {sublabel && (
            <div className="text-xs text-slate-400 font-mono mt-0.5">{sublabel}</div>
          )}
        </div>
      )}
    </label>
  );
};
