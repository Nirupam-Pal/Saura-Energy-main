import { Zap, Gauge } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { INPUT_LIMITS } from "./loadCalculator.constants";

/**
 * Step 1 of the reference flow: "Define Load Requirement"
 *   - Total load (W)
 *   - Average running load (%)
 */
export default function StepLoadRequirement({
  totalLoad,
  runningLoadPercent,
  errors,
  onChange,
  onNext,
}) {
  const { totalLoad: totalLimits, runningLoadPercent: pctLimits } = INPUT_LIMITS;

  return (
    <div className="space-y-7" data-testid="load-calc-step-1">
      <div>
        <Label htmlFor="total-load" className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#F26A21]" /> Total load (W)
        </Label>
        <Input
          id="total-load"
          type="number"
          inputMode="numeric"
          min={totalLimits.min}
          max={totalLimits.max}
          step={totalLimits.step}
          value={totalLoad}
          onChange={(e) => onChange("totalLoad", e.target.value)}
          placeholder={`e.g. 1500`}
          data-testid="load-calc-total-load-input"
          className="mt-2 rounded-xl border-slate-200"
          aria-invalid={!!errors.totalLoad}
        />
        {errors.totalLoad && (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.totalLoad}</p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          Sum of the wattage of every appliance you want on backup.
        </p>
      </div>

      <div>
        <Label className="text-sm font-bold text-slate-800 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-[#F26A21]" /> Average running load (%)
          </span>
          <span className="text-[#1B3A8C] font-display text-lg">
            {runningLoadPercent || pctLimits.min}%
          </span>
        </Label>
        <Slider
          value={[Number(runningLoadPercent) || pctLimits.min]}
          onValueChange={(v) => onChange("runningLoadPercent", v[0])}
          min={pctLimits.min}
          max={pctLimits.max}
          step={pctLimits.step}
          className="mt-4"
          data-testid="load-calc-running-load-slider"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1.5">
          <span>{pctLimits.min}%</span>
          <span>{pctLimits.max}%</span>
        </div>
        {errors.runningLoadPercent && (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.runningLoadPercent}</p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          Not everything runs at once — this is the % of total load typically active
          simultaneously.
        </p>
      </div>

      <Button
        onClick={onNext}
        data-testid="load-calc-next-btn"
        className="w-full rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white py-6 text-base font-semibold shadow-lg hover:shadow-xl"
      >
        Next
      </Button>
    </div>
  );
}
