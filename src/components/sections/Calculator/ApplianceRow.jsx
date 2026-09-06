import { Minus, Plus } from "lucide-react";
import { MAX_APPLIANCE_QUANTITY } from "./loadCalculator.constants";

/**
 * A single appliance card: icon, name, unit wattage and a +/- quantity
 * stepper. Rendered inside a responsive grid by ApplianceCategoryPicker.
 */
export default function ApplianceRow({ appliance, quantity, onDelta, icon: Icon }) {
  const decrement = () => onDelta(appliance.id, -1);
  const increment = () => onDelta(appliance.id, 1);

  return (
    <div
      data-testid={`appliance-row-${appliance.id}`}
      className={`flex flex-col justify-between gap-3 p-4 rounded-xl border transition-colors ${
        quantity > 0 ? "border-[#F26A21]/40 bg-[#F26A21]/5" : "border-slate-200 bg-white"
      }`}
    >
      <div className="min-w-0">
        {Icon && <Icon className="h-5 w-5 text-slate-400 mb-2" />}
        <div className="text-sm font-bold text-slate-800 leading-snug">{appliance.name}</div>
        <div className="mt-0.5 text-xs text-slate-400 font-medium">{appliance.watt}W</div>
      </div>

      <div
        className="flex items-center justify-end gap-2"
        role="group"
        aria-label={`Quantity for ${appliance.name}`}
      >
        <button
          type="button"
          onClick={decrement}
          disabled={quantity === 0}
          aria-label={`Decrease ${appliance.name}`}
          data-testid={`decrease-${appliance.id}`}
          className="h-7 w-7 grid place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span
          data-testid={`quantity-${appliance.id}`}
          className="w-5 text-center text-sm font-bold text-slate-800 tabular-nums"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={quantity >= MAX_APPLIANCE_QUANTITY}
          aria-label={`Increase ${appliance.name}`}
          data-testid={`increase-${appliance.id}`}
          className="h-7 w-7 grid place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
