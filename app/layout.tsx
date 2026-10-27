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

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
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
  authors: [{ name: "Vishal Murugadhas", url: seo.url }],
  creator: "Vishal Murugadhas",
  openGraph: {
    type: "website",
    url: seo.url,
    title: seo.title,
    description: seo.description,
    siteName: "Vishal Murugadhas",
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="canonical" href={seo.url} />
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
