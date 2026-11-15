"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, SlidersHorizontal } from "lucide-react";
import { PropertyType } from "@/types";

const LOCATIONS = [
  "Lekki Phase 1",
  "Lekki Phase 2",
  "Ikoyi",
  "Banana Island",
  "Victoria Island",
  "Eko Atlantic",
  "Ikeja GRA",
  "Ajah",
  "Sangotedo",
  "Ibeju-Lekki",
  "Maitama",
  "Guzape",
];

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

const PRICE_PRESETS = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under \u20A610M", min: 0, max: 10000000 },
  { label: "\u20A610M \u2013 \u20A650M", min: 10000000, max: 50000000 },
  { label: "\u20A650M \u2013 \u20A6200M", min: 50000000, max: 200000000 },
  { label: "\u20A6200M \u2013 \u20A6500M", min: 200000000, max: 500000000 },
  { label: "\u20A6500M \u2013 \u20A61B", min: 500000000, max: 1000000000 },
  { label: "Above \u20A61B", min: 1000000000, max: Infinity },
];

const STATS = [
  "200+ Verified Listings",
  "1,200+ Clients Served",
  "Complimentary VIP Inspections",
];

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Buy" | "Rent">("Buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceIndex, setPriceIndex] = useState(0);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("buyOrRent", activeTab);
    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType);
    const price = PRICE_PRESETS[priceIndex];
    if (price.min > 0) params.set("minPrice", String(price.min));
    if (price.max !== Infinity) params.set("maxPrice", String(price.max));
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/65 to-ink/85" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28 lg:px-16">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e7c876]">
          <span className="h-px w-8 bg-[#c6a24a]" />
          Amplified Properties &middot; Lagos &amp; Abuja
        </p>

        <h1 className="mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-canvas sm:text-5xl md:text-6xl lg:text-7xl">
          Extraordinary Homes.
          <br className="hidden sm:block" /> Exceptional Living.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-canvas/70 md:text-lg">
          Discover verified luxury apartments, duplexes, penthouses, and
          mansions across Lagos and Abuja &mdash; curated for discerning buyers
          and tenants.
        </p>

        {/* Search panel */}
        <div className="mt-10 w-full max-w-[1100px] rounded-2xl bg-canvas p-3 shadow-lifted">
          <div className="mb-3 flex items-center justify-between gap-3 border-b border-line px-1 pb-3">
            <div className="inline-flex rounded-lg border border-line bg-canvas-muted p-1">
              {(["Buy", "Rent"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-9 rounded-md px-6 text-sm font-semibold transition-colors duration-200 ${
                    activeTab === tab
                      ? "bg-ink text-canvas"
                      : "text-ink-700 hover:text-ink"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-ink-700 sm:block">
              Find your next address
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto]">
            <label className="flex min-h-12 items-center gap-2.5 rounded-lg px-4 py-2 transition-colors hover:bg-canvas-muted">
              <MapPin className="h-4 w-4 shrink-0 text-ink-700" />
              <span className="sr-only">Location</span>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent text-sm text-ink outline-none"
              >
                <option value="">All Locations</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-h-12 items-center gap-2.5 rounded-lg border-t border-line px-4 py-2 transition-colors hover:bg-canvas-muted sm:border-l sm:border-t-0">
              <Home className="h-4 w-4 shrink-0 text-ink-700" />
              <span className="sr-only">Property type</span>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent text-sm text-ink outline-none"
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-h-12 items-center gap-2.5 rounded-lg border-t border-line px-4 py-2 transition-colors hover:bg-canvas-muted sm:border-l sm:border-t-0">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-ink-700" />
              <span className="sr-only">Price range</span>
              <select
                value={priceIndex}
                onChange={(e) => setPriceIndex(Number(e.target.value))}
                className="w-full cursor-pointer appearance-none bg-transparent text-sm text-ink outline-none"
              >
                {PRICE_PRESETS.map((p, i) => (
                  <option key={p.label} value={i}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="p-1 sm:col-span-2 lg:col-span-1">
              <button
                onClick={handleSearch}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand-cta)] px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--brand-cta-hover)]"
              >
                <Search className="h-4 w-4" />
                Search Properties
              </button>
            </div>
          </div>
        </div>

        {/* Trust stats */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium text-canvas/60">
          {STATS.map((stat) => (
            <span key={stat} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c6a24a]" />
              {stat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
