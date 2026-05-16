import Projects from "@/components/sections/Projects";
import CTASection from "@/components/sections/CTASection";

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
      <Projects />
      <CTASection />
    </>
  );
}
