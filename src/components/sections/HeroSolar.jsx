import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle, Sun, Zap, Leaf, ShieldCheck, IndianRupee } from "lucide-react";
import { STATS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";
import { EASE_OUT_EXPO, fadeUpVariant } from "@/lib/animations";

/**
 * HeroSolar — "sun to socket" hero.
 *
 * The illustration tells the product story in one loop: the sun beams onto a
 * rooftop array, a light sweep runs across the cells, and energy pulses flow
 * down the cables into a home (windows light up as each pulse lands) and a
 * battery (charge level breathes). Every loop runs on transform / opacity /
 * stroke-dashoffset — see the `hero-*` keyframes in index.css — and the
 * global reduced-motion rules switch them off.
 */

// ---------------------------------------------------------------------------
// Panel geometry: a perspective quad (top-left, top-right, bottom-right,
// bottom-left) split into a grid of cells by bilinear interpolation.
// ---------------------------------------------------------------------------
const PANEL = [[70, 292], [330, 232], [392, 330], [128, 396]];
const COLS = 5;
const ROWS = 3;
const GAP = 0.014;

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const panelPoint = (u, v) => lerp(lerp(PANEL[0], PANEL[1], u), lerp(PANEL[3], PANEL[2], u), v);
const toPoints = (pts) => pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");

const CELLS = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const u0 = c / COLS + GAP, u1 = (c + 1) / COLS - GAP;
    const v0 = r / ROWS + GAP * 2, v1 = (r + 1) / ROWS - GAP * 2;
    CELLS.push(toPoints([panelPoint(u0, v0), panelPoint(u1, v0), panelPoint(u1, v1), panelPoint(u0, v1)]));
  }
}
const PANEL_POINTS = toPoints(PANEL);
const LEGS = [
  [panelPoint(0.12, 0), 438], [panelPoint(0.88, 0), 432], // back legs (drawn behind the panel)
  [panelPoint(0.15, 1), 450], [panelPoint(0.85, 1), 446], // front legs
];

// Cables: panel → home, panel → battery. pathLength=100 normalises the dash maths.
const CABLE_HOME = "M 372 352 C 392 418, 430 452, 476 446";
const CABLE_BATTERY = "M 258 372 C 258 396, 246 402, 246 420";

const LINE_DELAY = 0.15;
const lineReveal = (i) => ({
  initial: { y: "110%" },
  animate: { y: "0%" },
  transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: LINE_DELAY + i * 0.12 },
});

