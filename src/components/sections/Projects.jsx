import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECT_GALLERY } from "@/lib/projectGallery";
import { VIEWPORT_ONCE, gridReveal } from "@/lib/animations";

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
            className="group self-start lg:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B3A8C] text-white text-sm font-semibold shadow-md hover:bg-[#F26A21] hover:-translate-y-0.5 transition-lift"
          >
            View all {PROJECT_GALLERY.length} projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={p.id}
                variants={gridReveal}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                custom={i}
                className={featured ? "sm:col-span-2" : ""}
              >
                <ProjectCard project={p} featured={featured} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
