"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, FolderGit2, Award, ArrowRight } from "lucide-react";
import { projects, certifications } from "@/lib/data";
import { cn } from "@/lib/utils";

type Result = {
  type: "Project" | "Certification";
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
};

const index: Result[] = [
  ...projects.map((p) => ({
    type: "Project" as const,
    title: p.title,
    subtitle: `${p.category} · ${p.tech.join(", ")}`,
    href: "#projects",
    keywords: `${p.title} ${p.category} ${p.tech.join(" ")} ${p.description}`.toLowerCase(),
  })),
  ...certifications.map((c) => ({
    type: "Certification" as const,
    title: c.title,
    subtitle: `${c.issuer} · ${c.year}`,
    href: "#certifications",
    keywords: `${c.title} ${c.issuer} ${c.category}`.toLowerCase(),
  })),
];

export function GlobalSearch({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index;
    return index.filter((r) => r.keywords.includes(q));
  }, [query]);

  return (
    <>
      <button
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground backdrop-blur-md transition-colors hover:border-neon-cyan/50",
          compact ? "h-10 w-10 justify-center" : "h-10 px-4"
        )}
      >
        <Search className="h-4 w-4" />
        {!compact && (
          <>
            <span className="hidden lg:inline">Search…</span>
            <kbd className="ml-2 hidden rounded border border-white/15 px-1.5 text-[10px] lg:inline">
              ⌘K
            </kbd>
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-card/95 shadow-2xl shadow-neon-purple/20"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4">
                <Search className="h-5 w-5 text-neon-cyan" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects & certifications…"
                  className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button onClick={() => setOpen(false)} aria-label="Close search">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No results for “{query}”.
                  </p>
                )}
                {results.map((r) => (
                  <a
                    key={`${r.type}-${r.title}`}
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-neon-cyan">
                      {r.type === "Project" ? (
                        <FolderGit2 className="h-4 w-4" />
                      ) : (
                        <Award className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {r.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {r.subtitle}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
