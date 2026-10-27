"use client";

import { useState } from "react";
import { Check, Copy, Loader2, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/BrandIcons";
import { identity, contact, profiles } from "@/data/content";

type FormState = "idle" | "loading" | "success" | "activation_needed" | "error";

export default function Contact() {
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", _hp: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      /* fallback */
    }
  };

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Valid email address required";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._hp) return;
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormState("loading");

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/contact";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _hp: formData._hp,
        }),
      });

      const data = await res.json().catch(() => null);

      if (data?.needsActivation) {
        setFormState("activation_needed");
        return;
      }

      if (!res.ok || (data && data.success === false)) {
        throw new Error(data?.message || "Failed to transmit message");
      }

      setFormState("success");
      setFormData({ name: "", email: "", message: "", _hp: "" });
    } catch {
      setFormState("error");
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

          {/* Right: contact form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <input
              type="text"
              name="_hp"
              value={formData._hp}
              onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Name */}
            <div className="field">
              <label htmlFor="contact-name" className="label-mono">Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name or organization"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={formState === "loading"}
                className="input"
                aria-invalid={!!formErrors.name}
              />
              {formErrors.name && (
                <span className="label-mono" style={{ color: "#ff6b6b" }}>{formErrors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="field">
              <label htmlFor="contact-email" className="label-mono">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={formState === "loading"}
                className="input"
                aria-invalid={!!formErrors.email}
              />
              {formErrors.email && (
                <span className="label-mono" style={{ color: "#ff6b6b" }}>{formErrors.email}</span>
              )}
            </div>

            {/* Message */}
            <div className="field">
              <label htmlFor="contact-message" className="label-mono">Message</label>
              <textarea
                id="contact-message"
                rows={6}
                placeholder="Tell me about the engineering challenges or role you're looking to fill..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={formState === "loading"}
                className="input"
                style={{ minHeight: "176px", resize: "vertical" }}
                aria-invalid={!!formErrors.message}
              />
              {formErrors.message && (
                <span className="label-mono" style={{ color: "#ff6b6b" }}>{formErrors.message}</span>
              )}
            </div>

            {/* Submit — btn--action (NOT violet) */}
            <button
              type="submit"
              disabled={formState === "loading"}
              className="btn btn--action"
              style={{ width: "100%", justifyContent: "center", whiteSpace: "nowrap" }}
            >
              {formState === "loading" ? (
                <>
                  <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                  Transmitting…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            {formState === "success" && (
              <p className="label-mono" style={{ marginTop: "12px", color: "var(--fg-soft)", lineHeight: 1.5 }}>
                ✓ Message transmitted successfully! Delivered directly to {identity.email}.
              </p>
            )}
            {formState === "activation_needed" && (
              <div style={{ marginTop: "14px", padding: "14px 16px", borderRadius: "10px", background: "rgba(225,189,255,0.08)", border: "1px solid rgba(225,189,255,0.25)" }}>
                <p className="label-mono" style={{ margin: "0 0 6px", color: "var(--fg)" }}>
                  ⚠️ One-Time Activation Needed
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
                  FormSubmit sent a confirmation email to <strong>{identity.email}</strong> with an &quot;Activate Form&quot; button. Please open that email and click the button once to start receiving all portfolio messages directly in your Gmail!
                </p>
              </div>
            )}
            {formState === "error" && (
              <div style={{ marginTop: "14px", padding: "14px 16px", borderRadius: "10px", background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.25)" }}>
                <p className="label-mono" style={{ margin: "0 0 8px", color: "#ff6b6b" }}>
                  Transmission failed.
                </p>
                <a
                  href={`mailto:${identity.email}?subject=Contact from ${encodeURIComponent(formData.name || "Portfolio")}&body=${encodeURIComponent(formData.message || "")}`}
                  className="btn btn--outline"
                  style={{ display: "inline-flex", fontSize: "12px", padding: "8px 14px", borderRadius: "9999px" }}
                >
                  Send via Mail App <ArrowRight size={13} style={{ marginLeft: "4px" }} />
                </a>
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