function SolarScene() {
  return (
    <svg viewBox="0 0 580 480" className="w-full h-auto overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="hs-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB45C" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#F26A21" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#F26A21" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hs-sun-core" cx="40%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#FFF1C9" />
          <stop offset="45%" stopColor="#FFB547" />
          <stop offset="100%" stopColor="#F26A21" />
        </radialGradient>
        <linearGradient id="hs-beam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD27A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFD27A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-cell" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#2A4FB0" />
          <stop offset="100%" stopColor="#0F1F4D" />
        </linearGradient>
        <linearGradient id="hs-shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-cable" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F26A21" />
          <stop offset="100%" stopColor="#2BA84A" />
        </linearGradient>
        <radialGradient id="hs-ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2BA84A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2BA84A" stopOpacity="0" />
        </radialGradient>
        <clipPath id="hs-panel-clip">
          <polygon points={PANEL_POINTS} />
        </clipPath>
        <filter id="hs-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Sun */}
      <g>
        <circle cx="462" cy="92" r="120" fill="url(#hs-sun-glow)" className="hero-sun-glow" />
        <g className="hero-sun-rays" stroke="#FFB547" strokeWidth="3" strokeLinecap="round" opacity="0.85">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return (
              <line key={i} x1={462 + Math.cos(a) * 50} y1={92 + Math.sin(a) * 50} x2={462 + Math.cos(a) * (i % 2 ? 64 : 72)} y2={92 + Math.sin(a) * (i % 2 ? 64 : 72)} />
            );
          })}
        </g>
        <circle cx="462" cy="92" r="38" fill="url(#hs-sun-core)" />
      </g>

      {/* Sunbeams onto the array */}
      <g stroke="url(#hs-beam)" strokeWidth="2" strokeLinecap="round">
        <line x1="436" y1="122" x2="300" y2="262" className="hero-beam" />
        <line x1="428" y1="112" x2="210" y2="282" className="hero-beam" style={{ animationDelay: "0.8s" }} />
        <line x1="444" y1="130" x2="360" y2="290" className="hero-beam" style={{ animationDelay: "1.6s" }} />
      </g>

      {/* Ground glow */}
      <ellipse cx="300" cy="452" rx="270" ry="22" fill="url(#hs-ground)" />
      <line x1="40" y1="452" x2="560" y2="452" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Panel legs (back pair sits behind the array) */}
      <g stroke="rgba(203,213,225,0.45)" strokeWidth="4" strokeLinecap="round">
        {LEGS.slice(0, 2).map(([p, y], i) => <line key={i} x1={p[0]} y1={p[1]} x2={p[0] + 4} y2={y} />)}
      </g>

      {/* Solar array */}
      <polygon points={PANEL_POINTS} fill="#0B1634" stroke="rgba(226,232,240,0.55)" strokeWidth="3" strokeLinejoin="round" />
      <g>
        {CELLS.map((pts, i) => (
          <polygon key={i} points={pts} fill="url(#hs-cell)" stroke="rgba(147,180,255,0.35)" strokeWidth="0.8" />
        ))}
      </g>
      <g clipPath="url(#hs-panel-clip)">
        <polygon points="-40,180 30,180 110,470 40,470" fill="url(#hs-shimmer)" className="hero-shimmer" />
      </g>

      <g stroke="rgba(203,213,225,0.55)" strokeWidth="4" strokeLinecap="round">
        {LEGS.slice(2).map(([p, y], i) => <line key={i} x1={p[0]} y1={p[1]} x2={p[0] + 4} y2={y} />)}
      </g>

      {/* Cables: dim base, flowing dashes, travelling pulse */}
      {[CABLE_HOME, CABLE_BATTERY].map((d, i) => (
        <g key={d} fill="none" strokeLinecap="round">
          <path d={d} stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
          <path d={d} pathLength="100" stroke="url(#hs-cable)" strokeWidth="2" className="hero-flow" opacity="0.7" />
          <path d={d} pathLength="100" stroke="#FFD27A" strokeWidth="4" className="hero-pulse" style={{ animationDelay: `${i * 0.6}s`, filter: "drop-shadow(0 0 4px #FFB547)" }} />
        </g>
      ))}

      {/* Battery */}
      <g>
        <rect x="204" y="420" width="84" height="32" rx="7" fill="#0B1634" stroke="rgba(226,232,240,0.6)" strokeWidth="2.5" />
        <rect x="288" y="430" width="6" height="12" rx="2" fill="rgba(226,232,240,0.6)" />
        <rect x="209" y="425" width="74" height="22" rx="4" fill="#2BA84A" className="hero-battery" />
        <path d="M 248 427 l -7 10 h 6 l -3 8 l 9 -11 h -6 l 3 -7 z" fill="#ffffff" opacity="0.9" />
      </g>

      {/* Home */}
      <g>
        <polygon points="404,364 478,312 552,364" fill="#1B3A8C" stroke="rgba(226,232,240,0.55)" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="418" y="362" width="120" height="90" fill="#0E1B44" stroke="rgba(226,232,240,0.55)" strokeWidth="2.5" />
        {/* Mini rooftop panel */}
        <polygon points="452,346 486,322 506,336 472,360" fill="url(#hs-cell)" stroke="rgba(147,180,255,0.5)" strokeWidth="1" />
        {[[432, 378], [500, 378]].map(([x, y]) => (
          <g key={x}>
            <rect x={x} y={y} width="26" height="22" rx="2" fill="#132357" />
            <rect x={x - 4} y={y - 4} width="34" height="30" rx="6" fill="#FFD27A" filter="url(#hs-blur)" className="hero-window" />
            <rect x={x} y={y} width="26" height="22" rx="2" fill="#FFD27A" className="hero-window" />
          </g>
        ))}
        <rect x="467" y="410" width="22" height="42" rx="2" fill="#132357" stroke="rgba(226,232,240,0.4)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// Live output readout: a new target every couple of seconds, eased by a
