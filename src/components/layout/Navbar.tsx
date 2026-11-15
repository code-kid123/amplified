"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, Shield } from "lucide-react";
import { defaultAgencyConfig } from "@/config/agencyConfig";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Buy", href: "/properties?buyOrRent=Buy" },
  { label: "Rent", href: "/properties?buyOrRent=Rent" },
  { label: "Property Match", href: "/quiz" },
  { label: "Schedule Viewing", href: "/schedule" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const config = defaultAgencyConfig;

  const initials = config.agencyName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 h-20 transition-all duration-300",
          scrolled
            ? "bg-[var(--brand-primary)]/95 shadow-soft backdrop-blur-md border-b border-white/10"
            : "bg-[var(--brand-primary)] border-b border-white/10"
        )}
      >
        <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-5 md:px-10 lg:px-16">
          {/* Brand */}
          <Link href="/" className="group flex min-w-0 shrink items-center gap-2.5 sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#c6a24a]/50 bg-white/5 font-display text-sm font-semibold tracking-tight text-[#e7c876] transition-colors duration-300 group-hover:border-[#c6a24a]">
              {initials}
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="max-w-[120px] truncate font-display text-base font-medium tracking-tight text-white sm:max-w-none sm:text-lg">
                {config.agencyName}
              </span>
              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:block">
                Luxury Real Estate
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex xl:items-center xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex min-h-11 items-center py-2 text-sm font-medium tracking-wide text-white/80 transition-colors duration-200 hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-1 left-0 h-px w-0 bg-[#c6a24a] transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden xl:flex xl:items-center xl:gap-3">
            <a
              href={`tel:${config.phone}`}
              className="hidden min-h-11 items-center px-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white 2xl:flex"
            >
              {config.phone}
            </a>
            <Link
              href="/schedule"
              className="flex min-h-11 items-center rounded-lg bg-[var(--brand-cta)] px-6 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[var(--brand-cta-hover)]"
            >
              Book a Viewing
            </Link>
            <Link
              href="/admin"
              className="flex min-h-11 items-center gap-1.5 rounded-lg border border-white/25 px-4 text-xs font-semibold text-white transition-colors duration-200 hover:border-white/60"
            >
              <Shield className="h-3.5 w-3.5" />
              Agent
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={`tel:${config.phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 text-white transition-colors hover:border-white/60"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 text-white transition-colors hover:border-white/60"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen takeover */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[var(--brand-primary)]">
          <div className="flex h-20 items-center justify-between px-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c6a24a]/50 bg-white/5 font-display text-sm font-semibold text-[#e7c876]">
                {initials}
              </span>
              <span className="font-display text-lg font-medium text-white">
                {config.agencyName}
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-white/70 transition-colors hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-14 items-center border-b border-white/10 py-3 font-display text-3xl text-white/90 transition-colors duration-200 last:border-0 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/schedule"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-lg bg-[var(--brand-cta)] px-6 text-sm font-semibold tracking-wide text-white"
              >
                Book a Viewing
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 text-sm font-semibold text-white"
              >
                Agent Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
