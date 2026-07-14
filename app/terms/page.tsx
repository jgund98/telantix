import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of Telantix wholesale voice services — SIP trunking, caller IDs, phone numbers, and outbound termination.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Agreement to Terms",
    body: [
      "These Terms of Service (“Terms”) govern your access to and use of the Telantix network and services. By ordering, connecting to, or using our services, you agree to these Terms and to our Acceptable Use Policy and Privacy Policy, which are incorporated by reference.",
      "If a separate signed master service agreement or order form exists between you and Telantix, that agreement controls where it conflicts with these Terms.",
    ],
  },
  {
    heading: "The Services",
    body: [
      "Telantix provides wholesale voice services, including SIP trunking, outbound voice termination, caller-ID and phone-number services, and related network services. Features, rates, and capacity are described on your order or rate sheet.",
    ],
  },
  {
    heading: "Eligibility & Accounts",
    body: [
      "You must be a business, be at least the age of majority, and provide accurate registration and billing information. You are responsible for maintaining the confidentiality of your credentials and for all traffic sent over your trunks, whether authorized by you or not.",
    ],
  },
  {
    heading: "Acceptable Use",
    body: [
      "Your use of the services must comply with our Acceptable Use Policy, including prohibitions on illegal traffic, caller-ID spoofing, unlawful robocalling, and fraud. Violations may result in immediate suspension.",
    ],
  },
  {
    heading: "Fees, Billing & Taxes",
    body: [
      "You agree to pay all charges at the rates in effect for your account. Unless otherwise agreed, usage is billed per minute or per the units stated on your order. Charges exclude taxes, surcharges, and regulatory fees, which are your responsibility.",
      "Undisputed invoices are due on the terms stated on the invoice. We may suspend service for non-payment after notice.",
    ],
  },
  {
    heading: "Service Levels & Support",
    body: [
      "We target 99.99% median monthly network availability and provide 24/7 support. Specific service-level commitments and remedies, if any, are set out in your order or a separate SLA. Published performance figures are network-wide indicators, not guarantees for any individual route.",
    ],
  },
  {
    heading: "Numbers & Caller ID",
    body: [
      "Phone numbers and caller IDs are provided for your lawful use and remain subject to numbering regulations and portability rules. You represent that you are authorized to use any caller ID you present, and you must not present misleading or unlawful caller identification.",
    ],
  },
  {
    heading: "Compliance",
    body: [
      "You are responsible for complying with all laws applicable to your calling, including the Telephone Consumer Protection Act (TCPA), STIR/SHAKEN and robocall-mitigation requirements, and consent and do-not-call obligations. We may require robocall-mitigation information and may block or refuse traffic that appears unlawful.",
    ],
  },
  {
    heading: "Suspension & Termination",
    body: [
      "We may suspend or terminate services for breach of these Terms or the Acceptable Use Policy, non-payment, suspected fraud, or where required to protect the network or comply with law. Either party may terminate as set out in your order.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "The services are provided “as is” and “as available.” To the fullest extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant uninterrupted or error-free service.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits or revenues. Our total liability arising out of the services will not exceed the amounts you paid to us for the services in the three months preceding the claim.",
    ],
  },
  {
    heading: "Indemnification",
    body: [
      "You will defend and indemnify Telantix against claims arising from your traffic, your caller IDs, your end users, or your breach of these Terms, the Acceptable Use Policy, or applicable law.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms are governed by the laws of the State of [State], without regard to conflict-of-laws rules. The parties consent to the exclusive jurisdiction of the state and federal courts located there, unless a signed agreement specifies otherwise.",
    ],
  },
  {
    heading: "Changes to Terms",
    body: [
      "We may update these Terms from time to time. Continued use of the services after changes take effect constitutes acceptance of the updated Terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms"
      title="Terms of Service"
      updated="JULY 2026"
      intro="The terms that govern your access to and use of the Telantix network and services."
      sections={SECTIONS}
    />
  );
}
