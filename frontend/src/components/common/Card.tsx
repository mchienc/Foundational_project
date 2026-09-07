import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cardHoverVariants } from '../../styles/motion';

interface CardProps extends HTMLMotionProps<'div'> {
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  hoverable = true,
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      variants={hoverable ? cardHoverVariants : undefined}
      initial="idle"
      whileHover={hoverable ? 'hover' : undefined}
      className={`bg-white border border-slate-200/80 rounded-2xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
