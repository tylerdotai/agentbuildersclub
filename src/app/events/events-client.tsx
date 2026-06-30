"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";

interface EventClientProps {
  eventSchemaJson: string;
  faqSchemaJson: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};

function stagger(i: number) {
  return { ...fade, transition: { duration: 0.7, ease, delay: i * 0.08 } };
}

const pastEvents = [
  {
    slug: "node-0-launch",
    title: "Node 0 — The Launch",
    date: "January 2026",
    image: "/node-0.webp",
    description:
      "Forty builders packed into a borrowed co-working space. No agenda, no speakers — just people who wanted to see what happens when AI agents get built in public. We raffled a 4090, someone demoed a cold email agent that actually worked, and the room didn't clear until 10pm.",
    stats: [
      { value: "40", label: "Attendees" },
      { value: "5", label: "Live Demos" },
      { value: "3", label: "Agents Shipped" },
    ],
  },
];

export function EventsClient({ eventSchemaJson, faqSchemaJson }: EventClientProps) {
  return (
    <>
      {/* JSON-LD: Event + FAQ schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: eventSchemaJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />
      <div className="min-h-screen">
        <Nav />
        <main>
          {/* Header */}
          <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <motion.p
                {...stagger(0)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-claw-blue mb-4"
              >
                Agent Builders Club DFW
              </motion.p>
              <motion.h1
                {...stagger(1)}
                className="font-display text-4xl md:text-6xl tracking-wider text-claw-text leading-none"
              >
                Events
              </motion.h1>
              <motion.p {...stagger(2)} className="mt-4 text-base text-claw-muted max-w-xl mx-auto">
                Every week, builders come together to ship something real.
                No panels. No slides. Just demos, code, and decisions made in the room.
              </motion.p>
            </div>
          </section>

          {/* Calendar */}
          <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
              <motion.p
                {...stagger(0)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-claw-blue mb-10 text-center"
              >
                Upcoming
              </motion.p>
              <motion.div
                {...stagger(1)}
                className="relative w-full"
                style={{ paddingTop: "75%" }}
              >
                <iframe
                  src="https://luma.com/embed/calendar/cal-AzkmUYVr0KtSTQ9/events"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: "1px solid #bfcbda88", borderRadius: "4px", position: "absolute", top: 0, left: 0 }}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                  title="Agent Builders Club Events"
                />
              </motion.div>
            </div>
          </section>

          {/* Past */}
          {pastEvents.length > 0 && (
            <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
              <div className="mx-auto max-w-5xl">
                <motion.p
                  {...stagger(0)}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-claw-dim mb-10 text-center"
                >
                  Past Events
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {pastEvents.map((event, i) => (
                    <motion.div key={event.slug} {...stagger(i + 1)}>
                      <div className="relative overflow-hidden border border-claw-border aspect-video mb-4">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover opacity-70"
                        />
                        <div className="absolute top-4 left-4 border border-claw-border bg-claw-void/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                          Past
                        </div>
                      </div>
                      <h2 className="font-display text-4xl md:text-5xl tracking-wider text-claw-text mb-2">
                        {event.title}.
                      </h2>
                      <p className="font-mono text-sm text-claw-dim uppercase tracking-widest mb-4">
                        {event.date}
                      </p>
                      <p className="text-base text-claw-muted leading-relaxed mb-6">
                        {event.description}
                      </p>
                      {event.stats && (
                        <div className="flex gap-8 border-t border-claw-border pt-6">
                          {event.stats.map((stat) => (
                            <div key={stat.label}>
                              <p className="font-display text-3xl text-claw-blue">
                                {stat.value}
                              </p>
                              <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mt-1">
                                {stat.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="px-5 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-claw-dim mb-4">
                Stay in the Loop
              </motion.p>
              <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-6">
                Come to the next Node.
              </motion.h2>
              <motion.p {...stagger(2)} className="text-base text-claw-muted mb-8">
                Every Node is free to attend. Bring a build to show, or just come to watch.
                Either way — you won't leave empty-handed.
              </motion.p>
              <motion.div {...stagger(3)} className="flex justify-center">
                <a
                  href="https://discord.gg/q8kEquTu3z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-blue hover:text-claw-blue transition-colors text-center"
                >
                  Join Discord
                </a>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export type { EventClientProps };