// spring so the digits glide rather than jump.
function LiveGeneration() {
  const target = useMotionValue(4.82);
  const smooth = useSpring(target, { stiffness: 40, damping: 18 });
  const text = useTransform(smooth, (v) => v.toFixed(2));

  useEffect(() => {
    const id = setInterval(() => target.set(4.55 + Math.random() * 0.7), 2400);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="rounded-2xl glass-dark border border-white/15 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#2BA84A] opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2BA84A]" />
        </span>
        Live generation
      </div>
      <div className="mt-1 flex items-end gap-3">
        <div className="font-display text-2xl font-extrabold text-white tabular-nums">
          <motion.span>{text}</motion.span> <span className="text-sm font-bold text-white/70">kW</span>
        </div>
        <div className="flex items-end gap-[3px] h-7 pb-1" aria-hidden="true">
          {[0.5, 0.75, 0.6, 0.9, 0.7, 1, 0.8].map((h, i) => (
            <span key={i} className="hero-bar block w-1.5 rounded-sm bg-gradient-to-t from-[#F26A21] to-[#FFD27A]" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSolar() {
  const sectionRef = useRef(null);

  // Pointer parallax: layers drift a few px toward the cursor, spring-smoothed.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const sceneX = useTransform(sx, (v) => v * 18);
  const sceneY = useTransform(sy, (v) => v * 12);
  const cardX = useTransform(sx, (v) => v * -26);
  const cardY = useTransform(sy, (v) => v * -18);

  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => { mx.set(0); my.set(0); };

  // Scroll: the scene sinks slightly slower than the page as the hero leaves.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A1128] text-white"
      data-testid="hero-section"
    >
      {/* Background: dawn glow behind the sun, cool glow bottom-left, dot grid */}
      <div className="absolute -top-40 right-[-10%] w-[760px] h-[760px] rounded-full bg-[#F26A21]/25 blur-[140px] hero-sun-glow" />
      <div className="absolute -bottom-48 -left-40 w-[620px] h-[620px] rounded-full bg-[#1B3A8C]/50 blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 60% 40%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 60% 40%, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A1128] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-10 min-h-[100svh] flex flex-col">
        <div className="flex-1 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-6 items-center">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="show"
              className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-white/90 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] mb-6"
            >
              <Sun className="h-3.5 w-3.5 text-[#F26A21]" />
              PM Surya Ghar · ₹85,800 Subsidy
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.4rem] xl:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight">
              {[
                <>Power your future</>,
                <>with <span className="gradient-text">smart solar</span></>,
                <>energy.</>,
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1 -mb-1">
                  <motion.span className="block" {...lineReveal(i)}>{line}</motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              animate="show"
              custom={5}
              className="mt-6 text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-xl"
            >
              Premium residential, commercial and industrial solar — engineered by MNRE-certified experts.
              Cut electricity bills by up to <span className="text-[#F26A21] font-semibold">90%</span> and lock in 30 years of savings, today.
            </motion.p>

            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="show"
              custom={6}
              className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <Button data-testid="hero-cta-consultation" className="group w-full sm:w-auto rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white px-7 py-6 text-base font-semibold shadow-xl shadow-orange-900/30 hover:shadow-2xl hover:-translate-y-0.5">
                  Get Free Consultation
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/calculator" className="w-full sm:w-auto">
                <Button variant="outline" data-testid="hero-cta-calculator" className="group w-full sm:w-auto rounded-full border-white/25 bg-white/5 hover:bg-white/15 text-white hover:text-white px-7 py-6 text-base font-semibold backdrop-blur-md hover:-translate-y-0.5">
                  <PlayCircle className="mr-1 h-5 w-5" /> Size Your Backup
                </Button>
              </Link>
            </motion.div>

            <motion.ul
              variants={fadeUpVariant}
              initial="hidden"
              animate="show"
              custom={7}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75"
            >
              {[
                { icon: ShieldCheck, label: "25-Year Warranty" },
                { icon: Zap, label: "7-Day Installation" },
                { icon: Leaf, label: "Carbon-Negative" },
              ].map(({ icon: I, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded-full bg-white/10 border border-white/10 grid place-items-center">
                    <I className="h-3.5 w-3.5 text-[#F26A21]" />
                  </span>
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Illustration */}
          <motion.div style={{ y: scrollY }} className="relative w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.3 }}
            className="relative"
          >
            <motion.div style={{ x: sceneX, y: sceneY }}>
              <SolarScene />
            </motion.div>

            {/* Floating readouts */}
            <motion.div style={{ x: cardX, y: cardY }} className="absolute left-0 top-[8%] sm:-left-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.1 }}
              >
                <div className="hero-float">
                  <LiveGeneration />
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={{ x: cardX, y: cardY }} className="absolute right-2 -bottom-12 hidden sm:block">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.35 }}
              >
                <div className="hero-float rounded-2xl glass-dark border border-white/15 px-4 py-3 flex items-center gap-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]" style={{ animationDelay: "-3s" }}>
                  <span className="h-9 w-9 rounded-xl bg-[#2BA84A]/20 grid place-items-center">
                    <IndianRupee className="h-4.5 w-4.5 text-[#2BA84A]" />
                  </span>
                  <div>
                    <div className="font-display text-lg font-extrabold leading-none">
                      ₹<AnimatedCounter to={2340} duration={2.4} />
                    </div>
                    <div className="mt-1 text-[11px] text-white/60">saved this month</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.9 }}
          className="mt-12 rounded-2xl glass-dark border border-white/10 overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="p-4 sm:p-5 md:p-6 text-center bg-[#0B1430]/90" data-testid={`hero-stat-${s.label.toLowerCase().replace(/[^a-z]/g, "")}`}>
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  <AnimatedCounter to={s.value} decimals={s.decimals || 0} suffix={s.suffix || ""} />
                </div>
                <div className="mt-1.5 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/55 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
