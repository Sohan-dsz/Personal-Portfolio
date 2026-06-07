"use client";

import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container max-w-4xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          description="Internships, leadership, and hands-on engineering across teams."
        />

        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent" />
          {experience.map((item, i) => (
            <Reveal key={`${item.title}-${item.period}`} delay={i * 0.08}>
              <div className="relative mb-8 pl-16">
                <span className="absolute left-5 top-1 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-neon-cyan/40 bg-background">
                  <item.icon className="h-5 w-5 text-neon-cyan" />
                </span>
                <div className="glass-card p-6 hover:border-neon-cyan/40">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-neon-purple">{item.org}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{item.period}</span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {item.location}
                      </span>
                    )}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="relative pl-4 text-sm text-muted-foreground before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-neon-cyan"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
