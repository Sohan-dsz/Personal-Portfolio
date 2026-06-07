"use client";

import { motion } from "framer-motion";
import { Target, Compass, Heart } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { about } from "@/lib/data";

const cards = [
  {
    icon: Compass,
    title: "Professional Summary",
    body: about.summary,
    accent: "text-neon-cyan",
  },
  {
    icon: Target,
    title: "Career Objective",
    body: about.objective,
    accent: "text-neon-purple",
  },
];

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="Engineering meets curiosity"
          description="A blend of technical depth and business thinking, focused on shipping real-world impact."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="glass-card group h-full p-7 hover:border-neon-cyan/40 hover:shadow-xl hover:shadow-neon-purple/10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                    <c.icon className={`h-5 w-5 ${c.accent}`} />
                  </span>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass-card mt-6 p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                <Heart className="h-5 w-5 text-neon-pink" />
              </span>
              <h3 className="text-lg font-semibold">Technical Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {about.interests.map((i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-neon-purple/50 hover:text-foreground"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
