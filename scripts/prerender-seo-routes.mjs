import { promises as fs } from "node:fs";
import path from "node:path";

const DEFAULT_PROD_SITE_URL = "https://www.namaskarai.in";
const DEFAULT_LOCAL_SITE_URL = "http://localhost:5173";

const EN_ROUTES = [
  "/",
  "/prompt-packs",
  "/ai-tools",
  "/learning-roadmaps",
  "/news",
  "/ai-in-assamese",
  "/chatgpt-in-assamese",
  "/ai-course-in-assamese",
  "/faq",
  "/learn-ai-in-assamese-30-days",
  "/best-ai-course-for-assamese-speakers",
  "/learning-assamese-with-ai",
  "/assamese-llm-chatbot-guide",
  "/about",
  "/contact",
  "/editorial-policy",
  "/press-collaboration",
  "/privacy",
  "/terms",
];

const ROUTE_SEO_COPY = {
  "/": {
    en: {
      title: "Namaskar AI | Learn AI in Assamese",
      description:
        "Learn AI in Assamese with practical prompt packs, AI tools, roadmaps, and community-first guidance for students, professionals, parents, and small businesses.",
    },
    as: {
      title: "নমস্কাৰ AI | অসমীয়াত AI শিকক",
      description:
        "অসমীয়া ভাষাত আপুনি practical prompt pack, AI tool, learning roadmap আৰু community guidance-ৰ সহায়ত সহজে AI শিকিব পাৰে।",
    },
  },
  "/prompt-packs": {
    en: {
      title: "AI Prompt Packs | Namaskar AI",
      description:
        "Copy-ready AI prompt packs for career, study, business, and family workflows in Assamese and English.",
    },
    as: {
      title: "AI প্ৰম্প্ট পেক | নমস্কাৰ AI",
      description:
        "কৰ্মজীৱন, পঢ়া-শুনা, ব্যৱসায় আৰু পৰিয়ালৰ বাবে অসমীয়া-ইংৰাজী copy-ready AI prompt pack একেলগে পাওক।",
    },
  },
  "/ai-tools": {
    en: {
      title: "AI Tools Library | Namaskar AI",
      description:
        "Explore practical AI tools with filters by category, pricing, and skill level for Assam-focused learners and professionals.",
    },
    as: {
      title: "AI টুল লাইব্ৰেৰী | নমস্কাৰ AI",
      description:
        "শ্ৰেণী, মূল্য আৰু skill level অনুসৰি Assamese-first ব্যৱহাৰৰ বাবে practical AI tool বাছনি কৰক।",
    },
  },
  "/learning-roadmaps": {
    en: {
      title: "Learning Roadmaps | Namaskar AI",
      description:
        "Coming-soon Assamese AI roadmap hub: first course goes live March 15. Join waitlist and get YouTube plus email updates.",
    },
    as: {
      title: "শিকাৰ ৰোডমেপ | নমস্কাৰ AI",
      description:
        "অসমীয়াত AI ৰ পূৰ্ণ যাত্ৰা। প্ৰথম ক’ৰ্ছ ১৫ মাৰ্চত লাইভ। waitlist-ত যোগ দি YouTube আৰু ইমেইল আপডেট লওক।",
    },
  },
  "/news": {
    en: {
      title: "AI News and Guides | Namaskar AI",
      description:
        "Live AI news hub updated every 2 days with Assam, India, and global updates plus practical career explainers.",
    },
    as: {
      title: "AI খবৰ আৰু গাইড | নমস্কাৰ AI",
      description:
        "প্ৰতি ২ দিনত Assam, India আৰু global AI আপডেট। অসমীয়া শিক্ষাৰ্থীৰ বাবে সহজ explainers আৰু practical guide।",
    },
  },
  "/ai-in-assamese": {
    en: {
      title: "AI in Assamese | Namaskar AI",
      description:
        "Beginner guide to learning AI in Assamese with first steps, core terms, and practical next actions.",
    },
    as: {
      title: "অসমীয়াত AI | নমস্কাৰ AI",
      description:
        "অসমীয়া ভাষাত AI শিকাৰ beginner guide: আৰম্ভণিৰ ধাপ, মূল শব্দ আৰু practical পৰৱৰ্তী পদক্ষেপ।",
    },
  },
  "/chatgpt-in-assamese": {
    en: {
      title: "ChatGPT in Assamese | Namaskar AI",
      description:
        "Practical guide to using ChatGPT in Assamese, including setup, daily use-cases, and safe usage rules.",
    },
    as: {
      title: "অসমীয়াত ChatGPT | নমস্কাৰ AI",
      description:
        "অসমীয়াত ChatGPT setup, দৈনিক practical use-case আৰু safe usage নিয়মৰ স্পষ্ট গাইড।",
    },
  },
  "/ai-course-in-assamese": {
    en: {
      title: "AI Course in Assamese | Namaskar AI",
      description:
        "Practical Assamese-first AI course with curriculum, learning tracks, project outcomes, and enrollment updates.",
    },
    as: {
      title: "অসমীয়াত AI Course | নমস্কাৰ AI",
      description:
        "curriculum, learning track, project outcome আৰু enrollment update সহ Assamese-first AI course পৃষ্ঠা।",
    },
  },
  "/faq": {
    en: {
      title: "AI FAQ | Namaskar AI",
      description:
        "Frequently asked questions about learning AI in Assamese, using ChatGPT, and practical AI use-cases for Assam.",
    },
    as: {
      title: "AI FAQ | নমস্কাৰ AI",
      description:
        "অসমীয়া আৰু ইংৰাজীত AI শিকাৰ সাধাৰণ প্ৰশ্ন, ChatGPT ব্যৱহাৰ, আৰু Assam-specific practical উত্তৰ।",
    },
  },
  "/learn-ai-in-assamese-30-days": {
    en: {
      title: "Learn AI in Assamese in 30 Days | Namaskar AI",
      description:
        "A practical 30-day AI plan for Assamese speakers with daily workflow, weekly milestones, and course/tool path comparison.",
    },
    as: {
      title: "অসমীয়াত ৩০ দিনত AI শিকক | নমস্কাৰ AI",
      description:
        "Assamese speaker-সকলৰ বাবে ৩০ দিনৰ practical AI plan: দৈনিক routine, weekly milestone আৰু learning path তুলনা।",
    },
  },
  "/best-ai-course-for-assamese-speakers": {
    en: {
      title: "Best AI Course for Assamese Speakers | Namaskar AI",
      description:
        "Free vs paid vs cohort comparison guide to choose the best AI course for Assamese learners.",
    },
    as: {
      title: "অসমীয়া শিক্ষাৰ্থীৰ বাবে Best AI Course | নমস্কাৰ AI",
      description:
        "free vs paid vs cohort তুলনাৰ সহায়ত Assamese learner-সকলৰ বাবে best AI course বাছনি কৰক।",
    },
  },
  "/learning-assamese-with-ai": {
    en: {
      title: "Learning Assamese with AI | Namaskar AI",
      description:
        "Use AI to learn Assamese with practical vocabulary, speaking, grammar-correction, and safe daily routines.",
    },
    as: {
      title: "AI-ৰ সহায়ত অসমীয়া শিকক | নমস্কাৰ AI",
      description:
        "vocabulary, speaking, grammar correction আৰু safe routine-এ AI-ৰ সহায়ত অসমীয়া শিকাৰ practical guide।",
    },
  },
  "/assamese-llm-chatbot-guide": {
    en: {
      title: "Assamese LLM and Chatbot Guide | Namaskar AI",
      description:
        "Practical implementation guide for Assamese chatbot/LLM use-cases in Assam with data, safety, and workflow steps.",
    },
    as: {
      title: "Assamese LLM আৰু Chatbot Guide | নমস্কাৰ AI",
      description:
        "Assam-specific chatbot/LLM implementation-ৰ বাবে data, safety আৰু workflow step-ৰ practical guide।",
    },
  },
  "/about": {
    en: {
      title: "About Us | Namaskar AI",
      description:
        "Mission, principles, and Assam-focused practical AI education approach of Namaskar AI.",
    },
    as: {
      title: "আমাৰ বিষয়ে | নমস্কাৰ AI",
      description:
        "Namaskar AI-ৰ mission, principle আৰু Assam-focused practical AI education approach।",
    },
  },
  "/contact": {
    en: {
      title: "Contact | Namaskar AI",
      description:
        "Contact Namaskar AI for support, collaboration, media, and course-related queries.",
    },
    as: {
      title: "যোগাযোগ | নমস্কাৰ AI",
      description:
        "support, collaboration, media আৰু course query-ৰ বাবে Namaskar AI contact channel।",
    },
  },
  "/editorial-policy": {
    en: {
      title: "Editorial Policy | Namaskar AI",
      description:
        "Source standards, fact-check workflow, correction policy, and update cadence followed by Namaskar AI.",
    },
    as: {
      title: "Editorial Policy | নমস্কাৰ AI",
      description:
        "Namaskar AI-ৰ source standards, fact-check workflow, correction policy আৰু update cadence।",
    },
  },
  "/press-collaboration": {
    en: {
      title: "Press & Collaboration | Namaskar AI",
      description:
        "Media and collaboration page for Assamese AI education topics: quotes, interviews, guest posts, and partnership workflows.",
    },
    as: {
      title: "Press & Collaboration | নমস্কাৰ AI",
      description:
        "Assamese AI education বিষয়ত media quote, interview, guest post আৰু collaboration-ৰ তথ্য।",
    },
  },
  "/privacy": {
    en: {
      title: "Privacy Policy | Namaskar AI",
      description:
        "Read how Namaskar AI collects, uses, and protects your data across learning resources and newsletter updates.",
    },
    as: {
      title: "গোপনীয়তা নীতি | নমস্কাৰ AI",
      description:
        "নমস্কাৰ AI-এ আপোনাৰ তথ্য কেনেকৈ সংগ্ৰহ, ব্যৱহাৰ আৰু সুৰক্ষিত ৰাখে তাৰ স্পষ্ট গোপনীয়তা নীতি পঢ়ক।",
    },
  },
  "/terms": {
    en: {
      title: "Terms of Service | Namaskar AI",
      description:
        "Review platform usage rules, responsibilities, and terms for using Namaskar AI resources.",
    },
    as: {
      title: "সেৱাৰ শর্তসমূহ | নমস্কাৰ AI",
      description:
        "নমস্কাৰ AI সম্পদ ব্যৱহাৰৰ নিয়ম, দায়বদ্ধতা আৰু প্লেটফৰ্ম শর্তসমূহ ইয়াত চাওক।",
    },
  },
};

