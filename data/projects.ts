import type { Project } from "@/types/portfolio";

// Accent colours are the site's own: blue (accent-cool) marks LLM and product
// work, orange (accent-warm) marks data, vision and voice work. The names stay
// violet/cyan/ember so existing project entries keep working.
const ACCENT = {
  violet: "#2c6bff",
  cyan: "#ff6b2c",
  ember: "#ff6b2c",
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
    slug: "alfred-ai-dating-concierge",
    title: "Alfred",
    year: "2025",
    role: "AI Developer — AI service layer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "prototype",
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
    image: "/images/projects/alfred-ai-dating-concierge.svg",
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
    image: "/images/projects/eqi30-emotional-intelligence-platform.svg",
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
    status: "prototype",
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
    image: "/images/projects/rise-life-coaching-app.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
  },
  {
    slug: "medical-imaging-diagnostics",
    title: "Medical Imaging Diagnostics",
    year: "2023-24",
    role: "ML Researcher",
    category: "computer-vision",
    domains: ["computer-vision", "healthcare"],
    status: "research",
    featured: false,
    shortDescription:
      "Early research on breast cancer detection and retinal key-sign identification, using CNN classifiers on medical images.",
    fullDescription:
      "Early research from my BSc. I built and evaluated CNN-based classification pipelines for two medical-imaging problems: detecting breast cancer and identifying key signs in retinal images.",
    challenge: null,
    approach:
      "Built and evaluated CNN-based classification pipelines in TensorFlow and Keras, with image preprocessing ahead of training.",
    outcome: null,
    technologies: ["Python", "TensorFlow", "Keras", "CNNs", "Image processing"],
    image: "/images/projects/medical-imaging-diagnostics.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    timeline: "2023-24",
    domainLabel: "Medical imaging",
    stackGroups: [
      { label: "ML", items: ["Python", "TensorFlow", "Keras", "CNNs", "Image processing"] },
    ],
    todo: "Add datasets and results once confirmed.",
  },
  {
    slug: "malaria-diagnosis",
    title: "Malaria Diagnosis",
    year: "2025",
    role: "Researcher",
    category: "computer-vision",
    domains: ["computer-vision", "healthcare"],
    status: "research",
    featured: false,
    shortDescription:
      "CNN-based classification of blood smear images for malaria diagnosis, tested for how well the models hold up on new datasets.",
    fullDescription:
      "Diagnostic imaging models often score well on the dataset they were trained on and fall apart on another one collected under different conditions. This study trained and evaluated CNN-based models on several blood smear datasets, with the evaluation built around generalization rather than a single benchmark score. It became a peer-reviewed paper at ICDMIS 2025, published by Springer.",
    challenge:
      "Blood smear datasets differ in staining, imaging equipment and collection conditions, so a model that does well on one can fail on another. For a diagnostic tool that matters a great deal.",
    approach:
      "I prepared and preprocessed the datasets, trained and fine-tuned the models in TensorFlow and Keras, evaluated them, and tuned the pipeline. I measured how performance carried across datasets instead of optimising for one.",
    outcome: "Peer-reviewed and presented at ICDMIS 2025 (Springer). See the Research section.",
    technologies: ["Python", "TensorFlow", "Keras", "CNNs", "Image classification"],
    image: "/images/projects/malaria-diagnosis.svg",
    gallery: [],
    links: {
      external: "https://link.springer.com/chapter/10.1007/978-3-032-25955-4_35",
      repository: null,
      store: null,
    },
    accentColor: ACCENT.cyan,
    timeline: "2025",
    domainLabel: "Medical imaging",
    stackGroups: [
      { label: "ML", items: ["Python", "TensorFlow", "Keras", "CNNs", "Image classification"] },
    ],
    todo: "Add datasets and results once confirmed.",
  },
];

