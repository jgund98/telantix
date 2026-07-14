"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Mark } from "@/components/brand";

const ROUTE_TYPES = ["Dialer-grade SIP trunking", "Caller IDs & numbers", "Outbound termination", "Not sure yet"];

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  full = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mono-label text-[0.65rem] text-stone">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border-0 border-b border-hair bg-transparent pb-2 text-[1.05rem] text-ink placeholder:text-stone/70 focus:border-signal focus:outline-none focus:ring-0 transition-colors"
      />
    </label>
  );
}

export function ConnectContent() {
  const [sent, setSent] = useState(false);
  const [ticket, setTicket] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Front-end only — no backend wired. Produces a reference for the demo.
    const t = "TLX-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setTicket(t);
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Request Routes"
        title="Talk to an operator, not a rep."
        lead="Tell us what you dial and how hard. We stand up a dialer-grade test trunk, show you the live answer rate, and let it do the deciding. No minimums — and a real operator on the other end."
      />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            {/* Form */}
            <div>
              {!sent ? (
                  <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 gap-10 sm:grid-cols-2"
                  >
                    <Field label="COMPANY" name="company" placeholder="Acme Call Center" />
                    <Field label="WORK EMAIL" name="email" type="email" placeholder="you@company.com" />
                    <Field label="WHERE YOU DIAL" name="destinations" placeholder="e.g. US nationwide, mobile-heavy" full />
                    <Field label="ROUGHLY HOW MUCH" name="volume" placeholder="e.g. 2M minutes/mo · 500 seats" />
                    <label className="block">
                      <span className="mono-label text-[0.65rem] text-stone">WHAT YOU NEED</span>
                      <select
                        name="routeType"
                        className="mt-2 w-full border-0 border-b border-hair bg-transparent pb-2 text-[1.05rem] text-ink focus:border-signal focus:outline-none"
                      >
                        {ROUTE_TYPES.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mono-label text-[0.65rem] text-stone">NOTES (OPTIONAL)</span>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="Current answer rate, dialer, pain points…"
                        className="mt-2 w-full resize-none border-0 border-b border-hair bg-transparent pb-2 text-[1.05rem] text-ink placeholder:text-stone/70 focus:border-signal focus:outline-none"
                      />
                    </label>

                    <div className="sm:col-span-2 flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2.5 bg-signal px-7 py-4 text-[1rem] font-medium text-white transition-colors hover:bg-signal-deep"
                      >
                        Request Routes
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </button>
                      <p className="mono-label text-[0.62rem] text-stone">
                        RESPONSE WITHIN ONE BUSINESS DAY
                      </p>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-hair bg-white p-8 md:p-10"
                  >
                    <div className="flex items-start gap-4">
                      <Mark variant="ink" className="h-12 w-auto shrink-0" />
                      <div>
                        <h3 className="display text-ink text-[1.8rem]">Request received.</h3>
                        <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-mute text-pretty">
                          An operator will look over what you dial and reply with a
                          dialer-grade test trunk and a live answer rate within one
                          business day.
                        </p>
                        <div className="mt-6 flex items-center gap-3 border-t border-hair pt-5">
                          <span className="mono-label text-[0.66rem] text-stone">REFERENCE</span>
                          <span className="mono-label text-[0.95rem] text-signal">{ticket}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
            </div>

            {/* Peering / NOC details */}
            <aside className="lg:border-l lg:border-hair lg:pl-14">
              <Eyebrow>Direct lines</Eyebrow>
              <div className="mt-8 space-y-8">
                <div>
                  <div className="mono-label text-[0.66rem] text-stone">SUPPORT · 24/7</div>
                  <a href="mailto:hello@telantix.com" className="mt-1 block text-[1.15rem] text-ink hover:text-signal transition-colors">
                    hello@telantix.com
                  </a>
                </div>
                <div>
                  <div className="mono-label text-[0.66rem] text-stone">CARRIERS &amp; PEERING</div>
                  <a href="mailto:peering@telantix.com" className="mt-1 block text-[1.15rem] text-ink hover:text-signal transition-colors">
                    peering@telantix.com
                  </a>
                </div>
              </div>

              <div className="mt-12 border-t border-hair pt-8">
                <div className="mono-label text-[0.66rem] text-stone">WHAT HAPPENS NEXT</div>
                <ul className="mt-5 space-y-4">
                  {[
                    { t: "24H", d: "Your test trunk goes live" },
                    { t: "LIVE", d: "We share the numbers with you" },
                    { t: "0", d: "Minimums to get started" },
                  ].map((s) => (
                    <li key={s.t} className="flex items-baseline gap-4">
                      <span className="mono-label w-12 shrink-0 text-[0.8rem] text-signal">{s.t}</span>
                      <span className="text-[1rem] text-mute">{s.d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 border-t border-hair pt-8">
                <div className="mono-label text-[0.66rem] text-stone">WHERE TO CONNECT</div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 mono-label text-[0.8rem] text-ink">
                  <span>LONDON</span><span>NEW YORK</span><span>FRANKFURT</span><span>MIAMI</span><span>SINGAPORE</span>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
