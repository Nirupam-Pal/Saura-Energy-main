import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Images, MapPin } from "lucide-react";
import { PROJECT_GALLERY } from "@/lib/projectGallery";
import { VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

// Featured card spans 2 columns, so 5 projects fill a clean 3-column grid.
const HOME_PROJECT_COUNT = 5;

export default function Projects() {
  const projects = PROJECT_GALLERY.slice(0, HOME_PROJECT_COUNT);

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
              Real photos from our installation sites. <span className="text-[#F26A21] font-semibold">Tap any project</span> to see the full gallery.
            </p>
          </div>
          <Link
            to="/projects"
            data-testid="projects-view-all"
            className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B3A8C] text-white text-sm font-semibold shadow-md hover:bg-[#F26A21] transition-colors"
          >
            View all {PROJECT_GALLERY.length} projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: SMOOTH_EASING }}
                className={featured ? "sm:col-span-2" : ""}
              >
                <Link
                  to={`/projects/${p.id}`}
                  data-testid={`project-card-${p.id}`}
                  className="group block rounded-3xl overflow-hidden bg-white border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21] focus-visible:ring-offset-2"
                >
                  <div className="relative h-72 lg:h-96 overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent transition-colors duration-500 group-hover:from-slate-950/90 group-hover:via-slate-900/40" />

                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-[#1B3A8C]">
                      <Images className="h-3 w-3" /> {p.images.length} photos
                    </span>
                    <span className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-[#F26A21] text-white opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 group-hover:-translate-y-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F26A21]">
                        <MapPin className="h-3.5 w-3.5" /> Solar Installation
                      </span>
                      <h3 className={`mt-1.5 font-display font-bold text-white leading-tight ${featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
                        {p.title}
                      </h3>
                      <span className="mt-2 block max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-6 group-hover:opacity-100">
                        View project gallery →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
