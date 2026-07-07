import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, GitCompare } from "lucide-react";
import { PROJECTS, IMG } from "@/lib/data";
import { PROJECT_PAIRS } from "@/lib/projectPairs";
import BeforeAfter from "@/components/BeforeAfter";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { fadeUpVariant, VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

const FILTERS = ["All", "Residential", "Commercial", "Industrial", "EV"];

const PROJECT_GALLERY = {
  1: [
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1485230892430-238f647d6d72?auto=format&fit=crop&w=1200&q=80",
  ],
  2: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=80",
  ],
  3: [
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1508898578281-774ac4893a24?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  ],
  4: [
    "https://images.unsplash.com/photo-1531626471740-02b619362f01?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504691342899-9c484b44f7a7?auto=format&fit=crop&w=1200&q=80",
  ],
  5: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  ],
  6: [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80",
  ],
};

export default function Projects() {
  const [active, setActive] = useState("All");
  const [compareId, setCompareId] = useState(null);
  const [galleryProject, setGalleryProject] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  const openGallery = (projectId) => {
    setGalleryProject(projectId);
    setGalleryIndex(0);
  };

  const galleryImages = galleryProject ? PROJECT_GALLERY[galleryProject] || [] : [];

  return (
    <section className="relative py-24 md:py-32 bg-slate-50/70" data-testid="projects-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Project Showcase</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Built across <span className="text-[#1B3A8C]">North-East India.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Drone-captured installs from our 500+ commissioned plants. <span className="text-[#F26A21] font-semibold">Tap "Before/After"</span> to see the transformation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                data-testid={`project-filter-${f.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  active === f
                    ? "bg-[#1B3A8C] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-[#1B3A8C] hover:text-[#1B3A8C]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const pair = PROJECT_PAIRS[p.image];
              const showCompare = compareId === p.id && pair;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: (i % 3) * 0.06, duration: 0.5, ease: SMOOTH_EASING }}
                  className={`group relative rounded-3xl overflow-hidden bg-white border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all hover:-translate-y-1 ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
                  data-testid={`project-card-${p.id}`}
                  onClick={() => openGallery(p.id)}
                >
                  <div className={`relative ${i === 0 ? "h-72 lg:h-96" : "h-64"} overflow-hidden`}>
                    {showCompare ? (
                      <BeforeAfter
                        before={pair.before}
                        after={pair.after}
                        alt={p.title}
                        height="h-full absolute inset-0"
                        testid={`before-after-${p.id}`}
                      />
                    ) : (
                      <>
                        <img src={IMG[p.image]} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                      </>
                    )}

                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-[#1B3A8C] z-10">
                      {p.category}
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#F26A21] text-white text-xs font-bold z-10">{p.size}</span>

                    {!showCompare && (
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">{p.title}</h3>
                        <div className="mt-2 flex items-center justify-between text-white/80">
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <MapPin className="h-3.5 w-3.5" /> {p.location}
                          </span>
                          <span className="text-xs">{p.year}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer with B/A toggle */}
                  {pair && (
                    <div className="flex items-center justify-between gap-3 p-4 border-t border-slate-100 bg-white">
                      <div className="min-w-0">
                        {showCompare && (
                          <>
                            <h3 className="font-display text-sm font-bold text-slate-900 truncate">{p.title}</h3>
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                              <MapPin className="h-3 w-3" /> {p.location}
                            </span>
                          </>
                        )}
                        {!showCompare && (
                          <span className="text-xs text-slate-500 font-medium">{p.year} · {p.size}</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompareId((c) => (c === p.id ? null : p.id));
                        }}
                        data-testid={`compare-toggle-${p.id}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          showCompare
                            ? "bg-[#1B3A8C] text-white"
                            : "bg-orange-50 text-[#F26A21] hover:bg-[#F26A21] hover:text-white"
                        }`}
                      >
                        <GitCompare className="h-3.5 w-3.5" />
                        {showCompare ? "Hide compare" : "Before / After"}
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={!!galleryProject} onOpenChange={(open) => { if (!open) setGalleryProject(null); }}>
        {galleryProject && (
          <DialogContent className="max-w-6xl mx-4 sm:mx-auto p-4 md:p-6">
            <DialogTitle className="text-xl font-bold text-slate-900">
              {PROJECTS.find((project) => project.id === galleryProject)?.title || "Project Gallery"}
            </DialogTitle>
            <p className="text-sm text-slate-600 mb-4">
              Browse the selected project images. Tap thumbnails or use navigation arrows.
            </p>
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-xl">
                <img
                  src={galleryImages[galleryIndex]}
                  alt={`Project gallery ${galleryIndex + 1}`}
                  className="w-full h-[min(60vh,520px)] object-cover"
                />
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex((idx) => Math.max(idx - 1, 0)); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex((idx) => Math.min(idx + 1, galleryImages.length - 1)); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex(idx); }}
                    className={`overflow-hidden rounded-2xl border ${galleryIndex === idx ? "border-[#1B3A8C]" : "border-slate-200"}`}
                  >
                    <img src={src} alt={`Thumbnail ${idx + 1}`} className="h-24 w-full object-cover transition-transform duration-300 hover:scale-105" />
                  </button>
                ))}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
