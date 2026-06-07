import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";
import { MessageSquare, MapPin, Ruler, FileCheck2, Hammer, Zap, ShieldCheck } from "lucide-react";
import { fadeUpVariant, VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

const ICONS = { MessageSquare, MapPin, Ruler, FileCheck2, Hammer, Zap, ShieldCheck };

export default function Process() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0A1128] text-white overflow-hidden" data-testid="process-section">
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#F26A21]/15 blur-[120px]" />
      <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] rounded-full bg-[#1B3A8C]/40 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Our Process</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            From quote to <span className="gradient-text">live solar</span> — in 7 effortless steps.
          </h2>
        </div>

        {/* Horizontal scrollable timeline */}
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-[#F26A21] via-[#2BA84A] to-[#1B3A8C] opacity-40" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
            {PROCESS_STEPS.map((s, i) => {
              const Icon = ICONS[s.icon] || MessageSquare;
              return (
                <motion.div
                  key={s.n}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT_ONCE}
                  custom={i}
                  variants={fadeUpVariant}
                  className="relative"
                  data-testid={`process-step-${s.n}`}
                >
                  <div className="relative z-10 h-24 w-24 mx-auto rounded-full bg-white/5 border border-white/15 backdrop-blur grid place-items-center group hover:bg-[#F26A21] transition-colors">
                    <Icon className="h-8 w-8 text-[#F26A21] group-hover:text-white transition-colors" />
                    <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[#F26A21] text-white text-xs font-bold grid place-items-center font-display">
                      {s.n}
                    </span>
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="font-display font-bold text-base">{s.title}</h3>
                    <p className="mt-1.5 text-xs text-white/60 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
