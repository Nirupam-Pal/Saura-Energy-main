import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { SMOOTH_EASING } from "@/lib/animations";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const len = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % len), 6000);
    return () => clearInterval(t);
  }, [len]);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden" data-testid="testimonials-section">
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#F26A21]/8 blur-[100px]" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#1B3A8C]/8 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Customer Stories</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
            980+ happy customers. <span className="text-[#2BA84A]">Hear them out.</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-white to-orange-50/30 border border-slate-100 p-8 md:p-14 shadow-xl shadow-blue-900/5">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-[#F26A21]/15" />
            <Quote className="absolute bottom-6 right-6 h-12 w-12 text-[#1B3A8C]/15 rotate-180" />

            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: SMOOTH_EASING }}
                className="relative text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-5 w-5 fill-[#F26A21] text-[#F26A21]" />
                  ))}
                </div>
                <p className="font-display text-2xl md:text-3xl text-slate-800 leading-snug tracking-tight font-bold italic">
                  "{t.quote}"
                </p>
                <div className="mt-8">
                  <div className="font-display font-bold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{t.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setI((p) => (p - 1 + len) % len)}
              aria-label="Previous"
              data-testid="testimonial-prev"
              className="h-11 w-11 rounded-full grid place-items-center border-2 border-slate-200 text-slate-500 hover:border-[#1B3A8C] hover:text-[#1B3A8C] transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Go to testimonial ${k + 1}`}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-[#F26A21]" : "w-2 bg-slate-300"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((p) => (p + 1) % len)}
              aria-label="Next"
              data-testid="testimonial-next"
              className="h-11 w-11 rounded-full grid place-items-center border-2 border-slate-200 text-slate-500 hover:border-[#1B3A8C] hover:text-[#1B3A8C] transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
