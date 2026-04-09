"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

/* ── Scroll animation preset ─────────────────────────────────────────────── */
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

/* ── Countdown ───────────────────────────────────────────────────────────── */
function Countdown({ target }: { target: Date }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    function update() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setDays(0); setHours(0); setMinutes(0);
        return;
      }
      setDays(Math.floor(diff / 86400000));
      setHours(Math.floor((diff % 86400000) / 3600000));
      setMinutes(Math.floor((diff % 3600000) / 60000));
    }
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-claw-orange">
      {[
        { val: days, label: "Days" },
        { val: hours, label: "Hours" },
        { val: minutes, label: "Min" },
      ].map(({ val, label }) => (
        <div key={label} className="text-center">
          <div className="text-5xl md:text-6xl font-display text-claw-text">{String(val).padStart(2, "0")}</div>
          <div className="text-[10px] text-claw-dim mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── HeroBanner — Headline + image ────────────────────────────────────── */
function HeroBanner() {
  return (
    <div className="relative" style={{ minHeight: "380px" }}>
      {/* Headline at the top — fully readable, no image underneath */}
      <div className="relative z-10 px-5 pt-16 pb-10 text-center bg-claw-void">
        <h1 className="font-display text-5xl md:text-7xl tracking-wider text-claw-text leading-tight">
          Built by builders, for builders.
        </h1>
      </div>

      {/* Banner image below headline */}
      <div className="relative" style={{ height: "55vh", minHeight: "300px" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/clawplex-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        {/* Fade to dark at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 30%, #0C0C0E 100%)",
          }}
        />
      </div>
    </div>
  );
}

/* ── What is ClawPlex ───────────────────────────────────────────────────── */
function WhatIsClawPlex() {
  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          {...stagger(0)}
          className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-6"
        >
          DFW AI Builder Community
        </motion.p>
        <motion.div
          {...stagger(2)}
          className="space-y-4 text-base md:text-lg text-claw-muted leading-relaxed max-w-2xl mx-auto mb-10"
        >
          <p>
            ClawPlex is the DFW home base for AI agent builders — the people shipping products with AI, running local models, and automating their workflows.
          </p>
          <p>
            We meet weekly to demo what we&apos;ve shipped, share what broke, and push each other to actually <strong className="text-claw-text font-medium">build</strong> — not just talk about building.
          </p>
        </motion.div>
        <motion.div
          {...stagger(3)}
          className="flex flex-wrap justify-center gap-3 font-mono text-[10px] uppercase tracking-widest"
        >
          {["Weekly meetups", "No sales pitches", "For you & your agent"].map((tag) => (
            <span key={tag} className="border border-claw-border px-3 py-1.5 text-claw-dim">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Event Section — Countdown + RSVP ──────────────────────────────────── */
function EventSection() {
  const eventDate = new Date("2026-04-15T14:00:00-05:00");

  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          {...stagger(0)}
          className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4"
        >
          Next Node
        </motion.p>
        <motion.h2
          {...stagger(1)}
          className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-2"
        >
          DFW Node 02 — Arlington
        </motion.h2>
        <motion.p
          {...stagger(2)}
          className="font-mono text-sm text-claw-dim uppercase tracking-widest mb-10"
        >
          April 15, 2026 · 2–3 PM · Spark Coworking, Arlington TX
        </motion.p>

        {/* Countdown */}
        <motion.div
          {...stagger(3)}
          className="flex justify-center mb-10"
        >
          <Countdown target={eventDate} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...stagger(4)}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="https://luma.com/calendar/cal-AzkmUYVr0KtSTQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-claw-orange bg-claw-orange px-10 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors text-center"
          >
            View Calendar
          </a>
          <a
            href="https://discord.gg/q8kEquTu3z"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-claw-border px-10 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors text-center"
          >
            Join Discord
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Three Ways to Engage ─────────────────────────────────────────────── */
function ThreeWays() {
  const ways = [
    {
      num: "01",
      label: "Show Up",
      title: "Come to a Node",
      desc: "Grab your laptop and show what you're building. Or just show up to watch. Either way — you're among builders.",
      cta: "View Calendar",
      href: "https://luma.com/calendar/cal-AzkmUYVr0KtSTQ9",
    },
    {
      num: "02",
      label: "Plug In",
      title: "Join the Discord",
      desc: "The real-time community. Find collaborators, get event reminders, and see what DFW builders are shipping.",
      cta: "Join Discord",
      href: "https://discord.gg/q8kEquTu3z",
    },
    {
      num: "03",
      label: "Stay Sharp",
      title: "Follow on LinkedIn",
      desc: "Event announcements, builder spotlights, and DFW AI signal — no fluff, just signal.",
      cta: "Follow ClawPlex",
      href: "https://linkedin.com/company/clawplex",
    },
  ];

  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...stagger(0)} className="mb-16 text-center">
          <motion.p className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
            Three Ways to Engage
          </motion.p>
          <motion.h2 className="font-display text-3xl md:text-5xl tracking-wider text-claw-text">
            SHOW UP. PLUG IN. STAY SHARP.
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-claw-border">
          {ways.map((way, i) => (
            <motion.a
              key={way.num}
              href={way.href}
              target="_blank"
              rel="noopener noreferrer"
              {...stagger(i + 1)}
              className={`group border-claw-border p-8 md:p-12 hover:border-claw-orange/50 transition-colors ${i > 0 ? "border-t md:border-t-0 md:border-l" : ""}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-4">{way.num} — {way.label}</p>
              <h3 className="font-display text-3xl md:text-4xl tracking-wider text-claw-text mb-4 group-hover:text-claw-orange transition-colors">
                {way.title}
              </h3>
              <p className="text-sm text-claw-muted leading-relaxed mb-6">{way.desc}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-claw-orange group-hover:underline">
                {way.cta} →
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter ─────────────────────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        setStatus("success");
        setMessage("You're in. Watch your inbox for updates.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <section className="border-t border-claw-border px-5 md:px-8 py-20 md:py-28">
      <motion.div {...fade} className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
          Stay in the Loop
        </p>
        <h2 className="font-display text-3xl md:text-5xl tracking-wider text-claw-text">
          GET THE NEXT DROP.
        </h2>
        <p className="mt-4 text-base text-claw-muted">
          Event reminders, venue drops, and DFW AI community updates.
        </p>

        {status === "success" ? (
          <div className="mt-8 border border-claw-border bg-claw-surface p-6 font-mono text-sm text-claw-text">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-0 sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                required
                className="flex-1 border border-claw-border bg-claw-surface px-5 py-4 font-mono text-sm text-claw-text placeholder:text-claw-dim focus:border-claw-orange focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 disabled:opacity-50 transition-colors"
              >
                {status === "loading" ? "..." : "Join the List"}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-2 text-left font-mono text-xs text-red-500">{message}</p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <HeroBanner />
        <WhatIsClawPlex />
        <EventSection />
        <ThreeWays />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
