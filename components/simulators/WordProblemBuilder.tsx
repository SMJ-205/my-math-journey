"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Delete, Check } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

export interface WordProblemSlot {
  type: "number" | "operator";
  target: string;
}

export interface WordProblemBuilderProps {
  storyText: string;
  slots: WordProblemSlot[];
  expectedAnswer: string;
  onAnswer?: (value: string, isCorrect: boolean, misconceptionTag?: string) => void;
}

export function WordProblemBuilderSimulator({
  storyText,
  slots,
  expectedAnswer,
  onAnswer,
}: WordProblemBuilderProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";
  // Store values for expression slots [0..slots.length - 1]
  const [slotValues, setSlotValues] = useState<string[]>(Array(slots.length).fill(""));
  // Store answer value
  const [answerValue, setAnswerValue] = useState<string>("");
  // Active slot index: 0..slots.length-1 for expression slots, or "answer"
  const [activeSlot, setActiveSlot] = useState<number | "answer" | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelectSlot = (idx: number | "answer") => {
    if (submitted) return;
    setActiveSlot(idx);
  };

  const handleSelectOperator = (op: string) => {
    if (activeSlot === null || activeSlot === "answer" || submitted) return;
    const nextSlots = [...slotValues];
    nextSlots[activeSlot] = op;
    setSlotValues(nextSlots);

    // Auto-advance to next empty slot
    advanceToNextEmpty(nextSlots, answerValue, activeSlot);
  };

  const handleDigit = (digit: string) => {
    if (activeSlot === null || submitted) return;

    if (activeSlot === "answer") {
      const nextAns = (answerValue + digit).slice(0, 4);
      setAnswerValue(nextAns);
    } else {
      const current = slotValues[activeSlot] ?? "";
      const nextNum = (current + digit).slice(0, 4);
      const nextSlots = [...slotValues];
      nextSlots[activeSlot] = nextNum;
      setSlotValues(nextSlots);
    }
  };

  const handleBackspace = () => {
    if (activeSlot === null || submitted) return;
    if (activeSlot === "answer") {
      setAnswerValue((v) => v.slice(0, -1));
    } else {
      const nextSlots = [...slotValues];
      nextSlots[activeSlot] = (nextSlots[activeSlot] ?? "").slice(0, -1);
      setSlotValues(nextSlots);
    }
  };

  const handleConfirmNumber = () => {
    if (activeSlot === null || submitted) return;
    advanceToNextEmpty(slotValues, answerValue, activeSlot);
  };

  const advanceToNextEmpty = (
    currentSlots: string[],
    currentAns: string,
    fromIdx: number | "answer"
  ) => {
    // Look for next empty slot
    let nextIdx: number | "answer" | null = null;

    if (fromIdx !== "answer") {
      for (let i = fromIdx + 1; i < currentSlots.length; i++) {
        if (!currentSlots[i]) {
          nextIdx = i;
          break;
        }
      }
    }

    if (nextIdx === null) {
      // Check from beginning
      for (let i = 0; i < currentSlots.length; i++) {
        if (!currentSlots[i]) {
          nextIdx = i;
          break;
        }
      }
    }

    if (nextIdx === null && !currentAns) {
      nextIdx = "answer";
    }

    if (nextIdx !== null) {
      setActiveSlot(nextIdx);
    } else if (currentSlots.every((v) => v !== "") && currentAns !== "") {
      // All slots and answer filled! Validate
      evaluateExpression(currentSlots, currentAns);
    }
  };

  const evaluateExpression = (currentSlots: string[], currentAns: string) => {
    setActiveSlot(null);

    // Check expression slots
    let slotsOk = true;
    for (let i = 0; i < slots.length; i++) {
      if (currentSlots[i].trim() !== slots[i].target.trim()) {
        slotsOk = false;
        break;
      }
    }

    // Check final answer
    const ansOk = currentAns.trim() === expectedAnswer.trim();
    const allOk = slotsOk && ansOk;

    setIsCorrect(allOk);
    setSubmitted(true);

    const fullFormula = `${currentSlots.join(" ")} = ${currentAns}`;
    setTimeout(() => {
      onAnswer?.(fullFormula, allOk, allOk ? undefined : "word-problem-model-error");
    }, 800);
  };

  const activeSlotType =
    activeSlot === "answer"
      ? "number"
      : activeSlot !== null
      ? slots[activeSlot]?.type
      : null;

  return (
    <div className="flex flex-col items-center gap-6 py-2 w-full">
      {/* Instructions header */}
      <p className="text-gray-500 text-sm font-semibold tracking-wide text-center">
        {submitted
          ? isCorrect
            ? isEn ? "Great! Your math sentence and answer are correct!" : "Hebat! Kalimat matematika dan jawabanmu benar!"
            : isEn ? "Your math sentence or answer is not quite right, check again." : "Kalimat matematika atau jawabanmu belum sesuai, periksa kembali ya."
          : isEn ? "Build the math sentence from the story above, then find the answer:" : "Susun kalimat matematika dari cerita di atas, lalu hitung jawabannya:"}
      </p>

      {/* Expression builder row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-4 bg-white rounded-3xl border-2 border-amber-200 shadow-md max-w-full">
        {slots.map((slot, i) => {
          const isActive = activeSlot === i;
          const val = slotValues[i];
          const isNum = slot.type === "number";

          return (
            <motion.button
              key={i}
              id={`expr-slot-${i}`}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectSlot(i)}
              disabled={submitted}
              className={`
                h-13 sm:h-14 rounded-2xl border-2 flex items-center justify-center font-black transition-all cursor-pointer shadow-sm
                ${isNum ? "w-12 sm:w-14 text-xl sm:text-2xl" : "w-10 sm:w-12 text-2xl text-blue-600 bg-blue-50/50"}
                ${
                  isActive
                    ? "border-amber-500 bg-amber-200 ring-4 ring-amber-300 ring-offset-2"
                    : val
                    ? submitted
                      ? val === slot.target
                        ? "border-green-400 bg-green-50 text-green-700"
                        : "border-red-400 bg-red-50 text-red-600"
                      : "border-amber-300 bg-amber-50/70 text-gray-800"
                    : isNum
                    ? "border-dashed border-amber-300 bg-gray-50/50 hover:border-amber-400"
                    : "border-dashed border-blue-300 bg-blue-50/30 hover:border-blue-400"
                }
              `}
            >
              {val ? (
                <span>{val}</span>
              ) : (
                <span className={`text-sm sm:text-base font-bold ${isNum ? "text-amber-400" : "text-blue-400"}`}>
                  {isNum ? "?" : "+/-"}
                </span>
              )}
            </motion.button>
          );
        })}

        {/* Equals sign */}
        <span className="text-2xl font-black text-gray-400 px-1">=</span>

        {/* Final answer slot */}
        <motion.button
          id="expr-slot-answer"
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelectSlot("answer")}
          disabled={submitted}
          className={`
            w-14 sm:w-16 h-13 sm:h-14 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-black transition-all cursor-pointer shadow-sm
            ${
              activeSlot === "answer"
                ? "border-amber-500 bg-amber-200 ring-4 ring-amber-300 ring-offset-2"
                : answerValue
                ? submitted
                  ? answerValue === expectedAnswer
                    ? "border-green-400 bg-green-50 text-green-700"
                    : "border-red-400 bg-red-50 text-red-600"
                  : "border-amber-400 bg-amber-50 text-amber-800"
                : "border-dashed border-amber-400 bg-amber-50/40 hover:border-amber-500"
            }
          `}
        >
          {answerValue ? (
            <span>{answerValue}</span>
          ) : (
            <span className="text-amber-400 animate-pulse text-2xl font-black">?</span>
          )}
        </motion.button>
      </div>

      {/* Mini Helper Popup (Operators or Numbers based on active slot type) */}
      <AnimatePresence mode="wait">
        {activeSlot !== null && activeSlotType === "operator" && (
          <motion.div
            key="operator-pad"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            className="w-full max-w-[360px] sm:max-w-[400px] bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-xl flex flex-col items-center gap-3.5"
          >
            <span className="text-sm font-black text-blue-800 uppercase tracking-wider">
              {isEn ? "Select Operation:" : "Pilih Tanda Hitung:"}
            </span>
            <div className="grid grid-cols-4 gap-3 w-full">
              {[
                { symbol: "+", label: isEn ? "Add" : "Tambah" },
                { symbol: "−", label: isEn ? "Subtract" : "Kurang" },
                { symbol: "×", label: isEn ? "Multiply" : "Kali" },
                { symbol: "÷", label: isEn ? "Divide" : "Bagi" },
              ].map((op) => (
                <button
                  key={op.symbol}
                  id={`btn-op-${op.symbol}`}
                  onClick={() => handleSelectOperator(op.symbol)}
                  className="h-14 sm:h-16 rounded-2xl bg-blue-50 border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-400 text-blue-700 font-black text-3xl active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  title={op.label}
                >
                  {op.symbol}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeSlot !== null && activeSlotType === "number" && (
          <motion.div
            key="number-pad"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            className="w-full max-w-[360px] sm:max-w-[400px] bg-white border-2 border-amber-200 rounded-3xl p-5 shadow-xl flex flex-col gap-3.5"
          >
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-bold text-gray-600">
                {activeSlot === "answer"
                  ? isEn ? "Type final answer:" : "Ketik hasil akhir:"
                  : isEn ? "Type number:" : "Ketik angka bilangan:"}
              </span>
              <div className="px-3.5 py-1.5 bg-amber-50 rounded-2xl border-2 border-amber-300 text-xl font-black text-amber-800 min-w-[3.5rem] text-center">
                {activeSlot === "answer" ? answerValue || "?" : slotValues[activeSlot as number] || "?"}
              </div>
            </div>

            {/* Keys 1-9, 0 */}
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((k) => (
                <button
                  key={k}
                  id={`wp-key-${k}`}
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
                id="btn-confirm-wp-number"
                onClick={handleConfirmNumber}
                disabled={activeSlot === "answer" ? !answerValue : !slotValues[activeSlot as number]}
                className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-black active:scale-95 transition-all flex items-center justify-center gap-1.5 text-sm disabled:opacity-40 cursor-pointer"
              >
                <Check size={16} />
                {isEn ? "Next" : "Lanjut"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
