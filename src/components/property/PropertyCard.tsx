"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BedDouble,
  Bath,
  Ruler,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { Property } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/utils/formatters";
import { defaultAgencyConfig } from "@/config/agencyConfig";

export default function PropertyCard({
  property,
  featured = false,
}: {
  property: Property;
  featured?: boolean;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  const isLandOrCommercial =
    property.type === "land" || property.type === "commercial";

  const whatsappMsg = `Hello Amplified Properties, I'm interested in "${property.title}" located in ${property.location.area}, ${property.location.city} (${formatPrice(
    property.price,
    property.currency
  )}). Please share more details and available inspection times.`;
  const whatsappHref = generateWhatsAppLink(
    defaultAgencyConfig.whatsappNumber,
    whatsappMsg
  );

  const statusLabel =
    property.badge ?? (property.buyOrRent === "Buy" ? "For Sale" : "For Rent");

  const titleShort = property.titleDocument?.includes("C of O")
    ? "C of O"
    : property.titleDocument ?? "C of O";

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i === 0 ? property.images.length - 1 : i - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i === property.images.length - 1 ? 0 : i + 1));
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-canvas-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lifted">
      <div className="relative aspect-[4/3] overflow-hidden bg-canvas-muted">
        <Image
          src={property.images[imgIndex]}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded bg-canvas/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-forest" />
            Verified
          </span>
          {featured && (
            <span className="inline-flex items-center rounded bg-gold-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
              Featured
            </span>
          )}
        </div>
        <span className="absolute right-3 top-3 rounded bg-ink/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-canvas backdrop-blur-sm">
          {statusLabel}
        </span>

        {/* Location chip */}
        <span className="absolute bottom-3 left-3 inline-flex max-w-[85%] items-center gap-1 rounded bg-ink/70 px-2.5 py-1 text-[10px] font-medium text-canvas backdrop-blur-sm">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">
            {property.location.area}, {property.location.city}
          </span>
        </span>

        {/* Image controls */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/85 text-ink opacity-0 transition-opacity duration-200 hover:bg-canvas group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/85 text-ink opacity-0 transition-opacity duration-200 hover:bg-canvas group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 right-3 flex gap-1">
          {property.images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === imgIndex ? "w-4 bg-canvas" : "w-1.5 bg-canvas/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-2xl leading-none tracking-tight text-ink">
          {formatPrice(property.price, property.currency)}
          {property.buyOrRent === "Rent" && (
            <span className="font-body text-sm font-normal text-ink-700">
              {" "}
              /year
            </span>
          )}
        </p>

        <h3 className="mt-2 line-clamp-2 font-display text-base leading-snug text-ink">
          {property.title}
        </h3>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
          {isLandOrCommercial ? (
            <>
              <span className="flex flex-col items-center gap-0.5">
                <Ruler className="h-4 w-4 text-ink-700" />
                <span className="text-xs font-semibold text-ink">
                  {(property.landSizeSqm ?? property.sizeSqm ?? property.sizeSqFt).toLocaleString()}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-ink-700">
                  {property.landSizeSqm || property.sizeSqm ? "Sqm" : "Sq Ft"}
                </span>
              </span>
              <span className="flex flex-col items-center justify-center gap-0.5 border-x border-line px-1">
                <FileText className="h-4 w-4 text-ink-700" />
                <span className="line-clamp-1 text-[11px] font-semibold text-ink">
                  {titleShort}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-ink-700">
                  Title
                </span>
              </span>
              <span className="flex flex-col items-center justify-center gap-0.5">
                <MapPin className="h-4 w-4 text-ink-700" />
                <span className="text-[11px] font-semibold capitalize text-ink">
                  {property.type === "commercial" ? "Plot" : "Land"}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-ink-700">
                  Type
                </span>
              </span>
            </>
          ) : (
            <>
              <span className="flex flex-col items-center gap-0.5">
                <BedDouble className="h-4 w-4 text-ink-700" />
                <span className="text-xs font-semibold text-ink">
                  {property.bedrooms}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-ink-700">
                  Beds
                </span>
              </span>
              <span className="flex flex-col items-center gap-0.5 border-x border-line">
                <Bath className="h-4 w-4 text-ink-700" />
                <span className="text-xs font-semibold text-ink">
                  {property.bathrooms}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-ink-700">
                  Baths
                </span>
              </span>
              <span className="flex flex-col items-center gap-0.5">
                <Ruler className="h-4 w-4 text-ink-700" />
                <span className="text-xs font-semibold text-ink">
                  {property.sizeSqm
                    ? property.sizeSqm.toLocaleString()
                    : property.sizeSqFt.toLocaleString()}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-ink-700">
                  {property.sizeSqm ? "Sqm" : "Sq Ft"}
                </span>
              </span>
            </>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg bg-whatsapp px-3 py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-whatsapp-700"
          >
            <MessageCircle className="h-4 w-4" />
            Book Inspection via WhatsApp
          </a>
          <Link
            href={`/properties/${property.slug || property.id}`}
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-line-strong px-3 py-2.5 text-xs font-semibold text-ink-700 transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
