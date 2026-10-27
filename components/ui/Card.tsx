import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: React.ReactNode;
}

export function Card({ children, className = "", glow, ...props }: CardProps) {
  return (
    <div className={`glass-card h-full ${className}`.trim()} {...props}>
      {glow}
      {children}
    </div>
  );
}
