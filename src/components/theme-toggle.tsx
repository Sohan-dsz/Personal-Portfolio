"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme !== "light";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:border-neon-cyan/50"
    >
      {mounted && (
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon className="h-5 w-5 text-neon-cyan" />
          ) : (
            <Sun className="h-5 w-5 text-amber-500" />
          )}
        </motion.span>
      )}
    </button>
  );
}
