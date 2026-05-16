import { motion } from "framer-motion";
import { Calendar, ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { BLOG_POSTS, IMG, FAQS } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CATEGORIES = ["All", "Subsidy", "Education", "Trends", "Case Study"];

export default function BlogPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = BLOG_POSTS.filter((p) =>
    (cat === "All" || p.category === cat) &&
    (q === "" || (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <section className="relative pt-44 pb-16 bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#F26A21]/20 blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-4">Insights & Resources</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            Solar, <span className="gradient-text">demystified.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
            Subsidy guides, technology deep-dives, real ROI case studies — written by India's most-honest solar engineers.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  data-testid={`blog-filter-${c.toLowerCase().replace(/ /g, "-")}`}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    cat === c ? "bg-[#1B3A8C] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search insights..."
                className="pl-10 rounded-full border-slate-200"
                data-testid="blog-search"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="group rounded-2xl bg-white overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                data-testid={`blog-page-card-${p.id}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={IMG[p.image]} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-[#1B3A8C]">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <Calendar className="h-3.5 w-3.5" /> {p.date}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-slate-900 leading-snug group-hover:text-[#F26A21] transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#F26A21]">
                    Read more <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center text-slate-500 py-16">No insights match your search.</div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Frequently Asked</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Common solar questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3" data-testid="blog-faqs">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl bg-white border border-slate-100 px-5">
                <AccordionTrigger className="font-display font-bold text-left text-slate-900 hover:no-underline py-5">{f.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
