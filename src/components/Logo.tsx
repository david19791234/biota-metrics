import type { SVGProps } from "react";

/**
 * Biota Metrics brand mark — five stems of rising height, each crowned by a
 * hexagonal seed-head flower, the tallest in rust on the "reference line". The
 * heights follow one rhythm: a rising curve, organic rather than mechanical.
 *
 *  - form="full"     the five-flower mark (the brand mark / "summit" mark).
 *                    Reads as flowers from ~70px upward; the petals soften below.
 *  - form="compact"  three solid seed-head dots — stays crisp at favicon size,
 *                    used docked in the header and on the dark dashboard rail.
 *
 * Colourways via `variant`: "color" (light surfaces), "reverse" (dark surfaces),
 * "mono" (inherits currentColor).
 */

type Variant = "color" | "reverse" | "mono";
type Form = "full" | "compact";
type Slot = "stem" | "bronze" | "rust";

const PALETTE: Record<Variant, { stem: string; bronze: string; rust: string }> = {
  color: { stem: "#2E382D", bronze: "#8A6A30", rust: "#85402E" },
  reverse: { stem: "#E9E8E1", bronze: "#C2A05A", rust: "#C96A4A" },
  mono: { stem: "currentColor", bronze: "currentColor", rust: "currentColor" },
};

// Six petals on a flat-sided hexagon around the seed-head centre.
const HEAD_RING = [
  [7.2, 0],
  [3.6, 6.24],
  [-3.6, 6.24],
  [-7.2, 0],
  [-3.6, -6.24],
  [3.6, -6.24],
] as const;

// Full mark. viewBox 0 0 250 176; stems end at the bottom edge (y=176 = ground
// line), so the mark baseline-aligns to the wordmark by bottom-aligning its box.
// Heights rise with an organic dip (the "rhythm"); the head centre sits 7 above
// the stem top. The rust flower (tallest, rightmost) is drawn a touch larger.
type FullStem = { x: number; top: number; slot: Slot; big?: boolean };
const FULL_STEMS: FullStem[] = [
  { x: 13, top: 132, slot: "stem" },
  { x: 69, top: 88, slot: "bronze" },
  { x: 125, top: 104, slot: "stem" },
  { x: 181, top: 52, slot: "bronze" },
  { x: 237, top: 20, slot: "rust", big: true },
];
const FULL_BASELINE = 176;

// Compact mark. viewBox 0 0 100 100; stems end at the box bottom (y=100) so it
// baseline-aligns by the same rule.
type CompactStem = { x: number; top: number; slot: Slot; r: number };
const COMPACT_STEMS: CompactStem[] = [
  { x: 18, top: 60, slot: "stem", r: 8.5 },
  { x: 50, top: 38, slot: "bronze", r: 8.5 },
  { x: 82, top: 16, slot: "rust", r: 9.5 },
];
const COMPACT_BASELINE = 100;

type BiotaMarkProps = {
  variant?: Variant;
  form?: Form;
  /** When set, the mark becomes a labelled image; otherwise it is decorative. */
  title?: string;
} & SVGProps<SVGSVGElement>;

export function BiotaMark({
  variant = "color",
  form = "full",
  title,
  ...props
}: BiotaMarkProps) {
  const c = PALETTE[variant];
  const fill = (slot: Slot) =>
    slot === "rust" ? c.rust : slot === "bronze" ? c.bronze : c.stem;

  const isCompact = form === "compact";

  return (
    <svg
      viewBox={isCompact ? "0 0 100 100" : "0 0 250 176"}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}

      {isCompact
        ? COMPACT_STEMS.map((s) => (
            <g key={s.x}>
              <line x1={s.x} y1={s.top} x2={s.x} y2={COMPACT_BASELINE} stroke={c.stem} strokeWidth={9} strokeLinecap="round" />
              <circle cx={s.x} cy={s.top} r={s.r} fill={fill(s.slot)} />
            </g>
          ))
        : FULL_STEMS.map((s) => {
            const cy = s.top - 7;
            const petalR = s.big ? 3.1 : 2.9;
            const centreR = s.big ? 4.3 : 4;
            const col = fill(s.slot);
            return (
              <g key={s.x}>
                <line x1={s.x} y1={s.top} x2={s.x} y2={FULL_BASELINE} stroke={c.stem} strokeWidth={2.6} />
                {HEAD_RING.map(([dx, dy], i) => (
                  <circle key={i} cx={s.x + dx} cy={cy + dy} r={petalR} fill={col} />
                ))}
                <circle cx={s.x} cy={cy} r={centreR} fill={col} />
              </g>
            );
          })}
    </svg>
  );
}
