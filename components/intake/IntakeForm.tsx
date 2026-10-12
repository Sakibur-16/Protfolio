"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { IntakeField, IntakeSection } from "@/data/intakeQuestions";
import { cn } from "@/lib/utils";

type Saved = { answers: Record<string, string>; images: string[]; savedAt: string };

const inputClass =
  "w-full rounded-md border border-line bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-line-strong focus:outline-none";

function Field({
  field,
  value,
  onChange,
}: {
  field: IntakeField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `f-${field.id}-${Math.abs(hash(field.label))}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {field.label}
      </label>
      {field.help && <p className="mt-1 text-xs leading-relaxed text-muted">{field.help}</p>}
      <div className="mt-2">
        {field.type === "textarea" ? (
          <textarea
            id={id}
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(inputClass, "resize-y")}
          />
        ) : field.type === "select" ? (
          <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
            <option value="">Choose...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            type={field.type === "url" ? "url" : "text"}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        )}
      </div>
    </div>
  );
}

function hash(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
  return h;
}

function SectionCard({
  section,
  saved,
  defaultOpen,
  onSaved,
}: {
  section: IntakeSection;
  saved: Saved | undefined;
  defaultOpen: boolean;
  onSaved: (slug: string, saved: Saved) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(saved?.answers ?? {});
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const filled = section.fields.filter((f) => (answers[f.id] ?? "").trim()).length;
  const imageCount = (saved?.images.length ?? 0) + files.length;

  async function save() {
    setState("saving");
    setMessage("");
    const form = new FormData();
    form.set("slug", section.slug);
    for (const field of section.fields) form.set(`a:${field.id}`, answers[field.id] ?? "");
    for (const file of files) form.append("images", file);

    try {
      const response = await fetch("/api/intake", { method: "POST", body: form });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Could not save.");
      onSaved(section.slug, body as Saved);
      setFiles([]);
      setState("saved");
      setMessage(`Saved at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not save.");
    }
  }

  return (
    <details open={defaultOpen} className="group rounded-2xl border border-line bg-bg-raised">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">{section.title}</h2>
          {section.intro && <p className="mt-1 text-sm text-muted">{section.intro}</p>}
        </div>
        <span className="shrink-0 font-mono text-xs tabular-nums text-muted">
          {section.fields.length > 0 ? `${filled}/${section.fields.length} answers` : "screenshots only"}
          {imageCount > 0 ? ` · ${imageCount} image${imageCount > 1 ? "s" : ""}` : ""}
        </span>
      </summary>

      <div className="flex flex-col gap-6 border-t border-line px-5 py-6 sm:px-6">
        {section.fields.map((field) => (
          <Field
            key={field.id}
            field={field}
            value={answers[field.id] ?? ""}
            onChange={(value) => setAnswers((current) => ({ ...current, [field.id]: value }))}
          />
        ))}

        {section.imageLabel && (
          <div>
            <p className="text-sm font-medium text-ink">{section.imageLabel}</p>
            <p className="mt-1 text-xs text-muted">
              Up to 8 at a time, 8 MB each. Real screenshots look far better than generated covers.
            </p>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="mt-2 block w-full text-sm text-muted file:mr-4 file:rounded-md file:border file:border-line-strong file:bg-transparent file:px-3.5 file:py-2 file:text-sm file:text-ink"
            />

            {(saved?.images.length ?? 0) > 0 && (
              <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {saved!.images.map((src) => (
                  <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-md border border-line">
                    <Image src={src} alt="" fill sizes="160px" className="object-cover" />
                  </li>
                ))}
              </ul>
            )}
            {files.length > 0 && (
              <p className="mt-3 text-xs text-muted">
                Ready to upload: {files.map((f) => f.name).join(", ")}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={save}
            disabled={state === "saving"}
            className="btn-glow rounded-md px-6 py-2.5 text-sm font-medium disabled:opacity-60"
          >
            {state === "saving" ? "Saving..." : "Save this section"}
          </button>
          {message && (
            <p
              role="status"
              className={cn("text-sm", state === "error" ? "text-warm" : "text-muted")}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </details>
  );
}

export function IntakeForm({ sections }: { sections: IntakeSection[] }) {
  const [saved, setSaved] = useState<Record<string, Saved>>({});
  // Cards only mount after earlier answers have loaded, so they start pre-filled.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/intake")
      .then((response) => (response.ok ? response.json() : {}))
      .then((data) => {
        if (active) setSaved(data as Record<string, Saved>);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loaded) return <p className="mt-10 text-sm text-muted">Loading your saved answers...</p>;

  return (
    <div className="mt-10 flex flex-col gap-4">
      {sections.map((section, i) => (
        <SectionCard
          key={section.slug}
          section={section}
          saved={saved[section.slug]}
          defaultOpen={i === 0}
          onSaved={(slug, value) => setSaved((current) => ({ ...current, [slug]: value }))}
        />
      ))}
    </div>
  );
}
