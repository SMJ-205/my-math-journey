"use client";

import { motion } from "framer-motion";
import { gradeConfigs } from "@/config/curriculum.config";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/lib/translations";
import { Star, ChevronRight, Zap, Sparkles } from "lucide-react";

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
  onSelectSpeedMath?: () => void;
}

export function GradeSelectPage({
  profileGrade,
  profileName,
  starsPerGrade = {},
  onBack,
  onSelectGrade,
  onSelectSpeedMath,
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

        {/* Kelas Mahir Hitungan (Speed Math Masterclass) Card */}
        {onSelectSpeedMath && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="pt-2"
          >
            <button
              type="button"
              id="speed-math-masterclass-card"
              onClick={onSelectSpeedMath}
              className="w-full text-left p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#E8DAC5] via-[#DFCEB7] to-[#CEBA9F] text-[#4A3928] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all cursor-pointer relative overflow-hidden group border-2 border-[#D5C2A8]"
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/70 backdrop-blur-md flex items-center justify-center text-[#7F5E36] shadow-xs border border-white/80 group-hover:scale-105 transition-transform shrink-0">
                    <Sparkles size={26} className="text-[#8B673A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/80 text-[#73532C] border border-[#D5C2A8] shadow-2xs">
                        <Zap size={11} className="text-[#8B673A] fill-[#8B673A]" />
                        {language === "en" ? "Visual Tutorial & Tips" : "Panduan & Trik Cepat"}
                      </span>
                    </div>
                    <h3 className="font-black text-lg sm:text-xl text-[#3D2C1B]">
                      {language === "en" ? "Speed Math Masterclass" : "Kelas Mahir Hitungan"}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#665039] font-medium line-clamp-1 mt-0.5">
                      {language === "en"
                        ? "Case-by-case visual guidelines and mental arithmetic tricks (Grades 1–6)"
                        : "Panduan studi kasus visual & jurus mental hitung cepat (Kelas 1–6 SD)"}
                    </p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center text-[#665039] border border-white/80 shrink-0 group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={22} />
                </div>
              </div>
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
