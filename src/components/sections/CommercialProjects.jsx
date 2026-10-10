import AnimatedCounter from "@/components/AnimatedCounter";
import { COMMERCIAL_PROJECTS } from "@/lib/data";
import { Reveal, RevealGroup } from "@/components/Reveal";

// Grid width follows the number of entries (capped) so 1–3 cards fill the row.
const COLS = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" };

function ProjectGroup({ title, subtitle, badge, projects, frame, numberGradient, large, delay = 0 }) {
  return (
    <Reveal delay={delay} className={`hover-lift rounded-2xl p-[1px] bg-gradient-to-r ${frame} shadow-lg hover:shadow-2xl hover:shadow-blue-900/10 transition-lift duration-500`}>
      <div className="bg-white rounded-2xl p-6 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          </div>
          <div className="text-sm text-slate-500 uppercase tracking-wide">{badge}</div>
        </div>

        <div className={`mt-6 grid ${COLS[Math.min(projects.length, large ? 2 : 3)]} gap-4`}>
          {projects.map((p) => (
            <div
              key={p.name}
              className={`rounded-lg ${large ? "p-5" : "p-4 text-center"} bg-gradient-to-tr from-white/80 to-slate-50 border border-slate-100 shadow-sm hover:border-[#F26A21]/30 hover:shadow-md hover:-translate-y-0.5 transition-lift duration-500`}
            >
              <div className={`${large ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"} font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${numberGradient}`}>
                <AnimatedCounter to={p.kw} duration={1.6} suffix=" kW" />
              </div>
              <div className={`${large ? "mt-2" : "mt-1"} text-sm text-slate-600`}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function CommercialProjects() {
  const { completed, upcoming } = COMMERCIAL_PROJECTS;
  if (!completed.length && !upcoming.length) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealGroup className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900">
            Commercial Solar Projects
          </h2>
          <p className="mt-3 text-slate-600">Completed and upcoming commercial projects with installed and planned capacities.</p>
        </RevealGroup>

        <div className={`grid grid-cols-1 ${completed.length && upcoming.length ? "md:grid-cols-2" : ""} gap-8`}>
          {completed.length > 0 && (
            <ProjectGroup
              title="Completed Projects"
              subtitle="Capacities commissioned and operational."
              badge="Status"
              projects={completed}
              frame="from-[#F26A21] via-[#1B3A8C] to-[#2BA84A]"
              numberGradient="from-[#1B3A8C] to-[#F26A21]"
              large
            />
          )}
          {upcoming.length > 0 && (
            <ProjectGroup
              title="Upcoming Projects"
              subtitle="Planned capacities in the pipeline."
              badge="Planned"
              projects={upcoming}
              frame="from-[#2BA84A] via-[#1B3A8C] to-[#F26A21]"
              numberGradient="from-[#2BA84A] to-[#1B3A8C]"
              delay={0.12}
            />
          )}
        </div>
      </div>
    </section>
  );
}
