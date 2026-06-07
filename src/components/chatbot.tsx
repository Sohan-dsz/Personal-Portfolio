"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { getBotReply, suggestedQuestions } from "@/lib/chatbot";

type Msg = { role: "bot" | "user"; text: string };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi! I'm Sohan's AI assistant 🤖 Ask me anything about his work, skills, or experience.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getBotReply(trimmed) }]);
      setTyping(false);
    }, 600);
  };

  return (
    <>
      <motion.button
        aria-label="Open chat assistant"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-purple/40"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity }}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[90] flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/95 shadow-2xl shadow-neon-purple/20 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Portfolio Assistant</p>
                <p className="text-xs text-neon-cyan">● Online</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm ${
                      m.role === "user"
                        ? "rounded-br-sm bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                        : "rounded-bl-sm border border-white/10 bg-white/5 text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-neon-cyan"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sohan…"
                className="h-10 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-neon-cyan/50"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-white"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
