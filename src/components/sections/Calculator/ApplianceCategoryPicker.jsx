import { Lightbulb, Home, ChefHat, Zap, Plug } from "lucide-react";
import ApplianceRow from "./ApplianceRow";
import { LOAD_TYPES, LOAD_TYPE_TABS } from "./loadCalculator.constants";

const CATEGORY_ICONS = { Lightbulb, Home, ChefHat, Zap, Plug };

/**
 * Category tab strip + the essential/heavy load type filter + the
 * appliance grid for whichever category is currently active. Only one
 * category's appliances are shown at a time, exactly like the reference
 * tool.
 */
export default function ApplianceCategoryPicker({
  categories,
  activeCategoryId,
  onCategoryChange,
  loadTypeFilter,
  onLoadTypeFilterChange,
  quantities,
  onQuantityDelta,
}) {
  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  const ActiveIcon = CATEGORY_ICONS[activeCategory.icon] || Zap;
  const visibleAppliances = activeCategory.appliances.filter(
    (a) => loadTypeFilter === LOAD_TYPES.ALL || a.type === loadTypeFilter
  );

  return (
    <div>
      {/* Essential / Heavy / All filter */}
      <div className="flex gap-6 border-b border-slate-200" role="tablist" aria-label="Filter by load type">
        {LOAD_TYPE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={loadTypeFilter === tab.id}
            onClick={() => onLoadTypeFilterChange(tab.id)}
            data-testid={`load-type-tab-${tab.id}`}
            className={`pb-2.5 -mb-px text-sm font-bold border-b-2 transition-colors ${
              loadTypeFilter === tab.id
                ? "border-[#F26A21] text-[#F26A21]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 py-4" role="tablist" aria-label="Appliance categories">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon] || Zap;
          const isActive = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category.id)}
              data-testid={`category-tab-${category.id}`}
              className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl text-center transition-colors ${
                isActive ? "bg-[#F26A21] text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span className="text-xs font-bold leading-tight whitespace-nowrap">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Appliance grid for the active category */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        data-testid="appliance-list"
      >
        {visibleAppliances.length === 0 ? (
          <p className="col-span-full text-sm text-slate-400 text-center py-6">
            No appliances in this category match the selected filter.
          </p>
        ) : (
          visibleAppliances.map((appliance) => (
            <ApplianceRow
              key={appliance.id}
              appliance={appliance}
              icon={ActiveIcon}
              quantity={quantities[appliance.id] || 0}
              onDelta={onQuantityDelta}
            />
          ))
        )}
      </div>
    </div>
  );
}
