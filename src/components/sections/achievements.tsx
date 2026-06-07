"use client";

import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { stats } from "@/lib/data";

export function Achievements() {
  return (
    <section className="section-padding relative">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neon-blue/10 via-neon-purple/10 to-neon-cyan/10 p-8 backdrop-blur-md md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:32px_32px] opacity-20" />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-neon-cyan">
                    <stat.icon className="h-7 w-7" />
                  </span>
                  <Counter
                    to={stat.value}
                    suffix={stat.suffix}
                    className="block text-4xl font-bold neon-text md:text-5xl"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