// ---------------------------------------------------------------------------
// ADDITIONAL PROJECTS — compact archive presentation, lighter on detail by
// design. See components/sections/AdditionalProjects.tsx.
// ---------------------------------------------------------------------------
export const additionalProjects: Project[] = [
  {
    slug: "jobassist-ai",
    title: "JobAssist AI",
    year: "2026",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "nlp", "product"],
    status: "prototype",
    featured: true,
    shortDescription:
      "An AI career assistant that reads your CV, ranks job listings against it with a 0 to 100 match score, and writes cover letters and application emails.",
    fullDescription:
      "JobAssist AI is the backend of a CV assistant. You give it a CV and a list of job listings. It pulls the skills out of the CV, normalises the job data, and asks OpenAI to compare your experience with each job. You get up to 10 ranked matches, each with a 0 to 100 score and a plain explanation of why. The same service also writes cover letters and application emails, checks CV quality and ATS fit, and generates CVs in several formats. It works with listings from any country and language, including French ones.",
    challenge:
      "Job data arrives with different field names, and AI replies can include invalid scores or count jobs from zero or from one. The ranking had to survive all of that.",
    approach:
      "I convert every job format into one structure, validate and clamp scores to 0 to 100, accept both index styles, drop weak matches and retry failed AI calls up to three times. The API rejects malformed requests and unsupported CV files instead of returning a wrong result.",
    outcome:
      "A working prototype: one request ranks up to 10 jobs for a CV, each with a score and an explanation, and failed AI calls retry up to 3 times. It runs locally and has no public link yet.",
    technologies: ["Python", "FastAPI", "OpenAI API", "Pydantic", "PyMuPDF", "pytest"],
    image: "/images/projects/jobassist-ai.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2026",
    deliverables: "FastAPI backend · CV parsing · Job ranking",
    domainLabel: "Careers",
    architecture: [
      {
        title: "CV parsing",
        description:
          "Reads PDF, DOCX and TXT files with PyMuPDF and python-docx, then extracts the candidate's skills.",
      },
      {
        title: "Job normalisation",
        description:
          "Turns listings with different field names into one internal structure.",
      },
      {
        title: "AI ranking",
        description:
          "OpenAI compares the candidate's skills and experience with each job and returns a 0 to 100 score with an explanation.",
      },
      {
        title: "Filtering and response",
        description:
          "Low-quality matches are removed and the top 10 come back in a response validated with Pydantic.",
      },
    ],
    decisions: [
      {
        title: "One internal job format",
        description:
          "Converting every listing to a single structure first keeps the ranking code simple, whatever the source.",
      },
      {
        title: "Do not trust the model's numbers",
        description:
          "Scores are validated and clamped to 0 to 100, and both zero-based and one-based indexes are accepted, so a quirk in a reply cannot break the response.",
      },
      {
        title: "Retry, then fail clearly",
        description:
          "AI requests retry up to three times. After that the API returns a clear error, not a silent wrong answer.",
      },
    ],
    stackGroups: [
      { label: "Service", items: ["Python", "FastAPI", "Pydantic", "Docker"] },
      { label: "AI and parsing", items: ["OpenAI API", "PyMuPDF", "python-docx", "httpx", "Tenacity"] },
      { label: "Quality", items: ["pytest"] },
    ],
    features: [
      "CV parsing from PDF, DOCX and TXT",
      "Skill extraction from the CV",
      "Ranked job matches with a 0 to 100 score and a reason",
      "Tailored cover letters and application emails",
      "CV quality and ATS analysis",
      "CV generation in several formats",
    ],
    challenges: [
      {
        problem:
          "Listings use different field names, and the AI can return invalid scores or count jobs from zero or from one.",
        solution:
          "Normalise every format into one structure, clamp scores to 0 to 100, accept both index styles, filter low-quality matches and retry failed AI requests up to three times.",
      },
    ],
  },
  {
    slug: "finance-ai",
    title: "Finance AI",
    year: "2026",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "rag", "product"],
    status: "client-confidential",
    featured: false,
    shortDescription:
      "A personal finance assistant connected to a client's live financial database. It answers spending, budgeting and cash-flow questions.",
    fullDescription:
      "A conversational assistant on top of a client's live financial database. The model works out what the user is asking, but the numbers come from deterministic calculations, not from the model, so spending, budgeting and cash-flow answers can be checked. The chat layer is built on the OpenAI API behind a secure service.",
    challenge: "A language model should not be doing arithmetic on someone's money.",
    approach:
      "Intent detection routes each question to deterministic financial calculations over the client's data. The model only phrases the result.",
    outcome: null,
    technologies: ["FastAPI", "OpenAI API", "MySQL/MariaDB", "RAG"],
    image: "/images/projects/finance-ai.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2026",
    domainLabel: "Personal finance",
    features: [
      "Answers questions about spending, budgets and cash flow",
      "Works on the client's live financial database",
      "Calculations are deterministic, not generated by the model",
    ],
    stackGroups: [
      { label: "Service", items: ["FastAPI", "MySQL/MariaDB"] },
      { label: "AI", items: ["OpenAI API", "RAG"] },
    ],
    todo: "Add measured results and what was hardest once confirmed.",
  },
  {
    slug: "quranity",
    title: "Quranity",
    year: "2026",
    role: "Lead AI Developer & PM",
    category: "llm-application",
    domains: ["llm", "nlp", "education"],
    status: "shipped",
    featured: false,
    shortDescription:
      "A Qur'an app with Qalam, an AI chatbot that talks like a person and backs every answer with the ayah or hadith it comes from, linked to its source.",
    fullDescription:
      "Quranity is a Qur'an app, live on Google Play and the App Store, that brings Qur'an learning, accurate prayer times and AI guidance into one place. Its centrepiece is Qalam, a chatbot you can talk to like a person. It answers from the Qur'an and Hadith and cites the exact source for every answer, with a link to quran.com or sunnah.com. Qalam is educational guidance, not a replacement for a scholar's ruling, and it says so.",
    challenge:
      "A model can sound right and still cite nothing, or cite something wrong. For religious guidance that is not acceptable: every answer has to point to a real ayah or hadith that a reader can check.",
    approach:
      "I built the Qalam guidance layer: the source policy, a prompt for each perspective, strict citation formats, and a check that parses every citation, builds a direct link to the source, and tries again when the references are weak. I also led the project as product manager.",
    outcome:
      "Qalam is live in the Quranity app on Google Play and the App Store, and every answer carries a source link. Its concise mode is designed to cut token cost by about 45%.",
    technologies: ["Python", "FastAPI", "OpenAI API", "Pydantic", "Flutter"],
    image: "/images/projects/quranity.svg",
    gallery: [],
    links: {
      external: "https://quranity.app",
      repository: null,
      store: "https://play.google.com/store/apps/details?id=app.quranity",
      appStore: "https://apps.apple.com/ly/app/quranity/id6764633566",
    },
    accentColor: ACCENT.cyan,
    timeline: "2026",
    deliverables: "Qalam AI guidance layer · Mobile app",
    domainLabel: "Islamic education",
    architecture: [
      {
        title: "Apps and website",
        description:
          "The mobile app on Google Play and the App Store, plus a multilingual website with an admin dashboard.",
      },
      {
        title: "Platform APIs",
        description:
          "Accounts, subscriptions, prayer times, content and notifications behind the apps.",
      },
      {
        title: "Qalam AI service (my part)",
        description:
          "The chatbot service: a source policy, a prompt for each perspective, a citation check that links to quran.com and sunnah.com, and a second pass when references are weak.",
      },
      {
        title: "Media and storage",
        description:
          "Videos are processed in the background and served from cloud storage, so uploads never block the app.",
      },
    ],
    decisions: [
      {
        title: "Check the citations, do not trust the model",
        description:
          "A model can sound sure and cite wrongly. Every citation is parsed and turned into a link to quran.com or sunnah.com, so a reader can verify it in one tap.",
      },
      {
        title: "Sound human, cite like a scholar",
        description:
          "A friendly conversation is what makes people use it. Every answer still ends with its source, so the tone never replaces the evidence.",
      },
      {
        title: "Guidance, not a fatwa",
        description:
          "Qalam is framed as educational guidance. It encourages users to ask a qualified scholar for binding rulings.",
      },
    ],
    stackGroups: [
      { label: "Qalam AI service (mine)", items: ["Python", "FastAPI", "OpenAI API", "Pydantic"] },
      {
        label: "Platform",
        items: ["Django", "Django REST Framework", "Celery", "Redis", "PostgreSQL", "Next.js", "React", "Tailwind CSS", "Docker", "Nginx"],
      },
      { label: "Mobile app", items: ["Flutter", "Dart"] },
    ],
    features: [
      "Qalam, a chatbot you talk to like a person",
      "Every answer cites its ayah or hadith, with a link to the source",
      "Qur'an: Uthmani Arabic with the Saheeh International English translation",
      "Hadith: Sahih al-Bukhari, Sahih Muslim, Sunan at-Tirmidhi, Abu Dawood, an-Nasa'i and Ibn Majah",
      "Answers in English, Arabic and Albanian",
      "Seven perspectives to answer from, with saved conversation history",
      "Short or full answers, your choice",
      "Qur'an stories, prayer times, and tajweed colour-coded Arabic with word-by-word translation",
    ],
    challenges: [
      {
        problem:
          "Answers could sound good but miss strict, verifiable citations.",
        solution:
          "I enforced citation formats in the prompts, parsed every citation with regular expressions, generated direct links to the sources, and added a second pass when the references were weak.",
      },
      {
        problem:
          "Video streaming and image loading did not work, and the AWS S3 bucket was not behaving the way I needed.",
        solution:
          "It took nearly a week of testing storage configuration, file access and media delivery separately before I found the causes. Now I validate cloud storage early and test media delivery on its own before putting everything together.",
      },
    ],
    stories: [
      {
        label: "Why I built it",
        text: "I wanted authentic Islamic knowledge to be easier to reach in everyday life. Quranity puts Qur'an learning, accurate prayer times and AI guidance in one simple app. I hoped technology could help Muslims strengthen their connection with Allah, and I wanted the AI to stay respectful of Islamic principles and grounded in trusted sources.",
      },
      {
        label: "The week I lost",
        text: "Video streaming and image loading would not work, and the S3 bucket did not behave as I expected. It looked like a simple integration and became nearly a week of debugging. I had to understand how storage configuration, file access and media delivery interact. The lesson I kept: validate cloud storage early, and test media delivery by itself before it goes into the final product.",
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
    status: "client-confidential",
    featured: false,
    shortDescription: "Production deployment support for a FastAPI backend behind a children's educational app.",
    fullDescription:
      "Guided a first-time production deployment of the Frazzl Kid API to a Hostinger VPS, including SSH access, systemd service configuration, and firewall setup.",
    challenge: null,
    approach: "Configured SSH, systemd, and firewall rules for a first-time VPS deployment.",
    outcome: "The API was moved from local development to a running production deployment.",
    technologies: ["Python", "FastAPI", "Hostinger VPS", "systemd"],
    image: "/images/projects/frazzl-kid.svg",
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
    year: "2026",
    role: "AI Developer",
    category: "speech-ai",
    domains: ["llm", "speech", "education"],
    status: "prototype",
    featured: false,
    shortDescription:
      "A story app that narrates personalised children's stories in a cloned voice or a voice from a built-in library.",
    fullDescription:
      "Wondertales writes personalised children's stories with an LLM and narrates them aloud with ElevenLabs. A voice can be cloned, or picked from a pre-built voice library, so the story is told in a voice the child knows or likes. I also built its landing page: a storybook-style site where parents explore the story worlds, read the blog and follow the links to download the app. The landing page is live.",
    challenge:
      "A basic landing page template had to become a complete, trustworthy product experience for a children's storytelling platform.",
    approach:
      "An LLM writes the story and ElevenLabs narrates it. For the landing page I rebuilt the site around the visitor's journey, with reusable React and TypeScript components and a storybook-inspired visual system, keeping content, navigation, tracking and styling in separate modules.",
    outcome:
      "The landing page is live, with 29 custom story-world and character illustrations across twelve story categories.",
    technologies: ["ElevenLabs", "LLM", "React", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/wondertales.svg",
    gallery: [],
    links: { external: "https://www.wondertaleshub.com/", repository: null, store: null },
    accentColor: ACCENT.ember,
    timeline: "2026",
    domainLabel: "Children's stories",
    deliverables: "Story app AI · Landing page",
    features: [
      "Personalised stories written by an LLM",
      "Voice cloning",
      "A pre-built voice library",
      "Narration generated on the fly",
      "Story worlds and characters: adventure, animals, bedtime, dinosaurs, fantasy, friendship, magic, ocean, pirates, princesses, science and space",
      "A blog with parenting and storytelling articles",
      "App download links with privacy-friendly click tracking",
      "Responsive layouts and SEO metadata",
    ],
    decisions: [
      {
        title: "Build around the visitor's journey",
        description:
          "Discover the concept, explore the story worlds and characters, see how it works, read the parenting and storytelling articles, then download the app. Every section follows that path.",
      },
      {
        title: "Analytics without invasive tracking",
        description:
          "The site counts anonymous page views and store clicks without cookies, IP addresses or browser fingerprints, and it respects Do Not Track and Global Privacy Control.",
      },
      {
        title: "A small, typed toolset",
        description:
          "React, TypeScript, React Router, Tailwind CSS and Zustand give a fast, type-safe, component-based base without extra complexity.",
      },
    ],
    stackGroups: [
      { label: "AI", items: ["ElevenLabs", "LLM"] },
      { label: "Landing page (mine)", items: ["React", "TypeScript", "React Router", "Tailwind CSS", "Zustand"] },
    ],
    challenges: [
      {
        problem:
          "The project started as a minimal Vite starter that did not explain the product or give a realistic user journey.",
        solution:
          "I replaced the placeholder content with 29 custom story illustrations, responsive sections, blog pages, SEO metadata and social links, all built as reusable components.",
      },
    ],
    todo: "Add the landing page URL to links.external, and screenshots.",
  },
  {
    slug: "hairlync",
    title: "Hairlync",
    year: "2026",
    role: "Lead AI Developer & PM",
    category: "computer-vision",
    domains: ["computer-vision", "llm", "product"],
    status: "shipped",
    featured: false,
    shortDescription:
      "A marketplace for barbers and salons, with AI that analyses your face and hair from a selfie and recommends the haircuts and hairstyles that suit you.",
    fullDescription:
      "Hairlync is a marketplace where clients find barbers and salons, book appointments and get AI hairstyle recommendations, and where professionals manage their profiles, availability and bookings. The AI is my part of it. You upload a selfie and choose your gender, hair length, occasion and whether you want a haircut, a hairstyle or both. A vision model reads your face and hair and returns a structured analysis with personalised recommendations, scores and styling advice.",
    challenge:
      "A vision model is flexible, and that is the problem. It sometimes returned hairstyles when the user asked for a haircut, added facial-hair advice for users who should not get it, and cut off long answers into invalid JSON.",
    approach:
      "I built the AI analysis from the API to the final output: a FastAPI service that takes the upload, sends it to GPT-4o Vision with a detailed prompt and a response schema built for each request, then validates, filters and enriches what comes back.",
    outcome:
      "Live at hairlync.com. The AI service is covered by 50 automated regression tests.",
    technologies: ["Python", "FastAPI", "OpenAI GPT-4o Vision", "JSON Schema", "Pillow"],
    image: "/images/projects/hairlync.svg",
    gallery: [],
    links: { external: "https://hairlync.com", repository: null, store: null },
    accentColor: ACCENT.cyan,
    timeline: "2026",
    deliverables: "AI analysis service · Recommendation engine",
    domainLabel: "Hair and beauty care",
    architecture: [
      {
        title: "Upload and checks",
        description:
          "Accepts JPG, PNG, WebP and GIF, normalises the user's choices, and scores the photo. A blurry or badly framed photo gets a retake message instead of a poor answer.",
      },
      {
        title: "Vision analysis",
        description:
          "GPT-4o Vision reads the selfie against a detailed prompt and a JSON schema built for that gender and service type, with fallback to other models.",
      },
      {
        title: "Validation and filtering",
        description:
          "Removes sections that do not belong, validates types and scores, drops duplicates, orders the results and limits how many are returned.",
      },
      {
        title: "Enrichment",
        description:
          "Adds a stylist-ready request phrase, salon time and price tier, hair-care advice and matching YouTube tutorials.",
      },
    ],
    decisions: [
      {
        title: "Build the schema for each request",
        description:
          "The JSON schema changes with gender and service type, so the model cannot return a section the user should not get.",
      },
      {
        title: "Never show a bad photo's result",
        description:
          "A photo-quality score runs first. If the photo cannot support a reliable analysis, the user is asked to retake it.",
      },
      {
        title: "Turn a flexible model into a predictable feature",
        description:
          "Output is normalised, filtered and validated before anyone sees it, so the product gets reliable data and not generic chatbot text.",
      },
    ],
    stackGroups: [
      { label: "AI service (mine)", items: ["Python", "FastAPI", "OpenAI GPT-4o Vision", "OpenAI Chat Completions API", "JSON Schema", "Pillow", "NumPy", "YouTube Data API"] },
      { label: "Platform", items: ["Django", "Django REST Framework", "PostgreSQL", "React", "Vite", "Tailwind CSS", "Docker", "AWS", "S3", "CloudFront", "GitHub Actions"] },
    ],
    features: [
      "Selfie analysis: face shape, proportions, hair texture, density, condition, hairline, curl pattern, colour and skin",
      "Haircut and hairstyle recommendations with compatibility scores and reasons",
      "Styles to avoid, styling advice and upkeep, with trim frequency",
      "Salon time and price tier, plus a request phrase to show your stylist",
      "Beard analysis and recommendations for men",
      "Photo-quality check with retake guidance",
      "Matching YouTube tutorials",
      "Recommendation workflows for barbers and stylists",
    ],
    challenges: [
      {
        problem:
          "The model returned hairstyles for a haircut request, or facial-hair advice for users who should not get it.",
        solution:
          "I normalised the inputs, built the JSON schema from gender and service type, added explicit prompt rules, and removed invalid sections before returning anything.",
      },
      {
        problem:
          "Long answers hit the token limit and came back as invalid JSON.",
        solution:
          "I limited the number of recommendations, handled truncated responses explicitly, and validated types and scores.",
      },
    ],
  },
  {
    slug: "everidog",
    title: "Everidog",
    year: "2024",
    role: "AI Developer",
    category: "llm-application",
    domains: ["product"],
    status: "shipped",
    featured: false,
    shortDescription: "An AI-driven pet nutrition app for dog owners.",
    fullDescription: "Everidog is a pet nutrition app for dog owners, built with AI at its core.",
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
    slug: "byoj",
    title: "BYOJ",
    year: "2024",
    role: "AI Developer",
    category: "llm-application",
    domains: ["product"],
    status: "client-confidential",
    featured: false,
    shortDescription: "An AI-driven generative design product.",
    fullDescription: "BYOJ is a generative design product that uses AI to create designs.",
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

const WORK_ORDER = [
  "quranity",
  "hairlync",
  "jobassist-ai",
  "wondertales",
  "finance-ai",
  "alfred-ai-dating-concierge",
  "eqi30-emotional-intelligence-platform",
  "rise-life-coaching-app",
  "medical-imaging-diagnostics",
  "malaria-diagnosis",
  "frazzl-kid",
  "everidog",
  "byoj",
];

const unordered = [...selectedWork, ...additionalProjects];

/** Running order for the work section, the index page and the case-study pager. */
export const allProjects: Project[] = WORK_ORDER.map((slug) => {
  const project = unordered.find((p) => p.slug === slug);
  if (!project) throw new Error(`Project "${slug}" is missing from the project data.`);
  return project;
});

/**
 * The six projects that lead the work section, in the order they should
 * appear. Kept as an explicit slug list so the running order is a deliberate
 * editorial decision rather than a side effect of array position.
 */
const FEATURED_SLUGS = [
  "quranity",
  "hairlync",
  "jobassist-ai",
  "wondertales",
  "alfred-ai-dating-concierge",
  "frazzl-kid",
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
