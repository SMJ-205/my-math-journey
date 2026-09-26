"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "id" | "en";

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "id",
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === "id" ? "en" : "id" })),
    }),
    {
      name: "mmj-language-pref",
    }
  )
);
