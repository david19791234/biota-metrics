import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import { Reveal } from "../utils";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const update = () => setMatches(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, [query]);
  return matches;
}

// `body` is the mobile-visible lead; `rest` is appended (with one space) only at
// md:+ so desktop reads the full original paragraph, byte-for-byte.
type Method = { n: string; title: string; body: string; rest: string; icon: ReactNode };

const METHODS: Method[] = [
  {
    n: "01",
    title: "Miljø-DNA fra jordprøver",
    body: "En jordprøve analyseres for miljø-DNA og kan påvise arter, man sjældent ser med det blotte øje, blandt andet svampe, smådyr og mikroliv.",
    rest: "Det er en forholdsvis ung metode, som danske forskningsmiljøer har været med til at udvikle, og som stadig forfines. Hvad en prøve viser, afhænger af hvor og hvornår den tages, og hvilken DNA-markør der analyseres for. At en art ikke påvises, er ikke det samme som, at den ikke er der.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="h-full w-auto block">
        <path d="M6 16h44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M6 28h44" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        <path d="M6 40h44" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        <path d="M28 16c0 6-4 8-4 13s4 7 4 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="28" cy="16" r="3" fill="currentColor" />
        <circle cx="20" cy="33" r="2.1" fill="currentColor" />
        <circle cx="37" cy="45" r="2.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Planter på prøvefeltet",
    body: "På faste prøvefelter registreres karplanternes artssammensætning og dækningsgrader.",
    rest: "Vegetationen er en tidlig og pålidelig indikator: artssammensætningen integrerer levestedets nærings-, fugtigheds- og forstyrrelsesforhold over tid og forudsiger en stor del af den samlede artsrigdom på tværs af artsgrupper. Arterne vægtes efter følsomhed — hjemmehørende indikator- og stjernearter vejer tungest. Sammen med strukturmål omsættes registreringerne til et arts- og naturtilstandsindeks på en standardiseret skala, som forvaltere kender fra de nationale naturtypevurderinger.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="h-full w-auto block">
        <rect x="6" y="6" width="44" height="44" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <line x1="20.6" y1="6" x2="20.6" y2="50" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
        <line x1="35.3" y1="6" x2="35.3" y2="50" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
        <line x1="6" y1="20.6" x2="50" y2="20.6" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
        <line x1="6" y1="35.3" x2="50" y2="35.3" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
        <circle cx="28" cy="28" r="4" fill="currentColor" />
        <circle cx="14" cy="42" r="2.4" fill="currentColor" />
        <circle cx="42" cy="14" r="2.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Dødt ved og organisk materiale",
    body: "På de samme felter registreres levestedets fysiske struktur og ressourcer: dødt ved, dække af organisk materiale og vegetationens lagdeling.",
    rest: "Det er enkle, billige målinger, men tungtvejende. Store dele af biodiversiteten, især svampe og insekter, drives mere af mængden af dødt ved og organisk materiale end af artslisten alene. Struktur er blandt de indikatorer, NOVANA og EU's naturgenopretningsforordning lægger vægt på.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="h-full w-auto block">
        <path d="M6 34h44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M6 22h44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M14 42h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="24" y="24" width="8" height="8" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Lyd langs faste ruter",
    body: "En app optager lyd langs den samme rute på samme tid på sæsonen og bestemmer fugle og andre kaldende arter ud fra deres lyd.",
    rest: "Samme rute og samme tidspunkt gør optagelserne sammenlignelige fra år til år. Metoden fanger kun arter, der giver lyd fra sig, og den automatiske artsgenkendelse efterprøves af et menneske, før resultaterne indgår. Præcisionen ligger typisk omkring 72 til 85 procent.",
    icon: (
      <svg viewBox="0 0 64 56" fill="none" className="h-full w-auto block">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="6" y1="28" x2="6" y2="28" />
          <line x1="13" y1="20" x2="13" y2="36" />
          <line x1="20" y1="10" x2="20" y2="46" />
          <line x1="27" y1="22" x2="27" y2="34" />
          <line x1="34" y1="4" x2="34" y2="52" />
          <line x1="41" y1="18" x2="41" y2="38" />
          <line x1="48" y1="14" x2="48" y2="42" />
          <line x1="55" y1="24" x2="55" y2="32" />
        </g>
      </svg>
    ),
  },
  {
    n: "05",
    title: "Billeder af nøglearter",
    body: "Vildtkameraer med moden AI-artsgenkendelse registrerer pattedyr og andre større dyr, særligt nøglearter og paraplyarter.",
    rest: "Kameraet er den stærkeste enkeltmetode til store, jordlevende pattedyr og dokumenterer netop de store, sky arter, som eDNA og lyd typisk overser. Sammen med de øvrige kilder giver det en bred samlet dækning. Nøjagtigheden er ofte over 93 procent, og modne værktøjer som MegaDetector og SpeciesNet ligger bag genkendelsen.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="h-full w-auto block">
        <rect x="8" y="16" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="28" cy="30" r="7" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="42" cy="22" r="1.5" fill="currentColor" />
        <path d="M18 16 l4 -6 h12 l4 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const N = METHODS.length;

/* Open-curve for card `index` from scroll progress 0..1, paced like Apple's
   scroll scenes: a generous PLATEAU keeps a card fully open (a "hold"/dwell),
   then a short, EASED glide hands off to the next card. smootherstep eases the
   glide in and out (momentum, never linear); because it's symmetric, two
   neighbours' openness still sums to 1, so the panel height stays settled. */
const PLATEAU = 0.24; // half-width of the "hold"; the rest is a longer, gentle glide
function ease(t: number) {
  return t * t * (3 - 2 * t); // smoothstep — gentle ease in/out (symmetric → neighbours sum to 1)
}
function openAt(p: number, index: number) {
  const pos = p * (N - 1);
  const d = Math.abs(pos - index);
  if (d <= PLATEAU) return 1;
  if (d >= 1 - PLATEAU) return 0;
  const t = (1 - PLATEAU - d) / (1 - 2 * PLATEAU); // linear 1→0 across the glide
  return ease(t);
}

const C_INK = "#111111";
const C_INK_SOFT = "#444444";
const C_INK_FAINT = "#777777";
const C_RUST = "#85402e";
const C_MOSS = "#2e382d";

function MethodRow({
  m,
  index,
  progress,
  isDesktop,
  last,
}: {
  m: Method;
  index: number;
  progress: MotionValue<number>;
  isDesktop: boolean;
  last: boolean;
}) {
  const openness = useTransform(progress, (p) => openAt(p, index));
  const rows = useTransform(openness, (o) => `${o}fr`);
  const titleColor = useTransform(openness, [0, 1], [C_INK_SOFT, C_INK]);
  const numColor = useTransform(openness, [0, 1], [C_INK_FAINT, C_RUST]);
  const iconColor = useTransform(openness, [0, 1], [C_INK_FAINT, C_MOSS]);
  const iconOpacity = useTransform(openness, [0, 1], [0.3, 1]);

  return (
    <div className={last ? "" : "border-b border-line-soft"}>
      {/* Title bar — always visible (the overview) */}
      <div className="flex items-center gap-4 md:gap-5 px-5 md:px-8 py-[18px] md:py-[22px]">
        <motion.span
          style={isDesktop ? { color: numColor } : undefined}
          className={`font-mono text-[12px] md:text-[13px] tracking-[0.14em] shrink-0 tabular-nums ${isDesktop ? "" : "text-rust"}`}
        >
          {m.n}
        </motion.span>
        <motion.h3
          style={isDesktop ? { color: titleColor } : undefined}
          className={`font-serif font-medium text-[1.18rem] md:text-[1.4rem] tracking-tight leading-snug flex-1 min-w-0 ${isDesktop ? "" : "text-ink"}`}
        >
          {m.title}
        </motion.h3>
        <motion.span
          aria-hidden="true"
          style={isDesktop ? { color: iconColor, opacity: iconOpacity } : undefined}
          className={`h-7 md:h-8 shrink-0 hidden sm:block ${isDesktop ? "" : "text-moss"}`}
        >
          {m.icon}
        </motion.span>
      </div>

      {/* Body — height scrubbed directly from scroll via grid-rows (fr) */}
      <motion.div className="grid" style={{ gridTemplateRows: isDesktop ? rows : "1fr" }}>
        <motion.div className="overflow-hidden" style={{ opacity: isDesktop ? openness : 1 }}>
          <p className="text-ink-soft text-[0.95rem] md:text-[1.05rem] leading-[1.6] md:leading-[1.64] px-5 md:px-8 pt-0 pb-7 md:pb-8 max-w-[44em]">
            {m.body}
            <span className="hidden md:inline">{" "}{m.rest}</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Method() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  // Smooth the raw scroll into a fluid, slightly-weighted value — the animation
  // eases TOWARD the scroll position (the "Apple glide") instead of snapping to
  // every jittery scroll delta. Stiffness/damping are the main feel knobs.
  const progress = useSpring(scrollYProgress, { stiffness: 185, damping: 28, restDelta: 0.0004 });

  // Discrete "0X / 05" label (only re-renders when the rounded card changes).
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(progress, "change", (p) => {
    setCurrent(Math.max(0, Math.min(N - 1, Math.round(p * (N - 1)))));
  });
  // Continuous progress bar, tracking the smoothed scroll.
  const barWidth = useTransform(progress, (p) => `${(((p * (N - 1)) + 1) / N) * 100}%`);

  return (
    <section id="metode" className="relative">
      {/* Track length sets the overall scroll-pace (longer = slower). This +
          PLATEAU (hold-vs-glide) + the spring (lag) are the three pacing knobs. */}
      <div ref={trackRef} className="lg:h-[270vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center py-14 md:py-28 lg:py-0">
          <div className="wrap w-full">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-20 lg:items-center">

              {/* Left — intro + wayfinding */}
              <div className="lg:w-[42%] lg:shrink-0">
                <Reveal>
                  <span className="font-mono text-xs tracking-[0.14em] uppercase text-moss font-medium mb-4 block">
                    02 · Måling
                  </span>
                  <h2 className="font-serif font-medium text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.07] tracking-tight max-w-[15em]">
                    Fem datakilder, ét samlet billede
                  </h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-[1.04rem] md:text-[1.12rem] leading-[1.55] md:leading-[1.62] text-ink-soft max-w-[27em] mt-6">
                    Vi kombinerer fem uafhængige kilder, fordi de hver især har blinde vinkler. De indsamles systematisk på de samme faste punkter<span className="md:hidden">.</span><span className="hidden md:inline">, og tilsammen fanger de alt fra naturens mikroskopiske pionerer til de største pattedyr.</span>
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <div className="mt-9 hidden lg:flex items-center gap-4">
                    <span className="font-mono text-[12px] tracking-[0.12em] text-ink-faint tabular-nums">
                      {String(current + 1).padStart(2, "0")} <span className="text-line">/</span> {String(N).padStart(2, "0")}
                    </span>
                    <div className="h-[2px] w-[120px] rounded-full bg-line-soft overflow-hidden">
                      <motion.div className="h-full rounded-full bg-rust" style={{ width: barWidth }} />
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right — the five datakilder as a scroll-scrubbed accordion */}
              <div className="lg:w-[58%] lg:min-w-0">
                <Reveal
                  delay={0.12}
                  className="bg-white rounded-[14px] border border-line-soft shadow-[0_12px_44px_-16px_rgba(17,17,17,0.14)] overflow-hidden"
                >
                  <MethodRow m={METHODS[0]} index={0} progress={progress} isDesktop={isDesktop} last={false} />
                  <MethodRow m={METHODS[1]} index={1} progress={progress} isDesktop={isDesktop} last={false} />
                  <MethodRow m={METHODS[2]} index={2} progress={progress} isDesktop={isDesktop} last={false} />
                  <MethodRow m={METHODS[3]} index={3} progress={progress} isDesktop={isDesktop} last={false} />
                  <MethodRow m={METHODS[4]} index={4} progress={progress} isDesktop={isDesktop} last={true} />
                </Reveal>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
