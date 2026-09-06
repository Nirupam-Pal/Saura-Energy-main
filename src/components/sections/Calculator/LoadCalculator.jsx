import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import PropertyTypeSelector from "./PropertyTypeSelector";
import ApplianceCategoryPicker from "./ApplianceCategoryPicker";
import ResultScreen from "./ResultScreen";

import { getLoadCalculation } from "./loadCalculator.service";
import { calculateTotalLoad, calculateCategoryLoads, clampQuantity, validateSelection, isStepValid } from "./loadCalculator.utils";
import {
  APPLIANCE_CATEGORIES,
  PROPERTY_TYPE_PRESETS,
  BACKUP_HOURS_LIMITS,
  LOAD_TYPES,
  STEPS,
} from "./loadCalculator.constants";

/**
 * LoadCalculator
 *
 * Appliance-picker flow matching the reference tool (luminousindia.com/load-calculator):
 *   1. Pick a property type preset (or go Custom) to seed appliance quantities.
 *   2. Browse appliance categories, filter by Essential/Heavy load, and set
 *      quantities per appliance — the total running load updates live.
 *   3. Choose average daily backup hours and hit "Find Solution" to get a
 *      recommended inverter + battery.
 *
 * All calculation logic lives in utils/services; this component only owns
 * UI state (selected property type, quantities, active category/filter,
 * backup hours, errors, loading, result).
 */
export default function LoadCalculator() {
  const [step, setStep] = useState(STEPS.APPLIANCES);
  const [propertyType, setPropertyType] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [activeCategoryId, setActiveCategoryId] = useState(APPLIANCE_CATEGORIES[0].id);
  const [loadTypeFilter, setLoadTypeFilter] = useState(LOAD_TYPES.ALL);
  const [backupHours, setBackupHours] = useState(BACKUP_HOURS_LIMITS.default);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const totalLoad = useMemo(() => calculateTotalLoad(quantities), [quantities]);
  const categoryLoads = useMemo(() => calculateCategoryLoads(quantities), [quantities]);

  const handlePropertyTypeSelect = (id) => {
    setPropertyType(id);
    setQuantities({ ...PROPERTY_TYPE_PRESETS[id] });
    if (errors.totalLoad) setErrors({});
  };

  const handleQuantityDelta = (applianceId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [applianceId]: clampQuantity((prev[applianceId] || 0) + delta),
    }));
    if (errors.totalLoad) setErrors({});
  };

  const handleCalculate = async () => {
    const selectionErrors = validateSelection(quantities);
    if (!isStepValid(selectionErrors)) {
      setErrors(selectionErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const calcResult = await getLoadCalculation({ quantities, backupHours });
      setResult(calcResult);
      setStep(STEPS.RESULT);
    } catch (e) {
      console.error("Load calculation failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToAppliances = () => setStep(STEPS.APPLIANCES);

  const handleRestart = () => {
    setPropertyType(null);
    setQuantities({});
    setActiveCategoryId(APPLIANCE_CATEGORIES[0].id);
    setLoadTypeFilter(LOAD_TYPES.ALL);
    setBackupHours(BACKUP_HOURS_LIMITS.default);
    setErrors({});
    setResult(null);
    setStep(STEPS.APPLIANCES);
  };

  return (
    <section
      id="load-calculator"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
      data-testid="load-calculator-section"
    >
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">
            Load Calculator
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find the right <span className="text-[#1B3A8C]">inverter &amp; battery</span> for your home.
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Pick your appliances, and we'll size the exact backup power you need.
          </p>
        </div>

        <div className="p-5 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-blue-900/5">
          <AnimatePresence mode="sync">
            <motion.div
              key={step}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {step === STEPS.APPLIANCES && (
                <div className="space-y-6" data-testid="load-calc-appliances-step">
                  <PropertyTypeSelector activePropertyType={propertyType} onSelect={handlePropertyTypeSelect} />

                  <ApplianceCategoryPicker
                    categories={APPLIANCE_CATEGORIES}
                    activeCategoryId={activeCategoryId}
                    onCategoryChange={setActiveCategoryId}
                    loadTypeFilter={loadTypeFilter}
                    onLoadTypeFilterChange={setLoadTypeFilter}
                    categoryLoads={categoryLoads}
                    quantities={quantities}
                    onQuantityDelta={handleQuantityDelta}
                  />

                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between py-4">
                      <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-[#F26A21]" /> Your Total Running Load
                      </span>
                      <span
                        data-testid="total-running-load"
                        className="font-display text-2xl font-extrabold text-[#1B3A8C]"
                      >
                        {totalLoad} W
                      </span>
                    </div>
                    {errors.totalLoad && (
                      <p className="mb-3 text-xs font-medium text-red-600">{errors.totalLoad}</p>
                    )}

                    <p className="text-xs text-slate-400 mb-4">
                      Get product suggestions as per your required backup power. Choose your estimate below.
                    </p>

                    <div>
                      <label className="text-sm font-bold text-slate-800 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#F26A21]" /> Average Daily Backup (Hrs)
                        </span>
                        <span className="text-[#1B3A8C] font-display text-lg">{backupHours} hr</span>
                      </label>
                      <Slider
                        value={[backupHours]}
                        onValueChange={(v) => setBackupHours(v[0])}
                        min={BACKUP_HOURS_LIMITS.min}
                        max={BACKUP_HOURS_LIMITS.max}
                        step={BACKUP_HOURS_LIMITS.step}
                        className="mt-4"
                        data-testid="backup-hours-slider"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                        <span>{BACKUP_HOURS_LIMITS.min} hr</span>
                        <span>{BACKUP_HOURS_LIMITS.max} hr</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      disabled={loading}
                      data-testid="load-calc-submit-btn"
                      className="w-full mt-6 rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white py-6 text-base font-semibold shadow-lg hover:shadow-xl"
                    >
                      {loading ? "Calculating…" : "Find Solution"}
                    </Button>
                  </div>
                </div>
              )}

              {step === STEPS.RESULT && (
                <ResultScreen result={result} onBack={handleBackToAppliances} onRestart={handleRestart} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          *Disclaimer: Calculations are indicative and based on standard assumptions. Actual outputs may vary.
        </p>
      </div>
    </section>
  );
}
