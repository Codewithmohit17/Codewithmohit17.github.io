"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Briefcase, Users, Rocket } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";

const SectionAccent3D = dynamic(
  () => import("@/components/three/SectionAccent3D"),
  { ssr: false }
);

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              04 / Experience &amp; Leadership
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Internships, <span className="text-gradient">Ventures</span> &amp;
              Communities
            </h2>
          </div>
          <SectionAccent3D variant="torus" color="#ec4899" />
        </div>

        <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-gradient-to-b before:from-cyan-400/60 before:via-purple-500/40 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2">
          {EXPERIENCES.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            const Icon =
              exp.type === "Internship"
                ? Briefcase
                : exp.type === "Venture"
                ? Rocket
                : Users;

            return (
              <motion.div
                key={`${exp.organization}-${exp.role}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative flex flex-col md:flex-row ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Glowing Timeline Node */}
                <div className="absolute top-6 left-5 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-cyan-300 bg-navy-950 shadow-[0_0_14px_rgba(34,211,238,0.8)] md:left-1/2" />

                <div
                  className={`ml-12 w-auto md:ml-0 md:w-[calc(50%-2rem)]`}
                >
                  <div className="glass-card glass-card-hover rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                        <Icon className="h-3.5 w-3.5" />
                        {exp.type}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="mt-3.5 font-display text-xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-purple-300">
                      {exp.organization}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {exp.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
