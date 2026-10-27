"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink, Trophy, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects, Project, identity, profiles } from "@/data/content";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  featured,
  onOpenChange,
}: {
  project: Project;
  featured?: boolean;
  onOpenChange?: (id: string, isOpen: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const panelId = `${project.id}-details`;

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      onOpenChange?.(project.id, next);
      if (next) {
        requestAnimationFrame(() => {
          cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        });
      }
      return next;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      onOpenChange?.(project.id, false);
    }
  };

  return (
    <article
      ref={cardRef}
      className={cn("card project", (featured || project.featured) && "project--feature")}
      data-open={open}
      onKeyDown={handleKeyDown}
      style={{ padding: "40px", justifyContent: "space-between" }}
    >
      {/* PHANTOM violet bloom — 2nd permitted violet use */}
      {(featured || project.featured) && <div className="phantom-bloom" aria-hidden="true" />}

      <div>
        {/* Top: index + badge */}
        <div className="project__top">
          <span className="label-mono">PROJECT / {project.index}</span>
          {project.badge && (
            <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Trophy size={12} style={{ flexShrink: 0 }} />
              {project.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="project__title">{project.title}</h3>

        {/* Role */}
        {project.role && <p className="project__role">{project.role}</p>}

        {/* Description */}
        <p className="project__desc">{project.summary}</p>

        {/* Stats */}
        <div className="stats">
          {project.stats.map((s, idx) => (
            <div key={idx} className="stat">
              <div className="stat__n">{s.number}</div>
              <div className="stat__l">{s.caption}</div>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div className="chips">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions — pinned to bottom */}
      <div className="actions">
        <button
          type="button"
          className="btn btn--text"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={handleToggle}
        >
          {open ? "Hide details" : "Details"}
          <ChevronDown
            className="chev"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              aria-label={`${project.title} on GitHub`}
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Expandable in-place details panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            id={panelId}
            role="region"
            aria-label={`${project.title} details`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", flex: "none" }}
          >
            <div className="project__details">
              <section>
                <h4 className="label-mono details__title">Engineering highlights</h4>
                <ul className="details__list">
                  {project.bullets.map((h) => (
                    <li key={h}>{h.replace(/^[\s—–-]+/, "")}</li>
                  ))}
                </ul>
              </section>
              {/* Architecture / Telemetry: render ONLY if the project has that content; never an empty heading */}
              {(project as { architecture?: React.ReactNode }).architecture && (
                <section>
                  <h4 className="label-mono details__title">Architecture / Telemetry</h4>
                  <div>{(project as { architecture?: React.ReactNode }).architecture}</div>
                </section>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Ensure document.body.style.overflow is reset in case previous drawer set it
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  const handleOpenChange = (id: string, isOpen: boolean) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (isOpen) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="container-x">
        {/* Section header */}
        <header className="sh">
          <p className="sh__index">02 / 07</p>
          <h2 className="sh__stamp">PROJECTS</h2>
          <p className="sh__tagline">
            Things I&apos;ve <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>built.</em>
          </p>
          <p className="sh__sub">
            Real-world machine learning systems designed to catch critical events, process massive streaming
            telemetry, and orchestrate rapid response.
          </p>
        </header>

        {/* Projects grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* PHANTOM — full-width feature card */}
          <ProjectCard
            project={featured}
            featured
            onOpenChange={handleOpenChange}
          />

          {/* 2-col grid for remaining projects */}
          <div
            className="projects-grid"
            data-has-open={openIds.size > 0 ? "true" : "false"}
            style={{ marginTop: 0 }}
          >
            {rest.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenChange={handleOpenChange}
              />
            ))}
          </div>
        </div>

        {/* More on GitHub — centered ghost pill */}
        <div className="projects-more">
          <a
            href={profiles.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            More on GitHub
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
