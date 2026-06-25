import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Reveal, EASE } from "../utils";

/* ------------------------------------------------------------------ *
 * Section 04 — Dashboard & rapportering
 * A click-driven mock of the Biota Metrics product (dark sidebar,
 * six switchable views) built to read like a real SaaS screenshot.
 * ------------------------------------------------------------------ */

type ViewId = "portefolje" | "kpi" | "datakilder" | "reference" | "rapport" | "integrationer";

const NAV: { id: ViewId; label: string }[] = [
  { id: "portefolje", label: "Portefølje" },
  { id: "kpi", label: "Projekt-KPI'er" },
  { id: "datakilder", label: "Datakilder" },
  { id: "reference", label: "Referenceniveau" },
  { id: "rapport", label: "Afrapportering" },
  { id: "integrationer", label: "Integrationer" },
];

/* --- tiny line icons --------------------------------------------------- */
const IconChevron = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);
const IconArrowUp = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="6" /><polyline points="6 12 12 6 18 12" /></svg>
);
const IconFile = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
);
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

/* --- view title shown in the page body --------------------------------- */
const VIEW_TITLE: Record<ViewId, string> = {
  portefolje: "Portefølje",
  kpi: "Engdal Oversigt",
  datakilder: "Resultater pr. datakilde",
  reference: "Fremdrift mod reference",
  rapport: "Eksportér rapport",
  integrationer: "Systemintegrationer",
};

const heading = "font-sans font-semibold text-ink text-[21px] md:text-[24px] tracking-tight leading-none";
const chip = "bg-paper-sub border border-line rounded-[6px] px-3 py-2 text-[13px] font-medium text-ink-soft inline-flex items-center gap-2 whitespace-nowrap";

/* ====================================================================== *
 * VIEW 1 — Portefølje
 * ====================================================================== */
type Project = { name: string; region: string; area: string; status: string; tone: "muted" | "active"; pct: number; focal?: boolean };
const PROJECTS: Project[] = [
  { name: "Søhøjlandet", region: "Midtjylland", area: "120 ha", status: "Baseline målt", tone: "muted", pct: 28 },
  { name: "Møllebækken", region: "Nordjylland", area: "45 ha", status: "År 1 i gang", tone: "muted", pct: 35 },
  { name: "Engdal", region: "Sjælland", area: "142 ha", status: "År 3 · Eksport klar", tone: "active", pct: 69, focal: true },
];

