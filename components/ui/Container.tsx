import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div className={`portfolio-container ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
