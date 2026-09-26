"use client";

import { gradeConfigs, GradeConfig } from "@/config/curriculum.config";
import { Star, Lock } from "lucide-react";

const mascotIcons: Record<string, string> = {
  ayam:    "🐣",
  kucing:  "🐱",
  kelinci: "🐰",
  rubah:   "🦊",
  beruang: "🐻",
  elang:   "🦅",
};

// Replace emoji with SVG-backed text labels for classnames
const mascotLabels: Record<string, string> = {
  ayam:    "Ayam",
  kucing:  "Kucing",
  kelinci: "Kelinci",
  rubah:   "Rubah",
  beruang: "Beruang",
  elang:   "Elang",
};

interface GradeCardProps {
  config: GradeConfig;
  stars: number;
  totalTopics: number;
  completedTopics: number;
  isLocked: boolean;
  onClick: () => void;
}

function GradeCard({ config, stars, totalTopics, completedTopics, isLocked, onClick }: GradeCardProps) {
  const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  return (
    <button
      id={`grade-card-${config.grade}`}
      onClick={onClick}
      disabled={isLocked}
      className={`
        relative flex flex-col items-center gap-3 p-5 rounded-3xl border-4 transition-all duration-200
        shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 w-full
        ${isLocked
          ? "border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed"
          : `border-transparent hover:border-[${config.color}]`}
      `}
      style={!isLocked ? { backgroundColor: config.bgColor, borderColor: "transparent" } : {}}
    >
      {isLocked && (
        <div className="absolute top-3 right-3 text-gray-400">
          <Lock size={18} />
        </div>
      )}

      {/* Mascot avatar */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-black shadow-inner"
        style={{ backgroundColor: config.color + "33", color: config.color }}
      >
        {mascotLabels[config.mascotEmoji]?.[0] ?? "?"}
      </div>

      {/* Grade label */}
      <div className="text-center">
        <p className="font-black text-lg text-gray-800">{config.label}</p>
        <p className="text-xs text-gray-500 font-semibold">{mascotLabels[config.mascotEmoji]}</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: config.color }}
        />
      </div>

      {/* Stars earned */}
      <div className="flex items-center gap-1">
        <Star size={14} className="fill-amber-400 text-amber-400" />
        <span className="text-xs font-bold text-gray-600">{stars}</span>
      </div>
    </button>
  );
}

interface GradeGridProps {
  profileGrade: number;
  starsPerGrade?: Record<number, number>;
  completedTopicsPerGrade?: Record<number, number>;
  onSelectGrade: (grade: number) => void;
}

export function GradeGrid({
  profileGrade,
  starsPerGrade = {},
  completedTopicsPerGrade = {},
  onSelectGrade,
}: GradeGridProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-700 px-1">Pilih Kelas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {gradeConfigs.map((cfg) => (
          <GradeCard
            key={cfg.grade}
            config={cfg}
            stars={starsPerGrade[cfg.grade] ?? 0}
            totalTopics={cfg.topics.length}
            completedTopics={completedTopicsPerGrade[cfg.grade] ?? 0}
            isLocked={false}
            onClick={() => onSelectGrade(cfg.grade)}
          />
        ))}
      </div>
    </div>
  );
}
