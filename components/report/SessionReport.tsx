"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSessionStore } from "@/store/sessionStore";
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/lib/translations";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { buildReport, getRecommendationText, getMisconceptionLabel } from "@/lib/reportEngine";
import { Star, ArrowRight, RotateCcw, Home, ChevronDown } from "lucide-react";

interface SessionReportPageProps {
  profileId: string;
  grade: number;
  topic: string;
  tier: number;
  startedAt: string;
  sessionId: string;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export function SessionReportPage({
  profileId, grade, topic, tier, startedAt, sessionId, onPlayAgain, onGoHome,
}: SessionReportPageProps) {
  const { answers } = useSessionStore();
  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;
  const isEn = language === "en";
  const [showParentView, setShowParentView] = useState(false);

  const report = buildReport({
    sessionId, profileId, grade, topic, tier, startedAt, answers,
  });

  const recommendation = getRecommendationText(report);

  // Confetti on mount for high scores
  useEffect(() => {
    if (report.starsEarned >= 2 && typeof window !== "undefined") {
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-dvh flex flex-col bg-[#FFFDF4]">
      {/* Header bar */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-amber-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-fredoka text-lg font-bold text-gray-800">
            {isEn ? "Session Summary" : "Ringkasan Sesi"}
          </span>
          <LanguageSwitch />
        </div>
      </header>
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-6">

        {/* Stars */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <motion.div
                key={s}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: s <= report.starsEarned ? 1 : 0.5, rotate: 0 }}
                transition={{ delay: s * 0.15, type: "spring", stiffness: 250 }}
              >
                <Star
                  size={52}
                  className={s <= report.starsEarned ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
                />
              </motion.div>
            ))}
          </div>
          <h1 className="font-fredoka text-3xl font-semibold text-gray-800 text-center">
            {report.starsEarned === 3
              ? (isEn ? "Perfect!" : "Sempurna!")
              : report.starsEarned === 2
              ? (isEn ? "Great Job!" : "Bagus sekali!")
              : (isEn ? "Keep Going!" : "Terus semangat!")}
          </h1>
        </motion.div>

        {/* Summary card — kids view */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-md border border-amber-100 p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-green-600">{report.correctCount}</span>
              <span className="text-xs text-gray-500 font-semibold">{isEn ? "Correct" : "Benar"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-gray-700">{report.totalQuestions}</span>
              <span className="text-xs text-gray-500 font-semibold">{isEn ? "Total Questions" : "Total Soal"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-amber-500">
                {Math.round(report.avgTimeMs / 1000)}{isEn ? "s" : "d"}
              </span>
              <span className="text-xs text-gray-500 font-semibold">{isEn ? "Avg / Question" : "Rata-rata/soal"}</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 text-base text-amber-800 font-semibold leading-relaxed">
            {recommendation}
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            id="btn-play-again"
            onClick={onPlayAgain}
            className="w-full py-4 rounded-full bg-amber-400 text-white font-black text-xl hover:bg-amber-500 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <RotateCcw size={20} />
            {t.playAgain}
          </button>
          <button
            id="btn-go-home"
            onClick={onGoHome}
            className="w-full py-4 rounded-full bg-white border-2 border-gray-200 text-gray-600 font-bold text-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home size={18} />
            {t.mainMenu}
          </button>
        </div>

        {/* Parent / teacher detail section */}
        <div className="border-t border-gray-200 pt-4">
          <button
            id="btn-toggle-parent-view"
            onClick={() => setShowParentView((v) => !v)}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm font-semibold transition-colors cursor-pointer"
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${showParentView ? "rotate-180" : ""}`}
            />
            {isEn ? "View Details for Parents & Educators" : "Lihat Detail untuk Orang Tua / Guru"}
          </button>

          {showParentView && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 flex flex-col gap-4"
            >
              {/* Stats */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400">{isEn ? "Accuracy" : "Akurasi"}</p>
                  <p className="font-black text-xl text-gray-800">{Math.round(report.accuracy * 100)}%</p>
                </div>
                <div>
                  <p className="text-gray-400">{isEn ? "Hints Used" : "Petunjuk Dipakai"}</p>
                  <p className="font-black text-xl text-gray-800">{report.hintsUsed}x</p>
                </div>
                <div>
                  <p className="text-gray-400">{isEn ? "Tier Recommendation" : "Rekomendasi Level"}</p>
                  <p className="font-black text-xl text-gray-800">
                    {report.nextTierRecommendation === "up"
                      ? (isEn ? "Level Up" : "Naik Level")
                      : report.nextTierRecommendation === "down"
                      ? (isEn ? "Strengthen Basics" : "Perkuat Dasar")
                      : (isEn ? "Maintain" : "Pertahankan")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">{isEn ? "Start Time" : "Waktu Mulai"}</p>
                  <p className="font-semibold text-gray-700 text-xs mt-1">
                    {new Date(report.startedAt).toLocaleTimeString(isEn ? "en-US" : "id-ID")}
                  </p>
                </div>
              </div>

              {/* Misconception breakdown */}
              {Object.keys(report.misconceptionSummary).length > 0 && (
                <div className="bg-red-50 rounded-2xl border border-red-100 p-4 flex flex-col gap-2">
                  <p className="text-sm font-bold text-red-700">{isEn ? "Detected Mistake Patterns" : "Pola Kesalahan Terdeteksi"}</p>
                  {Object.entries(report.misconceptionSummary).map(([tag, count]) => (
                    <div key={tag} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{getMisconceptionLabel(tag)}</span>
                      <span className="font-bold text-red-500">{count}x</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Per-answer breakdown */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-gray-600">{isEn ? "Answer Details" : "Detail Jawaban"}</p>
                {answers.map((a, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl p-3 text-sm ${
                      a.correct ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                      a.correct ? "bg-green-400 text-white" : "bg-red-400 text-white"
                    }`}>
                      {a.correct ? (isEn ? "C" : "B") : (isEn ? "X" : "S")}
                    </span>
                    <span className="text-gray-700 flex-1">{isEn ? `Question ${i + 1}` : `Soal ${i + 1}`}</span>
                    <span className="font-semibold text-gray-500">{a.chosenValue}</span>
                    {a.misconceptionTag && (
                      <span className="text-xs text-red-400 italic">{a.misconceptionTag}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
