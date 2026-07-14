import type { Metadata } from "next";
import { Schibsted_Grotesk, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-grotesk",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://telantix.com"),
  title: {
    default: "Telantix — Dialer-Grade SIP for U.S. Call Centers",
    template: "%s — Telantix",
  },
  description:
    "Telantix is the SIP carrier built for U.S. call centers and dialer operators. A-level STIR/SHAKEN signed at the edge, caller IDs that stay clean, unlimited concurrent channels, and answer-rate-obsessed routing. Routes that terminate.",
  keywords: [
    "SIP trunking",
    "call center VoIP",
    "dialer SIP trunk",
    "VICIdial carrier",
    "STIR SHAKEN attestation",
    "outbound voice termination",
    "wholesale VoIP",
    "caller ID reputation",
  ],
  openGraph: {
    title: "Telantix — Dialer-Grade SIP for U.S. Call Centers",
    description:
      "A-level STIR/SHAKEN signed at the edge, caller IDs that stay clean, and channels with no cap — built by operators, for operators.",
    type: "website",
    siteName: "Telantix",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${fragmentMono.variable}`}>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
