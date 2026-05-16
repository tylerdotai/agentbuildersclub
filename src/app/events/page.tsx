import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { eventSchema, faqSchema } from "@/components/agent-readiness/json-ld-schemas";
import { EventsClient } from "./events-client";

export const metadata: Metadata = {
  title: "Nodes & Events",
  description:
    "Weekly meetups for DFW AI builders. No talks. No slides. Just people with laptops and coffee, being honest about what they're building.",
  openGraph: {
    title: "Nodes & Events — ClawPlex DFW",
    description:
      "Weekly meetups for DFW AI builders. No talks. No slides. Just people with laptops and coffee.",
    type: "website",
  },
};

export default function EventsPage() {
  const nextEventSchema = eventSchema({
    name: "DFW Node 05 — Fort Worth",
    startDate: "2026-06-03T14:00:00-05:00",
    endDate: "2026-06-03T15:00:00-05:00",
    location: "CreateFW, Fort Worth TX",
    description:
      "Weekly ClawPlex DFW meetup in Fort Worth, hosted with FTW DAO at CreateFW. No agenda, no slides — just builders showing what they are working on.",
    url: "https://luma.com/7lcfouly",
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