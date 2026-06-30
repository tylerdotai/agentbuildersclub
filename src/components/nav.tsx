"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useNavVisibility } from "@/hooks/use-nav-visibility";

const primaryCtaHref = "https://discord.gg/q8kEquTu3z";

const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/community", label: "Community" },
  { href: "/community/agents", label: "Agents" },
  { href: "/skills", label: "Skills" },
  { href: "/get-involved", label: "Get Involved" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { visible } = useNavVisibility({ hideThreshold: 80 });

  return (
    <nav
      data-visible={visible || open}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-gradient-to-b from-void/90 to-transparent transition-transform duration-300 ease-out data-[visible=false]:-translate-y-full"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Agent Builders Club home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/abc-logo.jpg"
            alt="Agent Builders Club"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
          <span className="font-display text-xl tracking-tight text-text md:text-[22px]">
            Agent Builders Club
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}

          <a
            href={primaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-medium text-void transition-colors hover:bg-accent-light"
          >
            Join Discord
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 6h6m0 0L6 3m3 3L6 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="relative z-50 flex flex-col gap-[5px] p-2 -mr-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span
            className={`block h-0.5 w-6 origin-center bg-text transition-[transform,opacity] duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 origin-center bg-text transition-[transform,opacity] duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-[65px] z-40 flex h-[calc(100dvh-65px)] flex-col justify-center bg-void px-8 md:hidden"
        >
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl tracking-tight text-text transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={primaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-accent px-6 py-4 text-center text-base font-medium text-void transition-colors hover:bg-accent-light"
            >
              Join Discord
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
