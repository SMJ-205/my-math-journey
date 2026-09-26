"use client";

import { BookOpen, ArrowLeft, Star } from "lucide-react";
import { useProfileStore } from "@/store/profileStore";
import { LanguageSwitch } from "./LanguageSwitch";

interface PageHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function PageHeader({ showBack, onBack, title }: PageHeaderProps) {
  const { profiles, activeProfileId } = useProfileStore();
  const activeProfile = profiles.find((p) => p.id === activeProfileId);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Back button */}
        {showBack && onBack ? (
          <button
            id="btn-page-back"
            onClick={onBack}
            className="p-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 transition-all active:scale-95 flex-shrink-0"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <BookOpen size={22} className="text-amber-500" />
          </div>
        )}

        {/* Title or brand */}
        <div className="flex-1 min-w-0">
          {title ? (
            <h1 className="font-fredoka text-lg font-semibold text-gray-800 truncate">
              {title}
            </h1>
          ) : (
            <span className="font-fredoka font-semibold text-xl text-gray-800 tracking-tight">
              My Math Journey
            </span>
          )}
        </div>

        {/* Right side controls: Language switcher + Active profile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <LanguageSwitch />

          {/* Active profile pill (if any) */}
          {activeProfile && (
            <div className="h-9 flex items-center gap-2 bg-amber-50/90 border border-amber-200 rounded-full px-3 shadow-sm flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-xs font-black text-amber-900 flex-shrink-0">
                {activeProfile.nickname[0]}
              </div>
              <span className="text-sm font-bold text-amber-800 hidden sm:inline">
                {activeProfile.nickname}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {activeProfile.starsTotal}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
