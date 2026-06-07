import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, GitCompare } from "lucide-react";
import { PROJECTS, IMG } from "@/lib/data";
import { PROJECT_PAIRS } from "@/lib/projectPairs";
import BeforeAfter from "@/components/BeforeAfter";
import { fadeUpVariant, VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

const FILTERS = ["All", "Residential", "Commercial", "Industrial", "EV"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const [compareId, setCompareId] = useState(null);
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

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
                        onClick={() => setCompareId((c) => (c === p.id ? null : p.id))}
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
    </section>
  );
}
