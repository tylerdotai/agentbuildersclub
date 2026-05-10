import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getIssueBySlug, getAllSlugs, getAllIssues } from "@/lib/newsletter";

const ease = [0.25, 0.1, 0.25, 1] as const;

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) return {};
  return {
    title: `Issue ${issue.number} — ${issue.subject}`,
    description: `ClawPlex newsletter: ${issue.subject}`,
    openGraph: {
      title: issue.subject,
      description: `Issue ${issue.number} — ${issue.date}`,
      type: "article",
      publishedTime: issue.publishedAt,
    },
  };
}

export default async function IssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) notFound();

  const allIssues = getAllIssues();
  const currentIndex = allIssues.findIndex((i) => i.slug === slug);
  const prevIssue = allIssues[currentIndex + 1] ?? null; // older issue
  const nextIssue = allIssues[currentIndex - 1] ?? null;  // newer issue (if any)

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
              <Link href="/newsletter" className="hover:text-claw-orange/70 transition-colors">
                ← The Drop
              </Link>
            </motion.p>
            <motion.div {...stagger(1)} className="mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-claw-orange border border-claw-orange/30 bg-claw-orange/5 px-3 py-1">
                Issue {issue.number} — {issue.date}
              </span>
            </motion.div>

            <motion.p {...stagger(2)} className="font-mono text-xs text-claw-dim mb-2">
              {issue.from}
            </motion.p>
            <motion.h1 {...stagger(3)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-10">
              {issue.subject}
            </motion.h1>

            <motion.p {...stagger(4)} className="font-mono text-xs text-claw-dim">
              Published {issue.publishedAt}
            </motion.p>
          </div>
        </section>

        {/* Body */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-5">
              {issue.body.map((paragraph, i) => (
                <motion.p
                  key={i}
                  {...stagger(i + 5)}
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

            {issue.nextNode && (
              <motion.div
                {...stagger(issue.body.length + 5)}
                className="mt-12 border border-claw-orange/30 bg-claw-orange/5 px-6 py-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-claw-orange mb-2">
                  Next Node
                </p>
                <p className="font-display text-xl text-claw-text mb-1">
                  {issue.nextNode.title}
                </p>
                <p className="font-mono text-sm text-claw-dim mb-4">
                  {issue.nextNode.venue}
                </p>
                <a
                  href={issue.nextNode.rsvpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-claw-orange hover:underline"
                >
                  RSVP Now →
                </a>
              </motion.div>
            )}

            <motion.div {...stagger(issue.body.length + 6)} className="mt-12 pt-8 border-t border-claw-border">
              <p className="font-display text-xl text-claw-text">{issue.signature}</p>
              <p className="font-mono text-xs text-claw-dim mt-1">
                {issue.signatureTitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Navigation */}
        <section className="px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="flex justify-between items-center">
              {prevIssue ? (
                <Link
                  href={`/newsletter/${prevIssue.slug}`}
                  className="border border-claw-border px-6 py-4 hover:border-claw-orange transition-colors"
                >
                  <p className="font-mono text-[10px] text-claw-dim uppercase tracking-widest mb-1">← Older</p>
                  <p className="text-sm text-claw-muted">Issue {prevIssue.number} — {prevIssue.date}</p>
                </Link>
              ) : (
                <div />
              )}
              {nextIssue ? (
                <Link
                  href={`/newsletter/${nextIssue.slug}`}
                  className="border border-claw-border px-6 py-4 hover:border-claw-orange transition-colors text-right"
                >
                  <p className="font-mono text-[10px] text-claw-dim uppercase tracking-widest mb-1">Newer →</p>
                  <p className="text-sm text-claw-muted">Issue {nextIssue.number} — {nextIssue.date}</p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}