import { Reveal } from "../utils";

export function TrustWhyContact() {
  return (
    <>
      <section id="om" className="py-12 md:py-24">
        <div className="wrap">
          <Reveal>
            <div className="mb-8 w-full md:mb-13">
              <span className="font-mono text-xs tracking-[0.14em] uppercase text-moss font-medium mb-4 block">
              05 · Faglighed
            </span>
              <h2 className="font-serif font-medium text-[clamp(2rem,3.6vw,3rem)] leading-[1.06] tracking-tight max-w-[16em]">
                Forskningskvalitet uden forskningsbudget
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 md:gap-12">
            <Reveal delay={0.08} className="border-t-[2px] border-ink pt-6">
              <span className="font-mono text-xs text-moss block mb-3.5">01</span>
              <h3 className="font-serif font-medium text-[1.3rem] tracking-tight mb-3">Teknologiplatform</h3>
              <p className="text-ink-soft text-[1.02rem] leading-[1.58]">
                De forskellige datastrømme samles og behandles i én platform. Det gør løbende monitorering mulig uden et felthold af biologer ved hvert besøg.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="border-t-[2px] border-ink pt-6">
              <span className="font-mono text-xs text-moss block mb-3.5">02</span>
              <h3 className="font-serif font-medium text-[1.3rem] tracking-tight mb-3">Forskningsnær metode</h3>
              <p className="text-ink-soft text-[1.02rem] leading-[1.58]">
                Vores metoder bygger på arbejde fra førende danske forskningsmiljøer inden for biodiversitet og eDNA (blandt andet Aarhus Universitet, Københavns Universitet og DTU Aqua) og afspejler den aktuelle udvikling i målstyring og effektmåling i dynamisk natur. Vi følger feltet og tilpasser protokollerne derefter.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="border-t-[2px] border-ink pt-6">
              <span className="font-mono text-xs text-moss block mb-3.5">03</span>
              <h3 className="font-serif font-medium text-[1.3rem] tracking-tight mb-3">Standardiserede protokoller</h3>
              <p className="text-ink-soft text-[1.02rem] leading-[1.58]">
                Ekspertisen ligger i design og tolkning. Selve indsamlingen er enkel, fast og kan gentages. Det holder kvaliteten oppe og omkostningerne nede.
              </p>
            </Reveal>

            <Reveal delay={0.32} className="border-t-[2px] border-ink pt-6">
              <span className="font-mono text-xs text-moss block mb-3.5">04</span>
              <h3 className="font-serif font-medium text-[1.3rem] tracking-tight mb-3">Fælles fagligt sprog</h3>
              <p className="text-ink-soft text-[1.02rem] leading-[1.58]">
                Vi rapporterer i de begreber, sektoren allerede bruger: naturtilstand (arts- og strukturindeks), artsscore for planter, rødlistede arter og EU's naturgenopretningsforordnings indikatorer. Det gør, at en fond kan lægge vores tal direkte ind i sin egen mål- og effektafrapportering.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-moss-deep text-paper py-12 md:py-24">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-7 md:gap-12 items-center">
            <Reveal>
              <h2 className="font-serif font-medium text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.08] tracking-tight">
                Et lille, specialiseret hold
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-[1.15rem] leading-[1.62] text-white/80">
                Biota Metrics er et lille hold, der laver én ting: måler biodiversitetens udvikling i naturgenopretningsprojekter. Det holder omkostningerne nede, og det betyder, at I taler med dem, der udfører arbejdet.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-12 md:py-24 text-center">
        <div className="wrap">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-moss font-medium mb-4 block">
            Kontakt
          </span>
          <Reveal>
            <h2 className="font-serif font-medium text-[clamp(1.85rem,4vw,3.3rem)] leading-[1.05] tracking-tight mb-6 text-balance">
              Har I et område, der skal måles?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[1.05rem] sm:text-[1.18rem] text-ink-soft max-w-[34em] mx-auto mb-8 sm:mb-9 leading-relaxed text-left sm:text-center">
              Skriv et par ord om projektet, for eksempel areal, naturtype og hvilke biodiversitetsmål I arbejder med. Så vender vi tilbage med et forslag til, hvordan en baseline, et måleforløb og referenceområder kan se ud hos jer.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="mailto:kontakt@biotametrics.com"
              className="font-sans text-[14px] sm:text-[15px] text-ink border border-ink px-7 py-3.5 inline-flex items-center justify-center sm:justify-start w-full sm:w-auto max-w-full gap-3 transition-[color,background-color,transform] duration-200 font-medium hover:bg-ink hover:text-paper active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper group"
            >
              kontakt@biotametrics.com
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
