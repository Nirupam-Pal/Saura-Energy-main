import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

import StepLoadRequirement from "./StepLoadRequirement";
import StepBackupRequirement from "./StepBackupRequirement";
import ResultScreen from "./ResultScreen";

import { getLoadCalculation } from "./loadCalculator.service";
import {
  validateStepOne,
  validateStepTwo,
  isStepValid,
} from "./loadCalculator.utils";
import { STEP_LABELS, TOTAL_STEPS } from "./loadCalculator.constants";

/**
 * LoadCalculator
 *
 * Multi-step flow matching the reference tool:
 *   Step 1 -> Total load (W) + Average running load (%)
 *   Step 2 -> Battery backup (hours)
 *   Result -> Recommended inverter (VA) + recommended battery (Ah)
 *
 * All calculation logic lives in utils/services; this component only owns
 * UI state (current step, form values, validation errors, loading, result).
 */
export default function LoadCalculator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    totalLoad: "",
    runningLoadPercent: 60,
    backupHours: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleNext = () => {
    const stepOneErrors = validateStepOne(form);
    if (!isStepValid(stepOneErrors)) {
      setErrors(stepOneErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCalculate = async () => {
    const stepTwoErrors = validateStepTwo(form);
    if (!isStepValid(stepTwoErrors)) {
      setErrors(stepTwoErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const calcResult = await getLoadCalculation(form);
      setResult(calcResult);
      setStep(3); // result screen
    } catch (e) {
      console.error("Load calculation failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setForm({ totalLoad: "", runningLoadPercent: 60, backupHours: "" });
    setErrors({});
    setResult(null);
    setStep(1);
  };

  return (
    <section
      id="load-calculator"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
      data-testid="load-calculator-section"
    >
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">
            Load Calculator
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find the right <span className="text-[#1B3A8C]">inverter &amp; battery</span> for your home.
          </h2>
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-blue-900/5">
          {step < 3 && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Zap className="h-4 w-4 text-[#F26A21]" />
                Step {step}/{TOTAL_STEPS}
              </div>
              <h3 className="text-sm font-bold text-slate-800">{STEP_LABELS[step]}</h3>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {step === 1 && (
                <StepLoadRequirement
                  totalLoad={form.totalLoad}
                  runningLoadPercent={form.runningLoadPercent}
                  errors={errors}
                  onChange={handleChange}
                  onNext={handleNext}
                />
              )}
              {step === 2 && (
                <StepBackupRequirement
                  backupHours={form.backupHours}
                  errors={errors}
                  loading={loading}
                  onChange={handleChange}
                  onBack={handleBack}
                  onCalculate={handleCalculate}
                />
              )}
              {step === 3 && <ResultScreen result={result} onRestart={handleRestart} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
