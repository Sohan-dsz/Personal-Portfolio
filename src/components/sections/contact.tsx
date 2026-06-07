"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { personal } from "@/lib/data";

const details = [
  { icon: Mail, label: "Email", value: personal.email, href: personal.socials.email },
  { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: personal.location },
  { icon: Linkedin, label: "LinkedIn", value: "in/sohan1919", href: personal.socials.linkedin },
  { icon: Github, label: "GitHub", value: "Sohan-dsz", href: personal.socials.github },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSent(false);
    setSending(true);

    // EmailJS (client-side)
    const publicKey = "B17K-YfG7Y6tU6a6C";
    const serviceId = "service_v2yefe7";
    const templateId = "template_5t4rwrm";

    const templateParams = {
      name: form.name,
      email: form.email,
      time: new Date().toLocaleString(),
      message: form.message,
      title: "Contact Us",
    };

    try {
      console.log("EmailJS send with:", {
        serviceId,
        templateId,
        templateParams,
      });

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Message failed to send. Check console for details.");
      setSent(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something"
          description="Have a role, project, or idea? My inbox is always open."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              {details.map((d) => {
                const content = (
                  <div className="glass-card flex items-center gap-4 p-4 transition-colors hover:border-neon-cyan/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-neon-cyan">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{d.label}</p>
                      <p className="truncate text-sm font-medium">{d.value}</p>
                    </div>
                  </div>
                );
                return d.href ? (
                  <a
                    key={d.label}
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={d.label}>{content}</div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="glass-card space-y-4 p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs text-muted-foreground">
                    Name
                  </label>
                  <Input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-muted-foreground">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">
                  Message
                </label>
                <Textarea
                  required
                  placeholder="Tell me about your project or opportunity…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              {error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : null}

              <Button type="submit" size="lg" className="w-full" disabled={sending}>
                {sent ? (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Message sent!
                  </motion.span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {sending ? "Sending..." : "Send Message"}
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

