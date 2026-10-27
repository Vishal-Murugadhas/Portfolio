"use client";

import { Plane, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/BrandIcons";
import { identity, hero, profiles } from "@/data/content";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingBlock: "calc(var(--nav-h) + 56px) 96px",
      }}
    >

      <div className="container-x" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero__grid">
          {/* ── Left column: copy ── */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Status pill */}
            <div style={{ marginBottom: "24px" }}>
              <span
                className="pill"
                style={{ display: "inline-flex" }}
              >
                <span className="pill__dot" />
                {identity.statusBadge}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ margin: "0 0 24px" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(56px, 7.6vw, 112px)",
                  lineHeight: 0.92,
                  letterSpacing: "-.03em",
                  color: "var(--fg)",
                }}
              >
                {hero.italicLead}
              </span>
              <span
                style={{
                  display: "block",
                  fontWeight: 400,
                  fontSize: "clamp(34px, 4.4vw, 60px)",
                  lineHeight: 1.1,
                  letterSpacing: "-.035em",
                  color: "var(--fg)",
                  marginTop: "8px",
                }}
              >
                {hero.mainLine}
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                maxWidth: "46ch",
                fontWeight: 300,
                fontSize: "clamp(17px, 1.6vw, 20px)",
                color: "var(--fg-muted)",
                margin: "0 0 40px",
                lineHeight: 1.6,
              }}
            >
              {hero.subhead}
            </p>

            {/* CTA row */}
            <div className="btn-row" style={{ marginBottom: "32px" }}>
              {/* ONLY violet-filled button on site */}
              <a
                href={hero.ctaPrimary.href}
                className="btn btn--primary"
              >
                {hero.ctaPrimary.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
              </a>

              <a
                href={hero.ctaSecondary.href}
                download="Resume_U24EC007_Vishal_Murugadhas.pdf"
                className="btn btn--ghost"
              >
                {hero.ctaSecondary.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href={profiles.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href={profiles.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <LinkedinIcon size={17} />
              </a>
              <a
                href={profiles.leetcode.href}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LeetCode profile (opens in a new tab)"
              >
                <LeetcodeIcon size={17} />
              </a>
              <a
                href={profiles.email.href}
                className="icon-btn"
                aria-label="Email Vishal directly"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* ── Right column: Boarding Pass ── */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 64px",
                border: "1px solid var(--line-strong)",
                borderRadius: "var(--r-card)",
                background: "var(--glass)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                overflow: "hidden",
                animation: "bp-float 6s ease-in-out infinite",
              }}
            >
              {/* Main content column */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div
                  style={{
                    padding: "20px 28px",
                    borderBottom: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Plane size={14} color="var(--steel)" />
                    <span
                      style={{
                        font: "400 10px/1 var(--font-mono)",
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: "var(--fg-soft)",
                      }}
                    >
                      BOARDING PASS
                    </span>
                  </div>
                </div>

                {/* Route */}
                <div
                  style={{
                    padding: "20px 28px",
                    borderBottom: "1px solid var(--line)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "block",
                        font: "400 10px/1 var(--font-mono)",
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "var(--steel)",
                        marginBottom: "8px",
                      }}
                    >
                      ORIGIN
                    </span>
                    <span
                      style={{
                        font: "500 14px/1.3 var(--font-mono)",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "var(--fg)",
                      }}
                    >
                      {hero.boardingPass.origin}
                    </span>
                  </div>
                  <span style={{ color: "var(--fg)", fontSize: "18px" }}>→</span>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "block",
                        font: "400 10px/1 var(--font-mono)",
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "var(--steel)",
                        marginBottom: "8px",
                      }}
                    >
                      DESTINATION
                    </span>
                    <span
                      style={{
                        font: "500 14px/1.3 var(--font-mono)",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "var(--fg)",
                      }}
                    >
                      {hero.boardingPass.destination}
                    </span>
                  </div>
                </div>

                {/* Passenger */}
                <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--line)" }}>
                  <span
                    style={{
                      display: "block",
                      font: "400 10px/1 var(--font-mono)",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "var(--steel)",
                      marginBottom: "8px",
                    }}
                  >
                    PASSENGER / CANDIDATE
                  </span>
                  <span
                    style={{
                      fontWeight: 300,
                      fontSize: "clamp(22px, 2.8vw, 32px)",
                      letterSpacing: "-.02em",
                      lineHeight: 1.1,
                      color: "var(--fg)",
                    }}
                  >
                    {identity.name}
                  </span>
                </div>

                {/* Stats row — dashed border top */}
                <div
                  style={{
                    padding: "20px 28px",
                    borderTop: "1px dashed var(--line-strong)",
                    borderBottom: "1px solid var(--line)",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                  }}
                >
                  {[
                    { label: "CGPA", value: hero.boardingPass.cgpa },
                    { label: "HACKATHON", value: hero.boardingPass.hackathon },
                    { label: "LEADERSHIP", value: hero.boardingPass.leadership },
                  ].map((s) => (
                    <div key={s.label}>
                      <span
                        style={{
                          display: "block",
                          font: "400 10px/1 var(--font-mono)",
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          color: "var(--steel)",
                          marginBottom: "6px",
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        style={{
                          font: "400 13px/1.3 var(--font-mono)",
                          color: "var(--fg-soft)",
                        }}
                      >
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer line */}
                <div style={{ padding: "16px 28px" }}>
                  <span
                    style={{
                      font: "400 11px/1.4 var(--font-mono)",
                      letterSpacing: ".14em",
                      color: "var(--steel)",
                      wordBreak: "break-word",
                    }}
                  >
                    ELECTRONIC FLIGHT TICKET · SURAT
                  </span>
                </div>
              </div>

              {/* Barcode column */}
              <div
                style={{
                  borderLeft: "1px dashed var(--line-strong)",
                  margin: "20px 0",
                  padding: "0 16px",
                  background: `repeating-linear-gradient(
                    to bottom,
                    rgba(247,249,250,.8) 0 2px,
                    transparent 2px 5px,
                    rgba(247,249,250,.8) 5px 6px,
                    transparent 6px 11px,
                    rgba(247,249,250,.8) 11px 14px,
                    transparent 14px 17px
                  ) content-box`,
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr);
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .hero__grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 520px) {
          .hero__grid > div:last-child > div { grid-template-columns: 1fr !important; }
          .hero__grid > div:last-child > div > div:last-child { display: none !important; }
        }
        @keyframes bp-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes bp-float { 0%, 100% { transform: none; } }
        }
      `}</style>
    </section>
  );
}
