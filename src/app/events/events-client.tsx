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

const pastEvents: { slug: string; title: string; date: string; image: string; description: string; stats?: { value: string; label: string }[] }[] = [
  // TODO: add real event data from Luma or meetup notes
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
          <section className="border-b border-border px-5 md:px-8 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <motion.p
                {...stagger(0)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4"
              >
                Agent Builders Club DFW
              </motion.p>
              <motion.h1
                {...stagger(1)}
                className="font-display text-4xl md:text-6xl tracking-wider text-text leading-none"
              >
                Events
              </motion.h1>
              <motion.p {...stagger(2)} className="mt-4 text-base text-muted max-w-xl mx-auto">
                Every week, builders come together to ship something real.
                No panels. No slides. Just demos, code, and decisions made in the room.
              </motion.p>
            </div>
          </section>

          {/* Calendar */}
          <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
              <motion.p
                {...stagger(0)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-10 text-center"
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
            <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
              <div className="mx-auto max-w-5xl">
                <motion.p
                  {...stagger(0)}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-10 text-center"
                >
                  Past Events
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {pastEvents.map((event, i) => (
                    <motion.div key={event.slug} {...stagger(i + 1)}>
                      <div className="relative overflow-hidden border border-border aspect-video mb-4">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover opacity-70"
                        />
                        <div className="absolute top-4 left-4 border border-border bg-void/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-dim">
                          Past
                        </div>
                      </div>
                      <h2 className="font-display text-4xl md:text-5xl tracking-wider text-text mb-2">
                        {event.title}.
                      </h2>
                      <p className="font-mono text-sm text-dim uppercase tracking-widest mb-4">
                        {event.date}
                      </p>
                      <p className="text-base text-muted leading-relaxed mb-6">
                        {event.description}
                      </p>
                      {event.stats && (
                        <div className="flex gap-8 border-t border-border pt-6">
                          {event.stats.map((stat) => (
                            <div key={stat.label}>
                              <p className="font-display text-3xl text-accent">
                                {stat.value}
                              </p>
                              <p className="font-mono text-[10px] uppercase tracking-widest text-dim mt-1">
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
              <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-dim mb-4">
                Stay in the Loop
              </motion.p>
              <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-text mb-6">
                Come to the next Node.
              </motion.h2>
              <motion.p {...stagger(2)} className="text-base text-muted mb-8">
                Every Node is free to attend. Bring a build to show, or just come to watch.
                Either way — you won't leave empty-handed.
              </motion.p>
              <motion.div {...stagger(3)} className="flex justify-center">
                <a
                  href="https://discord.gg/q8kEquTu3z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors text-center"
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
