/**
 * loadCalculator.utils.test.js
 *
 * Run with Jest or Vitest (both share this syntax).
 *
 * The 1135W / 5hr / EVO D 1650 / 300Ah scenario below is not a made-up
 * number — it is the exact result observed by driving the live reference
 * tool (luminousindia.com/load-calculator) with the same 2 BHK preset and
 * a 5 hour backup selection, so this test also guards against drift from
 * the reference tool's own behavior, not just internal regressions.
 */

import {
  clampQuantity,
  calculateApplianceLoad,
  calculateTotalLoad,
  calculateCategoryLoads,
  calculateRequiredVA,
  selectInverter,
  calculateRequiredAh,
  selectBattery,
  computeLoadCalculation,
  validateSelection,
  validateBackupHours,
  isStepValid,
} from "./loadCalculator.utils";
import { PROPERTY_TYPE_PRESETS } from "./loadCalculator.constants";

describe("clampQuantity", () => {
  test("clamps negative values to 0", () => {
    expect(clampQuantity(-5)).toBe(0);
  });
  test("clamps above the max ceiling", () => {
    expect(clampQuantity(999)).toBe(20);
  });
  test("coerces invalid input to 0", () => {
    expect(clampQuantity("")).toBe(0);
    expect(clampQuantity(NaN)).toBe(0);
  });
  test("rounds fractional input", () => {
    expect(clampQuantity(2.6)).toBe(3);
  });
});

describe("calculateApplianceLoad", () => {
  test("wattage * quantity", () => {
    expect(calculateApplianceLoad(80, 2)).toBe(160);
  });
  test("zero quantity -> zero load", () => {
    expect(calculateApplianceLoad(1500, 0)).toBe(0);
  });
});

describe("calculateTotalLoad + calculateCategoryLoads (2 BHK preset)", () => {
  const quantities = PROPERTY_TYPE_PRESETS["2bhk"];

  test("matches the reference tool's own total for the 2 BHK preset (1135W)", () => {
    expect(calculateTotalLoad(quantities)).toBe(1135);
  });

  test("per-category subtotals match the reference tool's category badges", () => {
    const loads = calculateCategoryLoads(quantities);
    expect(loads["lights"]).toBe(105); // 3x LED Bulb(5W) + 2x Tubelight
    expect(loads["home-appliances"]).toBe(495); // Ceiling Fan x2, Computer, Set Top Box, WiFi Router, LED TV
    expect(loads["kitchen-appliances"]).toBe(290); // Water Purifier + Fridge (200L)
    expect(loads["heavy-load-appliances"]).toBe(120); // Room Cooler (BLDC)
    expect(loads["accessories"]).toBe(125); // 2x Phone Charger + Laptop
  });

  test("unknown appliance ids are ignored rather than crashing", () => {
    expect(calculateTotalLoad({ "not-a-real-id": 5 })).toBe(0);
  });

  test("empty selection -> zero total", () => {
    expect(calculateTotalLoad({})).toBe(0);
  });
});

describe("calculateRequiredVA", () => {
  test("1135W / 0.8 power factor -> 1418.75 VA", () => {
    expect(calculateRequiredVA(1135)).toBe(1418.75);
  });
});

describe("selectInverter", () => {
  test("1418.75 VA required -> selects EVO D 1650 (1500 VA), matching the reference tool", () => {
    // The reference tool skips the smaller EVO S 1550 (1400 VA / 1176 W —
    // whose Watt rating alone would already cover 1135W) because selection
    // runs on VA, not Watts: 1135 / 0.8 = 1418.75 VA clears 1500 VA but not
    // the 1400 VA tier.
    const inv = selectInverter(1418.75);
    expect(inv.label).toBe("EVO D 1650");
    expect(inv.exceedsCatalog).toBe(false);
  });

  test("exact match on catalog boundary selects that tier, not the next one up", () => {
    const inv = selectInverter(1100);
    expect(inv.label).toBe("EVO D 1250");
  });

  test("load beyond the largest catalog entry flags exceedsCatalog", () => {
    const inv = selectInverter(50000);
    expect(inv.exceedsCatalog).toBe(true);
  });
});

describe("calculateRequiredAh", () => {
  test("1135W load, 5hr backup, 24V bus -> ~295.6 Ah (rounds up to 300 Ah tier)", () => {
    // current = 1135 / 24 = 47.29A; rawAh = 47.29 * 5 = 236.46; / 0.8 = 295.57
    const ah = calculateRequiredAh(1135, 5, 24);
    expect(ah).toBeCloseTo(295.57, 1);
  });

  test("0 hour backup -> 0 Ah required", () => {
    expect(calculateRequiredAh(1135, 0, 24)).toBe(0);
  });
});

describe("selectBattery", () => {
  test("295.57 Ah required -> selects the 300 Ah tier", () => {
    expect(selectBattery(295.57).ah).toBe(300);
  });
  test("exact match on catalog boundary selects that tier", () => {
    expect(selectBattery(200).ah).toBe(200);
  });
  test("exceeds largest catalog entry -> flags exceedsCatalog", () => {
    expect(selectBattery(9999).exceedsCatalog).toBe(true);
  });
});

describe("computeLoadCalculation (full pipeline, 2 BHK / 5hr reference scenario)", () => {
  test("reproduces the reference tool's exact recommendation", () => {
    const result = computeLoadCalculation({
      quantities: PROPERTY_TYPE_PRESETS["2bhk"],
      backupHours: 5,
    });

    expect(result.totalLoad).toBe(1135);
    expect(result.requiredVA).toBe(1418.75);
    expect(result.recommendedInverter.label).toBe("EVO D 1650");
    expect(result.recommendedBattery.ah).toBe(300);
    expect(result.batteryCount).toBe(2);
  });

  test("small selection: a couple of LED bulbs stays on the smallest inverter tier", () => {
    const result = computeLoadCalculation({
      quantities: { "led-bulb-5w": 2, "ceiling-fan": 1 },
      backupHours: 2,
    });
    // total = 2*5 + 80 = 90W
    expect(result.totalLoad).toBe(90);
    expect(result.recommendedInverter.label).toBe("EVO D 700");
  });

  test("heavy commercial-style load steps up the inverter tier", () => {
    const result = computeLoadCalculation({
      quantities: { "ac-1-5-ton": 2, geyser: 1 },
      backupHours: 4,
    });
    // total = 1500*2 + 2000 = 5000W; requiredVA = 6250
    expect(result.totalLoad).toBe(5000);
    expect(result.recommendedInverter.va).toBeGreaterThanOrEqual(result.requiredVA);
    expect(result.recommendedBattery.ah).toBeGreaterThanOrEqual(result.requiredAh);
  });
});

describe("validation", () => {
  test("empty selection returns an error", () => {
    const errors = validateSelection({});
    expect(isStepValid(errors)).toBe(false);
  });

  test("at least one appliance selected passes", () => {
    const errors = validateSelection({ "led-bulb-5w": 1 });
    expect(isStepValid(errors)).toBe(true);
  });

  test("backupHours below minimum returns an error message", () => {
    expect(validateBackupHours(0)).not.toBeNull();
  });

  test("backupHours above maximum returns an error message", () => {
    expect(validateBackupHours(15)).not.toBeNull();
  });

  test("backupHours within range returns null (valid)", () => {
    expect(validateBackupHours(5)).toBeNull();
  });

  test("empty backupHours returns an error message", () => {
    expect(validateBackupHours("")).not.toBeNull();
  });
});
