"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";

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

const PLACE_LABELS_ID = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const PLACE_LABELS_EN = ["hundred thousands", "ten thousands", "thousands", "hundreds", "tens", "ones"];

function computeResult(a: number, b: number, op: Operation): number {
  switch (op) {
    case "add":      return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide":   return Math.floor(a / b);
  }
}

function toDigitsPadded(n: number, cols: number): string[] {
  const str = String(Math.abs(n));
  const padCount = Math.max(0, cols - str.length);
  return [...Array(padCount).fill(""), ...str.split("")];
}

// ─── Borrow / Carry Logic Computations ─────────────────────────────────────────
function computeBorrowSteps(a: number, b: number, cols: number): {
  needsBorrow: boolean;
  borrowHelperDigits: (string | null)[];
} {
  const digitsA = toDigitsPadded(a, cols);
  const digitsB = toDigitsPadded(b, cols);
  const helper: (string | null)[] = Array(cols).fill(null);
  let needsBorrow = false;

  const currentDigits: (number | null)[] = digitsA.map((d) => (d !== "" ? Number(d) : null));

  for (let i = cols - 1; i >= 1; i--) {
    const valA = currentDigits[i];
    const valB = digitsB[i] !== "" ? Number(digitsB[i]) : 0;

    if (valA !== null && valA < valB) {
      needsBorrow = true;
      let donorIdx = i - 1;
      while (donorIdx >= 0 && (currentDigits[donorIdx] === null || currentDigits[donorIdx]! <= 0)) {
        donorIdx--;
      }

      if (donorIdx >= 0 && currentDigits[donorIdx] !== null) {
        currentDigits[donorIdx]! -= 1;
        helper[donorIdx] = String(currentDigits[donorIdx]);

        for (let mid = donorIdx + 1; mid < i; mid++) {
          if (currentDigits[mid] !== null) {
            currentDigits[mid] = 9;
            helper[mid] = "9";
          }
        }

        currentDigits[i]! += 10;
        helper[i] = String(currentDigits[i]);
      }
    }
  }

  return { needsBorrow, borrowHelperDigits: helper };
}

function computeCarrySteps(a: number, b: number, op: Operation, cols: number): {
  hasCarry: boolean;
  carryHelperDigits: (string | null)[];
} {
  const digitsA = toDigitsPadded(a, cols);
  const digitsB = toDigitsPadded(b, cols);
  const helper: (string | null)[] = Array(cols).fill(null);
  let hasCarry = false;

  if (op === "add") {
    let carry = 0;
    for (let i = cols - 1; i >= 0; i--) {
      const valA = digitsA[i] !== "" ? Number(digitsA[i]) : 0;
      const valB = digitsB[i] !== "" ? Number(digitsB[i]) : 0;
      const sum = valA + valB + carry;
      carry = Math.floor(sum / 10);
      if (carry > 0 && i - 1 >= 0 && digitsA[i - 1] !== "") {
        helper[i - 1] = String(carry);
        hasCarry = true;
      }
    }
  } else if (op === "multiply") {
    let carry = 0;
    for (let i = cols - 1; i >= 0; i--) {
      if (digitsA[i] === "") continue;
      const valA = Number(digitsA[i]);
      const prod = valA * b + carry;
      carry = Math.floor(prod / 10);
      if (carry > 0 && i - 1 >= 0 && digitsA[i - 1] !== "") {
        helper[i - 1] = String(carry);
        hasCarry = true;
      }
    }
  }

  return { hasCarry, carryHelperDigits: helper };
}

// ─── Mini Number Helper Popup ────────────────────────────────────────────────
interface MiniNumberHelperProps {
  mode: "result" | "helper";
  operation: Operation;
  placeLabel: string;
  currentValue: string | null;
  onSelectDigit: (d: string) => void;
  onClear: () => void;
  onClose: () => void;
  isEn: boolean;
}

