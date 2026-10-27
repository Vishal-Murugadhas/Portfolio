"use client";

// @ts-nocheck — vendored CircularCarousel JSX, ignoring TS on imports
import { useCallback, useEffect, useMemo, useState } from "react";
import CircularCarousel from "@/components/ui/CircularCarousel";
import { achievementCards, CARD_ASPECT, CardDef } from "@/lib/achievementCards";
import { X } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

function useCarouselSize() {
  const [w, setW] = useState(1280);
  useEffect(() => {
    const u = () => setW(window.innerWidth);
    u();
    window.addEventListener("resize", u);
    return () => window.removeEventListener("resize", u);
  }, []);
  if (w >= 1536) return { cardWidth: 480, height: 640 };
  if (w >= 1280) return { cardWidth: 420, height: 580 };
  if (w >= 1024) return { cardWidth: 360, height: 520 };
  if (w >= 768) return { cardWidth: 300, height: 460 };
  return { cardWidth: 280, height: 440 };
}

function AchievementModal({ card, onClose }: { card: CardDef; onClose: () => void }) {
  // Close on Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--gutter)",
        background: "rgba(9,9,9,.85)",
        backdropFilter: "blur(12px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="card"
        style={{
          maxWidth: "560px",
          width: "100%",
          padding: "40px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          className="icon-btn"
          style={{ position: "absolute", top: "20px", right: "20px" }}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Card artwork */}
        {card.src && (
          <img
            src={card.src}
            alt={card.alt}
            style={{
              width: "100%",
              maxWidth: "480px",
              borderRadius: "12px",
              marginBottom: "28px",
              display: "block",
            }}
          />
        )}

        {/* Label + year */}
        <div style={{ marginBottom: "12px" }} className="label-mono">
          {card.label.toUpperCase()}{card.year ? ` · ${card.year}` : ""}
        </div>

        {/* Title */}
        <h2
          style={{
            fontWeight: 300,
            fontSize: "clamp(28px, 3vw, 40px)",
            lineHeight: 1.15,
            letterSpacing: "-.02em",
            margin: "0 0 16px",
          }}
        >
          {card.title}
        </h2>

        {/* Detail */}
        <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>
          {card.detail}
        </p>
      </div>
    </div>
  );
}

export default function Achievements() {
  const size = useCarouselSize();
  const [open, setOpen] = useState<number | null>(null);
  const onItemClick = useCallback((_: unknown, i: number) => setOpen(i), []);

  const items = useMemo(
    () =>
      achievementCards.map((c) => ({
        src: c.src!,
        alt: c.alt,
        title: c.title,
        subtitle: c.subtitle,
      })),
    []
  );

  // Reduced-motion
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section id="achievements" className="section" aria-label="Achievements">
      {/* Header — inside container */}
      <div className="container-x">
        <SectionHeader
          index="03 / 07"
          stamp="ACHIEVEMENTS"
          tagline={
            <>
              Wins &amp; <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>milestones.</em>
            </>
          }
          sub="A track record of high-stakes hackathon wins, top academic rank, and engineering leadership."
        />
      </div>

      {/* Carousel — full bleed, no container */}
      <div className="achievements__stage" style={{ overflow: "hidden" }}>
        <div style={{ width: "100%", height: size.height, position: "relative" }}>
          {items.length > 0 && (
            <CircularCarousel
              items={items}
              preset="cylinder"
              intro={reduced ? "none" : "rise"}
              cardWidth={size.cardWidth}
              aspectRatio={CARD_ASPECT}
              gap={32}
              tilt={-4}
              perspective={2800}
              autoplay={reduced ? "off" : "drift"}
              speed={8}
              pauseOnHover
              draggable
              snap
              focusOnClick
              depthFade={0.4}
              innerShade={0.35}
              fadeColor="#090909"
              cornerRadius={20}
              parallax={reduced ? 0 : 0.25}
              stretch={0.3}
              captions
              onItemClick={onItemClick}
            />
          )}
        </div>

        <p className="label-mono achievements__hint">Drag · Click a card</p>
      </div>

      {/* Modal */}
      {open !== null && (
        <AchievementModal card={achievementCards[open]} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
