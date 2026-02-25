import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);

const getArgValue = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  return args[index + 1];
};

const envFileArg = getArgValue("--env-file");
const envFilePath = resolve(process.cwd(), envFileArg || process.env.LAUNCH_CHECK_ENV_FILE || "");

if (!envFileArg && !process.env.LAUNCH_CHECK_ENV_FILE) {
  console.error("[launch-check-env] Missing required --env-file <path> (or LAUNCH_CHECK_ENV_FILE).");
  process.exit(1);
}

if (!existsSync(envFilePath)) {
  console.error(`[launch-check-env] Env file not found: ${envFilePath}`);
  process.exit(1);
}

const parseEnvFile = (raw) => {
  const parsed = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex <= 0) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // `vercel env pull` stores escaped newlines in quoted values.
    value = value.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    parsed[key] = value;
  }

  return parsed;
};

const envFileRaw = readFileSync(envFilePath, "utf8");
const envFromFile = parseEnvFile(envFileRaw);

const passthroughArgs = args.filter((arg, index) => {
  if (arg === "--env-file") return false;
  if (index > 0 && args[index - 1] === "--env-file") return false;
  return true;
});

console.log(`[launch-check-env] Using env file: ${envFilePath}`);

const child = spawnSync(
  process.execPath,
  ["scripts/check-launch-readiness.mjs", ...passthroughArgs],
  {
    cwd: process.cwd(),
    env: {
      ...process.env,
      ...envFromFile,
    },
    stdio: "inherit",
  },
);

if (child.error) {
  console.error("[launch-check-env] Failed to run launch readiness check:", child.error);
  process.exit(1);
}

process.exit(child.status ?? 1);
