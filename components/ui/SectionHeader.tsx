import React from "react";

interface SectionHeaderProps {
  index: string; // e.g. "01 / 07"
  stamp: string; // e.g. "About"
  tagline: React.ReactNode; // e.g. <>Turning messy data into <em>systems people rely on.</em></>
  sub?: string;
  className?: string;
}

export function SectionHeader({
  index,
  stamp,
  tagline,
  sub,
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={`sh ${className}`.trim()}>
      <p className="sh__index">{index}</p>
      <h2 className="sh__stamp">{stamp}</h2>
      <p className="sh__tagline">{tagline}</p>
      {sub && <p className="sh__sub">{sub}</p>}
    </header>
  );
}
