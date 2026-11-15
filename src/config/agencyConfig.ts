import { AgencyConfig, CurrencyDefinition } from "@/types";

export const SUPPORTED_CURRENCIES: CurrencyDefinition[] = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
];

export const defaultAgencyConfig: AgencyConfig = {
  agencyName: "Amplified Properties",
  logo: "/logo.svg",
  brandColor: "#0B1220",
  phone: "08177766115",
  whatsappNumber: "08177766115",
  email: "info@amplifiedproperties.com",
  officeAddress: "Lekki Phase 1, Lagos, Nigeria",
  defaultCity: "Lagos",
  country: "Nigeria",
  currency: "NGN",
  supportedCurrencies: SUPPORTED_CURRENCIES,
};
