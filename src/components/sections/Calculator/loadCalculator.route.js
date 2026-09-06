/**
 * server/loadCalculator.route.js
 *
 * Optional Express route. Only needed if you want the calculation to run
 * server-side (e.g. to log leads, rate-limit abuse, or guarantee the web +
 * mobile clients can never drift out of sync on the formula/catalog).
 *
 * Reuses the exact same pure functions the frontend uses — the calc logic
 * lives in ONE place (utils/loadCalculator.utils.js) and is imported here,
 * never re-implemented, so server and client can never disagree.
 *
 * Wire-up (in your main server file):
 *   const loadCalculatorRoute = require('./loadCalculator.route');
 *   app.use('/api/load-calculator', loadCalculatorRoute);
 */

const express = require('express');
const router = express.Router();

// NOTE: if your build targets ESM only, swap this to:
// import { computeLoadCalculation, validateSelection, validateBackupHours, isStepValid } from '../utils/loadCalculator.utils.js';
const {
  computeLoadCalculation,
  validateSelection,
  validateBackupHours,
  isStepValid,
} = require('./loadCalculator.utils');

router.post('/calculate', (req, res) => {
  const { quantities, backupHours } = req.body || {};

  const selectionErrors = validateSelection(quantities);
  const backupError = validateBackupHours(backupHours);

  if (!isStepValid(selectionErrors) || backupError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: { ...selectionErrors, backupHours: backupError },
    });
  }

  try {
    const result = computeLoadCalculation({ quantities, backupHours });
    return res.status(200).json(result);
  } catch (err) {
    console.error('Load calculator computation error:', err);
    return res.status(500).json({ error: 'Calculation failed' });
  }
});

module.exports = router;
