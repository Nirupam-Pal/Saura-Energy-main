import { motion } from "framer-motion";
import { WHY_CHOOSE } from "@/lib/data";
import { fadeUpVariant, VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";
import { ShieldCheck, Users, Award, Rocket, Wrench, Landmark, Sun, ReceiptText } from "lucide-react";

const ICONS = { ShieldCheck, Users, Award, Rocket, Wrench, Landmark, Sun, ReceiptText };

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32 bg-white" data-testid="why-choose-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Why Choose Saura</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
            8 reasons we're <span className="text-[#2BA84A]">North-East India's #1</span> solar partner.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {WHY_CHOOSE.map((w, i) => {
            const Icon = ICONS[w.icon] || ShieldCheck;
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
                className="group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-[#F26A21]/40 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
                data-testid={`why-card-${i}`}
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#F26A21]/0 group-hover:bg-[#F26A21]/8 transition-all duration-500" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#F26A21]/15 to-[#1B3A8C]/15 grid place-items-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-[#F26A21]" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{w.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
