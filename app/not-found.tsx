import Link from "next/link";
import { Mark } from "@/components/brand";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-paper px-6 py-24">
      <div className="max-w-lg text-center">
        <div className="mb-10 flex justify-center">
          <Mark variant="ink" className="h-24 w-auto" />
        </div>
        <span className="eyebrow flex items-center justify-center gap-2.5 text-mute">
          <span className="inline-block h-[7px] w-[7px] bg-signal" />
          404 · Dead route
        </span>
        <h1 className="display mt-6 text-ink text-[clamp(2.4rem,7vw,4rem)] text-balance">
          This route doesn&apos;t connect.
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[1.05rem] leading-relaxed text-mute text-pretty">
          The page you were after isn&apos;t on the map. Let&apos;s get you back to
          one that is.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="signal">
            Back home
          </ButtonLink>
          <ButtonLink href="/connect" variant="ghost">
            Request routes
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
