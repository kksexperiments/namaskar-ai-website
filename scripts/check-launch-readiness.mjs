import { promises as fs } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const strictMode = process.argv.includes("--strict");

const requiredFiles = [
  "src/components/AdminRoute.tsx",
  "src/lib/leadCapture.ts",
  "supabase/migrations/20260221140000_waitlist_fallback_submissions.sql",
  "docs/launch-backlog.md",
];

const requiredScripts = ["lint", "build", "check:launch", "check:launch:strict", "validate:news-links:ci"];
const requiredEnvVars = ["VITE_SITE_URL", "VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY", "VITE_WAITLIST_ENDPOINT"];

const messages = [];
let hasFailure = false;

const add = (level, message) => {
  messages.push({ level, message });
  if (level === "FAIL") {
    hasFailure = true;
  }
};

const ensureFileExists = async (relativePath) => {
  const absolutePath = path.join(projectRoot, relativePath);
  try {
    await fs.access(absolutePath);
    add("PASS", `Found required file: ${relativePath}`);
  } catch {
    add("FAIL", `Missing required file: ${relativePath}`);
  }
};

const checkRequiredFiles = async () => {
  await Promise.all(requiredFiles.map((filePath) => ensureFileExists(filePath)));
};

const checkPackageScripts = async () => {
  const packagePath = path.join(projectRoot, "package.json");
  const raw = await fs.readFile(packagePath, "utf8");
  const parsed = JSON.parse(raw);
  const scripts = parsed.scripts || {};

  for (const scriptName of requiredScripts) {
    if (scripts[scriptName]) {
      add("PASS", `Script is present: npm run ${scriptName}`);
    } else {
      add("FAIL", `Missing npm script: ${scriptName}`);
    }
  }
};

const checkSitemapHost = async () => {
  const sitemapPath = path.join(projectRoot, "public", "sitemap.xml");
  try {
    const sitemap = await fs.readFile(sitemapPath, "utf8");
    const expectedHost = (process.env.VITE_SITE_URL || "https://www.namaskarai.in").replace(/\/$/, "");
    if (sitemap.includes(expectedHost)) {
      add("PASS", `Sitemap includes host: ${expectedHost}`);
    } else {
      add("FAIL", `Sitemap does not include expected host: ${expectedHost}`);
    }
  } catch {
    add("FAIL", "Could not read public/sitemap.xml");
  }
};

const checkEnvironment = () => {
  for (const variable of requiredEnvVars) {
    const value = process.env[variable];
    if (value && value.trim().length > 0) {
      add("PASS", `Environment variable is set: ${variable}`);
      continue;
    }

    if (strictMode) {
      add("FAIL", `Missing required environment variable in strict mode: ${variable}`);
    } else {
      add("WARN", `Environment variable not set (non-strict mode): ${variable}`);
    }
  }
};

const printSummary = () => {
  console.log(`[launch-check] Mode: ${strictMode ? "strict" : "standard"}`);
  for (const entry of messages) {
    const prefix = `[${entry.level}]`;
    console.log(`${prefix} ${entry.message}`);
  }

  const passCount = messages.filter((item) => item.level === "PASS").length;
  const warnCount = messages.filter((item) => item.level === "WARN").length;
  const failCount = messages.filter((item) => item.level === "FAIL").length;
  console.log(`[launch-check] Summary: ${passCount} pass, ${warnCount} warn, ${failCount} fail`);
};

const run = async () => {
  await checkRequiredFiles();
  await checkPackageScripts();
  await checkSitemapHost();
  checkEnvironment();
  printSummary();
  process.exit(hasFailure ? 1 : 0);
};

run().catch((error) => {
  console.error("[launch-check] Unexpected error:", error);
  process.exit(1);
});
