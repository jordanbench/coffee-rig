import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "./lib/env.mjs";

loadEnv(".env");

const siteId = "coffee_rig";
const outDir = path.join(process.cwd(), "reports");
const guidesDir = path.join(process.cwd(), "guides");

fs.mkdirSync(outDir, { recursive: true });

const guideCount = fs
  .readdirSync(guidesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(guidesDir, entry.name, "index.html")))
  .length;

const report = [
  "# Coffee Rig Weekly Affiliate Pulse",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Local baseline",
  `- Guides published: ${guideCount}`,
  "- Curated ASINs: 6",
  "- Amazon tag: abbeybench-20",
  "",
  "## Next actions",
  "- Refresh one money page 30 to 45 days before the next seasonal peak.",
  "- Expand the grinder cluster with one adjacent comparison or first-setup tutorial that links back to the new beginner guide.",
  "- Review outbound click and subscriber data before changing the content calendar."
].join("\n");

const file = path.join(outDir, `weekly-pulse-${new Date().toISOString().slice(0,10)}.md`);
fs.writeFileSync(file, report);
console.log(file);
