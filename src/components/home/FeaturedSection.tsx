import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockProperties } from "@/data/mockProperties";
import PropertyCard from "@/components/property/PropertyCard";

export default function FeaturedSection() {
  const featured = mockProperties.filter(
    (p) =>
      p.buyOrRent === "Buy" &&
      p.price >= 150000000 &&
      p.type !== "land" &&
      p.type !== "commercial"
  );

  return (
    <section id="featured" className="bg-canvas-muted py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-700">
              <span className="h-px w-8 bg-gold-400" />
              Handpicked for You
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em] text-ink md:text-4xl">
              Featured Residences
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-700">
              Premium listings across Lagos and Abuja, curated by our senior
              advisors for discerning buyers.
            </p>
          </div>
          <Link
            href="/properties"
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink transition-colors duration-200 hover:text-ink-700"
          >
            View All Properties
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
