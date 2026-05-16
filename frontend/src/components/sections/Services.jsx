import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Factory, Wrench, Gauge, Landmark, HardHat, BatteryCharging, PlugZap, Check } from "lucide-react";
import { SERVICES, IMG } from "@/lib/data";

const ICONS = { Home, Building2, Factory, Wrench, Gauge, Landmark, HardHat, BatteryCharging, PlugZap };

const ACCENTS = {
  orange: { bg: "bg-[#F26A21]/10", text: "text-[#F26A21]", glow: "from-[#F26A21]/20" },
  blue: { bg: "bg-[#1B3A8C]/10", text: "text-[#1B3A8C]", glow: "from-[#1B3A8C]/20" },
  green: { bg: "bg-[#2BA84A]/10", text: "text-[#2BA84A]", glow: "from-[#2BA84A]/20" },
};

export default function Services({ withHeader = true }) {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50/70 bg-grid" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {withHeader && (
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Solar Services</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              End-to-end solar, <span className="text-[#1B3A8C]">tailored to every roof.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              From a single home panel to MW-scale industrial plants — one trusted partner for design, install, financing and lifelong service.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Home;
            const a = ACCENTS[s.accent];
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.55 }}
                data-testid={`service-card-${s.slug}`}
              >
                <Link to={`/services/${s.slug}`} className="block h-full group">
                  <div className="relative h-full rounded-3xl overflow-hidden bg-white border border-slate-100 hover:border-transparent transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.18)]">
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img src={IMG[s.image]} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${a.glow} to-transparent opacity-70`} />
                      <div className={`absolute top-4 left-4 h-11 w-11 rounded-xl ${a.bg} backdrop-blur grid place-items-center border border-white/30`}>
                        <Icon className={`h-5 w-5 ${a.text}`} />
                      </div>
                    </div>
                    {/* Body */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#1B3A8C] transition-colors">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">{s.short}</p>

                      <ul className="mt-4 space-y-2">
                        {s.benefits.slice(0, 3).map((b) => (
                          <li key={b} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className={`h-3.5 w-3.5 mt-0.5 ${a.text} flex-shrink-0`} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${a.text} group-hover:gap-2.5 transition-all`}>
                        Explore <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
