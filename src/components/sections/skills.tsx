"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";

const highlights = [
  { value: 2, suffix: "+", label: "Years Building" },
  { value: 30, suffix: "+", label: "Technologies Learned" },
  { value: 7, suffix: "", label: "Domains Explored" },
];

const ALL_INDEX = -1;

export function Skills() {
  const [active, setActive] = useState(ALL_INDEX);

  const isAll = active === ALL_INDEX;

  return (
    <section id="skills" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="My Technical Arsenal"
          description="Pick a domain to explore the tools and technologies I use to design, train, and ship intelligent applications."
        />

        <Reveal>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActive(ALL_INDEX)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all sm:text-sm",
                isAll
                  ? "border-transparent bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-purple/25"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-neon-cyan/40 hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              All Skills
            </button>

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

        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            {isAll ? (
              <motion.div
                key="all"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-8 sm:p-10"
              >
                <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple text-white">
                    <LayoutGrid className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold sm:text-xl">All Skills</h3>
                </div>

                <div className="flex flex-wrap gap-2">
  {skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => (
      <motion.span
        key={skill.name}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground hover:border-white/20 hover:text-foreground transition-colors"
      >
        {skill.name}
      </motion.span>
    ))
  )}
</div>
              </motion.div>
            ) : (
              (() => {
                const cat = skillCategories[active];
                return (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="glass-card p-8 sm:p-10"
                  >
                    <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-6">
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                          cat.accent
                        )}
                      >
                        <cat.icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-semibold sm:text-xl">
                        {cat.category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, i) => (
                        <motion.span
                          key={`${cat.category}-${skill.name}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: i * 0.04 }}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground hover:border-white/20 hover:text-foreground transition-colors"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })()
            )}
          </AnimatePresence>
        </div>

        <Reveal>
          <div className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:grid-cols-3">
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