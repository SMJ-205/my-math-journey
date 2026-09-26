"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useLanguageStore } from "@/store/languageStore";

type Operation = "add" | "subtract" | "multiply" | "divide";

export interface ColumnArithmeticProps {
  operation: Operation;
  operands: [number, number];
  digitCount: number;
  onAnswer?: (value: string, isCorrect: boolean, misconceptionTag?: string) => void;
}

const operationSymbols: Record<Operation, string> = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

const PLACE_LABELS_ID = ["ribuan", "ratusan", "puluhan", "satuan"];
const PLACE_LABELS_EN = ["thousands", "hundreds", "tens", "ones"];

function computeResult(a: number, b: number, op: Operation): number {
  switch (op) {
    case "add":      return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide":   return Math.floor(a / b);
  }
}

function toDigits(n: number, cols: number): string[] {
  return String(Math.abs(n)).padStart(cols, "0").split("");
}

// ─── Mini Number Helper Popup ────────────────────────────────────────────────
function MiniNumberHelper({
  placeLabel,
  onSelectDigit,
  onClear,
  onClose,
  hasValue,
  isEn,
}: {
  placeLabel: string;
  onSelectDigit: (d: string) => void;
  onClear: () => void;
  onClose: () => void;
  hasValue: boolean;
  isEn: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.16 }}
      className="mt-4 bg-amber-50/95 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col items-center gap-3 z-20 w-full max-w-[360px] sm:max-w-[400px]"
    >
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-sm font-black text-amber-900 tracking-wide">
          {isEn ? `Select ${placeLabel} digit:` : `Pilih angka ${placeLabel}:`}
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-sm font-black px-2.5 py-1 rounded-lg hover:bg-amber-200/60 transition-colors cursor-pointer"
          aria-label={isEn ? "Close helper" : "Tutup helper"}
        >
          ✕
        </button>
      </div>

      {/* Grid of keys 1-9 and 0 */}
      <div className="grid grid-cols-5 gap-2.5 sm:gap-3 w-full">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
          <button
            key={num}
            id={`mini-key-${num}`}
            onClick={() => onSelectDigit(num)}
            className="h-14 sm:h-16 rounded-2xl bg-white border-2 border-amber-200 text-amber-950 font-black text-2xl sm:text-3xl shadow-sm hover:bg-amber-100 hover:border-amber-400 hover:shadow-md active:scale-95 transition-all flex items-center justify-center cursor-pointer select-none"
          >
            {num}
          </button>
        ))}
      </div>

      {hasValue && (
        <button
          onClick={onClear}
          className="text-xs sm:text-sm font-bold text-red-500 hover:text-red-700 pt-1 transition-colors cursor-pointer"
        >
          {isEn ? "Clear this box" : "Kosongkan kotak ini"}
        </button>
      )}
    </motion.div>
  );
}

