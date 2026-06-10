"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowDown,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { personal } from "@/lib/data";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
});

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-aurora"
    >
      <div className="absolute inset-0 -z-10 opacity-70">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern bg-[size:44px_44px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container grid items-center gap-12 py-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 text-xs font-medium text-neon-cyan"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="neon-text text-glow">Sohan</span>
            <br />
            <span className="text-foreground">D Souza</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 flex h-9 items-center justify-center text-xl font-medium text-muted-foreground lg:justify-start"
          >
            <span className="mr-2 text-foreground">I&apos;m a</span>
            <span className="font-mono text-neon-cyan text-glow">Software Engineer</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0"
          >
            {personal.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a href={personal.resumeUrl} download>
              <Button size="lg">
                <Download className="h-4 w-4" /> Download Resume
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="outline">
                <Mail className="h-4 w-4" /> Contact Me
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-4 lg:justify-start"
          >
            {[
              { icon: Github, href: personal.socials.github, label: "GitHub" },
              { icon: Linkedin, href: personal.socials.linkedin, label: "LinkedIn" },
              { icon: Mail, href: personal.socials.email, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-md transition-all hover:-translate-y-1 hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <span className="ml-1 hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
              <MapPin className="h-4 w-4 text-neon-purple" />
              {personal.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1.25 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto flex items-center justify-center"
        >
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan p-[3px]">
              <div className="h-full w-full rounded-full bg-background" />
            </div>
            <div className="absolute inset-[10px] overflow-hidden rounded-full border border-white/10">
              <Image
                src="/profile.png"
                alt={personal.name}
                fill
                priority
                unoptimized
                sizes="320px"
                className="object-cover"
              />
            </div>
            <motion.div
              className="absolute -right-4 top-8 rounded-xl border border-white/10 bg-card/80 px-3 py-2 text-xs font-mono text-neon-cyan backdrop-blur-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              &lt; AI/ML &gt;
            </motion.div>
            <motion.div
              className="absolute -left-6 bottom-10 rounded-xl border border-white/10 bg-card/80 px-3 py-2 text-xs font-mono text-neon-purple backdrop-blur-md"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {"{ Data Science }"}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/40 p-1">
          <motion.div
            className="h-2 w-1 rounded-full bg-neon-cyan"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <ArrowDown className="mx-auto mt-2 h-4 w-4 animate-bounce text-muted-foreground" />
      </a>
    </section>
  );
}
