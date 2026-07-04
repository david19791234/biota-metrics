export function Footer() {
  return (
    <footer className="border-t border-line pt-11 pb-9 md:pt-14 md:pb-11">
      <div className="wrap">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10">
          <div>
            <div className="font-serif font-medium text-[1.2rem] sm:text-[1.3rem] tracking-tight mb-2">Biota Metrics</div>
            <div className="text-ink-soft text-[15px] max-w-[24em]">Biodiversitetsmonitorering for naturgenopretning.</div>
          </div>
          <div className="font-mono text-[12.5px] text-ink-faint leading-[1.9] text-left md:text-right">
            København, Danmark<br />
            CVR [xx xx xx xx]<br />
            <a href="mailto:kontakt@biotametrics.com" className="inline-block py-2 -my-2 sm:py-0 sm:my-0 text-ink-soft no-underline border-b border-line hover:text-ink transition-colors duration-200 rounded-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-deep focus-visible:ring-offset-2">
              kontakt@biotametrics.com
            </a><br />
            © 2026 Biota Metrics
          </div>
        </div>
      </div>
    </footer>
  );
}
