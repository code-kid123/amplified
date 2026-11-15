"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  CalendarCheck,
  TrendingUp,
  MessageCircle,
  ChevronDown,
  Eye,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useApp } from "@/context/AppContext";
import { formatPrice, generateWhatsAppLink } from "@/utils/formatters";
import type { Lead, LeadStatus } from "@/types";

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: "new", label: "New", color: "bg-gold-50 text-gold-700" },
  { value: "contacted", label: "Contacted", color: "bg-amber-100 text-amber-800" },
  { value: "viewing-scheduled", label: "Viewing Scheduled", color: "bg-forest/10 text-forest" },
  { value: "converted", label: "Converted", color: "bg-forest text-white" },
  { value: "not-interested", label: "Not Interested", color: "bg-canvas-muted text-ink-700" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CHART_COLORS = ["#0b6b52", "#8a6d1f", "#b89540", "#16243a", "#0e7a5e", "#6e5617", "#8fa6c0"];

export default function AdminDashboardPage() {
  const { leads, viewingRequests, updateLead } = useApp();
  const [statusOpen, setStatusOpen] = useState<string | null>(null);

  const kpis = useMemo(() => {
    const now = Date.now();
    const h24 = 24 * 60 * 60 * 1000;
    const newLeads24h = leads.filter(
      (l) => now - new Date(l.createdAt).getTime() < h24
    ).length;
    const scheduled = viewingRequests.filter((v) => v.status === "pending" || v.status === "confirmed").length;
    const converted = leads.filter((l) => l.status === "converted").length;
    const rate = leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;
    return { total: leads.length, newLeads24h, scheduled, rate };
  }, [leads, viewingRequests]);

  const monthlyData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      const d = new Date(l.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    const result: { month: string; leads: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${dt.getFullYear()}-${dt.getMonth()}`;
      result.push({ month: MONTHS[dt.getMonth()], leads: counts[key] || 0 });
    }
    return result;
  }, [leads]);

  const locationData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      l.preferredLocations.forEach((loc) => {
        counts[loc] = (counts[loc] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7);
  }, [leads]);

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    updateLead(leadId, { status });
    setStatusOpen(null);
  };

  const sortedLeads = useMemo(
    () => [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [leads]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-[-0.03em] text-ink">Agent Dashboard</h1>
          <p className="mt-1 text-sm text-ink-700">
            Manage leads, viewings, and conversions at a glance.
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="flex min-h-11 items-center gap-1.5 rounded-lg bg-ink px-5 text-xs font-semibold text-white transition-colors hover:bg-ink-800"
        >
          <Eye className="h-3.5 w-3.5" />
          Full Lead View
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Leads", value: kpis.total, icon: Users, color: "text-gold-700", bg: "bg-gold-50" },
          { label: "New (24h)", value: kpis.newLeads24h, icon: UserPlus, color: "text-forest", bg: "bg-forest/10" },
          { label: "Scheduled Viewings", value: kpis.scheduled, icon: CalendarCheck, color: "text-[var(--brand-cta)]", bg: "bg-canvas-muted" },
          { label: "Conversion Rate", value: `${kpis.rate}%`, icon: TrendingUp, color: "text-amber-700", bg: "bg-amber-50" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-line bg-canvas-card p-5 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-xs text-ink-700">{kpi.label}</p>
                <p className="text-xl font-semibold text-ink">{kpi.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Monthly Leads */}
        <div className="rounded-lg border border-line bg-canvas-card p-5 ">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-ink-700" />
            <h2 className="text-sm font-semibold text-ink">Monthly Lead Intake</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e1d6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7686" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7686" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e6e1d6" }}
                />
                <Bar dataKey="leads" name="Leads" radius={[4, 4, 0, 0]}>
                  {monthlyData.map((_, i) => (
                    <Cell key={i} fill={i === monthlyData.length - 1 ? "#0b6b52" : "#d9d3c6"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Locations */}
        <div className="rounded-lg border border-line bg-canvas-card p-5 ">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-ink-700" />
            <h2 className="text-sm font-semibold text-ink">Top Requested Locations</h2>
          </div>
          <div className="h-56">
            {locationData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} layout="vertical" barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6e1d6" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "#6b7686" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#6b7686" }}
                    axisLine={false}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e6e1d6" }}
                  />
                  <Bar dataKey="value" name="Leads" radius={[0, 4, 4, 0]}>
                    {locationData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-ink-700">
                No location data yet. Leads will populate as they come in.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Table */}
      <div className="mt-8 rounded-lg border border-line bg-canvas-card ">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">
            Recent Leads ({sortedLeads.length})
          </h2>
        </div>

        {sortedLeads.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-ink-700">
              No leads yet. They&apos;ll appear here as visitors use the Match Quiz or inquire on WhatsApp.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line bg-canvas-muted text-[10px] font-semibold uppercase tracking-wider text-ink-700">
                  <th className="px-5 py-3">Lead Name</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Budget</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Intent</th>
                  <th className="px-5 py-3">Source</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sortedLeads.map((lead) => {
                  const statusOpt = STATUS_OPTIONS.find((s) => s.value === lead.status) || STATUS_OPTIONS[0];
                  const waLink = generateWhatsAppLink(
                    lead.whatsappNumber || lead.phone,
                    `Hi ${lead.firstName}, this is Amplified Properties following up on your property inquiry.`
                  );
                  return (
                    <tr key={lead.id} className="hover:bg-canvas-muted/50">
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/leads?id=${lead.id}`}
                          className="font-semibold text-ink hover:text-ink"
                        >
                          {lead.firstName} {lead.lastName}
                        </Link>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-ink-700">{lead.email}</span>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[var(--brand-primary)] hover:underline"
                          >
                            <MessageCircle className="h-3 w-3" />
                            WhatsApp
                          </a>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-ink-700">
                        {lead.budget
                          ? lead.budget.max === Infinity
                            ? `${formatPrice(lead.budget.min, lead.budget.currency)}+`
                            : `${formatPrice(lead.budget.min, lead.budget.currency)} — ${formatPrice(lead.budget.max, lead.budget.currency)}`
                          : "—"}
                      </td>
                      <td className="px-5 py-3 text-ink-700">
                        {lead.preferredLocations.join(", ") || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            lead.notes.includes("Intent: Buy")
                              ? "bg-gold-50 text-gold-700"
                              : "bg-canvas-muted text-ink"
                          }`}
                        >
                          {lead.notes.includes("Intent: Buy") ? "Buy" : lead.notes.includes("Intent: Rent") ? "Rent" : "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-canvas-muted px-2 py-0.5 text-[10px] font-medium text-ink-700 capitalize">
                          {lead.source === "quiz" ? "Match Quiz" : lead.source === "property-detail" ? "Property Detail" : lead.source}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="relative">
                          <button
                            onClick={() => setStatusOpen(statusOpen === lead.id ? null : lead.id)}
                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusOpt.color}`}
                          >
                            {statusOpt.label}
                            <ChevronDown className="h-3 w-3" />
                          </button>
                          {statusOpen === lead.id && (
                            <div className="absolute left-0 top-full z-20 mt-1 w-44 rounded-lg border border-line bg-canvas-card py-1 shadow-lg">
                              {STATUS_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => handleStatusChange(lead.id, opt.value)}
                                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-canvas-muted ${
                                    lead.status === opt.value ? "font-semibold" : "text-ink-700"
                                  }`}
                                >
                                  <span className={`h-2 w-2 rounded-full ${
                                    opt.value === "new" ? "bg-gold-600"
                                    : opt.value === "contacted" ? "bg-amber-500"
                                    : opt.value === "viewing-scheduled" ? "bg-forest"
                                    : opt.value === "converted" ? "bg-forest-600"
                                    : "bg-ink/20"
                                  }`} />
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-ink-700">
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/leads?id=${lead.id}`}
                          className="text-ink-700 hover:text-[var(--brand-primary)]"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
