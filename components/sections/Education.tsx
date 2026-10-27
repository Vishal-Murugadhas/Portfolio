"use client";

import { education } from "@/data/content";
import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Education() {
  return (
    <section id="education" className="section" aria-label="Education">
      <div className="container-x">
        <SectionHeader
          index="06 / 07"
          stamp="EDUCATION"
          tagline={
            <>
              Academic <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>foundation.</em>
            </>
          }
          sub="Formal engineering training with a focus on communication, data and computation."
        />

        {/* 2-column grid — edu-grid */}
        <div className="edu-grid">
          {education.map((item, idx) => (
            <div key={idx} className="card" style={{ padding: "40px" }}>
              {/* Head: icon circle + date */}
              <div className="edu__head">
                <div className="icon-circle">
                  <GraduationCap size={20} color="var(--fg)" />
                </div>
                <span className="label-mono">{item.period}</span>
              </div>

              {/* Institution */}
              <h3 className="edu__title">{item.school}</h3>

              {/* Programme */}
              <p className="edu__prog">{item.degree}</p>

              {/* Score pill — pinned to bottom */}
              <div className="edu__foot">
                <span className="pill" style={{ display: "inline-flex" }}>
                  {item.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
