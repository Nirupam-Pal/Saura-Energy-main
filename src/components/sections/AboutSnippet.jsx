import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Sparkles, MapPin, Zap, BadgeCheck } from "lucide-react";
import { IMG } from "@/lib/data";
import { PROJECT_GALLERY } from "@/lib/projectGallery";
import { Button } from "@/components/ui/button";
import { slideInRightVariant, fadeUpVariant, VIEWPORT_ONCE, EASE_OUT_EXPO, gridReveal } from "@/lib/animations";
import ProgressiveImage from "@/components/ProgressiveImage";
import AnimatedCounter from "@/components/AnimatedCounter";

// Real Saura installation photos (fall back to stock if a folder is renamed).
const projectPhoto = (title, fallback) => PROJECT_GALLERY.find((p) => p.title === title)?.images[0] || fallback;
const MAIN_PHOTO = projectPhoto("Holycross College", IMG.heroDrone);
const INSET_PHOTO = projectPhoto("Chittaranjan", IMG.engineers2);

/**
 * Photo collage for the About block: a drone shot of a live rooftop plant
 * revealed by a lifting orange curtain, an on-site engineer photo layered
 * over its corner, and floating proof points. The two photos drift at
 * different speeds on scroll for depth. Transform/opacity only.
 */
function AboutVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const insetY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} className="relative pb-14 lg:pb-0 lg:pr-6">
      {/* Decorative: dot grid + slowly turning dashed "sun ring" */}
      <div
        aria-hidden="true"
        className="absolute -top-6 -left-4 sm:-left-8 w-40 h-40 opacity-60"
        style={{ backgroundImage: "radial-gradient(rgba(242,106,33,0.45) 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }}
      />
      <div aria-hidden="true" className="absolute -top-10 right-0 lg:-right-2 w-36 h-36 rounded-full border-2 border-dashed border-[#1B3A8C]/25 spin-slow" />

      {/* Main photo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20"
      >
        <motion.div style={{ y: mainY }} className="absolute inset-x-0 -inset-y-[6%]">
          <motion.div
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.8, ease: EASE_OUT_EXPO }}
            className="absolute inset-0"
          >
            <ProgressiveImage
              src={MAIN_PHOTO}
              alt="Saura Energy rooftop solar plant at Holycross College, Agartala"
              sizes="(min-width: 1024px) 600px, 100vw"
              className="absolute inset-0"
              imgClassName="object-[62%_45%] duration-1000 group-hover:scale-105"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

        {/* Location caption */}
        <div className="absolute right-5 bottom-5 sm:right-6 sm:bottom-6 left-[40%] text-right text-white">
          <span className="inline-flex items-center justify-end gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFAA5C]">
            <MapPin className="h-3.5 w-3.5" /> Agartala, Tripura
          </span>
          <div className="mt-1 font-display text-lg sm:text-xl font-bold">Holycross College rooftop plant</div>
        </div>

        {/* Orange curtain lifts away to reveal the photo */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-[#F26A21] to-[#D95B1A]"
        />
      </motion.div>

      {/* On-site engineer photo layered over the corner */}
      <motion.div style={{ y: insetY }} className="absolute -bottom-2 lg:-bottom-10 -left-2 sm:-left-8 w-32 sm:w-44 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -10 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.55 }}
          className="aspect-[3/4] rounded-2xl overflow-hidden border-[5px] border-white shadow-2xl shadow-slate-900/25 hover:rotate-0 hover:scale-105 transition-transform duration-500 ease-out-expo"
        >
          <ProgressiveImage src={INSET_PHOTO} alt="Saura Energy engineer installing a solar inverter" sizes="176px" className="h-full" imgClassName="object-[50%_30%]" />
        </motion.div>
      </motion.div>

      {/* Floating proof points */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.8 }}
        className="absolute top-8 right-0 lg:-right-2 z-10"
      >
        <div className="hero-float flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-xl shadow-blue-900/15 border border-slate-100">
          <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#F26A21] to-[#FFAA5C] grid place-items-center">
            <Zap className="h-5 w-5 text-white" />
          </span>
          <div>
            <div className="font-display text-xl font-extrabold text-slate-900 leading-none">
              <AnimatedCounter to={18.6} decimals={1} duration={2} /> MW
            </div>
            <div className="mt-1 text-[11px] text-slate-500">installed across NE India</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1 }}
        className="absolute bottom-[34%] right-0 lg:-right-2 z-10"
      >
        <div className="hero-float inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur pl-2 pr-4 py-2 shadow-xl shadow-blue-900/15 border border-slate-100" style={{ animationDelay: "-3s" }}>
          <span className="h-7 w-7 rounded-full bg-[#2BA84A]/15 grid place-items-center">
            <BadgeCheck className="h-4 w-4 text-[#2BA84A]" />
          </span>
          <span className="text-sm font-bold text-slate-800">MNRE Empanelled</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutSnippet() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden" data-testid="about-section">
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-[#F26A21]/8 blur-[100px]" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-[#1B3A8C]/8 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <AboutVisual />

        <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT_ONCE} variants={slideInRightVariant}>
          <div className="relative mb-16 max-w-xl">
            <div className="rounded-[34px] border border-[#F26A21]/15 bg-white p-6 shadow-[0_30px_70px_-50px_rgba(242,106,33,0.35)] relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F26A21]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F26A21]">
                <Sparkles className="h-4 w-4" />
                Expertise
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Vast experience in solar projects along with transmission and distribution projects.
              </p>
            </div>
            <div className="relative mt-[-0.25rem] ml-8 rounded-[34px] border border-[#1B3A8C]/15 bg-white p-6 shadow-[0_30px_70px_-50px_rgba(27,58,140,0.25)] z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1B3A8C]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1B3A8C]">
                <Sparkles className="h-4 w-4 text-[#1B3A8C]" />
                Project Capabilities
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Expertise in solar land aquisition and transmission ROW and statutory and regulation works.
              </p>
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-4">About Saura Energy</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
            Engineering the sun for <span className="text-[#1B3A8C]">India's clean future.</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Saura Energy is a North-East India headquartered clean-energy company delivering grid-tied, hybrid and off-grid solar systems with the rigor of a Fortune-500 EPC. From PM Surya Ghar residential subsidies to MW-scale industrial plants, every install is built to last 25+ years.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Target, title: "Mission", desc: "Make solar simple, affordable & trustworthy for every Indian home and business." },
              { icon: Eye, title: "Vision", desc: "Be the most loved clean-energy brand of Eastern India by 2030." },
              { icon: Heart, title: "Values", desc: "Engineering rigor, transparent pricing, and lifelong customer trust." },
            ].map(({ icon: I, title, desc }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                custom={i}
                variants={fadeUpVariant}
                className="hover-lift p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-lift duration-500"
              >
                <I className="h-6 w-6 text-[#F26A21]" />
                <div className="mt-3 font-display font-bold text-slate-900">{title}</div>
                <div className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</div>
              </motion.div>
            ))}
          </div>

          <Link to="/about" className="inline-block mt-9">
            <Button variant="outline" className="group hover:-translate-y-0.5 hover:shadow-xl rounded-full border-2 border-[#1B3A8C] text-[#1B3A8C] hover:bg-[#1B3A8C] hover:text-white px-6 py-5" data-testid="about-readmore">
              Read our full story <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Solar Systems Comparison Section */}
      <div className="relative mt-24 md:mt-32 py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-orange-50/50 to-white rounded-4xl lg:mx-0 mx-4">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#F26A21]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/10 rounded-full blur-3xl -z-10" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-orange-100 border border-orange-300">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21]">Solar System Types</p>
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Choose Your Perfect <span className="text-[#F26A21]">Solar Solution</span>
            </h3>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Explore three powerful solar system options tailored to your energy needs and lifestyle</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* On-Grid */}
            <motion.div variants={gridReveal} initial="hidden" whileInView="show" viewport={VIEWPORT_ONCE} custom={0} className="hover-lift-lg group relative flex flex-col rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-lift duration-500">
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
              
              <ProgressiveImage src={IMG.rooftopDrone} alt="On-Grid Solar System" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="h-72" imgClassName="duration-1000 group-hover:scale-110" />
              <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="relative flex-1 flex flex-col p-8 bg-white border-t-4 border-orange-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl">☀️</span>
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-900">On-Grid Solar</div>
                </div>
                <div className="flex-1 space-y-3 text-slate-600 text-sm leading-relaxed">
                  <p><span className="font-semibold text-slate-900">✓ Connected to Grid:</span> Feeds excess power to the grid</p>
                  <p><span className="font-semibold text-slate-900">✓ Net Metering:</span> Get credits for power you generate</p>
                  <p><span className="font-semibold text-slate-900">✓ Cost:</span> Most affordable option</p>
                  <p><span className="font-semibold text-slate-900">✗ Backup:</span> No power during grid outage</p>
                  <p><span className="font-semibold text-slate-900">✓ Best For:</span> Homes with stable grid supply</p>
                </div>
                <div className="mt-6 pt-6 border-t-2 border-orange-100">
                  <div className="text-sm font-bold uppercase text-[#F26A21] tracking-wider">From ₹2,00,000</div>
                  <div className="text-xs text-slate-500 mt-1">~4-5 year payback</div>
                </div>
              </div>
            </motion.div>

            {/* Off-Grid */}
            <motion.div variants={gridReveal} initial="hidden" whileInView="show" viewport={VIEWPORT_ONCE} custom={1} className="hover-lift-lg group relative flex flex-col rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-lift duration-500">
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Maximum Backup</div>
              
              <ProgressiveImage src={IMG.residential} alt="Off-Grid Solar System" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="h-72" imgClassName="duration-1000 group-hover:scale-110" />
              <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="relative flex-1 flex flex-col p-8 bg-white border-t-4 border-orange-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl">🔋</span>
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-900">Off-Grid Solar</div>
                </div>
                <div className="flex-1 space-y-3 text-slate-600 text-sm leading-relaxed">
                  <p><span className="font-semibold text-slate-900">✓ Independent System:</span> Not connected to grid</p>
                  <p><span className="font-semibold text-slate-900">✓ Battery Storage:</span> Full battery backup required</p>
                  <p><span className="font-semibold text-slate-900">⚠️ Cost:</span> Higher due to battery investment</p>
                  <p><span className="font-semibold text-slate-900">✓ Backup:</span> 24/7 power supply</p>
                  <p><span className="font-semibold text-slate-900">✓ Best For:</span> Remote areas with no grid</p>
                </div>
                <div className="mt-6 pt-6 border-t-2 border-orange-100">
                  <div className="text-sm font-bold uppercase text-[#F26A21] tracking-wider">From ₹4,00,000</div>
                  <div className="text-xs text-slate-500 mt-1">Premium investment</div>
                </div>
              </div>
            </motion.div>

            {/* Hybrid */}
            <motion.div variants={gridReveal} initial="hidden" whileInView="show" viewport={VIEWPORT_ONCE} custom={2} className="hover-lift-lg group relative flex flex-col rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-lift duration-500 md:col-span-1">
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Best Value</div>
              
              <ProgressiveImage src={IMG.residential2} alt="Hybrid Solar System" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="h-72" imgClassName="duration-1000 group-hover:scale-110" />
              <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="relative flex-1 flex flex-col p-8 bg-white border-t-4 border-orange-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-900">Hybrid Solar</div>
                </div>
                <div className="flex-1 space-y-3 text-slate-600 text-sm leading-relaxed">
                  <p><span className="font-semibold text-slate-900">✓ Best of Both:</span> Grid-connected with battery backup</p>
                  <p><span className="font-semibold text-slate-900">✓ Smart Power:</span> Automatic grid/battery switching</p>
                  <p><span className="font-semibold text-slate-900">✓ Cost:</span> Moderate investment</p>
                  <p><span className="font-semibold text-slate-900">✓ Backup:</span> Uninterrupted power supply</p>
                  <p><span className="font-semibold text-slate-900">✓ Best For:</span> Maximum savings + backup security</p>
                </div>
                <div className="mt-6 pt-6 border-t-2 border-orange-100">
                  <div className="text-sm font-bold uppercase text-[#F26A21] tracking-wider">From ₹3,00,000</div>
                  <div className="text-xs text-slate-500 mt-1">~5-7 year payback</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
