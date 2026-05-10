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
    name: "DFW Node 04 — Frisco",
    startDate: "2026-05-15T14:00:00-05:00",
    endDate: "2026-05-15T16:00:00-05:00",
    location: "25N Coworking Frisco, Frisco TX",
    description:
      "Claude In The Wild Meetup. Informal meetup where people are putting Claude to work on real projects and sharing what actually helps in day-to-day use.",
    url: "https://luma.com/u3e9qs8i",
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