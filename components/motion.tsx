"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll-triggered rise + fade. Meaningful entrance, not decoration. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Reveal children in sequence — used for ledgers / rule-lined lists. */
export function Stagger({
  children,
  className,
  step = 0.06,
  as = "div",
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
  as?: "div" | "ul" | "tbody";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });
  const MotionTag = motion[as];

  return (
    <MotionTag ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: i * step, ease: EASE }}
        >
          {child}
        </motion.div>
      ))}
    </MotionTag>
  );
}

/** A hairline that draws itself as it enters — a route being established. */
export function DrawLine({
  className,
  vertical = false,
  delay = 0,
}: {
  className?: string;
  vertical?: boolean;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: "block",
        transformOrigin: vertical ? "top" : "left",
        background: "var(--color-hair)",
        [vertical ? "width" : "height"]: "1px",
      }}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      animate={
        inView
          ? { scaleX: 1, scaleY: 1 }
          : { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }
      }
      transition={{ duration: 0.9, delay, ease: EASE }}
    />
  );
}
