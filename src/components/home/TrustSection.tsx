import Link from "next/link";
import {
  ShieldCheck,
  Crown,
  MapPin,
  Users,
  Building2,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const stats = [
  { icon: Building2, value: "200+", label: "Verified Listings" },
  { icon: Users, value: "1,200+", label: "Clients Served" },
  { icon: MapPin, value: "6+", label: "Prime Locations" },
  { icon: BadgeCheck, value: "10+", label: "Years of Expertise" },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Verified Titles",
    description:
      "Every property undergoes rigorous title verification. We only list homes with genuine documentation — Governor's Consent, Certificate of Occupancy, and registered surveys.",
  },
  {
    icon: Crown,
    title: "Private Inspection Tours",
    description:
      "Enjoy complimentary chauffeur-driven inspections of your shortlisted properties. Our advisors provide guided walkthroughs and honest, insider assessments.",
  },
  {
    icon: MapPin,
    title: "Local Market Authority",
    description:
      "Deep expertise across Lekki, Ikoyi, Victoria Island, Ikeja GRA, and Abuja. We understand the neighbourhoods, the pricing trends, and where the opportunities lie.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-canvas py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-xl border border-line bg-canvas-card p-6 text-center shadow-soft"
            >
              <stat.icon className="h-6 w-6 text-[var(--brand-cta)]" />
              <span className="mt-3 font-display text-2xl font-medium text-ink md:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-700">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
          {trustPoints.map((point) => (
            <div key={point.title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold-100 bg-gold-50">
                <point.icon className="h-5 w-5 text-gold-700" />
              </div>
              <h3 className="mt-5 font-display text-lg font-medium text-ink">
                {point.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-700">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-2xl bg-ink">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c6a24a]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-forest/20 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-16 md:py-20">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e7c876]">
              <span className="h-px w-8 bg-[#c6a24a]" />
              Guided Search
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.03em] text-canvas md:text-4xl">
              Not Sure Where to Start?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-canvas/70">
              Answer a few quick questions and our matching engine will pair you
              with homes that fit your lifestyle, budget, and preferred
              locations.
            </p>
            <Link
              href="/quiz"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[var(--brand-cta)] px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--brand-cta-hover)]"
            >
              Find My Perfect Property
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
