import { Container } from "@/components/ui";
import { Mark } from "@/components/brand";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-hair bg-paper pt-16 pb-14 md:pt-20 md:pb-16">
        <div
          className="pointer-events-none absolute -right-16 -top-10 hidden opacity-[0.04] md:block"
          aria-hidden
        >
          <Mark variant="ink" className="h-[360px] w-auto" />
        </div>
        <Container className="relative z-10">
          <span className="eyebrow flex items-center gap-2.5 text-mute">
            <span className="inline-block h-[7px] w-[7px] bg-signal" />
            {eyebrow}
          </span>
          <h1 className="display mt-6 max-w-3xl text-ink text-[clamp(2.4rem,6vw,4.6rem)] text-balance">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mute text-pretty">
            {intro}
          </p>
          <p className="mono-label mt-8 text-[0.7rem] text-stone">
            LAST UPDATED · {updated}
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
            {/* Contents rail */}
            <nav className="hidden lg:block lg:sticky lg:top-28 lg:self-start" aria-label="Contents">
              <div className="mono-label text-[0.66rem] text-stone">CONTENTS</div>
              <ol className="mt-4 space-y-2.5">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#s-${i + 1}`}
                      className="group flex gap-2.5 text-[0.85rem] leading-snug text-mute hover:text-ink transition-colors"
                    >
                      <span className="mono-label text-[0.7rem] text-stone tnum">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Sections */}
            <div className="max-w-2xl border-t border-hair">
              {sections.map((s, i) => (
                <div
                  key={s.heading}
                  id={`s-${i + 1}`}
                  className="scroll-mt-28 border-b border-hair py-10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="mono-label text-[0.72rem] text-signal tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[1.35rem] font-bold tracking-tight text-ink">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-4 pl-0 md:pl-9">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-[1rem] leading-relaxed text-mute text-pretty">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <p className="mt-8 text-[0.85rem] leading-relaxed text-stone">
                Questions about this policy? Contact us at{" "}
                <a href="mailto:legal@telantix.com" className="text-signal hover:text-ink transition-colors">
                  legal@telantix.com
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
