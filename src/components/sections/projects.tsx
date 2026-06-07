"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import {
  Github,
  ExternalLink,
  CheckCircle2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { projects, type Project, type ProjectCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters: ("All" | ProjectCategory)[] = [
  "All",
  "AI/ML",
  "Data Science",
  "Salesforce",
  "Web Development",
];

function TiltCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="glass-card group relative h-full overflow-hidden hover:border-neon-cyan/40"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${project.title} screenshots`}
        className={cn(
          "relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br text-6xl",
          project.gradient
        )}
      >
        <span className="transition-transform duration-500 group-hover:scale-125 flex items-center justify-center">
        {project.emojiImage ? (
          <Image
            src={project.emojiImage}
            alt={`${project.title} icon`}
            fill
            unoptimized
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className={cn("flex h-full w-full items-center justify-center bg-gradient-to-br", project.gradient)}>
            <span className="text-5xl">{project.emoji}</span>
          </div>
        )}
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {project.category}
        </span>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent)]" />
        <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/55 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" /> View Screenshots
        </span>
      </button>

      <div className="p-6" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 space-y-1.5">
          {project.achievements.map((a) => (
            <li key={a} className="flex items-start gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-cyan" />
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-neon-cyan"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            <Maximize2 className="h-3.5 w-3.5" /> View
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
          <a
            href={project.demo ?? "#"}
            target={project.demo ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-disabled={!project.demo}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all",
              project.demo
                ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:scale-[1.03]"
                : "cursor-not-allowed border border-white/10 bg-white/5 text-muted-foreground"
            )}
            onClick={(e) => !project.demo && e.preventDefault()}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {project.demo ? "Live Demo" : "Demo Soon"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 320 : -320, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -320 : 320, opacity: 0 }),
};

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const count = project.images.length;

  const paginate = useCallback(
    (dir: number) => {
      setIndex(([prev]) => [(prev + dir + count) % count, dir]);
    },
    [count]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, paginate]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -80) paginate(1);
    else if (swipe > 80) paginate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-card/95 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Carousel */}
        <div className="relative aspect-[16/10] w-full select-none overflow-hidden bg-black/40">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={onDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={project.images[index]}
                alt={`${project.title} screenshot ${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 768px"
                className="pointer-events-none object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
                {project.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Go to screenshot ${i + 1}`}
                    onClick={() => setIndex([i, i > index ? 1 : -1])}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === index
                        ? "w-6 bg-neon-cyan"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    )}
                  />
                ))}
              </div>
              <span className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-md">
                {index + 1} / {count}
              </span>
            </>
          )}
        </div>

        {/* Details */}
        <div className="max-h-[40vh] overflow-y-auto p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neon-cyan">
              {project.category}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-neon-cyan"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <Github className="h-3.5 w-3.5" /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 text-xs font-medium text-white transition-transform hover:scale-[1.03]"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live Demo
              </a>
            )}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Swipe or use ← / → to browse screenshots
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Things I've Built"
          description="A selection of AI/ML, data science, Salesforce, and engineering projects. Click any project to swipe through its screenshots."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  active === f
                    ? "border-transparent bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-purple/25"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-neon-cyan/40 hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                style={{ perspective: 1000 }}
              >
                <TiltCard project={project} onOpen={() => setSelected(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
