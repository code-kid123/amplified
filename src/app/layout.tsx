import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://amplifiedproperties.com"),
  title: {
    default: "Amplified Properties | Luxury Real Estate in Lagos & Abuja",
    template: "%s | Amplified Properties",
  },
  description:
    "Amplified Properties curates verified luxury apartments, duplexes, penthouses, and mansions across Lekki, Ikoyi, Victoria Island, Ikeja GRA, and Abuja. Book a private inspection today.",
  applicationName: "Amplified Properties",
  keywords: [
    "luxury real estate Nigeria",
    "Lagos property",
    "Abuja property",
    "Lekki apartments",
    "Ikoyi duplexes",
    "Victoria Island penthouses",
    "Amplified Properties",
  ],
  authors: [{ name: "Amplified Properties" }],
  openGraph: {
    type: "website",
    siteName: "Amplified Properties",
    title: "Amplified Properties | Luxury Real Estate in Lagos & Abuja",
    description:
      "Discover verified luxury homes and premium estates across Lagos and Abuja with Amplified Properties.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amplified Properties | Luxury Real Estate in Lagos & Abuja",
    description:
      "Discover verified luxury homes and premium estates across Lagos and Abuja with Amplified Properties.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1220",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-full flex flex-col font-body text-ink bg-canvas">
        <ClientProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ClientProviders>
      </body>
    </html>
  );
}
