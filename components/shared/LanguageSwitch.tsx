"use client";

import { useLanguageStore } from "@/store/languageStore";
import { Globe } from "lucide-react";

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div
      className={`h-9 inline-flex items-center bg-amber-50/90 border border-amber-200 rounded-full px-1 shadow-sm flex-shrink-0 ${className}`}
      role="group"
      aria-label="Pilih Bahasa / Select Language"
    >
      <span className="pl-1 pr-1.5 text-amber-500 flex items-center">
        <Globe size={15} />
      </span>
      <button
        id="btn-lang-id"
        onClick={() => setLanguage("id")}
        className={`h-7 px-2.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center justify-center ${
          language === "id"
            ? "bg-amber-500 text-white shadow-xs"
            : "text-amber-700 hover:text-amber-900"
        }`}
        aria-pressed={language === "id"}
        title="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        id="btn-lang-en"
        onClick={() => setLanguage("en")}
        className={`h-7 px-2.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center justify-center ${
          language === "en"
            ? "bg-amber-500 text-white shadow-xs"
            : "text-amber-700 hover:text-amber-900"
        }`}
        aria-pressed={language === "en"}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
