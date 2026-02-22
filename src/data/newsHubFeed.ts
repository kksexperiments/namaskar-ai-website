export interface NewsFeedItem {
  id: string;
  publishedAt: string;
  sourceName: string;
  sourceUrl: string;
  titleAs: string;
  titleEn: string;
  summaryAs: string;
  summaryEn: string;
  imageLabelAs: string;
  imageLabelEn: string;
}

export const NEWS_FEED_UPDATE_TEMPLATE = {
  updated_every_days: 2,
  latest_items_limit: 5,
  archive_items_limit: 20,
  items: [
    {
      id: "unique-id",
      publishedAt: "2026-02-17",
      sourceName: "Source Name",
      sourceUrl: "https://example.com/original-story",
      titleAs: "অসমীয়াত শিৰোনাম",
      titleEn: "English headline",
      summaryAs: "অসমীয়াত practical summary with why it matters for your learning and career.",
      summaryEn: "Practical summary in English with impact for learners and careers.",
      imageLabelAs: "ফটো সূচক",
      imageLabelEn: "Photo label",
    },
  ],
};

// How to update this feed:
// - Add newest items near the top (keep `publishedAt` in YYYY-MM-DD from the original source date).
// - `sourceUrl` must be the exact article page (not a homepage), otherwise link validation will fail builds.
// - Keep summaries practical (~80-120 words) with an Assam/Northeast lens.
export const NEWS_FEED_ITEMS: NewsFeedItem[] = [
  {
    id: "elevenlabs-voice-ai-india-growth",
    publishedAt: "2026-02-17",
    sourceName: "Economic Times",
    sourceUrl:
      "https://economictimes.indiatimes.com/tech/technology/india-is-becoming-elevenlabs-key-growth-engine-as-enterprises-scale-voice-ai-ceo-mati-staniszewski/articleshow/128435783.cms/",
    titleAs: "India-ত Voice AI-ৰ গতি: enterprise-এ বৃহৎভাৱে adoption আৰম্ভ কৰিছে",
    titleEn: "Voice AI Momentum in India: Enterprises Are Scaling Fast",
    summaryAs:
      "Voice AI এতিয়া কেৱল demo নহয় — customer support, sales call, onboarding, আৰু content dubbing-ত enterprise-এ বাস্তৱে ব্যৱহাৰ আৰম্ভ কৰিছে। Assam-ৰ startup, edtech, আৰু service business-ৰ বাবে ই actionable: Assamese/English bilingual voice workflow, IVR + WhatsApp assistant, আৰু local customer reply automation। আপুনি শিকিবলৈ আৰম্ভ কৰিব বিচাৰিলে speech-to-text, text-to-speech, script writing prompt, আৰু misuse/deepfake safety rule-এ focus কৰক। practical লক্ষ্য: ৭ দিনত ১টা simple voice assistant flow বান্ধি feedback-ৰ ওপৰত iterate কৰক।",
    summaryEn:
      "Voice AI is moving from demos to real enterprise adoption across customer support, sales calls, onboarding, and content workflows. For Assam’s startups, edtech teams, and service businesses, this is actionable: bilingual Assamese/English voice flows, IVR + WhatsApp assistants, and faster customer-reply automation. If you’re starting now, focus on speech-to-text, text-to-speech, script-writing prompts, and deepfake/misuse safety practices. Practical target: build a simple voice-assistant flow in 7 days and iterate based on feedback.",
    imageLabelAs: "Voice AI",
    imageLabelEn: "Voice AI",
  },
  {
    id: "india-ai-impact-summit-gpu-access-65",
    publishedAt: "2026-01-19",
    sourceName: "Economic Times (Govt)",
    sourceUrl:
      "https://government.economictimes.indiatimes.com/news/digital-india/indiaai-impact-summit-2026-a-game-changer-for-global-ai-development/126666026",
    titleAs: "India AI Impact Summit 2026: ₹৬৫/GPU-ঘণ্টাত compute access — builder-সকলৰ বাবে ডাঙৰ signal",
    titleEn: "India AI Impact Summit 2026: GPU Access at ₹65/Hour",
    summaryAs:
      "AI model train/test কৰিবলৈ compute খৰচ বহু learner-ৰ বাবে barrier। Summit-এ ₹৬৫/GPU-ঘণ্টা ধৰণৰ access-ৰ কথা উঠা মানে entry cost কমাবলৈ ecosystem-এ চাপ দিছে। আপোনাৰ বাবে practical অৰ্থ: heavy training-ৰ আগতে prompt workflow, data cleaning, evaluation, আৰু deployment basic শিকিলে বেছি লাভ হব। Assam-ত startup build কৰিব খোজে, ১টা problem statement বাছনি কৰক, light prototype বান্ধক, আৰু cost estimate লিখা শিকক। compute এটা tool — outcome হ’ল use-case + execution।",
    summaryEn:
      "Compute cost is a real barrier for many builders. Mention of GPU access around ₹65/hour signals a push to reduce entry costs and speed up experimentation. Practical takeaway: before heavy training, master prompt workflows, data cleaning, evaluation, and deployment basics. If you want to build a startup in Assam, pick one clear problem, ship a lightweight prototype, and learn to estimate compute costs. Compute is a tool; the outcome is a real use-case and consistent execution.",
    imageLabelAs: "Summit update",
    imageLabelEn: "Summit update",
  },
  {
    id: "bytedance-seedance2-safeguards",
    publishedAt: "2026-02-16",
    sourceName: "The Verge",
    sourceUrl: "https://www.theverge.com/ai-artificial-intelligence/879644/bytedance-seedance-safeguards-ai-video-copyright-infringement",
    titleAs: "ByteDance-ৰ Seedance 2.0: AI video tool-ত safeguard বঢ়োৱাৰ ঘোষণা",
    titleEn: "ByteDance’s Seedance 2.0: Safeguards for AI Video",
    summaryAs:
      "AI video model-এ editing/creation workflow বহু দ্ৰুত কৰি দিছে, কিন্তু copyright, consent, আৰু misuse risk-ও বাঢ়িছে। Seedance 2.0-ৰ safeguarding আলোচনাই দেখুৱাইছে যে industry-এ “power + responsibility” দুয়ো দিশতে আগবঢ়াইছে। Assam-ৰ creator/brand-সকলৰ বাবে টিপ: নিজস্ব footage/music বাছনি কৰক, AI-generated content স্পষ্টকৈ label কৰক, আৰু sensitive person/child imagery-ত extra সতৰ্ক থাকক। tool শিকাৰ লগে লগে policy, attribution, আৰু verification habit-ও শিকক — long-term trust-ৰ মূল এইটো।",
    summaryEn:
      "AI video models can massively speed up creation and editing, but they also raise risks around copyright, consent, and misuse. The discussion around Seedance 2.0 safeguards is a reminder that capability and responsibility must move together. For creators and brands in Assam: use your own footage/music, clearly label AI-generated content, and be extra careful with sensitive or child-related imagery. Learn policy, attribution, and verification habits alongside the tools to build long-term trust.",
    imageLabelAs: "AI video",
    imageLabelEn: "AI video",
  },
  {
    id: "assam-ndc-iim-guwahati-inauguration",
    publishedAt: "2026-02-14",
    sourceName: "ETInfra",
    sourceUrl:
      "https://infra.economictimes.indiatimes.com/news/urban-infrastructure/pm-modi-inaugurates-iim-guwahati-national-data-centre-in-assam/128342532",
    titleAs: "অসমৰ AI ecosystem-ৰ বাবে infrastructure signal: IIM Guwahati আৰু Northeast-ৰ National Data Centre উদ্বোধন",
    titleEn: "Assam Infrastructure Signal: IIM Guwahati and a National Data Centre for the Northeast",
    summaryAs:
      "Data centre ধৰণৰ infrastructure AI-ready ecosystem-ৰ ভিত্তি। latency কমিলে cloud app, voice AI, analytics, আৰু startup deployment-ত speed বাঢ়ে। Learner-সকলৰ বাবে practical step: cloud basic (storage, compute, security), data pipeline, আৰু simple inference deployment শিকক। এই ধৰণৰ investment-এ local vendor ecosystem, internship, আৰু implementation project-ৰ সম্ভাৱনা বঢ়ায়। আপুনি যদি student বা professional, ১টা small project (chatbot/voice workflow/dashboard) build কৰি portfolio-ত ৰাখক — সুযোগ আহিলে তাত্ক্ষণিকভাৱে fit হ’ব।",
    summaryEn:
      "Infrastructure like data centres is foundational for an AI-ready ecosystem. Lower latency helps cloud apps, voice AI, analytics, and startup deployments move faster. Practical steps for learners: build cloud basics (storage, compute, security), learn data pipelines, and practice simple inference deployment. Investments like this can expand local vendors, internships, and implementation projects. If you’re a student or professional, build a small project (chatbot/voice workflow/dashboard) and keep it portfolio-ready.",
    imageLabelAs: "Data centre",
    imageLabelEn: "Data centre",
  },
  {
    id: "openclaw-creator-joins-openai-agents",
    publishedAt: "2026-02-15",
    sourceName: "TechCrunch",
    sourceUrl:
      "https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/",
    titleAs: "OpenClaw creator OpenAI-ত: personal AI agent-ৰ নতুন wave কেনেকৈ গঢ় লৈছে",
    titleEn: "OpenClaw Creator Joins OpenAI: What the Next Wave of AI Agents Means",
    summaryAs:
      "AI agent মানে কেৱল chat নহয় — tool call, task automation, web research, আৰু multi-step workflow execute কৰিব পৰা system। OpenClaw ধৰণৰ tooling-ৰ creator-সকল big lab-লৈ গৈ থাকিলে agent ecosystem দ্ৰুত mature হয়। Assamese learner-সকলৰ বাবে roadmap: prompt structure + constraints শিকক, tool integration (API/webhooks) বুজক, evaluation checklist বান্ধক, আৰু safety rule set কৰক। ১টা “agent-like” workflow আজিয়ে বান্ধক: WhatsApp reply draft + follow-up reminder + simple report।",
    summaryEn:
      "AI agents go beyond chat: they can call tools, automate tasks, do research, and execute multi-step workflows. When builders behind agent tooling move into major labs, the ecosystem tends to mature faster. Roadmap for Assamese learners: learn prompt structure and constraints, understand tool integrations (APIs/webhooks), build evaluation checklists, and set safety rules. Build one agent-like workflow today: WhatsApp reply draft + follow-up reminder + simple report.",
    imageLabelAs: "AI agents",
    imageLabelEn: "AI agents",
  },
  {
    id: "sarvam-saaras-v3-speech-ai",
    publishedAt: "2026-02-12",
    sourceName: "Business Standard",
    sourceUrl:
      "https://www.business-standard.com/technology/tech-news/saaras-v3-beats-gemini-gpt-4o-on-indian-speech-benchmarks-says-sarvam-ai-126021200384_1.html",
    titleAs: "Sarvam AI-ৰ Saaras V3: speech AI-ত নতুন benchmark — Assamese voice use-case-ৰ সম্ভাৱনা",
    titleEn: "Sarvam AI’s Saaras V3: A Speech-AI Benchmark with Regional Potential",
    summaryAs:
      "Speech AI উন্নত হ’লে voice assistant, transcription, dubbing, call analytics, আৰু education tool-ৰ quality বাঢ়ে। Indian speech AI-ৰ benchmark বাঢ়া মানে Assamese ধৰণৰ ভাষাত voice-first product build কৰাটো আগতকৈ সহজ হ’ব পাৰে। practical step: speech-to-text workflow বুজক, audio dataset কেনেকৈ clean/label কৰা হয় শিকক, আৰু evaluation metric (WER, latency) basic শিকক। teacher/creator হ’লে lecture-to-notes, subtitle, আৰু pronunciation practice-ধৰণৰ prototype বান্ধি শুৰু কৰক।",
    summaryEn:
      "Better speech AI improves voice assistants, transcription, dubbing, call analytics, and education tools. Rising Indian speech-AI benchmarks can make it easier to build Assamese and regional voice-first products. Practical steps: understand speech-to-text workflows, learn how audio datasets are cleaned/labeled, and pick up evaluation basics (WER, latency). If you’re a teacher or creator, prototype lecture-to-notes, subtitles, or pronunciation-practice workflows.",
    imageLabelAs: "Speech AI",
    imageLabelEn: "Speech AI",
  },
  {
    id: "it-rules-ai-content-deepfakes-explainer",
    publishedAt: "2026-02-11",
    sourceName: "Forbes India",
    sourceUrl:
      "https://www.forbesindia.com/article/news/explained-how-indias-new-it-rules-regulate-ai-content-and-deepfakes/2991279/1",
    titleAs: "AI deepfake-ত সুৰক্ষা: IT Rules update-এ আপোনাৰ বাবে কি অৰ্থ",
    titleEn: "AI Deepfakes: What India’s IT Rules Update Means in Practice",
    summaryAs:
      "Deepfake আৰু synthetic content-ৰ risk বাঢ়াৰ লগে লগে rules-ও update হৈছে। Assamese user/creator-সকলৰ বাবে practical rule: share কৰাৰ আগতে source cross-check, reverse search, আৰু official handle confirm কৰক। Creator হ’লে AI-generated content-ত watermark/disclosure যোগ কৰক, আৰু public person/brand-ৰ নাম ব্যৱহাৰত সতৰ্ক থাকক। Learner-সকলৰ বাবে ethics checklist বান্ধক: consent, attribution, আৰু misinformation guardrail। AI শিকাৰ লগতে safety habit গঢ়িলে trust আৰু long-term career দুইটাও বাঢ়ে।",
    summaryEn:
      "As deepfakes and synthetic content risks rise, rules and enforcement expectations are evolving. Practical rule for Assamese users and creators: verify before sharing by cross-checking sources, using reverse search, and confirming official handles. If you’re a creator, add clear disclosures/watermarks for AI-generated content and be careful with public figures and brand names. For learners, build an ethics checklist: consent, attribution, and misinformation guardrails. Safety habits protect trust and long-term career stability.",
    imageLabelAs: "AI safety",
    imageLabelEn: "AI safety",
  },
  {
    id: "assam-fir-ai-generated-video-cm",
    publishedAt: "2026-02-10",
    sourceName: "Times of India",
    sourceUrl:
      "https://timesofindia.indiatimes.com/city/guwahati/assam-cong-lodges-fir-against-ai-made-video-of-cm-sarma/articleshow/128171191.cms",
    titleAs: "অসমত AI-generated video বিতৰ্ক: verification habit কেনেকৈ গঢ়িব",
    titleEn: "Assam Deepfake Controversy: Building Stronger Verification Habits",
    summaryAs:
      "AI-generated photo/video এতিয়া সৰু edit নহয় — বহু সময়ত সম্পূৰ্ণ নতুন clip তৈয়াৰ কৰিব পাৰে। Practical rule: emotion-ভিত্তিক content দেখিলে তৎক্ষণাৎ forward নকৰিব। source link চাওক, অন্য outlet-ত confirm কৰক, আৰু lip-sync/lighting/detail-ত অসংগততা আছে নেকি লক্ষ্য কৰক। Creator হ’লে disclaimer আৰু watermark ব্যৱহাৰ কৰক। AI শিকাৰ ক্ষেত্ৰতো এটা real skill: misinformation detection। daily ৫ মিনিট verify practice কৰিলে digital literacy আৰু safety দুয়ো বাঢ়ে।",
    summaryEn:
      "AI-generated photos/videos are no longer small edits; they can be fully synthetic. Practical rule: don’t forward emotion-driven content instantly. Check the source link, confirm with at least one other outlet, and look for inconsistencies in lip-sync, lighting, and fine details. If you’re a creator, use disclosures and watermarks. For learners, misinformation detection is a real AI-era skill. A 5-minute daily verification habit improves both digital literacy and long-term safety.",
    imageLabelAs: "Verification",
    imageLabelEn: "Verification",
  },
  {
    id: "data-centre-tax-parity",
    publishedAt: "2026-02-07",
    sourceName: "Economic Times",
    sourceUrl:
      "https://economictimes.indiatimes.com/tech/technology/domestic-and-foreign-investors-to-get-equal-tax-benefits-on-data-centres-union-minister-ashwini-vaishnaw/articleshow/128038084.cms",
    titleAs: "Data centre policy clarity: AI infrastructure-ত investment বঢ়াবলৈ কিয় সহায় কৰে",
    titleEn: "Data Centre Policy Clarity: Why It Matters for AI Infrastructure",
    summaryAs:
      "AI deployment-ৰ বহু সমস্যা compute/hosting-ৰ ওপৰত নিৰ্ভৰ কৰে। Data centre-ৰ policy clarity থাকিলে industry-ৰ investment confidence বাঢ়ে, আৰু cloud service stable হয়। Assam-ৰ বাবে benefit: local infra উন্নত হ’লে latency কমে, reliability বাঢ়ে, আৰু business-ৰ cost control সহজ হয়। Learner-সকলৰ বাবে tip: cloud cost, storage lifecycle, security basic (IAM, backups) শিকক — AI product build-ৰ real-world skill এইবোৰ। AI কেৱল model নহয়; production system-ই differentiator।",
    summaryEn:
      "Many AI deployment challenges come down to compute and hosting. Clear policy treatment for data centres improves investment confidence and cloud stability. For Assam, the benefits are practical: better local infrastructure reduces latency, improves reliability, and helps businesses control costs. For learners, focus on real-world skills like cloud cost basics, storage lifecycles, and security (IAM, backups). AI isn’t just a model; production systems are the real differentiator.",
    imageLabelAs: "Infrastructure",
    imageLabelEn: "Infrastructure",
  },
  {
    id: "sarvam-ai-beats-chatgpt-gemini-indic",
    publishedAt: "2026-02-10",
    sourceName: "Business Standard",
    sourceUrl:
      "https://www.business-standard.com/technology/tech-news/sarvam-ai-document-ocr-indic-language-benchmarks-performance-126021001082_1.html",
    titleAs: "Indic LLM race: Indian language performance উন্নতি Assam-ৰ বাবে কিয় গুৰুত্বপূৰ্ণ",
    titleEn: "Indic LLM Race: Why Better Indian-Language AI Matters for Assam",
    summaryAs:
      "Indian language LLM-ৰ quality উন্নত হ’লে Assamese search, summary, customer support, আৰু education tool-ৰ quality বাঢ়ে। Learner-সকলৰ practical lesson: “evaluate before trust” — model output-ৰ accuracy/bias/hallucination check কৰিবলৈ small test-set/ground-truth বান্ধা শিকক। Builder-সকলৰ বাবে: domain-specific FAQ, glossary, আৰু safe prompt template তৈয়াৰ কৰিলে assistant quality বহু বাঢ়ে। Assam-ত local-language product build-ৰ সুযোগ বঢ়াব পাৰে — ১টা small demo বান্ধি user feedback লৈ improve কৰক।",
    summaryEn:
      "Improving Indian-language LLM quality can raise performance for Assamese search, summarization, customer support, and education tools. Practical lesson for learners: evaluate before you trust. Learn to create small test sets and ground truth to check accuracy, bias, and hallucinations. For builders: domain-specific FAQs, glossaries, and safe prompt templates can dramatically improve assistant quality. This can expand local-language product opportunities in Assam, so build a small demo and iterate with real user feedback.",
    imageLabelAs: "Indic LLM",
    imageLabelEn: "Indic LLM",
  },
  {
    id: "yotta-bhashini-sovereign-ai-cloud",
    publishedAt: "2026-02-09",
    sourceName: "Yotta",
    sourceUrl:
      "https://yotta.com/press-releases/yotta-and-bhashini-collaborate-to-enable-sovereign-ai-cloudshowcasing-indias-readiness-for-population-scale-ai/",
    titleAs: "Yotta x BHASHINI: Assamese ধৰণৰ ভাষাৰ AI-ৰ বাবে ecosystem signal",
    titleEn: "Yotta x BHASHINI: An Ecosystem Signal for Local-Language AI",
    summaryAs:
      "BHASHINI ecosystem-এ Indian language translation/speech-ৰ দিশত ecosystem build কৰি আছে। Cloud + language stack শক্তিশালী হ’লে Assamese app-ত translation, voice interface, আৰু citizen-support workflow গঢ়া সহজ হয়। practical step: translation/speech API concept বুজক, domain glossary বান্ধক, আৰু human review loop বজাই ৰাখক। Assam-ত education, public service, আৰু small business-ত multilingual assistant-ৰ demand বাঢ়িব পাৰে — use-case বাছনি কৰি prototype বান্ধিলে আগতীয়াকৈ advantage পাব।",
    summaryEn:
      "The BHASHINI ecosystem supports Indian-language translation and speech capabilities. Stronger cloud + language stacks can make Assamese apps easier to build: better translation, voice interfaces, and citizen-support workflows. Practical steps: understand translation/speech API concepts, build a domain glossary, and keep a human-review loop. Demand for multilingual assistants in education, public services, and small businesses can grow in Assam; a simple prototype now can create an early advantage.",
    imageLabelAs: "Language stack",
    imageLabelEn: "Language stack",
  },
  {
    id: "notion-claude-opus-4-6",
    publishedAt: "2026-02-09",
    sourceName: "Notion",
    sourceUrl: "https://www.notion.com/releases",
    titleAs: "Notion-ত Claude Opus 4.6: note-to-action workflow অধিক সহজ",
    titleEn: "Claude Opus 4.6 in Notion: Faster Note-to-Action Workflows",
    summaryAs:
      "Tool update-সমূহ practical impact আনে: note, doc, task, আৰু AI assistant একেলগে থাকিলে execution speed বাঢ়ে। Assamese learner-সকলৰ বাবে use-case: class note-ৰ পৰা summary + quiz, resume draft, বা business SOP লিখিবলৈ একে system-ত workflow বান্ধক। rule: sensitive data (OTP/bank) কেতিয়াও paste নকৰিব, আৰু AI output-ত final review কৰক। consistency বজাই ৰাখিবলৈ weekly template বান্ধি progress track কৰক — habit + system থাকিলে AI learning দ্ৰুত হয়।",
    summaryEn:
      "Tool updates matter because they improve execution speed: notes, docs, tasks, and an AI assistant in one place reduces friction. For Assamese learners, try workflows like class notes to summaries and quizzes, resume drafting, or business SOP writing. Safety rule: never paste sensitive data (OTP/banking). Always do a final human review of AI output. For consistency, build a weekly template and track progress; habits plus systems make AI learning faster.",
    imageLabelAs: "Workflow tool",
    imageLabelEn: "Workflow tool",
  },
  {
    id: "anthropic-claude-opus-4-6-launch",
    publishedAt: "2026-02-05",
    sourceName: "TechCrunch",
    sourceUrl:
      "https://techcrunch.com/2026/02/05/anthropic-releases-opus-4-6-with-new-agent-teams/",
    titleAs: "Claude Opus 4.6: long-document analysis-ৰ বাবে 1M-token context",
    titleEn: "Claude Opus 4.6: 1M-Token Context for Long-Document Analysis",
    summaryAs:
      "Long PDF/report/policy doc একেলগে analyze কৰিব পাৰিলে learning speed বহু বাঢ়ে। 1M-token context ধৰণৰ capability-এ structured summary, action list, evidence extraction, আৰু cross-reference সহজ কৰিব পাৰে। Assamese learner-সকলৰ practical use-case: APSC/UPSC note-making, course outline তৈয়াৰ, বা business compliance doc review। rule: citation/checklist বজাই ৰাখক — AI summary ভুল হ’ব পাৰে। ১টা “document-to-notes” system বান্ধি weekly practice কৰিলে output আৰু confidence দুয়ো বাঢ়ে।",
    summaryEn:
      "Analyzing long PDFs, reports, and policy documents can dramatically speed up learning and decision-making. A 1M-token context capability enables better structured summaries, action lists, evidence extraction, and cross-references. Practical use-cases for Assamese learners include APSC/UPSC note-making, course outlines, and business compliance reviews. Safety rule: keep a citation/checklist mindset; AI summaries can be wrong. Build a document-to-notes system and practice weekly to improve output and confidence.",
    imageLabelAs: "Long context",
    imageLabelEn: "Long context",
  },
  {
    id: "ringg-ai-series-a-voice",
    publishedAt: "2026-01-21",
    sourceName: "Entrepreneur",
    sourceUrl:
      "https://www.entrepreneur.com/en-in/news-and-trends/voice-ai-startup-ringg-ai-secures-usd-55-mn-series-a/502061",
    titleAs: "Ringg AI-এ Series A তুলিলে: voice AI use-case-সমূহ বাস্তৱ business value দেখুৱাইছে",
    titleEn: "Ringg AI Series A: Voice AI Is Delivering Real Business Value",
    summaryAs:
      "Voice AI startup-সমূহে call automation, support agent assist, আৰু sales workflow-ত practical adoption দেখুৱাইছে। Assam-ৰ coaching/clinic/shop ধৰণৰ service business-ৰ বাবে ই actionable: FAQ call handling, appointment booking, আৰু after-sales follow-up automation। Learner-সকলৰ roadmap: voice UX, script prompt, fallback-to-human flow, আৰু privacy basic। AI assistant-এ call handle কৰিলেও trust build কৰিবলৈ transparency (AI disclosure) আৰু escalation rule দৰকাৰ। ১৪ দিনৰ pilot-এ metrics (time saved, resolution rate) track কৰিলে value স্পষ্ট হয়।",
    summaryEn:
      "Voice AI startups show practical adoption across call automation, support-agent assistance, and sales workflows. For Assam’s service businesses, this is actionable: FAQ call handling, appointment booking, and after-sales follow-up automation. Learner roadmap: voice UX, script prompts, fallback-to-human flows, and privacy basics. Even if an assistant handles calls, trust requires transparency (AI disclosure) and clear escalation rules. A 14-day pilot with metrics (time saved, resolution rate) makes value visible.",
    imageLabelAs: "Startup funding",
    imageLabelEn: "Startup funding",
  },
  {
    id: "bolna-seed-funding-6-3m",
    publishedAt: "2026-01-20",
    sourceName: "Bolna",
    sourceUrl: "https://www.bolna.ai/newsroom/bolna-bags-63-million-seed-funding-led-by-general-catalyst-to-build-indias-voice-ai-platform",
    titleAs: "Bolna-ৰ seed funding: voice agent ecosystem-ত competition বাঢ়িছে",
    titleEn: "Bolna Seed Funding: Competition in Voice Agents Is Heating Up",
    summaryAs:
      "Voice agent-ৰ use-case খুব practical: appointment booking, lead qualification, customer support, আৰু FAQ automation। Funding trend-এ দেখুৱাইছে যে India-ত voice AI real business value deliver কৰিছে। Assamese business-ৰ বাবে opportunity: Assamese + English conversation handle কৰা assistant, local product catalogue QA, আৰু after-sales follow-up automation। Learner-সকলৰ focus: conversation tree, guardrails (কি answer নকৰে), fallback-to-human, আৰু logs/analytics। লক্ষ্য: “human-like” নহয়, “useful + safe” assistant বান্ধা।",
    summaryEn:
      "Voice-agent use-cases are very practical: appointment booking, lead qualification, customer support, and FAQ automation. Funding trends suggest voice AI is delivering real business value in India. For Assamese businesses: assistants that handle Assamese + English conversations, QA over a product catalogue, and after-sales follow-ups. Learner focus: conversation trees, guardrails, fallback-to-human flows, and logs/analytics. Goal: not “human-like”, but “useful and safe”.",
    imageLabelAs: "Voice agents",
    imageLabelEn: "Voice agents",
  },
  {
    id: "arrowhead-voice-ai-funding",
    publishedAt: "2026-01-07",
    sourceName: "Outlook Business",
    sourceUrl:
      "https://www.outlookbusiness.com/start-up/investors/voice-ai-start-up-arrowhead-raises-3m-led-by-stellaris-to-automate-bfsi-sales",
    titleAs: "Arrowhead funding: voice AI startup-লৈ investor আগ্ৰহ বাঢ়িছে",
    titleEn: "Arrowhead Funding: Growing Investor Interest in Voice AI",
    summaryAs:
      "Voice AI-ত funding মানে ecosystem-এ clear demand দেখিছে: call automation, voice assistant, agent support, আৰু multilingual customer experience। Assamese builder-সকলৰ বাবে insight: language + domain knowledge combine কৰিলে differentiated product গঢ়া যায়। Example: healthcare appointment assistant, coaching enquiry bot, tourism helpdesk, বা local helpline support। Learner-সকলৰ roadmap: intent classification, ASR/TTS basic, conversation design, আৰু privacy/safety। user-এ time save আৰু clarity পালে adoption হয় — “AI” label-ৰ বাবে নহয়।",
    summaryEn:
      "Funding into voice AI signals clear demand for call automation, assistants, agent support, and multilingual customer experiences. For Assamese builders, combining language and domain knowledge can create differentiated products: healthcare appointment assistants, coaching enquiry bots, tourism helpdesks, or local helpline support. Learner roadmap: intent classification, ASR/TTS basics, conversation design, and privacy/safety. Users adopt when you save time and add clarity, not because the product is labeled “AI”.",
    imageLabelAs: "Funding",
    imageLabelEn: "Funding",
  },
];
