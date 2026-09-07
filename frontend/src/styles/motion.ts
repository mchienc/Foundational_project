import { Variants, Transition } from 'framer-motion';

/**
 * EduFlow LMS Motion System
 * Adheres to UI/UX Pro Max Motion Guidelines
 * Easing: cubic-bezier(0.16, 1, 0.3, 1) - Natural snappy ease-out
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  micro: 0.18, // 180ms for buttons, hover, checkboxes
  component: 0.3, // 300ms for accordion, tabs, sidebars
  page: 0.4, // 400ms for modals, page entrance
} as const;

export const defaultTransition: Transition = {
  duration: DURATION.component,
  ease: EASE_OUT,
};

// 1. Button Haptic Feedback
export const buttonTapVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.15, ease: EASE_OUT } },
  tap: { scale: 0.97, transition: { duration: 0.1, ease: EASE_OUT } },
};

// 2. Card Hover Lift & Shadow
export const cardHoverVariants: Variants = {
  idle: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
  },
  hover: {
    y: -6,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.06)',
    transition: { duration: 0.2, ease: EASE_OUT },
  },
};

// 3. Page / Container Stagger Animation (0.05s between children)
export const containerStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// 4. Stagger Child Item Fade Up
export const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.component, ease: EASE_OUT },
  },
};

// 5. Lesson Checkbox Pop & Scale
export const checkboxPopVariants: Variants = {
  unchecked: { scale: 1 },
  checked: {
    scale: [1, 1.22, 1],
    transition: { duration: 0.28, ease: EASE_OUT },
  },
};

// 6. SVG Checkmark Path Animation (stroke-dashoffset draw)
export const checkmarkPathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};

// 7. Modal Scale From Center
export const modalScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.82,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.page, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
};

// 8. Streak Flame Pulsing Floating Keyframes (2s loop)
export const flamePulseVariants: Variants = {
  pulse: {
    y: [0, -3, 0],
    scale: [1, 1.09, 1],
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 9. Syllabus Accordion Expand / Collapse
export const accordionVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.32, ease: EASE_OUT },
  },
};

// 10. Video Controls Auto-hide
export const videoControlsVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  hidden: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};
