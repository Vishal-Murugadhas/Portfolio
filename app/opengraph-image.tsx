import { ImageResponse } from "next/og";
import { seo, identity } from "@/data/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#090909",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Violet radial bloom in corner */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(175, 80, 255, 0.22) 0%, transparent 70%)",
          }}
        />

        {/* Status Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(247, 249, 250, 0.05)",
              border: "1px solid rgba(247, 249, 250, 0.16)",
              color: "#f0f0f0",
              fontSize: "13px",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            {`● ${identity.statusBadge}`}
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: 300,
            color: "#f7f9fa",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {identity.name}
        </div>

        {/* Role */}
        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: "#828384",
            fontFamily: "monospace",
            marginBottom: "32px",
          }}
        >
          {identity.roleLine}
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "17px",
            color: "#828384",
            maxWidth: "700px",
            lineHeight: 1.6,
          }}
        >
          SVNIT Surat · CGPA 8.95 · 2nd Place, PSB Hackathon (450+ teams)
        </div>

        {/* URL */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "14px",
            color: "#af50ff",
            fontFamily: "monospace",
          }}
        >
          {seo.url}
        </div>
      </div>
    ),
    size
  );
}
