import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { buttonTapVariants } from '../../styles/motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-98 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:bg-blue-800',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80 active:bg-slate-300',
    outline:
      'bg-transparent text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 hover:bg-slate-50',
    ghost:
      'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md hover:shadow-emerald-500/20 active:bg-emerald-800',
  };

  return (
    <motion.button
      variants={buttonTapVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
