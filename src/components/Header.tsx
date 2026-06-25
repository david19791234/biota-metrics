import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "../utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(246, 246, 244, 0.96)" : "rgba(246, 246, 244, 0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid var(--color-line-soft)" : "1px solid transparent",
        paddingTop: scrolled ? "16px" : isMobile ? "32px" : "64px",
        paddingBottom: scrolled ? "16px" : "0px",
      }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="wrap border-transparent">
        <div className="inline-flex flex-col items-start origin-top-left">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center gap-3 decoration-transparent">
            <motion.svg 
              animate={{ 
                scale: scrolled ? 0.8 : 1,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              width="26" height="28" viewBox="0 0 26 28" fill="none" aria-hidden="true" className="block origin-left"
            >
              <rect x="0" y="16" width="5" height="12" fill="var(--color-moss)" />
              <rect x="7" y="10" width="5" height="18" fill="var(--color-moss-deep)" />
              <rect x="14" y="4" width="5" height="24" fill="var(--color-ink)" />
              <rect x="21" y="0" width="5" height="28" fill="var(--color-rust)" />
            </motion.svg>
            <motion.span 
              animate={{
                fontSize: scrolled ? "18px" : "22px",
              }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-serif font-medium tracking-tight text-ink origin-left"
            >
              Biota Metrics
            </motion.span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
