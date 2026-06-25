import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { BiotaMark } from "./Logo";

// Scroll distance (px) over which the header condenses from its full state to
// its docked state.
const RANGE = 170;

// Aspect ratio of the full mark (viewBox 250×176); used to blend the mark
// container's width between the wide full mark and the square compact mark.
const FULL_RATIO = 250 / 176;

export function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  const { scrollY } = useScroll();

  // Chrome: paper background, blur and a hairline fade in as you leave the top.
  const bgOpacity = useTransform(scrollY, [10, 60], [0, 0.96], { clamp: true });
  const backgroundColor = useMotionTemplate`rgba(246, 246, 244, ${bgOpacity})`;
  const blur = useTransform(scrollY, [10, 60], [0, 12], { clamp: true });
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const borderOpacity = useTransform(scrollY, [10, 60], [0, 0.085], { clamp: true });
  const borderColor = useMotionTemplate`rgba(17, 17, 17, ${borderOpacity})`;

  // Spacing condenses with scroll.
  const paddingTop = useTransform(scrollY, [0, RANGE], [isMobile ? 28 : 48, 14], { clamp: true });
  const paddingBottom = useTransform(scrollY, [0, RANGE], [0, 14], { clamp: true });

  // Logo: the full five-flower mark up top, morphing into the compact
  // favicon mark as the header docks. The container height drives both marks;
  // its width blends from the wide full ratio to a square as they cross-fade.
  // The full mark stays on while it is largest; the compact takes over for the
  // small sizes, so the cross-fade reads as a morph rather than a double image.
  const markHeight = useTransform(scrollY, [0, RANGE], [isMobile ? 50 : 64, 24], { clamp: true });
  const mix = useTransform(scrollY, [60, 95], [0, 1], { clamp: true }); // 0 = full, 1 = compact
  const markWidth = useTransform([markHeight, mix], ([h, m]: number[]) => h * (FULL_RATIO * (1 - m) + m));
  const fullOpacity = useTransform(scrollY, [60, 95], [1, 0], { clamp: true });
  const compactOpacity = useTransform(scrollY, [60, 95], [0, 1], { clamp: true });

  // Wordmark shrinks its own box (font-size, not transform) so the header
  // height truly condenses. Cheap reflow — the header is fixed and isolated.
  const fontSize = useTransform(scrollY, [0, RANGE], [isMobile ? 26 : 30, 18], { clamp: true });

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
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="inline-flex items-center gap-3 decoration-transparent"
        >
          <motion.div
            style={{ height: markHeight, width: markWidth }}
            className="relative block shrink-0"
            aria-hidden="true"
          >
            <motion.div style={{ opacity: fullOpacity }} className="absolute inset-0">
              <BiotaMark form="full" preserveAspectRatio="xMinYMid meet" className="block h-full w-full" />
            </motion.div>
            <motion.div style={{ opacity: compactOpacity }} className="absolute inset-0">
              <BiotaMark form="compact" preserveAspectRatio="xMinYMid meet" className="block h-full w-full" />
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