function PortfolioView() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-7 md:mb-9">
        <h3 className={heading}>Portefølje</h3>
        <button type="button" className="shrink-0 cursor-pointer bg-paper-sub border border-line rounded-[6px] px-3.5 py-2 text-[13px] md:text-[14px] font-medium text-ink shadow-[0_1px_1px_rgba(17,17,17,0.04)] transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-paper-mute hover:shadow-[0_1px_2px_rgba(17,17,17,0.06)] hover:duration-150 active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-deep focus-visible:ring-offset-2">Filtrér</button>
      </div>

      {/* Mobile / tablet: one card per project — no horizontal scroll */}
      <div className="lg:hidden flex flex-col gap-3">
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            className={`rounded-[8px] border border-line p-4 ${p.focal ? "bg-paper-sub" : "bg-paper"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-sans font-semibold text-[15px] text-ink leading-tight">{p.name}</div>
                <div className="text-[12px] text-ink-faint leading-tight mt-0.5">{p.region} · {p.area}</div>
              </div>
              <span
                className={`shrink-0 inline-block rounded-[4px] px-2.5 py-1 text-[11.5px] font-medium whitespace-nowrap ${
                  p.tone === "active" ? "bg-moss text-white" : "bg-paper-mute text-ink-soft"
                }`}
              >
                {p.status}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-[5px] bg-paper-mute rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-moss-deep rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.pct}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                />
              </div>
              <span className={`font-mono text-[12px] shrink-0 ${p.focal ? "text-ink font-medium" : "text-ink-faint"}`}>{p.pct}%</span>
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">Fremdrift mod reference</div>
          </div>
        ))}
      </div>

      {/* Desktop: the full table */}
      <div className="hidden lg:block border border-line rounded-[8px] overflow-hidden overflow-x-auto">
        <div className="min-w-[420px] sm:min-w-[600px]">
          {/* header */}
          <div className="flex items-center gap-6 px-4 py-2.5 border-b border-line-soft font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-faint">
            <span className="flex-1 min-w-0">Projekt</span>
            <span className="hidden sm:block w-[88px] text-right">Areal</span>
            <span className="w-[150px]">Status</span>
            <span className="flex-1 min-w-0">Fremdrift mod reference</span>
          </div>
          {/* rows */}
          {PROJECTS.map((p) => (
            <div
              key={p.name}
              className={`flex items-center gap-6 px-4 h-[58px] border-b border-line-soft last:border-0 ${p.focal ? "bg-paper-sub" : ""}`}
            >
              <div className="flex-1 min-w-0 relative">
                {p.focal && <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-7 w-[3px] bg-moss rounded-r" />}
                <div className="font-sans font-semibold text-[14px] text-ink leading-tight truncate">{p.name}</div>
                <div className="text-[12px] text-ink-faint leading-tight mt-0.5">{p.region}</div>
              </div>
              <div className="hidden sm:block w-[88px] text-right font-mono text-[13px] text-ink-soft">{p.area}</div>
              <div className="w-[150px]">
                <span
                  className={`inline-block rounded-[4px] px-2.5 py-1 text-[11.5px] font-medium whitespace-nowrap ${
                    p.tone === "active" ? "bg-moss text-white" : "bg-paper-mute text-ink-soft"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <div className="flex-1 h-[5px] bg-paper-mute rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-moss-deep rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${p.pct}%` }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                  />
                </div>
                <span className={`font-mono text-[12px] w-[34px] text-right ${p.focal ? "text-ink font-medium" : "text-ink-faint"}`}>{p.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ====================================================================== *
 * VIEW 2 — Engdal Oversigt (KPI cards)
 * ====================================================================== */
type Kpi = { label: string; value: string; unit: string; trend?: string; note?: string };
const KPIS: Kpi[] = [
  { label: "Naturtilstand (arts- og strukturindeks)", value: "61", unit: "/ 100", trend: "Stigende tendens" },
  { label: "Fremdrift mod reference", value: "69", unit: "%", note: "Referenceniveau fra sammenlignelige naturområder (~90 arter, illustrativt)" },
  { label: "Artsrigdom (Total)", value: "73", unit: "arter", trend: "34% fra baseline" },
  { label: "Aktive datakilder", value: "5", unit: "datakilder", note: "eDNA, Vegetation, Struktur, Akustik, Vildtkamera" },
];

function KpiView() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-7 md:mb-9">
        <h3 className={heading}>Engdal Oversigt</h3>
        <span className={chip}>Måling: År 3 (2026) <span className="text-ink-faint"><IconChevron /></span></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-paper border border-line rounded-[8px] p-5 md:p-7 flex flex-col gap-3 md:gap-4 min-h-[148px] md:min-h-[156px] shadow-[0_1px_2px_-1px_rgba(26,33,24,0.08),0_2px_6px_-1px_rgba(26,33,24,0.05)]">
            <div className="text-[12px] font-medium text-ink-soft">{k.label}</div>
            <div className="flex items-baseline gap-1.5 font-mono leading-none">
              <span className="text-rust text-[clamp(1.9rem,4vw,2.4rem)] font-medium tracking-tight">{k.value}</span>
              <span className="text-ink-faint text-[clamp(0.9rem,1.5vw,1.05rem)] font-medium">{k.unit}</span>
            </div>
            {k.trend && (
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 bg-paper-sub rounded-[4px] px-2 py-1 text-[12px] font-medium text-ink-soft">
                  <span className="text-moss"><IconArrowUp /></span>
                  {k.trend}
                </span>
              </div>
            )}
            {k.note && <div className="mt-auto text-[12px] text-ink-faint leading-snug">{k.note}</div>}
          </div>
        ))}
      </div>
    </>
  );
}

/* ====================================================================== *
 * VIEW 3 — Resultater pr. datakilde
 * ====================================================================== */
const SOURCES = [
  { n: "01", name: "Miljø-DNA fra jordprøver", value: "14 arter" },
  { n: "02", name: "Planter på åbne flader", value: "28 arter" },
  { n: "03", name: "Dødt ved og organisk materiale", badge: "Registreret" },
  { n: "04", name: "Lyd langs faste ruter", value: "17 arter" },
  { n: "05", name: "Billeder af nøglearter", value: "12 arter" },
] as const;

