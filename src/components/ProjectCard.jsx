import { Link } from "react-router-dom";
import { ArrowUpRight, Images, MapPin } from "lucide-react";
import ProgressiveImage from "@/components/ProgressiveImage";

const GRID_SIZES = "(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
const FEATURED_SIZES = "(min-width: 1280px) 830px, (min-width: 640px) 66vw, 100vw";

/**
 * Project thumbnail card linking to /projects/:id.
 * Hover motion only uses transform + opacity (GPU-composited): the card
 * lifts, the photo slowly zooms, and the caption slides up to reveal a CTA.
 */
export default function ProjectCard({ project, featured = false }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      data-testid={`project-card-${project.id}`}
      className="group block rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-lift duration-500 ease-out-expo hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21] focus-visible:ring-offset-2"
    >
      <div className="relative h-72 lg:h-96 overflow-hidden">
        <ProgressiveImage
          src={project.cover}
          alt={project.title}
          sizes={featured ? FEATURED_SIZES : GRID_SIZES}
          className="absolute inset-0"
          imgClassName="duration-1000 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent" />
        {/* Darkening layer fades in on hover (opacity only — no gradient repaint). */}
        <div className="absolute inset-0 bg-slate-950/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-[#1B3A8C]">
          <Images className="h-3 w-3" /> {project.images.length} photos
        </span>
        <span className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-[#F26A21] text-white opacity-0 -translate-y-2 scale-75 transition-[opacity,transform] duration-500 ease-spring group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>

        {/* Caption sits 1.75rem low (CTA line hidden below the edge) and slides up on hover. */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-7 transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F26A21]">
            <MapPin className="h-3.5 w-3.5" /> Solar Installation
          </span>
          <h3 className={`mt-1.5 font-display font-bold text-white leading-tight ${featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
            {project.title}
          </h3>
          <span className="mt-2 block text-sm text-white/80 opacity-0 transition-opacity duration-500 delay-75 group-hover:opacity-100 group-focus-visible:opacity-100">
            View project gallery →
          </span>
        </div>
      </div>
    </Link>
  );
}