function MiniNumberHelper({
  mode,
  operation,
  placeLabel,
  currentValue,
  onSelectDigit,
  onClear,
  onClose,
  isEn,
}: MiniNumberHelperProps) {
  const isHelper = mode === "helper";
  const isSubtract = operation === "subtract";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.16 }}
      className="mt-4 bg-amber-50/95 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col items-center gap-3 z-20 w-full max-w-[360px] sm:max-w-[400px]"
    >
      <div className="flex items-center justify-between w-full px-1">
        <div className="flex flex-col">
          <span className="text-sm font-black text-amber-950 tracking-wide">
            {isHelper
              ? isSubtract
                ? isEn
                  ? `Borrow / Remainder (${placeLabel}):`
                  : `Kotak Pinjaman / Sisa (${placeLabel}):`
                : isEn
                ? `Carry box (${placeLabel}):`
                : `Kotak Simpanan (${placeLabel}):`
              : isEn
              ? `Select ${placeLabel} digit:`
              : `Pilih angka ${placeLabel}:`}
          </span>
          {isHelper && (
            <span className="text-[11px] text-amber-700/80 font-medium">
              {isEn
                ? "Optional helper • Does not affect score"
                : "Bantuan hitung • Tidak mempengaruhi nilai"}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-sm font-black px-2.5 py-1 rounded-lg hover:bg-amber-200/60 transition-colors cursor-pointer"
          aria-label={isEn ? "Close helper" : "Tutup helper"}
        >
          ✕
        </button>
      </div>

      {/* Quick borrow values for subtraction */}
      {isHelper && isSubtract && (
        <div className="w-full flex flex-col gap-1.5 pt-1 border-t border-amber-200/60">
          <span className="text-[11px] font-bold text-amber-800">
            {isEn ? "Borrow values (+10):" : "Pinjam puluhan (+10):"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {["10", "11", "12", "13", "14", "15", "16", "17", "18"].map((val) => (
              <button
                key={val}
                onClick={() => onSelectDigit(val)}
                className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                  currentValue === val
                    ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                    : "bg-white text-amber-900 border-amber-300 hover:bg-amber-100"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid of keys 1-9 and 0 */}
      <div className="grid grid-cols-5 gap-2.5 sm:gap-3 w-full">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => {
          const isSelected = currentValue === num;
          return (
            <button
              key={num}
              id={`mini-key-${num}`}
              onClick={() => onSelectDigit(num)}
              className={`h-13 sm:h-15 rounded-2xl border-2 font-black text-2xl sm:text-3xl shadow-sm active:scale-95 transition-all flex items-center justify-center cursor-pointer select-none ${
                isSelected
                  ? "bg-amber-500 text-white border-amber-600 shadow-md"
                  : "bg-white border-amber-200 text-amber-950 hover:bg-amber-100 hover:border-amber-400 hover:shadow-md"
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {currentValue !== null && (
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

  const result = computeResult(a, b, operation);
  const cols = Math.max(digitCount, String(a).length, String(b).length, String(result).length);
  const resultDigits = toDigitsPadded(result, cols);

  const digitsA = toDigitsPadded(a, cols);
  const digitsB = toDigitsPadded(b, cols);
  const placeLabels = (isEn ? PLACE_LABELS_EN : PLACE_LABELS_ID).slice(-cols);

  // Result cells state (scoring depends ONLY on this)
  const [filledDigits, setFilledDigits] = useState<(string | null)[]>(
    Array(cols).fill(null)
  );

  // Optional helper / carry cells state (scratchpad only - NEVER affects scoring)
  const [helperDigits, setHelperDigits] = useState<(string | null)[]>(
    Array(cols).fill(null)
  );

  const [activeCell, setActiveCell] = useState<{
    type: "result" | "helper";
    index: number;
  } | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [cellCorrectness, setCellCorrectness] = useState<(boolean | null)[]>(
    Array(cols).fill(null)
  );

  // Helper row is displayed for addition, multiplication, and subtraction
  const showHelperRow = operation === "add" || operation === "multiply" || operation === "subtract";

  // Reset state when operands change
  const operandsKey = `${a}_${b}_${operation}_${cols}`;
  const [prevOperandsKey, setPrevOperandsKey] = useState(operandsKey);

  if (prevOperandsKey !== operandsKey) {
    setPrevOperandsKey(operandsKey);
    setFilledDigits(Array(cols).fill(null));
    setHelperDigits(Array(cols).fill(null));
    setActiveCell(null);
    setSubmitted(false);
    setCellCorrectness(Array(cols).fill(null));
  }

  // Automated guidance computation for borrow & carry
  const { needsBorrow, borrowHelperDigits } = useMemo(
    () =>
      operation === "subtract"
        ? computeBorrowSteps(a, b, cols)
        : { needsBorrow: false, borrowHelperDigits: [] },
    [a, b, operation, cols]
  );

  const { hasCarry, carryHelperDigits } = useMemo(
    () =>
      operation === "add" || operation === "multiply"
        ? computeCarrySteps(a, b, operation, cols)
        : { hasCarry: false, carryHelperDigits: [] },
    [a, b, operation, cols]
  );

  const handleAutoBorrow = useCallback(() => {
    setHelperDigits(borrowHelperDigits);
  }, [borrowHelperDigits]);

  const handleAutoCarry = useCallback(() => {
    setHelperDigits(carryHelperDigits);
  }, [carryHelperDigits]);

  const handleResetHelper = useCallback(() => {
    setHelperDigits(Array(cols).fill(null));
    if (activeCell?.type === "helper") {
      setActiveCell(null);
    }
  }, [cols, activeCell]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 3.5rem)`,
    gap: "0.5rem",
  };

  const handleResultCellTap = (i: number) => {
    if (submitted) return;
    setActiveCell({ type: "result", index: i });
  };

  const handleHelperCellTap = (i: number) => {
    if (submitted) return;
    setActiveCell({ type: "helper", index: i });
  };

  const handleSelectDigit = useCallback((digit: string) => {
    if (!activeCell || submitted) return;

    // Path A: helper cell tapped
    if (activeCell.type === "helper") {
      setHelperDigits((prev) => {
        const next = [...prev];
        next[activeCell.index] = digit;
        return next;
      });
      setActiveCell(null);
      return;
    }

    // Path B: main result cell tapped
    const newFilled = [...filledDigits];
    newFilled[activeCell.index] = digit;
    setFilledDigits(newFilled);

    // If all result cells are filled, submit the answer automatically!
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
      if (activeCell.index > 0 && newFilled[activeCell.index - 1] === null) {
        nextIdx = activeCell.index - 1;
      } else {
        nextIdx = newFilled.findIndex((v) => v === null);
      }

      if (nextIdx !== -1) {
        setActiveCell({ type: "result", index: nextIdx });
      } else {
        setActiveCell(null);
      }
    }
  }, [activeCell, submitted, filledDigits, resultDigits, cols, onAnswer]);

  const handleClearCell = useCallback(() => {
    if (!activeCell || submitted) return;
    if (activeCell.type === "helper") {
      setHelperDigits((prev) => {
        const next = [...prev];
        next[activeCell.index] = null;
        return next;
      });
    } else {
      setFilledDigits((prev) => {
        const next = [...prev];
        next[activeCell.index] = null;
        return next;
      });
    }
  }, [activeCell, submitted]);

  // Keyboard navigation for desktop & tablet
  useEffect(() => {
    if (!activeCell || submitted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleSelectDigit(e.key);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        handleClearCell();
      } else if (e.key === "Escape") {
        setActiveCell(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCell, submitted, handleSelectDigit, handleClearCell]);

  const activePlaceLabel = activeCell !== null ? placeLabels[activeCell.index] : "";
  const activeCurrentValue =
    activeCell !== null
      ? activeCell.type === "helper"
        ? helperDigits[activeCell.index]
        : filledDigits[activeCell.index]
      : null;

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      {/* Helper banner info & interactive guided controls */}
      {showHelperRow && (
        <div className="flex flex-col items-center gap-2 max-w-md w-full">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200/80 rounded-full text-xs text-amber-900/80 shadow-2xs text-center">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>
              {isEn
                ? "Dotted top boxes: optional carry/borrow notes (does not affect score)"
                : "Kotak putus-putus di atas: bantuan simpanan/pinjaman (opsional, tidak mempengaruhi nilai)"}
            </span>
          </div>

          {/* Interactive Guided Action Buttons (Pure helper, no penalty) */}
          {!submitted && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {operation === "subtract" && needsBorrow && (
                <button
                  type="button"
                  id="btn-guided-borrow"
                  onClick={handleAutoBorrow}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 text-amber-900 rounded-full text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer border border-amber-300"
                >
                  <span>🪄</span>
                  <span>{isEn ? "Guided Borrow (+10)" : "Bantu Pinjam Puluhan"}</span>
                </button>
              )}

              {(operation === "add" || operation === "multiply") && hasCarry && (
                <button
                  type="button"
                  id="btn-guided-carry"
                  onClick={handleAutoCarry}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 text-amber-900 rounded-full text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer border border-amber-300"
                >
                  <span>🪄</span>
                  <span>{isEn ? "Guided Carry Hint" : "Bantu Hitung Simpanan"}</span>
                </button>
              )}

              {helperDigits.some((v) => v !== null) && (
                <button
                  type="button"
                  id="btn-reset-helper"
                  onClick={handleResetHelper}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <span>↺</span>
                  <span>{isEn ? "Clear notes" : "Kosongkan catatan"}</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <p className="text-gray-500 text-sm font-semibold tracking-wide text-center">
        {submitted
          ? isEn ? "Calculation result:" : "Hasil hitungan:"
          : isEn
          ? "Tap ? box below to enter answer, or dotted box above for carry notes"
          : "Ketuk kotak ? di bawah untuk menjawab, atau kotak putus-putus untuk simpanan"}
      </p>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-amber-100 p-6 flex flex-col items-center gap-2 w-full max-w-md">
        {/* Place-value header */}
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

        {/* ── Helper / Carry row (dotted boxes above digits) ── */}
        {showHelperRow && (
          <div style={gridStyle} className="mb-0.5">
            {Array.from({ length: cols }).map((_, i) => {
              const hasTopDigit = digitsA[i] !== "";
              if (!hasTopDigit) {
                return <div key={i} className="h-11 w-14" />;
              }

              const val = helperDigits[i];
              const isActive = activeCell?.type === "helper" && activeCell.index === i;

              return (
                <motion.button
                  key={`helper-${i}`}
                  id={`helper-box-${i}`}
                  type="button"
                  onClick={() => handleHelperCellTap(i)}
                  disabled={submitted}
                  className={`h-11 w-14 rounded-xl border-2 transition-all flex items-center justify-center select-none cursor-pointer ${
                    isActive
                      ? "border-amber-500 bg-amber-100 ring-2 ring-amber-300 ring-offset-1"
                      : val !== null
                      ? "border-amber-400 bg-amber-50/90 text-amber-950 font-black shadow-xs"
                      : "border-dashed border-amber-300/80 bg-amber-50/40 hover:bg-amber-100/50 hover:border-amber-400 text-amber-300"
                  }`}
                  title={
                    isEn
                      ? `Carry / helper box for ${placeLabels[i]} (optional)`
                      : `Kotak simpanan / bantuan ${placeLabels[i]} (opsional)`
                  }
                >
                  {val !== null ? (
                    <span className="text-lg font-black text-amber-900">{val}</span>
                  ) : (
                    <span className="text-amber-300/70 text-xs font-bold tracking-tighter">
                      [ ]
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Row A */}
        <div style={gridStyle}>
          {digitsA.map((d, i) => {
            if (d === "") {
              return <div key={i} className="h-14 w-14" />;
            }
            const isSubtractedCrossed =
              operation === "subtract" && helperDigits[i] !== null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="h-14 w-14 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center justify-center text-2xl font-black text-gray-700 select-none"
              >
                {isSubtractedCrossed ? (
                  <span className="line-through decoration-red-500 decoration-3 text-gray-400">
                    {d}
                  </span>
                ) : (
                  d
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Row B */}
        <div style={gridStyle}>
          {digitsB.map((d, i) => {
            if (d === "") {
              return <div key={i} className="h-14 w-14" />;
            }
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="h-14 w-14 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center justify-center text-2xl font-black text-gray-700 select-none"
              >
                {d}
              </motion.div>
            );
          })}
        </div>

        {/* ── Divider line + Operator ── */}
        <div
          className="relative my-1 h-[3px] rounded-full bg-gray-300 flex items-center"
          style={{ width: `calc(${cols} * 3.5rem + ${cols - 1} * 0.5rem)` }}
        >
          <span className="absolute left-[calc(100%+0.75rem)] text-2xl font-black text-blue-500 select-none pointer-events-none leading-none">
            {operationSymbols[operation]}
          </span>
        </div>

        {/* Result row — tappable cells (main answer) */}
        <div style={gridStyle}>
          {Array.from({ length: cols }).map((_, i) => {
            const filled = filledDigits[i];
            const isActive = activeCell?.type === "result" && activeCell.index === i;
            const ok = cellCorrectness[i];

            const base =
              "h-14 w-14 rounded-xl border-2 flex items-center justify-center transition-all active:scale-95";
            let variant =
              "border-dashed border-amber-300 bg-amber-50 cursor-pointer hover:border-amber-400";
            if (isActive)
              variant =
                "border-solid border-amber-500 bg-amber-100 cursor-pointer ring-2 ring-amber-300 ring-offset-1";
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
                onClick={() => handleResultCellTap(i)}
                disabled={submitted}
                className={`${base} ${variant}`}
              >
                {filled !== null ? (
                  <span
                    className={`text-2xl font-black ${
                      submitted
                        ? ok
                          ? "text-green-600"
                          : "text-red-500"
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

        {/* Mini helper popup (for either result cell or helper cell) */}
        <AnimatePresence>
          {activeCell !== null && (
            <MiniNumberHelper
              mode={activeCell.type}
              operation={operation}
              placeLabel={activePlaceLabel}
              currentValue={activeCurrentValue}
              onSelectDigit={handleSelectDigit}
              onClear={handleClearCell}
              onClose={() => setActiveCell(null)}
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

      {/* Educational step guidance hint */}
      {!submitted && showHelperRow && helperDigits.some((v) => v !== null) && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50/90 border border-amber-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-amber-900 text-center max-w-md shadow-2xs leading-relaxed"
        >
          {operation === "subtract" ? (
            <span>
              💡{" "}
              {isEn
                ? "Column tens has been reduced by 1, and column ones gained +10! Now subtract column by column."
                : "Puluhan berkurang 1 dan satuan meminjam +10! Sekarang kurangkan dari kanan ke kiri menggunakan nilai bantuan di atas."}
            </span>
          ) : (
            <span>
              💡{" "}
              {isEn
                ? "Carry digits are ready! Add the carry value when multiplying or adding the next column."
                : "Angka simpanan siap! Tambahkan angka simpanan saat menghitung kolom berikutnya."}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}

