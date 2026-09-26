"use client";

import { motion } from "framer-motion";
import { gradeConfigs } from "@/config/curriculum.config";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/lib/translations";
import { Star, ChevronRight } from "lucide-react";

const GRADE_COLORS: Record<number, { bg: string; border: string; text: string; number: string }> = {
  1: { bg: "bg-yellow-50",  border: "border-yellow-200", text: "text-yellow-700", number: "bg-yellow-400" },
  2: { bg: "bg-pink-50",    border: "border-pink-200",   text: "text-pink-700",   number: "bg-pink-400" },
  3: { bg: "bg-green-50",   border: "border-green-200",  text: "text-green-700",  number: "bg-green-400" },
  4: { bg: "bg-blue-50",    border: "border-blue-200",   text: "text-blue-700",   number: "bg-blue-400" },
  5: { bg: "bg-purple-50",  border: "border-purple-200", text: "text-purple-700", number: "bg-purple-400" },
  6: { bg: "bg-orange-50",  border: "border-orange-200", text: "text-orange-700", number: "bg-orange-400" },
};

interface GradeSelectPageProps {
  profileGrade: number;
  profileName: string;
  starsPerGrade?: Record<number, number>;
  onBack: () => void;
  onSelectGrade: (grade: number) => void;
}

export function GradeSelectPage({
  profileGrade,
  profileName,
  starsPerGrade = {},
  onBack,
  onSelectGrade,
}: GradeSelectPageProps) {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;

  return (
    <div className="min-h-dvh flex flex-col bg-[#FFFDF4]">
      <PageHeader showBack onBack={onBack} title={t.chooseGradeTitle} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-5">
        <p className="text-gray-500 text-base">
          {t.greeting.replace("{name}", profileName)}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gradeConfigs.map((cfg, idx) => {
            const isLocked = false;
            const stars = starsPerGrade[cfg.grade] ?? 0;
            const c = GRADE_COLORS[cfg.grade];

            return (
              <motion.button
                key={cfg.grade}
                id={`grade-card-${cfg.grade}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onSelectGrade(cfg.grade)}
                className={`
                  relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200
                  ${c.bg} ${c.border} hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer
                `}
              >
                {/* Grade number circle */}
                <div className={`w-14 h-14 rounded-2xl ${c.number} flex items-center justify-center text-3xl font-black text-white shadow-sm`}>
                  {cfg.grade}
                </div>

                <div className="text-center">
                  <p className={`font-black text-base ${c.text}`}>
                    {t.gradePrefix} {cfg.grade}
                  </p>
                  <p className="text-xs text-gray-400 font-semibold">
                    {language === "en" ? "Phase" : "Fase"} {cfg.phase}
                  </p>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{stars}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
