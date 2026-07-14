"use client";

import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Mark } from "@/components/brand";

export function Thesis() {
  return (
    <section className="relative overflow-hidden border-b border-hair bg-paper py-24 md:py-36">
      {/* Junction watermark — the mark as quiet texture, bleeding off-edge */}
      <div
        className="pointer-events-none absolute -right-24 -top-16 hidden opacity-[0.05] md:block"
        aria-hidden
      >
        <Mark variant="ink" className="h-[520px] w-auto" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Left rail label */}
          <Reveal className="lg:pt-3">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
              <span className="eyebrow text-mute">What we believe</span>
              <span className="hidden lg:block h-24 w-px bg-hair" />
              <span className="mono-label text-[0.7rem] text-stone">
                BUILT BY OPERATORS
              </span>
            </div>
          </Reveal>

          {/* The statement */}
          <div className="max-w-4xl">
            <Reveal>
              <p className="text-[clamp(1.6rem,3.6vw,2.9rem)] font-medium leading-[1.18] tracking-tight text-ink text-balance">
                Your generic carrier doesn&apos;t know what you do. It throttles
                your traffic at the worst moment, lets your caller IDs get flagged,
                and puts a rep on the phone who&apos;s never touched a dialer.{" "}
                <span className="text-signal">We built the opposite.</span>
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-mute text-pretty">
                We run our own dialers on our own network, so we know a
                Monday-morning spike when we see one. Your calls get signed at the
                edge, your channels never hit an artificial cap, and when you call
                support you get someone who speaks VICIdial — not a script.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
