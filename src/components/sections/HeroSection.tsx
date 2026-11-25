"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, ChevronDown } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

const HeroPortrait3D = dynamic(
  () => import("@/components/three/HeroPortrait3D"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto flex h-[400px] w-full max-w-[400px] items-center justify-center rounded-3xl border border-cyan-400/20 bg-navy-900/40 backdrop-blur-md sm:h-[460px] sm:max-w-[460px] lg:h-[510px] lg:max-w-[510px]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    ),
  }
);

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center pt-24 pb-16 sm:pt-28"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 flex flex-col items-start lg:order-1 lg:col-span-7"
        >
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Open to AI / ML, Python &amp; SWE Internships
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient block sm:inline">
              {PROFILE.name}
            </span>
          </h1>

          <p className="mt-4 font-display text-base font-medium tracking-wide text-cyan-300/90 sm:text-lg">
            {PROFILE.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {PROFILE.oneLiner}
          </p>

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-200"
            >
              <Mail className="h-4 w-4 text-cyan-400" />
              Contact Me
            </a>
          </div>

          {/* Quick Socials */}
          <div className="mt-8 flex items-center gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-blue-300"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email Mohit"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-purple-400/40 hover:bg-purple-400/10 hover:text-purple-300"
            >
              <Mail className="h-4 w-4" />
            </a>
            <span className="ml-2 text-xs text-slate-400">
              Based in {PROFILE.location}
            </span>
          </div>
        </motion.div>

        {/* Right 3D Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          className="order-1 lg:order-2 lg:col-span-5"
        >
          <HeroPortrait3D imagePath={PROFILE.portraitPath} />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-slate-400 transition-colors hover:text-cyan-300 sm:flex"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}
