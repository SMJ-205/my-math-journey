"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

interface AlgebraBalanceProps {
  leftExpr: string;
  rightExpr: string;
  variableName?: string;
}

export function AlgebraBalanceSimulator({
  leftExpr,
  rightExpr,
  variableName = "n",
}: AlgebraBalanceProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";

  return (
    <div className="flex flex-col items-center gap-4 py-4 w-full max-w-md mx-auto">
      {/* Balance Title / Concept */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
        <Scale size={14} className="text-amber-500" />
        <span>{isEn ? "Balance Scale Principle" : "Prinsip Keseimbangan Timbangan"}</span>
      </div>

      {/* Visual Balance Scale */}
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {/* Beam and Plates */}
        <div className="w-full flex items-center justify-between px-4 z-10">
          {/* Left Pan */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Hanging chain */}
            <div className="w-0.5 h-6 bg-amber-400" />
            {/* Left Pan Content */}
            <div className="bg-gradient-to-b from-white to-amber-50 border-2 border-amber-400 rounded-2xl px-4 py-3 shadow-md min-w-[90px] text-center">
              <span className="text-lg font-black text-amber-900 tracking-wide font-mono">
                {leftExpr}
              </span>
            </div>
            {/* Pan Base */}
            <div className="w-20 h-2 bg-amber-300 rounded-b-full shadow-sm mt-0.5" />
          </motion.div>

          {/* Center Equals Pivot */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white">
              =
            </div>
            <div className="w-1 h-8 bg-amber-600 rounded-full mt-1" />
            <div className="w-12 h-3 bg-amber-700 rounded-t-lg shadow" />
          </div>

          {/* Right Pan */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Hanging chain */}
            <div className="w-0.5 h-6 bg-amber-400" />
            {/* Right Pan Content */}
            <div className="bg-gradient-to-b from-white to-amber-50 border-2 border-amber-400 rounded-2xl px-4 py-3 shadow-md min-w-[90px] text-center">
              <span className="text-lg font-black text-amber-900 tracking-wide font-mono">
                {rightExpr}
              </span>
            </div>
            {/* Pan Base */}
            <div className="w-20 h-2 bg-amber-300 rounded-b-full shadow-sm mt-0.5" />
          </motion.div>
        </div>

        {/* Balance Horizontal Beam (behind pans) */}
        <div className="absolute top-[34px] left-8 right-8 h-2 bg-amber-400 rounded-full z-0" />
      </div>

      {/* Explanatory badge */}
      <p className="text-xs text-gray-500 text-center font-medium max-w-xs">
        {isEn ? (
          <>
            Both sides of the scale are balanced. Find the value of{" "}
            <span className="font-bold text-amber-600 font-mono">{variableName}</span> so
            both sides maintain the same value.
          </>
        ) : (
          <>
            Kedua sisi timbangan seimbang. Carilah nilai{" "}
            <span className="font-bold text-amber-600 font-mono">{variableName}</span> agar
            kedua sisi tetap sama nilainya.
          </>
        )}
      </p>
    </div>
  );
}
