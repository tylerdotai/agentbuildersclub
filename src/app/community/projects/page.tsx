"use client";

import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";

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

const projects = [
  {
    name: "Coldmail",
    tag: "Email",
    builder: "@alexkim",
    link: "#",
    description:
      "LLM-powered cold email agent. Scrapes LinkedIn, writes personalized outreach, handles replies. 18% reply rate across 1,200 sends.",
  },
  {
    name: "Research Loop",
    tag: "Research",
    builder: "@taylorq",
    link: "#",
    description:
      "Recursive web research agent. Given a thesis, it pulls sources, cross-references claims, and returns a cited brief in under 4 minutes.",
  },
  {
    name: "Permit Bot",
    tag: "Legal",
    builder: "@marcusbell",
    link: "#",
    description:
      "Conversational agent for Texas small business permit research. Cuts permit research time from 6 hours to 22 minutes.",
  },
  {
    name: "Contract Scout",
    tag: "Legal",
    builder: "@sarahchen",
    link: "#",
    description:
      "NLP agent that reviews vendor contracts for risky clauses, auto-flags indemnity language, and summarizes exposure in plain English.",
  },
  {
    name: "DFW Events Digest",
    tag: "Social",
    builder: "@davidpark",
    link: "#",
    description:
      "Aggregates event data from Luma, Meetup, and Eventbrite across 12 DFW categories. Posts daily digest to Discord with rsvp links.",
  },
];

const resources = [
  {
    name: "Agent Builders Handbook",
    tag: "Guide",
    link: "#",
    description: "How to build, ship, and iterate on AI agents in public. Written by the Node community.",
  },
  {
    name: "Prompt Library",
    tag: "Open Source",
    link: "#",
    description: "Tested prompts for agents that actually work. Covering email, research, legal, and code.",
  },
];

export default function CommunityProjectsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.p
              {...stagger(0)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4"
            >
              Agent Builders Club
            </motion.p>
            <motion.h1
              {...stagger(1)}
              className="font-display text-4xl md:text-6xl tracking-wider text-text leading-none mb-4"
            >
              We Ship Agents.
            </motion.h1>
            <motion.p
              {...stagger(2)}
              className="text-base text-muted max-w-2xl"
            >
              Real projects from real builders. Agents that work, automate things
              that matter, and get torn apart in the Node community every week.
            </motion.p>
          </div>
        </section>

        {/* Projects grid */}
        <section className="border-b border-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
              {projects.map((project, i) => (
                <motion.a
                  key={project.name}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stagger(i)}
                  className="border-border border-b border-r p-8 hover:border-accent/40 transition-colors group"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">
                    {project.tag}
                  </p>
                  <h3 className="font-display text-2xl tracking-wider text-text mb-1 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-dim mb-4">
                    {project.builder}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent group-hover:underline">
                    View Project →
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="border-b border-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-dim mb-8">
              Resources
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
              {resources.map((resource, i) => (
                <motion.a
                  key={resource.name}
                  href={resource.link}
                  {...stagger(i + 1)}
                  className="border-border border-b border-r p-8 hover:border-accent/40 transition-colors group"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent-light mb-3">
                    {resource.tag}
                  </p>
                  <h3 className="font-display text-xl tracking-wider text-text mb-2 group-hover:text-accent transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {resource.description}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent group-hover:underline">
                    Explore →
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
              Ship Something
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-text mb-4">
              Bring a build to the next Node.
            </motion.h2>
            <motion.p {...stagger(2)} className="text-base text-muted mb-8 max-w-xl mx-auto">
              Every Node, builders show what they've shipped. Get real feedback
              from people who actually use this stuff.
            </motion.p>
            <motion.div {...stagger(3)} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/community"
                className="border border-accent bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-void hover:bg-accent/90 transition-colors text-center"
              >
                Member Feed
              </Link>
              <Link
                href="/skills"
                className="border border-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors text-center"
              >
                Skills
              </Link>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors text-center"
              >
                LLMs.txt
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
