import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { faqSchema } from "@/components/agent-readiness/json-ld-schemas";
import { EventsClient } from "./events-client";
import { getRequestLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = locale === "es" ? "Nodes y eventos" : "Nodes & Events";
  const description = locale === "es"
    ? "Calendario en vivo de Nodes para builders de IA en DFW. Sin charlas. Sin diapositivas. Solo gente con laptops y café."
    : "Live calendar for DFW AI builder Nodes. No talks. No slides. Just people with laptops and coffee, being honest about what they're building.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} — ClawPlex DFW`,
      description,
      type: "website",
    },
  };
}

export default async function EventsPage() {
  const faq = faqSchema();

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content" className="pt-16">
        <EventsClient
          faqSchemaJson={JSON.stringify(faq)}
        />
      </main>
      <Footer />
    </div>
  );
}
