/**
 * loadCalculator.constants.js
 *
 * Data model for the Load Calculator, reverse-engineered from the reference
 * tool (luminousindia.com/load-calculator). The appliance catalog, wattages
 * and property-type presets below were extracted directly from that page's
 * embedded data payload, so they match the reference byte-for-byte. The
 * inverter/battery catalogs are real Luminous product tiers (name, VA, real
 * continuous Watt rating, DC bus voltage, series battery count) pulled from
 * the same site's public product API.
 *
 * Nothing in utils/services/components should hardcode a wattage, VA rating,
 * or Ah rating — it all lives here.
 */

// ---------------------------------------------------------------------------
// Appliance catalog
// ---------------------------------------------------------------------------
// `type` mirrors the reference tool's own classification, used to drive the
// "All Device / Essential Load / Heavy Load" filter tabs. It has no effect
// on the load calculation itself — filtering only changes which appliances
// are visible, never which ones count toward the total.

export const LOAD_TYPES = {
  ALL: 'all',
  ESSENTIAL: 'essential_load',
  HEAVY: 'heavy_load',
};

export const LOAD_TYPE_TABS = [
  { id: LOAD_TYPES.ALL, label: 'All Device' },
  { id: LOAD_TYPES.ESSENTIAL, label: 'Essential Load' },
  { id: LOAD_TYPES.HEAVY, label: 'Heavy Load' },
];

