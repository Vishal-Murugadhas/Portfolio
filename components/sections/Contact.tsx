"use client";

import { useState } from "react";
import { Check, Copy, ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/BrandIcons";
import { identity, contact, profiles } from "@/data/content";

export default function Contact() {
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      /* fallback */
    }
  };

  return (
    <section id="contact" className="section" aria-label="Contact Section">
      <div className="container-x">
        {/* Section header */}
        <header className="sh">
          <p className="sh__index">07 / 07</p>
          <h2 className="sh__stamp">CONTACT</h2>
          <p className="sh__tagline">
            Let&apos;s build something <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>that matters.</em>
          </p>
          <p className="sh__sub">{contact.subline}</p>
        </header>

        {/* 2-col grid */}
        <div className="contact-grid">
          {/* Left: direct channels + profiles */}
          <div>
            {/* Email copy row */}
            <div className="copy-row">
              <div>
                <span className="label-mono" style={{ display: "block", marginBottom: "6px" }}>Email</span>
                <span className="copy-row__v">{identity.email}</span>
              </div>
              <button
                onClick={() => copyToClipboard(identity.email, "email")}
                className="icon-btn"
                aria-label="Copy email address"
              >
                {copiedType === "email" ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>

            {/* Phone copy row */}
            <div className="copy-row">
              <div>
                <span className="label-mono" style={{ display: "block", marginBottom: "6px" }}>Phone</span>
                <span className="copy-row__v">{identity.phone}</span>
              </div>
              <button
                onClick={() => copyToClipboard(identity.phone, "phone")}
                className="icon-btn"
                aria-label="Copy phone number"
              >
                {copiedType === "phone" ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>

            {/* Copy toast */}
            {copiedType && (
              <p className="label-mono" style={{ marginTop: "8px", color: "var(--fg-soft)" }}>
                ✓ Copied {copiedType} to clipboard
              </p>
            )}

            {/* Profile links — icon left of label, on one line */}
            <div className="profiles">
              <a
                href={profiles.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
              <a
                href={profiles.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <LinkedinIcon size={14} />
                LinkedIn
              </a>
              <a
                href={profiles.leetcode.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                aria-label="LeetCode profile (opens in a new tab)"
              >
                <LeetcodeIcon size={14} />
                LeetCode
              </a>
            </div>
          </div>

          {/* Right: zero-maintenance direct mailto action card */}
          <div
            className="card"
            style={{
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "32px",
            }}
          >
            <div>
              <span className="label-mono" style={{ display: "block", marginBottom: "12px", color: "var(--steel)" }}>
                DIRECT MESSAGE
              </span>
              <h3 style={{ fontSize: "24px", fontWeight: 400, color: "var(--fg)", margin: "0 0 16px", lineHeight: 1.3 }}>
                Start a conversation.
              </h3>
              <p style={{ fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>
                I&apos;m actively seeking ML/AI and data engineering internship opportunities for 2026. Whether you have an open role, an engineering problem to discuss, or just want to connect, my inbox is open.
              </p>
            </div>

            <div>
              <a
                href={`mailto:${identity.email}?subject=ML%20Engineering%20Inquiry%20%E2%80%94%20Vishal%20Murugadhas`}
                className="btn btn--action"
                style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
              >
                <Mail size={16} />
                Send Email to {identity.email}
                <ArrowRight size={15} />
              </a>
              <p className="label-mono" style={{ marginTop: "12px", color: "var(--steel)", textAlign: "center", fontSize: "11px" }}>
                Opens your default email client · Zero accounts or trackers needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
