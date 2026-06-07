"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { courses } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "AI/ML",
  "Data Science",
  "Salesforce",
  "Cloud Computing",
  "Software Development",
] as const;

export function Learning() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered =
    active === "All" ? courses : courses.filter((c) => c.category === active);

  return (
    <section id="learning" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Learning Journey"
          title="Always Leveling Up"
          description="Courses and continuous learning across the stack."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                  active === c
                    ? "border-transparent bg-gradient-to-r from-neon-cyan to-neon-blue text-white"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((course) => (
              <motion.div
                key={course.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card group p-5 hover:border-neon-cyan/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-neon-cyan transition-transform group-hover:scale-110">
                  <course.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold leading-snug">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {course.provider}
                </p>
                <span className="mt-3 inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-neon-purple">
                  {course.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
