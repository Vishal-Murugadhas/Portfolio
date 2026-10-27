"use client";

import { useEffect, useState } from "react";
import { Plus, ArrowUp } from "lucide-react";

export function CoordinateFooter() {
  const [suratTime, setSuratTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setSuratTime(t);
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      className="footer"
      style={{ background: "transparent" }}
      aria-label="Coordinate footer"
    >
      <div className="container-x">
        {/* Row 1 */}
        <div className="footer__row">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: "1px solid var(--line-strong)",
                display: "grid",
                placeItems: "center",
                color: "var(--fg)",
                flexShrink: 0,
              }}
            >
              <Plus size={12} />
            </span>
            <span style={{ color: "var(--fg)", fontWeight: 500 }}>Open to internships</span>
            <span style={{ color: "var(--ash)" }}>/</span>
            <span className="label-mono">ML · AI · Data</span>
          </div>

          <div className="footer__coord" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "var(--fg-soft)" }}>21.1702° N, 72.8311° E</span>
            <span style={{ color: "var(--ash)" }}>·</span>
            <span style={{ color: "var(--steel)", fontVariantNumeric: "tabular-nums" }}>
              {/* Guard against hydration by only rendering the clock after mount */}
              SURAT {mounted ? (suratTime || "00:00:00") : "00:00:00"} IST
            </span>
            {/* White heart — NOT violet */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="var(--fg)"
              fillOpacity="0.4"
              stroke="var(--fg)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>

        {/* Row 2 */}
        <div className="footer__row">
          <span>© 2026 Vishal Murugadhas · Built with Next.js</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: "var(--steel)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--steel)")}
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
