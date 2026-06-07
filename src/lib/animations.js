// Smooth animation easing curves and configurations
export const SMOOTH_EASING = [0.25, 0.46, 0.45, 0.94]; // smooth cubic bezier
export const ELASTIC_EASING = [0.34, 1.56, 0.64, 1]; // slight elastic bounce
export const FADE_EASING = [0.22, 1, 0.36, 1]; // natural fade-in

// Viewport settings for consistent scroll trigger behavior
export const VIEWPORT_ONCE = { once: true, margin: "-100px" };
export const VIEWPORT_REPEAT = { margin: "-80px" };

// Reusable animation variants
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: SMOOTH_EASING,
    },
  }),
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: SMOOTH_EASING,
    },
  }),
};

export const slideInLeftVariant = {
  hidden: { opacity: 0, x: -30 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: SMOOTH_EASING,
    },
  }),
};

export const slideInRightVariant = {
  hidden: { opacity: 0, x: 30 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: SMOOTH_EASING,
    },
  }),
};

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: SMOOTH_EASING,
    },
  }),
};

export const staggerContainer = {
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: SMOOTH_EASING } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
