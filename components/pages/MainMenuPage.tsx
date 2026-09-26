"use client";

import { useState } from "react";
import { HeroBanner } from "@/components/landing/HeroBanner";
import { PageHeader } from "@/components/shared/PageHeader";
import { ParentGuideModal } from "@/components/landing/ParentGuideModal";
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/lib/translations";
import { BookOpen } from "lucide-react";

interface MainMenuPageProps {
  onStart: () => void;
}

export function MainMenuPage({ onStart }: MainMenuPageProps) {
  const [showGuide, setShowGuide] = useState(false);
  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;

  return (
    <div className="min-h-dvh flex flex-col bg-[#FFFDF4]">
      {/* Brand header — no back button on root page */}
      <PageHeader />

      {/* Hero banner — full width, top-anchored */}
      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-6xl mx-auto px-4 pt-5 pb-6">
          <HeroBanner onStartClick={onStart} />
        </div>
      </main>

      <footer className="py-5 border-t border-amber-100 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} />
            {t.version}
          </span>
          <button
            id="btn-parent-guide"
            onClick={() => setShowGuide(true)}
            className="hover:text-amber-500 transition-colors font-semibold cursor-pointer"
          >
            {t.parentGuide}
          </button>
        </div>
      </footer>

      {showGuide && <ParentGuideModal onClose={() => setShowGuide(false)} />}
    </div>
  );
}
