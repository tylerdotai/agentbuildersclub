import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SponsorsClient } from "./sponsors-client";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Sponsor the DFW AI builder community. ClawPlex is a volunteer-run community for DFW builders shipping AI products. Sponsors make it free to attend and keep the focus on building.",
  openGraph: {
    title: "Sponsor — ClawPlex DFW",
    description:
      "Sponsor the DFW AI builder community. Make it free to attend and keep the focus on building.",
    type: "website",
  },
};

export default function SponsorsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <SponsorsClient />
      </main>
      <Footer />
    </div>
  );
}