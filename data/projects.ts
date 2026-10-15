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
    year: "2025-26",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "prototype",
    featured: true,
    shortDescription:
      "An AI dating concierge that plans dates, finds restaurants, gifts and trips, and gives relationship advice by text or voice.",
    fullDescription:
      "Alfred is an AI dating concierge. Through natural text or voice conversations it helps users plan dates, discover restaurants and activities, find gifts, get relationship and conversation advice, analyse budgets and plan travel. I built the FastAPI service that powers its conversational intelligence.",
    challenge:
      "A dating concierge has to follow a conversation. People give the details of a request across several messages, and the right action depends on putting them together.",
    approach:
      "I combined LLM-based intent classification with session memory, structured intent schemas and slot extraction for location, budget, dates and destinations, then routed each request to the right AI workflow.",
    outcome: "A working prototype with test coverage, built to be integrated by the product's backend team.",
    technologies: ["Python", "FastAPI", "OpenAI API", "Anthropic API", "SerpAPI", "Pydantic"],
    image: "/images/projects/alfred-ai-dating-concierge.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2025-26",
    deliverables: "FastAPI AI service · Test suite",
    domainLabel: "Consumer dating",
    architecture: [
      {
        title: "Intent detection and routing",
        description:
          "Works out what the user wants, even when the details arrive over several messages, and sends it to the right workflow.",
      },
      {
        title: "LLM layer",
        description:
          "OpenAI and Anthropic behind one interface, with prompts for chat, recommendations, coaching, gifts, travel and date planning.",
      },
      {
        title: "Live search",
        description:
          "SerpAPI looks up real restaurants, activities, hotels, flights and products so advice is current.",
      },
      {
        title: "Structured answers",
        description:
          "Replies are generated as JSON against Pydantic schemas, so the app always gets predictable data.",
      },
    ],
    decisions: [
      {
        title: "Memory plus slots",
        description:
          "Session memory and slot extraction keep a location, budget or date from an earlier message, so users never repeat themselves.",
      },
      {
        title: "Fail gracefully",
        description:
          "When an AI or search service fails, Alfred falls back to a sensible answer instead of an error.",
      },
      {
        title: "Secure by default",
        description: "Communication with the service is protected with API-key authentication.",
      },
    ],
    stackGroups: [
      { label: "Service", items: ["Python", "FastAPI", "Pydantic", "HTTPX", "Docker"] },
      { label: "AI and search", items: ["OpenAI API", "Anthropic API", "SerpAPI"] },
      { label: "Quality", items: ["Pytest", "pytest-asyncio"] },
    ],
    features: [
      "Plans dates and finds restaurants and activities",
      "Finds gifts and plans travel with real hotel and flight searches",
      "Relationship and conversation advice",
      "Budget and receipt analysis",
      "Text and voice input",
      "Multi-turn memory",
    ],
    challenges: [
      {
        problem:
          "Users give the details of a request across several messages, and the right action depends on all of them.",
        solution:
          "LLM intent classification, session memory, structured intent schemas, and slot extraction for location, budget, dates and destinations, routed to the matching workflow.",
      },
    ],
  },
  {
    slug: "eqi30-emotional-intelligence-platform",
    title: "EQi30",
    year: "2025",
    role: "AI Developer",
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
    challenges: [
      {
        problem:
          "Subjective answers about emotions had to become consistent, meaningful insights.",
        solution:
          "A structured scoring pipeline, outputs checked against predefined criteria, handling for ambiguous responses, and refinement through repeated testing.",
      },
    ],
  },
  {
    slug: "rise-life-coaching-app",
    title: "Rise",
    year: "2025-26",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "prototype",
    featured: true,
    shortDescription:
      "The AI layer for a mobile coaching app: it turns your mood, energy and goals into coaching cards and streams its replies.",
    fullDescription:
      "Rise is a mobile coaching app. Its AI layer turns a user's mood, energy, goals and context into actionable coaching cards: focus tasks, a day plan, interventions, a recap, a music vibe and reward progress. It can also detect mood, energy and personality from plain text. It exposes 11 FastAPI endpoints around a five-personality tone system, and coach replies stream to the app over server-sent events.",
    challenge:
      "LLM output has to be reliable and safe for a mobile app to render, whichever provider produced it.",
    approach:
      "I built the whole AI microservice: prompt orchestration, a JSON schema for each endpoint, memory extraction and retrieval, one /ai/chat endpoint that orchestrates the cards, streaming coach replies, and token and cost tracking.",
    outcome: "A working prototype: 11 endpoints, five coaching personalities, and streamed replies.",
    technologies: ["Python", "FastAPI", "Server-Sent Events", "JSON schema"],
    image: "/images/projects/rise-life-coaching-app.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2025-26",
    deliverables: "AI microservice · 11 endpoints",
    domainLabel: "Coaching",
    decisions: [
      {
        title: "A schema for every endpoint",
        description:
          "Each endpoint has a strict JSON contract in its prompt, so the app can render what comes back.",
      },
      {
        title: "Any provider, one gateway",
        description:
          "A provider-agnostic gateway covers Anthropic, OpenAI, Google, Groq, Mistral and Together, so the model can change without touching the app.",
      },
      {
        title: "Know what it costs",
        description: "Token and cost tracking is normalised across providers.",
      },
    ],
    features: [
      "Coaching cards: focus tasks, day plan, interventions, recap, music vibe, reward progress",
      "Mood, energy and personality detected from plain text",
      "Five coaching personalities",
      "Streamed coach replies",
      "Memory extraction and retrieval",
      "One chat endpoint that builds the cards",
    ],
    stackGroups: [
      { label: "Service", items: ["Python", "FastAPI", "Server-Sent Events"] },
      { label: "AI", items: ["Anthropic", "OpenAI", "Google", "Groq", "Mistral", "Together"] },
    ],
    challenges: [
      {
        problem:
          "LLM output was not reliable enough for the app's front end, and it differed between providers.",
        solution:
          "Strict schema-return prompts, JSON recovery and parsing with explicit parse errors, and calls wrapped in retries with backoff and normalised usage tracking.",
      },
    ],
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
    architecture: [
      {
        title: "A question comes in",
        description:
          "The user asks about spending, a budget or cash flow in plain language, through a secure service.",
      },
      {
        title: "Intent detection",
        description: "The model works out what is being asked and which figures it needs.",
      },
      {
        title: "Deterministic calculations",
        description:
          "Code calculates the numbers from the client's live financial database. The model never does the arithmetic.",
      },
      {
        title: "The answer is written",
        description: "The OpenAI-based chat layer turns the calculated result into a clear reply.",
      },
    ],
    decisions: [
      {
        title: "Numbers from code, words from the model",
        description:
          "A language model should not be doing arithmetic on someone's money. Calculations are deterministic, so a spending or cash-flow answer can be checked.",
      },
      {
        title: "Work on the live data",
        description:
          "The assistant reads the client's financial database directly, so answers reflect the current state and not a stale copy.",
      },
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
    image: "/images/projects/quranity.jpg",
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
    year: "2025-26",
    role: "AI Developer",
    category: "education",
    domains: ["llm", "education"],
    status: "client-confidential",
    featured: false,
    shortDescription:
      "A learning platform for children where AI writes dyslexia-friendly questions, hints and explanations for each child's grade and topic.",
    fullDescription:
      "Frazzl uses AI to generate personalised, dyslexia-friendly learning questions for children from their grade level, subject and syllabus topic. Each question comes at a set difficulty, with step-by-step explanations and progressive hints so a child can learn independently. Parents can monitor progress, generate question sets and support their child's learning. I also guided the first production deployment of the backend to a VPS.",
    challenge:
      "AI-generated questions have to be accurate, age-appropriate, dyslexia-friendly and different every time.",
    approach:
      "I worked on the question-generation system and how it joins the platform: a child's grade and topic go to the AI, a structured question set comes back, is validated, and is shown with hints and explanations. I also worked on the parent and child accounts and the learning experience.",
    outcome: null,
    technologies: ["Python", "Django", "FastAPI", "OpenAI API", "Gemini API", "PostgreSQL"],
    image: "/images/projects/frazzl-kid.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    timeline: "2025-26",
    domainLabel: "Children's education",
    decisions: [
      {
        title: "Validate everything the AI writes",
        description:
          "Pydantic schemas check each question set, so a malformed answer never reaches a child.",
      },
      {
        title: "Fixed difficulty levels",
        description:
          "Difficulty is set by the system, not left to the model, so a topic always has easy, medium and hard questions.",
      },
      {
        title: "More than one AI provider",
        description:
          "Retry and fallback handling across OpenAI and Gemini keeps question generation available.",
      },
    ],
    features: [
      "Questions generated for a child's grade, subject and syllabus topic",
      "Dyslexia-friendly wording",
      "Different difficulty levels",
      "Step-by-step explanations and progressive hints",
      "Parent and child accounts, with progress for parents",
    ],
    stackGroups: [
      { label: "AI", items: ["OpenAI API", "Gemini API", "Pydantic"] },
      { label: "Platform", items: ["Python", "Django", "Django REST Framework", "FastAPI", "PostgreSQL", "JavaScript", "Docker"] },
    ],
    challenges: [
      {
        problem:
          "AI-generated questions have to be accurate, age-appropriate, dyslexia-friendly and different each time.",
        solution:
          "Structured prompts, Pydantic schema validation, fixed difficulty levels, randomised generation, retry and fallback across AI providers, and carefully designed hints and explanations.",
      },
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
    image: "/images/projects/hairlync-full.jpg",
    frame: "browser",
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
    slug: "certiflow-ai",
    title: "CertiFlow AI",
    year: "2026",
    role: "AI Developer & Full-Stack",
    category: "llm-application",
    domains: ["llm", "education", "product"],
    status: "client-confidential",
    featured: false,
    shortDescription:
      "A document-automation platform that generates certification-ready candidate files for Proforma Institut and Proskills Institut.",
    fullDescription:
      "CertiFlow AI is a document-automation platform for two training institutes, Proforma Institut and Proskills Institut. It generates the candidate files needed for the RS6485, RS7200, RS7311 and RS7344 certifications. Claude writes and structures the candidate-specific content that runs through several documents, while rules in code handle scoring consistency and pass or fail readiness.",
    challenge:
      "Every document has to tell the same story about a candidate, with the same grades and the same final summary, and a long generation chain had to run within serverless limits.",
    approach:
      "I built the whole generation workflow: a dashboard and API, the AI generation chain, an export pipeline to Word, Excel and PowerPoint, the scoring and readiness logic, the database and storage, and the web and Windows desktop builds.",
    outcome:
      "A working, production-oriented system with an active deployment and a Windows desktop build.",
    technologies: ["Next.js", "TypeScript", "Anthropic SDK", "PostgreSQL", "Electron"],
    image: "/images/projects/certiflow-ai.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2026",
    deliverables: "Generation pipeline · Document exports · Desktop app",
    domainLabel: "Training and certification",
    architecture: [
      {
        title: "Dashboard and API",
        description: "A Next.js app where staff set up candidates and start a generation.",
      },
      {
        title: "AI generation chain",
        description:
          "Claude writes the candidate-specific content in phases that can resume if a run is cut short.",
      },
      {
        title: "Scoring and readiness",
        description:
          "Strict rules in code, not the model, decide scores and whether a candidate is ready.",
      },
      {
        title: "Export pipeline",
        description:
          "The same candidate record is turned into Word, Excel and PowerPoint documents and stored.",
      },
    ],
    decisions: [
      {
        title: "Scoring in code, not in the AI",
        description:
          "A grade has to be the same every time and explainable to an assessor, so rules in code decide it and the model only writes.",
      },
      {
        title: "One source of truth per candidate",
        description:
          "All correlated content comes from one record, so the story, the grades and the summary match in every document.",
      },
      {
        title: "Generation in resumable phases",
        description:
          "Long chains are split into phases that save their progress, which works within serverless time limits.",
      },
    ],
    stackGroups: [
      { label: "AI", items: ["Anthropic SDK"] },
      { label: "App", items: ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"] },
      { label: "Data and files", items: ["PostgreSQL (Neon)", "pg", "Vercel Blob", "docx", "exceljs", "pptxgenjs"] },
      { label: "Delivery", items: ["Docker", "GitHub Actions", "Electron"] },
    ],
    features: [
      "Candidate-specific content written by Claude",
      "Word, Excel and PowerPoint export from one record",
      "Scoring and pass or fail readiness rules in code",
      "Resumable, phase-based generation",
      "Automated audit and verification scripts before delivery",
      "A web dashboard and a Windows desktop build",
    ],
    challenges: [
      {
        problem:
          "Candidate story, grading and final summary had to match across every document, and long generation chains hit serverless limits.",
        solution:
          "A phase-based resumable pipeline, a single source of truth for correlated content, strict rule-based scoring in code instead of the AI, and automated audit scripts that verify the files before delivery.",
      },
    ],
  },
  {
    slug: "nibbl-ai",
    title: "Nibbl AI",
    year: "2026",
    role: "AI Developer",
    category: "computer-vision",
    domains: ["computer-vision", "llm", "product"],
    status: "prototype",
    featured: false,
    shortDescription:
      "AI receipt intelligence for a cashback platform: it reads receipt photos and returns validated, structured data, and sends anything doubtful for review.",
    fullDescription:
      "Nibbl AI is a platform where brands fund rebate and review campaigns and shoppers earn rewards by uploading receipts. I built its AI receipt intelligence service. It turns a receipt image into structured, validated JSON that the backend can use for cashback and rebate processing: the merchant, items with quantities, prices, discounts and taxes, dates, currency, totals, payment method and masked card details. The service also writes AI-assisted product reviews and suggests questions for reviewers.",
    challenge:
      "A basic OCR system can read text, but a real one has to decide whether what it read makes sense, on receipts that are blurry, inconsistent, multilingual and financially ambiguous.",
    approach:
      "I built a layered pipeline: OCR, normalisation, rule-based extraction, validation, confidence scoring, provenance, and an optional LLM fallback for fields the rules cannot settle.",
    outcome:
      "The receipt pipeline is built and covered by 533 automated tests, which pass in 13.46 seconds. It runs as a containerised FastAPI service with a versioned API contract and OpenAPI documentation.",
    technologies: ["Python", "FastAPI", "Tesseract", "PaddleOCR", "Docker"],
    image: "/images/projects/nibbl-ai.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    timeline: "2026",
    deliverables: "Receipt extraction API · Review generation",
    domainLabel: "Cashback and rebates",
    architecture: [
      {
        title: "Quality check and cleanup",
        description:
          "Measures blur, brightness, contrast and skew, and preprocesses poor receipts before reading them.",
      },
      {
        title: "OCR",
        description:
          "Several engines behind one interface: Tesseract, PaddleOCR, PaddleOCR-VL and OpenAI-compatible vision models.",
      },
      {
        title: "Extraction",
        description:
          "Rules extract the merchant, items, dates, currency, totals and payment method first. An LLM is only a fallback for ambiguous fields, and it is off by default.",
      },
      {
        title: "Validation and review routing",
        description:
          "Subtotal, tax, payment and total are cross-checked, every field gets a confidence score, and doubtful receipts go to manual review.",
      },
    ],
    decisions: [
      {
        title: "Rules first, model second",
        description:
          "The common path is deterministic, so it needs no model, costs nothing per receipt and cannot hallucinate. The LLM only steps in for ambiguous or low-confidence fields.",
      },
      {
        title: "Never guess",
        description:
          "A date like 08/09/26 is ambiguous, so it is not guessed. Anything missing stays null instead of being invented, and low-confidence results go to a person.",
      },
      {
        title: "Redact what is sensitive",
        description: "Card-like numbers are detected and redacted before the data goes anywhere.",
      },
    ],
    stackGroups: [
      { label: "Reading receipts", items: ["Tesseract", "PaddleOCR", "PaddleOCR-VL", "OpenAI-compatible vision"] },
      { label: "Service", items: ["Python", "FastAPI", "Docker", "OpenAPI"] },
    ],
    features: [
      "Receipt photos turned into structured, validated JSON",
      "Image quality analysis for blur, brightness, contrast and skew",
      "Items, quantities, prices, discounts, taxes, dates, currency and totals",
      "Payment method and masked card details, with card numbers redacted",
      "Checks that subtotal, tax, payment and total agree",
      "A confidence score for every field, with automatic manual-review routing",
      "AI-assisted product review generation and reviewer-question suggestions",
      "Health checks, metrics and a versioned API contract",
    ],
    challenges: [
      {
        problem:
          "Receipts are blurry, inconsistent, multilingual and financially ambiguous, and OCR on its own cannot tell whether the result makes sense.",
        solution:
          "A layered pipeline: OCR, normalisation, rule-based extraction, validation, confidence scoring, provenance, and an optional LLM fallback.",
      },
      {
        problem:
          "OCR confuses 0, O, 1 and I, totals may not match the items and tax, and a wrong guess would pay out the wrong cashback.",
        solution:
          "Financial validation catches the mismatches, unclear fields stay null, and low-confidence results are routed to manual review instead of being accepted.",
      },
    ],
    stories: [
      {
        label: "Where it stands",
        text: "The receipt pipeline is implemented and tested, and it runs as an API in a container built for deployment on the project's AWS setup. Review generation and question suggestions are built. Two endpoints are still planned and not finished: the adaptive conversational question endpoint and the AI review summary.",
      },
    ],
  },
  {
    slug: "everidog",
    title: "Everidog",
    year: "2026",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "shipped",
    featured: false,
    shortDescription:
      "An AI pet nutrition app that recommends dog food from your dog's profile and finds real products to buy.",
    fullDescription:
      "Everidog is a pet nutrition app for dog owners. You describe your dog: breed, age, activity, allergies and preferences. The AI builds a nutrition plan, then the backend finds real product pages, ranks them and returns each with its price and image. Products that contain an allergen are filtered out.",
    challenge:
      "The data coming back was noisy: AI replies with broken JSON, and search results that were not product pages or were duplicates of each other.",
    approach:
      "I built the FastAPI recommendation backend: profile validation, orchestration across OpenAI, Claude and Gemini, a merge of search results with the product database, allergy-safe filtering, deduplication and ranking, and response caching.",
    outcome: "Live at everidog.com, with personalised food recommendations from a dog's profile.",
    technologies: ["Python", "FastAPI", "Pydantic", "OpenAI API", "Anthropic API", "Gemini API"],
    image: "/images/projects/everidog.svg",
    gallery: [],
    links: { external: "https://everidog.com/", repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2026",
    deliverables: "Recommendation backend",
    domainLabel: "Pet nutrition",
    decisions: [
      {
        title: "Hard allergy filters",
        description:
          "Allergens are removed by rule after the AI answers, so a model slip can never put an unsafe product on screen.",
      },
      {
        title: "Several AI providers behind one layer",
        description:
          "OpenAI, Claude and Gemini sit behind one orchestration layer, so a provider can fail or change without breaking recommendations.",
      },
    ],
    features: [
      "Personalised food recommendations from a dog's profile",
      "AI nutrition planning",
      "Real product pages with price and image",
      "Allergy-safe filtering",
      "Deduplication and ranking of results",
      "Response caching",
    ],
    stackGroups: [
      { label: "AI", items: ["OpenAI API", "Anthropic API", "Gemini API"] },
      { label: "Backend", items: ["Python", "FastAPI", "Pydantic", "HTTPX", "Uvicorn"] },
      { label: "Search", items: ["SerpAPI", "Serper"] },
      { label: "Quality", items: ["Pytest"] },
    ],
    challenges: [
      {
        problem:
          "AI replies came back with inconsistent JSON, and search results mixed in non-product pages and duplicates.",
        solution:
          "Strict JSON parsing with a fallback extractor, product-page URL filtering, domain-aware deduplication, and a fallback query and enrichment flow.",
      },
    ],
  },
  {
    slug: "byoj",
    title: "BYOJ",
    year: "2026",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "client-confidential",
    featured: false,
    shortDescription:
      "An AI jewelry design product: it generates designs from your taste, suggests what to make them from in gold, and has a consultant chatbot.",
    fullDescription:
      "BYOJ generates jewelry designs based on a user's taste and suggests what each design could be made from in gold. It also includes a consultant chatbot that helps users decide, researches options with them, and guides them through making an AI-generated jewelry design. I handled the whole AI side.",
    challenge: null,
    approach:
      "GPT powers both the design generation and the consultant chatbot, built as a Python service.",
    outcome: null,
    technologies: ["Python", "OpenAI GPT"],
    image: "/images/projects/byoj.svg",
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2026",
    deliverables: "AI design generation · Consultant chatbot",
    domainLabel: "Jewelry design",
    features: [
      "Jewelry designs generated from the user's taste",
      "Suggestions for what each design can be made from in gold",
      "A consultant chatbot that helps decide and does the research",
    ],
    stackGroups: [{ label: "AI", items: ["Python", "OpenAI GPT"] }],
    todo: "Add the hardest problem and a real number if remembered.",
  },
];

const WORK_ORDER = [
  "quranity",
  "hairlync",
  "certiflow-ai",
  "nibbl-ai",
  "jobassist-ai",
  "wondertales",
  "finance-ai",
  "alfred-ai-dating-concierge",
  "eqi30-emotional-intelligence-platform",
  "rise-life-coaching-app",
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
