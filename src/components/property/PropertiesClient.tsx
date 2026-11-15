"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  BedDouble,
  Home,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";
import { mockProperties } from "@/data/mockProperties";
import { usePropertyFilter } from "@/hooks/usePropertyFilter";
import PropertyCard from "@/components/property/PropertyCard";
import type { PropertyType } from "@/types";

const PROPERTY_TYPES: { label: string; value: PropertyType }[] = [
  { label: "Apartment", value: "apartment" },
  { label: "Duplex", value: "duplex" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Mansion", value: "mansion" },
  { label: "Terrace", value: "terrace" },
  { label: "Villa", value: "villa" },
  { label: "Land", value: "land" },
  { label: "Commercial", value: "commercial" },
];

const PAGE_SIZE = 9;

const FILTER_LABEL =
  "text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-700";

export default function PropertiesClient() {
  const searchParams = useSearchParams();
  const {
    filters,
    filtered,
    availableAreas,
    hasActiveFilters,
    setBuyOrRent,
    toggleLocation,
    togglePropertyType,
    setPriceRange,
    setBedrooms,
    setSearch,
    resetFilters,
    setFilters,
  } = usePropertyFilter(mockProperties);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const visibleProperties = filtered.slice(0, visibleCount);

  useEffect(() => {
    const buyOrRent = searchParams.get("buyOrRent");
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    setFilters((prev) => {
      const next = { ...prev };
      if (buyOrRent === "Buy" || buyOrRent === "Rent") next.buyOrRent = buyOrRent;
      if (location) {
        next.locations = decodeURIComponent(location)
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean);
      }
      if (type) next.propertyTypes = [type as PropertyType];
      if (minPrice) next.minPrice = Number(minPrice);
      if (maxPrice) next.maxPrice = Number(maxPrice);
      return next;
    });
  }, [searchParams, setFilters]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-10 md:px-10 md:pt-14 lg:px-16">
      {/* Page header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">
            <span className="h-px w-8 bg-gold-400" />
            The Portfolio
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em] text-ink md:text-4xl">
            Available Properties
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-700">
            Browse our curated collection of verified homes across Lagos and
            Abuja. Every listing is inspected by our advisors before it reaches
            you.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-ink-700">
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "property" : "properties"} available
          </p>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex min-h-11 items-center gap-1.5 rounded-lg border border-line-strong px-4 text-xs font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-canvas-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter panel */}
      <div className="mt-8 rounded-2xl border border-line bg-canvas-card p-5 shadow-soft md:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            {/* Listing type */}
            <div className="shrink-0">
              <p className={FILTER_LABEL}>Listing Type</p>
              <div className="mt-2 inline-flex rounded-lg border border-line bg-canvas-muted p-1">
                {(["All", "Buy", "Rent"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBuyOrRent(opt)}
                    className={`min-h-11 rounded-md px-5 text-xs font-semibold transition-colors duration-200 ${
                      filters.buyOrRent === opt
                        ? "bg-ink text-canvas"
                        : "text-ink-700 hover:text-ink"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="min-w-0 flex-1">
              <p className={`${FILTER_LABEL} flex items-center gap-1.5`}>
                <MapPin className="h-3 w-3" />
                Location
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {availableAreas.map((area) => {
                  const active = filters.locations.includes(area);
                  return (
                    <button
                      key={area}
                      onClick={() => toggleLocation(area)}
                      className={`min-h-11 rounded-lg border px-3 text-[11px] font-medium transition-colors duration-200 ${
                        active
                          ? "border-ink bg-gold-50 text-ink"
                          : "border-line text-ink-700 hover:border-ink/40"
                      }`}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Keyword search */}
          <div className="border-t border-line pt-5">
            <label
              htmlFor="property-search"
              className={`${FILTER_LABEL} flex items-center gap-1.5`}
            >
              <Search className="h-3 w-3" />
              Keyword Search
            </label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700" />
              <input
                id="property-search"
                type="search"
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, area, or feature..."
                className="min-h-11 w-full rounded-lg border border-line bg-canvas pl-10 pr-10 text-sm text-ink outline-none transition-colors placeholder:text-ink-700/60 hover:border-ink/40 focus:border-ink"
              />
              {filters.search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-700 hover:bg-canvas-muted hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-5 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
            {/* Property type */}
            <div>
              <p className={`${FILTER_LABEL} flex items-center gap-1.5`}>
                <Home className="h-3 w-3" />
                Property Type
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PROPERTY_TYPES.map((t) => {
                  const active = filters.propertyTypes.includes(t.value);
                  return (
                    <button
                      key={t.value}
                      onClick={() => togglePropertyType(t.value)}
                      className={`min-h-11 rounded-lg border px-3 text-[11px] font-medium transition-colors duration-200 ${
                        active
                          ? "border-ink bg-gold-50 text-ink"
                          : "border-line text-ink-700 hover:border-ink/40"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <p className={`${FILTER_LABEL} flex items-center gap-1.5`}>
                <BedDouble className="h-3 w-3" />
                Bedrooms
              </p>
              <div className="mt-2 flex gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setBedrooms(n, 20)}
                    aria-label={n === 0 ? "Any number of bedrooms" : `${n} or more bedrooms`}
                    className={`flex h-11 w-11 items-center justify-center rounded-lg border text-[11px] font-semibold transition-colors duration-200 ${
                      filters.minBedrooms === n && filters.maxBedrooms === 20
                        ? "border-ink bg-ink text-canvas"
                        : "border-line text-ink-700 hover:border-ink/40"
                    }`}
                  >
                    {n === 0 ? "Any" : `${n}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className={`${FILTER_LABEL} flex items-center gap-1.5`}>
                <Search className="h-3 w-3" />
                Price Range
              </p>
              <select
                onChange={(e) => {
                  const [min, max] = e.target.value.split(",").map(Number);
                  setPriceRange(min || 0, max || Infinity);
                }}
                className="mt-2 min-h-11 w-full cursor-pointer appearance-none rounded-lg border border-line bg-canvas px-3 text-[11px] font-medium text-ink outline-none transition-colors hover:border-ink/40 focus:border-ink lg:w-auto"
                defaultValue="0,Infinity"
                aria-label="Price range"
              >
                <option value="0,Infinity">Any Price</option>
                <option value="0,10000000">Under &#x20A6;10M</option>
                <option value="10000000,50000000">&#x20A6;10M &#x2013; &#x20A6;50M</option>
                <option value="50000000,200000000">&#x20A6;50M &#x2013; &#x20A6;200M</option>
                <option value="200000000,500000000">&#x20A6;200M &#x2013; &#x20A6;500M</option>
                <option value="500000000,1000000000">&#x20A6;500M &#x2013; &#x20A6;1B</option>
                <option value="1000000000,Infinity">Above &#x20A6;1B</option>
              </select>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-line pt-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-700">
              Active:
            </span>
            {filters.buyOrRent !== "All" && (
              <span className="inline-flex min-h-9 items-center gap-1 rounded-full border border-line bg-gold-50 px-3 text-[11px] font-semibold text-ink">
                {filters.buyOrRent}
                <button
                  onClick={() => setBuyOrRent("All")}
                  aria-label={`Remove ${filters.buyOrRent} filter`}
                  className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full hover:bg-ink/5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.search.trim() && (
              <span className="inline-flex min-h-9 items-center gap-1 rounded-full border border-line bg-canvas-muted px-3 text-[11px] font-semibold text-ink">
                &ldquo;{filters.search.trim()}&rdquo;
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear keyword search"
                  className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full hover:bg-ink/5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex min-h-9 items-center gap-1 rounded-full border border-line bg-canvas-muted px-3 text-[11px] font-semibold text-ink"
              >
                {loc}
                <button
                  onClick={() => toggleLocation(loc)}
                  aria-label={`Remove ${loc} filter`}
                  className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full hover:bg-ink/5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {filters.propertyTypes.map((t) => (
              <span
                key={t}
                className="inline-flex min-h-9 items-center gap-1 rounded-full border border-line bg-gold-50 px-3 text-[11px] font-semibold capitalize text-ink"
              >
                {t}
                <button
                  onClick={() => togglePropertyType(t)}
                  aria-label={`Remove ${t} filter`}
                  className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full hover:bg-ink/5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-line bg-canvas-muted/60 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-canvas-card shadow-soft">
            <SlidersHorizontal className="h-6 w-6 text-ink-700" />
          </div>
          <h2 className="font-display text-xl font-medium text-ink">
            No Properties Match Your Filters
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-ink-700">
            Try widening your search criteria, or{" "}
            <button
              onClick={resetFilters}
              className="font-semibold text-[var(--brand-cta)] underline-offset-4 hover:underline"
            >
              clear all filters
            </button>{" "}
            to view the full collection.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex items-center gap-2 text-[11px] font-medium text-ink-700">
            <ShieldCheck className="h-4 w-4 text-forest" />
            Every property below has passed our title and condition review.
          </div>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="mt-10 flex flex-col items-center gap-2.5">
              <button
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink px-8 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-canvas"
              >
                Load More Properties
              </button>
              <p className="text-xs text-ink-700">
                Showing {visibleProperties.length} of {filtered.length}{" "}
                {filtered.length === 1 ? "property" : "properties"}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
