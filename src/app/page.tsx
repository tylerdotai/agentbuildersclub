"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus("loading");
    
    // Get the access key from environment variable
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      setStatus("error");
      setMessage("Form not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your .env.local file.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          email: email,
          subject: "New ClawPlex Newsletter Signup",
          from_email: email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("You're in! Watch your inbox for updates.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to submit. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-[#0A0B10]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src="/hero-lobster.jpg"
          alt="Cowboy riding a lobster over Dallas"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-[#0A0B10]/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-7xl font-extrabold text-[#E0E0E0] tracking-tight mb-4"
          >
            LOCAL MODELS.<br />LONE STAR SPIRIT.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#E0E0E0]/70 text-lg md:text-xl max-w-xl mb-8"
          >
            DFW's community for AI builders, tinkerers, and the people shaping the future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 items-center"
          >
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF4500] text-white font-[family-name:var(--font-space-grotesk)] font-bold px-8 py-3 rounded-lg hover:scale-105 transition-transform text-lg"
            >
              JOIN THE DISCORD
            </a>
          </motion.div>
        </div>
      </section>

      {/* "Real Talk" Section - Glassmorphism Grid */}
      <section id="real-talk" className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#FF4500] uppercase tracking-widest mb-2">
              What We're About
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-[#E0E0E0]">
              REAL TALK
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                title: "Monthly Meetups",
                desc: "Show up, show off what you're building, learn from others. No slides required.",
                icon: "📍",
              },
              {
                title: "Local-First Philosophy",
                desc: "Your data stays on your machine. We believe in AI that runs where you tell it to.",
                icon: "🔒",
              },
              {
                title: "All-Skill Levels",
                desc: "Newbie or vet, enterprise or laptop on a desk. If you're curious, you belong here.",
                icon: "🌟",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-xl p-6 hover-scale cursor-pointer"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#E0E0E0] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#E0E0E0]/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get on the List - Email Signup */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-[#1A1B23]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#FF4500] uppercase tracking-widest mb-2">
              Stay in the Loop
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#E0E0E0] mb-4">
              GET ON THE LIST
            </h2>
            <p className="text-[#E0E0E0]/60 mb-8">
              Be the first to know about ClawCon and upcoming meetups.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="flex-1 bg-[#0A0B10] border border-white/10 rounded-lg px-4 py-3 text-[#E0E0E0] placeholder:text-[#E0E0E0]/30 focus:outline-none focus:border-[#FF4500] disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-[#FF4500] text-white font-[family-name:var(--font-space-grotesk)] font-bold px-6 py-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "..." : status === "success" ? "✓" : "JOIN"}
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-sm ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-[#E0E0E0]/60"}`}>
                {message}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1B23] px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#E0E0E0]">
                ClawPlex
              </p>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#E0E0E0]/40">
                Dallas-Fort Worth, TX
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://discord.gg/q8kEquTu3z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E0E0E0]/60 hover:text-[#E0E0E0] text-sm transition-colors"
              >
                Discord
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#E0E0E0]/30">
              Built in DFW. Ran on Local Metal.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
