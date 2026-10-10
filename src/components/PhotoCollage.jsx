import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { PROJECT_GALLERY } from "@/lib/projectGallery";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/animations";
import ProgressiveImage from "@/components/ProgressiveImage";

/**
 * Picks a real installation photo from public/projects/<title>/. `file` is
 * the photo's file name (defaults to the folder's first photo); `fallback`
 * covers a renamed folder so the layout never breaks.
 */
export const projectPhoto = (title, file, fallback) => {
  const images = PROJECT_GALLERY.find((p) => p.title === title)?.images || [];
  return (file ? images.find((src) => src.endsWith(`/${file}`)) : images[0]) || fallback;
};

/**
 * Two-photo collage with floating proof points: a main photo revealed by a
 * lifting orange curtain, a second photo layered over its bottom-left corner,
 * and two floating cards on the right. The photos drift at different speeds
 * on scroll for depth. Transform/opacity only.
 *
 * - main / inset: { src, alt, position, sizes } — `position` is a Tailwind
 *   object-position class to keep the subject in frame; `sizes` overrides
 *   the responsive-image hint (see MAIN_SIZES).
 * - caption: { place, title } shown on the main photo.
 * - topCard / bottomCard: ready-made nodes for the floating cards.
 */
// A landscape (4:3) photo cropped into the 4:5 portrait frame — plus the 6%
// parallax bleed — renders ~1.9x wider than the frame itself (≈1250px on a
// desktop). `sizes` must describe that rendered width, or the browser picks a
// variant half as wide as needed and the photo looks soft.
const MAIN_SIZES = "(min-width: 1024px) 1280px, 190vw";

export default function PhotoCollage({ main, inset, caption, topCard, bottomCard }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const insetY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} className="relative pb-14 lg:pb-0 lg:pr-6">
      {/* Decorative: dot grid + slowly turning dashed "sun ring" */}
      <div
        aria-hidden="true"
        className="absolute -top-6 -left-4 sm:-left-8 w-40 h-40 opacity-60"
        style={{ backgroundImage: "radial-gradient(rgba(242,106,33,0.45) 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }}
      />
      <div aria-hidden="true" className="absolute -top-10 right-0 lg:-right-2 w-36 h-36 rounded-full border-2 border-dashed border-[#1B3A8C]/25 spin-slow" />

      {/* Main photo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20"
      >
        <motion.div style={{ y: mainY }} className="absolute inset-x-0 -inset-y-[6%]">
          <motion.div
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.8, ease: EASE_OUT_EXPO }}
            className="absolute inset-0"
          >
            <ProgressiveImage
              src={main.src}
              alt={main.alt}
              sizes={main.sizes || MAIN_SIZES}
              className="absolute inset-0"
              imgClassName={`${main.position || ""} duration-1000 group-hover:scale-105`}
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

        {caption && (
          <div className="absolute right-5 bottom-5 sm:right-6 sm:bottom-6 left-[40%] text-right text-white">
            <span className="inline-flex items-center justify-end gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFAA5C]">
              <MapPin className="h-3.5 w-3.5" /> {caption.place}
            </span>
            <div className="mt-1 font-display text-lg sm:text-xl font-bold">{caption.title}</div>
          </div>
        )}

        {/* Orange curtain lifts away to reveal the photo */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-[#F26A21] to-[#D95B1A]"
        />
      </motion.div>

      {/* Second photo layered over the corner */}
      <motion.div style={{ y: insetY }} className="absolute -bottom-2 lg:-bottom-10 -left-2 sm:-left-8 w-32 sm:w-44 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -10 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.55 }}
          className="aspect-[3/4] rounded-2xl overflow-hidden border-[5px] border-white shadow-2xl shadow-slate-900/25 hover:rotate-0 hover:scale-105 transition-transform duration-500 ease-out-expo"
        >
          <ProgressiveImage src={inset.src} alt={inset.alt} sizes="176px" className="h-full" imgClassName={inset.position || ""} />
        </motion.div>
      </motion.div>

      {/* Floating proof points */}
      {topCard && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.8 }}
          className="absolute top-8 right-0 lg:-right-2 z-10"
        >
          <div className="hero-float">{topCard}</div>
        </motion.div>
      )}
      {bottomCard && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1 }}
          className="absolute bottom-[34%] right-0 lg:-right-2 z-10"
        >
          <div className="hero-float" style={{ animationDelay: "-3s" }}>{bottomCard}</div>
        </motion.div>
      )}
    </div>
  );
}

/** Floating stat card: icon tile + big value + small label. */
export function CollageStat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-xl shadow-blue-900/15 border border-slate-100">
      <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#F26A21] to-[#FFAA5C] grid place-items-center">
        <Icon className="h-5 w-5 text-white" />
      </span>
      <div>
        <div className="font-display text-xl font-extrabold text-slate-900 leading-none">{value}</div>
        <div className="mt-1 text-[11px] text-slate-500">{label}</div>
      </div>
    </div>
  );
}

/** Floating pill badge with a green check-style icon. */
export function CollageBadge({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur pl-2 pr-4 py-2 shadow-xl shadow-blue-900/15 border border-slate-100">
      <span className="h-7 w-7 rounded-full bg-[#2BA84A]/15 grid place-items-center">
        <Icon className="h-4 w-4 text-[#2BA84A]" />
      </span>
      <span className="text-sm font-bold text-slate-800">{label}</span>
    </div>
  );
}
