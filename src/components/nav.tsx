"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PrivyWalletButton } from "./privy-button";

const communityLinks = [
  { href: "/community", label: "Community Feed" },
  { href: "/community/agents", label: "Agents" },
  { href: "/community/projects", label: "Projects" },
  { href: "/skills", label: "Skills Directory" },
];

const links = [
  { href: "/events", label: "Events" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "https://discord.gg/q8kEquTu3z", label: "Discord", external: true },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [communityHover, setCommunityHover] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-claw-border/50 bg-claw-void/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden">
              <Image
                src="/clawplex-logo.png"
                alt="ClawPlex"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <span className="font-display text-xl tracking-wider text-claw-text">
              CLAWPLEX
            </span>
            <span className="hidden sm:inline border border-claw-orange/30 bg-claw-orange/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-claw-orange">
              DFW
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {/* Community dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCommunityHover(true)}
              onMouseLeave={() => setCommunityHover(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 font-mono text-xs uppercase tracking-widest text-claw-muted hover:text-claw-text transition-colors">
                Community
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-claw-dim">
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <AnimatePresence>
                {communityHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2 min-w-[180px]"
                  >
                    <div className="border border-claw-border bg-claw-surface shadow-xl">
                      {communityLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-3 font-mono text-xs uppercase tracking-widest text-claw-muted hover:text-claw-text hover:bg-claw-surface-2 transition-colors border-b border-claw-border last:border-0"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-claw-muted hover:text-claw-text transition-colors"
              >
                {link.label}
              </a>
            ))}
            <PrivyWalletButton />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 flex flex-col justify-center gap-1.5 p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-5 bg-claw-text origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block h-[2px] w-5 bg-claw-text"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-5 bg-claw-text origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-claw-void/98 backdrop-blur-xl md:hidden flex flex-col justify-center"
            onClick={() => setOpen(false)}
          >
            {/* Close X in top right */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 p-3 border border-claw-border bg-claw-surface flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-claw-text">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Nav links */}
            <nav className="flex flex-col gap-2 px-8">
              {[
                ...communityLinks.map(l => ({ ...l, external: false })),
                ...links.map(l => ({ ...l, external: l.external || false })),
              ].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-display text-2xl md:text-4xl tracking-wider text-claw-text hover:text-claw-orange transition-colors py-2 border-b border-claw-border/20 last:border-0"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: links.length * 0.06 + 0.1 }}
              className="mt-auto px-8 pb-16"
            >
              <a
                href="https://discord.gg/q8kEquTu3z"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block w-full border border-claw-orange bg-claw-orange py-4 text-center font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors"
              >
                Join the Node
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
