"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  defaultLocale,
  getLocaleFromPathname,
  withLocale,
} from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { EventsDict } from "@/lib/i18n/dictionaries/types";

interface EventClientProps {
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

export function EventsClient({ faqSchemaJson }: EventClientProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = useDictSlice("events") as EventsDict;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p
              {...stagger(0)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-claw-blue mb-4"
            >
              ClawPlex DFW
            </motion.p>
            <motion.h1
              {...stagger(1)}
              className="font-display text-4xl md:text-6xl tracking-wider text-claw-text leading-none"
            >
              {copy.heading}
            </motion.h1>
            <motion.p {...stagger(2)} className="mt-4 text-base text-claw-muted max-w-xl mx-auto">
              {copy.intro}
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
              {copy.upcoming}
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
                title={copy.calendarTitle}
              />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-claw-dim mb-4">
              {copy.ctaEyebrow}
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-6">
              {copy.ctaHeading}
            </motion.h2>
            <motion.p {...stagger(2)} className="text-base text-claw-muted mb-8">
              {copy.ctaText}
            </motion.p>
            <motion.div {...stagger(3)} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={withLocale("/newsletter", locale)}
                className="border border-claw-blue bg-claw-blue px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-blue/90 transition-colors text-center"
              >
                {copy.newsletter}
              </Link>
              <a
                href="https://discord.gg/q8kEquTu3z"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-blue hover:text-claw-blue transition-colors text-center"
              >
                {copy.discord}
              </a>
            </motion.div>
          </div>
        </section>
    </>
  );
}

export type { EventClientProps };
