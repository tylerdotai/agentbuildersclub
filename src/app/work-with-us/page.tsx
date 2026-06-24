import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WorkWithUsClient } from "./work-with-us-client";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Work With Us";
  const description =
    "Partner with the DFW AI builder community: sponsorships, venue partnerships, and AI credits.";
  return {
    title,
    description,
    alternates: {
      canonical: "/work-with-us",
    },
    openGraph: {
      title: `${title} — ClawPlex DFW`,
      description,
      type: "website",
      url: "/work-with-us",
    },
  };
}

export default function WorkWithUsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <WorkWithUsClient />
      </main>
      <Footer />
    </div>
  );
}
