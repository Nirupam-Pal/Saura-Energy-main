import { motion } from "framer-motion";
import { Sun, Target, Eye, Heart, Award, Building, Leaf, Users } from "lucide-react";
import { IMG, BRAND } from "@/lib/data";
import CTASection from "@/components/sections/CTASection";

const MILESTONES = [
  { year: "2015", title: "Founded in Agartala", desc: "Started with a vision: bring affordable solar to North-East India." },
  { year: "2018", title: "100 Installations", desc: "Crossed our first century of rooftop installations across Tripura & Assam." },
  { year: "2020", title: "EPC Division", desc: "Launched MW-scale EPC services for commercial & industrial clients." },
  { year: "2022", title: "PM Surya Ghar Empanelled", desc: "Became authorised vendor for India's flagship rooftop subsidy programme." },
  { year: "2024", title: "500+ Plants Live", desc: "Crossed 18.6 MW of cumulative installed capacity. 7 NE states covered." },
  { year: "2026", title: "Battery & EV", desc: "Launched lithium storage and solar-integrated EV charging verticals." },
];

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-44 pb-20 bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={IMG.engineers1} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/85 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-4">About Saura Energy</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            Engineering the sun for <span className="gradient-text">India's clean future.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
            Founded in 2015 in Agartala, Tripura — Saura Energy is a clean-energy company on a mission to make premium solar accessible to every Indian home, business and industry.
          </p>
        </div>
      </section>

      {/* MVV cards */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={IMG.engineers2} alt="Engineers" className="rounded-3xl shadow-2xl shadow-blue-900/15 w-full aspect-[4/5] object-cover" />
            <img src={IMG.heroDrone} alt="Drone" className="hidden md:block absolute -bottom-12 -right-8 w-56 h-56 object-cover rounded-3xl border-8 border-white shadow-xl" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Our Mission, Vision & Values</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We don't just install panels.<br /><span className="text-[#1B3A8C]">We earn trust.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              From the way we size your system to the way we file your subsidy, every decision is engineered for one outcome: a lifelong customer who refers us with pride.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Target, title: "Mission", desc: "Make solar simple, affordable and trustworthy for every Indian home and business." },
                { icon: Eye, title: "Vision", desc: "Be the most-loved clean-energy brand of Eastern India by 2030." },
                { icon: Heart, title: "Values", desc: "Engineering rigor, transparent pricing, lifelong customer trust." },
              ].map(({ icon: I, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <span className="h-11 w-11 rounded-xl bg-[#F26A21]/12 grid place-items-center flex-shrink-0"><I className="h-5 w-5 text-[#F26A21]" /></span>
                  <div>
                    <div className="font-display font-bold text-slate-900">{title}</div>
                    <div className="text-sm text-slate-600 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Our Journey</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A decade of <span className="text-[#2BA84A]">honest solar.</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F26A21] via-[#2BA84A] to-[#1B3A8C] md:-translate-x-px" />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative grid md:grid-cols-2 gap-6 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className={`pl-16 md:pl-0 md:pr-12 md:text-right ${i % 2 ? "md:pl-12 md:pr-0 md:text-left" : ""}`}>
                    <div className="font-display text-4xl md:text-5xl font-extrabold text-[#F26A21]">{m.year}</div>
                  </div>
                  <div className={`pl-16 md:pl-12 ${i % 2 ? "md:pr-12 md:pl-0" : ""}`}>
                    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <h3 className="font-display font-bold text-xl text-slate-900">{m.title}</h3>
                      <p className="mt-2 text-slate-600 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <span className="absolute left-6 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 h-4 w-4 rounded-full bg-white border-4 border-[#F26A21] shadow-md" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sun className="h-12 w-12 text-[#F26A21] mx-auto mb-6" />
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Founder's Note</p>
          <blockquote className="font-display text-2xl md:text-4xl text-slate-800 leading-snug font-bold italic tracking-tight">
            "I grew up in a state where power cuts shaped our evenings. Solar isn't just clean — for India, it's freedom. At Saura, we're building the most-trusted clean-energy brand by treating every install like it's on our own home."
          </blockquote>
          <div className="mt-8">
            <div className="font-display font-bold text-slate-900 text-lg">Soumya Choudhury</div>
            <div className="text-sm text-slate-500">Founder & Managing Director</div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
