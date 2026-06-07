"use client";

import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { personal, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <a href="#home" className="flex items-center justify-center gap-2 md:justify-start">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple text-sm font-bold text-white">
                SD
              </span>
              <span className="text-lg font-semibold">
                Sohan<span className="text-neon-cyan">.dev</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Building real-world applications across AI/ML, full-stack, and
              Salesforce.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-3">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:-translate-y-1 hover:border-neon-cyan/50 hover:text-neon-cyan"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <a
              href="#home"
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 text-neon-pink" /> using
            Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