const ROUTE_STATIC_HTML = {
  "/": {
    en: `
<main>
  <article>
    <h1>Learn AI in Assamese with practical daily workflows</h1>
    <p>Namaskar AI helps Assamese speakers learn and use AI for study, careers, business, and family use-cases with step-by-step guidance.</p>
    <h2>Start in 10 minutes</h2>
    <ol>
      <li>Choose one goal: study, career, business, or family.</li>
      <li>Open one prompt from Prompt Packs and run it.</li>
      <li>Refine output with your own context and repeat once.</li>
    </ol>
    <h2>Key pages</h2>
    <ul>
      <li><a href="/ai-in-assamese">AI in Assamese beginner guide</a></li>
      <li><a href="/chatgpt-in-assamese">ChatGPT in Assamese practical guide</a></li>
      <li><a href="/ai-course-in-assamese">AI Course in Assamese</a></li>
      <li><a href="/faq">AI FAQ</a></li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>অসমীয়াত practical AI শিকক</h1>
    <p>Namaskar AI-এ Assamese speaker-সকলক study, career, business আৰু family use-case-ৰ বাবে ধাপে ধাপে AI শিকাত সহায় কৰে।</p>
    <h2>১০ মিনিটত আৰম্ভ কৰক</h2>
    <ol>
      <li>লক্ষ্য বাছনি কৰক: study, career, business বা family।</li>
      <li>Prompt Packs-ৰ পৰা এটা prompt খুলি run কৰক।</li>
      <li>নিজৰ context যোগ দি output refine কৰি পুনৰ run কৰক।</li>
    </ol>
    <h2>মুখ্য পৃষ্ঠা</h2>
    <ul>
      <li><a href="/as/ai-in-assamese">অসমীয়াত AI beginner guide</a></li>
      <li><a href="/as/chatgpt-in-assamese">অসমীয়াত ChatGPT practical guide</a></li>
      <li><a href="/as/ai-course-in-assamese">অসমীয়াত AI Course</a></li>
      <li><a href="/as/faq">AI FAQ</a></li>
    </ul>
  </article>
</main>`,
  },
  "/learning-roadmaps": {
    en: `
<main>
  <article>
    <h1>Learning Roadmaps in Assamese: coming soon hub</h1>
    <p>The first roadmap course goes live on March 15. Join the waitlist to get early updates on YouTube and email.</p>
    <h2>Planned roadmap tracks</h2>
    <ul>
      <li>AI Basics</li>
      <li>Career in AI</li>
      <li>AI for Govt Job preparation</li>
      <li>AI for Small Business</li>
      <li>AI for Teachers and Parents</li>
    </ul>
    <p>1,200+ learners are already waiting.</p>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>শিকাৰ ৰোডমেপ: coming soon hub</h1>
    <p>প্ৰথম ৰোডমেপ ক’ৰ্ছ ১৫ মাৰ্চত লাইভ হ’ব। waitlist-ত যোগ দিলে YouTube আৰু ইমেইলত প্ৰথমে আপডেট পাব।</p>
    <h2>পৰিকল্পিত ৰোডমেপ</h2>
    <ul>
      <li>AI ৰ আৰম্ভণি</li>
      <li>কেৰিয়াৰত AI</li>
      <li>চৰকাৰী চাকৰিত AI</li>
      <li>সৰু ব্যৱসায়ত AI</li>
      <li>শিক্ষক আৰু অভিভাৱকৰ বাবে AI</li>
    </ul>
    <p>১,২০০+ শিক্ষাৰ্থী অপেক্ষা কৰি আছে।</p>
  </article>
</main>`,
  },
  "/ai-in-assamese": {
    en: `
<main>
  <article>
    <h1>AI in Assamese: beginner path</h1>
    <p>You can start learning AI in Assamese without coding by following one practical workflow every day.</p>
    <h2>Quick path</h2>
    <ol>
      <li>Pick one goal and one AI tool.</li>
      <li>Use role + context + task + output format in your prompt.</li>
      <li>Track one output improvement daily for 30 days.</li>
    </ol>
    <p>Next: <a href="/prompt-packs">Prompt Packs</a> and <a href="/learning-roadmaps">Learning Roadmaps</a>.</p>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>অসমীয়াত AI: beginner পথ</h1>
    <p>coding নজনাকৈও দৈনিক practical workflow মানি অসমীয়াত AI শিকা আৰম্ভ কৰিব পাৰে।</p>
    <h2>দ্ৰুত পথ</h2>
    <ol>
      <li>এটা লক্ষ্য আৰু এটা AI tool বাছনি কৰক।</li>
      <li>prompt-ত role + context + task + output format লিখক।</li>
      <li>৩০ দিন দৈনিক এটা output improvement track কৰক।</li>
    </ol>
    <p>Next: <a href="/as/prompt-packs">Prompt Packs</a> আৰু <a href="/as/learning-roadmaps">Learning Roadmaps</a>।</p>
  </article>
</main>`,
  },
  "/chatgpt-in-assamese": {
    en: `
<main>
  <article>
    <h1>ChatGPT in Assamese: practical setup and usage</h1>
    <p>To get better Assamese results in ChatGPT, use structured prompts and clear output instructions.</p>
    <h2>Setup steps</h2>
    <ol>
      <li>Log in to ChatGPT and define your use-case.</li>
      <li>Write prompts with role, context, task, and format.</li>
      <li>Review output, correct facts, and iterate.</li>
    </ol>
    <p>Safety first: never share passwords, OTPs, or sensitive documents.</p>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>অসমীয়াত ChatGPT: setup আৰু ব্যৱহাৰ</h1>
    <p>ভাল Assamese output পাবলৈ structured prompt আৰু স্পষ্ট output instruction ব্যৱহাৰ কৰক।</p>
    <h2>setup ধাপ</h2>
    <ol>
      <li>ChatGPT-ত লগিন কৰি use-case ঠিক কৰক।</li>
      <li>role, context, task, format-এ prompt লিখক।</li>
      <li>output review কৰি fact verify কৰক আৰু iterate কৰক।</li>
    </ol>
    <p>Safety: password, OTP বা sensitive document share নকৰিব।</p>
  </article>
</main>`,
  },
  "/ai-course-in-assamese": {
    en: `
<main>
  <article>
    <h1>AI Course in Assamese</h1>
    <p>Practical Assamese-first AI course with structured modules, guided tracks, and project outcomes for learners and professionals.</p>
    <h2>Program outcomes</h2>
    <ul>
      <li>Assamese-first prompt workflows</li>
      <li>Daily practical AI execution habits</li>
      <li>Portfolio-ready workflow projects</li>
    </ul>
    <p>Join the course updates list for cohort schedule and enrollment windows.</p>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>অসমীয়াত AI Course</h1>
    <p>এই Assamese-first course-এ structured module, guided track আৰু project outcome-এ practical AI execution-এ focus কৰে।</p>
    <h2>Program outcome</h2>
    <ul>
      <li>Assamese-first prompt workflow</li>
      <li>দৈনিক practical AI execution habit</li>
      <li>portfolio-ready workflow project</li>
    </ul>
    <p>cohort schedule আৰু enrollment update পাবলৈ course updates list-ত যোগ দিয়ক।</p>
  </article>
</main>`,
  },
  "/news": {
    en: `
<main>
  <article>
    <h1>AI News and Guides</h1>
    <p>Fresh AI news hub updated every 2 days for Assamese learners with Assam, India, and global updates.</p>
    <h2>What you get</h2>
    <ul>
      <li>5 latest updates with practical summaries</li>
      <li>20-item archive for older updates</li>
      <li>Assam-focused relevance and prompt-pack action links</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>AI খবৰ আৰু গাইড</h1>
    <p>প্ৰতি ২ দিনত Assam, India আৰু global AI আপডেট। অসমীয়া শিক্ষাৰ্থীৰ বাবে সহজ explainers আৰু practical insight।</p>
    <h2>আপুনি কি পাব</h2>
    <ul>
      <li>৫টা latest update practical summaryসহ</li>
      <li>২০টা আগৰ update archive</li>
      <li>Assam-ৰ বাবে relevance আৰু prompt-pack action path</li>
    </ul>
  </article>
</main>`,
  },
  "/faq": {
    en: `
<main>
  <article>
    <h1>AI FAQ for Assamese learners</h1>
    <p>Find direct answers to common questions about learning AI in Assamese, using ChatGPT, and applying AI in Assam-specific scenarios.</p>
    <h2>Popular questions</h2>
    <ul>
      <li>Do I need coding to start learning AI?</li>
      <li>How can I improve Assamese output quality?</li>
      <li>Which AI tools are best for students and small businesses?</li>
      <li>Can I build an Assamese chatbot?</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>Assamese learner-সকলৰ বাবে AI FAQ</h1>
    <p>অসমীয়াত AI শিকা, ChatGPT ব্যৱহাৰ আৰু Assam-specific practical scenario-ৰ সাধাৰণ প্ৰশ্নৰ direct উত্তৰ পঢ়ক।</p>
    <h2>জনপ্ৰিয় প্ৰশ্ন</h2>
    <ul>
      <li>AI শিকিবলৈ coding লাগিবনে?</li>
      <li>Assamese output quality কেনেকৈ improve কৰিম?</li>
      <li>student আৰু small business-ৰ বাবে কোন tool ভাল?</li>
      <li>Assamese chatbot build কৰিব পাৰিনে?</li>
    </ul>
  </article>
</main>`,
  },
  "/learn-ai-in-assamese-30-days": {
    en: `
<main>
  <article>
    <h1>Learn AI in Assamese in 30 days</h1>
    <p>You can build practical AI skill in 30 days with short daily routines and weekly milestones.</p>
    <ul>
      <li>Week-wise execution plan</li>
      <li>Free vs paid learning path comparison</li>
      <li>Practical FAQs for Assamese learners</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>অসমীয়াত ৩০ দিনত AI শিকক</h1>
    <p>দৈনিক সৰু routine আৰু weekly milestone-এ ৩০ দিনতে practical AI skill build কৰিব পাৰে।</p>
    <ul>
      <li>week-wise execution plan</li>
      <li>free vs paid learning path তুলনা</li>
      <li>Assamese learner-সকলৰ practical FAQ</li>
    </ul>
  </article>
</main>`,
  },
  "/best-ai-course-for-assamese-speakers": {
    en: `
<main>
  <article>
    <h1>Best AI course for Assamese speakers</h1>
    <p>The best course depends on fit: goal, budget, support needs, and practice discipline.</p>
    <ul>
      <li>Free vs paid vs cohort comparison</li>
      <li>Selection rubric for course quality</li>
      <li>FAQ for jobs, certificates, and outcomes</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>অসমীয়া শিক্ষাৰ্থীৰ বাবে Best AI Course</h1>
    <p>best course বাছনি goal, বাজেট, support আৰু practice fit-ৰ ওপৰত নিৰ্ভৰ কৰে।</p>
    <ul>
      <li>free vs paid vs cohort তুলনা</li>
      <li>course quality selection rubric</li>
      <li>job, certificate আৰু outcome FAQ</li>
    </ul>
  </article>
</main>`,
  },
  "/learning-assamese-with-ai": {
    en: `
<main>
  <article>
    <h1>Learning Assamese with AI</h1>
    <p>AI can accelerate Assamese learning when paired with active speaking, writing, and correction loops.</p>
    <ul>
      <li>Vocabulary and speaking workflows</li>
      <li>Grammar correction routines</li>
      <li>Safe learning rules for children and adults</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>AI-ৰ সহায়ত অসমীয়া শিকক</h1>
    <p>AI output-ৰ লগত active speaking আৰু writing practice যোগ কৰিলে Assamese learning দ্রুত হয়।</p>
    <ul>
      <li>vocabulary আৰু speaking workflow</li>
      <li>grammar correction routine</li>
      <li>শিশু আৰু বয়স্কৰ safe learning rules</li>
    </ul>
  </article>
</main>`,
  },
  "/assamese-llm-chatbot-guide": {
    en: `
<main>
  <article>
    <h1>Assamese LLM and chatbot guide</h1>
    <p>You can build useful Assamese chatbots by starting with narrow use-cases, curated data, and safety escalation.</p>
    <ul>
      <li>Stack blueprint by layer</li>
      <li>Implementation steps from pilot to review</li>
      <li>Common pitfalls and FAQ</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>Assamese LLM আৰু chatbot guide</h1>
    <p>narrow use-case, curated data আৰু safety escalation-এ practical Assamese chatbot build কৰিব পাৰি।</p>
    <ul>
      <li>layer-wise stack blueprint</li>
      <li>pilot-ৰ পৰা review লৈ implementation steps</li>
      <li>common pitfall আৰু FAQ</li>
    </ul>
  </article>
</main>`,
  },
  "/about": {
    en: `
<main>
  <article>
    <h1>About Namaskar AI</h1>
    <p>Namaskar AI is an Assamese-first practical AI education platform built to help learners and professionals in Assam apply AI to real tasks.</p>
    <ul>
      <li>Simple bilingual explanations</li>
      <li>Practical workflow-first teaching</li>
      <li>Safety and verification focused guidance</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>নমস্কাৰ AI-ৰ বিষয়ে</h1>
    <p>Namaskar AI হৈছে Assamese-first practical AI education platform যি Assam-ৰ learner আৰু professional-সকলৰ বাস্তৱ কামত AI প্ৰয়োগৰ বাবে তৈরি।</p>
    <ul>
      <li>সহজ bilingual ব্যাখ্যা</li>
      <li>workflow-first practical teaching</li>
      <li>safety আৰু verification focused guidance</li>
    </ul>
  </article>
</main>`,
  },
  "/contact": {
    en: `
<main>
  <article>
    <h1>Contact Namaskar AI</h1>
    <p>Reach Namaskar AI for support, collaboration, media requests, and course-related queries.</p>
    <ul>
      <li>Email: hello@namaskar.ai</li>
      <li>Instagram: @namaskar.ai</li>
      <li>Press and collaboration workflow page</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>নমস্কাৰ AI যোগাযোগ</h1>
    <p>support, collaboration, media request আৰু course query-ৰ বাবে Namaskar AI-ৰ সৈতে যোগাযোগ কৰক।</p>
    <ul>
      <li>Email: hello@namaskar.ai</li>
      <li>Instagram: @namaskar.ai</li>
      <li>Press আৰু collaboration workflow page</li>
    </ul>
  </article>
</main>`,
  },
  "/editorial-policy": {
    en: `
<main>
  <article>
    <h1>Editorial policy and source standards</h1>
    <p>Namaskar AI follows a reliability-first process: source tiers, claim-by-claim verification, and explicit correction notes.</p>
    <ul>
      <li>Primary-source first fact checking</li>
      <li>Assam context separated from global context</li>
      <li>Update cadence for fast-changing AI topics</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>Editorial policy আৰু source standards</h1>
    <p>Namaskar AI-এ reliability-first নীতি মানে: source tiers, claim-wise যাচাই আৰু correction note সহ update।</p>
    <ul>
      <li>primary source first fact-checking</li>
      <li>Assam context আৰু global context পৃথককৈ mention</li>
      <li>fast-changing AI topic-ৰ update cadence</li>
    </ul>
  </article>
</main>`,
  },
  "/press-collaboration": {
    en: `
<main>
  <article>
    <h1>Press and collaboration for Assam AI education</h1>
    <p>Namaskar AI supports media, podcast, YouTube, and education collaborations for Assamese-first AI literacy.</p>
    <ul>
      <li>Quote requests and short interview support</li>
      <li>Guest post ideas for regional AI adoption</li>
      <li>Topics: student workflows, business use-cases, safe AI</li>
    </ul>
  </article>
</main>`,
    as: `
<main>
  <article>
    <h1>Press আৰু collaboration</h1>
    <p>Assamese-first AI literacy-ৰ বাবে Namaskar AI-এ media, podcast, YouTube আৰু education collaboration support কৰে।</p>
    <ul>
      <li>quote request আৰু short interview support</li>
      <li>regional AI adoption-ৰ guest post idea</li>
      <li>student workflow, business use-case আৰু safe AI topic</li>
    </ul>
  </article>
</main>`,
  },
};

