import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { loadEnv } from "./lib/env.mjs";

loadEnv(".env");

const siteId = "coffee_rigs";
const outDir = path.join(process.cwd(), "reports");
const guidesDir = path.join(process.cwd(), "guides");
const products = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/products.json"), "utf8"));
const candidates = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/product-candidates.json"), "utf8"));
const catalogReview = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/catalog-review.json"), "utf8"));
const candidateDecisionCounts = { approve: 0, hold: 0, reject: 0 };
for (const candidate of candidates) candidateDecisionCounts[candidate.decision] += 1;
const approvedAwaitingActivation = candidates.filter(
  (candidate) => candidate.decision === "approve" && candidate.activation?.status === "pending"
);
const activatedCandidates = candidates.filter((candidate) => candidate.activation?.status === "activated");
const latestResearchDate = candidates.map((candidate) => candidate.researchedAt).filter(Boolean).sort().at(-1) || "not run";
const catalogReviewCounts = { keep: 0, refresh: 0, "retire-review": 0 };
for (const review of catalogReview.products) catalogReviewCounts[review.status] += 1;

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
  vercelToken: Boolean(process.env.VERCEL_TOKEN),
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

function git(args) {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const previousProducts = (() => {
  const raw = git(["show", "HEAD~1:data/products.json"]);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
})();
const previousByAsin = new Map(previousProducts.map((product) => [product.asin, product]));
const currentByAsin = new Map(products.map((product) => [product.asin, product]));
const productsAdded = products.filter((product) => !previousByAsin.has(product.asin));
const productsRemoved = previousProducts.filter((product) => !currentByAsin.has(product.asin));
const affiliateDiff = git(["diff", "--unified=0", "--no-ext-diff", "HEAD~1..HEAD", "--", "guides"]);
const affiliateLinksAdded = affiliateDiff
  .split("\n")
  .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
  .flatMap((line) => [...line.matchAll(/https:\/\/www\.amazon\.com\/dp\/([A-Z0-9]{10})\/ref=nosim\?tag=abbeybench-20/g)])
  .map((match) => match[1]);
const linkedAsinsAdded = [...new Set(affiliateLinksAdded)].sort();
const lastCatalogUpdate = git(["log", "-1", "--format=%cs", "--", "data/products.json"]) || "unknown";

async function inspectRemoteCatalog() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { count: "unavailable", state: "unavailable (missing server-side Supabase credentials)" };

  try {
    const endpoint = `${url.replace(/\/$/, "")}/rest/v1/affiliate_products?site_id=eq.${siteId}&select=asin&order=asin`;
    const response = await fetch(endpoint, { headers: { apikey: key, authorization: `Bearer ${key}` } });
    if (!response.ok) return { count: "unavailable", state: `query failed (HTTP ${response.status})` };
    const remoteProducts = await response.json();
    const remoteAsins = new Set(remoteProducts.map((product) => product.asin));
    const missing = products.filter((product) => !remoteAsins.has(product.asin));
    const remoteOnly = remoteProducts.filter((product) => !currentByAsin.has(product.asin));
    const state = missing.length || remoteOnly.length
      ? `out of sync (${missing.length} local missing remotely; ${remoteOnly.length} remote-only)`
      : "in sync";
    return { count: remoteProducts.length, state };
  } catch {
    return { count: "unavailable", state: "query failed (network or configuration error)" };
  }
}

const remoteCatalog = await inspectRemoteCatalog();

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
  "## Product catalog growth",
  `- Recommended products added in latest commit: ${productsAdded.length}`,
  `- Products removed in latest commit: ${productsRemoved.length}`,
  `- Affiliate link placements added in latest commit: ${affiliateLinksAdded.length}`,
  `- Last product catalog update: ${lastCatalogUpdate}`,
  `- Supabase product rows for this site: ${remoteCatalog.count}`,
  `- Catalog sync state: ${remoteCatalog.state}`,
  ...(productsAdded.length
    ? productsAdded.map((product) => `- Added product: ${product.asin} — ${product.name}`)
    : ["- Added products: none"]),
  ...(linkedAsinsAdded.length
    ? [`- ASINs linked by new placements: ${linkedAsinsAdded.join(", ")}`]
    : ["- ASINs linked by new placements: none"]),
  "",
  "## Product discovery funnel",
  `- Candidates in evidence registry: ${candidates.length}`,
  `- Latest product research date: ${latestResearchDate}`,
  `- Candidate decisions: ${candidateDecisionCounts.approve} approved; ${candidateDecisionCounts.hold} held; ${candidateDecisionCounts.reject} rejected`,
  `- Approved candidates awaiting activation: ${approvedAwaitingActivation.length}`,
  `- Candidates activated through the evidence pipeline: ${activatedCandidates.length}`,
  `- Latest monthly catalog review: ${catalogReview.reviewedAt || "not run"}`,
  `- Catalog review flags: ${catalogReviewCounts.keep} keep; ${catalogReviewCounts.refresh} refresh; ${catalogReviewCounts["retire-review"]} retire-review`,
  ...(approvedAwaitingActivation.length
    ? approvedAwaitingActivation.map((candidate) => `- Awaiting activation: ${candidate.asin} — ${candidate.productName} — best for ${candidate.bestFor}`)
    : ["- Awaiting activation: none"]),
  "",
  "## Guides live",
  ...(liveGuides.length ? liveGuides.map((slug) => `- ${slug}`) : ["- No live guides found."]),
  "",
  "## Credential availability",
  `- Resend API key in .env: ${envStatus.resend ? "yes" : "no"}`,
  `- Supabase URL in .env: ${envStatus.supabaseUrl ? "yes" : "no"}`,
  `- Supabase service role key in .env: ${envStatus.supabaseServiceRoleKey ? "yes" : "no"}`,
  `- Supabase credentials available: ${envStatus.supabaseUrl && envStatus.supabaseServiceRoleKey ? "yes" : "no"}`,
  `- Vercel token available locally: ${envStatus.vercelToken ? "yes" : "no"}`,
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
