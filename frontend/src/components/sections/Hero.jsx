import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sun, Zap, Leaf, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { IMG, STATS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden" data-testid="hero-section">
      {/* Background image with Ken Burns */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "linear" }}
        className="absolute inset-0"
      >
        <img src={IMG.rooftopDrone} alt="Aerial drone view of solar rooftop installation" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 hero-overlay" />

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 7.3 + 4) % 100}%`,
            top: `${(i * 13 + 20) % 90}%`,
            width: `${4 + (i % 4) * 3}px`,
            height: `${4 + (i % 4) * 3}px`,
            background: i % 3 === 0 ? "#F26A21" : i % 3 === 1 ? "#FFD27A" : "#2BA84A",
            animationDelay: `${i * 0.7}s`,
            opacity: 0.55,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-28 min-h-[100svh] flex flex-col justify-center">
        <motion.div initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-7">
            <Sun className="h-3.5 w-3.5 text-[#F26A21]" />
            PM Surya Ghar · ₹85,800 Subsidy
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="font-display text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight">
            Power your future <br />
            with <span className="gradient-text">smart solar</span> energy.
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="mt-7 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
            Premium residential, commercial and industrial solar — engineered by MNRE-certified experts.
            Cut electricity bills by up to <span className="text-[#F26A21] font-semibold">90%</span> and lock in 25 years of savings, today.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/contact">
              <Button data-testid="hero-cta-consultation" className="group rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white px-7 py-6 text-base font-semibold shadow-xl shadow-orange-900/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
            <Link to="/calculator">
              <Button variant="outline" data-testid="hero-cta-calculator" className="rounded-full border-white/30 bg-white/10 hover:bg-white/20 text-white px-7 py-6 text-base font-semibold backdrop-blur-md">
                <PlayCircle className="mr-2 h-5 w-5" /> Calculate Savings
              </Button>
            </Link>
          </motion.div>

          {/* Trust pills */}
          <motion.div variants={fadeUp} custom={4} className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: ShieldCheck, label: "25-Year Warranty" },
              { icon: Zap, label: "7-Day Installation" },
              { icon: Leaf, label: "Carbon-Negative" },
            ].map(({ icon: I, label }) => (
              <span key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white text-sm font-medium border border-white/15">
                <I className="h-4 w-4 text-[#F26A21]" /> {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats bar at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 bottom-8"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl glass-dark border border-white/15 overflow-hidden">
            {STATS.map((s) => (
              <div key={s.label} className="p-5 md:p-7 bg-white/[0.02]" data-testid={`hero-stat-${s.label.toLowerCase().replace(/[^a-z]/g, "")}`}>
                <div className="font-display text-3xl md:text-4xl font-extrabold text-white">
                  <AnimatedCounter to={s.value} decimals={s.decimals || 0} suffix={s.suffix || ""} />
                </div>
                <div className="mt-1 text-[11px] tracking-[0.18em] uppercase text-white/60 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden md:block absolute bottom-44 right-8 lg:right-14 text-white/60 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-right"
      >
        Scroll to explore →
      </motion.div>
    </section>
  );
}
