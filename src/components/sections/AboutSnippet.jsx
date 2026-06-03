import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Sparkles } from "lucide-react";
import { IMG } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function AboutSnippet() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden" data-testid="about-section">
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-[#F26A21]/8 blur-[100px]" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-[#1B3A8C]/8 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="relative">
            <img src={IMG.engineers2} alt="Saura Energy engineers at work" className="rounded-3xl shadow-2xl shadow-blue-900/15 w-full aspect-[4/5] object-cover" />
            {/* Floating stat card */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 glass premium-border rounded-2xl p-5 max-w-[220px] shadow-xl">
              <div className="text-xs uppercase tracking-[0.2em] text-[#F26A21] font-bold">Since 2015</div>
              <div className="font-display text-3xl font-extrabold text-slate-900 mt-1">500+ Projects</div>
              <div className="text-xs text-slate-500 mt-1">across 7 NE states</div>
            </div>
            {/* Floating top card */}
            <div className="absolute top-4 w-[350px] -left-4 md:-left-8 glass premium-border rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#2BA84A]/15 grid place-items-center">
                <Sparkles className="h-5 w-5 text-[#2BA84A]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Carbon Saved</div>
                <div className="font-display font-extrabold text-slate-900">22,480 T</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all hover:-translate-y-1"
              >
                <I className="h-6 w-6 text-[#F26A21]" />
                <div className="mt-3 font-display font-bold text-slate-900">{title}</div>
                <div className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</div>
              </motion.div>
            ))}
          </div>

          <Link to="/about" className="inline-block mt-9">
            <Button variant="outline" className="rounded-full border-2 border-[#1B3A8C] text-[#1B3A8C] hover:bg-[#1B3A8C] hover:text-white transition-all px-6 py-5" data-testid="about-readmore">
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
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }} className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
              
              <img src={IMG.rooftopDrone} alt="On-Grid Solar System" className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="relative p-8 bg-white border-t-4 border-orange-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl">☀️</span>
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-900">On-Grid Solar</div>
                </div>
                <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
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
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Maximum Backup</div>
              
              <img src={IMG.residential} alt="Off-Grid Solar System" className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="relative p-8 bg-white border-t-4 border-orange-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl">🔋</span>
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-900">Off-Grid Solar</div>
                </div>
                <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
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
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 md:col-span-1">
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Best Value</div>
              
              <img src={IMG.residential2} alt="Hybrid Solar System" className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="relative p-8 bg-white border-t-4 border-orange-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-900">Hybrid Solar</div>
                </div>
                <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
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
