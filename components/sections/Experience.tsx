"use client";

import { experience } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="section" aria-label="Experience and Leadership">
      <div className="container-x">
        <SectionHeader
          index="04 / 07"
          stamp="EXPERIENCE"
          tagline={
            <>
              Leadership &amp; <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>contributions.</em>
            </>
          }
          sub="Directing community initiatives, mentoring emerging machine learning developers, and leading technical teams."
        />

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            paddingLeft: "40px",
            display: "grid",
            gap: "56px",
            maxWidth: "720px",
          }}
        >
          {/* Vertical hairline */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "5px",
              top: "8px",
              bottom: "8px",
              width: "1px",
              background: "var(--line-strong)",
            }}
          />

          {experience.map((item, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              {/* Node dot */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-40px",
                  top: "6px",
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  background: item.current ? "var(--fg)" : "var(--bg)",
                  border: "1px solid var(--fg)",
                }}
              />

              {/* Date */}
              <p className="label-mono" style={{ marginBottom: "12px" }}>
                {item.period}
              </p>

              {/* Title */}
              <h3
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  lineHeight: 1.2,
                  letterSpacing: "-.01em",
                  margin: "0 0 6px",
                }}
              >
                {item.title}
              </h3>

              {/* Org */}
              <p style={{ color: "var(--steel)", margin: "0 0 16px", fontSize: "14px" }}>
                {item.org}
              </p>

              {/* Description */}
              <p
                style={{
                  maxWidth: "62ch",
                  margin: 0,
                  color: "var(--fg-muted)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