export const APPLIANCE_CATEGORIES = [
  {
    id: 'lights',
    name: 'Lights',
    icon: 'Lightbulb',
    appliances: [
      { id: 'led-bulb-5w', name: 'LED Bulb ( 5W )', watt: 5, type: LOAD_TYPES.ESSENTIAL },
      { id: 'led-bulb-10w', name: 'LED Bulb ( 10W )', watt: 10, type: LOAD_TYPES.ESSENTIAL },
      { id: 'led-bulb-15w', name: 'LED Bulb ( 15W )', watt: 15, type: LOAD_TYPES.ESSENTIAL },
      { id: 'tubelight', name: 'Tubelight', watt: 45, type: LOAD_TYPES.ESSENTIAL },
      { id: 'incandescent-bulb', name: 'Incandescent Bulb', watt: 30, type: LOAD_TYPES.ESSENTIAL },
      { id: 'table-lamp', name: 'Table Lamp', watt: 60, type: LOAD_TYPES.ESSENTIAL },
      { id: 'panel-lights', name: 'Panel Lights', watt: 14, type: LOAD_TYPES.ESSENTIAL },
    ],
  },
  {
    id: 'home-appliances',
    name: 'Home Appliances',
    icon: 'Home',
    appliances: [
      { id: 'led-tv', name: 'LED TV', watt: 65, type: LOAD_TYPES.ESSENTIAL },
      { id: 'electric-iron', name: 'Electric Iron', watt: 1200, type: LOAD_TYPES.HEAVY },
      { id: 'hair-appliances', name: 'Hair Appliances', watt: 1600, type: LOAD_TYPES.HEAVY },
      { id: 'ceiling-fan', name: 'Ceiling Fan', watt: 80, type: LOAD_TYPES.ESSENTIAL },
      { id: 'printer-laser', name: 'Printer - Laser', watt: 200, type: LOAD_TYPES.ESSENTIAL },
      { id: 'computer', name: 'Computer', watt: 200, type: LOAD_TYPES.ESSENTIAL },
      { id: 'set-top-box', name: 'Set Top Box', watt: 50, type: LOAD_TYPES.ESSENTIAL },
      { id: 'wifi-router', name: 'WiFi Router', watt: 20, type: LOAD_TYPES.ESSENTIAL },
      { id: 'speaker', name: 'Speaker', watt: 80, type: LOAD_TYPES.ESSENTIAL },
    ],
  },
  {
    id: 'kitchen-appliances',
    name: 'Kitchen Appliances',
    icon: 'ChefHat',
    appliances: [
      { id: 'fridge-200l', name: 'Fridge (Upto 200L)', watt: 200, type: LOAD_TYPES.ESSENTIAL },
      { id: 'fridge-500l', name: 'Fridge (Upto 500L)', watt: 335, type: LOAD_TYPES.ESSENTIAL },
      { id: 'microwave-oven', name: 'Microwave Oven', watt: 900, type: LOAD_TYPES.HEAVY },
      { id: 'mixer-grinder', name: 'Mixer/Grinder', watt: 800, type: LOAD_TYPES.HEAVY },
      { id: 'blender', name: 'Blender', watt: 420, type: LOAD_TYPES.ESSENTIAL },
      { id: 'water-purifier', name: 'Water Purifier', watt: 90, type: LOAD_TYPES.ESSENTIAL },
      { id: 'exhaust-fan', name: 'Exhuast Fan', watt: 40, type: LOAD_TYPES.ESSENTIAL },
      { id: 'coffee-maker', name: 'Coffee Maker', watt: 1300, type: LOAD_TYPES.HEAVY },
      { id: 'dishwasher', name: 'Dishwasher', watt: 1800, type: LOAD_TYPES.HEAVY },
      { id: 'induction-cooktop', name: 'Induction Cooktop', watt: 1200, type: LOAD_TYPES.HEAVY },
    ],
  },
  {
    id: 'heavy-load-appliances',
    name: 'Heavy Load Appliances',
    icon: 'Zap',
    appliances: [
      { id: 'ac-1-ton', name: 'Air Conditioner (1 Ton)', watt: 1000, type: LOAD_TYPES.HEAVY },
      { id: 'ac-1-5-ton', name: 'Air Conditioner (1.5 Ton)', watt: 1500, type: LOAD_TYPES.HEAVY },
      { id: 'washing-machine', name: 'Washing Machine', watt: 520, type: LOAD_TYPES.HEAVY },
      { id: 'room-cooler-bldc', name: 'Room Cooler (BLDC)', watt: 120, type: LOAD_TYPES.ESSENTIAL },
      { id: 'geyser', name: 'Geyser', watt: 2000, type: LOAD_TYPES.HEAVY },
      { id: 'air-purifier', name: 'Air Purifier', watt: 215, type: LOAD_TYPES.ESSENTIAL },
      { id: 'game-console', name: 'Game Console', watt: 75, type: LOAD_TYPES.ESSENTIAL },
      { id: 'vacuum-cleaner', name: 'Vacuum Cleaner', watt: 1400, type: LOAD_TYPES.HEAVY },
      { id: 'room-heater', name: 'Room Heater', watt: 2200, type: LOAD_TYPES.HEAVY },
      { id: 'kettle', name: 'Kettle', watt: 1200, type: LOAD_TYPES.HEAVY },
      { id: 'toaster', name: 'Toaster', watt: 800, type: LOAD_TYPES.HEAVY },
    ],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: 'Plug',
    appliances: [
      { id: 'phone-charger', name: 'Phone Charger', watt: 40, type: LOAD_TYPES.ESSENTIAL },
      { id: 'laptop', name: 'Laptop', watt: 45, type: LOAD_TYPES.ESSENTIAL },
      { id: 'cctv-camera', name: 'CCTV Camera', watt: 100, type: LOAD_TYPES.ESSENTIAL },
    ],
  },
];

// Flat lookup: applianceId -> appliance record (with its parent category id).
export const APPLIANCE_INDEX = APPLIANCE_CATEGORIES.reduce((acc, category) => {
  category.appliances.forEach((appliance) => {
    acc[appliance.id] = { ...appliance, categoryId: category.id };
  });
  return acc;
}, {});

// Per-appliance quantity ceiling (UX guard, not a physical constraint).
export const MAX_APPLIANCE_QUANTITY = 20;

// ---------------------------------------------------------------------------
// Property type presets
// ---------------------------------------------------------------------------
// Selecting a preset fills in the quantities below exactly as the reference
// tool does; "Custom" clears every quantity back to 0 for manual entry.

