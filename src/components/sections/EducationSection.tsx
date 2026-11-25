"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { EDUCATION } from "@/data/portfolio";
import TiltCard from "@/components/TiltCard";

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            05 / Education &amp; Certification
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            Academic <span className="text-gradient">Foundation</span> &amp;
            Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {EDUCATION.map((item, idx) => {
            const Icon =
              item.badge === "Undergraduate"
                ? GraduationCap
                : item.badge === "Certification"
                ? Award
                : BookOpen;

            return (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard className="flex h-full flex-col justify-between p-7">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-purple-400/25 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-white">
                      {item.institution}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-cyan-300">
                      {item.degree}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {item.details}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-slate-400">
                    {item.period}
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
