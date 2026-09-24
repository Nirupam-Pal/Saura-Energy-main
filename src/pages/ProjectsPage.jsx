import { motion } from "framer-motion";
import CTASection from "@/components/sections/CTASection";
import ProjectCard from "@/components/ProjectCard";
import { PROJECT_GALLERY } from "@/lib/projectGallery";
import { VIEWPORT_ONCE, gridReveal } from "@/lib/animations";

export default function ProjectsPage() {
  return (
    <>
      <section className="relative pt-44 pb-20 bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#F26A21]/20 blur-[120px]" />
        <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] rounded-full bg-[#1B3A8C]/30 blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-4">Project Showcase</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            500+ installs. <span className="gradient-text">18.6 MW commissioned.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
            From cosy homes in Agartala to MW-scale tea estate plants — drone-captured proof of our engineering rigor.
          </p>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-slate-50/70" data-testid="projects-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Our Installations</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Real sites. <span className="text-[#1B3A8C]">Real results.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Photos straight from our installation sites. Open any project to see the full gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {PROJECT_GALLERY.map((p, i) => (
              <motion.div
                key={p.id}
                variants={gridReveal}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                custom={i}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
