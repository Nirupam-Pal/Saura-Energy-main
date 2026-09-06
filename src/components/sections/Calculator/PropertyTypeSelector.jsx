import { PROPERTY_TYPES } from "./loadCalculator.constants";

/**
 * "Choose Your Property Type" preset picker. Selecting 2/3/4 BHK fills in
 * a realistic appliance mix (see PROPERTY_TYPE_PRESETS); "Custom" clears
 * every quantity back to 0 so the user can build their own list.
 */
export default function PropertyTypeSelector({ activePropertyType, onSelect }) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-800 mb-3">Choose Your Property Type</p>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Property type">
        {PROPERTY_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            role="tab"
            aria-selected={activePropertyType === type.id}
            onClick={() => onSelect(type.id)}
            data-testid={`property-type-${type.id}`}
            className={`px-5 py-2 rounded-full text-sm font-bold border transition-colors ${
              activePropertyType === type.id
                ? "bg-[#F26A21] border-[#F26A21] text-white shadow-md"
                : "bg-white border-slate-200 text-slate-600 hover:border-[#F26A21]/40"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
