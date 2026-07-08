/**
 * loadCalculator.utils.test.js
 *
 * Run with Jest or Vitest (both share this syntax).
 * Each expected output below is hand-derived from the same formulas
 * documented in loadCalculator.utils.js, so these tests primarily guard
 * against regressions / typos in the implementation — verify the constants
 * (POWER_FACTOR, catalogs) against the real Luminous product list if you
 * need byte-exact parity with their tool.
 */

import {
  calculateRunningLoad,
  calculateRequiredVA,
  selectInverter,
  calculateRequiredAh,
  selectBattery,
  computeLoadCalculation,
  validateField,
  validateStepOne,
  validateStepTwo,
  isStepValid,
} from "./loadCalculator.utils";

describe("calculateRunningLoad", () => {
  test("1500W total load at 60% running load -> 900W", () => {
    expect(calculateRunningLoad(1500, 60)).toBe(900);
  });

  test("800W total load at 50% -> 400W", () => {
    expect(calculateRunningLoad(800, 50)).toBe(400);
  });

  test("0% running load -> 0W", () => {
    expect(calculateRunningLoad(2000, 0)).toBe(0);
  });
});

describe("calculateRequiredVA", () => {
  test("900W running load / 0.8 PF -> 1125 VA", () => {
    expect(calculateRequiredVA(900)).toBe(1125);
  });

  test("400W running load / 0.8 PF -> 500 VA", () => {
    expect(calculateRequiredVA(400)).toBe(500);
  });
});

describe("selectInverter", () => {
  test("1125 VA required -> selects 1600 VA tier (next size up)", () => {
    const inv = selectInverter(1125);
    expect(inv.maxVA).toBe(1600);
    expect(inv.exceedsCatalog).toBe(false);
  });

  test("500 VA required -> selects 700 VA tier", () => {
    const inv = selectInverter(500);
    expect(inv.maxVA).toBe(700);
  });

  test("exact match on catalog boundary (850 VA) -> selects 850 VA, not next tier", () => {
    const inv = selectInverter(850);
    expect(inv.maxVA).toBe(850);
  });

  test("VA beyond largest catalog entry -> flags exceedsCatalog", () => {
    const inv = selectInverter(50000);
    expect(inv.exceedsCatalog).toBe(true);
  });
});

describe("calculateRequiredAh", () => {
  test("900W load, 4hr backup, 1600VA inverter (12V, 1 battery) -> ~529.41 Ah", () => {
    const inverter = { batteryVoltage: 12, batteryCount: 1 };
    // totalAh = (900 * 4) / (12 * 0.8) = 3600 / 9.6 = 375
    // perBatteryAh = 375 / 1 = 375
    // withDodMargin = 375 / 0.85 = 441.176...
    const ah = calculateRequiredAh(900, 4, inverter);
    expect(ah).toBeCloseTo(441.18, 1);
  });

  test("2000W load, 3hr backup, 2000VA inverter (24V, 2 batteries)", () => {
    const inverter = { batteryVoltage: 24, batteryCount: 2 };
    // totalAh = (2000 * 3) / (24 * 0.8) = 6000 / 19.2 = 312.5
    // perBatteryAh = 312.5 / 2 = 156.25
    // withDodMargin = 156.25 / 0.85 = 183.82...
    const ah = calculateRequiredAh(2000, 3, inverter);
    expect(ah).toBeCloseTo(183.82, 1);
  });
});

describe("selectBattery", () => {
  test("150 Ah required -> selects 150 Ah tier exactly", () => {
    expect(selectBattery(150).ah).toBe(150);
  });

  test("183.82 Ah required -> selects 200 Ah tier", () => {
    expect(selectBattery(183.82).ah).toBe(200);
  });

  test("exceeds largest catalog entry -> flags exceedsCatalog", () => {
    expect(selectBattery(9999).exceedsCatalog).toBe(true);
  });
});

describe("computeLoadCalculation (full pipeline)", () => {
  test("sample: 1500W total, 60% running, 4hr backup", () => {
    const result = computeLoadCalculation({
      totalLoad: 1500,
      runningLoadPercent: 60,
      backupHours: 4,
    });

    expect(result.runningLoadWatts).toBe(900);
    expect(result.requiredVA).toBe(1125);
    expect(result.recommendedInverter.maxVA).toBe(1600);
    expect(result.recommendedInverter.batteryVoltage).toBe(12);
    expect(result.recommendedBattery.ah).toBeGreaterThanOrEqual(result.requiredAh);
  });

  test("sample: small household, 500W total, 40% running, 2hr backup", () => {
    const result = computeLoadCalculation({
      totalLoad: 500,
      runningLoadPercent: 40,
      backupHours: 2,
    });
    // runningLoadWatts = 500 * 0.4 = 200
    expect(result.runningLoadWatts).toBe(200);
    // requiredVA = 200 / 0.8 = 250
    expect(result.requiredVA).toBe(250);
    expect(result.recommendedInverter.maxVA).toBe(700);
  });

  test("sample: heavy commercial load, 8000W total, 70% running, 6hr backup", () => {
    const result = computeLoadCalculation({
      totalLoad: 8000,
      runningLoadPercent: 70,
      backupHours: 6,
    });
    // runningLoadWatts = 8000 * 0.7 = 5600
    expect(result.runningLoadWatts).toBe(5600);
    // requiredVA = 5600 / 0.8 = 7000
    expect(result.requiredVA).toBe(7000);
    expect(result.recommendedInverter.maxVA).toBe(7500);
  });
});

describe("validation", () => {
  test("totalLoad below minimum returns an error message", () => {
    expect(validateField("totalLoad", 50)).not.toBeNull();
  });

  test("totalLoad within range returns null (valid)", () => {
    expect(validateField("totalLoad", 1500)).toBeNull();
  });

  test("runningLoadPercent above 100 returns an error message", () => {
    expect(validateField("runningLoadPercent", 150)).not.toBeNull();
  });

  test("empty backupHours returns an error message", () => {
    expect(validateField("backupHours", "")).not.toBeNull();
  });

  test("validateStepOne + isStepValid: valid payload passes", () => {
    const errors = validateStepOne({ totalLoad: 1200, runningLoadPercent: 60 });
    expect(isStepValid(errors)).toBe(true);
  });

  test("validateStepOne + isStepValid: invalid payload fails", () => {
    const errors = validateStepOne({ totalLoad: 0, runningLoadPercent: 60 });
    expect(isStepValid(errors)).toBe(false);
  });

  test("validateStepTwo: backupHours over max fails", () => {
    const errors = validateStepTwo({ backupHours: 30 });
    expect(isStepValid(errors)).toBe(false);
  });
});
