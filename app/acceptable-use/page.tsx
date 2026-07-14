import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "The traffic and conduct rules for the Telantix network — caller-ID integrity, anti-fraud, TCPA, and emergency-services limitations.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Purpose",
    body: [
      "This Acceptable Use Policy (“AUP”) protects the integrity of the Telantix network and the businesses that rely on it. It applies to everyone who sends traffic over our services. We may update it as laws and threats evolve.",
    ],
  },
  {
    heading: "Prohibited Traffic & Conduct",
    body: [
      "You may not use the services for any unlawful purpose or to transmit traffic that is fraudulent, harassing, deceptive, or that violates the rights of others.",
      "Prohibited traffic includes, without limitation: illegal robocalls, unlawful telemarketing, phishing or “vishing” campaigns, traffic pumping or access-stimulation schemes, international revenue-share fraud, and any traffic that violates applicable law.",
    ],
  },
  {
    heading: "Caller ID & STIR/SHAKEN",
    body: [
      "You must present accurate, authorized caller identification. Spoofing caller ID with intent to defraud, cause harm, or wrongfully obtain value is prohibited and illegal under the Truth in Caller ID Act.",
      "We sign originating calls with STIR/SHAKEN attestation where supported. You must provide accurate information necessary for attestation and robocall mitigation.",
    ],
  },
  {
    heading: "Anti-Fraud & Traffic Integrity",
    body: [
      "We continuously monitor for fraud, artificial inflation of traffic, and abnormal patterns. We may rate-limit, block, or suspend traffic that threatens the network, our other customers, or downstream carriers, including without prior notice where necessary.",
    ],
  },
  {
    heading: "TCPA & Consent",
    body: [
      "You are solely responsible for obtaining and maintaining any consent required to place your calls, for honoring do-not-call and revocation requests, and for complying with the Telephone Consumer Protection Act and equivalent state laws.",
    ],
  },
  {
    heading: "Emergency Services (911)",
    body: [
      "Our wholesale voice and outbound services are not a replacement for traditional telephone service and, unless expressly agreed in writing, do not provide access to 911 or emergency services. You are responsible for arranging emergency-calling capabilities for your end users and for notifying them of any limitations.",
    ],
  },
  {
    heading: "Enforcement & Suspension",
    body: [
      "Violations of this AUP may result in traffic blocking, suspension, or termination, and we may report unlawful activity to carriers, industry consortia, and authorities. We may also pursue any remedies available at law.",
    ],
  },
  {
    heading: "Reporting Abuse",
    body: [
      "To report suspected abuse, fraud, or unlawful traffic on our network, contact us at abuse@telantix.com. We investigate credible reports promptly.",
    ],
  },
];

export default function AcceptableUsePage() {
  return (
    <LegalPage
      eyebrow="Legal · Acceptable Use"
      title="Acceptable Use Policy"
      updated="JULY 2026"
      intro="The traffic and conduct rules that keep the Telantix network clean, lawful, and fast for everyone on it."
      sections={SECTIONS}
    />
  );
}
