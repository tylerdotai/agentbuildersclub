import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { eventSchema, faqSchema } from "@/components/agent-readiness/json-ld-schemas";
import { EventsClient } from "./events-client";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Nodes & Events";
  return {
    title,
    description:
      "Community events for AI builders. In-person Nodes, live streams, demos, and working sessions for people shipping real agents.",
    openGraph: {
      title: `${title} — Agent Builders Club`,
      description:
        "Community events for AI builders. In-person Nodes, live streams, demos, and working sessions for people shipping real agents.",
      type: "website",
    },
  };
}

export default async function EventsPage() {
  const nextEventSchema = eventSchema({
    name: "Agent Builders Club: DFW AI Builders Node",
    startDate: "2026-07-15T17:00:00-05:00",
    endDate: "2026-07-15T19:00:00-05:00",
    location: "The DEC Network @ Fort Worth, 600 Bryan Ave #220, Fort Worth, TX 76104",
    description:
      "Casual Agent Builders Club DFW meetup in Fort Worth, co-organized with FWTX DAO. Build-and-chill: bring a laptop, work on your project, ask questions, show a demo if you've got one. No formal programming, no slides — just builders shipping in person.",
    url: "https://luma.com/evimcn31",
    status: "confirmed",
  });

  const faq = faqSchema();

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content" className="pt-16">
        <EventsClient
          eventSchemaJson={JSON.stringify(nextEventSchema)}
          faqSchemaJson={JSON.stringify(faq)}
        />
      </main>
      <Footer />
    </div>
  );
}
