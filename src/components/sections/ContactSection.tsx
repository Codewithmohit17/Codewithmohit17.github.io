"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  CheckCircle2,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";

const SectionAccent3D = dynamic(
  () => import("@/components/three/SectionAccent3D"),
  { ssr: false }
);

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${name || "Recruiter"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative pt-24 pb-14 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              06 / Contact
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Let&apos;s Build{" "}
              <span className="text-gradient">Something Intelligent</span>
            </h2>
          </div>
          <SectionAccent3D variant="icosahedron" color="#22d3ee" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          {/* Direct Contact Info */}
          <div className="glass-card flex flex-col justify-between rounded-2xl p-7 sm:p-9 lg:col-span-5">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Get in touch
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                I&apos;m actively seeking internship opportunities in Python,
                Machine Learning, Artificial Intelligence, Data Science, and
                Software Development. Feel free to reach out directly!
              </p>

              <div className="mt-8 space-y-5">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-3.5 text-sm text-slate-200 transition-colors hover:text-cyan-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>{PROFILE.email}</span>
                </a>

                <a
                  href={`tel:${PROFILE.phone}`}
                  className="flex items-center gap-3.5 text-sm text-slate-200 transition-colors hover:text-cyan-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/25 bg-purple-500/10 text-purple-300">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+91 {PROFILE.phone}</span>
                </a>

                <div className="flex items-center gap-3.5 text-sm text-slate-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-blue-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>{PROFILE.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:text-cyan-300"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-7 sm:p-9 lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Recruiter / Hiring Manager"
                  className="w-full rounded-xl border border-white/10 bg-navy-950/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400/60"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/10 bg-navy-950/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400/60"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the internship role, team, or project..."
                className="w-full resize-none rounded-xl border border-white/10 bg-navy-950/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400/60"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(34,211,238,0.28)] transition-all hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>

              {sent && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Opening your mail client...
                </span>
              )}
            </div>
          </form>
        </motion.div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. Crafted with Next.js,
            React Three Fiber &amp; Tailwind CSS.
          </p>
        </footer>
      </div>
    </section>
  );
}
