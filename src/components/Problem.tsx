import { Reveal } from "../utils";

export function Problem() {
  return (
    <section id="problem" className="bg-paper-sub relative overflow-hidden py-12 md:py-24">
      {/* Decorative botanical: vellugtende guldaks (Anthoxanthum odoratum),
          grayscale, in the clear lane to the right of the pull-quote. Anchored
          to the bottom with air above the seed head, and a soft fade so the
          lower stem dissolves into the section. Shown on xl+ where there's room;
          below that the section is text-only. */}
      <img
        src="/illustrations/vellugtende-guldaks.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="hidden xl:block absolute right-8 bottom-0 h-[86%] w-auto max-w-none grayscale opacity-90 pointer-events-none select-none [-webkit-mask-image:linear-gradient(to_top,transparent,#000_24%)] [mask-image:linear-gradient(to_top,transparent,#000_24%)]"
      />

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
            <p className="font-serif font-medium text-[1.18rem] leading-[1.45] sm:text-[clamp(1.4rem,2vw,1.75rem)] sm:leading-[1.3] tracking-tight text-moss-deep pl-5 sm:pl-6 border-l-2 border-rust py-1 xl:max-w-[25rem]">
              Naturgenopretning handler i dag ikke om at fastholde én tilstand, men om at genskabe naturlige processer — græsning, naturlig hydrologi — og lade naturen udvikle sig derfra. Målingen har kun delvis fulgt med. Vi måler det, der er det egentlige formål: hvilke arter der kommer, og hvordan levestedet udvikler sig.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
