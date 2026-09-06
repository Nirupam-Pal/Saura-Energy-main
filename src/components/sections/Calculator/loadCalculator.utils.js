/**
 * loadCalculator.utils.js
 *
 * Pure, side-effect-free calculation logic for the Load Calculator.
 * Every function here takes plain numbers/objects in and returns plain
 * numbers/objects out — no React, no DOM — so it can be unit tested in
 * isolation and reused on a backend (see loadCalculator.service.js).
 */

import {
  APPLIANCE_INDEX,
  BACKUP_HOURS_LIMITS,
  POWER_FACTOR,
  BATTERY_DERATE_FACTOR,
  INVERTER_CATALOG,
  BATTERY_CATALOG,
  MAX_APPLIANCE_QUANTITY,
} from './loadCalculator.constants';

// ---------------------------------------------------------------------------
// Quantity helpers
// ---------------------------------------------------------------------------

/**
 * Clamps a quantity into [0, MAX_APPLIANCE_QUANTITY], coercing invalid input
 * (empty string, negative, NaN) down to 0 rather than throwing.
 */
export function clampQuantity(value) {
  const num = Math.round(Number(value));
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.min(num, MAX_APPLIANCE_QUANTITY);
}

// ---------------------------------------------------------------------------
// Load calculation
// ---------------------------------------------------------------------------

/**
 * Single appliance's contribution to the load: wattage * quantity.
 */
export function calculateApplianceLoad(watt, quantity) {
  return (Number(watt) || 0) * clampQuantity(quantity);
}

/**
 * Sums the load of every selected appliance.
 * `quantities` is a map of applianceId -> quantity (as produced by the UI).
 * Unknown ids are ignored so stale/removed catalog entries never crash this.
 */
export function calculateTotalLoad(quantities = {}) {
  return Object.entries(quantities).reduce((total, [applianceId, quantity]) => {
    const appliance = APPLIANCE_INDEX[applianceId];
    if (!appliance) return total;
    return total + calculateApplianceLoad(appliance.watt, quantity);
  }, 0);
}

/**
 * Per-category subtotal, in the same order as APPLIANCE_CATEGORIES.
 * Returns a map of categoryId -> watts, used for the per-category badges.
 */
export function calculateCategoryLoads(quantities = {}) {
  return Object.entries(quantities).reduce((totals, [applianceId, quantity]) => {
    const appliance = APPLIANCE_INDEX[applianceId];
    if (!appliance) return totals;
    const load = calculateApplianceLoad(appliance.watt, quantity);
    totals[appliance.categoryId] = (totals[appliance.categoryId] || 0) + load;
    return totals;
  }, {});
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * The reference tool has no "minimum" beyond "select at least one
 * appliance" — an all-zero selection just can't be sized.
 */
export function validateSelection(quantities = {}) {
  const totalLoad = calculateTotalLoad(quantities);
  if (totalLoad <= 0) {
    return { totalLoad: 'Select at least one appliance to calculate your load.' };
  }
  return {};
}

export function validateBackupHours(backupHours) {
  const { min, max } = BACKUP_HOURS_LIMITS;
  const num = Number(backupHours);
  if (backupHours === '' || backupHours === null || backupHours === undefined || Number.isNaN(num)) {
    return 'This field is required.';
  }
  if (num < min) return `Minimum backup is ${min} hour(s).`;
  if (num > max) return `Maximum backup is ${max} hours.`;
  return null;
}

export function isStepValid(errors) {
  return Object.values(errors).every((e) => e === null || e === undefined);
}

// ---------------------------------------------------------------------------
// Inverter / battery selection
// ---------------------------------------------------------------------------

/**
 * Converts real running load (W) into required apparent power (VA):
 * inverters are marketed and selected by VA, not Watts, because household
 * loads mix resistive and inductive appliances.
 */
export function calculateRequiredVA(totalLoadWatts) {
  return round(totalLoadWatts / POWER_FACTOR, 2);
}

/**
 * Picks the smallest inverter in the catalog whose VA rating covers the
 * required apparent power. Falls back to the largest catalog entry
 * (flagged as "exceeds catalog") if nothing is big enough — never silently
 * under-sizes.
 */
export function selectInverter(requiredVA, catalog = INVERTER_CATALOG) {
  const sorted = [...catalog].sort((a, b) => a.va - b.va);
  const match = sorted.find((inv) => inv.va >= requiredVA);
  if (match) return { ...match, exceedsCatalog: false };
  const largest = sorted[sorted.length - 1];
  return { ...largest, exceedsCatalog: true };
}

/**
 * Required capacity per battery (Ah), for a battery bank wired in series at
 * the inverter's DC bus voltage.
 *
 * Batteries in series share the same current, so per-battery Ah depends
 * only on the bus voltage (not on how many are strung together):
 *
 *   current (A)   = totalLoadWatts / busVoltage
 *   rawAh         = current * backupHours
 *   requiredAh    = rawAh / BATTERY_DERATE_FACTOR
 */
export function calculateRequiredAh(totalLoadWatts, backupHours, busVoltage) {
  const hours = Number(backupHours) || 0;
  const current = totalLoadWatts / busVoltage;
  const rawAh = current * hours;
  return round(rawAh / BATTERY_DERATE_FACTOR, 2);
}

/**
 * Picks the smallest battery in the catalog whose Ah covers the required
 * per-battery Ah. Falls back to the largest catalog entry (flagged as
 * "exceeds catalog") if nothing is big enough.
 */
export function selectBattery(requiredAh, catalog = BATTERY_CATALOG) {
  const sorted = [...catalog].sort((a, b) => a.ah - b.ah);
  const match = sorted.find((b) => b.ah >= requiredAh);
  if (match) return { ...match, exceedsCatalog: false };
  const largest = sorted[sorted.length - 1];
  return { ...largest, exceedsCatalog: true };
}

/**
 * Orchestrates the full calculation and returns everything the result
 * screen needs. This is the single function the UI (and any backend
 * endpoint) should call — keeps calculation logic in one place.
 */
export function computeLoadCalculation({ quantities = {}, backupHours }) {
  const totalLoad = calculateTotalLoad(quantities);
  const categoryLoads = calculateCategoryLoads(quantities);
  const requiredVA = calculateRequiredVA(totalLoad);
  const inverter = selectInverter(requiredVA);
  const requiredAh = calculateRequiredAh(totalLoad, backupHours, inverter.busVoltage);
  const battery = selectBattery(requiredAh);

  return {
    inputs: {
      quantities,
      backupHours: Number(backupHours),
    },
    totalLoad,
    categoryLoads,
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