const normalizeSiteUrl = (value) => value.trim().replace(/\/$/, "");

const normalizePathname = (pathname) => {
  if (!pathname || pathname.trim().length === 0) {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
};

const resolveSiteUrl = () => {
  const fromEnv = process.env.VITE_SITE_URL?.trim();
  if (fromEnv) {
    return normalizeSiteUrl(fromEnv);
  }

  if (process.env.NODE_ENV === "development") {
    return DEFAULT_LOCAL_SITE_URL;
  }

  return DEFAULT_PROD_SITE_URL;
};

const resolveXDefaultPath = () => {
  const value = process.env.VITE_X_DEFAULT_PATH?.trim();
  if (!value) {
    return null;
  }

  return value.startsWith("/") ? value : `/${value}`;
};

const stripLocalePrefix = (pathname) => {
  const normalized = normalizePathname(pathname);
  if (normalized === "/as" || normalized === "/as/") {
    return "/";
  }

  if (normalized.startsWith("/as/")) {
    return normalized.slice(3) || "/";
  }

  return normalized;
};

const toLocalePath = (pathname, language) => {
  const basePath = stripLocalePrefix(pathname);
  if (language === "as") {
    return basePath === "/" ? "/as/" : `/as${basePath}`;
  }

  return basePath;
};

const toAbsoluteUrl = (siteUrl, pathname) => {
  try {
    return new URL(pathname, `${siteUrl}/`).toString();
  } catch {
    return `${siteUrl}${pathname}`;
  }
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const escapeAttribute = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeText = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const upsertLink = (html, { rel, href, hreflang }) => {
  const attributes = hreflang
    ? `rel="${rel}" hreflang="${hreflang}" href="${href}"`
    : `rel="${rel}" href="${href}"`;

  if (hreflang) {
    const selector = `<link[^>]*rel=["']${rel}["'][^>]*hreflang=["']${hreflang}["'][^>]*>`;
    const regex = new RegExp(selector, "i");
    if (regex.test(html)) {
      return html.replace(regex, `<link ${attributes} />`);
    }
  } else {
    const selector = `<link[^>]*rel=["']${rel}["'][^>]*>`;
    const regex = new RegExp(selector, "i");
    if (regex.test(html)) {
      return html.replace(regex, `<link ${attributes} />`);
    }
  }

  return html.replace("</head>", `  <link ${attributes} />\n</head>`);
};

const upsertHtmlLang = (html, lang) => {
  const tagRegex = /<html[^>]*>/i;
  const match = html.match(tagRegex);
  if (!match) {
    return html;
  }

  const htmlTag = match[0];
  if (/lang=["'][^"']*["']/i.test(htmlTag)) {
    return html.replace(/<html[^>]*>/i, htmlTag.replace(/lang=["'][^"']*["']/i, `lang="${lang}"`));
  }

  return html.replace(/<html/i, `<html lang="${lang}"`);
};

const upsertTitle = (html, title) => {
  const escapedTitle = escapeText(title);
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapedTitle}</title>`);
  }

  return html.replace("</head>", `  <title>${escapedTitle}</title>\n</head>`);
};

const upsertMeta = (html, identifier, key, content) => {
  const escapedContent = escapeAttribute(content);
  const selector = new RegExp(`<meta[^>]*${identifier}=["']${escapeRegex(key)}["'][^>]*>`, "gi");
  const sanitized = html.replace(selector, "");
  return sanitized.replace("</head>", `  <meta ${identifier}="${key}" content="${escapedContent}" />\n</head>`);
};

const upsertStaticContent = (html, content) => {
  const containerRegex = new RegExp(`<section id=["']seo-static-content["'][\\s\\S]*?<\\/section>`, "gi");
  const sanitized = html.replace(containerRegex, "");

  if (!content) {
    return sanitized;
  }

  return sanitized.replace(
    "</body>",
    `  <section id="seo-static-content" data-seo-static="true">\n${content}\n  </section>\n</body>`,
  );
};

const routeToFile = (pathname) => {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") {
    return "index.html";
  }

  const stripped = normalized.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.join(stripped, "index.html");
};

const buildSeoRouteHtml = (templateHtml, siteUrl, pathname) => {
  const normalizedPath = normalizePathname(pathname);
  const pageLanguage = normalizedPath === "/as" || normalizedPath.startsWith("/as/") ? "as" : "en";
  const clusterBasePath = stripLocalePrefix(normalizedPath);

  const enPath = toLocalePath(clusterBasePath, "en");
  const asPath = toLocalePath(clusterBasePath, "as");
  const canonicalPath = pageLanguage === "as" ? asPath : enPath;

  const canonicalUrl = toAbsoluteUrl(siteUrl, canonicalPath);
  const enAlternateUrl = toAbsoluteUrl(siteUrl, enPath);
  const asAlternateUrl = toAbsoluteUrl(siteUrl, asPath);
  const xDefaultPath = resolveXDefaultPath();
  const xDefaultUrl = xDefaultPath ? toAbsoluteUrl(siteUrl, xDefaultPath) : enAlternateUrl;

  const copySet = ROUTE_SEO_COPY[clusterBasePath] ?? ROUTE_SEO_COPY["/"];
  const fallbackCopy = ROUTE_SEO_COPY["/"][pageLanguage] ?? ROUTE_SEO_COPY["/"].en;
  const localizedCopy = copySet?.[pageLanguage];
  const pageCopy =
    localizedCopy &&
    typeof localizedCopy.title === "string" &&
    typeof localizedCopy.description === "string"
      ? localizedCopy
      : fallbackCopy;

  const staticRouteCopy = ROUTE_STATIC_HTML[clusterBasePath]?.[pageLanguage] ?? null;

  if (process.env.DEBUG_PRERENDER === "true") {
    console.log(
      `[prerender:route] route=${normalizedPath} cluster=${clusterBasePath} lang=${pageLanguage} title=${pageCopy.title}`,
    );
  }

  let html = templateHtml;
  html = upsertHtmlLang(html, pageLanguage);
  html = upsertTitle(html, pageCopy.title);
  html = upsertMeta(html, "name", "description", pageCopy.description);
  html = upsertMeta(html, "property", "og:title", pageCopy.title);
  html = upsertMeta(html, "property", "og:description", pageCopy.description);
  html = upsertMeta(html, "property", "twitter:title", pageCopy.title);
  html = upsertMeta(html, "property", "twitter:description", pageCopy.description);
  html = upsertMeta(html, "property", "og:url", canonicalUrl);
  html = upsertMeta(html, "property", "twitter:url", canonicalUrl);

  html = html.replace(new RegExp(`<link[^>]*rel=["']canonical["'][^>]*>`, "gi"), "");
  html = html.replace(new RegExp(`<link[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*>`, "gi"), "");

  html = upsertLink(html, { rel: "canonical", href: canonicalUrl });
  html = upsertLink(html, { rel: "alternate", hreflang: "en", href: enAlternateUrl });
  html = upsertLink(html, { rel: "alternate", hreflang: "as", href: asAlternateUrl });
  html = upsertLink(html, { rel: "alternate", hreflang: "x-default", href: xDefaultUrl });
  html = upsertStaticContent(html, staticRouteCopy);

  html = html.replace(new RegExp(`id=["']${escapeRegex("canonical-link")}["']\\s*`, "gi"), "");

  return html;
};

const run = async () => {
  const distDir = path.join(process.cwd(), "dist");
  const sourceFile = path.join(distDir, "index.html");
  const siteUrl = resolveSiteUrl();

  const templateHtml = await fs.readFile(sourceFile, "utf8");
  const seoRoutes = [...EN_ROUTES, ...EN_ROUTES.map((route) => (route === "/" ? "/as/" : `/as${route}`))];

  for (const route of seoRoutes) {
    const renderedHtml = buildSeoRouteHtml(templateHtml, siteUrl, route);
    const outputFile = path.join(distDir, routeToFile(route));
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, renderedHtml, "utf8");
  }

  console.log(`[prerender] Generated HTML for ${seoRoutes.length} localized SEO routes (${siteUrl}).`);
};

await run();
