"use client";

import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimatedMark, Wordmark } from "./brand";

const COLUMNS = [
  {
    head: "Network",
    links: [
      { href: "/network", label: "Where we reach" },
      { href: "/network", label: "Our network" },
      { href: "/quality", label: "Quality & uptime" },
    ],
  },
  {
    head: "What we do",
    links: [
      { href: "/termination", label: "SIP Trunking" },
      { href: "/termination", label: "Caller IDs & Numbers" },
      { href: "/termination", label: "Outbound Termination" },
    ],
  },
  {
    head: "Company",
    links: [
      { href: "/company", label: "About" },
      { href: "/connect", label: "Request Routes" },
      { href: "/connect", label: "Contact & Support" },
    ],
  },
];

export function SiteFooter() {
  const markRef = useRef(null);
  const markIn = useInView(markRef, { once: true, margin: "-40px" });
  return (
    <footer className="bg-ink text-paper">
      {/* Peering strip */}
      <div className="border-b border-hair-ink">
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="mono-label text-[0.7rem] text-paper/70 whitespace-nowrap">
            DIRECT CARRIER CONNECTIONS<span className="hidden md:inline"> · AVAILABLE ON REQUEST</span>
          </p>
          {/* Full city names on desktop; metro codes on mobile — one clean line either way */}
          <div className="flex items-center justify-between gap-x-8 mono-label text-[0.7rem] text-paper/70 md:justify-start">
            {[
              { full: "NEW YORK", code: "NYC" },
              { full: "DALLAS", code: "DFW" },
              { full: "CHICAGO", code: "CHI" },
              { full: "ATLANTA", code: "ATL" },
              { full: "LOS ANGELES", code: "LAX" },
            ].map((c) => (
              <span key={c.code} className="whitespace-nowrap">
                <span className="hidden md:inline">{c.full}</span>
                <span className="md:hidden">{c.code}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <div ref={markRef} className="flex items-center gap-3">
              <AnimatedMark variant="paper" className="h-9 w-auto" play={markIn} />
              <Wordmark variant="paper" className="text-[1.9rem]" />
            </div>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-paper/70 text-pretty">
              Dialer-grade SIP for U.S. call centers. Trunks, caller IDs and
              outbound termination — built by operators, for operators.
            </p>
            <p className="mt-8 eyebrow text-signal">Routes that terminate.</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.head}>
              <h3 className="mono-label text-[0.7rem] text-paper/70">
                {col.head.toUpperCase()}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-[0.95rem] text-paper/85 hover:text-signal transition-colors"
                    >
                      <span className="h-px w-0 bg-signal transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal + utility bar */}
        <div className="mt-16 flex flex-col gap-5 border-t border-hair-ink pt-8">
          {/* Short labels on mobile so the row never orphans */}
          <div className="flex items-center gap-x-4 mono-label text-[0.7rem] text-paper/70 sm:gap-x-6">
            <Link href="/privacy" className="whitespace-nowrap hover:text-signal transition-colors">
              PRIVACY<span className="hidden sm:inline"> POLICY</span>
            </Link>
            <span className="text-hair-ink">·</span>
            <Link href="/terms" className="whitespace-nowrap hover:text-signal transition-colors">
              TERMS<span className="hidden sm:inline"> OF SERVICE</span>
            </Link>
            <span className="text-hair-ink">·</span>
            <Link href="/acceptable-use" className="whitespace-nowrap hover:text-signal transition-colors">
              ACCEPTABLE USE
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="mono-label text-[0.7rem] text-paper/70 whitespace-nowrap">
              © {new Date().getFullYear()} TELANTIX — <span className="hidden sm:inline">WHOLESALE VOICE. </span>ALL ROUTES RESERVED.
            </p>
            <div className="flex gap-6 mono-label text-[0.7rem] text-paper/70">
              <a href="mailto:hello@telantix.com" className="hover:text-signal transition-colors">
                HELLO@TELANTIX.COM
              </a>
              <span className="text-hair-ink">·</span>
              <span>99.99% UPTIME</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
