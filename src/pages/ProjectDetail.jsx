import { useCallback, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Images, MapPin, X, ZoomIn } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import { PROJECT_GALLERY, getProjectById } from "@/lib/projectGallery";
import { VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

function Lightbox({ images, title, index, onClose, onPrev, onNext }) {
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

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
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
          className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20 pb-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={images[index]}
            alt={`${title} — photo ${index + 1}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: SMOOTH_EASING }}
            className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/10 text-white hover:bg-[#F26A21] transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/10 text-white hover:bg-[#F26A21] transition"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const count = project?.images.length || 0;
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % count), [count]);

  if (!project) return <Navigate to="/projects" replace />;

  const others = PROJECT_GALLERY.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      <section className="relative pt-40 pb-20 bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <img src={project.cover} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/85 to-[#0A1128]/30" />
        <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] rounded-full bg-[#F26A21]/15 blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#F26A21] text-sm font-semibold transition"
            data-testid="project-back-link"
          >
            <ArrowLeft className="h-4 w-4" /> All Projects
          </Link>
          <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21]">
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

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {project.images.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: SMOOTH_EASING }}
                aria-label={`Open photo ${i + 1}`}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-shadow duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]"
              >
                <img
                  src={src}
                  alt={`${project.title} — photo ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/35 transition-colors duration-500 grid place-items-center">
                  <span className="h-12 w-12 grid place-items-center rounded-full bg-white/95 text-[#1B3A8C] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
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
              <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3A8C] hover:text-[#F26A21] transition">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="group relative block h-56 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-1"
                >
                  <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                  <h3 className="absolute bottom-5 left-5 right-5 font-display text-lg font-bold text-white">{p.title}</h3>
                </Link>
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
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
