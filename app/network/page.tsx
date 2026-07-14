import type { Metadata } from "next";
import { NetworkContent } from "@/components/pages/network-content";

export const metadata: Metadata = {
  title: "The Network — Where We Reach",
  description:
    "Telantix runs 16 U.S. points of presence and connects straight to the carriers. Coverage graded region by region on answer rate, checked around the clock.",
};

export default function NetworkPage() {
  return <NetworkContent />;
}
