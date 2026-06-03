import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sun } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/calculator", label: "Calculator" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/85 border-b border-slate-200/70 shadow-[0_4px_24px_-12px_rgba(15,23,42,0.12)]"
          : "bg-transparent"
      }`}
    >
      {/* Top utility strip */}
      <div className={`hidden md:flex items-center justify-between px-8 py-2 text-xs font-medium border-b transition-colors ${scrolled ? "border-slate-100 text-slate-600" : "border-white/10 text-white/90"}`}>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Sun className="h-3.5 w-3.5" /> Powering NE India since 2015</span>
          <span className="opacity-70">•</span>
          <span>PM Surya Ghar Empanelled</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={`tel:${BRAND.phone}`} className="flex items-center gap-1.5 hover:text-[#F26A21] transition" data-testid="topbar-phone">
            <Phone className="h-3.5 w-3.5" /> {BRAND.phoneDisplay}
          </a>
          <span className="opacity-70">•</span>
          <a href={`tel:${BRAND.landline}`} className="hover:text-[#F26A21] transition">{BRAND.landline}</a>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" className="flex items-center gap-3" data-testid="nav-logo">
          <img src={BRAND.logo} alt="Saura Energy" className="h-11 w-11 rounded-lg object-contain bg-white p-0.5 shadow-sm" />
          <div className="leading-tight">
            <div className="font-display font-extrabold text-xl">
              <span className={scrolled ? "text-[#1B3A8C]" : "text-white"}>SAURA</span>
              <span className="text-[#F26A21]"> ener</span>
              <span className="text-[#2BA84A]">gy</span>
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-semibold rounded-full transition ${
                  isActive
                    ? scrolled
                      ? "text-[#F26A21] bg-orange-50"
                      : "text-white bg-white/15"
                    : scrolled
                      ? "text-slate-700 hover:text-[#1B3A8C] hover:bg-slate-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden md:block">
            <Button data-testid="nav-cta-quote" className="rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all px-5">
              Get Free Quote
            </Button>
          </Link>
          <button
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-[#1B3A8C]" : "text-white"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden glass border-t border-slate-200/60 px-6 py-4 space-y-1"
            data-testid="nav-mobile-menu"
          >
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-lg font-semibold ${isActive ? "bg-orange-50 text-[#F26A21]" : "text-slate-700 hover:bg-slate-50"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="block pt-2">
              <Button className="w-full rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white">Get Free Quote</Button>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