function SourcesView() {
  return (
    <>
      <h3 className={`${heading} mb-7 md:mb-9`}>Resultater pr. datakilde</h3>
      <div className="bg-paper border border-line rounded-[8px] overflow-hidden">
        {SOURCES.map((s) => (
          <div key={s.n} className="flex items-center justify-between gap-4 px-4 h-[56px] border-b border-line-soft last:border-0">
            <div className="flex items-center gap-4 md:gap-5 min-w-0">
              <span className="font-mono text-[12px] text-ink-faint tabular-nums shrink-0">{s.n}</span>
              <span className="font-sans font-medium text-[14px] text-ink truncate">{s.name}</span>
            </div>
            {"badge" in s ? (
              <span className="shrink-0 bg-paper-mute text-ink-faint rounded-[4px] px-2 py-1 text-[11px] font-medium">{s.badge}</span>
            ) : (
              <span className="shrink-0 font-mono text-[13px] text-ink-soft">{s.value}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ====================================================================== *
 * VIEW 4 — Fremdrift mod reference (line chart, mirrors the hero chart)
 * ====================================================================== */
/* Wide viewBox keeps the in-chart labels close to 1:1 with the rest of the UI
   (a narrow viewBox scaled up made them read oversized). */
const REF_PTS: [number, number][] = [
  [70, 176], [194, 160], [318, 132], [442, 102], [566, 70], [690, 52],
];
const REF_BASE_Y = 202;
const REF_TOP_Y = 44;
const REF_XLABELS = ["år 0", "1", "2", "3", "4", "5"];

/* Smooth (Catmull-Rom → bézier) path so the curve reads elegantly. */
function refPath(pts: [number, number][], close = false): string {
  if (pts.length < 2) return "";
  const d = [`M ${pts[0][0]},${pts[0][1]}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`);
  }
  if (close) d.push(`L ${pts[pts.length - 1][0]},${REF_BASE_Y} L ${pts[0][0]},${REF_BASE_Y} Z`);
  return d.join(" ");
}
const REF_LINE = refPath(REF_PTS);
const REF_AREA = refPath(REF_PTS, true);

function ReferenceChart() {
  return (
    <motion.div initial="hidden" animate="visible" className="w-full">
      <svg viewBox="0 0 760 232" fill="none" className="w-full h-auto block overflow-visible" role="img" aria-label="Graf der viser udvikling mod reference">
        <defs>
          <linearGradient id="refGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-moss)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--color-moss)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.g variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, delay: 0.1 } } }}>
          <line x1="70" y1={REF_TOP_Y} x2="690" y2={REF_TOP_Y} strokeDasharray="3 5" strokeWidth="1.4" stroke="var(--color-ink-soft)" opacity="0.45" />
          <line x1="70" y1={REF_BASE_Y} x2="690" y2={REF_BASE_Y} stroke="var(--color-ink)" strokeOpacity="0.26" strokeWidth="1.2" />
        </motion.g>

        <motion.g className="font-mono fill-ink-faint text-[13px]" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, delay: 0.35 } } }}>
          <text x="60" y={REF_TOP_Y + 4} textAnchor="end">Ref.</text>
          {REF_PTS.map((p, i) => (
            <text key={i} x={p[0]} y="222" textAnchor="middle">{REF_XLABELS[i]}</text>
          ))}
        </motion.g>

        <motion.path d={REF_AREA} fill="url(#refGrad)" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.55 } } }} />
        <motion.path
          d={REF_LINE}
          stroke="var(--color-moss)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.6, ease: "easeInOut", delay: 0.3 } } }}
        />

        <g>
          {REF_PTS.map((p, i) => {
            const isLast = i === REF_PTS.length - 1;
            const isFirst = i === 0;
            const rr = isLast ? 5 : isFirst ? 4 : 3.6;
            return (
              <motion.circle
                key={i}
                variants={{ hidden: { r: 0, opacity: 0 }, visible: { r: rr, opacity: 1, transition: { r: { type: "spring", stiffness: 320, damping: 16, delay: 0.45 + i * 0.16 }, opacity: { duration: 0.2, delay: 0.45 + i * 0.16 } } } }}
                cx={p[0]} cy={p[1]}
                fill={isLast ? "var(--color-rust)" : isFirst ? "var(--color-moss)" : "var(--color-paper)"}
                stroke={isLast || isFirst ? "none" : "var(--color-moss)"}
                strokeWidth={isLast || isFirst ? 0 : 2}
              />
            );
          })}
        </g>

        <motion.g variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.75, ease: EASE } } }}>
          <text x={REF_PTS[0][0] + 14} y={REF_PTS[0][1] + 4} textAnchor="start" className="font-sans fill-moss-deep text-[11.5px] font-medium tracking-[0.06em]">BASELINE</text>
          <text x="690" y={REF_TOP_Y - 10} textAnchor="end" className="font-sans fill-ink-soft text-[11.5px] font-medium tracking-[0.06em]">REFERENCENIVEAU</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

