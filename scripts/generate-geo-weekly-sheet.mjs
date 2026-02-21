import { promises as fs } from "node:fs";
import path from "node:path";

const engines = ["ChatGPT", "Perplexity", "Gemini", "Claude", "Grok"];

const queryBank = [
  { query: "learn AI in Assamese", language: "en", cluster: "learn_ai_assamese", targetPage: "/ai-in-assamese" },
  { query: "learning AI in Assamese", language: "en", cluster: "learn_ai_assamese", targetPage: "/ai-in-assamese" },
  { query: "Assamese AI tutorial", language: "en", cluster: "learn_ai_assamese", targetPage: "/ai-in-assamese" },
  { query: "ChatGPT in Assamese", language: "en", cluster: "chatgpt_assamese", targetPage: "/chatgpt-in-assamese" },
  {
    query: "best AI course for Assamese speakers",
    language: "en",
    cluster: "course_selection",
    targetPage: "/best-ai-course-for-assamese-speakers",
  },
  { query: "AI শিকিবলৈ কেনেকৈ আৰম্ভ কৰিম", language: "as", cluster: "learn_ai_assamese", targetPage: "/ai-in-assamese" },
  {
    query: "learning Assamese with AI",
    language: "en",
    cluster: "learn_assamese_with_ai",
    targetPage: "/learning-assamese-with-ai",
  },
  {
    query: "AI for learning Assamese language",
    language: "en",
    cluster: "learn_assamese_with_ai",
    targetPage: "/learning-assamese-with-ai",
  },
  { query: "Assamese LLM", language: "en", cluster: "assamese_llm", targetPage: "/assamese-llm-chatbot-guide" },
  { query: "Assamese chatbot", language: "en", cluster: "assamese_llm", targetPage: "/assamese-llm-chatbot-guide" },
  { query: "AI for Assam", language: "en", cluster: "ai_for_assam", targetPage: "/assamese-llm-chatbot-guide" },
  {
    query: "regional language AI learning India",
    language: "en",
    cluster: "regional_ai_learning",
    targetPage: "/faq",
  },
];

const parseWeekStart = () => {
  const cliArg = process.argv[2];
  if (cliArg) {
    const parsed = new Date(cliArg);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
  }

  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diffToMonday);
  return monday.toISOString().slice(0, 10);
};

const weekStart = parseWeekStart();
const rows = [];

for (const queryItem of queryBank) {
  for (const engine of engines) {
    rows.push({
      week_start: weekStart,
      run_slot: "cycle_1",
      engine,
      query: queryItem.query,
      query_language: queryItem.language,
      cluster: queryItem.cluster,
      target_page: queryItem.targetPage,
      response_link: "",
      citation_position: "",
      score: "",
      notes: "",
      next_action: "",
      status: "planned",
    });
  }
}

const header = Object.keys(rows[0]);
const escapeCell = (value) => {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
};

const csvContent = [header.join(","), ...rows.map((row) => header.map((key) => escapeCell(row[key])).join(","))].join("\n") + "\n";
const docsDatedPath = path.join(process.cwd(), "docs", `geo-weekly-sheet-${weekStart}.csv`);
const docsLatestPath = path.join(process.cwd(), "docs", "geo-weekly-sheet-latest.csv");
const publicDatedPath = path.join(process.cwd(), "public", `geo-weekly-sheet-${weekStart}.csv`);
const publicLatestPath = path.join(process.cwd(), "public", "geo-weekly-sheet-latest.csv");

await fs.writeFile(docsDatedPath, csvContent, "utf8");
await fs.writeFile(docsLatestPath, csvContent, "utf8");
await fs.writeFile(publicDatedPath, csvContent, "utf8");
await fs.writeFile(publicLatestPath, csvContent, "utf8");

console.log(`[geo] Generated weekly sheet: ${docsDatedPath} (${rows.length} rows)`);
