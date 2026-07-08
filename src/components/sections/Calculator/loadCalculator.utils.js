/**
 * loadCalculator.utils.js
 *
 * Pure, side-effect-free calculation logic for the Load Calculator.
 * Every function here takes plain numbers/objects in and returns plain
 * numbers/objects out — no React, no DOM — so it can be unit tested in
 * isolation and reused on a backend (see services/loadCalculator.service.js).
 */

import {
  POWER_FACTOR,
  BATTERY_EFFICIENCY,
  DEPTH_OF_DISCHARGE,
  INPUT_LIMITS,
  INVERTER_CATALOG,
  BATTERY_CATALOG,
} from './loadCalculator.constants';

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Validates a single numeric field against INPUT_LIMITS.
 * Returns null when valid, or a human-readable error message when invalid.
 */
export function validateField(fieldKey, value) {
  const limits = INPUT_LIMITS[fieldKey];
  if (!limits) return null;

  if (value === '' || value === null || value === undefined || Number.isNaN(Number(value))) {
    return 'This field is required.';
  }
  const num = Number(value);
  if (num < limits.min) return `Minimum allowed value is ${limits.min}${limits.unit}.`;
  if (num > limits.max) return `Maximum allowed value is ${limits.max}${limits.unit}.`;
  return null;
}

/**
 * Validates the full Step 1 payload (total load + running load %).
 */
export function validateStepOne({ totalLoad, runningLoadPercent }) {
  return {
    totalLoad: validateField('totalLoad', totalLoad),
    runningLoadPercent: validateField('runningLoadPercent', runningLoadPercent),
  };
}

/**
 * Validates the full Step 2 payload (backup hours).
 */
export function validateStepTwo({ backupHours }) {
  return {
    backupHours: validateField('backupHours', backupHours),
  };
}

export function isStepValid(errors) {
  return Object.values(errors).every((e) => e === null || e === undefined);
}

// ---------------------------------------------------------------------------
// Core calculation
// ---------------------------------------------------------------------------

/**
 * Step 1: derive the effective running load in Watts.
 *
 *   runningLoadWatts = totalLoad (W) * runningLoadPercent (%)
 *
 * This is the "real" continuous power the inverter has to sustain, as
 * opposed to the peak/total connected load.
 */
export function calculateRunningLoad(totalLoad, runningLoadPercent) {
  const load = Number(totalLoad) || 0;
  const pct = Number(runningLoadPercent) || 0;
  return round(load * (pct / 100), 2);
}

/**
 * Convert real running load (W) into required apparent power (VA):
 *
 *   requiredVA = runningLoadWatts / POWER_FACTOR
 *
 * Inverters are rated in VA, not W, because household loads are a mix of
 * resistive (PF ~1) and inductive (PF < 1, e.g. motors/fans/pumps) loads.
 */
export function calculateRequiredVA(runningLoadWatts) {
  return round(runningLoadWatts / POWER_FACTOR, 2);
}

/**
 * Picks the smallest inverter in the catalog whose maxVA can cover the
 * required VA. Falls back to the largest catalog entry (flagged as
 * "exceeds catalog") if nothing is big enough — never silently under-sizes.
 */
export function selectInverter(requiredVA, catalog = INVERTER_CATALOG) {
  const sorted = [...catalog].sort((a, b) => a.maxVA - b.maxVA);
  const match = sorted.find((inv) => inv.maxVA >= requiredVA);
  if (match) return { ...match, exceedsCatalog: false };
  const largest = sorted[sorted.length - 1];
  return { ...largest, exceedsCatalog: true };
}

/**
 * Step 2: derive total battery bank capacity (Ah) needed to sustain the
 * running load for the requested backup hours, at the inverter's bus voltage.
 *
 *   totalAh = (runningLoadWatts * backupHours) / (busVoltage * BATTERY_EFFICIENCY)
 *
 * Then per-battery Ah = totalAh / number of batteries in series, inflated by
 * the depth-of-discharge margin so the battery is never sized to be fully
 * drained.
 */
export function calculateRequiredAh(runningLoadWatts, backupHours, inverter) {
  const hours = Number(backupHours) || 0;
  const totalAh =
    (runningLoadWatts * hours) / (inverter.batteryVoltage * BATTERY_EFFICIENCY);
  const perBatteryAh = totalAh / inverter.batteryCount;
  const withDodMargin = perBatteryAh / DEPTH_OF_DISCHARGE;
  return round(withDodMargin, 2);
}

/**
 * Picks the smallest battery in the catalog whose ah can cover the
 * required per-battery Ah. Falls back to the largest catalog entry
 * (flagged as "exceeds catalog") if nothing is big enough.
 */
export function selectBattery(requiredAh, catalog = BATTERY_CATALOG) {
  const sorted = [...catalog].sort((a, b) => a.ah - b.ah);
  const match = sorted.find((b) => b.ah >= requiredAh);
  if (match) return { ...match, exceedsCatalog: false };
  const largest = sorted[sorted.length - 1];
  return { ...largest, exceedsCatalog: true };
}

/**
 * Orchestrates the full two-step calculation and returns everything the
 * result screen needs. This is the single function the UI (and any backend
 * endpoint) should call — keeps calculation logic in one place.
 */
export function computeLoadCalculation({ totalLoad, runningLoadPercent, backupHours }) {
  const runningLoadWatts = calculateRunningLoad(totalLoad, runningLoadPercent);
  const requiredVA = calculateRequiredVA(runningLoadWatts);
  const inverter = selectInverter(requiredVA);
  const requiredAh = calculateRequiredAh(runningLoadWatts, backupHours, inverter);
  const battery = selectBattery(requiredAh);

  return {
    inputs: {
      totalLoad: Number(totalLoad),
      runningLoadPercent: Number(runningLoadPercent),
      backupHours: Number(backupHours),
    },
    runningLoadWatts,
    requiredVA,
    requiredAh,
    recommendedInverter: inverter,
    recommendedBattery: battery,
    // number of 12V batteries the recommended inverter tier needs in series
    batteryCount: inverter.batteryCount,
  };
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
