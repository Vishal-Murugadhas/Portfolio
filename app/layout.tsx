import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PageBackground from "@/components/PageBackground";
import { seo, profiles } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  weight: ["400"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  seo.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | Vishal Murugadhas`,
  },
  description: seo.description,
  keywords: [
    "Vishal Murugadhas",
    "ML Engineer",
    "AI Engineer",
    "Data Pipelines",
    "SVNIT Surat",
    "Machine Learning",
    "PHANTOM",
    "AegisAI",
    "StockSense India",
  ],
  authors: [{ name: "Vishal Murugadhas", url: siteUrl }],
  creator: "Vishal Murugadhas",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: seo.title,
    description: seo.description,
    siteName: "Vishal Murugadhas",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: seo.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  other: {
    image: `${siteUrl}/og-image.png`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="canonical" href={siteUrl} />
        {/* Explicit tags required by LinkedIn Post Inspector */}
        <meta name="image" property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:secure_url" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={seo.title} />
        <link rel="image_src" href={`${siteUrl}/og-image.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vishal Murugadhas",
              url: seo.url,
              email: "vishalmdhas@gmail.com",
              jobTitle: "ML / AI Engineer · Data Pipelines",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat",
              },
              description: seo.description,
              sameAs: [
                profiles.github.href,
                profiles.linkedin.href,
                profiles.leetcode.href,
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#090909] text-[#f7f9fa]">
        <PageBackground />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
