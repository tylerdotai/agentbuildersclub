"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, MessageCircle, Calendar, Users, Terminal, Sparkles } from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "Open Hack",
    description: "Bring your laptop. Break things. Ask the dumb questions.",
  },
  {
    icon: MessageCircle,
    title: "Show & Tell",
    description: "Demo what you're building. Get feedback. Inspire others.",
  },
  {
    icon: Calendar,
    title: "ClawCon DFW",
    description: "Our flagship event. Demos, talks, and IRL connections.",
  },
  {
    icon: Users,
    title: "Coffee & Chat",
    description: "Just humans talking about AI. No agenda. No slides.",
  },
];

const links = [
  {
    label: "Join Discord",
    href: "https://discord.gg/q8kEquTu3z",
    primary: true,
  },
  {
    label: "ClawCon DFW",
    href: "https://luma.com/clawcondfw?tk=k8qExi",
    primary: false,
  },
  {
    label: "ClawStin (Austin)",
    href: "https://clawstin.com",
    primary: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400"
          >
            <Sparkles className="h-4 w-4" />
            <span>Chapter II</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl"
          >
            Your agents are lonely.
            <br />
            <span className="text-zinc-400">So are you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-10 text-lg text-zinc-400 sm:text-xl"
          >
            ClawPlex is where DFW builders show up, plug in, and break things.
            No corporate ladder. No LinkedIn screening. Just demos, hacks,
            and humans who care about AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-100 px-8 text-zinc-950 font-medium transition-colors hover:bg-zinc-200"
            >
              <MessageCircle className="h-5 w-5" />
              Join the Discord
            </a>
            <a
              href="https://luma.com/clawcondfw?tk=k8qExi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-800 px-8 text-zinc-400 font-medium transition-colors hover:bg-zinc-900 hover:text-zinc-50"
            >
              <Calendar className="h-5 w-5" />
              ClawCon DFW
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-6 w-6 text-zinc-600"
          >
            <ChevronRight className="rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">What We Do</h2>
            <p className="text-zinc-400">Four ways to plug in.</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                  <CardContent className="p-6">
                    <feature.icon className="mb-4 h-8 w-8 text-zinc-400" />
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who's Here Section */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Who's Here</h2>
          <p className="mb-8 text-zinc-400">
            Builders, tinkerers, and people who actually use the things they build.
            200+ members and growing.
          </p>
          <div className="flex justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-11 items-center justify-center rounded-full px-8 font-medium transition-colors ${
                  link.primary
                    ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
                    : "border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-12">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">ClawPlex</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">DFW Personal AI</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="https://openclaw.ai" className="hover:text-zinc-50 transition-colors">
              OpenClaw
            </a>
            <a href="https://clawstin.com" className="hover:text-zinc-50 transition-colors">
              ClawStin (Austin)
            </a>
          </div>
          <p className="text-sm text-zinc-600">© 2026 ClawPlex</p>
        </div>
      </footer>
    </div>
  );
}
