# AHS Enterprise — Client-Side Demo (Next.js)

This is the **client-side (front-end only)** demo for M/S A H S Enterprise —
built with Next.js (App Router), Tailwind CSS v4, and Framer Motion.

There is no backend/database yet — the contact form, and every piece of
content, is wired from a single data file so it's easy to review and edit
before we build the server side and admin panel.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

To build a production bundle:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  page.tsx                   -> Home page (all sections)
  projects/[slug]/page.tsx   -> Individual project detail page (one per project)
  layout.tsx                 -> Fonts, metadata
  globals.css                -> Design tokens (colors/fonts), blueprint grid, stamp styles

components/
  Navbar, Hero, About, Services, ProjectsGrid, Capability,
  Clients, TrustStrip (banks + licenses), Contact, Footer
  Reveal / RevealStagger      -> scroll animations (Framer Motion)
  StatusStamp, CornerMarks    -> small reusable UI pieces

lib/
  data.ts   -> ALL editable content lives here: services, projects,
              clients, banking partners, stats, company info.
              Add a new project by adding one object to the `projects`
              array -- a new page at /projects/your-slug is generated
              automatically.

public/images/  -> real photos & logos extracted from the company profile
public/fonts/   -> self-hosted font files (Big Shoulders Display, Inter,
                  IBM Plex Mono) -- used instead of Google Fonts CDN so
                  the site works fully offline / behind firewalls too.
```

## Editing content

Everything text-based (service descriptions, project details, client
names, phone numbers, etc.) lives in `lib/data.ts`. You don't need to
touch any component file to update copy -- just edit the data there.

## What's next

- Server side (API / database) for the contact form and dynamic project
  management
- Admin panel to add/edit projects, services and clients without code
- Optional: connect a real CMS if you'd like non-technical staff to
  manage content


## MongoDB setup

Content is read from MongoDB when `MONGODB_URI` is set, and falls back to the static
content in `lib/data.ts` when it isn't (or if the database is unreachable), so the public
site never breaks.

```bash
cp .env.example .env.local     # add your MongoDB Atlas / local connection string
npm run seed                   # inserts missing content (safe to re-run, keeps admin edits)
npm run seed -- --force        # overwrite existing documents with lib/data.ts
npm run dev
```

Collections: `projects`, `services`, `clients`, `settings` (single `site` document: company info,
stats, capability, licenses, banking partners, FAQs), `contactmessages` (saved by `POST /api/contact`),
`adminusers` (schema only — auth is built with the admin panel).

Pages are statically generated and refreshed every 5 minutes (`revalidate = 300`). Projects added to the
database after a build are rendered on demand. A project appears on the map when it has `geo: { lat, lng, place }`.
