"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { GlobalSearch } from "@/components/global-search";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2 transition-all duration-300",
            scrolled
              ? "border border-white/10 bg-background/70 backdrop-blur-xl shadow-lg shadow-black/20"
              : "border border-transparent"
          )}
        >
          <a href="#home" className="flex items-center gap-2 pl-1 font-display">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple text-sm font-bold text-white">
              SD
            </span>
            <span className="hidden text-sm font-semibold sm:block">
              {personal.firstName}
              <span className="text-neon-cyan">.dev</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  active === link.href
                    ? "text-neon-cyan"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <GlobalSearch compact />
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-background/90 p-3 backdrop-blur-xl lg:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
