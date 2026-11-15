"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { defaultAgencyConfig } from "@/config/agencyConfig";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Buy Properties", href: "/properties?buyOrRent=Buy" },
  { label: "Rent Properties", href: "/properties?buyOrRent=Rent" },
  { label: "Property Match Quiz", href: "/quiz" },
  { label: "Schedule a Viewing", href: "/schedule" },
  { label: "Contact Us", href: "/schedule" },
];

const activeLocations = [
  { label: "Lekki Phase 1", href: "/properties?location=Lekki+Phase+1" },
  { label: "Lekki Phase 2", href: "/properties?location=Lekki+Phase+2" },
  { label: "Ikoyi", href: "/properties?location=Ikoyi" },
  { label: "Victoria Island", href: "/properties?location=Victoria+Island" },
  { label: "Ikeja GRA", href: "/properties?location=Ikeja+GRA" },
  { label: "Maitama, Abuja", href: "/properties?location=Maitama" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "X (Twitter)", href: "https://x.com", icon: XIcon },
];

export default function Footer() {
  const config = defaultAgencyConfig;
  const year = new Date().getFullYear();

  const initials = config.agencyName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <footer className="border-t-2 border-[#c6a24a]/40 bg-ink text-canvas/70">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#c6a24a]/50 bg-white/5 font-display text-sm font-semibold text-[#e7c876]">
                {initials}
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-medium text-canvas">
                  {config.agencyName}
                </span>
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-canvas/70">
                  Luxury Real Estate
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-canvas/70">
              Connecting discerning buyers and tenants with exceptional
              residential and commercial properties across Lagos and Abuja.
              Over a decade of market expertise, delivered with transparency and
              trust.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-800 text-canvas/65 transition-colors duration-200 hover:bg-[var(--brand-cta)] hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-canvas/70">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas/70 transition-colors duration-200 hover:text-canvas"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-canvas/70">
              Our Locations
            </h3>
            <ul className="mt-5 space-y-3">
              {activeLocations.map((loc) => (
                <li key={loc.href} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c6a24a]/70" />
                  <Link
                    href={loc.href}
                    className="text-sm text-canvas/70 transition-colors duration-200 hover:text-canvas"
                  >
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-canvas/70">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c6a24a]/70" />
                <span className="text-sm text-canvas/70">
                  {config.officeAddress}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#c6a24a]/70" />
                <a
                  href={`tel:${config.phone}`}
                  className="text-sm text-canvas/70 transition-colors duration-200 hover:text-canvas"
                >
                  {config.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#c6a24a]/70" />
                <a
                  href={`mailto:${config.email}`}
                  className="break-all text-sm text-canvas/70 transition-colors duration-200 hover:text-canvas"
                >
                  {config.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#c6a24a]/70" />
                <span className="text-sm text-canvas/70">
                  Mon &ndash; Sat: 9:00 AM &ndash; 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-canvas/10">
        <div className="mx-auto max-w-[1400px] px-5 py-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-canvas/70">
              &copy; {year} {config.agencyName}. All rights reserved.
            </p>
            <p className="max-w-xl text-center text-[11px] leading-relaxed text-canvas/50 sm:text-right">
              Property listings are subject to availability. Prices are
              indicative and may change without prior notice. We act as an
              intermediary and are not a party to any binding agreement between
              landlords, vendors, and purchasers or tenants. Prospective clients
              are advised to conduct independent due diligence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
