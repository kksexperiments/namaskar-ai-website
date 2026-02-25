const args = new Set(process.argv.slice(2));

const getArgValue = (flag) => {
  const argv = process.argv.slice(2);
  const index = argv.indexOf(flag);
  if (index === -1) return undefined;
  return argv[index + 1];
};

const baseUrl = (getArgValue("--base-url") || process.env.SMOKE_BASE_URL || "https://www.namaskarai.in").replace(/\/$/, "");
const timeoutMs = Number(getArgValue("--timeout-ms") || process.env.SMOKE_TIMEOUT_MS || "15000");
const checkEndpoint = args.has("--check-endpoint");
const expectEmailNotified = args.has("--expect-email-notified");
const endpointUrl = (getArgValue("--endpoint-url") || process.env.VITE_WAITLIST_ENDPOINT || "").trim();

const pagePaths = ["/", "/prompt-packs", "/ai-tools", "/learning-roadmaps", "/news"];
const results = [];
let hasFailure = false;

const add = (level, message) => {
  results.push({ level, message });
  if (level === "FAIL") hasFailure = true;
};

const fetchWithTimeout = async (url, init = {}) => {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(timeoutMs),
  });

  const text = await response.text();
  return { response, text };
};

const extractCanonical = (html) => {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  return match?.[1] || null;
};

const hasChunkPattern = (html, pattern) => new RegExp(pattern).test(html);

const checkPages = async () => {
  for (const path of pagePaths) {
    const url = `${baseUrl}${path}`;

    try {
      const { response, text } = await fetchWithTimeout(url);
      if (!response.ok) {
        add("FAIL", `Page failed (${response.status}): ${path}`);
        continue;
      }

      const canonical = extractCanonical(text);
      if (!canonical) {
        add("FAIL", `Missing canonical tag: ${path}`);
      } else if (!canonical.startsWith(baseUrl)) {
        add("FAIL", `Canonical host mismatch for ${path}: ${canonical}`);
      } else {
        add("PASS", `Page OK + canonical host valid: ${path}`);
      }

      if (path === "/learning-roadmaps") {
        const hasIndexChunk = hasChunkPattern(text, String.raw`\bindex-[A-Za-z0-9_-]+\.js\b`);
        const hasVendorReactChunk = hasChunkPattern(text, String.raw`\bvendor-react-[A-Za-z0-9_-]+\.js\b`);

        if (hasIndexChunk && hasVendorReactChunk) {
          add("PASS", "Chunk split detected on /learning-roadmaps (index + vendor-react)");
        } else {
          add(
            "WARN",
            `Chunk split patterns not detected on /learning-roadmaps (index=${hasIndexChunk}, vendor-react=${hasVendorReactChunk})`,
          );
        }
      }
    } catch (error) {
      add("FAIL", `Page request error for ${path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};

const checkWaitlistEndpoint = async () => {
  if (!checkEndpoint) return;

  if (!endpointUrl) {
    add("FAIL", "Endpoint check requested but no endpoint URL provided (--endpoint-url or VITE_WAITLIST_ENDPOINT).");
    return;
  }

  const payload = {
    timestamp: new Date().toISOString(),
    locale: "en",
    page: "/smoke-check",
    source: "codex-smoke-check",
    name: "Codex Smoke Check",
    email: `smoke-${Date.now()}@example.com`,
    phone_raw: "",
    phone_e164: "",
    course_interest: "",
    course_interest_label: "",
    consent: true,
    user_agent: "Codex Smoke Script",
    referrer: baseUrl,
  };

  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });

    let body = null;
    try {
      body = await response.json();
    } catch {
      body = null;
    }

    if (!response.ok) {
      add("FAIL", `Waitlist endpoint failed (${response.status})`);
      return;
    }

    if (!body || typeof body !== "object" || body.ok !== true) {
      add("FAIL", "Waitlist endpoint success response shape invalid (expected JSON with ok=true).");
      return;
    }

    add("PASS", "Waitlist endpoint returned ok=true");

    const hasEmailNotified = Object.prototype.hasOwnProperty.call(body, "email_notified");
    if (expectEmailNotified && !hasEmailNotified) {
      add("FAIL", "Waitlist endpoint missing email_notified field (expected after BL-002).");
    } else if (hasEmailNotified) {
      add("PASS", "Waitlist endpoint includes email_notified");
    } else {
      add("WARN", "Waitlist endpoint missing email_notified (BL-002 likely still pending).");
    }
  } catch (error) {
    add("FAIL", `Waitlist endpoint request error: ${error instanceof Error ? error.message : String(error)}`);
  }
};

const printSummary = () => {
  console.log(`[smoke] Base URL: ${baseUrl}`);
  console.log(`[smoke] Endpoint check: ${checkEndpoint ? "on" : "off"}`);

  for (const result of results) {
    console.log(`[${result.level}] ${result.message}`);
  }

  const passCount = results.filter((r) => r.level === "PASS").length;
  const warnCount = results.filter((r) => r.level === "WARN").length;
  const failCount = results.filter((r) => r.level === "FAIL").length;
  console.log(`[smoke] Summary: ${passCount} pass, ${warnCount} warn, ${failCount} fail`);
};

const run = async () => {
  await checkPages();
  await checkWaitlistEndpoint();
  printSummary();
  process.exit(hasFailure ? 1 : 0);
};

run().catch((error) => {
  console.error("[smoke] Unexpected error:", error);
  process.exit(1);
});
