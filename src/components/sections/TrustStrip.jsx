import { motion } from "framer-motion";
import { PARTNERS, BANKS } from "@/lib/data";
import { Award, ShieldCheck, BadgeCheck, Landmark } from "lucide-react";

export default function TrustStrip() {
  return (
    <section className="relative py-14 bg-white border-y border-slate-100" data-testid="trust-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-2">Premium Quality. Trusted Brands.</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Powered by India's most trusted solar manufacturers
            </h3>
          </motion.div>

          {/* Marquee */}
          <div className="lg:w-2/3 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex gap-12 marquee-track w-max">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div key={i} className="flex-shrink-0 grid place-items-center min-w-[140px]">
                  <div className="font-display font-extrabold text-2xl text-slate-400 hover:text-[#1B3A8C] transition-colors tracking-tight">
                    {p.abbr}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom badge row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: BadgeCheck, label: "MNRE Empanelled" },
            { icon: ShieldCheck, label: "ISO 9001:2015 Certified" },
            { icon: Award, label: "PM Surya Ghar Vendor" },
            { icon: Landmark, label: "Bank-Approved Financier" },
          ].map(({ icon: I, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
            >
              <I className="h-5 w-5 text-[#2BA84A] flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-700">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Banks */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 justify-center">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Finance Partners:</span>
          {BANKS.map((b) => (
            <span key={b} className="text-sm font-bold text-slate-400 hover:text-[#1B3A8C] transition">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
