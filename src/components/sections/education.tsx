"use client";

import { GraduationCap, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="section-padding relative">
      <div className="container max-w-4xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic Foundation"
          description="The institutions and coursework shaping my engineering path."
        />

        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />
          {education.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 0.1}>
              <div className="relative mb-8 pl-16">
                <span className="absolute left-5 top-1 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-neon-cyan/40 bg-background">
                  <GraduationCap className="h-5 w-5 text-neon-cyan" />
                </span>
                <div className="glass-card p-6 hover:border-neon-purple/40">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    {edu.score && (
                      <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan">
                        {edu.score}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-neon-purple">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground">{edu.duration}</p>
                  {edu.coursework && edu.coursework.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" /> Key Coursework
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((c) => (
                          <span
                            key={c}
                            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
