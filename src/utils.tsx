import React, { ReactNode } from "react";
import { motion } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -4% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function smoothScroll(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");
  if (href && href.startsWith("#")) {
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (target) {
      // Matches scroll-padding-top in index.css so the heading clears the fixed
      // (docked) header (~56px) with a little air. Keep the two values in sync.
      const HEADER_OFFSET = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      // An explicit scrollTo behavior bypasses the CSS reduced-motion reset, so
      // honour the preference here too.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    }
  }
}
