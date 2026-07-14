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
          <p className="mono-label text-[0.7rem] text-paper/70">
            DIRECT CARRIER CONNECTIONS · AVAILABLE ON REQUEST
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mono-label text-[0.7rem] text-paper/70">
            <span>NEW YORK</span>
            <span>DALLAS</span>
            <span>CHICAGO</span>
            <span>ATLANTA</span>
            <span>LOS ANGELES</span>
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

        <div className="mt-16 flex flex-col gap-4 border-t border-hair-ink pt-8 md:flex-row md:items-center md:justify-between">
          <p className="mono-label text-[0.7rem] text-paper/70">
            © {new Date().getFullYear()} TELANTIX — WHOLESALE VOICE. ALL ROUTES RESERVED.
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
    </footer>
  );
}
