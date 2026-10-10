import { Children } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/animations";

// Scroll-reveal primitives. Both fade + rise (opacity/transform only) the
// first time they enter the viewport, and honour the site-wide
// `MotionConfig reducedMotion="user"` set in App.js.

const REVEAL_TRANSITION = { duration: 0.8, ease: EASE_OUT_EXPO };

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: REVEAL_TRANSITION },
};

/** Single element that rises into view. `as` picks the motion tag. */
export function Reveal({ as = "div", delay = 0, y = 24, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ ...REVEAL_TRANSITION, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/**
 * Container whose direct children cascade in one after another — used for
 * section headings (eyebrow → title → intro). Each child gets a block
 * wrapper, so use it on stacked text, not on flex/grid layouts whose
 * children carry their own sizing classes.
 */
export function RevealGroup({ as = "div", stagger = 0.09, delay = 0, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {Children.map(children, (child) =>
        child == null || child === false ? child : <motion.div variants={itemVariants}>{child}</motion.div>
      )}
    </Comp>
  );
}
