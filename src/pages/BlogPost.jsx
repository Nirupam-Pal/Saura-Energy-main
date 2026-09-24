import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Info, MessageCircle, Phone } from "lucide-react";
import { BLOG_POSTS, BRAND, IMG } from "@/lib/data";
import { BLOG_ARTICLES } from "@/lib/blogArticles";
import ProgressiveImage from "@/components/ProgressiveImage";
import CTASection from "@/components/sections/CTASection";
import { VIEWPORT_ONCE, fadeUpVariant, gridReveal } from "@/lib/animations";

function Block({ block }) {
  if (block.h) {
    return <h2 className="mt-12 mb-4 font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{block.h}</h2>;
  }
  if (block.p) {
    return <p className="mt-4 text-lg leading-relaxed text-slate-700">{block.p}</p>;
  }
  if (block.list) {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.list.map((item) => (
          <li key={item} className="flex gap-3 text-lg leading-relaxed text-slate-700">
            <span className="mt-[0.7em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F26A21]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.steps) {
    return (
      <ol className="mt-6 space-y-4">
        {block.steps.map((s, i) => (
          <li key={s.t} className="flex gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <span className="h-9 w-9 flex-shrink-0 grid place-items-center rounded-full bg-[#1B3A8C] text-white font-display font-extrabold">{i + 1}</span>
            <div>
              <div className="font-display text-lg font-bold text-slate-900">{s.t}</div>
              <p className="mt-1 text-slate-600 leading-relaxed">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
  if (block.table) {
    return (
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[480px] text-left text-sm md:text-base">
          <thead className="bg-[#0A1128] text-white">
            <tr>
              {block.table.head.map((h, i) => (
                <th key={i} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, r) => (
              <tr key={r} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/70">
                {row.map((cell, c) => (
                  <td key={c} className={`px-4 py-3 text-slate-700 ${c === 0 ? "font-semibold text-slate-900" : ""}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (block.note) {
    return (
      <div className="mt-6 flex gap-3 p-5 rounded-2xl bg-orange-50 border border-orange-100 text-slate-700 leading-relaxed">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#F26A21]" />
        <p>{block.note}</p>
      </div>
    );
  }
  if (block.cta) {
    return (
      <Link
        to={block.cta.to}
        className="group mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white font-semibold shadow-lg shadow-orange-900/20 hover:-translate-y-0.5 transition-lift"
      >
        {block.cta.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    );
  }
  return null;
}

function ComingSoon({ post }) {
  return (
    <>
      <p className="text-lg leading-relaxed text-slate-700">{post.excerpt}</p>
      <div className="mt-8 p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-100">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21]">Full case study coming soon</p>
        <p className="mt-3 text-slate-700 leading-relaxed">
          We're preparing the detailed numbers for this article. Want payback and savings figures for a business like yours right now? Our engineers will share them for free.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi Saura Energy, I read "${post.title}" and would like commercial solar ROI numbers for my business.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2BA84A] hover:bg-[#23903F] text-white font-semibold hover:-translate-y-0.5 transition-lift"
          >
            <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
          </a>
          <a
            href={`tel:${BRAND.phone}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold hover:border-[#1B3A8C] hover:text-[#1B3A8C] transition-lift"
          >
            <Phone className="h-4 w-4" /> {BRAND.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const article = BLOG_ARTICLES[slug] || { comingSoon: true };
  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-40 pb-16 md:pb-20 bg-[#0A1128] text-white overflow-hidden">
        <ProgressiveImage src={IMG[post.image]} priority sizes="(min-width: 1024px) 1200px, 100vw" className="absolute inset-0 opacity-30 !bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/90 to-[#0A1128]/40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-[#F26A21] text-sm font-semibold transition-colors"
            data-testid="blog-back-link"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All Insights
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21]">{post.category}</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-extrabold leading-[1.02] tracking-tight">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 font-semibold">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
            {article.readTime && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readTime}</span>}
          </div>
        </div>
      </section>

      <motion.article
        className="py-14 md:py-20 bg-white"
        variants={fadeUpVariant}
        initial="hidden"
        animate="show"
        data-testid="blog-article"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {article.comingSoon ? <ComingSoon post={post} /> : article.blocks.map((b, i) => <Block key={i} block={b} />)}
        </div>
      </motion.article>

      <section className="py-16 md:py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Keep reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <motion.div key={p.id} variants={gridReveal} initial="hidden" whileInView="show" viewport={VIEWPORT_ONCE} custom={i}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="group block h-full rounded-2xl bg-white overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-lift duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ProgressiveImage src={IMG[p.image]} alt={p.title} sizes="(min-width: 768px) 400px, 100vw" className="absolute inset-0" imgClassName="duration-1000 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8C]">{p.category}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-slate-900 leading-snug group-hover:text-[#F26A21] transition-colors">{p.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#F26A21]">
                      Read <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
