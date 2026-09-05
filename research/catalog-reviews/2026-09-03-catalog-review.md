# Coffee Rigs active catalog review — 2026-09-03

## Outcome

- Active products reviewed: 14
- Keep: 8
- Refresh: 0
- Retire-review: 6
- Guides inspected: 15
- Public changes made: none

This is a planning-only snapshot. It does not remove or add products, edit guides or `sitemap.xml`, sync Supabase, deploy, send email, or make any public change. The latest weekly reports show 14 curated ASINs across 15 guides but contain no attributable purchase or conversion evidence. Outbound clicks, if observed, are interest signals only and cannot establish purchases or conversion.

## Method and limits

Every active ASIN was mapped to every local guide that recommends it. The review read each exact Amazon response, current manufacturer or support material, manuals where available, independent or owner-reported failure patterns, the official CPSC recall service, the continuing reader decision slot, and the current candidate registry for possible replacements. All 14 exact-name CPSC REST queries returned empty result sets on 2026-09-03; that is a dated database no-match, not a safety certification. Owner reports identify possible failure modes, not incidence rates. No price or availability claims were recorded.

Five destination failures from August remain unchanged: B07QMY8GLX still identifies a Baratza grinder, B08V8N3Y4Q still renders an unrelated hat, B0B6GLYY9X remains 404, B0BKRBR3BZ still identifies a MiiCoffee scale, and B00004SPEU still identifies a KRUPS grinder. The nine other Amazon responses identify the intended products. Amazon's canonical link for B0BVR5QV4Q points to a sibling URL, but the current page and buy-box metadata retain B0BVR5QV4Q and the exact intended black 54 mm V2 funnel.

## Retire-review flags

### B07QMY8GLX — OXO Brew Conical Burr Coffee Grinder

**Reason:** The active ASIN still delivers a Baratza Virtuoso+ rather than OXO. OXO's current [product page](https://www.oxo.com/conical-burr-coffee-grinder-1.html?color=Silver) and [manual](https://www.oxo.com/media/wysiwyg/PDF_Files/OXO_Brew_8717000_Booklet.pdf) preserve the reader need, but the [exact Amazon destination](https://www.amazon.com/dp/B07QMY8GLX) fails identity.

**Next action:** Human-review all placements for removal, then research the exact current OXO variant and ASIN through the candidate registry.

### B08V8N3Y4Q — Fellow Opus Conical Burr Grinder

