import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { allProjects } from "@/data/projects";
import { generalSection, projectSection } from "@/data/intakeQuestions";

/**
 * Local-only endpoint behind the /intake form. It writes answers to
 * /intake-data and uploaded images into /public/images, so it must never run
 * in production or be reachable from another machine.
 */

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "intake-data");
const MAX_FILES = 8;
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_TEXT = 4000;
const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

const allowedSlugs = new Set(["general", ...allProjects.map((p) => p.slug)]);

function refuse(request: Request): Response | null {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  const host = (request.headers.get("host") ?? "").split(":")[0];
  if (host !== "localhost" && host !== "127.0.0.1") {
    return new Response("Local access only", { status: 403 });
  }
  return null;
}

function imageDir(slug: string) {
  return slug === "general"
    ? path.join(ROOT, "public", "images", "general")
    : path.join(ROOT, "public", "images", "projects", slug);
}

type Saved = { answers: Record<string, string>; images: string[]; savedAt: string };

async function readSaved(slug: string): Promise<Saved | null> {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, `${slug}.json`), "utf-8")) as Saved;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const blocked = refuse(request);
  if (blocked) return blocked;

  const result: Record<string, Saved> = {};
  try {
    for (const file of await readdir(DATA_DIR)) {
      const slug = file.replace(/\.json$/, "");
      if (!allowedSlugs.has(slug)) continue;
      const saved = await readSaved(slug);
      if (saved) result[slug] = saved;
    }
  } catch {
    // No answers saved yet.
  }
  return Response.json(result);
}

export async function POST(request: Request) {
  const blocked = refuse(request);
  if (blocked) return blocked;

  const form = await request.formData();
  const slug = String(form.get("slug") ?? "");
  if (!allowedSlugs.has(slug)) {
    return Response.json({ error: "Unknown project." }, { status: 400 });
  }

  // Only accept fields that are actually in this section's question list.
  const section =
    slug === "general"
      ? generalSection
      : projectSection(slug, allProjects.find((p) => p.slug === slug)?.title ?? slug);
  const answers: Record<string, string> = {};
  for (const field of section.fields) {
    const value = form.get(`a:${field.id}`);
    if (typeof value === "string" && value.trim()) {
      answers[field.id] = value.trim().slice(0, MAX_TEXT);
    }
  }

  const files = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return Response.json({ error: `At most ${MAX_FILES} images at a time.` }, { status: 400 });
  }

  const previous = await readSaved(slug);
  const images = [...(previous?.images ?? [])];

  if (files.length > 0) {
    const dir = imageDir(slug);
    await mkdir(dir, { recursive: true });
    for (const [i, file] of files.entries()) {
      const ext = EXTENSIONS[file.type];
      if (!ext) {
        return Response.json({ error: `${file.name}: only png, jpg or webp.` }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return Response.json({ error: `${file.name} is over 8 MB.` }, { status: 400 });
      }
      const name = `${Date.now()}-${i}.${ext}`;
      await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
      images.push(
        slug === "general" ? `/images/general/${name}` : `/images/projects/${slug}/${name}`
      );
    }
  }

  const saved: Saved = { answers, images, savedAt: new Date().toISOString() };
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(path.join(DATA_DIR, `${slug}.json`), JSON.stringify(saved, null, 2), "utf-8");

  return Response.json(saved);
}