// ─── Main simulator ───────────────────────────────────────────────────────────
export function ColumnArithmeticSimulator({
  operation,
  operands,
  digitCount,
  onAnswer,
}: ColumnArithmeticProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";
  const [a, b] = operands;

  const cols = Math.max(digitCount, String(a).length, String(b).length);
  const result = computeResult(a, b, operation);
  const resultDigits = toDigits(result, cols);

  const digitsA = toDigits(a, cols);
  const digitsB = toDigits(b, cols);
  const placeLabels = (isEn ? PLACE_LABELS_EN : PLACE_LABELS_ID).slice(-cols);

  const [filledDigits, setFilledDigits] = useState<(string | null)[]>(
    Array(cols).fill(null)
  );
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [cellCorrectness, setCellCorrectness] = useState<(boolean | null)[]>(
    Array(cols).fill(null)
  );

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 3.5rem)`,
    gap: "0.5rem",
  };

  const handleCellTap = (i: number) => {
    if (submitted) return;
    setActiveCell(i);
  };

  const handleSelectDigit = (digit: string) => {
    if (activeCell === null || submitted) return;

    const newFilled = [...filledDigits];
    newFilled[activeCell] = digit;
    setFilledDigits(newFilled);

    // If all cells are filled, submit the answer automatically!
    if (newFilled.every((v) => v !== null)) {
      setActiveCell(null);
      const submittedStr = newFilled.join("");
      const correctStr   = resultDigits.join("");
      const isCorrect    = submittedStr === correctStr;
      const correctness  = newFilled.map((v, i) => v === resultDigits[i]);
      setCellCorrectness(correctness);
      setSubmitted(true);

      let tag: string | undefined;
      if (!isCorrect) {
        const unitsOk = correctness[cols - 1];
        const tensOk  = cols > 1 && correctness[cols - 2];
        if (unitsOk && !tensOk) tag = "carry-omitted";
        else if (!unitsOk) tag = "off-by-one-count";
      }

      setTimeout(() => onAnswer?.(submittedStr, isCorrect, tag), 600);
    } else {
      // Move to the next unfilled cell if any
      let nextIdx = -1;
      if (activeCell > 0 && newFilled[activeCell - 1] === null) {
        nextIdx = activeCell - 1;
      } else {
        nextIdx = newFilled.findIndex((v) => v === null);
      }

      if (nextIdx !== -1) {
        setActiveCell(nextIdx);
      } else {
        setActiveCell(null);
      }
    }
  };

  const handleClearCell = () => {
    if (activeCell === null || submitted) return;
    const newFilled = [...filledDigits];
    newFilled[activeCell] = null;
    setFilledDigits(newFilled);
  };

  const activePlaceLabel = activeCell !== null ? placeLabels[activeCell] : "";

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <p className="text-gray-500 text-sm font-semibold tracking-wide">
        {submitted
          ? isEn ? "Calculation result:" : "Hasil hitungan:"
          : isEn ? "Tap the ? box to choose a number" : "Ketuk kotak ? untuk memilih angka"}
      </p>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-amber-100 p-6 flex flex-col items-center gap-2 w-full max-w-md">
        {/* Place-value header */}
        <div className="flex items-center gap-3">
          <div style={gridStyle}>
            {placeLabels.map((label, i) => (
              <div
                key={i}
                className="w-14 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest"
              >
                {label}
              </div>
            ))}
          </div>
          <div className="w-8 flex-shrink-0" />
        </div>

        {/* Row A */}
        <div className="flex items-center gap-3">
          <div style={gridStyle}>
            {digitsA.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="h-14 w-14 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center justify-center text-2xl font-black text-gray-700"
              >
                {d === "0" && i === 0 && cols > 1 ? "" : d}
              </motion.div>
            ))}
          </div>
          <div className="w-8 flex-shrink-0" />
        </div>

        {/* Row B */}
        <div className="flex items-center gap-3">
          <div style={gridStyle}>
            {digitsB.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="h-14 w-14 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center justify-center text-2xl font-black text-gray-700"
              >
                {d === "0" && i === 0 && cols > 1 ? "" : d}
              </motion.div>
            ))}
          </div>
          <div className="w-8 flex-shrink-0" />
        </div>

        {/* ── Divider line + Operator (SEJAJAR GARIS ABU & DI SEBELAH KANAN) ── */}
        <div className="flex items-center gap-3 my-1">
          <div
            className="h-[3px] rounded-full bg-gray-300"
            style={{ width: `calc(${cols} * 3.5rem + ${cols - 1} * 0.5rem)` }}
          />
          <span className="text-2xl font-black text-blue-500 select-none flex-shrink-0 w-8 text-center leading-none">
            {operationSymbols[operation]}
          </span>
        </div>

        {/* Result row — tappable cells */}
        <div className="flex items-center gap-3">
          <div style={gridStyle}>
            {Array.from({ length: cols }).map((_, i) => {
              const filled = filledDigits[i];
              const isActive = activeCell === i;
              const ok = cellCorrectness[i];

              const base = "h-14 w-14 rounded-xl border-2 flex items-center justify-center transition-all active:scale-95";
              let variant =
                "border-dashed border-amber-300 bg-amber-50 cursor-pointer hover:border-amber-400";
              if (isActive) variant = "border-solid border-amber-500 bg-amber-100 cursor-pointer ring-2 ring-amber-300 ring-offset-1";
              else if (filled !== null && submitted)
                variant = ok
                  ? "border-solid border-green-400 bg-green-50 cursor-default"
                  : "border-solid border-red-400 bg-red-50 cursor-default";
              else if (filled !== null)
                variant = "border-solid border-amber-400 bg-amber-50 cursor-pointer";

              return (
                <motion.button
                  key={i}
                  id={`result-cell-${i}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  onClick={() => handleCellTap(i)}
                  disabled={submitted}
                  className={`${base} ${variant}`}
                >
                  {filled !== null ? (
                    <span
                      className={`text-2xl font-black ${
                        submitted
                          ? ok ? "text-green-600" : "text-red-500"
                          : "text-amber-700"
                      }`}
                    >
                      {filled}
                    </span>
                  ) : (
                    <span className="text-amber-400 text-2xl font-black">?</span>
                  )}
                </motion.button>
              );
            })}
          </div>
          <div className="w-8 flex-shrink-0" />
        </div>

        {/* Mini helper popup */}
        <AnimatePresence>
          {activeCell !== null && (
            <MiniNumberHelper
              placeLabel={activePlaceLabel}
              onSelectDigit={handleSelectDigit}
              onClear={handleClearCell}
              onClose={() => setActiveCell(null)}
              hasValue={filledDigits[activeCell] !== null}
              isEn={isEn}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Equation strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex items-center gap-2 bg-white rounded-2xl shadow px-6 py-3 border border-amber-100 text-xl font-black text-gray-700"
      >
        <span>{a}</span>
        <span className="text-blue-500">{operationSymbols[operation]}</span>
        <span>{b}</span>
        <span className="text-gray-400">=</span>
        {submitted ? (
          <span
            className={
              filledDigits.join("") === resultDigits.join("")
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {filledDigits.join("")}
          </span>
        ) : (
          <span className="text-amber-400 text-2xl">?</span>
        )}
      </motion.div>
    </div>
  );
}
