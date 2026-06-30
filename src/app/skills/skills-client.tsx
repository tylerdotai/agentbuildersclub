"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/nav";

export function SkillsClient() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/skills")
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <section className="border-b border-border px-5 md:px-8 pt-20 pb-14">
          <div className="mx-auto max-w-5xl">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-text mb-4">
              AGENT SKILLS.
            </h1>
            <p className="text-base text-muted max-w-xl">
              Community-built agents, ready to install.
            </p>
          </div>
        </section>
        <section className="px-5 md:px-8 py-10 md:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-center py-24 font-mono text-xs uppercase tracking-widest text-dim">
              {data.length} skills loaded
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
