import type { Project } from "@/types/portfolio";

// Accent colors are assigned by category, not by project, so color carries
// meaning: violet marks LLM/product-led work, cyan marks data- and vision-led
// work, ember marks speech/voice work. See globals.css for the token values.
const ACCENT = {
  violet: "#7C6CFF",
  cyan: "#46E0C4",
  ember: "#FF6A3D",
} as const;

// ---------------------------------------------------------------------------
// SELECTED WORK — prioritized case studies. Fields are only as detailed as
// the underlying facts support. Where a project has no confirmed detail
// beyond its name, challenge/approach/outcome are left null and status is
// "undisclosed" rather than guessed — the UI renders those honestly instead
// of hiding the project or inventing content for it.
// ---------------------------------------------------------------------------
export const selectedWork: Project[] = [
  {
    slug: "nibblai",
    title: "NibblAI",
    year: "2026",
    role: "Backend & DevOps Engineer",
    category: "product-platform",
    domains: ["product", "llm"],
    status: "shipped",
    featured: true,
    shortDescription:
      "An API-first, multi-tenant rebate and product-review platform with a ledger-backed financial core.",
    fullDescription:
      "NibblAI is an API-first, multi-tenant rebate and product-review platform. Brands manage products, fund campaigns, and review analytics, while consumers discover offers, reserve rewards, upload receipts, publish incentivized reviews, and withdraw earnings. The core engineering challenge was coordinating tenant isolation, campaign budgets, receipt verification, concurrent claims, escrowed funds, subscriptions, and external AI services without ever allowing duplicate payments or inconsistent financial state.",
    challenge:
      "Coordinating tenant isolation, campaign budgets, receipt verification, concurrent claims, escrowed funds, and external AI services without ever allowing a duplicate payment or an inconsistent financial state.",
    approach:
      "Designed 16 modular domains and built atomic wallet, escrow, reservation, redemption, and payout workflows with concurrency and idempotency controls, behind tenant-aware permissions and audit trails.",
    outcome:
      "Unified rebates, reviews, escrow, and payouts around a traceable ledger-backed financial model, established reusable tenant/role/membership/subscription access controls across the API, and shipped a reproducible delivery pipeline with Docker, AWS infrastructure-as-code, and CI checks.",
    technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Redis", "Docker", "AWS", "Terraform"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "May–July 2026",
    deliverables: "Multi-tenant REST API · Ledger-backed wallet core · IaC delivery pipeline",
    domainLabel: "Multi-tenant SaaS · Fintech workflows · AI integration",
    architecture: [
      {
        title: "Domain-oriented API",
        description:
          "Sixteen Django apps split across accounts, brands, billing, products, campaigns, offers, reservations, receipts, rebates, reviews, wallets, payouts, notifications, analytics, administration, and shared concerns.",
      },
      {
        title: "Transactional reward core",
        description:
          "Service functions coordinate campaign locks, wallet locks, escrow holds, ledger entries, receipt verification, redemptions, review rewards, and withdrawals inside atomic database transactions.",
      },
      {
        title: "Delivery pipeline",
        description:
          "A multi-stage Docker image serves Django via Gunicorn and WhiteNoise, with Terraform, Ansible, Nginx, ECR, EC2, RDS, S3, and GitHub Actions supporting deployment.",
      },
    ],
    decisions: [
      {
        title: "Money movement is ledger-backed",
        description:
          "Credits, debits, holds, captures, and releases all pass through a dedicated wallet service that tracks balances using Decimal values and idempotency keys.",
      },
      {
        title: "Secure by default",
        description:
          "The API requires JWT auth, applies request throttling, uses UUID identifiers, and layers platform roles with brand-membership and manager-level checks.",
      },
      {
        title: "AI enhances, never blocks",
        description:
          "Review-prompt generation tries Anthropic, OpenAI, then Gemini in sequence, falling back to deterministic prompts when credentials are absent or a provider fails — so AI never becomes a hard dependency of the transactional core.",
      },
    ],
    stackGroups: [
      { label: "Application", items: ["Python", "Django", "Django REST Framework"] },
      { label: "Data & identity", items: ["PostgreSQL", "Redis", "JWT"] },
      { label: "Infrastructure", items: ["Docker", "AWS", "Terraform", "GitHub Actions"] },
      { label: "AI providers", items: ["Anthropic", "OpenAI", "Gemini"] },
    ],
    features: [
      "Brand campaign funding, product management, and analytics",
      "Consumer offer discovery, reward reservation, and receipt upload",
      "Incentivized review publishing with AI-generated prompts",
      "Escrowed wallet, redemption, and payout workflows",
    ],
    challenges: [
      {
        problem:
          "Concurrent reward claims could double-spend a campaign budget when several users reserve the same offer at once.",
        solution:
          "Reservation creation locks the campaign, atomically evaluates caps and tier budgets, then places a locked wallet hold using a consistent campaign-to-wallet lock order to avoid deadlocks.",
      },
      {
        problem:
          "Tenants must never see each other's data, while platform admins still need full visibility.",
        solution:
          "Brand-scoped selectors and membership checks enforce isolation, platform admins get an explicit bypass, and Starter-plan tenants receive stable anonymized customer references instead of PII.",
      },
    ],
  },
  {
    slug: "alfred-ai-dating-concierge",
    title: "Alfred",
    year: "2025",
    role: "AI Developer — AI service layer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "shipped",
    featured: true,
    shortDescription:
      "The AI service layer behind an AI dating concierge — conversational guidance grounded in live web search.",
    fullDescription:
      "Alfred is an AI dating concierge. This project scope covered the AI service layer only: a production-ready FastAPI backend built around a provider-agnostic LLM abstraction, so the underlying model can be swapped without touching the product around it, plus a live SerpAPI search integration for grounding advice in current, real-world information.",
    challenge:
      "A dating concierge needs to reason conversationally about a user's specific situation, not just recite generic advice — and static model knowledge alone can't keep answers current.",
    approach:
      "Built a provider-agnostic LLM abstraction so the concierge isn't locked to a single model vendor, and integrated SerpAPI so responses can draw on live search results. A full pytest suite covers the service layer.",
    outcome:
      "Delivered as a handoff-ready AI layer with test coverage in place, for a separate backend team to integrate into the product.",
    technologies: ["Python", "FastAPI", "Provider-agnostic LLM abstraction", "SerpAPI", "pytest"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2025",
    deliverables: "FastAPI service · Provider-agnostic LLM layer · Test suite",
    domainLabel: "Consumer dating",
    architecture: [
      {
        title: "FastAPI service layer",
        description: "The integration surface handed to the product's backend team.",
      },
      {
        title: "Provider-agnostic LLM abstraction",
        description:
          "A single internal interface over the model vendor, so the underlying model can be swapped without touching the product around it.",
      },
      {
        title: "Live search grounding",
        description:
          "SerpAPI integration so advice can draw on current, real-world information rather than static model knowledge.",
      },
    ],
    decisions: [
      {
        title: "Never bind the product to one model vendor",
        description:
          "Model quality and pricing move quickly. The abstraction means a vendor change is a config change, not a rewrite.",
      },
      {
        title: "Ground advice in live search",
        description:
          "Static model knowledge goes stale. Live retrieval keeps guidance anchored to what is actually true now.",
      },
    ],
    stackGroups: [
      { label: "Service", items: ["Python", "FastAPI"] },
      { label: "AI", items: ["Provider-agnostic LLM abstraction", "SerpAPI"] },
      { label: "Quality", items: ["pytest"] },
    ],
    features: [
      "Conversational dating guidance grounded in live web search",
      "Swappable model provider behind one interface",
      "Full pytest coverage across the service layer",
    ],
    challenges: [
      {
        problem:
          "A concierge has to reason about a user's specific situation, not recite generic advice — and static model knowledge cannot keep answers current.",
        solution:
          "Paired a conversational LLM layer with live SerpAPI retrieval, so responses combine reasoning with current information.",
      },
    ],
  },
  {
    slug: "eqi30-emotional-intelligence-platform",
    title: "EQi30",
    year: "2025",
    role: "AI Developer — AI service layer",
    category: "llm-application",
    domains: ["llm", "product", "education"],
    status: "shipped",
    featured: true,
    shortDescription:
      "A 12-engine AI system powering assessment, coaching, and microlearning for an emotional-intelligence platform.",
    fullDescription:
      "EQi30 is an emotional-intelligence platform. The AI service layer spans 12 engines covering assessment, coaching, microlearning, and adaptive scheduling, built in Python and FastAPI. A significant part of the work was data engineering: 28 separately authored microskill documents (docx and xlsx) had to be parsed and reconciled into one consistent structure the engines could run on.",
    challenge:
      "Translating a large body of emotional-intelligence content, authored across 28 separate documents with inconsistencies between them, into a structure a product could actually run coaching and scheduling logic on.",
    approach:
      "Built 12 AI engines spanning assessment, coaching, microlearning, and adaptive scheduling, and ran a dedicated content-mapping pass to resolve inconsistencies across the source documents.",
    outcome:
      "Mapped the source content into 40 abilities across 6 competencies, with 30 of those abilities now carrying complete day-by-day programs for the coaching engines to run on.",
    technologies: ["Python", "FastAPI", "Content data engineering"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
  },
  {
    slug: "rise-life-coaching-app",
    title: "Rise",
    year: "2025",
    role: "AI Developer — AI service layer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "shipped",
    featured: true,
    shortDescription:
      "The AI layer for a mobile life-coaching app: eleven endpoints, five coaching personalities, and streamed responses.",
    fullDescription:
      "Rise is a mobile life-coaching app. Its AI layer exposes 11 FastAPI endpoints built around a five-personality tone system, so coaching responses feel distinct depending on the personality selected. Responses stream to the client over server-sent events as structured JSON, rather than arriving as a single blocking reply.",
    challenge:
      "Coaching needed to feel personal and immediate in a mobile client — five distinct personalities, delivered as a smooth stream rather than a delayed wall of text.",
    approach:
      "Designed 11 endpoints around a five-personality tone system, with server-sent-event streaming and structured JSON outputs the mobile app could render as it arrived.",
    outcome:
      "Delivered as a standalone AI service layer, ready for the mobile app's backend team to integrate.",
    technologies: ["Python", "FastAPI", "Server-Sent Events", "Structured JSON outputs"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
  },
  {
    slug: "medical-imaging-diagnostics",
    title: "Medical Imaging Diagnostics",
    year: "2025",
    role: "Researcher",
    category: "computer-vision",
    domains: ["computer-vision", "healthcare"],
    status: "research",
    featured: true,
    shortDescription:
      "CNN-based image classification for malaria diagnosis from blood-smear images, evaluated for generalization across datasets.",
    fullDescription:
      "Diagnostic imaging models often score well on the dataset they were trained on and degrade on a different one collected under different conditions. This research trained and evaluated CNN-based image classification models across multiple blood-smear datasets, with the evaluation specifically designed around generalization rather than single-benchmark accuracy.",
    challenge:
      "Blood-smear datasets vary in staining, imaging equipment, and collection conditions — a model that performs well on one can fail on another, which matters a great deal for a diagnostic tool.",
    approach:
      "Trained CNN-based classification models in TensorFlow and Keras and assessed how performance generalized across datasets rather than optimizing for one.",
    outcome:
      "The findings were peer-reviewed and presented at ICDMIS 2025 (Springer) — see the Research section below.",
    technologies: ["Python", "TensorFlow", "Keras", "CNNs", "Image classification"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
  },
  {
    slug: "jobassist-ai",
    title: "JobAssist AI",
    year: "2024",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "in-development",
    featured: true,
    shortDescription:
      "An AI job-search platform for the French market — CV building, cover letters, application emails, and role matching.",
    fullDescription:
      "A job-search platform aimed at applicants in France, built around four AI surfaces: a CV builder, a cover-letter generator, an application-email generator, and AI-driven job matching and recommendations. Each surface has to produce output a candidate can actually send without rewriting it.",
    challenge:
      "Generated application material fails the moment it reads as generic — it has to reflect the specific candidate and the specific posting, in the conventions the French hiring market expects.",
    approach:
      "Built the AI layer as a set of focused generators — CV, cover letter, application email — alongside a matching and recommendation system, rather than one general-purpose prompt doing everything.",
    outcome: null,
    technologies: ["Python", "LLM integration", "Prompt engineering"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2024",
    deliverables: "AI generation layer · Job matching",
    domainLabel: "Careers · France",
    architecture: [
      {
        title: "Focused generators",
        description:
          "Separate CV, cover-letter, and application-email generators rather than one general-purpose prompt serving every surface.",
      },
      {
        title: "Matching & recommendation",
        description: "Ranks openings against a candidate's profile to surface roles worth applying to.",
      },
    ],
    decisions: [
      {
        title: "One generator per artefact",
        description:
          "A CV, a cover letter, and an outreach email have different conventions and constraints. Splitting them made each output usable without a rewrite.",
      },
    ],
    stackGroups: [
      { label: "AI", items: ["Python", "LLM integration", "Prompt engineering"] },
    ],
    features: [
      "AI CV builder",
      "AI cover-letter generator",
      "AI application-email generator",
      "AI job matching and recommendations",
    ],
    challenges: [
      {
        problem:
          "Generated application material fails the moment it reads as generic — it has to reflect the specific candidate, the specific posting, and French hiring conventions.",
        solution:
          "Built each artefact as its own generator with its own constraints, instead of one prompt trying to cover every case.",
      },
    ],
    todo: "Confirm launch status, live URL, and measurable outcome once available.",
  },
];

// ---------------------------------------------------------------------------
// ADDITIONAL PROJECTS — compact archive presentation, lighter on detail by
// design. See components/sections/AdditionalProjects.tsx.
// ---------------------------------------------------------------------------
export const additionalProjects: Project[] = [
  {
    slug: "quranity",
    title: "Quranity",
    year: "2026",
    role: "Full-Stack & DevOps Engineer",
    category: "product-platform",
    domains: ["llm", "education", "product"],
    status: "shipped",
    featured: true,
    shortDescription:
      "A containerized Islamic content platform — multilingual web, Django API, AI guidance service, and an async video pipeline.",
    fullDescription:
      "A containerized Islamic content platform comprising a multilingual public website, an administration dashboard, a Django API, and a dedicated AI guidance service. The repository separates the system into Django, FastAPI, and Next.js services; processes video asynchronously with Celery and FFmpeg; stores data in PostgreSQL and media in S3; distributes assets through CloudFront; and deploys Docker images to EC2 via GitHub Actions.",
    challenge:
      "Coordinating user accounts, Islamic guidance, prayer-related data, subscriptions, editorial content, and large video assets across independently deployable services.",
    approach:
      "Built a unified backend and delivery architecture supporting authenticated product features, AI-assisted guidance, content administration, media processing, and repeatable cloud deployment.",
    outcome:
      "A unified repository for four deployable application services and their supporting worker infrastructure, asynchronous status-aware HLS processing for large video content, and the AWS environment and EC2 host configuration codified with Terraform and Ansible.",
    technologies: [
      "Django REST Framework",
      "FastAPI",
      "Next.js",
      "OpenAI API",
      "PostgreSQL",
      "Celery",
      "Redis",
      "Docker",
      "AWS",
    ],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    timeline: "May–June 2026",
    deliverables: "Next.js Web · Django REST API · FastAPI · AWS EC2",
    domainLabel: "AI · Web Platform · Cloud Infrastructure",
    architecture: [
      {
        title: "Client layer",
        description:
          "Two Next.js applications provide a localized public website and an authenticated administration dashboard for users, blogs, and video content.",
      },
      {
        title: "Application layer",
        description:
          "Django REST Framework exposes JWT-protected APIs for accounts, Google and Apple sign-in, subscriptions, prayer tools, notifications, blogs, and video libraries.",
      },
      {
        title: "AI guidance & media layer",
        description:
          "A separate FastAPI service sends English, Arabic, and other requests to OpenAI, while FFmpeg creates HLS playlists and segments, uploads generated media to S3, and serves assets through a Terraform-configured CloudFront distribution.",
      },
    ],
    decisions: [
      {
        title: "Independent application services",
        description:
          "The API, AI service, landing page, dashboard, Redis broker, and Celery worker run as separate containers connected through a shared Docker network.",
      },
      {
        title: "Background video processing",
        description:
          "Video uploads dispatch Celery tasks that probe media, generate HLS renditions with FFmpeg, track processing status, and move completed output to object storage.",
      },
      {
        title: "Separated infrastructure ownership",
        description:
          "Terraform provisions EC2, RDS PostgreSQL, S3, CloudFront, networking rules, and an Elastic IP, while Ansible installs and configures Docker, Nginx, Certbot, project files, and service startup.",
      },
    ],
    stackGroups: [
      {
        label: "Applications",
        items: ["Next.js", "React", "TanStack Query", "Redux Toolkit", "Tailwind CSS"],
      },
      { label: "Backend & AI", items: ["Django", "Django REST Framework", "FastAPI", "OpenAI API", "JWT"] },
      { label: "Data & media", items: ["PostgreSQL", "Redis", "Celery", "FFmpeg", "HLS", "Amazon S3", "CloudFront"] },
      {
        label: "Infrastructure & delivery",
        items: ["Docker", "GitHub Actions", "Terraform", "Ansible", "AWS EC2", "AWS RDS", "Nginx", "Certbot"],
      },
    ],
    features: [
      "Islamic AI guidance — OpenAI-backed chat with seven guidance perspectives, multilingual responses, conversation history, concise and full modes, rate limiting, and Qur'an or Hadith citation handling",
      "Identity & subscriptions — email OTP verification, JWT sessions, password recovery, Google and Apple token login, RevenueCat webhook processing, plans, and feature-usage limits",
      "Video content pipeline — administrative workflows for shorts, long videos, series, trailers, and parts, with asynchronous HLS generation and S3/CloudFront delivery",
      "Public site & administration — English, Arabic, and Albanian pages with localized metadata and blogs, plus an authenticated dashboard for statistics, publishing, and content management",
    ],
    challenges: [
      {
        problem:
          "Transcoding during an API request would tie up web workers and make long uploads hard to operate reliably.",
        solution:
          "The backend delegates HLS generation to Celery workers, records pending/processing/completed/failed states, and supports either local media or S3-backed output.",
      },
      {
        problem:
          "Four application images, a task worker, a broker, persistent media, database migrations, and domain routing must all be updated together.",
        solution:
          "Docker Compose defines service dependencies and health checks, the backend entrypoint handles database initialization, and GitHub Actions rebuilds images before recreating the EC2 stack.",
      },
    ],
  },
  {
    slug: "frazzl-kid",
    title: "Frazzl Kid",
    year: "2025",
    role: "Deployment & DevOps Support",
    category: "education",
    domains: ["education", "product"],
    status: "shipped",
    featured: false,
    shortDescription: "Production deployment support for a FastAPI backend behind a children's educational app.",
    fullDescription:
      "Guided a first-time production deployment of the Frazzl Kid API to a Hostinger VPS, including SSH access, systemd service configuration, and firewall setup.",
    challenge: null,
    approach: "Configured SSH, systemd, and firewall rules for a first-time VPS deployment.",
    outcome: "The API was moved from local development to a running production deployment.",
    technologies: ["Python", "FastAPI", "Hostinger VPS", "systemd"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    timeline: "2025",
    deliverables: "Production deployment · Service configuration",
    domainLabel: "Children's education",
    architecture: [
      {
        title: "Hostinger VPS",
        description: "The target environment for the first production deployment.",
      },
      {
        title: "systemd service",
        description: "Keeps the FastAPI backend running and restarting reliably as a managed service.",
      },
      {
        title: "SSH & firewall",
        description: "Access and network rules configured for a first-time production environment.",
      },
    ],
    stackGroups: [
      { label: "Application", items: ["Python", "FastAPI"] },
      { label: "Infrastructure", items: ["Hostinger VPS", "systemd", "Linux"] },
    ],
  },
  {
    slug: "wondertales",
    title: "Wondertales",
    year: "2024",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "education"],
    status: "undisclosed",
    featured: false,
    shortDescription: "An AI-powered storytelling product for children.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    todo: "Add confirmed detail once available.",
  },
  {
    slug: "hairlync",
    title: "HairLync",
    year: "2026",
    role: "Backend & DevOps Engineer",
    category: "product-platform",
    domains: ["product", "computer-vision"],
    status: "shipped",
    featured: true,
    shortDescription:
      "A four-service AI-assisted hair marketplace — bookings, payments, and image-based style analysis.",
    fullDescription:
      "A multi-service platform where clients discover barbers and salons, browse services and portfolios, manage favorites and appointments, and receive hair-style recommendations. Professionals manage profiles, availability, bookings, employees, subscriptions, and educational content. Marketplace behavior is organized into ten Django applications behind OpenAPI-documented REST endpoints, with image analysis running as a separate FastAPI service.",
    challenge:
      "Keeping client, independent-barber, salon-owner, and salon-employee data isolated while coordinating availability, service eligibility, booking transitions, payments, media, and AI-driven workflows across multiple deployable services.",
    approach:
      "Built JWT auth with OTP verification and role-based access policies, booking flows with overlap validation and status transitions, Stripe Checkout with signed webhooks and duplicate-event protection, and a staged AWS delivery pipeline.",
    outcome:
      "Versioned, Swagger- and ReDoc-documented APIs across ten marketplace domains; four application services packaged for consistent local, staging, and production environments; and selective CI/CD with immutable commit-tagged ECR images, SSM-driven production deployment, health verification, and service-level rollback tooling.",
    technologies: ["Django REST Framework", "FastAPI", "PostgreSQL", "OpenAI API", "Stripe", "React", "Docker", "AWS"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "May–July 2026",
    deliverables: "Django REST API · FastAPI AI service · Next.js admin dashboard · React landing site",
    domainLabel: "REST APIs · AI · Marketplace · Cloud Infrastructure",
    architecture: [
      {
        title: "Four-service deployment",
        description:
          "Docker Compose runs the Django backend, FastAPI analysis service, Next.js admin dashboard, and React landing site as independently buildable services with health checks and environment-specific overrides.",
      },
      {
        title: "Domain-oriented marketplace API",
        description:
          "Ten Django applications separate users, profiles, services, bookings, reviews, favorites, subscriptions, portfolios, recommendations, and educational content behind versioned REST endpoints.",
      },
      {
        title: "AWS delivery pipeline",
        description:
          "Terraform provisions EC2, PostgreSQL RDS, S3 media storage, CloudFront, IAM, and networking; GitHub Actions builds changed services into ECR and deploys production releases through short-lived OIDC credentials and SSM Run Command.",
      },
    ],
    decisions: [
      {
        title: "Explicit role and ownership policies",
        description:
          "Custom DRF permissions distinguish clients, barbers, salon owners, salon employees, administrators, verified users, and subscribed professionals, while owner-scoped querysets limit access to business records.",
      },
      {
        title: "Database-backed booking integrity",
        description:
          "Booking and time-slot models use ownership check constraints, indexed lookup fields, employee-scoped uniqueness, overlap validation, atomic writes, and conditional row locking for salon scheduling.",
      },
      {
        title: "Webhook-driven subscription state",
        description:
          "Stripe flows are reconciled through signature-verified webhooks, transactional subscription updates, and a unique webhook-event ledger that makes repeated Stripe deliveries idempotent.",
      },
    ],
    stackGroups: [
      { label: "Application", items: ["Python", "Django", "Django REST Framework", "FastAPI"] },
      { label: "Web interfaces", items: ["React", "Vite", "Next.js", "Tailwind CSS", "Framer Motion"] },
      {
        label: "Data & integrations",
        items: ["PostgreSQL", "Simple JWT", "OTP email verification", "Stripe", "OpenAI API", "YouTube Data API"],
      },
      {
        label: "Infrastructure & delivery",
        items: ["Docker", "GitHub Actions", "AWS", "Terraform", "Ansible", "Nginx", "Prometheus", "Grafana"],
      },
    ],
    features: [
      "Multi-role marketplace — client, barber, salon, employee, and admin accounts with OTP onboarding, JWT refresh and blacklisting, and location-based discovery",
      "Availability and booking management — time slots, service-duration validation, cancellation rules, rescheduling, and salon-wide or employee-scoped views",
      "AI hair analysis — a FastAPI upload endpoint runs images through an OpenAI vision model for structured face, hair, skin, colour, care, and style analysis, enriched with YouTube tutorials",
      "Subscriptions and gated content — Stripe Checkout, billing portal, entitlements, plan limits, and premium educational content",
    ],
    challenges: [
      {
        problem:
          "Appointments can belong to either an independent barber or a salon with an assigned employee, creating different ownership, availability, service, and permission rules.",
        solution:
          "The data model enforces exactly one business owner, requires an employee for salon appointments, verifies employee-service membership, and exposes separate client, employee, and salon-owner workflows.",
      },
      {
        problem:
          "Multiple requests can target the same employee and an overlapping time range while a slot still appears available.",
        solution:
          "The salon booking serializer validates working availability and active-booking overlap inside a database transaction, using row locking where supported before creating the appointment.",
      },
      {
        problem:
          "Checkout completions, renewals, failures, cancellations, and duplicate webhook deliveries can leave local entitlement data inconsistent with Stripe.",
        solution:
          "Centralized Stripe services map customers and plans, update billing periods transactionally, preserve access during retryable payment failures, and record every webhook event by its unique Stripe identifier.",
      },
    ],
  },
  {
    slug: "everidog",
    title: "Everidog",
    year: "2024",
    role: "AI Developer",
    category: "product-platform",
    domains: ["product"],
    status: "undisclosed",
    featured: false,
    shortDescription: "A product for dog owners.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    todo: "Add confirmed detail once available.",
  },
  {
    slug: "aura",
    title: "Aura",
    year: "2024",
    role: "AI Developer",
    category: "product-platform",
    domains: ["product"],
    status: "undisclosed",
    featured: false,
    shortDescription: "Case study details for this project are being finalized.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    todo: "Add confirmed detail once available.",
  },
  {
    slug: "byoj",
    title: "BYOJ",
    year: "2024",
    role: "AI Developer",
    category: "tooling",
    domains: ["product"],
    status: "undisclosed",
    featured: false,
    shortDescription: "Case study details for this project are being finalized.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    todo: "Add confirmed detail once available.",
  },
];

export const allProjects: Project[] = [...selectedWork, ...additionalProjects];

/**
 * Total projects delivered since 2024, as reported by the site owner.
 *
 * Deliberately a separate number from `allProjects.length`: not every
 * engagement has a public write-up (client confidentiality, or simply no case
 * study written yet). The UI states both figures rather than implying the
 * documented subset is the whole body of work.
 */
export const TOTAL_PROJECTS_DELIVERED = 19;

/**
 * The six projects that lead the work section, in the order they should
 * appear. Kept as an explicit slug list so the running order is a deliberate
 * editorial decision rather than a side effect of array position.
 */
const FEATURED_SLUGS = [
  "nibblai",
  "hairlync",
  "quranity",
  "jobassist-ai",
  "alfred-ai-dating-concierge",
  "wondertales",
] as const;

export const featuredProjects: Project[] = FEATURED_SLUGS.map((slug) => {
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Featured project "${slug}" is missing from the project data.`);
  return project;
});

export const otherProjects: Project[] = allProjects.filter(
  (project) => !FEATURED_SLUGS.includes(project.slug as (typeof FEATURED_SLUGS)[number])
);

/** Previous/next neighbours for the case-study pager, wrapping at both ends. */
export function projectNeighbours(slug: string): { previous: Project; next: Project } | null {
  const ordered = [...featuredProjects, ...otherProjects];
  const index = ordered.findIndex((p) => p.slug === slug);
  if (index === -1 || ordered.length < 2) return null;
  return {
    previous: ordered[(index - 1 + ordered.length) % ordered.length],
    next: ordered[(index + 1) % ordered.length],
  };
}

export const projectCategoryLabels: Record<Project["category"], string> = {
  "llm-application": "LLM Application",
  "rag-search": "RAG & Search",
  nlp: "NLP",
  "computer-vision": "Computer Vision",
  "speech-ai": "Speech AI",
  education: "Education",
  healthcare: "Healthcare",
  "product-platform": "Product Platform",
  tooling: "Tooling",
};
