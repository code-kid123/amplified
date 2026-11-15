import { Suspense } from "react";
import PropertiesClient from "@/components/property/PropertiesClient";
import PropertyCard from "@/components/property/PropertyCard";
import { mockProperties } from "@/data/mockProperties";

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-10 md:px-10 md:pt-14 lg:px-16">
          <div className="h-8 w-40 animate-pulse rounded bg-canvas-muted" />
          <div className="mt-4 h-10 w-72 max-w-full animate-pulse rounded bg-canvas-muted" />
          <div className="mt-8 h-40 animate-pulse rounded-2xl bg-canvas-muted" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      }
    >
      <PropertiesClient />
    </Suspense>
  );
}