export const PROPERTY_TYPES = [
  { id: '2bhk', label: '2 BHK' },
  { id: '3bhk', label: '3 BHK' },
  { id: '4bhk', label: '4 BHK' },
  { id: 'custom', label: 'Custom' },
];

export const PROPERTY_TYPE_PRESETS = {
  '2bhk': {
    'ceiling-fan': 2,
    laptop: 1,
    'led-bulb-5w': 3,
    tubelight: 2,
    'led-tv': 1,
    'phone-charger': 2,
    'set-top-box': 1,
    'wifi-router': 1,
    'water-purifier': 1,
    'room-cooler-bldc': 1,
    'fridge-200l': 1,
    computer: 1,
  },
  '3bhk': {
    'ceiling-fan': 3,
    laptop: 2,
    'led-bulb-5w': 4,
    tubelight: 3,
    'led-tv': 1,
    'phone-charger': 3,
    'set-top-box': 1,
    'wifi-router': 1,
    'exhaust-fan': 1,
    'water-purifier': 1,
    'ac-1-ton': 1,
    'fridge-200l': 1,
    'room-cooler-bldc': 1,
  },
  '4bhk': {
    'ceiling-fan': 4,
    laptop: 2,
    'led-bulb-5w': 5,
    tubelight: 4,
    'led-tv': 2,
    'phone-charger': 2,
    'set-top-box': 1,
    'wifi-router': 1,
    'exhaust-fan': 1,
    'water-purifier': 1,
    'ac-1-5-ton': 1,
    blender: 1,
    'room-cooler-bldc': 1,
    'fridge-200l': 1,
  },
  custom: {},
};

// ---------------------------------------------------------------------------
// Backup requirement input
// ---------------------------------------------------------------------------

export const BACKUP_HOURS_LIMITS = { min: 1, max: 10, step: 1, default: 5 };

// ---------------------------------------------------------------------------
// Core formula constants
// ---------------------------------------------------------------------------

/**
 * Real-to-apparent power conversion used to size the inverter: household
 * loads mix resistive (PF ~1) and inductive (fans/pumps/motors, PF < 1)
 * appliances, so inverters are marketed and selected by VA, not Watts.
 *
 *   requiredVA = totalRunningLoadWatts / POWER_FACTOR
 *
 * Reverse-engineered from the reference tool itself: a 1135W load was
 * recommended the "EVO D 1650" (1500 VA / 1260 W), skipping the smaller
 * "EVO S 1550" (1400 VA / 1176 W) even though 1176 W already covers 1135 W.
 * That only makes sense if selection runs on VA: 1135 / 0.8 = 1418.75 VA,
 * which clears the 1500 VA tier but not the 1400 VA one — an exact match
 * for the standard 0.8 power factor used across the Indian inverter industry.
 */
export const POWER_FACTOR = 0.8;

/**
 * Combined battery sizing derate: round-trip inverter/charging efficiency
 * plus a depth-of-discharge safety margin folded into one factor, so the
 * battery is never sized assuming 100% of its rated Ah is usable.
 *
 * Calibrated against the reference tool's own output: a 1135W load on a
 * 24V-bus inverter for a 5 hour backup came back recommending a 300 Ah
 * battery. Required current = 1135W / 24V = 47.29A; over 5 hours that is
 * 236.5 raw Ah; 236.5 / 0.8 = 295.6, which rounds up to the next catalog
 * tier (300 Ah) — an exact match.
 */
export const BATTERY_DERATE_FACTOR = 0.8;

