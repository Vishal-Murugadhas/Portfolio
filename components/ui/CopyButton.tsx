"use client";

import { useState, ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  children?: ReactNode;
  className?: string;
}

export function CopyButton({ text, children, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handle}
      className={`btn btn-ghost inline-flex items-center gap-2 text-sm ${className ?? ""}`}
      aria-label={`Copy ${text} to clipboard`}
      title="Click to copy"
    >
      {children}
      {copied ? (
        <Check size={14} className="text-green-400" aria-hidden="true" />
      ) : (
        <Copy size={14} aria-hidden="true" />
      )}
    </button>
  );
}
