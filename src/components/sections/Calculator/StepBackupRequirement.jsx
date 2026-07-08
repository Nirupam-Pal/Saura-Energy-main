import { Clock, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { INPUT_LIMITS } from "./loadCalculator.constants";

/**
 * Step 2 of the reference flow: "Define Backup Requirement"
 *   - Battery backup (hours)
 */
export default function StepBackupRequirement({
  backupHours,
  errors,
  loading,
  onChange,
  onBack,
  onCalculate,
}) {
  const { backupHours: limits } = INPUT_LIMITS;

  return (
    <div className="space-y-7" data-testid="load-calc-step-2">
      <div>
        <Label htmlFor="backup-hours" className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#F26A21]" /> Battery backup required (hours)
        </Label>
        <Input
          id="backup-hours"
          type="number"
          inputMode="decimal"
          min={limits.min}
          max={limits.max}
          step={limits.step}
          value={backupHours}
          onChange={(e) => onChange("backupHours", e.target.value)}
          placeholder="e.g. 4"
          data-testid="load-calc-backup-hours-input"
          className="mt-2 rounded-xl border-slate-200"
          aria-invalid={!!errors.backupHours}
        />
        {errors.backupHours && (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.backupHours}</p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          How long should your appliances keep running during a power cut?
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          data-testid="load-calc-back-btn"
          className="rounded-full border-slate-200 py-6 px-5"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button
          onClick={onCalculate}
          disabled={loading}
          data-testid="load-calc-submit-btn"
          className="flex-1 rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white py-6 text-base font-semibold shadow-lg hover:shadow-xl"
        >
          {loading ? "Calculating…" : "Calculate"}
        </Button>
      </div>
    </div>
  );
}
