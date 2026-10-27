"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";

export const navItems = [
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Achievements", id: "achievements" },
  { name: "Experience", id: "experience" },
  { name: "Skills", id: "skills" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

const COLLAPSE_AFTER = 48; // was 150: collapse as soon as the user clearly scrolls down
const COLLAPSE_DISTANCE = 12; // px of downward scroll before it reacts (ignores jitter)
const EXPAND_AFTER_UP = 48; // px scrolled back up that re-expands it
const ALWAYS_EXPANDED_BELOW = 24; // at the very top it is always expanded
const CIRCLE = 48;
// One spring for both width and x. Critically damped: settles in about 0.3s with no wobble.
const MOVE = { type: "spring", stiffness: 420, damping: 38, mass: 0.8 } as const;

const useIsoLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/** Viewport info read synchronously before paint, so the nav never mounts in the wrong place and glides. */
function useViewport() {
  const [s, set] = React.useState({ ready: false, vw: 0, isDesktop: false });
  useIsoLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px)");
    const read = () => set({ ready: true, vw: document.documentElement.clientWidth, isDesktop: mq.matches });
    read();
    const ro = new ResizeObserver(read); // also catches the scrollbar appearing/disappearing
    ro.observe(document.documentElement);
    mq.addEventListener("change", read);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", read);
    };
  }, []);
  return s;
}

/** Highlights the section currently in view. Hero active = no link highlighted. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState<string | null>(null);
  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (e.target.id === "hero") {
              setActive(null);
            } else {
              setActive(e.target.id);
            }
          }
        }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    const hero = document.getElementById("hero");
    if (hero) io.observe(hero);
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function AnimatedNavFramer({ onOpenMobileMenu }: { onOpenMobileMenu?: () => void }) {
  const reduce = useReducedMotion();
  const { ready, vw, isDesktop } = useViewport();
  const [isExpanded, setExpanded] = React.useState(true);
  const expanded = isDesktop && isExpanded; // below 1100px it is always the circle
  const active = useActiveSection(navItems.map((i) => i.id));

  const { scrollY } = useScroll();
  const lastY = React.useRef(0);
  const dir = React.useRef<1 | -1>(1);
  const startY = React.useRef(0); // where the current scroll direction began

  useMotionValueEvent(scrollY, "change", (y) => {
    const dy = y - lastY.current;
    if (dy !== 0) {
      const d: 1 | -1 = dy > 0 ? 1 : -1;
      if (d !== dir.current) {
        dir.current = d;
        startY.current = lastY.current;
      }
      if (y < ALWAYS_EXPANDED_BELOW) setExpanded(true);
      else if (d === 1 && y > COLLAPSE_AFTER && y - startY.current > COLLAPSE_DISTANCE) setExpanded(false);
      else if (d === -1 && startY.current - y > EXPAND_AFTER_UP) setExpanded(true);
    }
    lastY.current = y;
  });

  if (!ready) return null; // all hooks are above this line

  const side = isDesktop ? 24 : 16; // distance of the circle from the top-right corner
  // The wrapper is centered, so moving the circle to the right edge is a pure x offset.
  const collapsedX = Math.max(0, vw / 2 - side - CIRCLE / 2);
  const fade = reduce ? { duration: 0 } : { duration: expanded ? 0.2 : 0.08, delay: expanded ? 0.06 : 0 };

  return (
    <motion.div
      className="fnav-wrap"
      initial={reduce ? false : { y: -80, opacity: 0 }} // entrance only; separate from the collapse animation
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 18, stiffness: 250 }}
    >
      <motion.nav
        className="fnav"
        aria-label="Primary"
        initial={false}
        animate={expanded ? { width: "auto", x: 0 } : { width: CIRCLE, x: collapsedX }}
        transition={reduce ? { duration: 0 } : MOVE}
        whileHover={!expanded && !reduce ? { scale: 1.08 } : undefined}
        whileTap={!expanded && !reduce ? { scale: 0.95 } : undefined}
      >
        {/* Content fades out in 80ms the moment it collapses, while the width and x animate at the same time. No stagger, no waiting. */}
        <motion.div
          className="fnav__inner"
          aria-hidden={!expanded}
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={fade}
          style={{ pointerEvents: expanded ? "auto" : "none" }}
        >
          <a href="#" className="fnav__logo" aria-label="Back to top" tabIndex={expanded ? 0 : -1}>
            VM
          </a>
          <div className="fnav__links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="fnav__link"
                tabIndex={expanded ? 0 : -1}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/Resume_U24EC007_Vishal_Murugadhas.pdf"
              download="Resume_U24EC007_Vishal_Murugadhas.pdf"
              className="btn btn--outline fnav__resume"
              tabIndex={expanded ? 0 : -1}
            >
              Resume <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="fnav__menu-icon"
          aria-hidden
          animate={{ opacity: expanded ? 0 : 1, scale: expanded ? 0.8 : 1 }}
          transition={reduce ? { duration: 0 } : { duration: 0.15, delay: expanded ? 0 : 0.06 }}
        >
          <Menu size={22} />
        </motion.div>

        {!expanded && (
          <button
            type="button"
            className="fnav__menu-btn"
            aria-label="Open navigation"
            aria-expanded={false}
            onClick={() => (isDesktop ? setExpanded(true) : onOpenMobileMenu?.())}
          />
        )}
      </motion.nav>
    </motion.div>
  );
}

export default AnimatedNavFramer;
