"use client";

import { motion } from "framer-motion";
import { gradeConfigs } from "@/config/curriculum.config";
import { getQuestionsByGradeAndTopic } from "@/content/questions/questionBank";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguageStore } from "@/store/languageStore";
import { translations, getTopicLabel } from "@/lib/translations";
import { ChevronRight, BookOpen } from "lucide-react";

interface TopicSelectPageProps {
  grade: number;
  onBack: () => void;
  onSelectTopic: (topic: string) => void;
}

export function TopicSelectPage({ grade, onBack, onSelectTopic }: TopicSelectPageProps) {
  const cfg = gradeConfigs.find((g) => g.grade === grade);
  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;

  if (!cfg) return null;

  const pageTitle = t.topicPageTitle.replace("{grade}", String(grade));

  return (
    <div className="min-h-dvh flex flex-col bg-[#FFFDF4]">
      <PageHeader showBack onBack={onBack} title={pageTitle} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-5">
        <p className="text-gray-500 text-base">
          {t.topicPageSub}
        </p>

        <div className="flex flex-col gap-3">
          {cfg.topics.map((topic, idx) => {
            const hasQuestions = getQuestionsByGradeAndTopic(grade, topic, 1).length > 0;
            const label = getTopicLabel(topic, language);

            return (
              <motion.button
                key={topic}
                id={`topic-btn-${topic}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => hasQuestions && onSelectTopic(topic)}
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
                  <p className={`font-bold text-base ${hasQuestions ? "text-gray-800" : "text-gray-300"}`}>
                    {label}
                  </p>
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
