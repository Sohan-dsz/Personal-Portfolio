"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

const highlights = [
  { value: 2, suffix: "+", label: "Years Building" },
  { value: 30, suffix: "+", label: "Technologies Learned" },
  { value: 7, suffix: "", label: "Domains Explored" },
];

const RADIUS = 46;
const CIRC = 2 * Math.PI * RADIUS;

function SkillRing({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay }}
      className="group flex flex-col items-center gap-3"
    >
      <div className="relative h-28 w-28 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
          <circle
            cx="55"
            cy="55"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            className="text-white/8"
          />
          <motion.circle
            cx="55"
            cy="55"
            r={RADIUS}
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: CIRC - (CIRC * level) / 100 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: delay + 0.1 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-lg font-bold neon-text">{level}%</span>
        </div>
      </div>
      <span className="text-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const [active, setActive] = useState(0);
  const current = skillCategories[active];

  return (
    <section id="skills" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="My Technical Arsenal"
          description="Pick a domain to explore the tools and technologies I use to design, train, and ship intelligent applications."
        />

        {/* shared gradient for every ring */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        <Reveal>
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all sm:text-sm",
                  active === i
                    ? "border-transparent bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-purple/25"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-neon-cyan/40 hover:text-foreground"
                )}
              >
                <cat.icon className="h-4 w-4" />
                {cat.category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="glass-card p-8 sm:p-10"
            >
              <div className="mb-8 flex items-center justify-center gap-3">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                    current.accent
                  )}
                >
                  <current.icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-semibold sm:text-2xl">
                  {current.category}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                {current.skills.map((skill, i) => (
                  <SkillRing
                    key={`${current.category}-${skill.name}`}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal>
          <div className="mt-12 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.label} className="text-center">
                <Counter
                  to={h.value}
                  suffix={h.suffix}
                  className="block text-4xl font-bold neon-text"
                />
                <p className="mt-1 text-sm text-muted-foreground">{h.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
