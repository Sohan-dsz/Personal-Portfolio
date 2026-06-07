"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Search, X, BadgeCheck, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { certifications, type Certification } from "@/lib/data";
import { cn } from "@/lib/utils";

function CertImage({
  src,
  alt,
  className,
  sizes,
  fallback,
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes: string;
  fallback: React.ReactNode;
}) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) return <>{fallback}</>;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

export function Certifications() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Certification | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certifications;
    return certifications.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="certifications" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & Badges"
          description="Verified certifications across cloud, AI/ML, and Salesforce."
        />

        <Reveal>
          <div className="mx-auto mb-10 flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 backdrop-blur-md focus-within:border-neon-cyan/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certifications…"
              className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.05}>
              <button
                onClick={() => setSelected(cert)}
                className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left backdrop-blur-md transition-all hover:-translate-y-1 hover:border-neon-cyan/50 hover:shadow-2xl hover:shadow-neon-purple/20"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/30">
                  <CertImage
                    src={cert.image}
                    alt={cert.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fallback={
                      <div
                        className={cn(
                          "flex h-full w-full items-center justify-center bg-gradient-to-br",
                          cert.gradient
                        )}
                      >
                        <Award className="h-10 w-10 text-white/90" />
                      </div>
                    }
                  />
                  <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-0.5 text-[11px] text-white backdrop-blur-md">
                    {cert.category}
                  </span>
                </div>
                <div className="relative p-5">
                  <h3 className="text-sm font-semibold leading-snug">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No certifications match “{query}”.
          </p>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-1 text-white/80 backdrop-blur-md hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black/40">
                <CertImage
                  src={selected.image}
                  alt={selected.title}
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-contain"
                  fallback={
                    <div
                      className={cn(
                        "flex h-full w-full items-center justify-center bg-gradient-to-br",
                        selected.gradient
                      )}
                    >
                      <BadgeCheck className="h-16 w-16 text-white" />
                    </div>
                  }
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold">{selected.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Issued by {selected.issuer}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs text-neon-cyan">
                    {selected.category}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                    {selected.year}
                  </span>
                </div>
                {selected.credentialUrl && (
                  <a
                    href={selected.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Verify credential
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
