import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowRight, Sun } from "lucide-react";
import { BRAND, SERVICES } from "@/lib/data";
import { sendNewsletterViaWhatsApp } from "@/lib/whatsappUtils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [email, setEmail] = useState("");

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      sendNewsletterViaWhatsApp(BRAND.whatsapp, email);
      toast.success("Opening WhatsApp to subscribe!");
      setEmail("");
    } catch (err) {
      toast.error("Could not open WhatsApp. Try again.");
    }
  };

  return (
    <footer className="relative bg-[#0A1128] text-white overflow-hidden" data-testid="site-footer">
      {/* Decorative glow */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#F26A21]/15 blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#1B3A8C]/30 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* CTA strip */}
        <div className="rounded-3xl glass-dark p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16 border border-white/10" data-testid="footer-cta">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#F26A21] font-bold mb-2">Ready to switch?</p>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">Power 25 years of savings. <span className="text-[#F26A21]">Start today.</span></h3>
          </div>
          <Link to="/contact">
            <Button data-testid="footer-cta-btn" className="rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white px-7 py-6 text-base font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
              Book Free Survey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src={BRAND.logo} alt="Saura Energy" className="h-12 w-12 bg-white rounded-lg p-1" />
              <div>
                <div className="font-display font-extrabold text-2xl">
                  <span>SAURA</span>
                  <span className="text-[#F26A21]"> ener</span>
                  <span className="text-[#2BA84A]">gy</span>
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/60">25 Years of Trust</div>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              India's trusted partner for premium solar installations. We engineer, install and service rooftop solar systems across the North-East — backed by the PM Surya Ghar scheme.
            </p>
            <div className="flex gap-3 mt-6">
              <a href={`https://instagram.com/${BRAND.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram" data-testid="footer-instagram" className="h-10 w-10 rounded-full grid place-items-center bg-white/8 hover:bg-[#F26A21] transition border border-white/10">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" data-testid="footer-facebook" className="h-10 w-10 rounded-full grid place-items-center bg-white/8 hover:bg-[#1B3A8C] transition border border-white/10">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" data-testid="footer-whatsapp" className="h-10 w-10 rounded-full grid place-items-center bg-white/8 hover:bg-[#2BA84A] transition border border-white/10">
                <Sun className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-white/60 mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-white/80 hover:text-[#F26A21] transition">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-white/60 mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-white/80 hover:text-[#F26A21] transition">About</Link></li>
              <li><Link to="/projects" className="text-white/80 hover:text-[#F26A21] transition">Projects</Link></li>
              <li><Link to="/blog" className="text-white/80 hover:text-[#F26A21] transition">Insights</Link></li>
              <li><Link to="/calculator" className="text-white/80 hover:text-[#F26A21] transition">Savings Calculator</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-[#F26A21] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-white/60 mb-5">Get in touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><Phone className="h-4 w-4 text-[#F26A21] mt-0.5" /><a href={`tel:${BRAND.phone}`} className="text-white/80 hover:text-white">{BRAND.phoneDisplay}</a></li>
              <li className="flex gap-3"><Phone className="h-4 w-4 text-[#F26A21] mt-0.5" /><a href={`tel:${BRAND.landline}`} className="text-white/80 hover:text-white">{BRAND.landline}</a></li>
              <li className="flex gap-3"><Mail className="h-4 w-4 text-[#F26A21] mt-0.5" /><a href={`mailto:${BRAND.email}`} className="text-white/80 hover:text-white break-all">{BRAND.email}</a></li>
              <li className="flex gap-3"><MapPin className="h-4 w-4 text-[#F26A21] mt-0.5 flex-shrink-0" /><span className="text-white/80">{BRAND.address}</span></li>
            </ul>

            <form onSubmit={onSubscribe} className="mt-6" data-testid="footer-newsletter-form">
              <label className="text-xs uppercase tracking-widest text-white/60 font-bold mb-2 block">Newsletter</label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-white/8 border-white/15 text-white placeholder:text-white/40 focus:ring-[#F26A21] rounded-full"
                  data-testid="footer-newsletter-input"
                />
                <Button type="submit" data-testid="footer-newsletter-submit" className="rounded-full bg-[#F26A21] hover:bg-[#D95B1A]">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Saura Energy Solars. All rights reserved. Empanelled by Ministry of New & Renewable Energy.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Subsidy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
