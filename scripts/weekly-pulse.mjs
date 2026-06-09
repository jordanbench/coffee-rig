import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { loadEnv } from "./lib/env.mjs";

loadEnv(".env");

const siteId = "coffee_rigs";
const outDir = path.join(process.cwd(), "reports");
const guidesDir = path.join(process.cwd(), "guides");
const products = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/products.json"), "utf8"));

fs.mkdirSync(outDir, { recursive: true });

const guidePages = fs
  .readdirSync(guidesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(guidesDir, entry.name, "index.html")))
  .map((entry) => entry.name)
  .sort();
const liveGuides = guidePages.filter((slug) => slug !== "index");
const envStatus = {
  resend: Boolean(process.env.RESEND_API_KEY),
  supabaseUrl: Boolean(process.env.SUPABASE_URL),
  supabaseServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  vercelProjectLink: fs.existsSync(path.join(process.cwd(), ".vercel", "project.json"))
};

const htmlPages = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", "reports", ".vercel"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html") htmlPages.push(path.relative(process.cwd(), full));
  }
}
walk(process.cwd());

const latestChanged = (() => {
  try {
    return execFileSync("git", ["diff", "--name-only", "HEAD~1..HEAD"], { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean)
      .slice(0, 12);
  } catch {
    return [];
  }
})();

const report = [
  "# Coffee Rigs Weekly Affiliate Pulse",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Local baseline",
  `- Site ID: ${siteId}`,
  `- Production URL: https://www.coffeerigs.com`,
  `- Guide count: ${liveGuides.length}`,
  `- Public HTML pages: ${htmlPages.length}`,
  `- Curated ASIN count: ${products.length}`,
  "- Amazon tag: abbeybench-20",
  "",
  "## Guides live",
  ...(liveGuides.length ? liveGuides.map((slug) => `- ${slug}`) : ["- No live guides found."]),
  "",
  "## Credential availability",
  `- Resend API key in .env: ${envStatus.resend ? "yes" : "no"}`,
  `- Supabase URL in .env: ${envStatus.supabaseUrl ? "yes" : "no"}`,
  `- Supabase service role key in .env: ${envStatus.supabaseServiceRoleKey ? "yes" : "no"}`,
  `- Supabase credentials available: ${envStatus.supabaseUrl && envStatus.supabaseServiceRoleKey ? "yes" : "no"}`,
  `- Vercel project linkage available locally: ${envStatus.vercelProjectLink ? "yes" : "no"}`,
  "",
  "## Latest changed pages",
  ...(latestChanged.length ? latestChanged.map((file) => `- ${file}`) : ["- No git changes detected in the last commit range."]),
  "",
  "## Next recommended SEO action",
  "- Expand the grinder and compact espresso clusters, then watch which guide earns the first outbound Amazon click.",
  "",
  "## Recent blockers",
  "- Search Console metrics are not included until GSC is configured for this production domain.",
  "- Do not add Amazon prices or availability without an approved Amazon data workflow.",
].join("\n");

const file = path.join(outDir, `weekly-pulse-${new Date().toISOString().slice(0, 10)}.md`);
fs.writeFileSync(file, report);
console.log(file);
