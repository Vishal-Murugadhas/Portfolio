import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

// 1. Single Violet-filled Pill (Hero "View Projects")
export function FilledVioletPill({
  children,
  className = "",
  href,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`btn-violet-pill ${className}`.trim()}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`btn-violet-pill ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

// 2. Pill Ghost Button (Hero "Download Resume", "More on GitHub")
export function PillGhostButton({
  children,
  className = "",
  href,
  download,
  target,
  rel,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={`btn-pill-ghost ${className}`.trim()}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={`btn-pill-ghost ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

// 3. Filled Action Button (Nav "Resume", Contact Form submit)
export function FilledActionButton({
  children,
  className = "",
  href,
  download,
  target,
  rel,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={`btn-action-filled ${className}`.trim()}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={`btn-action-filled ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

// 4. Compact Outlined Button (Project card GitHub/Demo, Contact socials)
export function CompactOutlinedButton({
  children,
  className = "",
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`btn-compact-outlined ${className}`.trim()}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={`btn-compact-outlined ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
