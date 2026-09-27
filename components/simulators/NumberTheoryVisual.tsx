"use client";

import { motion } from "framer-motion";
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
        <div className="w-full bg-amber-50/80 rounded-2xl border-2 border-amber-200 p-4 shadow-sm flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 bg-amber-200 text-amber-900 rounded-full">
              {isEn ? `Factors of ${number}` : `Faktor dari Bilangan ${number}`}
            </span>
          </div>

          {/* Factor Pairs */}
          <div className="flex flex-wrap justify-center gap-2">
            {factorPairs.map(([a, b], idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-semibold text-gray-700 shadow-xs"
              >
                <span className="font-bold text-amber-700">{a}</span>
                <span className="text-gray-400">×</span>
                <span className="font-bold text-amber-700">{b}</span>
                <span className="text-gray-400">=</span>
                <span className="font-bold text-gray-900">{number}</span>
              </div>
            ))}
          </div>

          {/* Factor Chips */}
          <div className="w-full pt-2 border-t border-amber-200/60 flex flex-col items-center gap-1.5">
            <p className="text-[11px] font-semibold text-gray-500">
              {isEn ? "All factors (divisors):" : "Daftar semua bilangan pembagi habis:"}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {computedFactors.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center"
                >
                  <span className="w-8 h-8 rounded-xl bg-white border-2 border-amber-400 font-bold text-sm text-amber-900 flex items-center justify-center shadow-xs">
                    {f}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5">#{i + 1}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs font-bold text-amber-900 mt-1">
              {isEn
                ? `Total: ${computedFactors.length} factors`
                : `Total: ada ${computedFactors.length} faktor`}
            </p>
          </div>
        </div>
      )}

      {/* Mode 2: Prime Check */}
      {mode === "prime-check" && (
        <div className="w-full bg-white rounded-2xl border-2 border-purple-200 p-4 shadow-sm flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {number}
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">
              {isEn ? `Testing divisors of ${number}:` : `Menguji pembagi dari ${number}:`}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {computedFactors.map((f) => (
                <span
                  key={f}
                  className="px-2.5 py-1 bg-purple-50 border border-purple-200 text-purple-800 rounded-lg text-xs font-bold font-mono"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`w-full py-2 px-3 rounded-xl border text-center text-xs font-bold ${
              computedFactors.length === 2
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "bg-blue-50 border-blue-300 text-blue-800"
            }`}
          >
            {computedFactors.length === 2
              ? isEn
                ? `✓ Prime Number (Only 2 factors: 1 and ${number})`
                : `✓ Bilangan Prima (Hanya memiliki 2 faktor: 1 dan ${number})`
              : isEn
                ? `Composite Number (${computedFactors.length} factors: divisible by other numbers)`
                : `Bilangan Komposit (Memiliki ${computedFactors.length} faktor: punya pembagi lain)`}
          </div>
        </div>
      )}

      {/* Mode 3: Prime Factorization */}
      {mode === "prime-factorization" && (
        <div className="w-full bg-white rounded-2xl border-2 border-emerald-200 p-4 shadow-sm flex flex-col items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
            🌳 {isEn ? "Prime Factorization Tree" : "Pohon Faktorisasi Prima"}
          </span>
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-sm">
            {number}
          </div>

          <div className="text-center font-mono font-bold text-sm bg-emerald-50 text-emerald-900 px-4 py-2 rounded-xl border border-emerald-200">
            {number} = {factorization ?? `${computedFactors.filter((f) => f > 1).join(" × ")}`}
          </div>

          <p className="text-[11px] text-gray-500 text-center italic">
            {isEn
              ? "Divided repeatedly by smallest prime numbers (2, 3, 5, ...) until 1 remains."
              : "Dibagi berulang dengan bilangan prima terkecil (2, 3, 5, ...) sampai habis."}
          </p>
        </div>
      )}

      {/* Mode 4: Multiples */}
      {mode === "multiples" && multiples && (
        <div className="w-full bg-white rounded-2xl border-2 border-blue-200 p-4 shadow-sm flex flex-col items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-800 rounded-full border border-blue-300">
            🏃 {isEn ? `Multiples of ${multiples.base}` : `Kelipatan ${multiples.base}`}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: multiples.count }, (_, k) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="px-3 py-1.5 bg-blue-50 border border-blue-300 rounded-xl text-xs font-bold font-mono text-blue-900 shadow-2xs">
                  {(k + 1) * multiples.base}
                </span>
                {k < multiples.count - 1 && <span className="text-gray-300 text-xs font-bold">→</span>}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 text-center font-mono">
            +{multiples.base} {isEn ? "each step" : "setiap langkah"}
          </p>
        </div>
      )}

      {/* Mode 5: Primes in Range */}
      {mode === "primes-in-range" && range && (
        <div className="w-full bg-white rounded-2xl border-2 border-indigo-200 p-4 shadow-sm flex flex-col items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full border border-indigo-300">
            🔍 {isEn ? `Primes between ${range.start} & ${range.end}` : `Prima antara ${range.start} dan ${range.end}`}
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {range.primes.map((p) => (
              <span
                key={p}
                className="w-9 h-9 rounded-xl bg-indigo-50 border-2 border-indigo-400 font-bold text-sm text-indigo-900 flex items-center justify-center shadow-xs"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="text-xs font-bold text-indigo-900">
            {isEn
              ? `Total: ${range.primes.length} prime numbers`
              : `Total: ada ${range.primes.length} bilangan prima`}
          </p>
        </div>
      )}
    </div>
  );
}
