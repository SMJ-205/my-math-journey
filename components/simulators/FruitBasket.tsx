"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguageStore } from "@/store/languageStore";

interface FruitBasketSimulatorProps {
  initialCount: number;
  addCount?: number;
  removeCount?: number;
  fruitEmoji: string;
  onReady?: () => void;
}

const FRUIT_EMOJI: Record<string, string> = {
  apel: "🍎",
  jeruk: "🍊",
  pisang: "🍌",
  bintang: "⭐",
  kelereng: "🔵",
};

export function FruitBasketSimulator({
  initialCount,
  addCount = 0,
  removeCount = 0,
  fruitEmoji,
  onReady,
}: FruitBasketSimulatorProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";

  const [revealed, setRevealed] = useState<boolean[]>(
    Array(initialCount).fill(true)
  );
  const [added, setAdded] = useState<boolean[]>([]);
  const [phase, setPhase] = useState<"initial" | "action" | "done">("initial");

  const emoji = FRUIT_EMOJI[fruitEmoji] ?? "🍎";
  const isAddition = addCount > 0;
  const isSubtraction = removeCount > 0;

  useEffect(() => {
    // Auto-run animation after short delay
    const t = setTimeout(() => {
      if (isAddition) {
        setAdded(Array(addCount).fill(false));
        setTimeout(() => {
          setAdded(Array(addCount).fill(true));
          setPhase("done");
          onReady?.();
        }, 600);
      } else if (isSubtraction) {
        // Mark last `removeCount` items as removed
        setRevealed((prev) =>
          prev.map((v, i) => (i >= initialCount - removeCount ? false : v))
        );
        setPhase("done");
        onReady?.();
      } else {
        setPhase("done");
        onReady?.();
      }
    }, 500);
    return () => clearTimeout(t);
  }, [addCount, removeCount, initialCount, isAddition, isSubtraction, onReady]);

  const totalVisible = revealed.filter(Boolean).length + added.filter(Boolean).length;

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Basket label */}
      <p className="text-gray-500 text-sm font-semibold">
        {isEn ? "Fruit Basket" : "Keranjang Buah"}
      </p>

      {/* Fruits display */}
      <div className="flex flex-wrap gap-3 justify-center max-w-xs bg-amber-50 border-4 border-amber-200 rounded-3xl p-5 min-h-[100px]">
        {/* Original fruits */}
        {revealed.map((visible, i) => (
          <AnimatePresence key={`orig-${i}`}>
            {visible && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                className="text-4xl select-none"
              >
                {emoji}
              </motion.span>
            )}
          </AnimatePresence>
        ))}

        {/* Added fruits */}
        {added.map((visible, i) => (
          <AnimatePresence key={`added-${i}`}>
            {visible && (
              <motion.span
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 280 }}
                className="text-4xl select-none"
              >
                {emoji}
              </motion.span>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Operation hint strip with question mark */}
      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 text-lg font-bold text-gray-700 bg-white rounded-2xl shadow-sm px-5 py-2 border border-amber-100"
        >
          {isAddition && (
            <span className="flex items-center gap-2">
              <span>{initialCount} + {addCount} =</span>
              <span className="w-8 h-8 rounded-xl bg-amber-100 border-2 border-dashed border-amber-400 text-amber-600 flex items-center justify-center font-black text-lg shadow-xs">
                ?
              </span>
            </span>
          )}
          {isSubtraction && (
            <span className="flex items-center gap-2">
              <span>{initialCount} &minus; {removeCount} =</span>
              <span className="w-8 h-8 rounded-xl bg-amber-100 border-2 border-dashed border-amber-400 text-amber-600 flex items-center justify-center font-black text-lg shadow-xs">
                ?
              </span>
            </span>
          )}
          {!isAddition && !isSubtraction && (
            <span className="flex items-center gap-2">
              <span>{isEn ? "Total:" : "Jumlah:"}</span>
              <span className="w-8 h-8 rounded-xl bg-amber-100 border-2 border-dashed border-amber-400 text-amber-600 flex items-center justify-center font-black text-lg shadow-xs">
                ?
              </span>
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}
