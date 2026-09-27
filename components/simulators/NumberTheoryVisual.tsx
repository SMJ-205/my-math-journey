"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

export interface NumberTheoryVisualProps {
  mode: "factors" | "prime-check" | "prime-factorization" | "multiples" | "primes-in-range";
  number?: number;
  factors?: number[];
  isPrime?: boolean;
  factorization?: string;
  multiples?: { base: number; count: number };
  range?: { start: number; end: number; primes: number[] };
}

export function NumberTheoryVisualSimulator({
  mode,
  number = 12,
  factors: providedFactors,
  isPrime,
  factorization,
  multiples,
  range,
}: NumberTheoryVisualProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";

  // Calculate factors if not provided
  const computedFactors =
    providedFactors ??
    (() => {
      const res: number[] = [];
      for (let i = 1; i <= number; i++) {
        if (number % i === 0) res.push(i);
      }
      return res;
    })();

  // Factor pairs: (1, N), (2, N/2), ...
  const factorPairs: [number, number][] = [];
  for (const f of computedFactors) {
    if (f * f <= number) {
      factorPairs.push([f, number / f]);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 py-2 w-full max-w-md mx-auto">
      {/* Mode 1: Factors Display */}
      {mode === "factors" && (
        <div className="w-full bg-[#F8F4EC] rounded-2xl border-2 border-[#E3D7C5] p-4 shadow-xs flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 bg-[#EFE4D3] text-[#6B4E2B] border border-[#DECDB7] rounded-full">
              {isEn ? `Factors of ${number}` : `Faktor dari Bilangan ${number}`}
            </span>
          </div>

          {/* Factor Pairs */}
          <div className="flex flex-wrap justify-center gap-2">
            {factorPairs.map(([a, b], idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D9CCBA] rounded-xl text-xs font-semibold text-[#54412E] shadow-2xs"
              >
                <span className="font-bold text-[#805F36]">{a}</span>
                <span className="text-gray-400">×</span>
                <span className="font-bold text-[#805F36]">{b}</span>
                <span className="text-gray-400">=</span>
                <span className="font-bold text-[#3E2F1F]">{number}</span>
              </div>
            ))}
          </div>

          {/* Factor Chips */}
          <div className="w-full pt-2.5 border-t border-[#D9CCBA] flex flex-col items-center gap-1.5">
            <p className="text-[11px] font-semibold text-[#7A6652]">
              {isEn ? "All factors (divisors):" : "Daftar semua bilangan pembagi habis:"}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {computedFactors.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center"
                >
                  <span className="w-8 h-8 rounded-xl bg-white border-2 border-[#CBB69B] font-bold text-sm text-[#3E2F1F] flex items-center justify-center shadow-2xs">
                    {f}
                  </span>
                  <span className="text-[9px] text-[#8C7A67] font-mono mt-0.5">#{i + 1}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs font-bold text-[#4E3924] mt-1">
              {isEn
                ? `Total: ${computedFactors.length} factors`
                : `Total: ada ${computedFactors.length} faktor`}
            </p>
          </div>
        </div>
      )}

      {/* Mode 2: Prime Check */}
      {mode === "prime-check" && (
        <div className="w-full bg-white rounded-2xl border-2 border-[#E5DACE] p-4 shadow-xs flex flex-col items-center gap-3">
          <div className="w-13 h-13 rounded-2xl bg-[#9A7342] text-white font-black text-2xl flex items-center justify-center shadow-xs">
            {number}
          </div>

          <div className="text-center">
            <p className="text-xs text-[#6B543D] font-medium">
              {isEn ? `Testing divisors of ${number}:` : `Menguji pembagi dari ${number}:`}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {computedFactors.map((f) => (
                <span
                  key={f}
                  className="px-2.5 py-1 bg-[#F8F4EC] border border-[#DFD1BD] text-[#523F2B] rounded-lg text-xs font-bold font-mono"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`w-full py-2 px-3 rounded-xl border text-center text-xs font-bold flex items-center justify-center gap-1.5 ${
              computedFactors.length === 2
                ? "bg-[#EEF5F0] border-[#BCD8C6] text-[#24523B]"
                : "bg-[#F8F4EC] border-[#DFD1BD] text-[#54412E]"
            }`}
          >
            {computedFactors.length === 2 ? (
              <>
                <CheckCircle2 size={14} className="text-[#2C6347]" />
                <span>
                  {isEn
                    ? `Prime Number (Only 2 factors: 1 and ${number})`
                    : `Bilangan Prima (Hanya memiliki 2 faktor: 1 dan ${number})`}
                </span>
              </>
            ) : (
              <span>
                {isEn
                  ? `Composite Number (${computedFactors.length} factors: divisible by other numbers)`
                  : `Bilangan Komposit (Memiliki ${computedFactors.length} faktor: punya pembagi lain)`}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Mode 3: Prime Factorization */}
      {mode === "prime-factorization" && (
        <div className="w-full bg-white rounded-2xl border-2 border-[#E5DACE] p-4 shadow-xs flex flex-col items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 bg-[#EFE4D3] text-[#6B4E2B] border border-[#DECDB7] rounded-full">
            {isEn ? "Prime Factorization Tree" : "Pohon Faktorisasi Prima"}
          </span>
          <div className="w-12 h-12 rounded-xl bg-[#9A7342] text-white font-black text-xl flex items-center justify-center shadow-xs">
            {number}
          </div>

          <div className="text-center font-mono font-bold text-sm bg-[#F8F4EC] text-[#3E2F1F] px-4 py-2 rounded-xl border border-[#DFD1BD]">
            {number} = {factorization ?? `${computedFactors.filter((f) => f > 1).join(" × ")}`}
          </div>

          <p className="text-[11px] text-[#7A6652] text-center italic">
            {isEn
              ? "Divided repeatedly by smallest prime numbers (2, 3, 5, ...) until 1 remains."
              : "Dibagi berulang dengan bilangan prima terkecil (2, 3, 5, ...) sampai habis."}
          </p>
        </div>
      )}

      {/* Mode 4: Multiples */}
      {mode === "multiples" && multiples && (
        <div className="w-full bg-white rounded-2xl border-2 border-[#E5DACE] p-4 shadow-xs flex flex-col items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 bg-[#EFE4D3] text-[#6B4E2B] border border-[#DECDB7] rounded-full">
            {isEn ? `Multiples of ${multiples.base}` : `Kelipatan ${multiples.base}`}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {Array.from({ length: multiples.count }, (_, k) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="px-3 py-1 bg-[#F8F4EC] border border-[#DFD1BD] rounded-xl text-xs font-bold font-mono text-[#4A3825]">
                  {(k + 1) * multiples.base}
                </span>
                {k < multiples.count - 1 && <span className="text-[#C4B39C] text-xs font-bold">→</span>}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#7A6652] text-center font-mono">
            +{multiples.base} {isEn ? "each step" : "setiap langkah"}
          </p>
        </div>
      )}

      {/* Mode 5: Primes in Range */}
      {mode === "primes-in-range" && range && (
        <div className="w-full bg-white rounded-2xl border-2 border-[#E5DACE] p-4 shadow-xs flex flex-col items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 bg-[#EFE4D3] text-[#6B4E2B] border border-[#DECDB7] rounded-full">
            {isEn ? `Primes between ${range.start} & ${range.end}` : `Prima antara ${range.start} dan ${range.end}`}
          </span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {range.primes.map((p) => (
              <span
                key={p}
                className="w-9 h-9 rounded-xl bg-[#F8F4EC] border-2 border-[#D9CCBA] font-bold text-sm text-[#3E2F1F] flex items-center justify-center shadow-2xs"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="text-xs font-bold text-[#4E3924]">
            {isEn
              ? `Total: ${range.primes.length} prime numbers`
              : `Total: ada ${range.primes.length} bilangan prima`}
          </p>
        </div>
      )}
    </div>
  );
}
