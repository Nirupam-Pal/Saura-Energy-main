import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sun } from "lucide-react";
import { SERVICES, IMG, FAQS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Contact from "@/components/sections/Contact";

export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return <Navigate to="/services" replace />;

  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-40 pb-16 bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={IMG[svc.image]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/85 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-[#F26A21] text-sm font-semibold transition" data-testid="service-back-link">
            <ArrowLeft className="h-4 w-4" /> All Services
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21]">Solar Service</p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            {svc.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">{svc.short}</p>
        </div>
      </section>

      {/* Benefits + Process snapshot */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Benefits</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why customers choose Saura for <span className="text-[#1B3A8C]">{svc.title}</span>
            </h2>
            <ul className="mt-7 space-y-4">
              {svc.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <span className="h-8 w-8 rounded-lg bg-[#2BA84A]/15 grid place-items-center flex-shrink-0">
                    <Check className="h-4 w-4 text-[#2BA84A]" />
                  </span>
                  <span className="text-slate-800 font-semibold">{b}</span>
                </li>
              ))}
            </ul>

            <Link to="/contact" className="inline-block mt-8">
              <Button className="rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white px-7 py-6 font-semibold" data-testid="service-detail-cta">
                Get a quote for {svc.title} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <img src={IMG[svc.image]} alt={svc.title} className="rounded-3xl shadow-2xl shadow-blue-900/15 w-full aspect-[4/5] object-cover" />
            <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-white border border-slate-100 shadow-xl max-w-xs">
              <Sun className="h-6 w-6 text-[#F26A21]" />
              <div className="font-display text-xl font-bold mt-2 text-slate-900">25-Year Warranty</div>
              <div className="text-xs text-slate-500 mt-0.5">Manufacturer-backed peace of mind</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Frequently Asked</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Got questions? We've got answers.</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3" data-testid="service-faqs">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl bg-white border border-slate-100 px-5">
                <AccordionTrigger className="font-display font-bold text-left text-slate-900 hover:no-underline py-5">{f.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">Explore other services</h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} to={`/services/${r.slug}`} className="group rounded-2xl overflow-hidden bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all" data-testid={`related-service-${r.slug}`}>
                <div className="h-44 overflow-hidden">
                  <img src={IMG[r.image]} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <h4 className="font-display font-bold text-slate-900 group-hover:text-[#F26A21] transition">{r.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{r.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
