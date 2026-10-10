import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sun } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { EASE_OUT_EXPO } from "@/lib/animations";

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

  // The bar goes solid when scrolled, and also while the mobile menu is open
  // over the hero, so the menu never floats on a transparent background.
  const solid = scrolled || open;

  return (
    <motion.header
      data-testid="site-navbar"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      className="fixed top-0 inset-x-0 z-50 pointer-events-none"
    >
      {/* Top utility strip — folds away (grid-rows 1fr → 0fr) once you scroll. */}
      <div
        className={`hidden md:grid pointer-events-auto transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${
          scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
        }`}
        aria-hidden={scrolled}
      >
        <div className="overflow-hidden">
          <div className="flex items-center justify-between px-8 py-2 text-xs font-medium border-b border-white/10 text-white/90">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2"><Sun className="h-3.5 w-3.5" /> Powering NE India since 2025</span>
              <span className="opacity-70">•</span>
              <span>PM Surya Ghar Empanelled</span>
            </div>
            <div className="flex items-center gap-5">
              <a href={`tel:${BRAND.phone}`} tabIndex={scrolled ? -1 : undefined} className="flex items-center gap-1.5 hover:text-[#F26A21] transition" data-testid="topbar-phone">
                <Phone className="h-3.5 w-3.5" /> {BRAND.phoneDisplay}
              </a>
              <span className="opacity-70">•</span>
              <a href={`tel:${BRAND.landline}`} tabIndex={scrolled ? -1 : undefined} className="hover:text-[#F26A21] transition">{BRAND.landline}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bar shell — full-width and transparent at the top of the page; on
          scroll it condenses into a floating frosted pill inset from the edges. */}
      <div
        className={`nav-shell pointer-events-auto relative mx-auto border transition-[width,max-width,margin,border-radius,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out-expo ${
          solid
            ? "nav-glass mt-3 w-[calc(100%-1.5rem)] max-w-6xl rounded-2xl"
            : "mt-0 w-full max-w-7xl rounded-none bg-transparent border-transparent shadow-none"
        }`}
      >
      {/* Main bar */}
      <div className={`flex items-center justify-between px-4 sm:px-6 transition-[padding] duration-500 ease-out-expo ${solid ? "py-2 lg:px-5" : "py-3 lg:px-8"}`}>
        <Link to="/" className="flex items-center gap-3" data-testid="nav-logo">
          <img src="/img/brand/saura-96.webp" alt="Saura Energy logo" width="44" height="44" fetchPriority="high" className={`h-11 w-11 rounded-lg object-contain bg-white p-0.5 shadow-sm origin-left transition-transform duration-500 ease-out-expo ${solid ? "scale-[0.86]" : ""}`} />
          <div className={`leading-tight origin-left transition-transform duration-500 ease-out-expo ${solid ? "scale-95 -translate-x-1" : ""}`}>
            <div className="font-display font-extrabold text-xl">
              <span className={`transition-colors duration-500 ${solid ? "text-[#1B3A8C]" : "text-white"}`}>SAURA</span>
              <span className="text-[#F26A21]"> ener</span>
              <span className="text-[#2BA84A]">g</span>
              <span className="text-[#F26A21]">y</span>
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
                    ? solid
                      ? "text-[#F26A21] bg-orange-50"
                      : "text-white bg-white/15"
                    : solid
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
            <Button data-testid="nav-cta-quote" className="rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-lift px-5">
              Get Free Quote
            </Button>
          </Link>
          <button
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-500 ${solid ? "text-[#1B3A8C]" : "text-white"}`}
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
            className="lg:hidden border-t border-slate-200/60 px-4 py-3 space-y-1"
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
      </div>
    </motion.header>
  );
}
