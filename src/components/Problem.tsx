import { Reveal } from "../utils";

export function Problem() {
  return (
    <section id="problem" className="bg-paper-sub relative overflow-hidden py-12 md:py-24">
      <svg className="absolute -right-[120px] top-1/2 -translate-y-1/2 w-[680px] opacity-30 pointer-events-none text-moss hidden md:block" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.9">
          <path d="M300 90C200 120 150 220 180 320c25 84 130 150 240 120 90-25 140-130 100-230C588 130 420 52 300 90Z" />
          <path d="M300 150C230 172 195 240 215 312c18 64 100 112 182 92 70-18 108-100 78-176C530 178 410 124 300 150Z" />
          <path d="M300 210C255 226 232 270 246 318c14 46 70 78 128 64 50-14 76-70 56-124C476 222 388 186 300 210Z" />
          <path d="M300 268C272 278 258 304 268 332c8 28 44 46 80 38 32-9 48-44 36-78C460 274 352 250 300 268Z" />
        </g>
      </svg>
      
      <div className="wrap relative z-10">
        <Reveal>
          <div className="mb-8 w-full md:mb-13">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-moss font-medium mb-4 block">
              01 · Udfordring
            </span>
            <h2 className="font-serif font-medium text-[clamp(2rem,3.6vw,3rem)] leading-[1.06] tracking-tight max-w-[16em]">
              Hektar er ikke biodiversitet
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-14 items-start">
          <Reveal delay={0.08}>
            <div className="space-y-4 sm:space-y-5 text-[1.05rem] leading-[1.55] sm:text-[1.12rem] sm:leading-[1.62] text-ink-soft">
              <p>
                Den grønne trepart lægger op mod 400.000 hektar landbrugsjord om til skov, vådområder og natur. Statens platform MARS holder styr på hektarene og de forventede effekter på klima, vand og natur, men ikke på, om arterne faktisk er kommet.
              </p>
              <p>
                For hektar er ikke det samme som biodiversitet. Der findes ingen fælles måling af, om arterne vender tilbage på de arealer, fondene køber og genopretter. Et areal kan være lagt om på papiret, længe før en eneste ny art har indfundet sig.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.16}>
            <p className="font-serif font-medium text-[1.18rem] leading-[1.45] sm:text-[clamp(1.4rem,2vw,1.75rem)] sm:leading-[1.3] tracking-tight text-moss-deep pl-5 sm:pl-6 border-l-2 border-rust py-1">
              Naturgenopretning handler i dag ikke om at fastholde en bestemt tilstand, men om at genskabe naturlige processer, for eksempel græsning og naturlig hydrologi, og lade naturen udvikle sig derfra.<span className="hidden sm:inline"> Tilgangen til måling har kun delvis fulgt med. Vi måler det, der er det egentlige formål: at naturen kommer igen. Og vi dokumenterer hvornår, hvor meget, hvilke arter, og hvordan levestedet ændrer sig.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