function ReferenceView() {
  return (
    <>
      <h3 className={`${heading} mb-7 md:mb-9`}>Fremdrift mod reference</h3>
      <div className="bg-paper border border-line rounded-[8px] p-5 md:p-7">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft font-medium mb-4 md:mb-5">Udvikling mod reference</div>
        <ReferenceChart />
        <div className="mt-5 md:mt-6 pt-3 border-t border-line-soft font-mono text-[10px] text-ink-faint">Illustration.</div>
      </div>
    </>
  );
}

/* ====================================================================== *
 * VIEW 5 — Eksportér rapport
 * ====================================================================== */
const STATS = [
  { label: "Samlet artsrigdom", value: "73 arter verificeret" },
  { label: "Fremdrift mod reference", value: "69%" },
  { label: "Nationale rødlistearter", value: "3 arter / 1 tilkommet" },
  { label: "Naturtype & struktur", value: "God tilstand (61/100)" },
];

function ExportView() {
  return (
    <>
      <h3 className={`${heading} mb-7 md:mb-9`}>Eksportér rapport</h3>
      <div className="bg-paper border border-line rounded-[8px] overflow-hidden flex flex-col lg:flex-row">
        <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col gap-6 lg:gap-8">
          <div className="size-10 bg-paper-sub rounded-[8px] flex items-center justify-center text-ink-soft shrink-0">
            <IconFile />
          </div>
          <div className="flex flex-col gap-2.5">
            <h4 className="font-sans font-semibold text-[20px] text-ink tracking-tight">Engdal Årsrapport</h4>
            <p className="text-[14px] text-ink-soft leading-[1.55] max-w-[340px]">
              De løbende markdata er nu valideret, vægtet efter indikatorværdi og struktureret, klar til at indgå i jeres miljøafrapportering og bestyrelsesoplæg.
            </p>
          </div>
          <button type="button" className="self-start cursor-pointer bg-moss-deep text-white rounded-[6px] px-5 py-2.5 text-[14px] font-medium shadow-[0_1px_2px_rgba(26,33,24,0.20)] transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-moss hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(26,33,24,0.24)] hover:duration-150 active:translate-y-0 active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-deep focus-visible:ring-offset-2">
            <span className="sm:hidden">Download rapport</span>
            <span className="hidden sm:inline">Download felt- og analyserapport</span>
          </button>
        </div>

        <div className="lg:w-[300px] xl:w-[360px] shrink-0 bg-paper-sub/60 border-t lg:border-t-0 lg:border-l border-line p-6 flex flex-col gap-5">
          <div className="font-sans font-semibold text-[11px] uppercase tracking-[0.08em] text-ink-faint">Nøgletal klar til eksport:</div>
          <div className="flex flex-col">
            {STATS.map((s, i) => (
              <div key={s.label}>
                {i > 0 && <div className="h-px bg-line-soft my-5" />}
                <div className="flex flex-col gap-2">
                  <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.06em] text-[#8ba48e]">{s.label}</span>
                  <span className="font-mono font-semibold text-[16px] text-ink">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ====================================================================== *
 * VIEW 6 — Systemintegrationer
 * ====================================================================== */
const INTEGRATIONS = [
  { initials: "SS", name: "SmartSimple", sub: "Bevillingssystem (GMS)", active: true },
  { initials: "PG", name: "Position Green", sub: "ESG & CSRD Hub", active: false },
  { initials: "SF", name: "Salesforce", sub: "Net Zero / Impact", active: false },
  { initials: "FN", name: "Fondenet / NORMA", sub: "Custom API Portal", active: false },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <div className={`relative w-8 h-[18px] rounded-full transition-[background-color,border-color] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0 ${on ? "bg-moss" : "bg-paper-mute border border-line"}`}>
      <div className={`absolute top-1/2 left-[2px] -translate-y-1/2 size-[14px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "translate-x-[14px]" : "translate-x-0"}`} />
    </div>
  );
}

function IntegrationsView() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-7 md:mb-9">
        <h3 className={heading}>Systemintegrationer</h3>
        <span className="hidden sm:inline-flex bg-paper-sub border border-line rounded-[6px] px-3 py-2 text-[13px] font-medium text-ink whitespace-nowrap">API / Webhook klar</span>
      </div>

      <div className="bg-paper border border-line rounded-[8px] p-5 md:p-8 flex flex-col gap-6 md:gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {INTEGRATIONS.map((it) => (
            <div key={it.initials} className="border border-line rounded-[8px] p-4 md:p-5 flex items-center gap-4 bg-white/40 shadow-[0_1px_2px_-1px_rgba(26,33,24,0.08),0_2px_6px_-1px_rgba(26,33,24,0.05)] transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_-1px_rgba(26,33,24,0.10),0_8px_16px_-3px_rgba(26,33,24,0.08),0_16px_28px_-6px_rgba(26,33,24,0.05)] hover:duration-150 motion-reduce:hover:translate-y-0">
              <div className="size-10 rounded-full bg-paper-sub border border-line flex items-center justify-center font-sans font-semibold text-[13px] text-ink-soft shrink-0">
                {it.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sans font-semibold text-[14px] text-ink leading-tight">{it.name}</div>
                <div className="text-[12px] text-ink-faint leading-tight mt-0.5">{it.sub}</div>
              </div>
              {it.active && <span className="hidden xl:inline-block shrink-0 font-sans font-semibold text-[11px] uppercase tracking-wide text-moss">Aktiv</span>}
              <Toggle on={it.active} />
            </div>
          ))}
        </div>

        <div className="bg-paper-sub border border-line-soft rounded-[8px] p-3 flex items-center gap-3">
          <div className="size-6 rounded-full bg-moss/10 flex items-center justify-center text-moss shrink-0">
            <IconCheck />
          </div>
          <p className="text-[12px] md:text-[13px] text-ink-soft leading-snug">
            <strong className="font-semibold text-ink-soft">SmartSimple synkroniseret succesfuldt.</strong> Seneste datakørsel foretaget dags dato kl. 09:14.
          </p>
        </div>
      </div>
    </>
  );
}

