import type { SVGProps } from "react";

/**
 * Biota Metrics brand mark — stems of rising height crowned by seed heads,
 * the tallest in rust. Two forms share one DNA:
 *
 *  - form="full"    five stems, each topped by a hexagonal seed-head cluster.
 *                   The expressive hero mark; reads from ~100px upward.
 *  - form="compact" three stems with solid heads and bolder strokes. Stays
 *                   crisp down to favicon sizes where the cluster would muddy.
 *
 * Three colourways via `variant`:
 *  - "color"   on light surfaces (moss + bronze + rust)
 *  - "reverse" on dark surfaces  (cream + warm gold + warm rust)
 *  - "mono"    inherits currentColor (single-ink contexts, print)
 */

type Variant = "color" | "reverse" | "mono";
type Form = "full" | "compact";

const PALETTE: Record<Variant, { stem: string; bronze: string; rust: string }> = {
  color: { stem: "#2E382D", bronze: "#8A6A30", rust: "#85402E" },
  reverse: { stem: "#E9E8E1", bronze: "#C2A05A", rust: "#C96A4A" },
  mono: { stem: "currentColor", bronze: "currentColor", rust: "currentColor" },
};

type Slot = "stem" | "bronze" | "rust";

// Six points on a flat-sided hexagon, offset from the head centre.
const HEAD_RING = [
  [7.2, 0],
  [3.6, 6.24],
  [-3.6, 6.24],
  [-7.2, 0],
  [-3.6, -6.24],
  [3.6, -6.24],
] as const;

// Full mark: stem x, stem top (head centre sits 7 above), head colour slot.
// The rust-crowned tallest stem is drawn slightly larger.
type FullStem = { x: number; top: number; slot: Slot; big?: boolean };
const FULL_STEMS: FullStem[] = [
  { x: 13, top: 132, slot: "stem" },
  { x: 69, top: 88, slot: "bronze" },
  { x: 125, top: 104, slot: "stem" },
  { x: 181, top: 52, slot: "bronze" },
  { x: 237, top: 20, slot: "rust", big: true },
];

// Compact mark: an ascending trio with solid heads, the tallest in rust.
type CompactStem = { x: number; top: number; slot: Slot; r: number };
const COMPACT_STEMS: CompactStem[] = [
  { x: 18, top: 56, slot: "stem", r: 8.5 },
  { x: 50, top: 36, slot: "bronze", r: 8.5 },
  { x: 82, top: 16, slot: "rust", r: 9.5 },
];

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
  const viewBox = isCompact ? "0 0 100 100" : "0 0 250 176";
  const baseline = isCompact ? 88 : 176;

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}

      {isCompact
        ? COMPACT_STEMS.map((s) => (
            <g key={s.x}>
              <line
                x1={s.x}
                y1={s.top}
                x2={s.x}
                y2={baseline}
                stroke={c.stem}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <circle cx={s.x} cy={s.top} r={s.r} fill={fill(s.slot)} />
            </g>
          ))
        : FULL_STEMS.map((s) => {
            const cy = s.top - 7;
            const ringR = s.big ? 3.1 : 2.9;
            const centreR = s.big ? 4.3 : 4;
            return (
              <g key={s.x}>
                <line
                  x1={s.x}
                  y1={s.top}
                  x2={s.x}
                  y2={baseline}
                  stroke={c.stem}
                  strokeWidth={2.6}
                />
                {HEAD_RING.map(([dx, dy], i) => (
                  <circle key={i} cx={s.x + dx} cy={cy + dy} r={ringR} fill={fill(s.slot)} />
                ))}
                <circle cx={s.x} cy={cy} r={centreR} fill={fill(s.slot)} />
              </g>
            );
          })}
    </svg>
  );
}
