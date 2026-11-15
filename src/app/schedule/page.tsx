"use client";

import { useState } from "react";
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { defaultAgencyConfig } from "@/config/agencyConfig";
import { generateWhatsAppLink } from "@/utils/formatters";
import ViewingRequestModal from "@/components/property/ViewingRequestModal";
import { mockProperties } from "@/data/mockProperties";

type InspectionType = "in-person" | "virtual";

export default function SchedulePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<InspectionType>("in-person");

  const featuredProperty =
    mockProperties.find(
      (p) => p.buyOrRent === "Buy" && p.price >= 300000000
    ) || mockProperties[0];

  const whatsappLink = generateWhatsAppLink(
    defaultAgencyConfig.whatsappNumber,
    "Hello Amplified Properties, I would like to schedule a property viewing. Please share your available slots."
  );

  const openModal = (type: InspectionType) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 md:px-10 md:py-20">
      <div className="text-center">
        <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">
          <span className="h-px w-8 bg-gold-400" />
          Private Inspections
          <span className="h-px w-8 bg-gold-400" />
        </p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-[-0.03em] text-ink md:text-5xl">
          Schedule a Viewing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-700 md:text-base">
          Book a private inspection of any property in our portfolio. Choose an
          in-person walkthrough or a live virtual tour with one of our advisors.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {/* In-Person */}
        <div className="group flex flex-col rounded-2xl border border-line bg-canvas-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-100 bg-gold-50">
            <MapPin className="h-5 w-5 text-gold-700" />
          </div>
          <h2 className="mt-5 font-display text-xl font-medium text-ink">
            In-Person Inspection
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-700">
            Visit the property with one of our advisors. We provide
            chauffeur-driven tours across every location we serve in Lagos and
            Abuja.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-ink-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              Guided walkthrough with a senior advisor
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              Complimentary pickup within Lagos
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              60&ndash;90 minute detailed inspection
            </li>
          </ul>
          <button
            onClick={() => openModal("in-person")}
            className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand-cta)] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--brand-cta-hover)]"
          >
            Book In-Person Inspection
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Virtual Tour */}
        <div className="group flex flex-col rounded-2xl border border-line bg-canvas-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-100 bg-gold-50">
            <Clock className="h-5 w-5 text-gold-700" />
          </div>
          <h2 className="mt-5 font-display text-xl font-medium text-ink">
            Virtual Live Tour
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-700">
            Join a live video call with an advisor who will walk you through the
            property in real time, wherever you are in the world.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-ink-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              Live WhatsApp or Zoom walkthrough
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              Ideal for overseas and diaspora buyers
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              Live Q&amp;A with your advisor
            </li>
          </ul>
          <button
            onClick={() => openModal("virtual")}
            className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-ink px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-canvas"
          >
            Book Virtual Tour
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick contact */}
      <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-line bg-canvas-muted p-7 text-center sm:flex-row sm:text-left">
        <div className="flex flex-1 items-start gap-3">
          <ShieldCheck className="mt-0.5 hidden h-5 w-5 shrink-0 text-forest sm:block" />
          <div>
            <h3 className="font-display text-lg font-medium text-ink">
              Prefer to speak with us directly?
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-700">
              Call {defaultAgencyConfig.phone} or message us on WhatsApp. We
              respond within minutes during business hours.
            </p>
          </div>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <a
            href={`tel:${defaultAgencyConfig.phone}`}
            className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-canvas-card px-4 text-xs font-semibold text-ink transition-colors duration-200 hover:border-ink sm:flex-none"
          >
            <Phone className="h-3.5 w-3.5" />
            Call Now
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg bg-whatsapp px-4 text-xs font-semibold text-white transition-colors duration-200 hover:bg-whatsapp-700 sm:flex-none"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>

      <ViewingRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        property={featuredProperty}
        initialInspectionType={modalType}
      />
    </div>
  );
}
