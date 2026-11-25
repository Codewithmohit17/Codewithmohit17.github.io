"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Code2, BrainCircuit, Database, Globe, Wrench } from "lucide-react";
import { SKILL_GROUPS, SkillGroup } from "@/data/portfolio";
import TiltCard from "@/components/TiltCard";

const SectionAccent3D = dynamic(
  () => import("@/components/three/SectionAccent3D"),
  { ssr: false }
);

const ICON_MAP: Record<string, React.ReactNode> = {
  Programming: <Code2 className="h-5 w-5" />,
  "AI / ML": <BrainCircuit className="h-5 w-5" />,
  Data: <Database className="h-5 w-5" />,
  Web: <Globe className="h-5 w-5" />,
  Tools: <Wrench className="h-5 w-5" />,
};

const ACCENT_STYLES: Record<
  SkillGroup["accent"],
  { badge: string; icon: string; glow: string }
> = {
  cyan: {
    badge: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
    icon: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
    glow: "rgba(34, 211, 238, 0.18)",
  },
  purple: {
    badge: "border-purple-400/25 bg-purple-400/10 text-purple-200",
    icon: "bg-purple-500/15 text-purple-300 border-purple-400/30",
    glow: "rgba(168, 85, 247, 0.18)",
  },
  blue: {
    badge: "border-blue-400/25 bg-blue-400/10 text-blue-200",
    icon: "bg-blue-500/15 text-blue-300 border-blue-400/30",
    glow: "rgba(59, 130, 246, 0.18)",
  },
  magenta: {
    badge: "border-pink-400/25 bg-pink-400/10 text-pink-200",
    icon: "bg-pink-500/15 text-pink-300 border-pink-400/30",
    glow: "rgba(236, 72, 153, 0.18)",
  },
  emerald: {
    badge: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
    icon: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    glow: "rgba(16, 185, 129, 0.16)",
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              02 / Technical Skills
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Core <span className="text-gradient">Capabilities</span> &amp; Stack
            </h2>
          </div>
          <SectionAccent3D variant="octahedron" color="#a855f7" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, idx) => {
            const style = ACCENT_STYLES[group.accent];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <TiltCard glowColor={style.glow} className="h-full p-6 sm:p-7">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${style.icon}`}
                    >
                      {ICON_MAP[group.category]}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {group.category}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {group.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105 ${style.badge}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
