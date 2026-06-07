import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, Calendar } from "lucide-react";
import { IMG, BRAND } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { slideInRightVariant, VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" data-testid="big-cta-section">
      <div className="absolute inset-0">
        <img src={IMG.rooftopDrone} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/95 via-[#0A1128]/85 to-[#0A1128]/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          variants={slideInRightVariant}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-4">Switch Today</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02]">
            Switch to solar.<br />
            <span className="gradient-text">Save for the next 25 years.</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
            Free site survey. Honest quote. Subsidy filed for you. Zero EMI till commissioning. Join 980+ happy households who already switched.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/contact">
              <Button data-testid="big-cta-survey" className="rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white px-7 py-6 text-base font-semibold shadow-xl hover:-translate-y-0.5 transition-all">
                <Calendar className="mr-2 h-5 w-5" /> Book Free Survey
              </Button>
            </Link>
            <Link to="/calculator">
              <Button variant="outline" data-testid="big-cta-quote" className="rounded-full border-white/30 bg-white/10 hover:bg-white/20 text-white px-7 py-6 text-base font-semibold backdrop-blur">
                Get Instant Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={`tel:${BRAND.phone}`}>
              <Button variant="outline" data-testid="big-cta-call" className="rounded-full border-white/30 bg-transparent hover:bg-white/10 text-white px-7 py-6 text-base font-semibold">
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
