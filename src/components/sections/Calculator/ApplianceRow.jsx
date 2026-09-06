import { Minus, Plus } from "lucide-react";
import { MAX_APPLIANCE_QUANTITY } from "./loadCalculator.constants";

/**
 * A single appliance line: name, unit wattage, running subtotal (once
 * quantity > 0) and a +/- quantity stepper. Mirrors the reference tool's
 * per-appliance row exactly (wattage badge, live subtotal, stepper).
 */
export default function ApplianceRow({ appliance, quantity, onDelta }) {
  const subtotal = appliance.watt * quantity;

  const decrement = () => onDelta(appliance.id, -1);
  const increment = () => onDelta(appliance.id, 1);

  return (
    <div
      data-testid={`appliance-row-${appliance.id}`}
      className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-colors ${
        quantity > 0 ? "border-[#F26A21]/30 bg-[#F26A21]/5" : "border-slate-100 bg-white"
      }`}
    >
      <div className="min-w-0">
        <div className="text-sm font-bold text-slate-800 truncate">{appliance.name}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span>{appliance.watt}W</span>
          {quantity > 0 && (
            <>
              <span className="text-slate-300">&bull;</span>
              <span className="text-[#1B3A8C] font-bold">{subtotal}W</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0" role="group" aria-label={`Quantity for ${appliance.name}`}>
        <button
          type="button"
          onClick={decrement}
          disabled={quantity === 0}
          aria-label={`Decrease ${appliance.name}`}
          data-testid={`decrease-${appliance.id}`}
          className="h-8 w-8 grid place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span
          data-testid={`quantity-${appliance.id}`}
          className="w-7 text-center text-sm font-bold text-slate-800 tabular-nums"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={quantity >= MAX_APPLIANCE_QUANTITY}
          aria-label={`Increase ${appliance.name}`}
          data-testid={`increase-${appliance.id}`}
          className="h-8 w-8 grid place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
