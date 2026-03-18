"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#D4B483]"> {/* Stadium Dust background */}
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#D4B483]/95 backdrop-blur-sm border-b border-[#7B4A2D]/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E6511F] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="font-bold text-xl text-[#7B4A2D]">ClawPlex</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="text-sm text-[#7B4A2D]/70 hover:text-[#7B4A2D] hidden md:block">About</a>
            <a href="#event" className="text-sm text-[#7B4A2D]/70 hover:text-[#7B4A2D] hidden md:block">Event</a>
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E6511F] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#c4461a] transition-colors"
            >
              Join
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden pt-16">
        <img 
          src="/hero-lobster.jpg" 
          alt="Cowboy riding a lobster over Dallas" 
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00] via-[#1a0a00]/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/80 font-medium tracking-wide mb-2"
          >
            DFW's Personal AI Community
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-extrabold text-white tracking-tight"
          >
            CLAWPLEX
          </motion.h1>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-[#E6511F] uppercase tracking-widest text-center mb-4">
              A Brief Explanation
            </p>
            <p className="text-xl md:text-2xl text-[#7B4A2D] text-center font-medium leading-relaxed">
              Your AI runs errands, makes decisions, and works while you sleep. 
              It deserves a social life — and so do you.
            </p>
            <p className="text-lg text-[#7B4A2D]/70 text-center mt-4">
              ClawPlex is where DFW builders get together. Demos, hacks, and real talk about what's actually working.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-4 md:px-6 py-10 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="p-5 border-l-2 border-[#E6511F]">
              <h3 className="font-bold text-[#7B4A2D] text-lg">Demos</h3>
              <p className="text-[#7B4A2D]/70 mt-1">See what people are building with their agents.</p>
            </div>
            <div className="p-5 border-l-2 border-[#E6511F]">
              <h3 className="font-bold text-[#7B4A2D] text-lg">Lightning Talks</h3>
              <p className="text-[#7B4A2D]/70 mt-1">5 minutes. No slides required. Just share what you know.</p>
            </div>
            <div className="p-5 border-l-2 border-[#E6511F]">
              <h3 className="font-bold text-[#7B4A2D] text-lg">Open Hack</h3>
              <p className="text-[#7B4A2D]/70 mt-1">Bring your laptop. Break things. Ask the dumb questions.</p>
            </div>
            <div className="p-5 border-l-2 border-[#E6511F]">
              <h3 className="font-bold text-[#7B4A2D] text-lg">IRL</h3>
              <p className="text-[#7B4A2D]/70 mt-1">Put the screen down and talk to humans.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Card */}
      <section id="event" className="px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 md:p-8"
          >
            <p className="text-xs font-bold text-[#E6511F] uppercase tracking-widest mb-2">
              Next Event
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#7B4A2D]">
              ClawCon DFW
            </h2>
            <p className="text-[#7B4A2D]/70 mt-1">
              Arlington, TX
            </p>
            <div className="w-full h-px bg-[#7B4A2D]/10 my-4" />
            <a
              href="https://luma.com/clawcondfw?tk=k8qExi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#E6511F] font-bold hover:underline"
            >
              RSVP <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="px-4 md:px-6 py-10 bg-[#3D5A80]"> {/* Texas Denim background */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">200+</p>
              <p className="text-white/70 mt-1">Members</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">Monthly</p>
              <p className="text-white/70 mt-1">Meetups</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">Open</p>
              <p className="text-white/70 mt-1">To All</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="px-4 md:px-6 py-12 md:py-16 bg-[#87CEEB]/20"> {/* Lone Star Sky accent */}
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7B4A2D]/70 italic">Stay in the loop</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#E6511F] mt-2">
              Get on the list
            </h2>
            <p className="text-xs font-bold text-[#7B4A2D]/50 uppercase tracking-widest mt-2 mb-4">
              For Future Events
            </p>
            <p className="text-[#7B4A2D]/70 mb-6">
              We'll email you when the next one's announced. Nothing else.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                className="h-12 rounded-lg border border-[#7B4A2D]/20 bg-white px-4 text-[#7B4A2D] placeholder-[#7B4A2D]/40 focus:border-[#E6511F] focus:outline-none"
              />
              <button
                type="submit"
                className="h-12 rounded-lg bg-[#E6511F] font-bold text-white hover:bg-[#c4461a] transition-colors"
              >
                NOTIFY ME
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4F7942] px-4 md:px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#E6511F] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <div>
                <p className="text-white font-bold">ClawPlex</p>
                <p className="text-white/50 text-xs">Dallas-Fort Worth, TX</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white">Twitter</a>
              <a href="#" className="text-white/60 hover:text-white">LinkedIn</a>
              <a href="#" className="text-white/60 hover:text-white">Instagram</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">
              A ClawCon Chapter · Part of OpenClaw
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
