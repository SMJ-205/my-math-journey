"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/store/languageStore";

export interface LadderStep {
  divisor: number;
  quotients: number[];
}

export interface LadderMethodProps {
  numbers: number[]; // e.g. [12, 18] or [24, 36]
  highlightMode?: "fpb" | "kpk" | "both";
  gcf?: number;
  lcm?: number;
  label?: string;
}

// Compute ladder steps automatically for 2 or 3 numbers
function computeLadderSteps(nums: number[]): {
  steps: { divisor: number; prevValues: number[] }[];
  bottomRow: number[];
  leftDivisors: number[];
} {
  const steps: { divisor: number; prevValues: number[] }[] = [];
  let current = [...nums];
  const primes = [2, 3, 5, 7, 11, 13, 17, 19];
  const leftDivisors: number[] = [];

  let changed = true;
  while (changed) {
    changed = false;
    for (const p of primes) {
      // For FPB ladder: divisor must divide all numbers
      if (current.every((n) => n % p === 0 && n > 0)) {
        steps.push({ divisor: p, prevValues: [...current] });
        leftDivisors.push(p);
        current = current.map((n) => n / p);
        changed = true;
        break;
      }
    }
  }

  return { steps, bottomRow: current, leftDivisors };
}

export function LadderMethodSimulator({
  numbers,
  highlightMode = "both",
  gcf,
  lcm,
  label,
}: LadderMethodProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";

  const [activeTab, setActiveTab] = useState<"fpb" | "kpk">(
    highlightMode === "kpk" ? "kpk" : "fpb"
  );

  const { steps, bottomRow, leftDivisors } = computeLadderSteps(numbers);

  const computedGcf =
    gcf ?? (leftDivisors.length > 0 ? leftDivisors.reduce((a, b) => a * b, 1) : 1);
  const computedLcm =
    lcm ??
    (leftDivisors.length > 0
      ? leftDivisors.reduce((a, b) => a * b, 1) * bottomRow.reduce((a, b) => a * b, 1)
      : numbers.reduce((a, b) => a * b, 1));

  return (
    <div className="flex flex-col items-center gap-3.5 py-2 w-full max-w-lg mx-auto">
      {/* Title / Description */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E4EEF8] text-[#1D3556] border border-[#CADDF0]">
          {isEn ? "Ladder Method (Sengkedan)" : "Metode Tangga / Sengkedan"}
        </span>
        {label && <p className="text-xs text-[#415777] font-medium mt-1">{label}</p>}
      </div>

      {/* Mode toggle */}
      {highlightMode === "both" && (
        <div className="flex bg-[#EDF3FA] p-1 rounded-2xl gap-1 border border-[#D0DFEF]">
          <button
            type="button"
            onClick={() => setActiveTab("fpb")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "fpb"
                ? "bg-[#2B4A75] text-white shadow-xs"
                : "text-[#3B5478] hover:text-[#182C48]"
            }`}
          >
            {isEn ? "GCF: 'I' Shape" : "FPB: Huruf 'I' (Kolom Kiri)"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("kpk")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "kpk"
                ? "bg-[#1E3250] text-white shadow-xs"
                : "text-[#3B5478] hover:text-[#182C48]"
            }`}
          >
            {isEn ? "LCM: 'L' Shape" : "KPK: Huruf 'L' (Kiri & Bawah)"}
          </button>
        </div>
      )}

      {/* Ladder Grid Card */}
      <div className="w-full bg-white rounded-2xl border-2 border-[#D2E1F0] p-4 shadow-xs">
        <div className="overflow-x-auto flex justify-center">
          <table className="border-collapse text-center text-sm md:text-base font-bold">
            <tbody>
              {/* If no common divisor, display clean fallback */}
              {steps.length === 0 ? (
                <tr>
                  <td className="p-3 text-gray-400 font-mono">-</td>
                  <td className="p-3 border-l-2 border-gray-300">
                    <div className="flex gap-4">
                      {numbers.map((n, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-lg">
                          {n}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ) : (
                steps.map((st, sIdx) => {
                  const isFpbActive = activeTab === "fpb";
                  return (
                    <motion.tr
                      key={sIdx}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sIdx * 0.1 }}
                      className="border-b-2 border-[#CADDF0]"
                    >
                      {/* Left Divisor */}
                      <td className="pr-3 py-2 text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-xl text-sm font-black transition-all ${
                            isFpbActive || activeTab === "kpk"
                              ? "bg-[#2B4A75] text-white shadow-xs ring-2 ring-[#B9D2EC]"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {st.divisor}
                        </span>
                      </td>

                      {/* Numbers being divided */}
                      <td className="pl-4 py-2 border-l-4 border-[#3B629B] text-left">
                        <div className="flex gap-4 sm:gap-6">
                          {st.prevValues.map((val, vIdx) => (
                            <span
                              key={vIdx}
                              className="min-w-[32px] text-center font-mono font-bold text-[#182C48]"
                            >
                              {val}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}

              {/* Bottom Quotients Row */}
              {steps.length > 0 && (
                <tr className="bg-[#F1F6FC]">
                  <td className="pr-3 py-2 text-right text-xs text-gray-400">
                    {/* Empty left column */}
                  </td>
                  <td className="pl-4 py-2 border-l-4 border-[#3B629B] text-left">
                    <div className="flex gap-4 sm:gap-6">
                      {bottomRow.map((val, bIdx) => {
                        const isKpkActive = activeTab === "kpk";
                        return (
                          <span
                            key={bIdx}
                            className={`min-w-[32px] text-center font-mono font-bold px-2 py-0.5 rounded-lg transition-all ${
                              isKpkActive
                                ? "bg-[#1E3250] text-white shadow-xs ring-2 ring-[#9FB8D6]"
                                : "text-[#415777] bg-white border border-[#CADDF0]"
                            }`}
                          >
                            {val}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Legend & Formula summary */}
        <div className="mt-4 pt-3 border-t border-[#D2E1F0] flex flex-col gap-2">
          {activeTab === "fpb" && (
            <div className="flex items-center justify-between text-xs sm:text-sm bg-[#EEF6FB] text-[#16385E] p-2.5 rounded-xl border border-[#B6D3ED]">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2B4A75] inline-block" />
                <span>{isEn ? "GCF (Vertical 'I')" : "FPB (Tegak 'I')"}</span>
              </div>
              <div className="font-mono font-bold">
                {leftDivisors.length > 1
                  ? `${leftDivisors.join(" × ")} = ${computedGcf}`
                  : leftDivisors.length === 1
                  ? `${leftDivisors[0]}`
                  : "1"}
              </div>
            </div>
          )}

          {activeTab === "kpk" && (
            <div className="flex items-center justify-between text-xs sm:text-sm bg-[#EAF1F9] text-[#183153] p-2.5 rounded-xl border border-[#CADDF0]">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3250] inline-block" />
                <span>{isEn ? "LCM (Shape 'L')" : "KPK (Bentuk 'L')"}</span>
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm">
                {[...leftDivisors, ...bottomRow].join(" × ")} = {computedLcm}
              </div>
            </div>
          )}

          <p className="text-[11px] text-[#516B8E] text-center italic">
            {activeTab === "fpb"
              ? isEn
                ? "Multiply all prime divisors on the left vertical line ('I' shape)."
                : "FPB = Kalikan semua pembagi di kolom kiri (tegak seperti huruf 'I')."
              : isEn
                ? "Multiply all left divisors and bottom row quotients ('L' shape)."
                : "KPK = Kalikan semua pembagi kiri dan sisa bawah (membentuk huruf 'L')."}
          </p>
        </div>
      </div>
    </div>
  );
}
