"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type SkillCategory = "Research" | "Productivity" | "Social" | "Utility" | "Creative";

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  trigger_phrases: string[];
  instructions: string;
  submitter_name: string;
  install_count: number;
  created_at: string;
}

const categoryColors: Record<SkillCategory, string> = {
  Research: "text-claw-cyan border-claw-cyan/30 bg-claw-cyan/10",
  Productivity: "text-claw-orange border-claw-orange/30 bg-claw-orange/10",
  Social: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  Utility: "text-claw-success border-claw-success/30 bg-claw-success/10",
  Creative: "text-pink-400 border-pink-400/30 bg-pink-400/10",
};

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const [copied, setCopied] = useState(false);

  function handleInstall() {
    navigator.clipboard.writeText(skill.instructions).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const badgeClass = categoryColors[skill.category] ?? categoryColors.Utility;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="group border border-claw-border bg-claw-surface p-6 hover:border-claw-orange/50 transition-all duration-300 flex flex-col"
    >
      {/* Category badge */}
      <span className={`self-start mb-3 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${badgeClass}`}>
        {skill.category}
      </span>

      {/* Name */}
      <h3 className="font-display text-xl tracking-wider text-claw-text mb-2 group-hover:text-claw-orange transition-colors">
        {skill.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-claw-muted leading-relaxed mb-4 flex-1">
        {skill.description}
      </p>

      {/* Trigger phrases */}
      {skill.trigger_phrases.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.trigger_phrases.slice(0, 4).map((phrase) => (
            <span
              key={phrase}
              className="border border-claw-border bg-claw-void px-2 py-0.5 font-mono text-[10px] text-claw-dim"
            >
              {phrase}
            </span>
          ))}
          {skill.trigger_phrases.length > 4 && (
            <span className="font-mono text-[10px] text-claw-dim px-1">
              +{skill.trigger_phrases.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-claw-border">
        <span className="font-mono text-[10px] uppercase tracking-widest text-claw-dim">
          {skill.install_count.toLocaleString()} installs
        </span>
        <button
          onClick={handleInstall}
          className={`border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
            copied
              ? "border-claw-success text-claw-success bg-claw-success/10"
              : "border-claw-orange text-claw-orange hover:bg-claw-orange hover:text-claw-void"
          }`}
        >
          {copied ? "Copied!" : "Install"}
        </button>
      </div>
    </motion.div>
  );
}
