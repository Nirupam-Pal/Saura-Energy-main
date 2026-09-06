/**
 * loadCalculator.service.js
 *
 * Thin service layer between the UI and the calculation logic.
 *
 * A pure frontend calculator doesn't strictly need a backend — the reference
 * tool's math is simple enough to run entirely client-side. This service
 * exists so that:
 *   1. The UI never imports calculation utils directly (easier to swap in
 *      a real API later without touching components).
 *   2. If/when you add a backend (e.g. to log leads, or centralize the
 *      catalog so the mobile app and web app never drift), you only change
 *      USE_BACKEND + the fetch call below.
 *
 * Payload shape: { quantities: { [applianceId]: qty }, backupHours: number }
 */

import { computeLoadCalculation } from './loadCalculator.utils';

// Toggle this once a real backend endpoint exists.
const USE_BACKEND = false;
const API_ENDPOINT = '/api/load-calculator/calculate';

/**
 * Runs the load calculation. Same signature/return shape regardless of
 * whether it's computed locally or fetched from an API, so callers never
 * need to know which mode is active.
 */
export async function getLoadCalculation(payload) {
  if (!USE_BACKEND) {
    return computeLoadCalculation(payload);
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Fail gracefully back to client-side calc rather than breaking the flow.
    console.error('Load calculator API failed, falling back to local calc.');
    return computeLoadCalculation(payload);
  }

  return response.json();
}
