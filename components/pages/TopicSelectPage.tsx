"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { gradeConfigs } from "@/config/curriculum.config";
import { getQuestionsByGradeAndTopic } from "@/content/questions/questionBank";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguageStore } from "@/store/languageStore";
import { translations, getTopicLabel } from "@/lib/translations";
import { ChevronRight, BookOpen, Sparkles, Zap, Flame } from "lucide-react";

interface TopicSelectPageProps {
  grade: number;
  initialTier?: number;
  onBack: () => void;
  onSelectTopic: (topic: string, tier: number) => void;
}

export function TopicSelectPage({ grade, initialTier = 1, onBack, onSelectTopic }: TopicSelectPageProps) {
  const cfg = gradeConfigs.find((g) => g.grade === grade);
  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;
  const [selectedTier, setSelectedTier] = useState<number>(initialTier);

  if (!cfg) return null;

  const pageTitle = t.topicPageTitle.replace("{grade}", String(grade));

  const tierOptions = [
    {
      tier: 1,
      title: t.difficultyTier1,
      desc: t.difficultyTier1Desc,
      icon: Sparkles,
      activeClass: "border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300 shadow-xs",
      inactiveClass: "border-gray-200 bg-white text-gray-700 hover:border-emerald-200 hover:bg-emerald-50/40",
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      tier: 2,
      title: t.difficultyTier2,
      desc: t.difficultyTier2Desc,
      icon: Zap,
      activeClass: "border-amber-400 bg-amber-50 text-amber-900 ring-2 ring-amber-300 shadow-xs",
      inactiveClass: "border-gray-200 bg-white text-gray-700 hover:border-amber-200 hover:bg-amber-50/40",
      badgeColor: "bg-amber-100 text-amber-800",
    },
    {
      tier: 3,
      title: t.difficultyTier3,
      desc: t.difficultyTier3Desc,
      icon: Flame,
      activeClass: "border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-300 shadow-xs",
      inactiveClass: "border-gray-200 bg-white text-gray-700 hover:border-rose-200 hover:bg-rose-50/40",
      badgeColor: "bg-rose-100 text-rose-800",
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-[#FFFDF4]">
      <PageHeader showBack onBack={onBack} title={pageTitle} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-5">
        <p className="text-gray-500 text-base">
          {t.topicPageSub}
        </p>

        {/* Difficulty Tier Selector */}
        <div className="flex flex-col gap-2.5 bg-white/80 p-4 rounded-3xl border border-amber-200/80 shadow-sm">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900/80">
            {t.difficultyLabel}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {tierOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedTier === opt.tier;
              return (
                <button
                  key={opt.tier}
                  id={`tier-select-${opt.tier}`}
                  onClick={() => setSelectedTier(opt.tier)}
                  className={`flex flex-col gap-1 p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected ? opt.activeClass : opt.inactiveClass
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    <Icon size={16} />
                    <span>{opt.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 leading-snug">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topics List */}
        <div className="flex flex-col gap-3">
          {cfg.topics.map((topic, idx) => {
            const hasQuestions = getQuestionsByGradeAndTopic(grade, topic, selectedTier).length > 0;
            const label = getTopicLabel(topic, language);

            return (
              <motion.button
                key={topic}
                id={`topic-btn-${topic}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => hasQuestions && onSelectTopic(topic, selectedTier)}
                disabled={!hasQuestions}
                className={`
                  flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all
                  ${hasQuestions
                    ? "border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm"
                    : "border-gray-100 bg-gray-50 cursor-not-allowed"}
                `}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${hasQuestions ? "bg-amber-100" : "bg-gray-100"}`}>
                  <BookOpen size={18} className={hasQuestions ? "text-amber-500" : "text-gray-300"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-bold text-base ${hasQuestions ? "text-gray-800" : "text-gray-300"}`}>
                      {label}
                    </p>
                    {hasQuestions && (
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        selectedTier === 1
                          ? "bg-emerald-100 text-emerald-700"
                          : selectedTier === 2
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-700"
                      }`}>
                        Level {selectedTier}
                      </span>
                    )}
                  </div>
                  {!hasQuestions && (
                    <p className="text-xs text-gray-400 font-normal">{t.comingSoon}</p>
                  )}
                </div>
                {hasQuestions && (
                  <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
