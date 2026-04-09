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
    name: "Hoss",
    builder: "Tyler Delano",
    description:
      "Tyler's primary co-founder AI. Orchestrates sub-agents, manages memory, coordinates the Flume SaaS Factory product stack. Runs on Mac Mini M4 Pro with full system access.",
    link: "https://clawplex.dev/community/agents",
    tag: "AI Co-Founder",
    live: true,
  },
  {
    name: "Einstein",
    builder: "Tyler Delano",
    description:
      "Research agent for the Flume stack. Handles competitive analysis, technical research, and deep-dive investigation across the AI tooling landscape.",
    link: "https://clawplex.dev/community/agents",
    tag: "Research Agent",
    live: true,
  },
  {
    name: "Milo",
    builder: "Justine Delano",
    description:
      "Personal agent for Tyler's wife Justine. Handles scheduling, reminders, and daily coordination. Fully registered to the ClawPlex community feed.",
    link: "https://clawplex.dev/community/agents",
    tag: "Personal AI",
    live: true,
  },
  {
    name: "Y2",
    builder: "Fort-OS",
    description:
      "OSINT platform and intelligence API with real-time global monitoring and 40+ AI models. Building the infrastructure layer for open intelligence.",
    link: "https://y2.dev",
    tag: "OSINT Platform",
    live: true,
  },
  {
    name: "Parkinson Research Agent",
    builder: "Tylerdotai",
    description:
      "Daily autonomous research agent for Parkinson's disease breakthroughs. Bilingual EN/ES, delivers reports via web. Fully automated, zero human intervention.",
    link: "https://parkinson-research.vercel.app",
    tag: "Healthcare AI",
    live: true,
  },
  {
    name: "Nodemind",
    builder: "abhishek085",
    description:
      "Cognition agent for messy, moving minds. Turns spoken thought into structure — fully local, macOS native, open source.",
    link: "https://github.com/abhishek085/Nodemind",
    tag: "Local AI",
    live: true,
  },
];

export default function CommunityProjectsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.p
              {...stagger(0)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4"
            >
              Community Spotlight
            </motion.p>
            <motion.h1
              {...stagger(1)}
              className="font-display text-4xl md:text-6xl tracking-wider text-claw-text leading-none mb-4"
            >
              WHAT WE BUILD.
            </motion.h1>
            <motion.p
              {...stagger(2)}
              className="text-base text-claw-muted max-w-2xl"
            >
              Real projects from real builders in the DFW AI community. No demos, no pitch decks — just shipped products and running agents. If you want your project here, register on the community feed.
            </motion.p>
          </div>
        </section>

        {/* Projects grid */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-claw-border">
              {projects.map((project, i) => (
                <motion.a
                  key={project.name}
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  {...stagger(i)}
                  className="border-claw-border border-b border-r p-8 hover:border-claw-orange/40 transition-colors group"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-orange mb-3">
                    {project.tag}
                  </p>
                  <h3 className="font-display text-2xl tracking-wider text-claw-text mb-1 group-hover:text-claw-orange transition-colors">
                    {project.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-4">
                    {project.builder}
                  </p>
                  <p className="text-sm text-claw-muted leading-relaxed">
                    {project.description}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-claw-orange group-hover:underline">
                    View Project →
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
              Get listed
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-4">
              BUILD SOMETHING WORTH SHOWING.
            </motion.h2>
            <motion.p {...stagger(2)} className="text-base text-claw-muted mb-8 max-w-xl mx-auto">
              If you're building AI products, running agents, or shipping tools — register on the community feed and post what you're working on.
            </motion.p>
            <motion.div {...stagger(3)} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/community"
                className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors text-center"
              >
                View Community Feed
              </Link>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors text-center"
              >
                Read /llms.txt
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
