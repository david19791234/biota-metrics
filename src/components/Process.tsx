import { Reveal } from "../utils";

export function Process() {
  return (
    <section id="forloeb" className="py-12 md:py-24 bg-ink text-paper relative z-20">
      <div className="wrap">
        <Reveal>
          <div className="mb-8 w-full md:mb-13">
            <span className="font-mono text-xs tracking-[0.14em] uppercase font-medium mb-4 block text-sage">
              03 · Forløb
            </span>
            <h2 className="font-serif font-medium text-paper text-[clamp(2rem,3.6vw,3rem)] leading-[1.06] tracking-tight max-w-[16em]">
              Fra baseline til biodiversitetsrapport
            </h2>
            <p className="text-[1.04rem] md:text-[1.12rem] leading-[1.55] md:leading-[1.62] text-white/70 max-w-[42em] mt-6">
              Vi viser udviklingen som et forløb op mod referenceområder (et plausibelt, langsigtet niveau fra sammenlignelige naturområder) frem for indfrielsen af et fast, vilkårligt slutmål. Den højeste score er ikke målet i sig selv; retningen og fremdriften er.
            </p>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 md:border-t border-white/20 pl-6 md:pl-0">
          {/* mobile-only vertical rail connecting the step dots into a timeline */}
          <span className="absolute left-[3px] top-2 bottom-2 w-px bg-white/15 md:hidden" aria-hidden="true"></span>
          <Reveal delay={0.08} className="relative pt-9 pb-2 md:pt-8 md:pr-8">
            <span className="absolute top-7 -left-6 w-[9px] h-[9px] rounded-full bg-rust md:top-[-5px] md:left-0 md:-translate-y-px"></span>
            <div className="font-mono text-xs tracking-[0.14em] text-sage mb-4">Baseline · år 0</div>
            <h3 className="font-serif font-medium text-[1.5rem] tracking-tight mb-3.5">Udgangspunktet</h3>
            <p className="text-white/70 text-[1.02rem] leading-[1.58]">
              Vi måler tilstanden, før eller netop som genopretningen sætter ind, og vælger de referenceområder, udviklingen skal holdes op imod. Uden en baseline kan udvikling ikke dokumenteres, kun påstås.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="relative pt-9 pb-2 md:border-l md:border-white/15 md:pt-8 md:px-8">
            <span className="absolute top-7 -left-6 w-[9px] h-[9px] rounded-full bg-rust md:left-[32px] md:top-[-5px] md:-translate-y-px"></span>
            <div className="font-mono text-xs tracking-[0.14em] text-sage mb-4">Løbende</div>
            <h3 className="font-serif font-medium text-[1.5rem] tracking-tight mb-3.5">Indsamling i felten</h3>
            <p className="text-white/70 text-[1.02rem] leading-[1.58]">
              En fast feltmedarbejder følger samme protokol med fast interval, typisk månedligt i vækstsæsonen. Det giver et løbende signal mellem de årlige rapporter, og det er standardiseringen, der gør målingerne sammenlignelige over tid.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="relative pt-9 pb-2 md:border-l md:border-white/15 md:pt-8 md:pl-8">
            <span className="absolute top-7 -left-6 w-[9px] h-[9px] rounded-full bg-rust md:left-[32px] md:top-[-5px] md:-translate-y-px"></span>
            <div className="font-mono text-xs tracking-[0.14em] text-sage mb-4">Årligt</div>
            <h3 className="font-serif font-medium text-[1.5rem] tracking-tight mb-3.5">Biodiversitetsrapport</h3>
            <p className="text-white/70 text-[1.02rem] leading-[1.58]">
              En gang om året samler vi data fra alle kilder i én rapport. Den viser udviklingen siden baseline, sammenligningen med referenceområderne og status på de mål, I arbejder med, oversat til de standarder, jeres modtagere kender, så den kan bruges direkte over for bestyrelse, donorer og offentlighed.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
