// lib/achievementCards.ts
// Card artwork: 1200×960 canvas so text scales correctly at all cardWidth values.
// On-screen size = canvas-font-size × (cardWidth / 1200)
// At cardWidth 420 (scale 0.35): title 120px → ~42px; subtitle 56px → ~20px

export const CARD_ASPECT = 1.25; // 1200 / 960 — must match carousel aspectRatio prop

const W = 1200;
const H = 960;

export type CardDef = {
  label: string;
  year?: string;
  title: string;
  subtitle: string;
  alt: string;
  detail: string;
  index: string;
  src?: string; // real photo if available
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text: string, max: number, maxLines: number): string[] {
  const out: string[] = [];
  let cur = "";
  for (const w of text.split(" ")) {
    if ((cur + " " + w).trim().length > max && cur) {
      out.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) out.push(cur);
  return out.slice(0, maxLines);
}

export function cardArt(c: CardDef): string {
  const sub = wrap(c.subtitle, 26, 2);
  const subFirstY = 870 - (sub.length - 1) * 68;
  const title = wrap(c.title, 15, 3);
  const titleLastY = subFirstY - 124;
  const titleFirstY = titleLastY - (title.length - 1) * 130;

  const sans = "Inter, 'Segoe UI', Arial, sans-serif";
  const mono = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1b1626"/>
        <stop offset="1" stop-color="#0f0c16"/>
      </linearGradient>
      <radialGradient id="v" cx="82%" cy="14%" r="70%">
        <stop offset="0" stop-color="#af50ff" stop-opacity=".55"/>
        <stop offset="1" stop-color="#af50ff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="l" cx="8%" cy="96%" r="55%">
        <stop offset="0" stop-color="#e1bdff" stop-opacity=".18"/>
        <stop offset="1" stop-color="#e1bdff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#v)"/>
    <rect width="${W}" height="${H}" fill="url(#l)"/>
    <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="48" fill="none" stroke="#f7f9fa" stroke-opacity=".22" stroke-width="3"/>
    <text x="1130" y="600" text-anchor="end" font-family="${sans}" font-weight="300" font-size="460" fill="#f7f9fa" fill-opacity=".06">${esc(c.index)}</text>
    <text x="80" y="128" font-family="${mono}" font-size="44" letter-spacing="8" fill="#e1bdff">${esc(c.label.toUpperCase())}</text>
    ${c.year ? `<text x="1120" y="128" text-anchor="end" font-family="${mono}" font-size="44" letter-spacing="4" fill="#f7f9fa" fill-opacity=".8">${esc(c.year)}</text>` : ""}
    ${title.map((t, i) => `<text x="80" y="${titleFirstY + i * 130}" font-family="${sans}" font-weight="500" font-size="120" letter-spacing="-3" fill="#f7f9fa">${esc(t)}</text>`).join("")}
    ${sub.map((t, i) => `<text x="80" y="${subFirstY + i * 68}" font-family="${sans}" font-size="56" fill="#cfcbd8">${esc(t)}</text>`).join("")}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// 8 achievement cards (tasks.md §8 table)
const CARDS_DEF: Omit<CardDef, "src">[] = [
  {
    index: "01",
    label: "Hackathon",
    year: "2026",
    title: "2nd Place",
    subtitle: "PSB Hackathon · 450+ teams",
    alt: "PSB Hackathon 2026 podium",
    detail: "Ranked 2nd out of 450+ national teams at Bank of Baroda × IIT Gandhinagar for the PHANTOM insider-threat detection platform.",
  },
  {
    index: "02",
    label: "Hackathon",
    // TODO: add year
    title: "E-Rakshak Winner",
    subtitle: "Gujarat Police Hackathon",
    alt: "E-Rakshak Hackathon winner, organized by Gujarat Police",
    detail: "Winner of the E-Rakshak Hackathon organized by Gujarat Police.",
  },
  {
    index: "03",
    label: "Hackathon",
    year: "2025",
    title: "Winner",
    subtitle: "Inspiron 5.0 · COEP Pune",
    alt: "Inspiron 5.0 Hackathon first place",
    detail: "First place win at College of Engineering Pune national level technical hackathon.",
  },
  {
    index: "04",
    label: "Build",
    year: "2025",
    title: "Prism Website",
    subtitle: "SVNIT annual sports event",
    alt: "Official website for Prism SVNIT",
    detail: "Designed and engineered the official website for SVNIT's premier annual inter-college sports festival.",
  },
  {
    index: "05",
    label: "Coding",
    year: "ONGOING",
    title: "150+ LeetCode",
    subtitle: "Problems solved",
    alt: "LeetCode problem solving milestone",
    detail: "Consistent problem solving in dynamic programming, graphs, trees, and algorithmic optimization.",
  },
  {
    index: "06",
    label: "Academics",
    year: "2024–28",
    title: "Top 15% by CGPA",
    subtitle: "SVNIT · CGPA 8.95",
    alt: "Top 15% academic ranking at SVNIT",
    detail: "Academic excellence in Electronics & Communication Engineering with a 8.95 cumulative GPA.",
  },
  {
    index: "07",
    label: "Leadership",
    year: "2025–NOW",
    title: "AI/ML Lead",
    subtitle: "GDGC SVNIT",
    alt: "Google Developer Groups on Campus SVNIT",
    detail: "Mentoring junior engineers and coordinating hands-on workshops in machine learning and data engineering.",
  },
  {
    index: "08",
    label: "Organizer",
    year: "2025",
    title: "MINDBEND MUN",
    subtitle: "50+ participants",
    alt: "MINDBEND MUN organizing committee",
    detail: "Organized and facilitated a university-level Model United Nations event with over 50 delegates.",
  },
];

// Build final cards with generated SVG artwork
export const achievementCards: CardDef[] = CARDS_DEF.map((c) => ({
  ...c,
  src: cardArt(c),
}));
