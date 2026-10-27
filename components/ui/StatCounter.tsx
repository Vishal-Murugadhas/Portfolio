"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export function StatCounter({ value, suffix = "", decimals = 0, label }: StatCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(parseFloat(current.toFixed(decimals)));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value, decimals]);

  const formatted = display.toFixed(decimals);

  return (
    <div ref={ref} className="text-left" aria-label={`${value}${suffix} ${label}`}>
      <div className="text-2xl sm:text-3xl font-light text-[#f7f9fa] tracking-tight tabular-nums">
        <span>{formatted}</span>
        <span className="text-[#828384] text-lg ml-0.5">{suffix}</span>
      </div>
      <p className="text-[11px] font-mono uppercase tracking-wider text-[#828384] mt-1 leading-snug">
        {label}
      </p>
    </div>
  );
}
