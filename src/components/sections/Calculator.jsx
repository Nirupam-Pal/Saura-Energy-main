import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sun, Calculator as CalcIcon, TrendingUp, Leaf, IndianRupee, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { calculateSavings } from "@/lib/calculatorUtils";
import { Link } from "react-router-dom";
import { slideInLeftVariant, slideInRightVariant, VIEWPORT_ONCE, SMOOTH_EASING } from "@/lib/animations";

const inr = (v) =>
  "₹" + Number(v || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export default function Calculator() {
  const [bill, setBill] = useState(3500);
  const [propertyType, setPropertyType] = useState("residential");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCalculate = async () => {
    setLoading(true);
    try {
      const r = calculateSavings(Number(bill), propertyType);
      setResult(r);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    const arr = [];
    let cum = -result.net_cost;
    for (let y = 0; y <= 25; y++) {
      if (y > 0) cum += result.annual_savings;
      arr.push({ year: y, value: Math.round(cum) });
    }
    return arr;
  }, [result]);

  return (
    <section id="calculator" className="relative py-24 md:py-32 bg-white overflow-hidden" data-testid="calculator-section">
      <div className="absolute inset-0 sun-rays" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy + inputs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Savings Calculator</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              See your <span className="text-[#2BA84A]">25-year savings</span> in 30 seconds.
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Enter your monthly electricity bill. We'll size the ideal solar system, apply your PM Surya Ghar subsidy, and forecast lifetime savings.
            </p>

            <div className="mt-8 p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-blue-900/5">
              <div className="space-y-7">
                <div>
                  <Label className="text-sm font-bold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-[#F26A21]" /> Monthly electricity bill</span>
                    <span className="text-[#1B3A8C] font-display text-lg">{inr(bill)}</span>
                  </Label>
                  <Slider
                    data-testid="calc-bill-slider"
                    value={[bill]}
                    onValueChange={(v) => setBill(v[0])}
                    min={500} max={50000} step={100}
                    className="mt-4"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5"><span>₹500</span><span>₹50,000</span></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prop" className="text-sm font-bold text-slate-800">Property type</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger id="prop" data-testid="calc-property-type" className="mt-2 rounded-xl border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bill" className="text-sm font-bold text-slate-800">Or type exact bill</Label>
                    <Input id="bill" type="number" value={bill} onChange={(e) => setBill(Number(e.target.value || 0))} data-testid="calc-bill-input" className="mt-2 rounded-xl border-slate-200" />
                  </div>
                </div>

                <Button onClick={onCalculate} disabled={loading} data-testid="calc-submit-btn" className="w-full rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white py-6 text-base font-semibold shadow-lg hover:shadow-xl">
                  <CalcIcon className="mr-2 h-5 w-5" /> {loading ? "Calculating…" : "Calculate My Savings"}
                </Button>
              </div>
            </div>
          </div>

          {/* Right: results */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            variants={slideInRightVariant}
            className="rounded-3xl bg-[#0A1128] text-white p-6 md:p-8 shadow-2xl shadow-blue-900/30 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F26A21]/15 blur-[80px] rounded-full" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">Your Solar Forecast</div>
                  <h3 className="font-display text-2xl font-bold mt-1">For ₹{Number(bill).toLocaleString("en-IN")}/month bill</h3>
                </div>
                <Sun className="h-10 w-10 text-[#F26A21]" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Metric label="System Size" value={result ? `${result.system_size_kw} kW` : "—"} color="orange" />
                <Metric label="Payback Period" value={result ? `${result.payback_years} yrs` : "—"} color="green" />
                <Metric label="System Cost" value={result ? inr(result.estimated_cost) : "—"} />
                <Metric label="Subsidy" value={result ? inr(result.subsidy) : "—"} color="green" />
                <Metric label="Net Investment" value={result ? inr(result.net_cost) : "—"} color="orange" />
                <Metric label="Annual Savings" value={result ? inr(result.annual_savings) : "—"} />
              </div>

              {/* Chart */}
              <div className="mt-6 h-44 rounded-2xl bg-white/5 border border-white/10 p-3">
                {result ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F26A21" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#F26A21" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} />
                      <Tooltip contentStyle={{ background: "#0A1128", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} formatter={(v) => inr(v)} labelFormatter={(l) => `Year ${l}`} />
                      <Area type="monotone" dataKey="value" stroke="#F26A21" strokeWidth={2.5} fill="url(#grad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full grid place-items-center text-white/40 text-sm">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      Your 25-year savings curve will appear here
                    </div>
                  </div>
                )}
              </div>

              {result && (
                <div className="mt-5 p-4 rounded-2xl bg-[#2BA84A]/15 border border-[#2BA84A]/30 flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-[#2BA84A] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-bold">Plant {Math.round(result.co2_offset_kg / 21)} trees of impact every year</div>
                    <div className="text-white/70 text-xs mt-0.5">You'll offset {Math.round(result.co2_offset_kg).toLocaleString("en-IN")} kg CO₂ annually.</div>
                  </div>
                </div>
              )}

              <Link to="/contact" className="block mt-5">
                <Button data-testid="calc-claim-cta" className="w-full rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white py-5 font-semibold">
                  Claim Your Subsidy <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, color }) {
  const c = color === "orange" ? "text-[#F26A21]" : color === "green" ? "text-[#2BA84A]" : "text-white";
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
      <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</div>
      <div className={`font-display text-xl md:text-2xl font-extrabold mt-1 ${c}`}>{value}</div>
    </div>
  );
}

// import LoadCalculator from "./Calculator/LoadCalculator";

// export default function Calculator() {
//   return <LoadCalculator />;
// }