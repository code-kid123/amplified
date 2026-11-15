"use client";

import { useEffect, useState } from "react";
import {
  X,
  Video,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { Property, Lead } from "@/types";
import { useApp } from "@/context/AppContext";
import { insertRow } from "@/lib/supabase";

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

type InspectionType = "in-person" | "virtual";

export default function ViewingRequestModal({
  open,
  onClose,
  property,
  initialInspectionType = "in-person",
}: {
  open: boolean;
  onClose: () => void;
  property: Property;
  initialInspectionType?: InspectionType;
}) {
  const { addViewingRequest, addLead } = useApp();
  const [inspectionType, setInspectionType] =
    useState<InspectionType>(initialInspectionType);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setInspectionType(initialInspectionType);
      setSubmitted(false);
    }
  }, [open, initialInspectionType]);

  const canSubmit = name.trim() && phone.trim() && email.trim() && date && time;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const leadId = `lead-${Date.now()}`;
    const [first, ...rest] = name.trim().split(" ");
    const lead: Lead = {
      id: leadId,
      firstName: first || name,
      lastName: rest.join(" ") || "",
      email,
      phone,
      whatsappNumber: phone,
      source: "property-detail",
      status: "new",
      notes: `[Qualified via Inspection] Property: ${property.title}. Inspection type: ${inspectionType}.`,
      preferredLocations: [property.location.area],
      interestedProperties: [property.id],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addLead(lead);

    const meta = {
      inspectionType,
      visitorName: name,
      visitorPhone: phone,
      visitorEmail: email,
      propertyRef: property.id,
      propertyTitle: property.title,
    };
    addViewingRequest({
      id: `vr-${Date.now()}`,
      leadId,
      propertyId: property.id,
      requestedDate: date,
      requestedTime: time,
      status: "pending",
      notes: JSON.stringify(meta),
      createdAt: new Date().toISOString(),
    });

    await insertRow("viewing_requests", {
      property_id: property.id,
      visitor_name: name,
      visitor_phone: phone,
      visitor_email: email,
      requested_date: date,
      requested_time: time,
      inspection_type: inspectionType,
      status: "pending",
      property_title: property.title,
      lead_id: leadId,
    });

    setSubmitted(true);
  };

  const resetAndClose = () => {
    setInspectionType("in-person");
    setDate("");
    setTime("");
    setName("");
    setPhone("");
    setEmail("");
    setSubmitted(false);
    onClose();
  };

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a viewing"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-canvas-card shadow-lifted">
        <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
          <div className="min-w-0">
            <h2 className="font-display text-lg font-medium text-ink">
              Schedule a Viewing
            </h2>
            <p className="mt-0.5 truncate text-xs text-ink-700">
              {property.title}
            </p>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close viewing request"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-canvas-muted hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {submitted ? (
            <div className="space-y-4 py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10">
                <CheckCircle2 className="h-8 w-8 text-forest" />
              </div>
              <h3 className="font-display text-xl font-medium text-ink">
                Viewing Request Received
              </h3>
              <p className="text-sm leading-relaxed text-ink-700">
                An advisor will confirm your{" "}
                {inspectionType === "virtual"
                  ? "virtual tour"
                  : "in-person inspection"}{" "}
                for <strong className="text-ink">{formattedDate}</strong> at{" "}
                <strong className="text-ink">{time}</strong> shortly.
              </p>
              <button
                onClick={resetAndClose}
                className="mt-2 min-h-11 rounded-lg bg-ink px-7 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-ink-800"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-700">
                  Inspection Type
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(["in-person", "virtual"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setInspectionType(type)}
                      className={`flex min-h-12 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors duration-150 ${
                        inspectionType === type
                          ? "border-ink bg-gold-50 text-ink"
                          : "border-line text-ink-700 hover:border-ink/40"
                      }`}
                    >
                      {type === "in-person" ? (
                        <MapPin className="h-4 w-4" />
                      ) : (
                        <Video className="h-4 w-4" />
                      )}
                      {type === "in-person" ? "In-Person" : "Virtual Tour"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-700">
                  Preferred Date
                </p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="underline-input mt-2"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-700">
                  Preferred Time
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`flex min-h-11 items-center gap-1 rounded-lg border px-3 text-xs font-medium transition-colors duration-150 ${
                        time === slot
                          ? "border-ink bg-gold-50 text-ink"
                          : "border-line text-ink-700 hover:border-ink/40"
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-700">
                    Full Name
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-ink-700" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adebayo Johnson"
                      className="underline-input"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-700">
                    Phone Number
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-ink-700" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08177766115"
                      className="underline-input"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-700">
                    Email Address
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-ink-700" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="underline-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {!submitted && (
          <div className="border-t border-line px-6 py-4">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="min-h-12 w-full rounded-lg bg-[var(--brand-cta)] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--brand-cta-hover)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm Viewing Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
