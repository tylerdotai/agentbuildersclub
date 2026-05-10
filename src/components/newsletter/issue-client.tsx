"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ParagraphBlock } from "@/lib/newsletter";

const ease = [0.25, 0.1, 0.25, 1] as const;

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  };
}

function renderParagraph(segments: ParagraphBlock["segments"]) {
  return segments.map((seg, j) => {
    switch (seg.type) {
      case "bold":
        return <strong key={j} className="font-bold text-claw-text">{seg.content}</strong>;
      case "code":
        return <code key={j} className="font-mono text-sm text-claw-text bg-claw-surface px-1.5 py-0.5">{seg.content}</code>;
      case "link":
        return (
          <a
            key={j}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-claw-orange hover:underline"
          >
            {seg.content}
          </a>
        );
      default:
        return <span key={j}>{seg.content}</span>;
    }
  });
}

interface IssueClientProps {
  issue: {
    slug: string;
    number: number;
    date: string;
    publishedAt?: string;
    from: string;
    subject: string;
    body: ParagraphBlock[];
    nextNode: { title: string; venue: string; rsvpUrl: string } | null;
    signature: string;
    signatureTitle: string;
  };
  prevIssue: { slug: string; number: number; date: string } | null;
  nextIssue: { slug: string; number: number; date: string } | null;
}

export function IssueClient({ issue, prevIssue, nextIssue }: IssueClientProps) {
  return (
    <>
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

          {issue.publishedAt && (
            <motion.p {...stagger(4)} className="font-mono text-xs text-claw-dim">
              Published {issue.publishedAt}
            </motion.p>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-5">
            {issue.body.map((block, i) => (
              <motion.p
                key={i}
                {...stagger(i + 5)}
                className="text-base text-claw-muted leading-relaxed"
              >
                {renderParagraph(block.segments)}
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
    </>
  );
}