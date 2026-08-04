"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Preserves the previous section's real submission logic: mailto with the
  // configured profile.email, falling back to the first social link with an
  // href when no email is configured yet (both are currently null in
  // data/profile.ts / data/socialLinks.ts pending real values).
  const primaryTarget = profile.email
    ? `mailto:${profile.email}`
    : (socialLinks.find((l) => l.href)?.href ?? null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!primaryTarget) return;
    if (primaryTarget.startsWith("mailto:")) {
      const subject = encodeURIComponent(`Project inquiry from ${name || "your website"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `${primaryTarget}?subject=${subject}&body=${body}`;
    } else {
      window.open(primaryTarget, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-bg px-5 py-20 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-between gap-16">
          <div>
            <Reveal blur>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Let&rsquo;s talk.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Open to AI engineering roles, applied ML work, research collaborations, and AI
                product consulting — based in {profile.location.city}, working with teams anywhere.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <SocialLinks links={socialLinks} />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="w-full">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-5 gradient-border rounded-3xl border border-line bg-bg-raised p-8 sm:p-10"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-sm text-muted">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-line bg-transparent px-4 py-3 text-ink placeholder:text-muted focus:border-line-strong focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-sm text-muted">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-line bg-transparent px-4 py-3 text-ink placeholder:text-muted focus:border-line-strong focus:outline-none"
                placeholder="you@email.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-sm text-muted">
                Your Project
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none rounded-xl border border-line bg-transparent px-4 py-3 text-ink placeholder:text-muted focus:border-line-strong focus:outline-none"
                placeholder="Tell me a bit about what you're building"
              />
            </div>
            <button
              type="submit"
              disabled={!primaryTarget}
              data-cursor="interactive"
              className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full btn-glow px-6 py-3 text-sm font-medium transition-transform duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
