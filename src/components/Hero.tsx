import { motion } from "motion/react";
import { EASE, Reveal, smoothScroll } from "../utils";

export function Hero() {
  // Top padding clears the fixed flower masthead (≈86px mobile / 136px desktop)
  // plus a harmonious gap = the logo's top padding × φ (≈36 / 64).
  return (
    <section className="pt-[122px] md:pt-[200px] pb-12 md:pb-16 relative">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-[1.12fr_0.88fr] gap-8 md:gap-16 items-center">
          <div>
            <Reveal delay={0.08}>
              <h1 className="font-serif font-medium text-[clamp(2.2rem,3.8vw,3.2rem)] xl:text-[3.6rem] leading-[1.06] tracking-tight mb-6 sm:pr-4 break-words">
                Monitorering af biodiversitet
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-[1rem] sm:text-[clamp(1.08rem,1.5vw,1.25rem)] text-ink-soft max-w-[34em] leading-relaxed">
                Vi måler, hvordan biodiversiteten udvikler sig i naturgenopretningsprojekter: ikke kun antallet af arter, men hvilke arter der kommer, og hvordan levestedet udvikler sig.<span className="hidden sm:inline"> Vi måler på faste punkter efter samme metode, fra en baseline ved projektets start og løbende derefter, og holder udviklingen op mod sammenlignelige referenceområder. Resultatet er omkostningseffektiv, standardiseret dokumentation, som fonde og forvaltere kan bruge til at følge og afrapportere fremdriften.</span>
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-10">
                <a
                  href="#metode"
                  onClick={smoothScroll}
                  className="font-sans text-[15px] font-medium px-7 py-3.5 border border-ink transition-colors duration-200 bg-ink text-paper hover:bg-transparent hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-deep focus-visible:ring-offset-2 inline-flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 group"
                >
                  Se datakilderne <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#kontakt"
                  onClick={smoothScroll}
                  className="font-sans text-[15px] font-medium px-7 py-3.5 border border-line-soft transition-colors duration-200 bg-transparent text-ink hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-deep focus-visible:ring-offset-2 inline-flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2"
                >
                  Kontakt os
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="border border-line bg-paper-sub rounded-[3px] px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-7 relative">
              <div className="mb-3">
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-soft font-medium">Udvikling mod reference</span>
              </div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <svg 
                  viewBox="0 0 520 330" fill="none" className="w-full h-auto block overflow-visible" role="img" aria-label="Graf der viser udvikling mod reference"
                >
                <motion.g
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 1, delay: 0.1 } }
                  }}
                >
                  <g stroke="rgba(28,32,25,0.12)" strokeWidth="1">
                    <line x1="64" y1="40" x2="500" y2="40" strokeDasharray="4 4" strokeWidth="1.5" stroke="var(--color-ink-soft)" opacity="0.5" />
                  </g>
                  <line x1="64" y1="288" x2="500" y2="288" stroke="rgba(28,32,25,0.4)" strokeWidth="1.2" />
                </motion.g>
                <motion.g
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
                  }}
                  className="font-mono text-[11px] fill-ink-faint"
                >
                  <text x="54" y="44" textAnchor="end">Ref.</text>
                </motion.g>
                <motion.g
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
                  }}
                  className="font-mono text-[11px] fill-ink-faint"
                >
                  <text x="64" y="307" textAnchor="middle">år 0</text>
                  <text x="151" y="307" textAnchor="middle">1</text>
                  <text x="238" y="307" textAnchor="middle">2</text>
                  <text x="325" y="307" textAnchor="middle">3</text>
                  <text x="412" y="307" textAnchor="middle">4</text>
                  <text x="500" y="307" textAnchor="middle">5</text>
                </motion.g>

                <motion.path
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1, transition: { duration: 2.2, ease: "linear", delay: 0.3 } }
                  }}
                  d="M64,249 L151,229 L238,194 L325,155 L412,100 L500,51"
                  stroke="var(--color-moss)"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                <g>
                  {[
                    { cx: 64, cy: 249, r: 5.5, delay: 0.3 },
                    { cx: 151, cy: 229, r: 4.5, delay: 0.74 },
                    { cx: 238, cy: 194, r: 4.5, delay: 1.18 },
                    { cx: 325, cy: 155, r: 4.5, delay: 1.62 },
                    { cx: 412, cy: 100, r: 4.5, delay: 2.06 },
                    { cx: 500, cy: 51, r: 7, delay: 2.5, isLast: true },
                  ].map((dot, i) => {
                    const isBaseline = i === 0;
                    return (
                      <motion.circle
                        key={i}
                        variants={{
                          hidden: { r: 0, opacity: 0 },
                          visible: { 
                            r: dot.r, 
                            opacity: 1,
                            transition: {
                              r: { type: "spring", stiffness: 300, damping: 15, delay: dot.delay },
                              opacity: { duration: 0.2, delay: dot.delay }
                            }
                          }
                        }}
                        cx={dot.cx}
                        cy={dot.cy}
                        fill={dot.isLast ? "var(--color-rust)" : isBaseline ? "var(--color-moss)" : "var(--color-paper-sub)"}
                        stroke={dot.isLast || isBaseline ? "none" : "var(--color-moss)"}
                        strokeWidth={dot.isLast || isBaseline ? 0 : 2.5}
                      />
                    );
                  })}
                </g>
                <motion.g
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6, ease: EASE } }
                  }}
                >
                  <text x="76" y="268" textAnchor="start" className="font-sans text-[11.5px] font-medium tracking-[0.06em] uppercase fill-moss-deep">
                    Baseline
                  </text>
                  <text x="500" y="35" textAnchor="end" className="font-sans text-[11.5px] font-medium tracking-[0.06em] uppercase fill-ink-soft">
                    Referenceniveau
                  </text>
                </motion.g>
                </svg>
              </motion.div>
              <div className="font-mono text-[10px] text-ink-faint mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-line-soft">Illustration.</div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.32}>
          <div className="grid grid-cols-1 md:grid-cols-3 md:border-t border-line mt-10 md:mt-14">
            <div className="py-5 md:py-6 md:pr-6 border-b md:border-b-0 md:border-r border-line-soft">
              <div className="font-serif text-[1.55rem] font-medium tracking-tight leading-none">5 datakilder</div>
              <div className="text-[14px] text-ink-soft mt-2">eDNA, vegetation, struktur, akustik og vildtkamera, indsamlet på de samme punkter hver gang.</div>
            </div>
            <div className="py-5 md:py-6 md:px-6 border-b md:border-b-0 md:border-r border-line-soft">
              <div className="font-serif text-[1.55rem] font-medium tracking-tight leading-none">Månedlig</div>
              <div className="text-[14px] text-ink-soft mt-2">Standardiseret indsamling gennem vækstsæsonen efter samme protokol, så data kan sammenlignes fra år til år.</div>
            </div>
            <div className="py-5 md:py-6 md:pl-6">
              <div className="font-serif text-[1.55rem] font-medium tracking-tight leading-none">Biodiversitetsrapport</div>
              <div className="text-[14px] text-ink-soft mt-2">En årlig rapport, der samler målingerne og viser udviklingen op mod jeres referenceområder. Klar til bestyrelse og donorer.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
