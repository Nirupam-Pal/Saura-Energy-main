/**
 * loadCalculator.constants.js
 *
 * Single source of truth for every "magic number" the Load Calculator uses.
 * Nothing in utils/services/components should hardcode a VA rating, Ah rating,
 * power factor, or voltage — it all lives here so the catalog can be updated
 * (e.g. to match an exact vendor SKU list) without touching calculation logic.
 */

// ---------------------------------------------------------------------------
// Core formula constants
// ---------------------------------------------------------------------------

/**
 * Power factor used to convert real running load (Watts) into apparent
 * power (VA) for inverter sizing: VA = Watts / POWER_FACTOR.
 * 0.8 is the standard assumption used across the Indian inverter industry
 * (Luminous, Microtek, Su-Kam etc.) for mixed household/resistive+inductive loads.
 */
export const POWER_FACTOR = 0.8;

/**
 * Round-trip efficiency loss applied when sizing the battery bank so the
 * inverter can actually deliver the required backup hours (accounts for
 * inverter conversion loss + battery discharge inefficiency).
 */
export const BATTERY_EFFICIENCY = 0.8;

/**
 * Depth of discharge safety margin — batteries are not sized to be drained
 * to 0%, so calculated Ah is inflated before matching to a catalog SKU.
 */
export const DEPTH_OF_DISCHARGE = 0.85; // i.e. usable capacity is 85% of rated Ah

// ---------------------------------------------------------------------------
// Input constraints (mirrors validation limits on the reference tool)
// ---------------------------------------------------------------------------

export const INPUT_LIMITS = {
  totalLoad: { min: 100, max: 20000, step: 50, unit: 'W' },
  runningLoadPercent: { min: 10, max: 100, step: 5, unit: '%' },
  backupHours: { min: 1, max: 24, step: 0.5, unit: 'hrs' },
};

// ---------------------------------------------------------------------------
// Inverter catalog
// ---------------------------------------------------------------------------
// Each entry represents a real, sellable SKU tier. `maxVA` is the ceiling of
// continuous apparent power that model can deliver. `batteryVoltage` is the
// DC bus voltage that tier is wired for (single 12V battery vs 2x/4x banks).
// Sorted ascending by maxVA — selection logic picks the first tier whose
// maxVA >= required VA.
export const INVERTER_CATALOG = [
  { id: 'inv-700', label: '700 VA', maxVA: 700, batteryVoltage: 12, batteryCount: 1 },
  { id: 'inv-850', label: '850 VA', maxVA: 850, batteryVoltage: 12, batteryCount: 1 },
  { id: 'inv-1100', label: '1100 VA', maxVA: 1100, batteryVoltage: 12, batteryCount: 1 },
  { id: 'inv-1600', label: '1600 VA', maxVA: 1600, batteryVoltage: 12, batteryCount: 1 },
  { id: 'inv-2000', label: '2000 VA', maxVA: 2000, batteryVoltage: 24, batteryCount: 2 },
  { id: 'inv-2500', label: '2500 VA', maxVA: 2500, batteryVoltage: 24, batteryCount: 2 },
  { id: 'inv-3500', label: '3500 VA', maxVA: 3500, batteryVoltage: 24, batteryCount: 2 },
  { id: 'inv-5000', label: '5000 VA', maxVA: 5000, batteryVoltage: 48, batteryCount: 4 },
  { id: 'inv-7500', label: '7500 VA', maxVA: 7500, batteryVoltage: 48, batteryCount: 4 },
  { id: 'inv-10000', label: '10000 VA', maxVA: 10000, batteryVoltage: 96, batteryCount: 8 },
];

// ---------------------------------------------------------------------------
// Battery catalog
// ---------------------------------------------------------------------------
// Ah ratings for a single 12V tall-tubular battery (the unit the inverter
// tiers above are built from — batteryCount above tells you how many are
// wired in series to reach the inverter's batteryVoltage).
// Sorted ascending by ah — selection logic picks the first tier whose
// ah >= required Ah per battery.
export const BATTERY_CATALOG = [
  { id: 'batt-100', label: '100 Ah', ah: 100 },
  { id: 'batt-120', label: '120 Ah', ah: 120 },
  { id: 'batt-150', label: '150 Ah', ah: 150 },
  { id: 'batt-165', label: '165 Ah', ah: 165 },
  { id: 'batt-180', label: '180 Ah', ah: 180 },
  { id: 'batt-200', label: '200 Ah', ah: 200 },
  { id: 'batt-220', label: '220 Ah', ah: 220 },
];

// ---------------------------------------------------------------------------
// UI copy — kept here (not inline in JSX) so wording tweaks don't touch logic
// ---------------------------------------------------------------------------

export const STEP_LABELS = {
  1: 'Define Load Requirement',
  2: 'Define Backup Requirement',
};

export const TOTAL_STEPS = 2;
