"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { PROJECTS, ProjectItem } from "@/data/portfolio";
import TiltCard from "@/components/TiltCard";

const SectionAccent3D = dynamic(
  () => import("@/components/three/SectionAccent3D"),
  { ssr: false }
);

const PROJECT_GLOW: Record<ProjectItem["accent"], string> = {
  cyan: "rgba(34, 211, 238, 0.22)",
  purple: "rgba(168, 85, 247, 0.22)",
  blue: "rgba(59, 130, 246, 0.22)",
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              03 / Featured Projects
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Practical <span className="text-gradient">AI &amp; Software</span>{" "}
              Builds
            </h2>
          </div>
          <SectionAccent3D variant="knot" color="#3b82f6" />
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
            >
              <TiltCard
                glowColor={PROJECT_GLOW[project.accent]}
                className="glow-border flex h-full flex-col justify-between p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                      <Layers className="h-3.5 w-3.5 text-cyan-400" />
                      {project.subtitle}
                    </span>

                    {project.status === "Live" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/30 bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
                        <Sparkles className="h-3 w-3" />
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-navy-950/60 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                    >
                      Request Live Demo / Walkthrough
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