// ---------------------------------------------------------------------------
// Inverter catalog
// ---------------------------------------------------------------------------
// Real Luminous home-inverter tiers (name, marketed VA rating, and the
// product spec sheet's actual continuous Watt rating / DC bus voltage /
// series battery count). Sorted ascending by va — selection picks the
// smallest tier whose VA rating covers the required apparent power.
export const INVERTER_CATALOG = [
  { id: 'evo-d-700', label: 'EVO D 700', va: 600, watt: 504, busVoltage: 12, batteryCount: 1 },
  { id: 'evo-s-850', label: 'EVO S 850', va: 700, watt: 560, busVoltage: 12, batteryCount: 1 },
  { id: 'evo-d-900', label: 'EVO D 900', va: 800, watt: 672, busVoltage: 12, batteryCount: 1 },
  { id: 'evo-d-1050', label: 'EVO D 1050', va: 900, watt: 756, busVoltage: 12, batteryCount: 1 },
  { id: 'evo-d-1250', label: 'EVO D 1250', va: 1100, watt: 924, busVoltage: 12, batteryCount: 1 },
  { id: 'evo-s-1550', label: 'EVO S 1550', va: 1400, watt: 1176, busVoltage: 12, batteryCount: 1 },
  { id: 'evo-d-1650', label: 'EVO D 1650', va: 1500, watt: 1260, busVoltage: 24, batteryCount: 2 },
  { id: 'evo-s-2300', label: 'EVO S 2300', va: 2000, watt: 1600, busVoltage: 24, batteryCount: 2 },
  { id: 'optimus-2800-plus', label: 'Optimus 2800+', va: 2500, watt: 2000, busVoltage: 24, batteryCount: 2 },
  { id: 'optimus-3500-plus', label: 'Optimus 3500+', va: 3000, watt: 2400, busVoltage: 24, batteryCount: 2 },
  { id: 'optimus-3800-plus', label: 'Optimus 3800+', va: 3500, watt: 2800, busVoltage: 36, batteryCount: 3 },
  { id: 'optimus-4300-plus', label: 'Optimus 4300+', va: 4000, watt: 3200, busVoltage: 36, batteryCount: 3 },
  { id: 'optimus-6000-plus', label: 'Optimus 6000+', va: 5500, watt: 4000, busVoltage: 48, batteryCount: 4 },
  { id: 'optimus-8000-plus', label: 'Optimus 8000+', va: 7500, watt: 6000, busVoltage: 96, batteryCount: 8 },
  { id: 'optimus-11000-plus', label: 'Optimus 11000+', va: 10000, watt: 8000, busVoltage: 120, batteryCount: 10 },
];

// ---------------------------------------------------------------------------
// Battery catalog
// ---------------------------------------------------------------------------
// Real Luminous tubular-battery Ah tiers (12V per unit — the unit the
// inverter tiers above wire in series to reach their DC bus voltage).
// Sorted ascending by ah — selection picks the smallest tier whose Ah
// covers the required per-battery Ah.
export const BATTERY_CATALOG = [
  { id: 'inverlast-ilst-10036', label: 'Inverlast ILST 10036', ah: 80 },
  { id: 'inverlast-ilst-12042', label: 'Inverlast ILST 12042', ah: 100 },
  { id: 'red-charge-rc-15000-pro', label: 'Red Charge RC 15000 Pro', ah: 120 },
  { id: 'red-charge-rc-16000-pro', label: 'Red Charge RC 16000 Pro', ah: 135 },
  { id: 'inverlast-iltt-18060-pro', label: 'Inverlast ILTT 18060 PRO', ah: 150 },
  { id: 'inverlast-iltt-20060', label: 'Inverlast ILTT 20060', ah: 160 },
  { id: 'inverlast-iltt-24060', label: 'Inverlast ILTT 24060', ah: 180 },
  { id: 'inverlast-iltt-25060', label: 'Inverlast ILTT 25060', ah: 200 },
  { id: 'inverlast-iltt-26060', label: 'Inverlast ILTT 26060', ah: 220 },
  { id: 'inverlast-iltt-28060', label: 'Inverlast ILTT 28060', ah: 250 },
  { id: 'inverlast-iltt-32060', label: 'Inverlast ILTT 32060', ah: 300 },
];

// ---------------------------------------------------------------------------
// UI copy
// ---------------------------------------------------------------------------

export const STEPS = {
  APPLIANCES: 'appliances',
  RESULT: 'result',
};
