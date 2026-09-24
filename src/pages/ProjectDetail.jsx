import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Images, MapPin, X, ZoomIn } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import ProgressiveImage from "@/components/ProgressiveImage";
import { PROJECT_GALLERY, getProjectById } from "@/lib/projectGallery";
import { preloadImage, resolveImage } from "@/lib/images";
import { VIEWPORT_ONCE, EASE_OUT_EXPO, SPRING_SNAPPY, gridReveal } from "@/lib/animations";

const MASONRY_SIZES = "(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
const SWIPE_THRESHOLD = 60;

// Slide in from the side we're navigating towards.
const slide = {
  enter: (dir) => ({ x: dir * 80, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { x: SPRING_SNAPPY, scale: SPRING_SNAPPY, opacity: { duration: 0.3 } } },
  exit: (dir) => ({ x: dir * -80, opacity: 0, scale: 0.98, transition: { duration: 0.25, ease: EASE_OUT_EXPO } }),
};

function LightboxImage({ src, alt }) {
  const img = resolveImage(src);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0">
      {/* Inline blur placeholder shows instantly while the full-size photo downloads. */}
      {img.lqip && (
        <img src={img.lqip} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-contain blur-2xl" />
      )}
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes="100vw"
        alt={alt}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out-expo ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function Lightbox({ images, title, index, direction, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  // Warm the cache for the neighbours so next/prev feel instant.
  useEffect(() => {
    if (images.length < 2) return;
    preloadImage(images[(index + 1) % images.length]);
    preloadImage(images[(index - 1 + images.length) % images.length]);
  }, [images, index]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35, ease: EASE_OUT_EXPO } }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE_OUT_EXPO } }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photo viewer`}
      data-testid="project-lightbox"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white">
        <p className="text-sm font-semibold">
          {title} <span className="text-white/50 font-normal">· {index + 1} / {images.length}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 hover:rotate-90 transition-lift"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <motion.div
        className="relative flex-1 min-h-0 mx-4 sm:mx-20 mb-6"
        initial={{ scale: 0.96 }}
        animate={{ scale: 1, transition: SPRING_SNAPPY }}
        exit={{ scale: 0.96 }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = offset.x + velocity.x * 0.2;
              if (swipe < -SWIPE_THRESHOLD) onNext();
              else if (swipe > SWIPE_THRESHOLD) onPrev();
            }}
          >
            <LightboxImage src={images[index]} alt={`${title} — photo ${index + 1}`} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/10 text-white hover:bg-[#F26A21] hover:scale-110 active:scale-95 transition-lift"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/10 text-white hover:bg-[#F26A21] hover:scale-110 active:scale-95 transition-lift"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </motion.div>,
    document.body
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);
  // [index, direction] — direction drives which way the lightbox slides.
  const [[lightboxIndex, direction], setLightbox] = useState([null, 0]);

  const count = project?.images.length || 0;
  const closeLightbox = useCallback(() => setLightbox(([, d]) => [null, d]), []);
  const prev = useCallback(() => setLightbox(([i]) => [(i - 1 + count) % count, -1]), [count]);
  const next = useCallback(() => setLightbox(([i]) => [(i + 1) % count, 1]), [count]);

  if (!project) return <Navigate to="/projects" replace />;

  const others = PROJECT_GALLERY.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      <section className="relative pt-40 pb-20 bg-[#0A1128] text-white overflow-hidden">
        {/* Above the fold: high priority, not lazy. It sits at 35% opacity under a gradient, so 1200px is plenty. */}
        <ProgressiveImage src={project.cover} priority sizes="(min-width: 1024px) 1200px, 100vw" className="absolute inset-0 opacity-35 !bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/85 to-[#0A1128]/30" />
        <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] rounded-full bg-[#F26A21]/15 blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-[#F26A21] text-sm font-semibold transition-colors"
            data-testid="project-back-link"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All Projects
          </Link>
          <p className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21]">
            <MapPin className="h-3.5 w-3.5" /> Project Location
          </p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            {project.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm font-semibold">
              <Images className="h-4 w-4 text-[#F26A21]" /> {project.images.length} photos
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-50/70" data-testid="project-detail-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Installation Gallery</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              On site at <span className="text-[#1B3A8C]">{project.title}</span>
            </h2>
            <p className="mt-3 text-slate-600">Tap any photo to view it full screen.</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {project.images.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setLightbox([i, 0])}
                variants={gridReveal}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                custom={i}
                aria-label={`Open photo ${i + 1}`}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-lift duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]"
              >
                {/* `intrinsic` reserves each photo's real aspect ratio, so the masonry never reflows. */}
                <ProgressiveImage
                  src={src}
                  alt={`${project.title} — photo ${i + 1}`}
                  sizes={MASONRY_SIZES}
                  intrinsic
                  imgClassName="duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500 grid place-items-center">
                  <span className="h-12 w-12 grid place-items-center rounded-full bg-white/95 text-[#1B3A8C] scale-75 group-hover:scale-100 transition-transform duration-500 ease-spring">
                    <ZoomIn className="h-5 w-5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">More projects</h2>
              <Link to="/projects" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3A8C] hover:text-[#F26A21] transition-colors">
                View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((p, i) => (
                <motion.div key={p.id} variants={gridReveal} initial="hidden" whileInView="show" viewport={VIEWPORT_ONCE} custom={i}>
                  <Link
                    to={`/projects/${p.id}`}
                    className="group relative block h-56 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-lift duration-500 hover:-translate-y-1"
                  >
                    <ProgressiveImage src={p.cover} alt={p.title} sizes={MASONRY_SIZES} className="absolute inset-0" imgClassName="duration-1000 group-hover:scale-[1.08]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                    <h3 className="absolute bottom-5 left-5 right-5 font-display text-lg font-bold text-white">{p.title}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={project.images}
            title={project.title}
            index={lightboxIndex}
            direction={direction}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
