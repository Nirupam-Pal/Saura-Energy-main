import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar } from "lucide-react";
import { BLOG_POSTS, IMG } from "@/lib/data";
import { fadeUpVariant, VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

export default function BlogTeaser() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50/70" data-testid="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Insights & Resources</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Solar knowledge, <span className="text-[#1B3A8C]">demystified.</span>
            </h2>
          </div>
          <Link to="/blog" className="text-[#F26A21] font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" data-testid="blog-view-all">
            View all insights <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              custom={i}
              variants={fadeUpVariant}
              data-testid={`blog-card-${p.id}`}
              className="group rounded-2xl bg-white overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={IMG[p.image]} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-[#1B3A8C]">
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                  <Calendar className="h-3.5 w-3.5" /> {p.date}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-slate-900 leading-snug group-hover:text-[#F26A21] transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">{p.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
