"use client";

import { motion } from "framer-motion";

type MarkVariant = "ink" | "paper" | "signal";

const INK_FILL: Record<MarkVariant, string> = {
  ink: "#16140F",
  paper: "#F4F1EA",
  signal: "#F4F1EA",
};

const OVERPASS_FILL: Record<MarkVariant, string> = {
  ink: "#F04E00",
  paper: "#F04E00",
  signal: "#16140F",
};

/**
 * The Junction — two crossing routes, orange overpassing ink.
 * The interim brand mark, rendered as geometry (never an image).
 */
export function Mark({
  variant = "ink",
  className,
  animate = false,
}: {
  variant?: MarkVariant;
  className?: string;
  animate?: boolean;
}) {
  const stubs = INK_FILL[variant];
  const overpass = OVERPASS_FILL[variant];

  if (!animate) {
    return (
      <svg viewBox="0 0 88 108" className={className} aria-hidden="true">
        <polygon points="8,20 36,20 43.5,27.5 29.5,41.5" fill={stubs} />
        <polygon points="66.5,50.5 88,72 60,72 52.5,64.5" fill={stubs} />
        <polygon points="0,80 80,0 80,28 0,108" fill={overpass} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 88 108" className={className} aria-hidden="true">
      <motion.polygon
        points="8,20 36,20 43.5,27.5 29.5,41.5"
        fill={stubs}
        initial={{ opacity: 0, x: -6, y: -6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.polygon
        points="66.5,50.5 88,72 60,72 52.5,64.5"
        fill={stubs}
        initial={{ opacity: 0, x: 6, y: 6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.polygon
        points="0,80 80,0 80,28 0,108"
        fill={overpass}
        initial={{ clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)" }}
        animate={{ clipPath: "polygon(0 100%, 100% 0, 100% 0, 0 100%)" }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/**
 * TELANTIX wordmark — always all-caps, 800, tight tracking.
 * Never split visually. Rendered as live text (Schibsted Grotesk).
 */
export function Wordmark({
  variant = "ink",
  className,
}: {
  variant?: "ink" | "paper";
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        fontWeight: 800,
        letterSpacing: "-0.03em",
        textTransform: "uppercase",
        color: variant === "ink" ? "#16140F" : "#F4F1EA",
        lineHeight: 1,
      }}
    >
      Telantix
    </span>
  );
}

/** Horizontal lockup: mark + wordmark, correctly proportioned. */
export function Lockup({
  variant = "ink",
  className,
  markClass = "h-7 w-auto",
  textClass = "text-[1.5rem]",
}: {
  variant?: "ink" | "paper";
  className?: string;
  markClass?: string;
  textClass?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Mark variant={variant} className={markClass} />
      <Wordmark variant={variant} className={textClass} />
    </span>
  );
}
