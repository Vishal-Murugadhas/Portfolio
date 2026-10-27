"use client";

import { skillsRows, marqueeSkills } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Double the list for seamless marquee loop
const MARQUEE_ITEMS = [...marqueeSkills, ...marqueeSkills];

export default function Skills() {
  return (
    <section id="skills" className="section" aria-label="Skills">
      <div className="container-x">
        <SectionHeader
          index="05 / 07"
          stamp="SKILLS"
          tagline={
            <>
              Tools of the <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>craft.</em>
            </>
          }
          sub="Specialized stack across machine learning modeling, streaming data pipelines, and production services."
        />

        {/* 5 Hairline rows */}
        <div style={{ borderBottom: "1px solid var(--line)" }}>
          {skillsRows.map((row, idx) => (
            <div key={idx} className="skill-row">
              <div className="label-mono skill-row__label">{row.category}</div>
              <div className="chips">
                {row.skills.map((skill) => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edge-masked marquee — overflow:hidden on the wrapper prevents G1 */}
      <div
        className="marquee"
        style={{ marginTop: "64px", maxWidth: "100%", overflow: "hidden" }}
        aria-hidden="true"
      >
        <div className="marquee__track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="marquee__item chip">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
