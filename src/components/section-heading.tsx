"use client";

import { Reveal } from "@/components/reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal>
        <span className="inline-flex items-center rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          <span className="neon-text">{title}</span>
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
