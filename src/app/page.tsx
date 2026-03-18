"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Hero - Full bleed image with gradient */}
      <section className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden">
        <img 
          src="/hero-lobster.jpg" 
          alt="Cowboy riding a lobster over Dallas" 
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00] via-[#1a0a00]/30 to-transparent" />
        
        {/* Decorative element - bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F0E6] to-transparent" />
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-6 pb-16 -mt-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-extrabold text-[#CC5500] tracking-tight text-center">
              CLAWPLEX
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-xl md:text-2xl text-[#8B4513] text-center font-medium"
          >
            Where DFW builds the future of AI.
          </motion.p>

          {/* Welcome line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-center text-[#8B4513]/70 text-base md:text-lg"
          >
            Beginners welcome. Veterans encouraged. All skill levels.
          </motion.p>

          {/* Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-[#CC5500] mx-auto mt-8 mb-10" 
          />

          {/* Event Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white border-2 border-[#8B4513]/10 p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#CC5500] uppercase tracking-widest mb-1">
                  Next Event
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#8B4513]">
                  ClawCon DFW
                </h2>
                <p className="text-[#8B4513]/70 mt-1">
                  Arlington, TX
                </p>
              </div>
              <a
                href="https://luma.com/clawcondfw?tk=k8qExi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#CC5500] font-bold hover:underline text-sm"
              >
                RSVP <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-4 mt-8"
          >
            <a
              href="https://discord.gg/q8kEquTu3z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#CC5500] text-white font-bold py-5 px-6 hover:bg-[#b84a00] transition-all hover:scale-[1.02]"
            >
              Join the Discord
              <span className="text-white/60 text-sm">(200+ members)</span>
            </a>
            <a
              href="https://luma.com/clawcondfw?tk=k8qExi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-[#CC5500] text-[#CC5500] font-bold py-4 px-6 hover:bg-[#CC5500] hover:text-white transition-all"
            >
              RSVP on Luma
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8B4513] px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#CC5500] rounded-full" />
            <p className="text-white/80 text-sm font-medium">
              Dallas-Fort Worth, TX
            </p>
          </div>
          <p className="text-white/40 text-xs">
            A ClawCon Chapter · Part of OpenClaw
          </p>
        </div>
      </footer>
    </div>
  );
}
