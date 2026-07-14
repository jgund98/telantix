import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1400px] px-6 md:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2.5 ${
        dark ? "text-paper/75" : "text-mute"
      } ${className ?? ""}`}
    >
      <span className="inline-block h-[7px] w-[7px] bg-signal" />
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "signal",
  className,
}: {
  href: string;
  children: ReactNode;
  /**
   * signal      — orange fill (primary, any bg)
   * ink         — ink fill / paper text (light bg)
   * paper       — solid paper fill / ink text (dark bg)
   * ghost       — outline for LIGHT bg: fills ink on hover
   * ghostLight  — outline for DARK bg: fills paper on hover
   */
  variant?: "signal" | "ink" | "paper" | "ghost" | "ghostLight";
  className?: string;
}) {
  const styles: Record<string, string> = {
    signal: "bg-signal text-white hover:bg-signal-deep",
    ink: "bg-ink text-paper hover:bg-ink-2",
    paper: "bg-paper text-ink hover:bg-white",
    ghost:
      "bg-transparent text-ink border border-ink/30 hover:bg-ink hover:border-ink hover:text-paper",
    ghostLight:
      "bg-transparent text-paper border border-paper/30 hover:bg-paper hover:border-paper hover:text-ink",
  };

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 px-6 py-3.5 text-[0.95rem] font-medium transition-colors duration-300 ${styles[variant]} ${className ?? ""}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
