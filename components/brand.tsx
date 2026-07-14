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

  // The animated reveal is delegated to AnimatedMark, which uses SVG-safe
  // transforms (the old clip-path reveal silently dropped the overpass on
  // iOS Safari, which does not support clip-path: polygon() on SVG elements).
  if (animate) {
    return <AnimatedMark variant={variant} className={className} play />;
  }

  return (
    <svg viewBox="0 0 88 108" className={className} aria-hidden="true">
      <polygon points="8,20 36,20 43.5,27.5 29.5,41.5" fill={stubs} />
      <polygon points="66.5,50.5 88,72 60,72 52.5,64.5" fill={stubs} />
      <polygon points="0,80 80,0 80,28 0,108" fill={overpass} />
    </svg>
  );
}

/**
 * The Junction, animated to "unfold and flex" on reveal. The orange overpass
 * springs open from its base with a slight overshoot (the edges bend, then
 * settle); the two ink routes snap into the crossing. Used in header (on mount)
 * and footer (on scroll-in).
 */
export function AnimatedMark({
  variant = "ink",
  className,
  play = true,
}: {
  variant?: MarkVariant;
  className?: string;
  play?: boolean;
}) {
  const stubs = INK_FILL[variant];
  const overpass = OVERPASS_FILL[variant];
  const stubSpring = { type: "spring", stiffness: 320, damping: 12 } as const;

  return (
    <svg viewBox="0 0 88 108" className={className} aria-hidden="true">
      {/* top-left route stub */}
      <motion.polygon
        points="8,20 36,20 43.5,27.5 29.5,41.5"
        fill={stubs}
        initial={{ opacity: 0, x: -9, y: -9 }}
        animate={play ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -9, y: -9 }}
        transition={{ ...stubSpring, delay: 0.28 }}
      />
      {/* bottom-right route stub */}
      <motion.polygon
        points="66.5,50.5 88,72 60,72 52.5,64.5"
        fill={stubs}
        initial={{ opacity: 0, x: 9, y: 9 }}
        animate={play ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 9, y: 9 }}
        transition={{ ...stubSpring, delay: 0.36 }}
      />
      {/* orange overpass — unfolds and flexes straight */}
      <motion.polygon
        points="0,80 80,0 80,28 0,108"
        fill={overpass}
        style={{ transformOrigin: "6px 94px" }}
        initial={{ opacity: 0, scaleX: 0.12, skewX: 18, rotate: -9 }}
        animate={
          play
            ? { opacity: 1, scaleX: 1, skewX: 0, rotate: 0 }
            : { opacity: 0, scaleX: 0.12, skewX: 18, rotate: -9 }
        }
        transition={{ type: "spring", stiffness: 170, damping: 9, delay: 0.05 }}
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
  animated = false,
  play = true,
}: {
  variant?: "ink" | "paper";
  className?: string;
  markClass?: string;
  textClass?: string;
  /** Use the spring "unfold and flex" mark. */
  animated?: boolean;
  /** When animated, whether the reveal has been triggered. */
  play?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      {animated ? (
        <AnimatedMark variant={variant} className={markClass} play={play} />
      ) : (
        <Mark variant={variant} className={markClass} />
      )}
      <Wordmark variant={variant} className={textClass} />
    </span>
  );
}
