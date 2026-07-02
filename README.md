# RDev Studio

Professional portfolio website for [RDev Studio](https://rdevstudio.co.uk) — a local web design agency based in Carrickfergus, Northern Ireland.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- Deployed on **Vercel**

## Pages

| Route       | Description                          |
| ----------- | ------------------------------------ |
| `/`         | Home — hero, pricing preview, process |
| `/services` | Pricing, support plan, FAQ           |
| `/work`     | Portfolio projects                   |
| `/contact`  | Contact form and details             |
| `/about`    | About page — player profile        |

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel auto-detects Next.js — no extra configuration needed.
4. Add your custom domain (`rdevstudio.co.uk`) in Project Settings → Domains.

## Project Structure

```
app/
  layout.tsx          # Root layout, fonts, header/footer
  page.tsx            # Home
  services/page.tsx
  work/page.tsx
  contact/page.tsx
  about/page.tsx
components/
  layout/             # Header, Footer, Logo, WhatsApp
  home/               # Hero, SocialProof, ServicePreview, HowItWorks
  services/           # PricingCard, SupportSection, FAQ
  work/               # ProjectCard, WorkCTA
  contact/            # ContactForm, ContactDetails
  ui/                 # Shared UI (PageHeader)
lib/
  constants.ts        # Site copy, nav, projects, FAQ
  metadata.ts         # SEO metadata helpers
public/
  favicon.svg
```

## Customisation

- **WhatsApp number**: Update `WHATSAPP_NUMBER` in `lib/constants.ts`
- **Contact emails**: Update `EMAIL` and `CONTACT_EMAIL` in `lib/constants.ts`
- **Project links**: Update `href` values in `PROJECTS` in `lib/constants.ts`
- **Colours**: Edit `navy` and `accent` in `tailwind.config.ts`

## Contact

- General: hello@rdevstudio.co.uk
- Enquiries: ryan@rdevstudio.co.uk
