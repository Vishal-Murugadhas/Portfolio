# Vishal Murugadhas — Portfolio (V2: Midnight Terminal with Violet Beacons)

> An editorial-tech personal portfolio for **Vishal Murugadhas**, built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, **React Bits 3D Circular Carousel**, and **TypeScript**.

---

## ⚡ Quick Start

```bash
# 1. Enter the portfolio directory
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
/portfolio
├── app/
│   ├── globals.css           # Design tokens, twilight sky, barcode, hairline borders
│   ├── layout.tsx            # Inter, Instrument Serif, JetBrains Mono font loading
│   ├── page.tsx              # Assembled single-page flow
│   ├── not-found.tsx         # Custom Midnight Terminal 404
│   ├── opengraph-image.tsx   # Dynamic dark Open Graph preview with violet bloom
│   ├── robots.ts             # Robots.txt generator
│   ├── sitemap.ts            # Dynamic sitemap generator
│   └── icon.svg              # Custom VM monogram SVG favicon
├── components/
│   ├── Navbar.tsx            # Frosted glass navbar with 1px violet scroll-progress line
│   ├── CoordinateFooter.tsx  # Brand signature with live Surat IST time ticker (21.1702° N, 72.8311° E)
│   ├── sections/
│   │   ├── Hero.tsx          # Twilight sky, serif drama, Boarding Pass card with CSS barcode
│   │   ├── About.tsx         # 2-col layout, Currently card with stat mini-grid
│   │   ├── Projects.tsx      # PHANTOM feature card with violet bloom, equal-height grid
│   │   ├── Achievements.tsx  # 3D Circular Carousel (cylinder preset) + quiet text list
│   │   ├── Experience.tsx    # Flight route-line timeline with active pulse node
│   │   ├── Skills.tsx        # 5 hairline rows + edge-masked marquee (64px gap)
│   │   ├── Education.tsx     # Full 2-column cards with hairline circle icons
│   │   └── Contact.tsx       # Direct channels with copy toasts + contact form
│   └── ui/
│       ├── Container.tsx     # Unified 1200px container enforcing identical left alignment
│       ├── SectionHeader.tsx # Enforces stamp -> 24px -> title -> 16px -> subtitle -> 64px gap
│       ├── Buttons.tsx       # FilledVioletPill, PillGhostButton, FilledActionButton, CompactOutlinedButton
│       ├── Card.tsx          # 19.2px radius, hairline border, shadowless glass card
│       ├── Drawer.tsx        # Focus-trapped right-side drawer for project specifications
│       ├── Modal.tsx         # Focus-trapped backdrop-blurred achievement modal
│       ├── CircularCarousel.jsx # React Bits 3D cylindrical carousel
│       └── CircularCarousel.css
├── data/
│   └── content.ts            # ALL portfolio content, projects, achievements, and metadata
└── lib/
    ├── placeholders.ts       # Generates on-brand dark SVG placeholders for achievements
    └── utils.ts              # Utility helpers
```

---

## 🛠️ Content Editing & Customization Guide

All site content is centralized in `data/content.ts`. You do not need to modify JSX code to update information.

### 1. Update Personal & Social URLs
Open `data/content.ts` and replace the placeholder URLs marked with `// TODO`:
```ts
export const identity = {
  profiles: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    leetcode: "https://leetcode.com/your-username",
  },
};
```

### 2. Swap Resume PDF
1. Export your resume as `resume.pdf`.
2. Place it in `public/resume.pdf` (overwriting the placeholder).
3. The "Resume" buttons in the navbar and hero will automatically serve and download this file.

### 3. Replace Achievement Photos
By default, `lib/placeholders.ts` generates on-brand SVG images with dark gradients and subtle violet blooms.
To use your real photos (e.g. stage ceremony, trophy, certificate):
1. Save your photos in `public/achievements/` (e.g., `psb-stage.jpg`).
2. Update the `src` attribute in `data/content.ts`:
```ts
export const carouselAchievements = [
  {
    src: "/achievements/psb-stage.jpg", // Swapped!
    alt: "Bank of Baroda x IIT Gandhinagar PSB Hackathon stage",
    title: "2nd Place · PSB Hackathon",
    subtitle: "Bank of Baroda × IIT Gandhinagar · 2026",
    year: "2026",
    description: "Ranked 2nd out of 450+ national teams...",
  },
  // ...
];
```

### 4. Configure Contact Form Submissions
The contact form works out-of-the-box with a `mailto:` fallback. To receive submissions via Formspree or Web3Forms:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your form endpoint:
   ```env
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```

---

## 🚀 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete V2 portfolio redesign"
   git push origin main
   ```
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set the **Root Directory** to `portfolio`.
5. Under **Environment Variables**, add `NEXT_PUBLIC_FORM_ENDPOINT` (if using Formspree/Web3Forms).
6. Click **Deploy**. Vercel will run `npm run build` and launch your site with edge caching and instant SSL.

---

## ✅ Customization Checklist (TODOs)

- [x] `data/content.ts`: Replace `identity.profiles.github` with your real GitHub handle.
- [x] `data/content.ts`: Replace `identity.profiles.linkedin` with your LinkedIn handle.
- [x] `data/content.ts`: Replace `identity.profiles.leetcode` with your LeetCode handle.
- [ ] `data/content.ts`: Replace `projects[0].links.github` (PHANTOM repository link).
- [ ] `data/content.ts`: Replace `projects[1].links.github` (AegisAI repository link).
- [ ] `data/content.ts`: Replace `projects[2].links.github` and `demo` (StockSense repository & live demo).
- [ ] `data/content.ts`: Set `seo.url` to your production domain (e.g. `https://vishal-murugadhas.vercel.app`).
- [ ] `public/resume.pdf`: Replace with your actual PDF resume.
- [ ] `public/achievements/`: (Optional) Add your real competition and event photos.
- [ ] `.env.local`: (Optional) Add `NEXT_PUBLIC_FORM_ENDPOINT` for automated form handling.
