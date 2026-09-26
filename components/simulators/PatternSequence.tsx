"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Delete, Check } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

export interface PatternSequenceProps {
  sequence: (number | null)[];
  missingIndices: number[];
  correctValues: number[];
  ruleDescription?: string;
  onAnswer?: (value: string, isCorrect: boolean, misconceptionTag?: string) => void;
}

export function PatternSequenceSimulator({
  sequence,
  missingIndices,
  correctValues,
  ruleDescription,
  onAnswer,
}: PatternSequenceProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";
  const [filledValues, setFilledValues] = useState<Record<number, string>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(
    missingIndices.length > 0 ? missingIndices[0] : null
  );
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelectSlot = (idx: number) => {
    if (submitted) return;
    setActiveIdx(idx);
  };

  const handleDigit = (digit: string) => {
    if (activeIdx === null || submitted) return;
    const current = filledValues[activeIdx] ?? "";
    // Allow up to 4 digits
    if (current.length >= 4) return;
    const nextVal = current + digit;
    const updated = { ...filledValues, [activeIdx]: nextVal };
    setFilledValues(updated);
  };

  const handleBackspace = () => {
    if (activeIdx === null || submitted) return;
    const current = filledValues[activeIdx] ?? "";
    if (current.length === 0) return;
    const updated = { ...filledValues, [activeIdx]: current.slice(0, -1) };
    setFilledValues(updated);
  };

  const handleConfirmSlot = () => {
    if (activeIdx === null || submitted) return;
    const val = filledValues[activeIdx];
    if (!val || val.trim() === "") return;

    // Check if there are other unfilled missing slots
    const nextMissing = missingIndices.find(
      (idx) => idx !== activeIdx && (!filledValues[idx] || filledValues[idx].trim() === "")
    );

    if (nextMissing !== undefined) {
      setActiveIdx(nextMissing);
    } else {
      // All missing slots filled! Evaluate answer
      setActiveIdx(null);
      let allCorrect = true;
      missingIndices.forEach((mIdx, i) => {
        const studentVal = parseInt(filledValues[mIdx] ?? "0", 10);
        if (studentVal !== correctValues[i]) {
          allCorrect = false;
        }
      });

      setIsCorrect(allCorrect);
      setSubmitted(true);

      const submittedStr = missingIndices.map((idx) => filledValues[idx] ?? "").join(", ");
      setTimeout(() => {
        onAnswer?.(submittedStr, allCorrect, allCorrect ? undefined : "pattern-rule-error");
      }, 700);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-3">
      <p className="text-gray-500 text-sm font-semibold tracking-wide text-center">
        {submitted
          ? isCorrect
            ? isEn ? "Number sequence solved successfully!" : "Pola bilangan berhasil dipecahkan!"
            : isEn ? "Some numbers in the sequence are incorrect." : "Ada angka yang belum tepat pada deret."
          : isEn ? "Find the missing numbers in the sequence below:" : "Temukan angka yang hilang pada deret bilangan di bawah ini:"}
      </p>

      {/* Sequence items container */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 bg-amber-50/60 rounded-3xl border-2 border-amber-200 shadow-sm max-w-full overflow-x-auto">
        {sequence.map((num, i) => {
          const isMissing = missingIndices.includes(i);
          const isLast = i === sequence.length - 1;
          const isActive = activeIdx === i;
          const currentVal = filledValues[i];

          return (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              {isMissing ? (
                <motion.button
                  id={`pattern-slot-${i}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectSlot(i)}
                  disabled={submitted}
                  className={`
                    w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-black transition-all cursor-pointer shadow-sm
                    ${
                      isActive
                        ? "border-amber-500 bg-amber-200 ring-4 ring-amber-300 ring-offset-2"
                        : currentVal
                        ? submitted
                          ? isCorrect
                            ? "border-green-400 bg-green-50 text-green-700"
                            : "border-red-400 bg-red-50 text-red-600"
                          : "border-amber-400 bg-white text-amber-800"
                        : "border-dashed border-amber-300 bg-white/80 hover:border-amber-400"
                    }
                  `}
                >
                  {currentVal ? (
                    <span>{currentVal}</span>
                  ) : (
                    <span className="text-amber-400 animate-pulse text-2xl font-black">?</span>
                  )}
                </motion.button>
              ) : (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-gray-200 bg-white flex items-center justify-center text-xl sm:text-2xl font-black text-gray-800 shadow-sm">
                  {num}
                </div>
              )}

              {!isLast && (
                <div className="text-amber-300 flex-shrink-0">
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mini Helper Numberpad (without covering the problem) */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            className="w-full max-w-[360px] sm:max-w-[400px] bg-white border-2 border-amber-200 rounded-3xl p-5 shadow-xl flex flex-col gap-3.5"
          >
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-bold text-gray-600">
                {isEn ? "Type number for selected box:" : "Ketik angka untuk kotak terpilih:"}
              </span>
              <div className="px-3.5 py-1.5 bg-amber-50 rounded-2xl border-2 border-amber-300 text-xl font-black text-amber-800 min-w-[3.5rem] text-center">
                {filledValues[activeIdx] || "?"}
              </div>
            </div>

            {/* Keys 1-9, 0 */}
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((k) => (
                <button
                  key={k}
                  id={`pattern-key-${k}`}
                  onClick={() => handleDigit(k)}
                  className="h-14 sm:h-16 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 text-gray-800 text-2xl sm:text-3xl font-black active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Actions: Backspace & Confirm */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleBackspace}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center gap-1.5 text-sm cursor-pointer"
              >
                <Delete size={16} />
                {isEn ? "Delete" : "Hapus"}
              </button>
              <button
                id="btn-confirm-pattern"
                onClick={handleConfirmSlot}
                disabled={!filledValues[activeIdx]}
                className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-black active:scale-95 transition-all flex items-center justify-center gap-1.5 text-sm disabled:opacity-40 cursor-pointer"
              >
                <Check size={16} />
                {isEn ? "Done" : "Selesai"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rule description when submitted */}
      {submitted && ruleDescription && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-amber-800 bg-amber-100/70 border border-amber-200 px-4 py-2 rounded-xl font-bold text-center"
        >
          {isEn
            ? `Pattern Rule: ${ruleDescription
                .replace(/Bertambah (\d+) setiap langkah/i, "Increases by $1 each step")
                .replace(/Berkurang (\d+) setiap langkah/i, "Decreases by $1 each step")
                .replace(/Kelipatan (\d+)/i, "Multiples of $1")
                .replace(/Dikalikan (\d+) setiap langkah/i, "Multiplied by $1 each step")
                .replace(/Pola bilangan kuadrat berturut-turut/i, "Consecutive square numbers pattern")}`
            : `Kunci Pola: ${ruleDescription}`}
        </motion.div>
      )}
    </div>
  );
}
