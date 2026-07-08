import { BatteryCharging, Cpu, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Final result screen: recommended inverter (VA) + recommended battery (Ah),
 * plus the intermediate numbers so the recommendation is explainable rather
 * than a black box.
 */
export default function ResultScreen({ result, onRestart }) {
  if (!result) return null;

  const {
    inputs,
    runningLoadWatts,
    requiredVA,
    requiredAh,
    recommendedInverter,
    recommendedBattery,
    batteryCount,
  } = result;

  return (
    <div className="space-y-6" data-testid="load-calc-result">
      <div className="grid grid-cols-2 gap-3">
        <Metric label="Running Load" value={`${runningLoadWatts} W`} />
        <Metric label="Required Capacity" value={`${requiredVA} VA`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RecommendationCard
          icon={<Cpu className="h-6 w-6 text-[#F26A21]" />}
          title="Recommended Inverter"
          value={recommendedInverter.label}
          testId="load-calc-inverter-result"
          warning={recommendedInverter.exceedsCatalog}
          warningText="Load exceeds our standard range — a custom/industrial solution is recommended."
        />
        <RecommendationCard
          icon={<BatteryCharging className="h-6 w-6 text-[#2BA84A]" />}
          title="Recommended Battery"
          value={`${recommendedBattery.label}${batteryCount > 1 ? ` × ${batteryCount}` : ""}`}
          testId="load-calc-battery-result"
          warning={recommendedBattery.exceedsCatalog}
          warningText="Backup requirement exceeds our standard battery range."
        />
      </div>

      <div className="text-xs text-slate-500 bg-slate-50 rounded-xl p-4 border border-slate-100">
        Based on a total load of <strong>{inputs.totalLoad} W</strong> at{" "}
        <strong>{inputs.runningLoadPercent}%</strong> average running load, for{" "}
        <strong>{inputs.backupHours} hour(s)</strong> of backup. Required battery capacity:{" "}
        <strong>{requiredAh} Ah</strong> per battery.
      </div>

      <Button
        variant="outline"
        onClick={onRestart}
        data-testid="load-calc-restart-btn"
        className="w-full rounded-full border-slate-200 py-6"
      >
        <RotateCcw className="h-4 w-4 mr-2" /> Start Over
      </Button>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</div>
      <div className="font-display text-xl font-extrabold mt-1 text-slate-900">{value}</div>
    </div>
  );
}

function RecommendationCard({ icon, title, value, testId, warning, warningText }) {
  return (
    <div
      data-testid={testId}
      className="p-5 rounded-2xl bg-[#0A1128] text-white border border-white/10"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs uppercase tracking-widest text-white/60 font-bold">{title}</span>
      </div>
      <div className="font-display text-2xl font-extrabold mt-2">{value}</div>
      {warning && (
        <div className="mt-2 flex items-start gap-1.5 text-amber-400 text-xs">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>{warningText}</span>
        </div>
      )}
    </div>
  );
}
