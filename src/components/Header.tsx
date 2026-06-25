import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { BiotaMark } from "./Logo";

// Scroll distance (px) over which the masthead condenses to the docked bar.
const RANGE = 190;
// Aspect ratio of the full mark (viewBox 250×176).
const FULL_RATIO = 250 / 176;
// Match Tailwind's md breakpoint so the masthead's mobile/desktop sizing flips
// at the same width as the hero's md: top-padding clearance (avoids a band
// where a desktop-sized masthead overlaps the mobile-padded hero).
const MOBILE_Q = "(max-width: 767px)";
const REDUCE_Q = "(prefers-reduced-motion: reduce)";
const mql = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;

export function Header() {
  // Initialise from the media queries so the first paint is already correct
  // (no desktop→mobile size jump on load).
  const [isMobile, setIsMobile] = useState(() => mql(MOBILE_Q));
  const [reduce, setReduce] = useState(() => mql(REDUCE_Q));

  useEffect(() => {
    const listen = (q: string, set: (v: boolean) => void) => {
      const m = window.matchMedia(q);
      const update = () => set(m.matches);
      update();
      m.addEventListener("change", update);
      return () => m.removeEventListener("change", update);
    };
    const a = listen(MOBILE_Q, setIsMobile);
    const b = listen(REDUCE_Q, setReduce);
    return () => { a(); b(); };
  }, []);

  const { scrollY } = useScroll();

  // A generous flower masthead up top that condenses to a compact bar on scroll.
  const topMark = isMobile ? 56 : 88;
  const topWord = isMobile ? 27 : 38;
  const topPad = isMobile ? 22 : 40;

  // Chrome: paper background, blur and a hairline fade in as you leave the top.
  const bgOpacity = useTransform(scrollY, [10, 70], [0, 0.96], { clamp: true });
  const backgroundColor = useMotionTemplate`rgba(246, 246, 244, ${bgOpacity})`;
  const blur = useTransform(scrollY, [10, 70], [0, 12], { clamp: true });
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const borderOpacity = useTransform(scrollY, [10, 70], [0, 0.085], { clamp: true });
  const borderColor = useMotionTemplate`rgba(17, 17, 17, ${borderOpacity})`;

  // Spacing condenses with scroll.
  const paddingTop = useTransform(scrollY, [0, RANGE], [topPad, 13], { clamp: true });
  const paddingBottom = useTransform(scrollY, [0, RANGE], [0, 13], { clamp: true });

  // Logo: the full five-flower mark up top, condensing then cross-fading into
  // the compact mark as the bar docks. Width and opacity share ONE scroll
  // window so they cross at the same instant (a mismatch causes a double image).
  // The fade happens once the flowers have shrunk past where the petals read.
  const markHeight = useTransform(scrollY, [0, RANGE], [topMark, 22], { clamp: true });
  const mix = useTransform(scrollY, [100, 135], [0, 1], { clamp: true }); // 0 full, 1 compact
  const markWidth = useTransform([markHeight, mix], ([h, m]: number[]) => h * (FULL_RATIO * (1 - m) + m));
  const fullOpacity = useTransform(scrollY, [100, 135], [1, 0], { clamp: true });
  const compactOpacity = useTransform(scrollY, [100, 135], [0, 1], { clamp: true });

  // Wordmark shrinks its own box (font-size, not transform) so the header height
  // truly condenses. Cheap reflow — the header is fixed and isolated.
  const fontSize = useTransform(scrollY, [0, RANGE], [topWord, 18], { clamp: true });

  // The masthead's only motion is this scroll-coupled resize, which the user
  // drives directly (AA-acceptable under reduced motion). The genuinely jarring
  // motion — the page-scale smooth scroll on logo click — IS suppressed below.
  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        borderBottom: "1px solid",
        borderBottomColor: borderColor,
        paddingTop,
        paddingBottom,
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="wrap">
        {/* items-baseline puts the mark's ground line on the wordmark's baseline:
            the flowers grow from the line the text sits on. */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }}
          className="inline-flex items-baseline gap-3 decoration-transparent rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-moss-deep focus-visible:ring-offset-2"
        >
          <motion.div
            style={{ height: markHeight, width: markWidth }}
            className="relative block shrink-0 self-baseline"
            aria-hidden="true"
          >
            <motion.div style={{ opacity: fullOpacity }} className="absolute inset-0">
              <BiotaMark form="full" preserveAspectRatio="xMinYMax meet" className="block h-full w-full" />
            </motion.div>
            <motion.div style={{ opacity: compactOpacity }} className="absolute inset-0">
              <BiotaMark form="compact" preserveAspectRatio="xMinYMax meet" className="block h-full w-full" />
            </motion.div>
          </motion.div>
          <motion.span
            style={{ fontSize }}
            className="font-serif font-medium tracking-tight text-ink leading-none"
          >
            Biota Metrics
          </motion.span>
        </a>
      </div>
    </motion.header>
  );
}
