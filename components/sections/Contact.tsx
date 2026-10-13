"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";
import { gmailComposeUrl } from "@/lib/mail";
import { cn } from "@/lib/utils";

const STEPS = [
  "You tell me what you're building.",
  "I read it and reply by email.",
  "If it fits, we set up a short call.",
];

type Errors = { name?: string; email?: string; message?: string };

const fieldClass =
  "rounded-xl border bg-transparent px-4 py-3 text-ink placeholder:text-muted focus:outline-none";

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Please add your name.";
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = "Please add a valid email address.";
  if (message.trim().length < 10) errors.message = "A few words about your project helps me prepare.";
  return errors;
}

/**
 * `links` is passed in from the page, because the icon grid reads files on the
 * server and this component is a client component (it holds the form).
 */
export function Contact({ links }: { links: ReactNode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // Sending opens a Gmail compose window to my address with the message
  // filled in, because a mailto: link does nothing on a browser with no email
  // program set up.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.email) return;
    setSubmitted(true);
    const found = validate(name, email, message);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const url = gmailComposeUrl({
      to: profile.email,
      subject: `Project inquiry from ${name.trim()}`,
      body: `${message.trim()}\n\nFrom ${name.trim()} (${email.trim()})`,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  /** Re-checks as you type, but only after a first attempt to send. */
  function onChange(field: "name" | "email" | "message", value: string) {
    const next = { name, email, message, [field]: value };
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "message") setMessage(value);
    if (submitted) setErrors(validate(next.name, next.email, next.message));
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section id="contact" className="relative overflow-hidden bg-bg px-5 py-20 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal blur>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Let&rsquo;s talk.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Open to AI engineering roles, applied ML work, research collaborations and AI product
            consulting. Based in {profile.location.city}, working with teams anywhere.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-line bg-bg-raised p-6 sm:p-7">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                  What happens next
                </p>
                <ol className="mt-5 flex flex-col gap-4">
                  {STEPS.map((step, i) => (
                    <li key={step} className="flex items-start gap-3.5 text-ink-dim">
                      <span className="accent-bar mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[0.68rem] font-semibold text-white">
                        {i + 1}
                      </span>
                      <span className="text-base leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                  Or reach me directly
                </p>
                {links}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="w-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex w-full flex-col gap-5 gradient-border rounded-3xl border border-line bg-bg-raised p-6 sm:p-9"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => onChange("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className={cn(fieldClass, errors.name ? "border-warm" : "border-line focus:border-line-strong")}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="err-name" className="text-sm text-warm">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => onChange("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  className={cn(fieldClass, errors.email ? "border-warm" : "border-line focus:border-line-strong")}
                  placeholder="you@email.com"
                />
                {errors.email && (
                  <p id="err-email" className="text-sm text-warm">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  Project details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => onChange("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  className={cn(fieldClass, "resize-none", errors.message ? "border-warm" : "border-line focus:border-line-strong")}
                  placeholder="What are you building? What does it need to do? Any deadline?"
                />
                {errors.message && (
                  <p id="err-message" className="text-sm text-warm">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={!profile.email}
                  data-cursor="interactive"
                  className="group inline-flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-full btn-glow px-6 py-3 text-sm font-medium transition-transform duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Compose email
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
                <p className="text-sm text-muted">Opens Gmail with your message ready. Nothing is stored here.</p>
              </div>

              {hasErrors && (
                <p role="alert" className="text-sm font-medium text-warm">
                  Please fix the highlighted fields and try again.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
