import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Images, MapPin } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import { PROJECT_GALLERY } from "@/lib/projectGallery";
import { VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: SMOOTH_EASING }}
              >
                <Link
                  to={`/projects/${p.id}`}
                  data-testid={`project-card-${p.id}`}
                  className="group block rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21] focus-visible:ring-offset-2"
                >
                  <div className="relative h-72 overflow-hidden">
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
                      <h3 className="mt-1.5 font-display text-xl md:text-2xl font-bold text-white leading-tight">{p.title}</h3>
                      <span className="mt-2 block max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-6 group-hover:opacity-100">
                        View project gallery →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
