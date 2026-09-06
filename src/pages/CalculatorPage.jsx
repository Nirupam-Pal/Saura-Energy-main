import Calculator from "@/components/sections/Calculator";
import LoadCalculator from "@/components/sections/Calculator/LoadCalculator";
import Subsidy from "@/components/sections/Subsidy";
import CTASection from "@/components/sections/CTASection";

export default function CalculatorPage() {
  return (
    <>
      <section className="relative pt-44 pb-20 bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#F26A21]/20 blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-4">Savings Calculator</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            Know your savings <span className="gradient-text">before you switch.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
            Free, transparent calculator that factors in PM Surya Ghar subsidy, grid tariffs and 25-year solar yield.
          </p>
        </div>
      </section>
      <Calculator />
      <LoadCalculator />
      <Subsidy />
      <CTASection />
    </>
  );
}