**Reason:** The [exact Amazon destination](https://www.amazon.com/dp/B08V8N3Y4Q) still renders an unrelated trucker hat. Fellow's current [Opus 2](https://fellowproducts.com/collections/espresso/products/opus-2-conical-burr-grinder) is a materially revised grinder, so it cannot be treated as a silent continuation of this row.

**Next action:** Human-review the broken placement, then compare a newly verified Opus 2 candidate against the current Baratza Encore ESP for the espresso-capable multi-brew slot.

### B0B6GLYY9X — Greater Goods Digital Coffee Scale

**Reason:** The [exact Amazon destination](https://www.amazon.com/dp/B0B6GLYY9X) remains 404. Greater Goods currently documents [Premium Coffee Scale SKU 0460](https://shop.greatergoods.com/products/premium-coffee-scale-onyx-black), and the [2025 CPSC recall](https://www.cpsc.gov/Recalls/2025/Greater-Goods-Recalls-Digital-Kitchen-Scales-Due-to-Ingestion-Hazard-Violations-of-Reeses-Law-Federal-Safety-Regulations-for-Consumer-Products-with-Coin-Batteries-and-Child-Resistant-Coin-Battery-Packaging) names other kitchen-scale models, but neither source ties 0460 to this dead ASIN.

**Next action:** Human-review removal, then re-research the exact current 0460 listing and compare better-supported pour-over scale options.

### B0BKRBR3BZ — Hario V60 Drip Coffee Decanter

**Reason:** The [exact Amazon destination](https://www.amazon.com/dp/B0BKRBR3BZ) still identifies a MiiCoffee Nano scale. Hario continues to document the [VDD-02B decanter](https://www.hario-usa.com/products/v60-drip-decanter), and owner reports continue to make glass breakage a relevant handling caveat; the wrong-product destination is decisive.

**Next action:** Human-review removal, then verify the exact current VDD-02B ASIN and compare a more break-resistant brewer/server option.

### B07CNG6RM7 — Bodum Bistro Electric Milk Frother

**Reason:** The [exact Amazon listing](https://www.amazon.com/dp/B07CNG6RM7) and [model manual](https://d9pl0lig74xnv.cloudfront.net/product_manuals/0/5/05-11870_1.pdf) still match the Bodum 11870-01US, but a May 2026 [independent oat-milk test](https://www.bonappetit.com/story/best-milk-frothers) explicitly does not recommend it. One-function controls, thin short-lived oat foam, difficult non-immersible cleanup, burned residue, and owner-reported thermostat or whisk failures leave meaningfully better multi-mode alternatives for the guide's actual reader.

**Next action:** Human-review retirement even though the listing identity is valid. Run replacement discovery around oat-milk texture, hot and cold modes, cleanability, and repeatable temperature control.

### B00004SPEU — Urnex Cafiza Espresso Machine Cleaner

**Reason:** The [exact Amazon destination](https://www.amazon.com/dp/B00004SPEU) still identifies a KRUPS blade grinder. Urnex continues to publish [Cafiza directions](https://urnex.com/cafiza-powder) and [safety data](https://urnex.com/sds), preserving the maintenance need but not this ASIN.

**Next action:** Human-review removal. Research the exact current Cafiza package and keep each machine manufacturer's cleaning instructions ahead of a general cleaner recommendation.

## Refresh flags

None. The six material problems require human retirement review rather than copy-only refreshes. The eight keep rows retain exact intended product identity, current first-party support, bounded failure-mode language, and distinct decision-slot value.

## Keep decisions

- **B0B1JPPG2L — Breville Bambino:** Exact Amazon identity, current Breville support/manual, and the compact manual-milk default remain sound. Current priming, flow, and support complaints are anecdotal and do not establish incidence. No held or rejected machine candidate is meaningfully better in the same budget and workflow slot.
- **B07JVD78TT — Breville Bambino Plus:** Exact identity and current automatic-milk support remain sound. Cleaning-cycle and short-shot owner reports reinforce the existing complexity caveat; the hands-free milk slot remains distinct from the regular Bambino.
- **B0CC4Z32F8 — TIMEMORE C3S Pro:** Exact black folding-handle identity and current TIMEMORE documentation remain sound. Capacity, hand-effort, and espresso-adjustment limits are already bounded; alternatives still have exact-variant conflicts.
- **B0D7378WJL — WACACO Exagram Pro:** Exact identity, current manufacturer support, compact Bambino fit, and the disclosed touch-control, uncovered-port, no-IP-rating, and timer limits remain sound. Held alternatives still lack cleaner identity or first-party evidence.
- **B0BPBD7N2L — Breville Dosing Funnel 54:** Exact model and named Bambino compatibility remain current. Keep the recommendation limited to stock or explicitly confirmed Breville portafilters because aftermarket binding remains a credible fit risk.
- **B0BVR5QV4Q — Normcore Magnetic Dosing Funnel V2:** The live page retains the exact current ASIN and intended black 54 mm V2 product despite a sibling canonical URL. Keep the recommendation conditional on flat rim geometry and sufficient basket magnetism.
- **B09C5PWJXL — Normcore V4 Tamper 53.3 mm:** Exact flat-base identity, current manufacturer specifications, and owner evidence remain sound. Preserve the empty-basket clearance check and avoid pressure or extraction promises.
- **B0BPCHCZH4 — Normcore WDT Tool V3:** Exact V3-with-stand identity and two fine-needle sets remain current. Preserve installation, bending, exposed-needle, and safe-storage caveats; the retractable alternative still has an unresolved exact-variant conflict.

## Recommended editorial queue

1. Human-review the six `retire-review` rows before any public change.
2. Prioritize the five wrong or dead destinations because they send readers to unrelated products or nowhere: B07QMY8GLX, B08V8N3Y4Q, B0B6GLYY9X, B0BKRBR3BZ, and B00004SPEU.
3. Run a separate evidence-backed replacement discovery for the oat-milk frother slot; do not retain Bodum merely because its Amazon identity still works.
4. Do not replace an ASIN in place. Every replacement must enter the candidate registry with exact current Amazon identity, first-party/manual evidence, independent or owner-pattern evidence, and an official recall check before activation.
