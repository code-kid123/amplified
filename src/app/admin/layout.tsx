// src/app/admin/layout.tsx
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";

const mobileLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Public Site", href: "/properties" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1 bg-canvas">
        <nav className="flex gap-1 overflow-x-auto border-b border-line bg-canvas-card px-4 py-2 lg:hidden">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 shrink-0 items-center rounded-lg px-4 text-xs font-semibold text-ink-700 transition-colors hover:bg-canvas-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
