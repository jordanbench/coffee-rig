# Coffee Rigs

Coffee Rigs helps home baristas choose grinders, scales, brewers, and espresso accessories without chasing cafe-level complexity.

## MVP

- Static Vercel site at `https://www.coffeerigs.com`.
- Amazon Associates tag: `abbeybench-20`.
- Curated ASIN database in `data/products.json`.
- Affiliate URL format: `https://www.amazon.com/dp/{ASIN}/ref=nosim?tag=abbeybench-20`.
- Supabase tables track products, subscribers, and outbound affiliate clicks.
- Resend sends admin pulses only; no public newsletter send is automated.

## Current Public Pages

- `/guides/best-espresso-grinders-under-200/` - Best Budget Espresso Grinders Before Prime Day
- `/guides/baratza-encore-esp-vs-fellow-opus/` - Baratza Encore ESP vs Fellow Opus
- `/guides/budget-home-espresso-setup/` - Best Small-Kitchen Espresso Setup for Beginners
- `/guides/breville-bambino-vs-bambino-plus/` - Breville Bambino vs Bambino Plus
- `/guides/best-coffee-scale-for-pour-over/` - Best Coffee Scale for Pour Over Before Prime Day
- `/guides/clean-burr-grinder/` - How to Clean a Burr Grinder Without Making Coffee Worse
- `/guides/how-to-choose-your-first-burr-grinder/` - How to Choose Your First Burr Grinder
- `/guides/best-coffee-grinder-small-kitchens/` - Best Coffee Grinders for Small Kitchens: Quiet and Electric Picks
- `/guides/best-compact-coffee-makers-small-kitchens/` - Best Compact Coffee Makers for Small Kitchens
- `/guides/milk-frother-for-oat-milk/` - Best Milk Frother for Oat Milk at Home
- `/guides/coffee-setup-for-dorm-room/` - Best Coffee Setup for a Dorm Room or Tiny Apartment
- `/guides/pour-over-vs-french-press/` - Pour Over vs French Press for Beginners
- `/guides/best-coffee-gifts-under-50/` - Useful Coffee Gifts for Small Budgets
- `/guides/coffee-station-maintenance-checklist/` - Coffee Station Maintenance Checklist

Trust pages: `/about/`, `/contact/`, `/privacy/`, and `/affiliate-disclosure/`.

## Commands

```bash
npm run check
npm run audit:catalog
npm run validate:candidates
npm run sync:products
npm run report:weekly
npm run send:admin-pulse
```
