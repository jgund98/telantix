import type { Metadata } from "next";
import { CompanyContent } from "@/components/pages/company-content";

export const metadata: Metadata = {
  title: "Company — A carrier built to be measured",
  description:
    "Telantix is wholesale voice with the posture of an engineering company: quiet, precise, and accountable to a number on every invoice.",
};

export default function CompanyPage() {
  return <CompanyContent />;
}
