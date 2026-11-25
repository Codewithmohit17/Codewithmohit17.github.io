"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import TiltCard from "@/components/TiltCard";

const SectionAccent3D = dynamic(
  () => import("@/components/three/SectionAccent3D"),
  { ssr: false }
);

export default function AboutSection() {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  const handleCopy = (value: string, type: "email" | "phone") => {
    navigator.clipboard?.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              01 / About Me
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Engineering <span className="text-gradient">Intelligence</span> &amp;
              Impact
            </h2>
          </div>
          <SectionAccent3D variant="icosahedron" color="#22d3ee" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          {/* Summary Card */}
          <TiltCard className="p-7 sm:p-9 lg:col-span-7">
            <h3 className="font-display text-xl font-semibold text-white">
              Professional Summary
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {PROFILE.summary}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-display text-2xl font-bold text-cyan-300">
                  AI / ML
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  B.Tech Specialization
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-display text-2xl font-bold text-purple-300">
                  3+ Live
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  AI &amp; Web Projects
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-display text-2xl font-bold text-blue-300">
                  5+ Roles
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Internships &amp; Leadership
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Details & Interactive Links */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="glass-card rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Location</p>
                    <p className="text-sm font-medium text-white">
                      {PROFILE.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/25 bg-purple-500/10 text-purple-300">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Phone</p>
                      <a
                        href={`tel:${PROFILE.phone}`}
                        className="text-sm font-medium text-white hover:text-cyan-300"
                      >
                        {PROFILE.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.phone, "phone")}
                    className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition-colors hover:text-cyan-300"
                    aria-label="Copy phone number"
                  >
                    {copied === "phone" ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-blue-300">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">Email</p>
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="block truncate text-sm font-medium text-white hover:text-cyan-300"
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.email, "email")}
                    className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition-colors hover:text-cyan-300"
                    aria-label="Copy email address"
                  >
                    {copied === "email" ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Social Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover group flex items-center justify-between rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">LinkedIn</p>
                    <p className="text-xs text-slate-400">Connect</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400" />
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover group flex items-center justify-between rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">GitHub</p>
                    <p className="text-xs text-slate-400">Explore Code</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
