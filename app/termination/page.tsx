import type { Metadata } from "next";
import { TerminationContent } from "@/components/pages/termination-content";

export const metadata: Metadata = {
  title: "Outbound Calling — Dialer-Grade Termination",
  description:
    "High-volume outbound termination sorted into clear quality tiers, with A-level signed caller ID, no channel caps, and automatic switching to a better route the moment one slips.",
};

export default function TerminationPage() {
  return <TerminationContent />;
}
