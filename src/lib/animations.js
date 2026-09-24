// Motion tokens shared across the site.
//
// Every animation here only moves `transform` (x / y / scale) and `opacity`,
// which the browser hands to the GPU compositor — no layout or repaint work
// per frame, so motion stays smooth even on low-end phones.

// Easing curves. Strong "ease-out" shapes: fast start, long soft landing —
// the way real objects decelerate. (Matches the Tailwind `ease-*` tokens.)
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

// Kept for existing imports; now point at the smoother curves.
export const SMOOTH_EASING = EASE_OUT_QUINT;
export const ELASTIC_EASING = [0.34, 1.56, 0.64, 1]; // slight overshoot
export const FADE_EASING = EASE_OUT_EXPO;

// Spring presets — physics instead of fixed durations, so interrupted
// animations (hover in/out, fast clicks) blend naturally instead of snapping.
export const SPRING_SOFT = { type: "spring", stiffness: 120, damping: 20, mass: 0.9 };   // large reveals
export const SPRING_SNAPPY = { type: "spring", stiffness: 380, damping: 30, mass: 0.8 }; // UI feedback
export const SPRING_BOUNCY = { type: "spring", stiffness: 260, damping: 18 };            // playful pop-ins

// Default transition for any motion component that doesn't set one.
export const DEFAULT_TRANSITION = { duration: 0.7, ease: EASE_OUT_QUINT };

// Viewport settings for consistent scroll trigger behavior
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -80px 0px" };
export const VIEWPORT_REPEAT = { margin: "-80px" };

// Stagger helper for grids: delay by column so each row cascades left→right.
export const staggerDelay = (i, columns = 3, step = 0.07) => (i % columns) * step;

// Reusable animation variants
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.8, ease: EASE_OUT_EXPO },
  }),
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.07, duration: 0.6, ease: EASE_OUT_QUINT },
  }),
};

export const slideInLeftVariant = {
  hidden: { opacity: 0, x: -32 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.8, ease: EASE_OUT_EXPO },
  }),
};

export const slideInRightVariant = {
  hidden: { opacity: 0, x: 32 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.8, ease: EASE_OUT_EXPO },
  }),
};

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.07, duration: 0.7, ease: EASE_OUT_EXPO },
  }),
};

export const staggerContainer = {
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

// Grid reveal: children rise in with a soft spring as the grid scrolls into view.
export const gridReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...SPRING_SOFT, delay: staggerDelay(i) },
  }),
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: EASE_IN_OUT } },
};

