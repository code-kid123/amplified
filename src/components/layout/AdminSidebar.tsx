"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, ExternalLink } from "lucide-react";
import { defaultAgencyConfig } from "@/config/agencyConfig";
import { cn } from "@/lib/utils";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Public Site", href: "/properties", icon: ExternalLink },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const config = defaultAgencyConfig;

  const initials = config.agencyName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-ink-900 text-canvas/70 lg:flex">
      <div className="flex items-center gap-3 border-b border-canvas/10 px-6 py-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#c6a24a]/50 bg-white/5 font-display text-xs font-semibold text-[#e7c876]">
          {initials}
        </span>
        <span className="min-w-0 truncate font-display text-base text-canvas">
          {config.agencyName}
        </span>
      </div>

      <nav className="flex flex-col py-4">
        {adminLinks.map((link) => {
          const isActive =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex min-h-11 items-center gap-3 border-l-2 px-6 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-gold-400 bg-canvas/5 text-canvas"
                  : "border-transparent text-canvas/60 hover:text-canvas/80"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-canvas/10 px-6 py-4">
        <Link
          href="/"
          className="flex min-h-11 items-center text-sm font-medium text-canvas/60 transition-colors duration-200 hover:text-canvas/80"
        >
          Back to Site
        </Link>
      </div>
    </aside>
  );
}
