import type { Metadata } from "next";
import { QualityContent } from "@/components/pages/quality-content";

export const metadata: Metadata = {
  title: "Quality — The Numbers We Run On",
  description:
    "Connect rate, call length, reachability, time to connect and call clarity — measured around the clock, with real-time scam checks and verified caller ID. The numbers we run on are the numbers you see.",
};

export default function QualityPage() {
  return <QualityContent />;
}
