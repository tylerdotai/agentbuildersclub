import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SubscribeFormClient } from "@/components/newsletter/subscribe-form-client";
import { getLatestIssue, getAllIssues } from "@/lib/newsletter";

const ease = [0.25, 0.1, 0.25, 1] as const;

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  };
}

export const metadata: Metadata = {
  title: "The Drop — ClawPlex Newsletter",
  description: "Monthly dispatches from the DFW AI builder community",
  openGraph: {
    title: "The Drop — ClawPlex Newsletter",
    description: "Monthly dispatches from the DFW AI builder community",
    type: "website",
  },
};

export default function NewsletterPage() {
  const latest = getLatestIssue();
  const allIssues = getAllIssues();
  const pastIssues = allIssues.slice(1); // everything except the latest

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
              ClawPlex DFW
            </motion.p>
            <motion.h1 {...stagger(1)} className="font-display text-4xl md:text-6xl tracking-wider text-claw-text leading-none">
              THE DROP.
            </motion.h1>
            <motion.p {...stagger(2)} className="mt-4 font-mono text-xs uppercase tracking-widest text-claw-dim">
              Monthly dispatches from the DFW AI builder community
            </motion.p>
          </div>
        </section>

        {latest && (
          <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20">
            <div className="mx-auto max-w-3xl">
              <motion.div {...stagger(0)} className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-claw-orange border border-claw-orange/30 bg-claw-orange/5 px-3 py-1">
                  Issue {latest.number} — {latest.date}
                </span>
              </motion.div>

              <motion.p {...stagger(1)} className="font-mono text-xs text-claw-dim mb-2">
                {latest.from}
              </motion.p>
              <motion.h2 {...stagger(2)} className="font-display text-2xl md:text-4xl tracking-wider text-claw-text mb-10">
                {latest.subject}
              </motion.h2>

              <div className="space-y-5">
                {latest.body.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    {...stagger(i + 3)}
                    className="text-base text-claw-muted leading-relaxed"
                  >
                    {paragraph.startsWith("/") ? (
                      <>
                        {paragraph.split("/")[0]}
                        <code className="font-mono text-sm text-claw-text bg-claw-surface px-1.5 py-0.5">/{paragraph.split("/")[1]}</code>
                        {paragraph.split("/").slice(2).join("/")}
                      </>
                    ) : (
                      paragraph
                    )}
                  </motion.p>
                ))}
              </div>

              {latest.nextNode && (
                <motion.div
                  {...stagger(latest.body.length + 3)}
                  className="mt-12 border border-claw-orange/30 bg-claw-orange/5 px-6 py-6"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-orange mb-2">
                    Next Node
                  </p>
                  <p className="font-display text-xl text-claw-text mb-1">
                    {latest.nextNode.title}
                  </p>
                  <p className="font-mono text-sm text-claw-dim mb-4">
                    {latest.nextNode.venue}
                  </p>
                  <a
                    href={latest.nextNode.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-claw-orange hover:underline"
                  >
                    RSVP Now →
                  </a>
                </motion.div>
              )}

              <motion.div {...stagger(latest.body.length + 4)} className="mt-12 pt-8 border-t border-claw-border">
                <p className="font-display text-xl text-claw-text">{latest.signature}</p>
                <p className="font-mono text-xs text-claw-dim mt-1">
                  {latest.signatureTitle}
                </p>
              </motion.div>

              <motion.div {...stagger(latest.body.length + 5)} className="mt-6">
                <Link
                  href={`/newsletter/${latest.slug}`}
                  className="font-mono text-xs text-claw-dim hover:text-claw-orange transition-colors"
                >
                  Read full issue →
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Subscribe */}
        <SubscribeSection />

        {/* Past Issues */}
        {pastIssues.length > 0 && (
          <section className="px-5 md:px-8 py-16 md:py-20">
            <div className="mx-auto max-w-3xl">
              <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-claw-dim mb-8">
                Past Issues
              </motion.p>
              <div className="space-y-4">
                {pastIssues.map((issue, i) => (
                  <motion.div key={issue.slug} {...stagger(i + 1)}>
                    <Link
                      href={`/newsletter/${issue.slug}`}
                      className="border border-claw-border px-6 py-4 flex items-center justify-between hover:border-claw-border-hover transition-colors"
                    >
                      <div>
                        <p className="font-mono text-[10px] text-claw-orange uppercase tracking-widest mb-1">
                          Issue {issue.number} — {issue.date}
                        </p>
                        <p className="text-sm text-claw-muted">{issue.subject}</p>
                      </div>
                      <span className="font-mono text-xs text-claw-dim">Read →</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function SubscribeSection() {
  return (
    <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2 {...stagger(0)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-4">
          GET THE NEXT DROP.
        </motion.h2>
        <motion.p {...stagger(1)} className="text-base text-claw-muted mb-8">
          Event reminders, builder spotlights, and DFW AI community updates. No spam.
        </motion.p>
        <SubscribeForm />
      </div>
    </section>
  );
}

function SubscribeForm() {
  // Client-side interactivity handled by an island
  return (
    <SubscribeFormClient />
  );
}