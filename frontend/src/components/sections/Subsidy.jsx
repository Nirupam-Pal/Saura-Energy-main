import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Landmark, FileCheck2, BadgePercent, IndianRupee } from "lucide-react";
import { BANKS } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function Subsidy() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-[#FAF7F2] to-white overflow-hidden" data-testid="subsidy-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left badge card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1B3A8C] via-[#1B3A8C] to-[#0A1128] text-white p-10 shadow-2xl">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#F26A21]/30 blur-[80px]" />
              <div className="absolute top-6 right-6 spin-slow">
                <svg viewBox="0 0 100 100" className="h-20 w-20 text-[#F26A21] opacity-70">
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="50" cy="50" r="16" fill="currentColor" />
                    {Array.from({ length: 12 }).map((_, i) => {
                      const a = (i * 30 * Math.PI) / 180;
                      return <line key={i} x1={50 + Math.cos(a) * 22} y1={50 + Math.sin(a) * 22} x2={50 + Math.cos(a) * 36} y2={50 + Math.sin(a) * 36} />;
                    })}
                  </g>
                </svg>
              </div>

              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F26A21]/20 border border-[#F26A21]/40 text-[#FFAA5C] text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="h-3 w-3" /> Government Scheme
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-extrabold mt-5 tracking-tight">
                  Get up to <br />
                  <span className="text-[#F26A21] text-5xl md:text-6xl">₹85,800</span>
                </h3>
                <p className="mt-3 text-white/80 text-lg font-medium">Instant subsidy under PM Surya Ghar: Muft Bijli Yojana.</p>

                <ul className="mt-8 space-y-3">
                  {[
                    { i: BadgePercent, t: "Direct bank transfer subsidy" },
                    { i: Landmark, t: "Loan @ 5.75% from SBI/PNB/BOB/Canara" },
                    { i: FileCheck2, t: "We handle DISCOM + portal paperwork" },
                    { i: IndianRupee, t: "Zero hidden costs · transparent quote" },
                  ].map(({ i: I, t }) => (
                    <li key={t} className="flex items-center gap-3 text-white/95">
                      <span className="h-9 w-9 rounded-lg bg-white/10 grid place-items-center">
                        <I className="h-4.5 w-4.5 text-[#F26A21]" />
                      </span>
                      <span className="text-sm font-medium">{t}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="block mt-9">
                  <Button data-testid="subsidy-claim-btn" className="w-full rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white py-6 font-semibold text-base shadow-xl">
                    Claim My ₹85,800 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Subsidy & Finance</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Switch to solar. <br /><span className="text-[#2BA84A]">The Government pays.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Under PM Surya Ghar: Muft Bijli Yojana, eligible Indian households receive direct bank-transferred subsidies for rooftop solar — covering up to a 3 kW system. Saura Energy is an empanelled vendor, so you skip the paperwork hassle.
            </p>

            {/* Subsidy slab table */}
            <div className="mt-8 rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-sm" data-testid="subsidy-slab-table">
                <thead className="bg-slate-50">
                  <tr className="text-left font-bold text-slate-700">
                    <th className="px-5 py-3.5">System Size</th>
                    <th className="px-5 py-3.5">Subsidy</th>
                    <th className="px-5 py-3.5">Avg Bill Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["Up to 1 kW", "₹30,000", "0–150 units/month"],
                    ["Up to 2 kW", "₹60,000", "150–300 units/month"],
                    ["Up to 3 kW", "₹78,000", "300+ units/month"],
                    ["3 kW and above", "₹85,800 (capped)", "Heavy households"],
                  ].map((r, i) => (
                    <tr key={i} className={i === 3 ? "bg-orange-50/60 font-semibold" : ""}>
                      <td className="px-5 py-3.5 text-slate-700">{r[0]}</td>
                      <td className="px-5 py-3.5 text-[#F26A21] font-bold">{r[1]}</td>
                      <td className="px-5 py-3.5 text-slate-500 text-xs">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Loan Partners:</span>
              {BANKS.map((b) => (
                <span key={b} className="text-sm font-bold text-slate-400 hover:text-[#1B3A8C] transition">{b}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
