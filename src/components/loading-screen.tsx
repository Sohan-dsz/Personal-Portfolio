"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-neon-cyan/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-2 rounded-xl border-2 border-neon-purple/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-2xl font-bold neon-text">SD</span>
          </motion.div>

          <motion.p
            className="mt-6 font-mono text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Initializing portfolio<span className="animate-pulse">…</span>
          </motion.p>

          <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
