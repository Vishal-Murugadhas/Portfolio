"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

function CountUp({ target, suffix, decimals }: { target: number; suffix: string; decimals: number }) {
  const [value, setValue] = useState(target);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setValue(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setValue(parseFloat((ease * target).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <div ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </div>
  );
}

function renderMarkdownText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "var(--fg)", fontWeight: 500 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function About() {
  return (
    <section id="about" className="section" aria-label="About Vishal">
      <div className="container-x">
        <SectionHeader
          index="01 / 07"
          stamp="ABOUT"
          tagline={
            <>
              Turning messy data into <em>systems people rely on.</em>
            </>
          }
        />

        {/* 2-col grid */}
        <div className="about-grid">
          {/* Left: paragraphs */}
          <div className="about-copy">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{renderMarkdownText(p)}</p>
            ))}
          </div>

          {/* Right: Current Status card */}
          <div>
            <div className="card about-status">
              {/* Card header */}
              <div className="about-status__head">
                <span className="label-mono">CURRENT STATUS</span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--fg)",
                    display: "inline-block",
                  }}
                />
              </div>

              {/* KV rows */}
              {about.currently.map((item, idx) => (
                <div key={idx} className="kv">
                  <span className="label-mono">{item.label}</span>
                  <span className="kv__v">{item.value}</span>
                </div>
              ))}

              {/* Stat mini-grid */}
              <div className="stat-grid">
                {about.statsMiniGrid.map((stat, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontWeight: 300,
                        fontSize: "clamp(26px, 3vw, 36px)",
                        lineHeight: 1,
                        letterSpacing: "-.03em",
                        color: "var(--fg)",
                      }}
                    >
                      <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                    </div>
                    <div className="label-mono" style={{ marginTop: "8px" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
