"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { AnimatedNavFramer, navItems } from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Close mobile overlay on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      {/* 1px violet scroll progress line at the very top of viewport (Task D.3 #2) */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress, background: "#af50ff" }}
      />

      {/* Floating animated pill navigation */}
      <AnimatedNavFramer onOpenMobileMenu={() => setMobileOpen(true)} />

      {/* Mobile overlay menu (< 1100px) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] flex flex-col justify-between p-8 sm:p-12"
            style={{
              background: "rgba(9,9,9,0.96)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Top header row inside mobile overlay */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--line)]">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--steel)]">
                NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--fg)] hover:bg-[rgba(247,249,250,0.08)] transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Links list */}
            <nav className="flex flex-col gap-5 my-auto" aria-label="Mobile links">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-base uppercase tracking-[0.16em] text-[var(--steel)] hover:text-[var(--fg)] transition-colors py-1"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Bottom action: Download Resume */}
            <div className="pt-6 border-t border-[var(--line)]">
              <a
                href="/Resume_U24EC007_Vishal_Murugadhas.pdf"
                download="Resume_U24EC007_Vishal_Murugadhas.pdf"
                onClick={() => setMobileOpen(false)}
                className="btn btn--outline w-full py-4 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                style={{ borderRadius: "var(--r-btn)" }}
              >
                Download Resume <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
