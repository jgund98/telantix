import type { Metadata } from "next";
import { ConnectContent } from "@/components/pages/connect-content";

export const metadata: Metadata = {
  title: "Request Routes — Open a Route with Telantix",
  description:
    "Tell us where you need to terminate. We stand up a test route, share live stats, and let the ASR make the argument. No minimums to start.",
};

export default function ConnectPage() {
  return <ConnectContent />;
}
