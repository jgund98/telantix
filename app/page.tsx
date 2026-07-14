import { Hero } from "@/components/home/hero";
import { Thesis } from "@/components/home/thesis";
import { VerifiedCall } from "@/components/home/verified-call";
import { Services } from "@/components/home/services";
import { Coverage } from "@/components/home/coverage";
import { Failover } from "@/components/home/failover";
import { Metrics } from "@/components/home/metrics";
import { JunctionField } from "@/components/home/junction-field";
import { PeeringCTA } from "@/components/home/peering-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Thesis />
      <VerifiedCall />
      <Services />
      <Coverage />
      <Failover />
      <Metrics />
      <JunctionField />
      <PeeringCTA />
    </>
  );
}