/* ====================================================================== *
 * Shell
 * ====================================================================== */
function ViewBody({ view }: { view: ViewId }): ReactNode {
  switch (view) {
    case "portefolje": return <PortfolioView />;
    case "kpi": return <KpiView />;
    case "datakilder": return <SourcesView />;
    case "reference": return <ReferenceView />;
    case "rapport": return <ExportView />;
    case "integrationer": return <IntegrationsView />;
  }
}

function LogoMark() {
  // small sound-bars mark, echoing the site header but tuned for a dark sidebar
  return (
    <svg width="20" height="20" viewBox="0 0 26 28" fill="none" aria-hidden="true" className="block shrink-0">
      <rect x="0" y="16" width="5" height="12" fill="rgba(255,255,255,0.45)" />
      <rect x="7" y="10" width="5" height="18" fill="rgba(255,255,255,0.65)" />
      <rect x="14" y="4" width="5" height="24" fill="#ffffff" />
      <rect x="21" y="0" width="5" height="28" fill="var(--color-rust)" />
    </svg>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const update = () => setMatches(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/* ---------------------------------------------------------------------- *
 * Coachmark morph — a scroll-linked "point → callout", in the spirit of
 * Apple's scroll scenes: a subtle dark point appears, gains a sage focus
 * glow, then stretches horizontally into the dark callout as the text
 * reveals and the pointer-tail forms. Every value below is mapped from the
 * scroll progress, so the whole thing is scrubbed directly by the scroll.
 * The surface is anchored at its RIGHT edge (the pointer, by the nav) and
 * grows leftward into the page margin.
 * ---------------------------------------------------------------------- */
const COACH_DOT = 14; // initial point diameter (px)
const COACH_W = 180; // final callout width (px)
const COACH_H = 66; // final callout height (px)
const COACH_R = 16; // final corner radius (px)

function CoachmarkMorph({ progress }: { progress: MotionValue<number> }) {
  const surfaceOpacity = useTransform(progress, [0, 0.05], [0, 1]);
  const width = useTransform(progress, [0.16, 0.66], [COACH_DOT, COACH_W]);
  const height = useTransform(progress, [0.24, 0.72], [COACH_DOT, COACH_H]);
  const radius = useTransform(progress, [0.16, 0.62], [COACH_DOT / 2, COACH_R]);
  const glowOpacity = useTransform(progress, [0.04, 0.13, 0.4], [0, 1, 0]);
  const glowScale = useTransform(progress, [0.04, 0.4], [0.5, 1.7]);
  const dotOpacity = useTransform(progress, [0.46, 0.72], [0, 1]);
  const textOpacity = useTransform(progress, [0.54, 0.86], [0, 1]);
  const textX = useTransform(progress, [0.54, 0.86], [8, 0]);
  const tailOpacity = useTransform(progress, [0.74, 0.96], [0, 1]);
  const tailScale = useTransform(progress, [0.74, 1], [0.3, 1]);

  return (
    <div className="pointer-events-none absolute right-full top-[116px] z-40 mr-2.5 h-[66px] w-[180px]">
      {/* sage focus glow on the initial point — the "active" moment */}
      <motion.span
        aria-hidden="true"
        className="absolute right-[-5px] top-1/2 size-6 rounded-full bg-[#8ba48e]"
        style={{ opacity: glowOpacity, scale: glowScale, y: "-50%", filter: "blur(6px)" }}
      />
      {/* the morphing surface: point → capsule → callout */}
      <motion.div
        className="absolute right-0 top-1/2 overflow-hidden bg-coach shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.08),0_12px_24px_-10px_rgba(17,17,17,0.30),0_4px_8px_-4px_rgba(17,17,17,0.18)]"
        style={{ width, height, borderRadius: radius, opacity: surfaceOpacity, y: "-50%" }}
      >
        <div className="absolute inset-y-0 right-0 flex w-[180px] items-center gap-2.5 px-3.5">
          <motion.span className="relative flex size-2 shrink-0" aria-hidden="true" style={{ opacity: dotOpacity }}>
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#8ba48e] opacity-80 animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-[#8ba48e]" />
          </motion.span>
          <motion.span
            className="text-[12.5px] font-medium leading-snug tracking-tight text-white"
            style={{ opacity: textOpacity, x: textX }}
          >
            Klik dig gennem de seks visninger
          </motion.span>
        </div>
      </motion.div>
      {/* tail / pointer toward the sidebar nav */}
      <motion.span
        aria-hidden="true"
        className="absolute right-[-5px] top-1/2 size-[11px] bg-coach"
        style={{ opacity: tailOpacity, scale: tailScale, rotate: 45, y: "-50%" }}
      />
    </div>
  );
}

function DashboardApp() {
  const [view, setView] = useState<ViewId>("portefolje");
  const [hintOn, setHintOn] = useState(true);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const select = (id: ViewId) => {
    setView(id);
    setHintOn(false);
  };

  // Drive the coachmark morph directly from how far the dashboard has scrolled in.
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.75", "start 0.28"] });
  const morph = useSpring(scrollYProgress, { stiffness: 150, damping: 32, restDelta: 0.001 });

  // Below lg the dashboard collapses to just the Portefølje view (the sidebar nav is hidden).
  const shownView = isDesktop ? view : "portefolje";

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* The dashboard window. overflow-hidden clips the rounded corners; the
          coachmark lives OUTSIDE this shell (below) so it can spill into the
          left page margin without being clipped. */}
      <div className="rounded-[12px] border border-line bg-paper overflow-hidden shadow-[0_30px_60px_-24px_rgba(17,17,17,0.22),0_8px_22px_-14px_rgba(17,17,17,0.12)] flex flex-col lg:flex-row">
        {/* Sidebar — vertical on desktop, a horizontal scrollable nav below lg. */}
        <aside className="bg-moss-deep hidden lg:flex flex-col gap-4 lg:gap-8 p-4 lg:p-5 lg:w-[216px] shrink-0 border-b lg:border-b-0 lg:border-r border-line">
          <div className="flex items-center gap-2.5 px-1 lg:px-1.5">
            <LogoMark />
            <span className="font-sans font-bold text-[13px] tracking-[0.06em] text-white">BIOTA METRICS</span>
          </div>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Dashboard-sektioner">
            {NAV.map((item) => {
              const active = item.id === view;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => select(item.id)}
                  className={`relative shrink-0 cursor-pointer text-left whitespace-nowrap rounded-[5px] px-3 py-2 text-[13px] transition-[color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8ba48e]/55 before:content-[''] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-0.5 before:rounded-full before:bg-[#8ba48e] before:opacity-0 before:transition-opacity before:duration-200 ${
                    active
                      ? "bg-white/10 text-white font-medium before:opacity-100"
                      : "text-[#a0a89f] hover:text-white hover:bg-white/[0.06] hover:before:opacity-60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="h-[52px] shrink-0 flex items-center justify-between gap-3 px-4 md:px-6 border-b border-line">
            <div className="flex items-center gap-2 text-[13px] min-w-0">
              <span className="font-medium text-ink-faint hidden sm:inline">Projekter</span>
              <span className="text-ink-faint hidden sm:inline">/</span>
              <span className="font-semibold text-ink-soft truncate">Engdal (Opdateret)</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[13px] text-ink-soft hidden md:inline">Fonden Nordisk Naturarv</span>
              <span className="size-8 rounded-full bg-moss-deep text-white font-semibold text-[11px] flex items-center justify-center">NN</span>
            </div>
          </div>

          {/* Page body — fixed min-height keeps the shell from jumping between views (desktop). */}
          <div className="flex-1 p-5 sm:p-7 md:p-9 lg:p-10 lg:min-h-[620px]">
            <motion.div key={shownView} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
              <ViewBody view={shownView} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Coachmark — desktop only (it invites clicking the sidebar nav, which is hidden
          below lg). Full motion gets the scroll-linked morph; reduced-motion gets the
          calm static callout. Dismisses on the first nav click. */}
      {isDesktop && (!reduce ? (
        <AnimatePresence>
          {hintOn && (
            <motion.div key="coach-morph" exit={{ opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}>
              <CoachmarkMorph progress={morph} />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {hintOn && (
            <motion.div
              key="coach"
              role="status"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.985 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }}
              transition={reduce ? { duration: 0.15, ease: "linear", delay: 0.6 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
              className="pointer-events-none absolute z-40 w-[200px] left-5 top-[104px] origin-top-left lg:left-auto lg:right-full lg:mr-2.5 lg:top-[150px] lg:w-[160px] lg:origin-top-right"
            >
              <div className="relative flex items-start gap-2.5 rounded-[10px] bg-coach text-white px-3.5 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.08),0_12px_24px_-10px_rgba(17,17,17,0.30),0_4px_8px_-4px_rgba(17,17,17,0.18)]">
                {/* mobile beak points up at the horizontal nav */}
                <span className="lg:hidden absolute -top-[5px] left-7 size-[11px] rotate-45 bg-coach" aria-hidden="true" />
                {/* desktop beak points right, toward the sidebar rail */}
                <span className="hidden lg:block absolute -right-[5px] top-1/2 -translate-y-1/2 size-[11px] rotate-45 bg-coach" aria-hidden="true" />
                <span className="relative mt-[3px] flex size-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#8ba48e] opacity-80 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#8ba48e]" />
                </span>
                <span className="text-[12.5px] leading-snug font-medium tracking-tight">Klik dig gennem de seks visninger</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="dashboard" className="py-12 md:py-24 bg-paper-sub overflow-hidden">
      <div className="wrap">
        <Reveal>
          <div className="mb-8 w-full md:mb-10">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-moss font-medium mb-4 block">
              04 · Platform
            </span>
            <h2 className="font-serif font-medium text-[clamp(2.2rem,3.8vw,3.2rem)] leading-[1.06] tracking-tight max-w-[18em]">
              Monitoreringen, samlet i ét dashboard
            </h2>
          </div>
        </Reveal>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
        >
          <DashboardApp />
          <p className="mt-4 text-center font-mono text-[10.5px] tracking-wide text-ink-faint">
            Illustrativ demo — tallene er fiktive eksempler.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
