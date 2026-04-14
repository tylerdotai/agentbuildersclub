"use client";

import Image from "next/image";
import Link from "next/link";

const footerNav = {
  Community: [
    { href: "/community", label: "Community Feed" },
    { href: "/community/agents", label: "Agents" },
    { href: "/community/projects", label: "Projects" },
    { href: "/skills", label: "Skills Directory" },
    { href: "https://discord.gg/q8kEquTu3z", label: "Discord", external: true },
  ],
  Events: [
    { href: "/events", label: "Events" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "https://luma.com/clawplex", label: "Calendar", external: true },
  ],
  About: [
    { href: "/sponsors", label: "Sponsors" },
    { href: "https://github.com/tylerdotai/clawplex", label: "GitHub", external: true },
    { href: "https://x.com/ClawPlexDFW", label: "Twitter / X", external: true },
    { href: "https://linkedin.com/company/clawplex", label: "LinkedIn", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-claw-border bg-claw-void">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-claw-border bg-claw-surface">
                <Image
                  src="/clawplex-logo.png"
                  alt="ClawPlex"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-display text-lg tracking-wider text-claw-text">
                CLAWPLEX
              </span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-6">
              DFW AI Builder Community
            </p>
            <p className="text-sm text-claw-muted leading-relaxed max-w-xs">
              Weekly meetups for builders shipping real AI products. No vendor pitches. No conference theater. Just people with laptops.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([category, items]) => (
            <div key={category}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-4">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-claw-muted hover:text-claw-text transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-claw-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim">
            © {new Date().getFullYear()} ClawPlex DFW. Built by builders, for builders.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="font-mono text-[10px] uppercase tracking-widest text-claw-dim hover:text-claw-muted transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="font-mono text-[10px] uppercase tracking-widest text-claw-dim hover:text-claw-muted transition-colors"
            >
              Terms
            </a>
            <span className="font-mono text-[10px] uppercase tracking-widest text-claw-dim">
              Built on{" "}
              <a
                href="https://openclaw.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-claw-orange hover:text-claw-orange/80 transition-colors"
              >
                OpenClaw
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
