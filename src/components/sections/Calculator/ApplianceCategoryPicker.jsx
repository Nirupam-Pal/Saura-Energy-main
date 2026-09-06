import { Lightbulb, Home, ChefHat, Zap, Plug } from "lucide-react";
import ApplianceRow from "./ApplianceRow";
import { LOAD_TYPES, LOAD_TYPE_TABS } from "./loadCalculator.constants";

const CATEGORY_ICONS = { Lightbulb, Home, ChefHat, Zap, Plug };

/**
 * Category tab strip (with live per-category wattage badges) + the
 * essential/heavy load type filter + the appliance list for whichever
 * category is currently active. Only one category's appliances are shown
 * at a time, exactly like the reference tool.
 */
export default function ApplianceCategoryPicker({
  categories,
  activeCategoryId,
  onCategoryChange,
  loadTypeFilter,
  onLoadTypeFilterChange,
  categoryLoads,
  quantities,
  onQuantityDelta,
}) {
  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  const visibleAppliances = activeCategory.appliances.filter(
    (a) => loadTypeFilter === LOAD_TYPES.ALL || a.type === loadTypeFilter
  );

  return (
    <div>
      {/* Essential / Heavy / All filter */}
      <div className="flex gap-2 mb-4" role="tablist" aria-label="Filter by load type">
        {LOAD_TYPE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={loadTypeFilter === tab.id}
            onClick={() => onLoadTypeFilterChange(tab.id)}
            data-testid={`load-type-tab-${tab.id}`}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              loadTypeFilter === tab.id
                ? "bg-[#0A1128] text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category tabs */}
      <div className="grid grid-cols-5 gap-2 mb-5" role="tablist" aria-label="Appliance categories">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon] || Zap;
          const isActive = category.id === activeCategoryId;
          const watts = categoryLoads[category.id] || 0;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category.id)}
              data-testid={`category-tab-${category.id}`}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-colors ${
                isActive
                  ? "border-[#F26A21] bg-[#F26A21]/5"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-[#F26A21]" : "text-slate-400"}`} />
              <span className={`text-[10px] font-bold leading-tight ${isActive ? "text-slate-900" : "text-slate-500"}`}>
                {category.name}
              </span>
              <span className="text-[10px] font-semibold text-[#1B3A8C]">{watts}W</span>
            </button>
          );
        })}
      </div>

      {/* Appliance list for the active category */}
      <div className="space-y-2.5" data-testid="appliance-list">
        {visibleAppliances.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">
            No appliances in this category match the selected filter.
          </p>
        ) : (
          visibleAppliances.map((appliance) => (
            <ApplianceRow
              key={appliance.id}
              appliance={appliance}
              quantity={quantities[appliance.id] || 0}
              onDelta={onQuantityDelta}
            />
          ))
        )}
      </div>
    </div>
  );
}
