# McSqueaky™ — V1 Founder Build Packet

*Premium recurring residential cleaning · 518 / Capital Region, NY*
*Generated from the V3 THOR Bounce Pack. This is the working handoff doc for John / the operator side.*

---

## 0. TL;DR — what got built

A complete, SEO-ready, quote-first marketing site (static HTML/CSS/JS, no build step) deployed on the same pipeline as The G Code™ (GitHub → Vercel auto-deploy).

**Pages live:** Home · Recurring Cleaning · Deep Cleaning · Move-In/Move-Out · Services hub · Service Areas hub · Albany city template · About · FAQ · Quote · Privacy · Terms · 404.

**Brand system:** cream/ivory fields, elevated forest/eucalyptus green, restrained dusty-rose accent (deliberately *not* holiday), charcoal text, serif display (Fraunces) + humanist body (Inter). Premium-but-warm, female-trust-friendly.

---

## A. Business strategy

**Positioning:** *Premium recurring residential cleaning for the Capital Region — warm, trustworthy, and built to feel like relief.*

**The real sale:** time back, relief, peace of mind, consistency, a calmer home. Not "we clean."

**Customer segments (priority order):**
1. Busy dual-income households (Colonie, Latham, Guilderland, Delmar, Loudonville, Clifton Park-adjacent)
2. Young professionals / couples / early families
3. Homeowners burned by unreliable cleaners
4. Move-transition clients (buyers/sellers/renters/landlords) → convert to recurring

**Service engine (operational maturity):**
- **Tier 1 (must be strong now):** Recurring · Deep · Move-In/Move-Out
- **Tier 2 (marketed, tightened later):** One-time · Rental/Airbnb turnover · Office/boutique commercial · Post-construction

**Growth priority:** lock the recurring residential core → then layer Airbnb / selective commercial.

---

## B. Pricing philosophy (presentation, not hard numbers)

The site intentionally shows **tiers without locked dollar amounts** so you control real pricing per quote:
- Recurring **cheaper per visit** than one-time
- **Bi-weekly = the sweet spot** (featured everywhere)
- Weekly = premium tier · Monthly = light-upkeep / lower retention
- First visit usually a **deep-clean reset** so recurring stays light/affordable
- Move-out priced **higher** (standalone scope)
- Add-on menu = easy upsells (oven, fridge, interior windows, pet-hair, linen/reset, baseboards, inside cabinets)

> **TODO (John):** decide whether to publish starting prices (e.g., "Recurring from $X") — transparent starting prices convert well locally (Lemon & Dust does this). Drop them into the `.amt` slots on the home + recurring pages when ready.

---

## C. Conversion / customer journey

Quote-first, not phone-only. The journey baked into the site:
1. **Discover** (Google/GBP, referral, social) → land on Home or a city page
2. **Quote** → `/quote.html` captures: service, name, phone, email, city, beds/baths, cadence, timing, pets, notes
3. **"What happens next"** sidebar removes hesitation (review → estimate → pick a time)
4. **Phone/text fallback** for people who want a human
5. Post-service (your side): thank-you → review request → referral invite → recurring conversion

**Review engine:** ask every happy client, focus on **Google**, use your existing customer base for the first review wave. Placeholder testimonials on the homepage are clearly marked — **swap in real Google reviews before promoting.**

**Referral engine:** simple double-sided referral; prompt recurring clients (your best referral base) after a great clean.

**Existing-customer upgrade plan (because McSqueaky already operates):**
- Convert current one-time/ad-hoc clients → recurring plans
- Ask your happiest current clients for Google reviews first
- Identify best clients by geography/frequency/ease/profitability
- Normalize pricing gradually
- Upsell add-ons + premium cadence

---

## D. Local SEO / service-area strategy

- **Service Areas hub** (`/service-areas.html`) links to city pages.
- **Albany city page** (`/cleaning-albany-ny.html`) is the **template** — clone it per city with unique copy (neighborhoods, local detail). Don't spin duplicates.
- Priority city/service pages to build next:
  `cleaning-colonie-ny.html`, `cleaning-latham-ny.html`, `cleaning-troy-ny.html`, then service+city combos (`recurring-cleaning-albany-ny.html`, `deep-cleaning-albany-ny.html`, `move-out-cleaning-albany-ny.html`).
- Each page already ships with: unique `<title>` + meta description, canonical, `HouseCleaningService`/`Service` JSON-LD, FAQ schema (home + FAQ page), `robots.txt`, `sitemap.xml`.
- **Set up Google Business Profile** and keep NAP (name/address/phone) identical to the site footer.

---

## E. Visual / image direction

**Palette (in `styles.css` `:root`):** `--green:#2E5A4C`, `--rose:#BD6A72`, `--cream:#FAF6EF`, `--ink:#2B2A27`, `--gold:#C9A86A`. Green dominates, rose is an accent only — this is what keeps it boutique, not Christmas.

**Replace the placeholder gradient panels** (the colored `.media-frame` blocks) with **real, free commercial-use photos** (Unsplash / Pexels / Pixabay). Look for:
- Bright, tasteful residential interiors with natural light (kitchens, living rooms, bathrooms)
- Tasteful hands-at-work detail shots; clean uniform if authentic
- Move-in/out: bright empty rooms
- Tasteful before/after where possible

**Avoid:** clip-art tools, mop-and-bucket graphics, posed janitorial stock, costume-maid imagery, cluttered interiors, red+green holiday compositions, fake-luxury mansions that don't match a 518 service business.

---

## F. Operations / software (recommendations, not gospel)

- **Scheduling/CRM/notes:** Jobber or Housecall Pro (built for cleaning — client notes, recurring, reminders, reviews)
- **Payments/invoicing:** Square or QuickBooks/Wave
- **Reviews:** Jobber/HCP automations, or manual Google review links texted after service
- **Intake:** the site form is a starting point — see the conversion TODO below for tracked capture

---

## G. Placeholders to replace before heavy promotion

| Placeholder | Where | Replace with |
|---|---|---|
| Phone `(315) 775-4078` | every footer/header/CTA + JSON-LD | real business line |
| Email `bosslady@mcsqueaky.com` | footers, quote handler, JSON-LD | real inbox |
| Hours `Mon–Fri 8am–6pm` | footers + JSON-LD | real hours |
| Testimonials | homepage `#reviews` | real Google reviews |
| `.media-frame` gradient panels | all pages | real free-license photos |
| `reviewCount: "—"` | homepage JSON-LD | real count once you have reviews |
| Pricing (`Light upkeep`/`The sweet spot` labels) | home + recurring | real starting prices (optional) |

---

## H. The #1 high-leverage upgrade (quote backend + ad tracking)

The quote form currently opens the visitor's email app (`mailto:`) — fine for launch, but it **loses leads** and **can't fire ad conversions.** When ready, swap it for a real form backend so every submission is captured server-side and a Google/Meta **conversion event** fires on submit:
- Easiest: **Formspree** or **Netlify Forms** (change the `<form>` action; remove the mailto handler in `script.js`)
- Then add Google Tag / Meta Pixel + a conversion on the quote "thank-you" state
- This makes paid ads measurable — the difference between guessing and scaling.

*(This mirrors The G Code's parked "lead form + conversion tag" item — same play, do it here too.)*

---

## I. How to ship changes

Static site, no build. Edit files → `git push origin main` → Vercel auto-deploys to `https://mcsqueaky.com`. That's it.
