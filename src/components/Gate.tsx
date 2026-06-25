import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../utils";
import { BiotaMark } from "./Logo";

/* Soft access gate for the stealth phase. NOTE: this is a client-side barrier
   only — it keeps casual visitors out, but the PIN and the site live in the JS
   bundle, so it is not real protection. Swap for Cloudflare Access (or a host
   with server-side auth) when real confidentiality is needed. */
const PIN = "1234";
const STORAGE_KEY = "biota-access";

export function Gate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1"
  );

  if (unlocked) return <>{children}</>;

  const unlock = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode — gate simply won't persist */
    }
    setUnlocked(true);
  };

  return <AccessScreen onUnlock={unlock} />;
}

function GateLogo() {
  return <BiotaMark width={150} height={106} className="block" />;
}

function AccessScreen({ onUnlock }: { onUnlock: () => void }) {
  const reduce = useReducedMotion();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const check = (code: string) => {
    if (code === PIN) {
      onUnlock();
    } else {
      setError(true);
      setDigits(["", "", "", ""]);
      window.setTimeout(() => refs.current[0]?.focus(), 0);
    }
  };

  // Fill boxes from index `start` with the digits found in `raw` (handles both a
  // single keystroke and a pasted "1234"), then submit once all four are set.
  const fillFrom = (start: number, raw: string) => {
    const nums = raw.replace(/\D/g, "").split("");
    if (nums.length === 0) return;
    setError(false);
    const next = [...digits];
    let i = start;
    for (const n of nums) {
      if (i > 3) break;
      next[i] = n;
      i += 1;
    }
    setDigits(next);
    refs.current[Math.min(i, 3)]?.focus();
    if (next.every((d) => d !== "")) check(next.join(""));
  };

  const handleChange = (i: number, value: string) => {
    if (value === "") {
      const next = [...digits];
      next[i] = "";
      setDigits(next);
      return;
    }
    fillFrom(i, value);
  };

  const handleKeyDown = (i: number, e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Backspace" && digits[i] === "" && i > 0) {
      e.preventDefault();
      const next = [...digits];
      next[i - 1] = "";
      setDigits(next);
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-paper px-6 py-16">
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="w-full max-w-[360px] text-center"
      >
        <div className="flex flex-col items-center gap-4 mb-10">
          <GateLogo />
          <span className="font-serif font-medium text-[1.35rem] tracking-tight text-ink">Biota Metrics</span>
        </div>

        <h1 className="font-serif font-medium text-[1.6rem] leading-tight tracking-tight text-ink mb-2.5">
          Indtast adgangskode
        </h1>
        <p className="text-[14px] text-ink-soft leading-relaxed mb-8 mx-auto max-w-[26em]">
          Siden er endnu ikke offentlig. Indtast den firecifrede kode for at fortsætte.
        </p>

        <motion.div
          animate={{ x: error && !reduce ? [0, -7, 7, -5, 5, 0] : 0 }}
          transition={{ duration: 0.36, ease: EASE }}
          className="flex items-center justify-center gap-3"
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              aria-label={`Ciffer ${i + 1} af 4`}
              className={`size-14 rounded-[10px] border bg-paper-sub text-center font-mono text-[1.5rem] text-ink caret-moss outline-none transition-[border-color,box-shadow] duration-150 focus:ring-2 focus:ring-[#8ba48e]/40 ${
                error ? "border-rust" : "border-line focus:border-moss"
              }`}
            />
          ))}
        </motion.div>

        <div className="h-6 mt-4" aria-live="polite">
          {error && <span className="text-[13px] text-rust">Forkert kode — prøv igen.</span>}
        </div>
      </motion.div>
    </main>
  );
}
