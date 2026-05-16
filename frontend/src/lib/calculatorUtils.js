/**
 * Frontend calculator utility
 * Calculates solar system size, costs, subsidy, and 25-year savings
 */

export const calculateSavings = (monthly_bill, property_type = "residential") => {
  const bill = monthly_bill;
  const avg_tariff = 8.0;
  const monthly_units = bill / avg_tariff;
  const units_per_kw_month = 135.0;
  const system_size_kw = Math.max(1.0, Math.round((monthly_units / units_per_kw_month) * 10) / 10);

  const cost_per_kw = 60000.0;
  const estimated_cost = system_size_kw * cost_per_kw;

  // PM Surya Ghar Subsidy calculation
  let subsidy = 0.0;
  if (property_type === "residential") {
    if (system_size_kw <= 1) {
      subsidy = 30000.0;
    } else if (system_size_kw <= 2) {
      subsidy = 60000.0;
    } else if (system_size_kw <= 3) {
      subsidy = 78000.0;
    } else {
      subsidy = 85800.0;
    }
  }

  const net_cost = Math.max(0.0, estimated_cost - subsidy);
  const monthly_generation_kwh = system_size_kw * units_per_kw_month;
  const annual_savings = Math.min(monthly_generation_kwh * 12 * avg_tariff, bill * 12);
  const payback_years = annual_savings > 0 ? Math.round((net_cost / annual_savings) * 10) / 10 : 0.0;
  const co2_offset_kg = monthly_generation_kwh * 12 * 0.82;
  const lifetime_savings_25y = annual_savings * 25;

  return {
    system_size_kw: system_size_kw,
    estimated_cost: Math.round(estimated_cost * 100) / 100,
    subsidy: Math.round(subsidy * 100) / 100,
    net_cost: Math.round(net_cost * 100) / 100,
    annual_savings: Math.round(annual_savings * 100) / 100,
    payback_years: payback_years,
    co2_offset_kg: Math.round(co2_offset_kg * 100) / 100,
    lifetime_savings_25y: Math.round(lifetime_savings_25y * 100) / 100,
    monthly_generation_kwh: Math.round(monthly_generation_kwh * 100) / 100,
  };
};
