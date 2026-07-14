import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Telantix collects, uses, and protects information — including Customer Proprietary Network Information (CPNI) — across our wholesale voice services.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Overview",
    body: [
      "Telantix (“Telantix,” “we,” “us”) provides wholesale voice services, SIP trunking, caller-ID and phone-number services to businesses. This Privacy Policy explains what information we collect, how we use it, and the choices you have.",
      "This policy applies to our website and services. It does not apply to the practices of our customers, who are responsible for the calls they originate over our network and for their own end-user privacy obligations.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "Account information you provide, such as company name, contact name, work email, phone number, and billing details.",
      "Service and network data generated when you use our services, including call detail records (CDRs) such as originating and dialed numbers, timestamps, call duration, routing, and quality metrics.",
      "Technical data from our website, such as IP address, browser type, and pages viewed, collected through standard logs and cookies.",
    ],
  },
  {
    heading: "Customer Proprietary Network Information (CPNI)",
    body: [
      "As a provider of voice services, certain data we handle may constitute Customer Proprietary Network Information (CPNI) under U.S. telecommunications law — information such as the destinations, quantity, and technical configuration of the calls you route.",
      "We use and protect CPNI in accordance with applicable FCC rules. We do not sell CPNI, and we do not use it for marketing outside of what the law permits without appropriate consent.",
    ],
  },
  {
    heading: "How We Use Information",
    body: [
      "To provision, route, monitor, and support your services; to measure and improve answer rates, latency, and call quality; to bill accurately; to detect and prevent fraud and abuse; and to comply with legal obligations.",
    ],
  },
  {
    heading: "How We Share Information",
    body: [
      "With downstream and interconnecting carriers strictly as needed to complete and terminate calls you originate.",
      "With service providers who process data on our behalf under confidentiality obligations.",
      "With law enforcement or other parties when required by valid legal process, or to protect the rights, safety, and integrity of our network.",
      "We do not sell your personal information.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We retain call detail records and account data for as long as needed to provide the services, resolve disputes, meet billing and tax requirements, and comply with legal and regulatory obligations, after which we delete or de-identify it.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We protect data in transit and at rest using industry-standard controls, including encryption (TLS/SRTP) on supported interconnects, access controls, and network monitoring. No method of transmission or storage is perfectly secure, but we work to protect your information.",
    ],
  },
  {
    heading: "Your Rights & Choices",
    body: [
      "Depending on where you are located, you may have rights to access, correct, delete, or port your personal information, and to object to or restrict certain processing (for example, under the CCPA/CPRA or GDPR).",
      "To exercise a right, contact us at legal@telantix.com. We will verify your request and respond as required by applicable law.",
    ],
  },
  {
    heading: "Cookies & Tracking",
    body: [
      "Our website uses essential cookies to function and may use limited analytics to understand usage. You can control cookies through your browser settings.",
    ],
  },
  {
    heading: "Children’s Privacy",
    body: [
      "Our services are intended for businesses and are not directed to children under 13 (or the applicable age in your jurisdiction). We do not knowingly collect information from children.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Material changes will be reflected by updating the date above and, where appropriate, by additional notice.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      updated="JULY 2026"
      intro="How we collect, use, and protect information across our wholesale voice services — including Customer Proprietary Network Information."
      sections={SECTIONS}
    />
  );
}
